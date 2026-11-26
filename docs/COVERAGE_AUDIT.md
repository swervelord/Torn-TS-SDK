# Torn API coverage audit

The SDK covers **all 248 official Torn v2 operations** and **all 772 component schemas** in the official **6.21.0** snapshot checked on 2026-11-25. Three operations return CSV strings. The immutable Markdown vault comparison below remains the historical 6.13.6 baseline; current operation and shared-parameter hashes are separately recorded in `spec/parity/docs-coverage.json`.

## 6.21.0 update

Relative to 6.15.7 there are eleven new operations and no patch notes; every change below comes from the specification
diff and live probes. New endpoints: `/torn/headlines`, `/faction/headlines`, `/faction/{crimeId}/ochistory`,
`/market/pointshistory`, `/market/{id}/itemhistory`, `/user/auctionhouse`, `/user/bazaar`, `/user/display`,
`/user/{id}/display`, `/user/criminalrecord` and `/user/{id}/criminalrecord`. The last five replace Torn's server-side v1
fallbacks for `bazaar`, `display` and `criminalrecord` with native v2 responses in new shapes, so the SDK's facade helpers
for those three selections now return the generated v2 models (4.0.0). Six new capability selections are added (torn and
faction `headlines`, faction `ochistory`, market `itemhistory` and `pointshistory`, user `auctionhouse`) and user
`factionbalance` is removed; the retired `dirtbombs`/`itemmod` aliases keep their dedicated endpoints.

Sixty-seven component schemas are added (headlines, the OC history entry, action enum and eight detail shapes, ranked war
templates, market history entries, user auction house, bazaar, display case, criminal record v1/v2 and detailed
honors/medals) and `UserFactionBalance`/`UserFactionBalanceResponse` are removed (kept as deprecated compatibility names).
`/user/honors` and `/user/medals` take a `cat` that switches to the detailed shape; `/market/auctionhouse` takes `cat`
(`complete`/`ongoing`) and reports `auctionhouse_timestamp`/`auctionhouse_delay` for ongoing listings. Ranked wars require
`template`, key info requires `access.sensitive_data` and `access.legacy_permissions`, and revives (user and faction) need a
Minimal key. Selection enums gained the new and previously dedicated-only selections (`dirtybombs`, `inventory`,
`warfare`, `itemmods`, `organizedcrimes`, `virus`), which therefore move to generic batching; faction `search` left the
enum and uses `/faction/search`. The three spec overrides remain valid. Headlines, points and item history, auction house
(user and ongoing market), bazaar, display case, criminal record, detailed honors/medals, key info and ranked war templates
were confirmed live; faction headlines and OC history return code 7 for the test key (no faction), so their fixtures and
the criminal record v1 fixture are built from the specification. The OC history `role.id` is typed by the spec as
`TornOrganizedCrimePositionId` (`"P1"`..`"P6"`); no live payload was available to confirm it.

## 6.15.7 update

Relative to 6.15.0 there are no new or removed operations or selections, and no patch notes: every change below comes from
the specification diff and live probes. Five component schemas are added: `UserUnlockedGym`, `AttackLogAttacker`,
`AttackLogDefender`, `AttackLogItem` (the last three were inline objects of `AttackLog`) and `RacingRacesCategoryEnum`
(`official`, `custom`, `available`). Three never-referenced schemas are removed (`CompanySearchParameter`, `Parameters`,
`UserSearchParameter`); the SDK keeps them, and their `*Variant1` enums, as deprecated 6.13.6 compatibility names.

`UserGymResponse.gym` requires `unlocked_gyms`. `TornCalendarActivity` requires `earliest_start`, `latest_end` and the
previously optional `fixed_start_time`. `AttackLog.attacker_item` is `AttackLogItem | null` and the attacker's `item`
requires `id` and `name`. `ReportStockAnalysis` items require `restock_timestamp` (nullable) and declare `item.stock` as an
integer (it was required but untyped). `/racing/races` and the racing `cat` parameter use `RacingRacesCategoryEnum`; the
`available` category lists joinable races that have not started and ignores `from`/`to`. `RacingRaceTypeEnum` remains
for `/user/races`. `/user/log` uses inclusive `from`/`to` bounds and documents `_metadata.nanostamp` as the nanosecond
paging cursor that the `prev` link carries. Path id lists (`/forum/{categoryIds}/threads`, `/torn/{ids}/...`) moved
from `style: form, explode: false` to `style: simple`; the wire format is still comma-joined. The three spec overrides
remain valid. Gym, calendar, available races, attack log and user log payloads were confirmed live; the stock analysis
report could not be probed and its fixture is built from the specification.

## 3.0.0 parity update (spec unchanged, 6.15.0)

