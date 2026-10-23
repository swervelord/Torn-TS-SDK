# Bun compatibility

Verified October 23, 2026 against Bun **1.4.4**, the latest stable release at verification time. The official release was published October 22, 2026: https://bun.com/blog/bun-v1.4.4.

- `package.json` requires Bun `>=1.4.4`.
- CI installs exactly `1.4.4` on Ubuntu and Windows.
- The committed `bun.lock` pins `@types/bun` and `bun-types` to `1.4.4`; the declared types dependency also starts at `1.4.4`.
- Package exports point directly to TypeScript files. Bun can install the SDK from GitHub and run it without an install-time build.
- HTTP, proxy support, cancellation, JSON precision, generators, and packaging were tested with this Bun version.

## Typechecking and builds

```sh
bun run typecheck       # native Bun checker: bun check --no-script
bun run typecheck:tsc   # optional TypeScript compiler comparison
bun run check           # full delivery gate, including tests, generation checks, and build
```

Bun gives a package's `check` script precedence over its native checker. The explicit `--no-script` in `typecheck` selects the native checker without ambiguity. The full delivery gate remains the package's `check` script.

Bun's checker reads the existing strict `tsconfig.json` and does not emit JavaScript or declaration files. `tools/build.ts` therefore keeps `tsc` for `.d.ts` emission and uses `Bun.build` for JavaScript bundles. The build also verifies compatibility with the installed TypeScript compiler. These tools run under Bun; a separate Node.js process is unnecessary.

References:

- https://bun.sh/docs/runtime/check
- https://bun.sh/docs/typescript

The new formatter and other optional Bun tools do not require changes to the SDK's runtime APIs. Pinned schema snapshots and generated artifacts retain their provenance/freshness checks.
