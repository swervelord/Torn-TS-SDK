# Changelog

## 3.0.0 - 2026-10-31

Brings the SDK up to the cross-SDK parity contract (`spec/shared/PARITY_SPEC.md`, vendored with the shared
`error-codes.json`, `access-levels.json`, `spec-overrides.json` and conformance scenarios). The pinned Torn API contract is
unchanged (6.15.0: 237 operations, 724 component schemas, 208 capability selections).

### Forward-compatible decoding
- P1.1: generated enums are open (`"A" | "B" | (string & {})`); unknown values decode and are preserved. New
  `enumValues`, `knownEnumValues`, `isKnownEnumValue`, `KnownEnumValue<Name>`.
- P1.2: the generator applies `spec/shared/spec-overrides.json`: `TornHalloweenUpgrade.type` and `UserTrade.items` are optional.
- P1.3: decoding is tolerant by default (unknown enum values, unknown properties and override-relaxed fields are warnings,
  see `decodeModelWithWarnings`); `validation: "strict"` / `{ mode: "strict" }` / `TORN_VALIDATION=strict` makes them errors.
- P1.4: `DecodeError` carries `operation`/`selection`, `jsonPath`, `expected`, a redacted `excerpt`, and the payload
  (`raw`, `rawBody`); union failures name the closest variant's failing leaf; `selectSettled()` and `DecodeError.partial`
  keep the selections that decoded.
- P1.5: unknown selections pass through as v2 generic selections (planner, `rawSelections`, `typedSelection`); unknown
  parameters/filters are forwarded verbatim (planner and `openapi()`); `comment` is forwarded on v1.

### Keys, rate limits, retries, errors
- P2.1: a `key` passed as an operation/raw parameter is moved to the request's Authorization header (`ExecutionOptions.apiKey`).
- P2.2: key hints are `***` + last four characters everywhere (`keyHint`, `ApiError.keyHint`, `ExecutedCall.keyHint`).
- P2.3-P2.5: key pool states (`healthy`, `rate_limited`, `disabled`), immediate failover on key errors, code 14 disables
  until UTC midnight, code 16 rotates without disabling, `NoUsableKeysError`, `keyStates()`.
- P2.6: `fromEnv()` reads `process.env` or `Deno.env` (no `Bun.env`).
- P3.1-P3.3: sliding 60 s window per key / key group (`rateLimits.keyGroups`, `detectKeyOwners`, `detectKeyAccess()`);
  code 5 rotates to a key with budget instead of sleeping until the next minute.
- P3.4: code 8 blocks the route and rotates to another configured route, else fails.
- P4.1-P4.3: retry classification by Torn code and HTTP status only; exponential backoff with full jitter, `Retry-After`,
  defaults from `error-codes.json` (`maxAttempts` 4, base 500 ms, cap 30 s); codes 22/23 re-plan on the other API version.
- P4.4: cancellation surfaces as `CancelledError` (the abort reason is its `cause`).
- P2.4a: key rotations (key errors, and code 5 moving to a key that has not been rate-limited in this request) do not
  consume `maxAttempts`; they are bounded by the key pool. `maxAttempts` counts sends on the same key.
- P4.3: only the selections Torn's `<Resource>SelectionName` descriptions list as server-side v1 fallbacks
  (`user.bazaar/criminalrecord/display`, `torn.competition/organisedcrimes`) go to v2 first; other v1-only selections go
  straight to v1.
- P4.5: code 4 on a combined request splits it once into per-selection requests; a selection that still fails is
  reported in `report.selectionErrors` (and `selectSettled().errors`) while the others are merged. The call only throws
  when every split request fails.
- P4.6: `TORN_API_KEYS` takes precedence over `TORN_API_KEY`.
- P5: generated `TornErrorCode` enum and `tornErrorCodes` policy table; `HttpError`, `NoUsableKeysError`,
  `AccessLevelError`, `CancelledError`, `TimeoutError`; `errorKind`, `errorCode`, `isRetryable`, `isKeyError`,
  `isRateLimit`, `isAccessError`, `isTransient`. Error `name`s are literal, so bundling no longer yields `ApiError2`.

### Access, pagination, developer experience
- P6: `operationAccessLevels`, `selectionAccessLevels`, `accessLevelSatisfies`, `keyInfo()`, `checkAccess`.
- P7.1: `paginate()`, `paginateItems()`, `paginateOperation()` with link validation and key stripping.
- P8.1: self-scoped facade calls work without an id (`user().profile()`, `user().basic()`, `faction().members()`, ...);
  facades accept an id shorthand and reject bad arguments with `ValidationError` (`market().itemmarket(206)` no longer
  throws a raw `TypeError`).
- P8.2: `client.get(path, query)` and `client.getTyped(path, schemaName)`.
- P8.3: `hooks: { onRequest, onResponse, onRetry, onError }` with redacted payloads.
- P8.4: optional response cache (`ResponseCache`, `MemoryCache`) with TTLs parsed from the spec's cache notes.
- P8.5: `torn-ts-sdk/testing`: `MockTransport`, `VirtualScheduler`, `mockSdk`, `jsonResponse`, `tornError`, `loadFixture`.
- P8.6: `tornUrls`, Torn timestamp and TCT helpers. P8.7: `SPEC_VERSION`, `SPEC_SHA256`.
- Generated models carry the spec's field descriptions as TSDoc; operations document summary, description, access and path.

### Quality and packaging
- P9.1: data-driven conformance harness (`test/conformance.test.ts`) runs every scenario in `spec/shared/conformance` (32/32).
- P9.2: the opt-in live suite reads `TORN_API_KEY` (legacy `TORN_LIVE_TEST_API_KEY`) and sweeps every reachable operation.
- P9.3: CI runs the full gate on Linux, Windows and macOS; `.gitattributes` pins LF for generated and spec files; the
  docs-audit and typing-classification refresh scripts live in `tools/` and their `--check` modes run in `bun run check`.
