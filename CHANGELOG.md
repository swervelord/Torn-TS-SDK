# Changelog

## 2.1.0 - 2026-10-27

- Updated the pinned official Torn OpenAPI contract from 6.13.8 to 6.14.0: 236 operations, 719 component schemas, and 207 capability selections.
- Added fully generated user and Torn Halloween endpoint models and exact operations, resource helpers, raw aliases, and inferred selection batches. User Halloween requires a Minimal access key.
- Added all newly declared city statistics. Refreshed selection enums, response envelopes, upstream caching descriptions, and stability annotations.
- Recorded upstream inventory cache lifetimes: user inventory is 900 seconds per category; faction inventory is 300 seconds for all items. The SDK itself does not cache responses.
- Retained required properties whose upstream schema is undeclared as required `JsonValue` fields. In particular, Torn Halloween upgrade `type` is required upstream without a type definition; decoding enforces presence and preserves the value without inventing an enum.
- Preserved the explicit frozen 6.13.6 compatibility contract and regression fixtures. Current typing audits and documentation drift records now have separate current metadata.

Upstream currently spells `/user/halloween` stability `Untable`. The exact snapshot preserves that value; callers should treat this endpoint as having unconfirmed stability until Torn corrects it. The announcement otherwise marks selections stable except elimination selections, user search, and user snapshot.

Validation uses offline representative data and local HTTP/proxy servers. Live authenticated endpoint coverage remains opt-in.
