# Torn-TS-SDK

[![SDK checks](https://github.com/swervelord/Torn-TS-SDK/actions/workflows/ci.yml/badge.svg)](https://github.com/swervelord/Torn-TS-SDK/actions/workflows/ci.yml)

A complete TypeScript SDK for the official Torn API: typed endpoints, inferred multi-selection batching, forward-compatible
runtime validation, key failover, sliding-window rate limiting and retries. It ships compiled ESM (`dist/*.js` + `.d.ts`)
that runs on **Node >= 20, Bun, Deno, browsers and workers**; Bun is only the development toolchain.

The SDK covers all **237 operations and 724 component schemas of Torn API 6.15.0**, all **208 capability selections**, and
the 549 compatibility facade models. It implements the cross-SDK parity contract shared with the Rust, Go and Zig SDKs
([`spec/shared/PARITY_SPEC.md`](spec/shared/PARITY_SPEC.md), requirement ids such as `P1.2` are cited below).

## Install

```sh
# Release tarball (built by the release workflow for every v* tag)
npm install https://github.com/swervelord/Torn-TS-SDK/releases/download/v3.0.0/torn-ts-sdk-3.0.0.tgz
# From source
git clone https://github.com/swervelord/Torn-TS-SDK && cd Torn-TS-SDK && bun install --frozen-lockfile && bun run build && npm pack
```

Entry points: `torn-ts-sdk` (everything), `torn-ts-sdk/models` (types), `torn-ts-sdk/generated` (exact operations and
schemas), `torn-ts-sdk/testing` (consumer test kit). Default `tsc` settings (`module: nodenext` or `bundler`, `strict`) work;
no `allowImportingTsExtensions` or Bun types are needed. Deno: `npm:` specifiers or a `node_modules` install.

## Quickstart

```ts
import { TornSdk } from "torn-ts-sdk";

const sdk = await TornSdk.fromEnv(); // TORN_API_KEY or TORN_API_KEYS
const me = await sdk.user().profile(); // no id: the key owner (P8.1)
const { data, report } = await sdk.user().selectWithReport(["profile", "job"]);
console.log(me.profile.name, data.job, report.calls.length); // 1 HTTP call
const exact = await sdk.openapi().getUserProfile({ id: 3637232 });
```

## Authentication & keys

- Every request, v2 and v1 alike, authenticates with `Authorization: ApiKey <key>`; no key is ever put in a URL. A `key`
  passed as an operation, raw or filter parameter is moved to the header (or dropped from the query) (P2.1).
- Keys never appear in `JSON.stringify`, `util.inspect`, `String()`, error messages, hook payloads or reports; at most
  `***` plus the last four characters (`keyHint`) is shown (P2.2).
- Several keys form a pool with round-robin over healthy keys. Each key is `healthy`, `rate_limited(until)` or
  `disabled(reason, until?)`, driven by [`error-codes.json`](spec/shared/error-codes.json) (P2.3). Key errors (2, 10, 13,
  18) disable the key and retry immediately with the next one; code 14 disables until the next UTC midnight; code 16
  rotates without disabling. With no usable key left the call fails with `NoUsableKeysError` holding the last API error (P2.4).
- `sdk.keyStates()` returns per-key hint, state, `until`, remaining budget and known access level (P2.5).
- `fromEnv()` reads `TORN_API_KEY` / `TORN_API_KEYS` (comma-separated) from `process.env` (Node, Bun) or `Deno.env`
  (P2.6). Other variables: `TORN_API_BASE_URL_V2`, `TORN_API_BASE_URL_V1`, `TORN_HTTP_TIMEOUT_SECS`, `TORN_USER_AGENT`,
  `TORN_MAX_ATTEMPTS`, `TORN_NETWORK_RETRY_BACKOFF_MS`, `TORN_RATE_LIMIT_PER_KEY_PER_MIN`, `TORN_RATE_LIMIT_PER_IP_PER_MIN`,
  `TORN_MAX_IN_FLIGHT`, `TORN_VALIDATION` (`tolerant`|`strict`). Browsers/workers: pass keys explicitly.

```ts
const sdk = TornSdk.withApiKeys(["key-a", "key-b"], { rateLimits: { keyGroups: [["key-a", "key-b"]] } });
```

## Typed calls

- `sdk.openapi()` exposes every v2 operation (`getMyTravelInventory`, `getFactionWars`, ...) with typed parameters and
  responses. Each method's TSDoc carries the spec summary, description, required access level and path; generated model
  fields carry the spec's field descriptions.
- Resource facades (`sdk.user()`, `.faction()`, `.company()`, `.market()`, `.torn()`, `.racing()`, `.forum()`,
  `.property()`, `.key()`) accept an options object or an id shorthand: `sdk.market().itemmarket(206)`.
  Self-scoped selections need no id (`sdk.user().basic()`, `sdk.faction().members()`, P8.1).
- Unsafe integers decode as `bigint` (`Integer = number | bigint`); use `stringifyLosslessJson` to serialize.

## Batching

`select([...] as const)` combines compatible selections into one HTTP call and infers the exact intersection of the
selected envelopes (unselected, CSV and cross-resource selections are compile errors). `selectWithReport` adds the calls
made. The planner isolates standalone and direct-endpoint selections, sends selections v2 cannot serve to v1, and splits a
combined call Torn rejects with code 4. `selectSettled` decodes each selection independently, so one bad selection never
discards the others (P1.4). See [docs/BATCHING.md](docs/BATCHING.md).

## Pagination

Every endpoint with `_metadata.links` can be iterated (P7.1). Links are validated against the API host and their `key`
parameter is dropped; the key is re-attached as a header. Iteration shares the client's rate limiter and honors `signal`.

```ts
for await (const page of sdk.client().paginateOperation<GetMyAttacksResponse>("getMyAttacks", { limit: 100 }, { maxPages: 5 })) console.log(page.data.attacks.length);
for await (const attack of sdk.client().paginateItems("/user/attacks", { limit: 100 }, { limit: 250 })) console.log(attack);
```

## Errors

Every error extends `SdkError` and has a literal, bundler-stable `name` and an `errorKind`: `ApiError` (`api`: Torn
`code`, `message`, `keyHint`, `operation`), `HttpError` (`http`: status without a Torn envelope), `TransportError` /
`TimeoutError` (`transport`), `DecodeError` (`decode`: operation/selection, `jsonPath`, `expected`, redacted `excerpt`,
`raw` / `rawBody`), `ValidationError` / `AccessLevelError` (`validation`), `NoUsableKeysError` (`no_usable_keys`, `last`),
`CancelledError` (`cancelled`, `cause` = the abort reason) (P5.2). `TornErrorCode` and `tornErrorCodes` are generated from
`error-codes.json` (P5.1). Helpers: `isRetryable`, `isKeyError`, `isRateLimit`, `isAccessError`, `isTransient`,
`errorCode`, `errorKind` (P5.3).

## Rate limits & retries

- Local budgets are a rolling 60 s window: 100 requests per key (or per key group: keys of the same Torn user share one
  budget, declared with `rateLimits.keyGroups` or detected by `detectKeyOwners: true` / `client.detectKeyAccess()`) and
  1000 per egress route (P3.1, P3.2).
- Code 5 marks the key rate-limited until its window frees and immediately uses another key with budget; the SDK only
  sleeps when no key has budget (P3.3). Code 8 blocks the route and moves to another configured route, else fails (P3.4).
- Retries are classified by Torn code and HTTP status, never by message text (P4.1). Transient codes, HTTP
  429/500/502/503/504 and network errors back off `500 ms * 2^(n-1)` (cap 30 s) with full jitter; `Retry-After` is honored
  (cap 120 s); `maxAttempts` (default 4) counts sends on the same key; key rotations are free and bounded by the pool
  (P4.2, P2.4a). Codes 22/23 re-plan the request on the other API version once; only Torn's listed server-side v1
  fallbacks go to v2 first, other v1-only selections go straight to v1 (P4.3). Code 4 on a combined request splits it
  once; a selection that still fails is reported in `report.selectionErrors` (P4.5). `AbortSignal` cancels quota waits, retry sleeps and in-flight requests (P4.4).
- Per-route proxies: `routes: [{ id, proxyUrl, perIpPerMinute }]`. Bun and Deno proxy natively; on Node pass a proxy-capable
  `fetch` (`new FetchTransport({ fetch })`). A proxy the runtime cannot honor fails loudly instead of being bypassed.

## Access levels

`operationAccessLevels` and `selectionAccessLevels` come from [`access-levels.json`](spec/shared/access-levels.json)
(P6.1). `sdk.keyInfo()` is a typed `key/info` call. With `checkAccess: true` and known key levels (`keyAccess` or
`detectKeyAccess()`), a call the keys cannot make fails before sending with `AccessLevelError` naming the required level (P6.2).

## Forward compatibility

- Enums are open: generated enum types are `"A" | "B" | (string & {})`, unknown values decode and are preserved;
  `enumValues`, `knownEnumValues(name)` and `isKnownEnumValue(name, value)` expose the pinned members (P1.1).
- [`spec-overrides.json`](spec/shared/spec-overrides.json) relaxes spec defects proven by the live sweep
  (`TornHalloweenUpgrade.type`, `UserTrade.items`, `UserPropertyDetailsExtendedWithRent.status` are optional) (P1.2).
- Decoding is tolerant by default: unknown enum values, unknown properties and override-relaxed fields are accepted and
  reported as warnings (`decodeModelWithWarnings`). `validation: "strict"` (or `{ mode: "strict" }`) turns them into
  errors; the SDK's own tests use it (P1.3).
- Unknown selections pass through as v2 generic selections, unknown parameters are forwarded verbatim, and `comment` is
  forwarded on v1 and v2 (P1.5). `new RequestPlanner(caps, { routing: "legacy" })` reproduces the 2.x plans.

## Caching

Off by default. Pass a `ResponseCache` (`MemoryCache` or your own async store) as a dependency; default TTLs come from the
spec's cache notes (`operationCacheTtlMs`, `selectionCacheTtlMs`), other responses use `cacheDefaultTtlMs` (30 s). Errors are
never cached; cache keys hold a key fingerprint, never a key (P8.4).

```ts
const sdk = TornSdk.withApiKeys(keys, {}, { cache: new MemoryCache({ maxEntries: 500 }) });
```

## Hooks

`hooks: { onRequest, onResponse, onRetry, onError }` receive redacted events: operation, URL without key, attempt, status,
duration, `keyHint`, route (and delay/reason for retries, the error for failures). Hook exceptions never break requests (P8.3).

## Testing

`torn-ts-sdk/testing` provides `MockTransport` (scripted responses, recorded requests, `expectRequest`, `assertDone`),
`VirtualScheduler` (sleeps advance a virtual clock), `mockSdk(script, options)`, `jsonResponse`, `tornError` and
`loadFixture` (P8.5).

```ts
import { mockSdk, jsonResponse, tornError } from "torn-ts-sdk/testing";
const { sdk, transport } = mockSdk([tornError(17), jsonResponse({ profile: { /* ... */ } })]);
```

The SDK's own suite runs the shared conformance scenarios in `spec/shared/conformance/` (32/32, P9.1), unit tests,
golden planner fixtures and generator drift checks. Live tests are opt-in (`TORN_API_KEY`, or the legacy
`TORN_LIVE_TEST_API_KEY`) and include a sweep of every typed operation reachable with the key owner's ids (P9.2):
`bun test test/live.test.ts`.

## Raw access

`sdk.client().get(path, query, { apiVersion })` returns raw JSON for any path (v2 by default, v1 with `apiVersion: "v1"`);
`getTyped(path, schemaName, query)` decodes it into any generated model; `rawSelections([...])` accepts any selection name
(P8.2). `RequestPlanner` builds inspectable plans offline; `HttpTransport` can be replaced entirely.

## Helpers

`tornUrls.profile / attack / faction / company / bazaar / itemMarket / trade / forumThread / property / sendMessage`,
`fromTornTimestamp`, `toTornTimestamp`, `tornNow`, `formatTct`, `formatTctDateTime`, `tctStartOfDay`,
`msUntilTctMidnight` (TCT = UTC) (P8.6). Constants: `SDK_VERSION`, `SPEC_VERSION`, `SPEC_SHA256`; capabilities and schemas
are embedded, nothing is read from disk at runtime (P8.7).

## Versioning

Semantic versioning; the minor version moves with each Torn API contract bump and breaking changes bump the major version.
3.0.0 changed the package exports, the default decoding and routing behavior and the retry policy; see the
[CHANGELOG migration notes](CHANGELOG.md#migrating-from-2x). Development: `bun install --frozen-lockfile`,
`bun run check` (typecheck, tests, generator/refresh drift checks, parity fixtures, build) and `bun run typecheck:tsc`;
`bun run smoke:pack` installs the packed tarball into fresh Node/Bun/Deno/tsc consumer projects. See
[CONTRACT.md](CONTRACT.md) and [docs/COVERAGE_AUDIT.md](docs/COVERAGE_AUDIT.md).
