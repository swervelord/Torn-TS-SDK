# Torn-TS-SDK

[![SDK checks](https://github.com/swervelord/Torn-TS-SDK/actions/workflows/ci.yml/badge.svg)](https://github.com/swervelord/Torn-TS-SDK/actions/workflows/ci.yml)

A complete TypeScript SDK for the official Torn API, powered by Bun. It provides typed endpoints, selection batching, runtime validation, and resilient request execution.

The SDK covers all **236 operations and 719 component schemas in Torn API 6.14.0**, all **207 capability selections**, and all **549 handwritten facade model declarations**. Exact endpoint operations, typed selection batches, and compatibility resource helpers use the same execution engine. The original 6.13.6 model surface remains available explicitly for legacy decoding.

Runtime, generators, tooling, and tests are TypeScript. Bun 1.4.4 handles package management, execution, native typechecking, HTTP, file I/O, bundling, and tests. TypeScript's compiler emits declaration files. See [Bun compatibility](docs/BUN_COMPATIBILITY.md) for the checker commands and verification.

## Start

```sh
bun add github:swervelord/Torn-TS-SDK
```

Install directly from GitHub. Package entry points are TypeScript consumed natively by Bun, so GitHub installation does not require a build step. Bundled JavaScript and declaration files can also be produced with `bun run build`.

Set a local `.env` file (Bun loads it automatically):

```dotenv
TORN_API_KEY=your_api_key_here
```

```ts
import { TornClient, TornSdk, UserOptions, BaseOptions } from "torn-ts-sdk";

const sdk = new TornSdk(await TornClient.fromEnv());

// One HTTP call for both compatible selections, with inferred response types.
const { data, report } = await sdk.user().selectWithReport(
  ["profile", "job"],
  new UserOptions().withId("YOUR_USER_ID"),
);
console.log(data.profile.name, data.job);
console.log(report.calls.length); // 1 when the combined call succeeds

// Exact v2 operation; typed parameters and the complete pinned response model.
const generated = await sdk.openapi().getUserProfile({ id: 3637232 });
console.log(generated.profile.name);

// Optional parameters are ordinary typed properties.
const log = await sdk.user().events(
  new UserOptions().withBase(new BaseOptions().withLimit(10)),
);
```

Snake_case and camelCase method names are both available. For example, `get_user_profile` and `getUserProfile` are the same operation. Durations are expressed in milliseconds.

`select()` returns the inferred data directly. The planner combines compatible selections, isolates standalone and direct-only selections, and uses controlled legacy fallback. Separate helper calls remain separate requests. Batches share one target and filter set; use compatible targets, filters, and key permissions. See [batching rules and examples](docs/BATCHING.md).

## API surfaces

| Surface | Use |
| --- | --- |
| `sdk.openapi()` | Every exact v2 operation, typed parameters and responses, strict runtime response decoding |
| `sdk.user().select(...)`, `.selectWithReport(...)` and equivalent resource APIs | Inferred, runtime-validated multi-selection data through the batching planner |
| `sdk.user()`, `.faction()`, `.torn()`, `.company()`, `.market()`, `.racing()`, `.forum()`, `.property()`, `.key()` | Compatibility helpers with typed models, defaults, unions, and resource validation |
| `rawSelection`, `rawSelections`, `*_raw` | Raw known selections through the planner |
| `typedSelection<R>(..., decoder)` | Caller-supplied models and optional runtime decoding |
| `sdk.client()` | Plan resource selections, inspect execution reports, execute explicit plans |
| `RequestPlanner` | Build and inspect routes without sending HTTP |
| `HttpTransport` | Inject a custom HTTP transport or deterministic mock |

Generated types are exported at the root and through `torn-ts-sdk/models`. Handwritten model types live under `manualModels` at the root, or `manual` from the models entry point. The generated `ApiError` schema is `generatedModels.ApiError`; the root `ApiError` is the runtime error class. Frozen 6.13.6 models are under `legacy6136Models`, with `decodeLegacyModel` for explicit 6.13.6 payload decoding. Current elimination-team responses require `captains`; legacy decoding retains the older `leaders` shape.

```ts
import { DataRequestOptions, PlanRequest, RequestPlanner } from "torn-ts-sdk";

const plan = new RequestPlanner().plan(
  new PlanRequest("user", ["profile", "discord", "hof"]).withId("3637232"),
);

const report = await sdk.client().getUserData(
  ["profile", "discord", "hof"],
  new DataRequestOptions().withId("3637232"),
);
console.log(report.calls.map(call => ({ path: call.path, route: call.routeId })));
```

The bundled capabilities allow ordinary usage without deploying an external spec file. A caller can instead use `RequestPlanner.fromCapabilitiesFile(path)` or `TornClient.fromCapabilitiesFile(path, keys, config)`.

## Execution and configuration

The executor combines compatible v2 selections, isolates standalone endpoints, supports legacy v1 selections, splits rejected combinations, and performs migration fallback. It rotates API keys and enforces per-key and per-route minute quotas. Named routes spill to other named routes and then the default route when local quota is exhausted.

Defaults are three attempts, a 30-second HTTP timeout, 250 ms base linear retry backoff, eight in-flight sends, 100 calls per key per minute, and 1,000 per route per minute. These are local SDK defaults. Quotas are shared within an executor, not between processes or independent clients. Use keys with equivalent ownership and permissions for account-specific requests.

```ts
const client = TornClient.withApiKeys(["first-key", "second-key"], {
  maxInFlight: 8,
  timeoutMs: 30_000,
  routes: [
    { id: "proxy-a", proxyUrl: "http://user:password@host:port", perIpPerMinute: 1000 },
    { id: "proxy-b", proxyUrl: "http://other-host:port", perIpPerMinute: 1000 },
  ],
});
const sdk = new TornSdk(client);
await sdk.openapi().getTornTimestamp({}, {
  routeId: "proxy-a", maxAttempts: 2, requestTimeoutMs: 10_000,
  signal: AbortSignal.timeout(20_000),
});
```

An HTTP timeout applies to one send. `AbortSignal` provides cancellation across semaphore waits, quota waits, retries, and HTTP. Requests inside one plan run sequentially; concurrent callers share the executor's concurrency cap. JSON objects merge recursively and later arrays/scalars replace earlier values. Successful execution reports contain contributing calls, rather than every failed attempt. Pagination metadata and links are preserved for caller-managed paging. CSV snapshot operations return `string`.

Supported environment settings: `TORN_API_KEYS` / `TORN_API_KEY`, `TORN_API_BASE_URL_V2`, `TORN_API_BASE_URL_V1`, `TORN_HTTP_TIMEOUT_SECS`, `TORN_USER_AGENT`, `TORN_MAX_ATTEMPTS`, `TORN_NETWORK_RETRY_BACKOFF_MS`, `TORN_RATE_LIMIT_PER_KEY_PER_MIN`, `TORN_RATE_LIMIT_PER_IP_PER_MIN`, and `TORN_MAX_IN_FLIGHT`. Proxy routes are configured programmatically.

Errors are typed: `ValidationError`, `DecodeError`, `PlannerError`, `EnvConfigError`, `TransportError`, `ExecutorError`, and `ApiError`. API errors expose status, Torn code, path, and credential used; SDK JSON/inspection output redacts credentials. Do not explicitly print credential getters. Local tracing can subscribe to executor `onRouteUsage` metrics.

## Integer and model fidelity

The SDK parses unsafe integral JSON tokens as `bigint`, with `Integer = number | bigint`. Small integers remain `number`. Generated integer schemas enforce signed 64-bit bounds; handwritten signed and unsigned models retain their respective bounds. Bigint request parameters serialize to decimal strings. Use `stringifyLosslessJson` to serialize SDK data containing bigints without rounding; native `JSON.stringify` cannot serialize bigint values.

Full coverage refers to the pinned official API snapshot and the documented SDK contract. Unknown future fields, unspecified upstream log maps, and legacy dynamic facade fields remain JSON values. The compatibility classifier reports permissive facades separately from strict generated types. Generated response validation checks required fields, nullability, enums, and nested types. New upstream enum values may require refreshing the SDK.

## Generation and contract checks

For development, clone this repository, run `bun install --frozen-lockfile`, then `bun run check`. Runtime, generation, audit tooling, and tests are TypeScript. JSON snapshots and YAML CI configuration are data/configuration rather than another implementation language.

```sh
bun run generate:check
bun run refresh:check
bun run parity:check

# Intentionally update to a new upstream snapshot:
bun run refresh
bun run generate
bun run check
```

Use `bun run refresh --spec path/to/openapi.json` to import a local snapshot. Refresh preserves versioned snapshots, SHA-256 provenance, and explicit routing overrides. Generation uses the pinned snapshot and never silently fetches a newer one.

The regression suite includes 466 golden planner scenarios, 1,628 generated model acceptance samples, and 59 manual-model scenarios. Frozen 6.13.6 fixtures and current 6.14.0 schema migration tests are checked separately. All validation uses committed specifications and fixtures. `bun run typing-gap-report` reports compatibility typing. See [the SDK contract](./CONTRACT.md) and the [API coverage audit](docs/COVERAGE_AUDIT.md) for scope and evidence.

Live smoke tests are opt-in and read `TORN_LIVE_TEST_API_KEY` from the environment:

```sh
bun test test/live.test.ts
```

The test exercises only a small read-only contract set. Ordinary tests use deterministic fixtures, injected clocks/transports, and local Bun servers/proxies. Credentials are never included in committed fixtures.
