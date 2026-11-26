# Changelog

## 4.0.0 - 2026-11-25

Updated the pinned official Torn OpenAPI contract from 6.15.7 to 6.21.0: 248 operations, 772 component schemas, and 213
capability selections. Torn published no patch notes; the changes below come from the specification diff and were
confirmed live where the test key allows (it has no faction). This is a major release because three existing typed facade
helpers change their return types (see "Migrating from 3.x").

### Added
- `torn/headlines` (Public key): `sdk.torn().headlines()`, `getTornHeadlines` (`striptags` defaults to `false`, HTML kept),
  `TornHeadline` (`id` and `link` are nullable, `importance` is `normal` or `urgent`).
- `faction/headlines` (Minimal key with faction API access): `sdk.faction().headlines()`, `getMyFactionHeadlines`.
- `faction/{crimeId}/ochistory` (Limited key with faction API access): `sdk.faction().ochistory(options.withCrimeId(id))`,
  `getMyFactionOrganizedCrimeHistory`. `FactionOcHistoryEntry.details` is one of eight shapes chosen by `action`
  (`FactionOcHistoryActionEnum`), or `null` for `Completed`, `Failed` and `Expired`; unknown actions decode (P1.1).
- `market/pointshistory` and `market/{id}/itemhistory` (Public key): `pointshistory()`, `itemhistory(id)`,
  `getMarketPointsHistory`, `getMarketItemHistory` (`limit` 1-1000, default 100, from the new `ApiLimit1000Default100`;
  `MarketHistoryEntry.price` and `circulation` are nullable; paginated).
- `user/auctionhouse` (Limited key): `sdk.user().auctionhouse()`, `getMyAuctionHouseListings` (`cat`: `all`, `ongoing`,
  `complete`; paginated).
- `user/bazaar` (Limited key), `user/display` and `user/{id}/display` (Public key), `user/criminalrecord` and
  `user/{id}/criminalrecord` (Public key) are native v2 endpoints: `getMyBazaar`, `getMyDisplayCase`, `getUserDisplayCase`,
  `getMyCriminalRecord`, `getUserCriminalRecord`. `UserCriminalRecordResponse.criminalrecord` is `UserCriminalRecordV2` or
  `UserCriminalRecordV1` (by `version`).
- `/user/honors` and `/user/medals` take `cat` (`UserHonorsCategory`, `UserMedalsCategory`). Without `cat` (or `all`) the
  response is the existing `{id, timestamp}` list; any other category (including `latest`) returns the detailed shape
  (`name`, `description`, `is_unlocked`, honors `is_tracked`, nullable `timestamp` and `progress`). New facade helpers
  `sdk.user().honorsDetailed(category)` and `medalsDetailed(category)` return `UserHonorsDetailedResponse` /
  `UserMedalsDetailedResponse`; `honors()` and `medals()` are unchanged. `getMyHonors`/`getMyMedals` now return the union.
- `/market/auctionhouse` and `/market/{id}/auctionhouse` take `cat` (`MarketAuctionHouseCategory`: `complete` (default),
  `ongoing`); `AuctionHouseResponse` gains optional `auctionhouse_timestamp` and `auctionhouse_delay` (ongoing only).
  The 3.x manual facade model `MarketAuctionHouseBundle` does not carry them; use `getMarketAuctionHouse` or the raw helper.
- Required `template: FactionRankedWarTemplate` (`mode: FactionRankedWarMode | null`, `rules: FactionRankedWarRule[]`, both
  open strings) on `FactionRankedWar`, `FactionRankedWarDetails` and the ranked war report.
- Required `sensitive_data` and `legacy_permissions` booleans in `KeyInfoResponse.info.access`.
- Selection enums: `UserSelectionName` gains `auctionhouse`, `itemmods`, `organizedcrimes`, `virus`, `bazaar`, `display`,
  `criminalrecord`; `FactionSelectionName` gains `dirtybombs`, `headlines`, `inventory`, `ochistory`, `warfare`;
  `TornSelectionName` gains `headlines`; `MarketSelectionName` gains `itemhistory`, `pointshistory`. The new enum members are
  generic `/resource?selections=` selections, so `faction` `dirtybombs`/`inventory`/`warfare` and `user`
  `itemmods`/`organizedcrimes`/`virus` now batch with other selections instead of using their dedicated endpoints.
- P7.1: `paginateItems()` (and `pageItems`) also find wrapped item lists such as `display.items` and `bazaar.items`.
- Doc comments: cache durations on company/companies, market item market, properties, rentals and auction house,
  torn/user bounties, user networth and properties; `racing/races` `available` covers custom races only.

### Changed
- `/user/revives`, `/user/revivesFull`, `/faction/revives` and `/faction/revivesFull` need a Minimal key (was Limited), from
  the shared `access-levels.json` (P6).