The live sweeps (PARITY_SPEC P9.2) proved three spec defects, recorded in `spec/shared/spec-overrides.json` and applied by the
generator: `TornHalloweenUpgrade.type` (required upstream, omitted by `GET /v2/torn/halloween`), `UserTrade.items`
(required upstream, omitted on some trades by `GET /v2/user/trades`) and `UserPropertyDetailsExtendedWithRent.status`
(required in an inline `allOf` branch, omitted by `GET /v2/property/{id}/property`) are optional. Strict validation still reports their
absence. Enums are open, so values newer than the snapshot (as `Dealer` and `end_with_dirty_bomb` were for 6.14.0) decode
instead of failing; per-operation access levels come from `spec/shared/access-levels.json`, and the spec's "Cached
selection" notes now provide default TTLs for the optional response cache.

## 6.15.0 update

Relative to 6.14.0, the snapshot adds `/user/travelinventory` (`getMyTravelInventory`), the `travelinventory` user selection and generic response variant, and five component schemas: `UserTravelInventoryResponse`, `UserTravelInventory`, `UserTravelInventoryCapacity`, `UserTravelInventorySlot`, and `UserTravelInventoryItem`. The selection lists items carried abroad, or the items that would be taken when departing now, and requires a Limited access key. Each slot's `item` and each item's `uid` are required but nullable: empty slots and stackable items without a unique ID decode as `null`.

`JobPositionCasinoEnum` gains `Dealer`. `FactionTerritoryWarResultEnum` gains `end_with_dirty_bomb`; that addition appears only in the specification, not in the release announcement. The announced server-side `user -> job` fix changes no schema.

## 6.14.0 update

Relative to 6.13.8, the snapshot adds `/user/halloween` and `/torn/halloween`, seven component schemas, Halloween selection enum members and generic response variants, and missing city statistics. All changes are imported from the official specification. User Halloween requires a Minimal access key. The endpoint is spelled `halloween`; the announcement's `hallween` spelling is not an API path.

The upstream inventory cache durations are now 900 seconds per user category and 300 seconds for all faction inventory items. The SDK did not cache responses before 3.0.0; the optional 3.0.0 cache uses these durations as default TTLs. Refreshed endpoint descriptions preserve these durations and raw stability annotations.

The announcement marks selections stable except elimination selections, user search, and user snapshot. The specification currently labels `/user/halloween` `Untable`; the raw snapshot preserves this typo and its stability should be treated as unconfirmed. `TornHalloweenUpgrade` also requires a `type` key without declaring its schema. The SDK exposes that key as `JsonValue` and retains the actual value; since 3.0.0 it is optional per `spec-overrides.json` (strict mode still requires it). No narrower enum is inferred.

The [Torn-API Markdown vault](https://github.com/swervelord/Torn-API/tree/ac4ba829bbdbdc4ef5e058b48aae5088b9d5fd22) targets **6.13.6**. Its official Torn reference contains 234 endpoint documents, 711 schema documents, and 38 shared parameter definitions. Every embedded exact JSON definition was compared with the SDK's frozen 6.13.6 snapshot: **zero differences**. All 195 selections listed in its discovery tables exist in the SDK capability catalog. The SDK also carries extra legacy selections and explicit routing overrides maintained in the SDK routing policy.

`spec/parity/docs-coverage.json` records the source commit, structural SHA-256 hashes, document inventory, selection coverage, and live-spec differences. `test/docs-coverage.test.ts` verifies these facts offline without requiring the documentation repository or network access.

## Live API changes now covered

The official [OpenAPI specification](https://www.torn.com/swagger/openapi.json) advanced to 6.13.8:

- Added `ErrorNoCompetitionAvailable`, with error code `33`, to `ApiError`.
- Renamed `TornEliminationTeamLeader` to `TornEliminationTeamCaptain` without changing the player structure.
- Replaced the required elimination-team field `leaders` with `captains` and limited `captains.vice_captains` to five entries in the schema.
- Added no endpoints and removed no endpoints. No request parameters or selection enums changed.

Current generated operation types and decoders use `captains`. `legacy6136Models` and `decodeLegacyModel` preserve the 6.13.6 API contract with `leaders`. Deprecated root aliases preserve the removed public `TornEliminationTeamLeader` and `TornEliminationTeamLeaders` names. The 1,628 frozen generated-model regression fixtures remain unchanged and validate against the frozen registry; migration tests deliberately prove that the old elimination-team payload does not satisfy the current contract.

## Scope limits

“100% coverage” here refers to the official **versioned Torn v2 OpenAPI surface**, not every API mentioned anywhere in the vault, complete live payload knowledge, or 100% code branch coverage.

The vault also documents **11 Weav3r, 17 TornStats, and 10 Yata endpoint pages**. Those are separate services with separate contracts and are outside this Torn SDK. No implementation of those services is claimed.

The vault does not contain a complete Torn API v1 specification. It documents v1 fallback names and legacy behavior within its v2 reference. The SDK provides a v1 catalog, routing, and curated manual models; neither this vault nor this audit proves that every possible v1 payload has complete static types. Schema fields intentionally unspecified upstream remain `JsonValue`, and documented open string selections remain open strings.

Routing policy can be stricter than the vault's generic-selection prose because the SDK preserves explicit routing overrides, including company selections and legacy spelling aliases. Exact generated operations are always available independently of the planner.

The audit and tests establish pinned structural coverage. They do not authenticate and execute every live endpoint, which would require different account privileges, game state, and IDs.
