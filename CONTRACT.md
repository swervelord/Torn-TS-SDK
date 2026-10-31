# SDK contract and verification

Torn-TS-SDK is a standalone TypeScript SDK for the official Torn API. Its runtime, models, generators, and tests are maintained in this repository. Generation and verification use Bun and the declared development dependencies; the published package is portable ESM for Node >= 20, Bun, Deno, browsers and workers ([portability](docs/PORTABILITY.md)). Since 3.0.0 the SDK implements the cross-SDK parity contract in [`spec/shared/PARITY_SPEC.md`](spec/shared/PARITY_SPEC.md) (P1-P9), shared with the Rust, Go and Zig SDKs.

The current API contract is the official Torn **6.15.0** OpenAPI snapshot: **237 operations and 724 component schemas**. The frozen **6.13.6** snapshot remains available for explicit legacy decoding. Its SHA-256 is `DC04C6A03424DA1D0361F29E80971D830115A23DDB1C47FBE5824FB54BB46EC4`. Versioned specifications, routing metadata, and regression fixtures are committed under `spec/`.

`legacy6136Models` and `decodeLegacyModel` decode old payloads. Current elimination-team responses require `captains`; legacy responses use `leaders`. See [the coverage audit](docs/COVERAGE_AUDIT.md) for the exact upstream changes and documentation comparison.

| Surface | Inventory | Contract |
| --- | ---: | --- |
| Current API component schemas | 724 | Complete 6.15.0 types and runtime decoding |
| Frozen API component schemas | 711 | Explicit 6.13.6 legacy decoding |
| Exact endpoint operations | 237 | Typed parameters/responses, TSDoc from the spec, per-operation access level (deprecated snake_case aliases) |
| Frozen generated model acceptance samples | 1,628 | Named and inline model validation |
| Capability selections | 208 | All nine resources |
| Manual facade model declarations | 549 | Typed declarations and metadata-driven decoders |
| Typed facade convenience methods | 210 | Selection helpers and detail aliases |
| Raw convenience methods | 203 | Raw selection helpers |
| CSV operations | 3 | Text execution and string return values |
| Planner regression scenarios | 466 | Normalized plan/error comparisons (`routing: "legacy"`) |
| Shared conformance scenarios | 32 | `spec/shared/conformance/*.json` through the mock transport and virtual clock (P9.1) |
| Manual model regression scenarios | 59 | Normalized decoder output comparisons |

The baseline facade typing classification contains 49 strict typed, 12 typed with extra fields, 125 dynamic facades, and 19 missing upstream schemas. Handwritten models preserve permissive and dynamic fields where the contract requires them. Generated exact operations retain the full pinned declared schema. Unknown upstream data remains explicit JSON rather than invented static types.

## Runtime behavior

The contract includes capability loading; selection normalization and deduplication; generic batching and standalone isolation; direct path selection; pass-through of unknown selections and parameters (P1.5); v1 catalogs; precomputed split plans (code 4) and version re-planning (codes 22/23, P4.3); sequential plan execution; recursive JSON merge; JSON/CSV handling; Torn error-envelope detection; code- and status-based retry classification with exponential full-jitter backoff and `Retry-After` (P4); sliding-window key, key-group and route budgets (P3); a key pool with failover and per-key states (P2); route spillover and IP-block rotation; shared concurrency; timeout overrides; execution reports; environment loading; access-level checks (P6); pagination (P7); hooks, optional caching and a consumer test kit (P8); wrapper validation; manual model decoders; tolerant decoding with a strict mode (P1).

`FetchTransport` uses the platform `fetch`. Proxies use the runtime's native mechanism (Bun `proxy`, Deno `createHttpClient`) or an injected `fetch`; a proxy that cannot be honored fails loudly. Routes, headers, timeout, and cancellation are exercised against local HTTP/proxy servers. `HttpTransport` is injectable through generated and resource APIs.

## TypeScript semantics

- Asynchronous operations return promises. `AbortSignal` cancels HTTP execution, quota waits, semaphore waits, and retry delays. Ignoring a promise does not cancel a request.
- Durations use milliseconds. Builder APIs and ordinary object options are both available; snake_case aliases are deprecated.
- Integral JSON tokens outside the safe JavaScript range become `bigint`. Generated integer models enforce signed 64-bit bounds; manual models retain signed or unsigned domains. Safe integers remain `number`.
- Decoding uses explicit schema and model metadata. Manual model fields include flattened `extra` maps; generated models use API JSON names. Omitted optional manual fields normalize to `null`.
- Every request (v2 and v1) authenticates with the `Authorization: ApiKey` header; no URL ever carries a key (P2.1).
- Route usage is observable through `onRouteUsage` and request lifecycle hooks. Explicit credential getters are available, while SDK JSON, inspection, string conversion, errors and hooks show at most `***` + the last four characters (P2.2).
- Capabilities are bundled. Explicit file initialization is also supported.
- Request parameter validation applies declared constraints before HTTP execution. Resource helpers validate their documented inputs.

## Verification and limits

The delivery gate is `bun run check`: native Bun typechecking, the complete offline test suite, generated source freshness, manual type freshness, typed-batch freshness, offline capability refresh consistency, committed planner regression checks, and production bundling/declaration output. It also runs the shared conformance suite and the `--check` modes of the docs-audit and typing-classification refresh tools. [GitHub CI](https://github.com/swervelord/Torn-TS-SDK/actions/workflows/ci.yml) runs this gate on Ubuntu, Windows and macOS, and installs the packed tarball into fresh Node 20/22/24 and Deno projects (smoke test plus a default-settings `tsc` consumer typecheck).

Tests cover schema upgrades, documentation audits, exhaustive batching, inferred typed selections, endpoint/helper dispatch, local transports/proxies, cancellation, and executor behavior. Source and packed-package consumption are checked separately. Frozen fixtures are SDK regression expectations; they are not a claim that Torn supplies these fixture payloads or that every live game state has been exercised.

Live tests are opt-in (`TORN_API_KEY`, or the legacy `TORN_LIVE_TEST_API_KEY`) and receive credentials only through the process environment. They include the P9.2 live sweep, which calls and decodes (tolerant mode) every typed operation reachable with the key owner's ids. It does not execute every endpoint with every permission/account state. No credential or private account response is saved in fixtures.

Coverage is tied to versioned specifications and the documented public surface. Additive upstream changes (new enum values, fields, selections, parameters) do not break decoding; removals or type changes can still require regeneration. Quotas are process-local; reports contain successful contributing calls. No distributed limiter or persistent queue is included; the response cache is optional and pluggable.

`bun run typing-gap-report` evaluates facade typing against the committed classification metadata and checks its freshness. The official v2 inventory is complete for the pinned snapshot. Complete static typing of every possible v1 payload is not established by the available official documentation.