- User `bazaar`, `criminalrecord` and `display` are no longer server-side v1 fallbacks, so `routing: "legacy"` sends them to
  v2 as well (P4.3).
- Faction `search` left `FactionSelectionName`; the planner sends it to `/faction/search`.

### Removed upstream (kept as deprecated compatibility names)
- The user `factionbalance` selection and the `UserFactionBalance` / `UserFactionBalanceResponse` schemas. The types and
  decoders remain (6.13.6 compatibility), `sdk.user().factionbalance()` is deprecated and its request passes through
  unchanged (P1.5); Torn may reject it. Use `sdk.faction().balance()`.
- `UserSelectionName` drops `factionbalance`, `itemmod` and `snapshot`; `FactionSelectionName` drops `dirtbombs` and
  `search`; `CompanySelectionName` drops `snapshot`. The enums are open, so these strings still type-check and decode;
  `knownEnumValues()` no longer lists them. The `faction().dirtbombs()` and `user().itemmod()` aliases are deprecated and
  keep routing to `/faction/dirtybombs` and `/user/itemmods`.

### Migrating from 3.x
- `sdk.user().bazaar()`, `display()` and `criminalrecord()` (and `select([...])` / typed batches with these selections)
  return the generated v2 models `UserBazaarResponse`, `UserDisplayResponse` and `UserCriminalRecordResponse` instead of the
  3.x manual `UserBazaarBundle`, `UserDisplayBundle` and `UserCriminalRecordBundle`. Torn's v2 API now answers these
  selections with new shapes (verified live), which the 3.x types cannot decode:
  - bazaar: `bazaar` is `{exists, is_open, items}` (was an item array plus `bazaar_is_open`); items carry `uids` with
    per-uid prices, a nullable `price` and `item_details`.
  - display: `display` is `{items}` (was an item array); paginated with `offset`.
  - criminalrecord: v2 keys (`illicit_services`, `illegal_production`) plus `version`; v1 records use the v1 keys.
  The manual bundle types stay exported for old payloads.
- Code that reads `getMyHonors()`/`getMyMedals()` must narrow the new basic/detailed union (or use the facade helpers).
- Payloads decoded with `decodeModel('KeyInfoResponse' | 'FactionRankedWar*', ...)` must contain the new required fields.

### Tests
- `test/api-6210.test.ts`: scrubbed live fixtures (headlines with a synthetic urgent entry with null id/link, points and
  item history with null prices, user auction house, bazaar and empty bazaar, display case, criminal record v2, detailed
  honors/medals, ongoing auction house, key info flags, ranked war templates with named and null mode) and spec-built ones
  (faction headlines, OC history covering every action plus an unknown one, criminal record v1) decode exactly; negative
  cases for new required keys and wrong types; every new enum, open-enum behavior and retired selection names; planner
  routing and access levels for all new selections; exact paths (`/market/206/itemhistory?limit=3&sort=ASC`,
  `/user/display?cat=Melee&offset=3`, `/faction/123/ochistory`, `/user/honors?cat=crimes`,
  `/market/auctionhouse?cat=ongoing`, `/user/1/criminalrecord`); facade, raw and batch helpers; the itemhistory `prev` and
  display `next` (offset) pagers never put the key in a query.
- Frozen 6.13.6 goldens: selections Torn itself re-routed (`tools/upstream-selection-changes.ts`) are checked against the
  frozen capabilities only, the three re-typed helpers are listed explicitly in the facade-dispatch test and the typing
  report (`typingReportHelperUpgrades`), and the frozen generated samples list the new required fields.
- `test/live.test.ts`: live headlines, points/item history, ongoing auction house, criminal record, display case, auction
  house listings, detailed honors/medals, key info flags, and one batched `bazaar,display,criminalrecord,bars` v2 call;
  faction headlines and OC history skip on code 7 (no faction).

## 3.1.0 - 2026-11-09

Updated the pinned official Torn OpenAPI contract from 6.15.0 to 6.15.7: 237 operations, 726 component schemas, and 208
capability selections. No endpoints or selections were added or removed and Torn published no patch notes; the changes
below come from the specification diff and were confirmed live where the test key allows.

### Added
- `UserUnlockedGym` and `UserGymResponse.gym.unlocked_gyms` (`user/gym`, Public key).
- `TornCalendarActivity.earliest_start` and `latest_end` (`torn/calendar`); `fixed_start_time` is now required.
- `AttackLogAttacker`, `AttackLogDefender` and `AttackLogItem` are named schemas (previously inline in `AttackLog`, same wire
  shape). `attacker`, `defender` and `attacker_item` are `null` in stealthed attacks; the attacker's `item` now requires
  `id` and `name`.
