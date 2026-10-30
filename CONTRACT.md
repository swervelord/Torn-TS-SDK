# SDK contract and verification

Torn-TS-SDK is a standalone TypeScript SDK for the official Torn API. Its runtime, models, generators, and tests are maintained in this repository. Installation, generation, and verification use Bun and the declared development dependencies.

The current API contract is the official Torn **6.15.0** OpenAPI snapshot: **237 operations and 724 component schemas**. The frozen **6.13.6** snapshot remains available for explicit legacy decoding. Its SHA-256 is `DC04C6A03424DA1D0361F29E80971D830115A23DDB1C47FBE5824FB54BB46EC4`. Versioned specifications, routing metadata, and regression fixtures are committed under `spec/`.

`legacy6136Models` and `decodeLegacyModel` decode old payloads. Current elimination-team responses require `captains`; legacy responses use `leaders`. See [the coverage audit](docs/COVERAGE_AUDIT.md) for the exact upstream changes and documentation comparison.

| Surface | Inventory | Contract |
| --- | ---: | --- |
| Current API component schemas | 724 | Complete 6.15.0 types and runtime decoding |
| Frozen API component schemas | 711 | Explicit 6.13.6 legacy decoding |
| Exact endpoint operations | 237 | Typed parameters/responses, snake_case and camelCase methods |
| Frozen generated model acceptance samples | 1,628 | Named and inline model validation |
| Capability selections | 208 | All nine resources |
| Manual facade model declarations | 549 | Typed declarations and metadata-driven decoders |
| Typed facade convenience methods | 210 | Selection helpers and detail aliases |
| Raw convenience methods | 203 | Raw selection helpers |
| CSV operations | 3 | Text execution and string return values |
| Planner regression scenarios | 466 | Normalized plan/error comparisons |
| Manual model regression scenarios | 59 | Normalized decoder output comparisons |

The baseline facade typing classification contains 49 strict typed, 12 typed with extra fields, 125 dynamic facades, and 19 missing upstream schemas. Handwritten models preserve permissive and dynamic fields where the contract requires them. Generated exact operations retain the full pinned declared schema. Unknown upstream data remains explicit JSON rather than invented static types.

## Runtime behavior

The contract includes capability loading; selection normalization and deduplication; generic batching and standalone isolation; direct path selection; query allowlists; legacy aliases; v1 catalogs; precomputed split plans; controlled runtime version fallback; sequential plan execution; recursive JSON merge; JSON/CSV handling; Torn error-envelope detection; retry status selection and linear backoff; minute-boundary key/route quotas; key rotation; route spillover; shared concurrency; timeout overrides; execution reports; environment loading; wrapper validation; manual model decoders; unknown-field preservation; and pagination metadata.

The transport uses Bun-native fetch. Configurable proxies, routes, headers, timeout, and cancellation are exercised against local Bun HTTP/proxy servers. `HttpTransport` is injectable through generated and resource APIs.

## TypeScript semantics

- Asynchronous operations return promises. `AbortSignal` cancels HTTP execution, quota waits, semaphore waits, and retry delays. Ignoring a promise does not cancel a request.
- Durations use milliseconds. Builder APIs and ordinary object options are both available, with snake_case and camelCase aliases.
- Integral JSON tokens outside the safe JavaScript range become `bigint`. Generated integer models enforce signed 64-bit bounds; manual models retain signed or unsigned domains. Safe integers remain `number`.
- Decoding uses explicit schema and model metadata. Manual model fields include flattened `extra` maps; generated models use API JSON names. Omitted optional manual fields normalize to `null`.
- Route usage is observable through `onRouteUsage`. Explicit credential getters are available, while SDK JSON and inspection output redact credentials.
- Capabilities are bundled. Explicit file initialization is also supported.
- Request parameter validation applies declared constraints before HTTP execution. Resource helpers validate their documented inputs.

## Verification and limits

The delivery gate is `bun run check`: native Bun typechecking, the complete offline test suite, generated source freshness, manual type freshness, typed-batch freshness, offline capability refresh consistency, committed planner regression checks, and production bundling/declaration output. [GitHub CI](https://github.com/swervelord/Torn-TS-SDK/actions/workflows/ci.yml) runs this gate on Ubuntu and Windows.

Tests cover schema upgrades, documentation audits, exhaustive batching, inferred typed selections, endpoint/helper dispatch, local transports/proxies, cancellation, and executor behavior. Source and packed-package consumption are checked separately. Frozen fixtures are SDK regression expectations; they are not a claim that Torn supplies these fixture payloads or that every live game state has been exercised.

Live smoke tests are opt-in and receive credentials only through the process environment. The bounded read-only suite, including user travel inventory and job, passed on October 30, 2026. It does not execute every endpoint with every permission/account state. No credential or private account response is saved in fixtures.

Coverage is tied to versioned specifications and the documented public surface. Future API changes can require regeneration or compatibility updates. Quotas are process-local; reports contain successful contributing calls; callers control pagination. No distributed limiter, persistent queue, cache, or automatic pagination service is included.

`bun run typing-gap-report` evaluates facade typing against the committed classification metadata and checks its freshness. The official v2 inventory is complete for the pinned snapshot. Complete static typing of every possible v1 payload is not established by the available official documentation.
