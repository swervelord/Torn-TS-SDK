# Changelog

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
