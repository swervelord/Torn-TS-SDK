# Batching Torn selections

Send related selections together to reduce HTTP calls and rate-limit consumption. `profile` and `job` can use a single generic `/user` request when they describe the same user:

```ts
import { TornSdk, UserOptions } from 'torn-ts-sdk';

const sdk = await TornSdk.fromEnv();
const options = new UserOptions().withId('YOUR_USER_ID');

const { data, report } = await sdk.user().selectWithReport(
  ['profile', 'job'],
  options,
);

// Inferred profile and job response types; both payloads are validated.
console.log(data.profile, data.job);
console.log(report.calls.length); // 1, when the combined request succeeds
```

`select()` returns the inferred data directly. `selectWithReport()` also exposes the HTTP call report, including API version, route, requested selections, and fallback status.

The low-level client uses the same planner:

```ts
const report = await sdk.client().getResourceData(
  'user',
  ['profile', 'job'],
  { id: 'YOUR_USER_ID' },
);
```

This produces `GET /user?selections=profile,job&id=YOUR_USER_ID` against the configured v2 base URL. The executor adds the API key. `getUserData()` is the user-specific equivalent. The low-level response is JSON; use the typed facade for inferred selection types and payload validation.

## How the planner minimizes calls

For one resource request, the planner normalizes and deduplicates selection names, then uses the checked-in capability metadata to construct these groups:

| Group | HTTP calls | Position |
| --- | --- | --- |
| Compatible v2 generic selections | One combined request | First |
| Standalone generic selections | One per selection | After the combined group |
| Direct endpoint selections | One per selection, with path placeholders filled | After standalone selections |
| v1 selections and declared v1 fallbacks | One combined v1 request | Last |

An empty group produces no call. An empty selection list produces no calls. The successful initial plan therefore uses:

```text
(1 if the v2 combined group is nonempty)
+ number of standalone selections
+ number of direct selections
+ (1 if the v1 group is nonempty)
```

This is the minimum implied by the pinned planner's routing rules. Dedicated selection aliases retain their own calls. Separate requests are executed independently; the SDK does not queue unrelated method calls for later coalescing.

For example, these exact generated endpoint methods intentionally issue two HTTP requests:

```ts
await Promise.all([
  sdk.openapi().getUserProfile({ id: 123 }),
  sdk.openapi().getMyJob(),
]);
```

They target `/user/123/profile` and `/user/job`. Use `sdk.user().select(...)` to request explicit selection batching. Likewise, calling two individual typed facade helpers separately issues two requests.

## Shared targets and filters

A batch has one resource, one target ID, and one filter map. Combine selections when those shared values are appropriate for every selected payload:

- Keep resources separate: user and faction data require separate calls.
- Use the same target throughout a batch. A user ID, trade ID, race ID, and item ID are different kinds of target.
- Keep filters compatible. A single batch cannot express two different `cat` values or two different time ranges. Split those requests yourself.
- Supply a key with enough access for every selected payload. The highest required access level applies to the combined request.
- Use the dedicated snapshot text helper for CSV snapshots; snapshots are excluded from typed JSON batches.

The planner reads routing flags and parameter allowlists. It does not infer semantic conflicts between selection targets or filter values. The typed facade validates each selection's supported options, but callers still choose a consistent target and shared filters.

Generic calls keep parameters accepted by that resource's generic endpoint. Direct calls use the selection's query allowlist. V1 calls use the static v1 allowlist. Unknown filters are removed. A generic filter being allowed does not establish that it is meaningful for every selected payload.

## Recoverable errors

If Torn rejects a combined request because selections cannot be used together, the executor sends the precomputed individual requests once each. With three selected payloads, that recovery costs four HTTP attempts: one rejected combined request and three successful individual requests. Failed attempts are omitted from `report.calls`; successful split calls have `fallback: true`.

Individual split requests do not recursively split again. Unrelated API errors do not trigger splitting. Retryable network, HTTP, and rate-limit failures follow the executor's retry policy and may increase total attempts.

If Torn reports that a v2 selection requires v1, runtime v1 fallback takes precedence over combination splitting. The executor rebuilds the v1 request using allowed v1 filters and the generic ID. The call report records `strategy: 'version-fallback'` and `apiVersion: 'v1'`.

## Verification

Run `bun test test/batching-contract.test.ts`. The suite checks every within-resource pair in the pinned inventory, each full compatible group, and every resource's full inventory in both orders. It also verifies the actual transport boundary for `profile` plus `job`, generated endpoint separation, duplicate removal, filter scrubbing, and one-level fallback splitting.

These are deterministic local tests. They establish planner and executor behavior without spending Torn API quota. Live endpoint behavior remains subject to the supplied key, target, filters, and Torn's current server rules.
