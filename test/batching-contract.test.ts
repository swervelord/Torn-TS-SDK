import { describe, expect, test } from 'bun:test';
import { defaultCapabilities, type SelectionCapability } from '../src/capabilities.ts';
import { PlanRequest, RequestPlanner } from '../src/planner.ts';
import { V1Catalog } from '../src/v1-catalog.ts';
import { TornClient } from '../src/client.ts';
import { RequestExecutor } from '../src/executor.ts';
import { OpenApi } from '../src/generated/operations.ts';
import type { HttpTransport, TransportRequest, TransportResponse } from '../src/transport.ts';
import type { PlannedRequest } from '../src/types.ts';

const planner = new RequestPlanner(), v1 = new V1Catalog();
type Bucket = 'combined' | 'standalone' | 'direct' | 'v1';
function bucket(resource: string, selection: SelectionCapability): Bucket {
  if ((selection.fallback_to_v1 || selection.unavailable_in_v2) && v1.hasSelection(resource, selection.name)) return 'v1';
  if (selection.requires_direct_endpoint_only || !selection.can_use_generic_endpoint) return 'direct';
  return selection.standalone_only ? 'standalone' : 'combined';
}
function requestFor(resource: string, selections: readonly SelectionCapability[]): PlanRequest {
  const request = new PlanRequest(resource, selections.map(selection => selection.name)).withId('123');
  for (const selection of selections) for (const endpoint of selection.endpoints ?? []) for (const placeholder of endpoint.matchAll(/\{([^}]+)\}/g)) request.withPathArg(placeholder[1]!, '123');
  return request;
}
function assertMinimalGroups(resource: string, selections: readonly SelectionCapability[]): void {
  const expected = { combined: [] as string[], standalone: [] as string[], direct: [] as string[], v1: [] as string[] };
  for (const selection of selections) expected[bucket(resource, selection)].push(selection.name);
  const calls = planner.plan(requestFor(resource, selections)).requests;
  const minimum = Number(expected.combined.length > 0) + expected.standalone.length + expected.direct.length + Number(expected.v1.length > 0);
  expect(calls.length).toBe(minimum);
  const generic = calls.filter(call => call.apiVersion === 'v2' && call.strategy === 'generic-combined');
  expect(generic.map(call => call.selections)).toEqual(expected.combined.length ? [expected.combined] : []);
  expect(calls.filter(call => call.apiVersion === 'v1').map(call => call.selections)).toEqual(expected.v1.length ? [expected.v1] : []);
  expect(calls.filter(call => call.strategy === 'direct-endpoint').flatMap(call => call.selections)).toEqual(expected.direct);
  expect(calls.filter(call => call.apiVersion === 'v2' && call.strategy === 'generic-single').flatMap(call => call.selections)).toEqual(expected.standalone);
  for (const call of calls) {
    expect(call.path).not.toContain('{');
    expect(call.fallbackSplit.length).toBe(call.apiVersion === 'v2' && call.strategy === 'generic-combined' && call.selections.length > 1 ? call.selections.length : 0);
    if (call.fallbackSplit.length) expect(call.fallbackSplit.map(split => split.query.selections)).toEqual(call.selections);
  }
}

describe('exhaustive pairwise selection batching and full groups', () => {
  for (const [resource, caps] of Object.entries(defaultCapabilities.resources)) {
    const selections = caps.selections ?? [];
    test(`${resource}: every pair uses the minimum routing groups`, () => {
      for (let a = 0; a < selections.length; a++) for (let b = a + 1; b < selections.length; b++) assertMinimalGroups(resource, [selections[a]!, selections[b]!]);
    });
    test(`${resource}: all compatible selections share one generic call`, () => {
      const compatible = selections.filter(selection => bucket(resource, selection) === 'combined');
      if (!compatible.length) return;
      const calls = planner.plan(requestFor(resource, compatible)).requests;
      expect(calls).toHaveLength(1);
      expect(calls[0]!.query.selections).toBe(compatible.map(selection => selection.name).join(','));
      expect(calls[0]!.path).toBe(caps.generic_path!);
    });
    test(`${resource}: full inventory and reversed inventory preserve bucket order`, () => {
      assertMinimalGroups(resource, selections);
      assertMinimalGroups(resource, [...selections].reverse());
    });
  }
});

class RecordingTransport implements HttpTransport {
  requests: TransportRequest[] = [];
  constructor(private respond: (request: TransportRequest, count: number) => TransportResponse) {}
  async execute(request: TransportRequest): Promise<TransportResponse> { this.requests.push(request); return this.respond(request, this.requests.length); }
}
const response = (value: unknown): TransportResponse => ({ status: 200, body: JSON.stringify(value) });
const clientWith = (respond: (request: TransportRequest, count: number) => TransportResponse) => {
  const transport = new RecordingTransport(respond);
  const client = new TornClient(planner, new RequestExecutor(transport, ['mock-key'], { maxAttempts: 1 }));
  return { client, transport };
};

