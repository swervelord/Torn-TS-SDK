# Runtime portability

Since 3.0.0 the published package is compiled, platform-neutral ESM (PARITY_SPEC P9.5). Bun stays the development
toolchain (install, generators, tests, bundling); consumers do not need Bun.

| Runtime | Status | Verified by |
| --- | --- | --- |
| Node.js 20, 22, 24 | supported | CI `node-consumer`: packed tarball installed with npm into a fresh project, `tools/smoke/smoke.mjs` |
| Bun >= 1.4.4 | supported | full gate (`bun run check`) and the smoke script under Bun |
| Deno 2 | supported (`npm:` specifiers or a `node_modules` install) | CI `deno-consumer`: same tarball and smoke script with `deno run --allow-env --allow-read` |
| Browsers, Cloudflare Workers and other fetch runtimes | supported for the runtime API | the build fails if the bundle references `Bun.*` or `node:` modules; JSON data is inlined |
| TypeScript consumers | `module: nodenext` / `bundler`, `strict` | CI typechecks `tools/smoke/consumer.ts` with default `tsc` settings, no `allowImportingTsExtensions`, no Bun types |

## What is runtime-specific

- **Environment** (`fromEnv`): `Deno.env` (only the SDK's variables are read, so `--allow-env=TORN_API_KEY,...` is enough),
  else `process.env` (Node, Bun). Browsers and workers pass keys explicitly.
- **Proxies**: Bun's `fetch(url, { proxy })` and Deno's `Deno.createHttpClient({ proxy })` are used by feature detection.
  On Node pass a proxy-capable fetch: `new FetchTransport({ fetch: (url, init) => undiciFetch(url, { ...init, dispatcher }) })`.
  A configured proxy that the runtime cannot honor raises a `TransportError`; it is never silently bypassed.
- **Files** (`fromCapabilitiesFile`, `loadFixture`): http(s) URLs use `fetch`, Deno uses `Deno.readTextFile`, otherwise
  `node:fs/promises` is imported lazily. Nothing reads files unless you call these.
- **Lossless int64**: unsafe integer tokens become `bigint` where `JSON.parse` exposes reviver source text (Node >= 21,
  Bun, Deno, current Chromium). Older engines (Node 20, older Safari/Firefox) keep JavaScript numbers for those values.
- **User-Agent**: browsers drop the header (it is forbidden there); everything else still works.

## Build and checks

```sh
bun run build          # tsc declarations (.js specifiers) + Bun.build --target=browser ESM bundle with the portability guard
bun run check          # full gate, ends with the build
bun run smoke:pack     # npm pack -> fresh project -> Node, Bun, Deno, tsc consumer (needs npm; deno for the Deno step)
bun run typecheck      # bun check --no-script (native checker)
bun run typecheck:tsc  # TypeScript compiler comparison
```

Error classes declare their `name` literally, so bundlers that rename classes (`ApiError2`) cannot change `error.name`.