- P9.5: the package exports compiled, platform-neutral ESM `dist/*.js` + `.d.ts` (Node >= 20, Bun, Deno, browsers,
  workers). CI installs the packed tarball into fresh Node 20/22/24 and Deno projects, runs a smoke test and typechecks a
  TypeScript consumer with default `tsc` settings.

### Migrating from 2.x
- **Package entry points** now resolve to `dist/` (build with `bun run build` when installing from source). The `src/`
  directory, `spec/versions`, `spec/parity` and `spec/capability-overrides.json` are no longer published, and
  `torn-ts-sdk/spec/*` exposes only `torn-openapi-current.json`, `capabilities.json`, `metadata.json` and `shared/*`.
- **Typing-gap tooling** (`buildTypingGapReport`, `loadReport`, ...) moved out of the public API into `tools/typing-gap.ts`.
- **Transport**: `BunTransport` is now `FetchTransport` (`BunTransport` and `ReqwestTransport` remain as deprecated
  aliases). On Node a configured proxy needs `new FetchTransport({ fetch })`; it is no longer silently ignored.
  `TransportResponse` gains optional `headers`.
- **Decoding**: unknown enum values and unknown properties no longer throw. Use `validation: "strict"` to keep the 2.x
  strictness. `validateModel(name, value)` returns only errors; pass `{ warnings }` to collect the rest.
- **Planner**: unknown selections are sent instead of throwing `PlannerError('UnknownSelection')`; unknown filters are
  forwarded instead of dropped; `user.bazaar/criminalrecord/display` and `torn.competition/organisedcrimes` go to v2 (Torn
  falls back server-side; code 22 re-plans to v1); v1 paths without an id end in `/`. `routing: "legacy"` restores 2.x plans.
- **Retries**: `maxAttempts` defaults to 4 and counts sends on the same key (key rotations are free, bounded by the pool); backoff is exponential with full jitter
  (`jitter: "none"` for deterministic tests); `networkRetryBackoffMs` defaults to 500. Rate limiting is a sliding window
  (`RateLimiter.tryAcquire(key, route, nowMs)`; the seconds-based methods are deprecated). Combined requests split on
  code 4 and re-plan on codes 22/23 instead of matching English messages; `isRateLimitError` is deprecated (`isRateLimit`).
- **Errors**: `ApiError.toJSON()` reports `keyHint` instead of `keyUsed: "[REDACTED]"`; HTTP failures without a Torn
  envelope are `HttpError` (a subclass of `ApiError`); aborted calls reject with `CancelledError`.
- **Facades**: id-less self-scoped calls now hit the key owner instead of throwing; facade methods accept an id shorthand.
- **Aliases**: snake_case methods (`get_user_profile`, `with_id`, `*_raw`, `from_env`, ...) still work but are
  `@deprecated` and undocumented; use the camelCase names.

## 2.2.0 - 2026-10-30

- Updated the pinned official Torn OpenAPI contract from 6.14.0 to 6.15.0: 237 operations, 724 component schemas, and 208 capability selections.
- Added the fully generated user travel inventory endpoint model and exact operation (`getMyTravelInventory`), the `travelinventory` resource helper, raw aliases, and inferred selection batches. User travel inventory requires a Limited access key. Empty inventory slots (`item`) and items without a unique ID (`uid`) decode as `null`.
- Added `Dealer` to `JobPositionCasinoEnum` and `end_with_dirty_bomb` to `FactionTerritoryWarResultEnum`. The territory war result addition is a specification-only change not listed in the release announcement.
- The opt-in live suite now covers user travel inventory and job.

## 2.1.0 - 2026-10-27

- `BunTransport` now sends the API key as an `Authorization: ApiKey <key>` header on v2 requests instead of the `key` query parameter, so keys no longer appear in request URLs. v1 fallback requests keep the `key` query parameter because v1 has no documented header authentication. `TransportRequest` gains an optional `apiVersion` (absent means v2), and `buildUrl` appends `key` only when a key is passed.
- Updated the pinned official Torn OpenAPI contract from 6.13.8 to 6.14.0: 236 operations, 719 component schemas, and 207 capability selections.
- Added fully generated user and Torn Halloween endpoint models and exact operations, resource helpers, raw aliases, and inferred selection batches. User Halloween requires a Minimal access key.
- Added all newly declared city statistics. Refreshed selection enums, response envelopes, upstream caching descriptions, and stability annotations.
- Recorded upstream inventory cache lifetimes: user inventory is 900 seconds per category; faction inventory is 300 seconds for all items. The SDK itself does not cache responses.
- Retained required properties whose upstream schema is undeclared as required `JsonValue` fields. In particular, Torn Halloween upgrade `type` is required upstream without a type definition; decoding enforces presence and preserves the value without inventing an enum.
- Rewrote the compatibility model metadata in a TypeScript-native type notation (`Nullable<T>`, `Array<T>`, `Record<string, T>`, `JsonValue`, width-explicit `uint64`/`int64`/`float64`, `Generated.X`). Public declarations and decoding behavior are unchanged.
- Preserved the explicit frozen 6.13.6 compatibility contract and regression fixtures. Current typing audits and documentation drift records now have separate current metadata.

Upstream currently spells `/user/halloween` stability `Untable`. The exact snapshot preserves that value; callers should treat this endpoint as having unconfirmed stability until Torn corrects it. The announcement otherwise marks selections stable except elimination selections, user search, and user snapshot.

Validation uses offline representative data and local HTTP/proxy servers. Live authenticated endpoint coverage remains opt-in.