- `ReportStockAnalysis` items gain `restock_timestamp` (`integer | null`, required) and type `item.stock` as an integer
  (it was required but untyped, so `JsonValue`) (`faction/reports`, `cat=stockanalysis`). Spec-only: not probed live.
- `RacingRacesCategoryEnum` (`official`, `custom`, `available`) types the `cat` parameter of `/racing/races` and the
  `/racing` generic endpoint. `available` lists joinable races that have not started (`from`/`to` are ignored).
  `RacingRaceTypeEnum` is unchanged and still used by `/user/races`.
- `/user/log` documents inclusive `from`/`to` bounds and `_metadata.nanostamp` as the nanosecond paging cursor; following
  the `prev` link with `paginate(..., { direction: "prev" })` keeps its `nanostamp` (P7.1). No wire change.

### Compatibility
- The upstream spec removed the never-referenced `CompanySearchParameter`, `Parameters` and `UserSearchParameter`
  schemas. Their types, `*Variant1` enum types, runtime decoders and `enumValues` entries remain as deprecated 6.13.6
  compatibility names; the generator now keeps `enumValues`/`EnumName` entries for removed enum schemas (P1.1).
- Path id lists (`/forum/{categoryIds}/threads`, `/torn/{ids}/honors|itemdetails|items|itemstats|medals`) changed from
  `style: form, explode: false` to `style: simple`; requests still send comma-joined ids (`/torn/1,2/items`).
- New required fields are validated like every required field (a payload without them fails decoding); the three
  `spec-overrides.json` relaxations (P1.2) are unchanged. Facade calls that return the frozen 6.13.6 manual models keep the
  new calendar fields in `extra`.

### Tests
- `test/api-6157.test.ts`: scrubbed live fixtures (gym, calendar, available races, attack log with a stealthed all-null
  entry, user log) and a spec-built stock analysis report decode exactly; negative cases for every new required key;
  open-enum checks for `RacingRacesCategoryEnum`; deprecated compatibility names; planner and exact-operation paths
  (`/torn/1,2/items`, `cat=available`); the user/log pager follows the `prev` link with its `nanostamp` and no key in the query.
- `test/live.test.ts`: live `user/gym` (non-empty `unlocked_gyms`, facade and a batched `gym,bars` call),
  `torn/calendar` and `racing/races?cat=available`.

## 3.0.0 - 2026-10-31

Brings the SDK up to the cross-SDK parity contract (`spec/shared/PARITY_SPEC.md`, vendored with the shared
`error-codes.json`, `access-levels.json`, `spec-overrides.json` and conformance scenarios). The pinned Torn API contract is
unchanged (6.15.0: 237 operations, 724 component schemas, 208 capability selections).

### Forward-compatible decoding
- P1.1: generated enums are open (`"A" | "B" | (string & {})`); unknown values decode and are preserved. New
  `enumValues`, `knownEnumValues`, `isKnownEnumValue`, `KnownEnumValue<Name>`.
- P1.2: the generator applies `spec/shared/spec-overrides.json` (including properties declared inside inline `allOf`
  branches): `TornHalloweenUpgrade.type`, `UserTrade.items` and `UserPropertyDetailsExtendedWithRent.status` are optional.
- P1.3: decoding is tolerant by default (unknown enum values, unknown properties and override-relaxed fields are warnings,
  see `decodeModelWithWarnings`); `validation: "strict"` / `{ mode: "strict" }` / `TORN_VALIDATION=strict` makes them errors.
- P1.4: `DecodeError` carries `operation`/`selection`, `jsonPath`, `expected`, a redacted `excerpt`, and the payload
  (`raw`, `rawBody`); union failures name the closest variant's failing leaf; `selectSettled()` and `DecodeError.partial`
  keep the selections that decoded.
- P1.5: unknown selections pass through as v2 generic selections (planner, `rawSelections`, `typedSelection`); unknown
  parameters/filters are forwarded verbatim (planner and `openapi()`); `comment` is forwarded on v1.

### Keys, rate limits, retries, errors
- P2.1: header-only authentication for v2 **and v1** (`Authorization: ApiKey <key>`; Torn v1 accepts it, verified live
  2026-10-31). No key is ever put in a URL: v1 requests no longer send `key=`, `buildUrl` drops any `key` query entry and
  ignores its deprecated `apiKey` argument, and a `key` passed as an operation/raw parameter is moved to the request's
  Authorization header (`ExecutionOptions.apiKey`).
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
- **v1 authentication**: v1 requests now send the key in the `Authorization` header instead of `?key=`. Custom
  `HttpTransport` implementations should authenticate every request with the header (`TransportRequest.apiVersion` no
  longer changes how the key is sent); `buildUrl(base, path, query, apiKey)` ignores `apiKey`.
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
