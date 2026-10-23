# Parity contract

Reference: [Torn-Rust-SDK](https://github.com/swervelord/Torn-Rust-SDK), `master` commit `cd8716dad00ed7f4d0f58e1d013897bfa131f827`, package `torn_sdk_planner` 2.0.0. API snapshot 6.13.6; SHA-256 `DC04C6A03424DA1D0361F29E80971D830115A23DDB1C47FBE5824FB54BB46EC4`.

This port preserves the complete reference inventory, rather than substituting raw JSON for unported typed methods. The versioned inventory is machine-readable in `spec/parity/parity-manifest.json`. Rust planner execution results are committed in `spec/parity/planner-golden.json`.

The current release additionally targets official Torn API **6.13.8**, with **234 operations and 712 schemas**. The original **6.13.6** schemas and Rust-executed oracles are preserved separately. `legacy6136Models` and `decodeLegacyModel` provide explicit old-payload support; current response decoding follows the new `captains` elimination-team shape. See [the coverage audit](docs/COVERAGE_AUDIT.md) for the exact upstream changes and comparison with the documentation vault.

| Surface | Reference inventory | TypeScript contract |
| --- | ---: | --- |
| API component schemas | 711 | Every schema represented and runtime validated |
| Current API component schemas | 712 | Complete 6.13.8 coverage in addition to frozen baseline types |
| Exact endpoint operations | 234 | Typed parameter/response declarations, snake_case and camelCase methods |
| Generated Rust public model declarations | 1,628 | Matching generated type names, including inline models |
| Capability selections | 205 | All nine resources, all helper selections |
| Manual facade model declarations | 549 | Typed declarations and metadata-driven runtime decoders |
| Typed facade convenience methods | 207 | Selection helpers plus compatibility/detail aliases |
| Raw convenience methods | 200 | All source raw helper methods |
| CSV operations | 3 | Text execution and string return values |
| Planner scenarios executed in Rust | 466 | Exact normalized plan/error comparisons in Bun |
| Generated model samples executed in Rust | 1,628 | Runtime acceptance matched against the source SDK |
| Custom manual model oracle scenarios | 59 | Normalized output compared against executed Rust decoding |

The handwritten models intentionally retain the reference's permissive and dynamic fields. The original facade classification is 49 strict typed, 12 typed with extra fields, 125 dynamic facades, and 19 missing upstream schemas. Full inventory coverage does not convert unspecified upstream data into invented static types. Generated exact operations retain the full pinned declared schema.

## Runtime behavior

Covered parity includes capability loading; normalization and deduplication; generic batching and standalone isolation; direct path selection; query allowlists; legacy aliases; v1 catalogs; precomputed split plans; controlled runtime version fallback; sequential plan execution; recursive JSON merge; JSON/CSV handling; Torn error-envelope detection; retry status selection and linear backoff; minute-boundary key/route quotas; key rotation; route spillover; shared concurrency; timeout overrides; execution reports; environment loading; wrapper validation; custom manual model decoders; unknown extra-field preservation; and pagination metadata.

The transport is Bun-native fetch. Configurable proxies, routes, headers, timeout, and cancellation are exercised against local Bun HTTP/proxy servers. `HttpTransport` remains injectable, including in generated and resource APIs.

## Language adaptations

- Rust futures become JavaScript promises. `AbortSignal` provides explicit cancellation across HTTP and waits; JavaScript cannot observe a dropped promise as Rust can observe a dropped future.
- Durations use milliseconds. Builder APIs and ordinary object options are both available. Rust-style method aliases remain available where applicable.
- Large integral JSON tokens become `bigint` to preserve i64/u64 precision. Generated integer models enforce the Rust generator's signed i64 domain; manual models retain their signed/unsigned domain. Ordinary numbers stay `number`.
- Serde decoding becomes explicit metadata/schema decoding. Manual output uses the Rust facade field names, including `extra`; generated output uses API JSON property names. Empty optional manual fields become `null`, matching Rust `Option` semantics.
- Tracing becomes an injectable `onRouteUsage` callback. Credentials remain accessible to callers where the reference exposes them, but SDK inspect/JSON output redacts them. This intentionally fixes the reference's debug credential leaks.
- Built-in capabilities remove the caller's need to deploy a separate runtime JSON file; explicit file initialization remains supported.
- Parameter validation additionally applies upstream constraints before HTTP sends. Resource helper validation preserves the source contract.

## Verification and limits

The original 6.13.6 port passed 3,964 offline tests and 14,813 assertions on Bun 1.4.4 / TypeScript 5.9.3 on Windows. The current release adds schema-upgrade, documentation-audit, exhaustive batching, and inferred typed-selection tests. [GitHub CI](https://github.com/swervelord/Torn-TS-SDK/actions/workflows/ci.yml) runs the complete delivery gate on both Ubuntu and Windows. The opt-in live suite is skipped in ordinary CI; live validation is run separately with credentials supplied only through the process environment. Generated endpoint dispatch and each resource wrapper file reached 100% line coverage during the original audit; this is distinct from total application test coverage.

The delivery gate is `bun run check`: strict TypeScript checking, Bun tests, generated source freshness, manual type freshness, offline capability refresh consistency, Rust golden-plan parity, and production bundling/declaration output. A separate opt-in live test exercises generated key information, game timestamp, player profile, and compatibility profile decoding using four read-only requests. Credentials are supplied only through an ephemeral process environment.

The live smoke test passed during implementation on October 23, 2026. This is bounded live evidence, not a claim that every endpoint was called with every possible permission/account state. Most validation is deterministic and offline, using the pinned schemas, real Rust-produced plans, source contract payload fixtures, and local HTTP transport fixtures. No credential or account response payload is saved in fixtures.

Coverage is tied to the pinned source commit and spec. Future Torn schema or runtime changes can require regeneration or compatibility updates. Request route spillover, per-executor quotas, successful-call-only reports, and fallback heuristics retain the practical limits of the source implementation. No cache, distributed limiter, persistent queue, or automatic pagination service is added.

The source and packed package are separately tested so that successful local imports do not conceal packaging/declaration errors. Rust was used externally to produce the frozen reference oracles during the port. All delivered tooling, build, generation, checks, runtime, and tests require only Bun and the installed TypeScript development dependency. `bun run typing-gap-report` reproduces the original report, with provenance and freshness checks on the frozen source-analysis metadata.