describe('batching at the public HTTP boundary', () => {
  test('getResourceData profile plus job sends one GET /user request', async () => {
    const { client, transport } = clientWith(() => response({ profile: { id: 123 }, job: null }));
    const report = await client.getResourceData('user', ['profile', 'job'], { id: '123' });
    expect(transport.requests).toHaveLength(1);
    expect(transport.requests[0]).toMatchObject({ path: '/user', method: 'GET', query: { selections: 'profile,job', id: '123' } });
    expect(report.calls).toHaveLength(1);
    expect(report.mergedJson).toEqual({ profile: { id: 123 }, job: null });
  });
  test('getUserData also batches duplicates and normalized names into one call', async () => {
    const { client, transport } = clientWith(() => response({}));
    await client.getUserData([' profile ', 'JOB', 'profile'], { id: '123' });
    expect(transport.requests).toHaveLength(1);
    expect(transport.requests[0]!.query.selections).toBe('profile,job');
  });
  test('unknown filters are scrubbed; compatible shared filters use the generic allowlist', () => {
    const result = planner.plan(new PlanRequest('user', ['profile', 'job']).withId('123').withFilter('limit', '25').withFilter('cat', 'all').withFilter('made_up_filter', 'ignored'));
    expect(result.requests).toHaveLength(1);
    expect(result.requests[0]!.query).toEqual({ selections: 'profile,job', id: '123', limit: '25', cat: 'all' });
  });
  test('a rejected combined call splits once and successful reports contain only split calls', async () => {
    const { client, transport } = clientWith((request, count) => count === 1 ? response({ error: { code: 6, error: 'Selections cannot be used together' } }) : response({ [request.query.selections!]: { success: true } }));
    const report = await client.getUserData(['profile', 'job', 'discord'], { id: '123' });
    expect(transport.requests.map(request => request.query.selections)).toEqual(['profile,job,discord', 'profile', 'job', 'discord']);
    expect(report.calls).toHaveLength(3);
    expect(report.calls.every(call => call.fallback)).toBe(true);
    expect(report.mergedJson).toEqual({ profile: { success: true }, job: { success: true }, discord: { success: true } });
  });
  test('a rejected split is terminal and does not start another combination fallback', async () => {
    const { client, transport } = clientWith(() => response({ error: { code: 6, error: 'Selections cannot be used together' } }));
    await expect(client.getUserData(['profile', 'job'], { id: '123' })).rejects.toThrow('Selections cannot');
    expect(transport.requests.map(request => request.query.selections)).toEqual(['profile,job', 'profile']);
  });
  test('unrelated application errors never expand a combined call into individual requests', async () => {
    const { client, transport } = clientWith(() => response({ error: { code: 2, error: 'Incorrect key' } }));
    await expect(client.getUserData(['profile', 'job'])).rejects.toThrow('Incorrect key');
    expect(transport.requests).toHaveLength(1);
  });
  test('exact generated profile and job methods preserve two dedicated endpoint calls', async () => {
    const profile = { profile: { id: 123, name: 'Example', level: 1, rank: 'Beginner', title: 'Civilian', age: 1, signed_up: 1, faction_id: null, honor_id: 1, property: { id: 1, name: 'Shack' }, image: null, gender: 'Male', revivable: true, role: 'Civilian', status: { description: 'Okay', details: null, state: 'Okay', until: null, color: 'green' }, spouse: null, awards: 0, friends: 0, enemies: 0, forum_posts: 0, karma: 0, last_action: { status: 'Online', timestamp: 1, relative: 'now' }, life: { current: 100, maximum: 100 }, donator_status: null, revive_setting: 'Everyone' } };
    const { client, transport } = clientWith(request => response(request.path.endsWith('/job') ? { job: null } : profile));
    const api = new OpenApi(client);
    const [result, job] = await Promise.all([api.getUserProfile({ id: 123 }), api.getMyJob()]);
    expect(result.profile.id).toBe(123); expect(job.job).toBeNull();
    expect(transport.requests.map(request => request.path).sort()).toEqual(['/user/123/profile', '/user/job']);
    expect(transport.requests.every(request => request.query.selections === undefined)).toBe(true);
  });
  test('multiple resources require separate plans and separate HTTP calls', async () => {
    const { client, transport } = clientWith(() => response({}));
    await Promise.all([client.getResourceData('user', ['profile', 'job']), client.getResourceData('key', ['info', 'log'])]);
    expect(transport.requests.map(request => request.path).sort()).toEqual(['/key', '/user']);
  });
});
