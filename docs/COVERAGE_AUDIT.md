# Torn API coverage audit

The SDK covers **all 234 official Torn v2 operations** and **all 712 component schemas** in the official **6.13.8** snapshot checked on 2026-10-23. All paths, operation parameters, response media types, and operation IDs are unchanged from 6.13.6. Three operations return CSV strings.

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
