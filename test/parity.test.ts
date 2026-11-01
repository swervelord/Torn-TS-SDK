/** Unit tests for the PARITY_SPEC public surface added in 3.0.0 (requirement ids in test names). */
import { describe, expect, test } from 'bun:test';
import { inspect } from 'node:util';
import { readFileSync } from 'node:fs';
import {
  AccessLevelError, ApiError, CancelledError, DecodeError, EnvConfigError, ExecutorError, HttpError, NoUsableKeysError, PlannerError, SdkError, TimeoutError, TransportError, ValidationError,
  errorCode, errorKind, isAccessError, isKeyError, isRateLimit, isRetryable, isTransient, keyHint,
  RuntimeEnvConfig, runtimeEnv, TornClient, TornSdk, MemoryCache, ExecutionOptions,
  TornErrorCode, tornErrorCodes, defaultRetryPolicy, enumValues, isKnownEnumValue, knownEnumValues,
  operationAccessLevels, selectionAccessLevels, accessLevelSatisfies, operationCacheTtlMs,
  SDK_VERSION, SPEC_VERSION, SPEC_SHA256, tornUrls, fromTornTimestamp, toTornTimestamp, formatTct, formatTctDateTime, msUntilTctMidnight, tctStartOfDay,
  FetchTransport, BunTransport, ReqwestTransport, decodeModel, decodeModelWithWarnings, nextUtcMidnight, requestFromLink,
} from '../src/index.ts';
import { MockTransport, VirtualScheduler, mockSdk, jsonResponse, tornError, loadFixture } from '../src/testing.ts';
import type { RequestEvent, RetryEvent, ErrorEvent, JsonValue } from '../src/types.ts';
import { sampleSchema } from '../tools/schema-samples.ts';
import { schemas } from '../src/generated/schema-data.ts';

const profile = { profile: { id: 1, name: 'Test', level: 10, gender: 'Male', status: { description: 'Okay', details: null, state: 'Okay', color: 'green', until: null } } };
const SECRET = 'SECRETKEY1234567';
/** Resolve with the rejection of a promise that must fail. */
async function rejection<E>(promise: Promise<unknown>): Promise<E> { return promise.then(() => { throw new Error('expected a rejection'); }, (error: unknown) => error as E); }
function allOutputs(value: unknown): string[] {
  return [JSON.stringify(value) ?? '', inspect(value, { depth: 10 }), String(value), ...(value instanceof Error ? [value.message, value.stack ?? ''] : [])];
}

describe('P8.1 self-scoped facade calls need no id', () => {
  const cases: [string, string[]][] = [
    ['user', ['basic', 'bounties', 'discord', 'faction', 'forumposts', 'forumthreads', 'hof', 'profile', 'properties', 'property']],
    ['faction', ['basic', 'hof', 'members', 'rankedwars', 'wars']],
    ['market', ['bazaar']],
    ['company', ['profile', 'employees', 'applications', 'news', 'stock']],
  ];
  for (const [resource, selections] of cases) for (const selection of selections) test(`${resource}().${selection}() targets the key owner`, async () => {
    const { sdk, transport } = mockSdk(() => jsonResponse({}));
    const api = Reflect.get(sdk, resource).call(sdk);
    await Reflect.get(api, `${selection}Raw`).call(api);
    expect(transport.requests).toHaveLength(1);
    const request = transport.requests[0]!;
    expect(request.path.includes('{')).toBe(false);
    expect(request.query).not.toHaveProperty('id');
    expect(request.path.split('/').filter(Boolean).every(segment => !/^\d+$/.test(segment))).toBe(true);
  });
  test('typed self-scoped helpers decode (user().basic(), faction().members())', async () => {
    const { sdk, transport } = mockSdk([jsonResponse(profile), jsonResponse({ members: [] })]);
    expect((await sdk.user().basic()).profile.name).toBe('Test');
    await sdk.faction().membersRaw();
    expect(transport.requests.map(r => [r.path, r.query.selections])).toEqual([['/v2/user', 'basic'], ['/v2/faction', 'members']]);
  });
  test('market().itemmarket(206) uses the id shorthand instead of crashing', async () => {
    const { sdk, transport } = mockSdk(() => jsonResponse({ itemmarket: { item: { id: 206 }, listings: [] } }));
    await sdk.market().itemmarketRaw(206);
    expect(transport.requests[0]!.query).toMatchObject({ selections: 'itemmarket', id: '206' });
    await expect(sdk.market().itemmarket({ bogus: true } as never)).rejects.toBeInstanceOf(ValidationError);
    await expect(sdk.market().itemmarket()).rejects.toThrow("requires 'id'");
  });
});

describe('P1 forward-compatible decoding', () => {
  test('P1.1 enum metadata: known values and is-known checks', () => {
    expect(knownEnumValues('UserGenderEnum')).toEqual(['Male', 'Female', 'Enby']);
    expect(isKnownEnumValue('UserGenderEnum', 'Male')).toBe(true);
    expect(isKnownEnumValue('UserGenderEnum', 'Futuregender')).toBe(false);
    expect(Object.keys(enumValues).length).toBeGreaterThan(80);
  });
  test('P1.2 both spec overrides are applied and stay strict-mode errors', () => {
    const trade = { id: 1, user: { id: 1, name: 'A' }, trader: { id: 2, name: 'B' }, completed_at: null, expires_at: null, modified_at: 1, description: 'x' };
    const warnings = decodeModelWithWarnings('UserTrade', trade).warnings;
    expect(warnings).toContainEqual(expect.objectContaining({ path: '$.items', kind: 'relaxed_required' }));
    expect(() => decodeModel('UserTrade', trade, { mode: 'strict' })).toThrow('$.items');
    const models = readFileSync(new URL('../src/generated/models.ts', import.meta.url), 'utf8');
    expect(models).toMatch(/export type UserTrade = \{[^\n]*"items"\?: /);
    expect(models).toMatch(/export type TornHalloweenUpgrade = \{[^\n]*"type"\?: /);
  });
  test('P1.2 property/{id}/property without status (allOf override) decodes in tolerant mode', async () => {
    const property = sampleSchema(schemas.UserPropertyDetailsExtendedWithRent!, schemas, { nonemptyArrays: true }) as Record<string, JsonValue>;
    delete property.status;
    const warnings = decodeModelWithWarnings('UserPropertyDetailsExtendedWithRent', property).warnings;
    expect(warnings).toContainEqual(expect.objectContaining({ path: '$.status', kind: 'relaxed_required' }));
    expect(() => decodeModel('UserPropertyDetailsExtendedWithRent', property, { mode: 'strict' })).toThrow('$.status');
    const { sdk, transport } = mockSdk([jsonResponse({ property })]);
    expect((await sdk.openapi().getProperty({ id: 1 })).property).toEqual(property as never);
    expect(transport.requests[0]!.path).toBe('/v2/property/1/property');
  });
  test('P1.3 unknown properties are kept by default and rejected in strict mode', () => {
    const value = { ...profile, profile: { ...profile.profile, brand_new: 1 } };
    expect(decodeModel('UserBasicResponse', value)).toBe(value);
    expect(() => decodeModel('UserBasicResponse', value, { mode: 'strict' })).toThrow('unknown property');
  });
  test('P1.4 decode errors carry operation, path, expected, excerpt and the raw payload', async () => {
    const bad = { profile: { ...profile.profile, level: 'ten', note: 'see https://x.test?key=abcdef' } };
    const { sdk } = mockSdk([jsonResponse(bad)]);
    const error = await rejection<DecodeError>(sdk.openapi().getMyBasicInformation());
    expect(error).toBeInstanceOf(DecodeError);
    expect(error).toMatchObject({ operation: 'getMyBasicInformation', jsonPath: '$.profile.level', expected: 'expected integer', excerpt: '"ten"' });
    expect(error.raw).toEqual(bad);
    expect(error.rawBody).toContain('"level":"ten"');
    expect(error.errorKind).toBe('decode');
  });
  test('P1.4 one bad selection in a batch does not discard the others (selectSettled, DecodeError.partial)', async () => {
    const payload = { ...profile, travelinventory: { capacity: { base: 'x', special: 0 }, inventory: [] } };
    const { sdk } = mockSdk(() => jsonResponse(payload));
    const settled = await sdk.user().selectSettled(['basic', 'travelinventory']);
    expect(settled.data.profile?.name).toBe('Test');
    expect(settled.errors.travelinventory).toBeInstanceOf(DecodeError);
    const thrown = await rejection<DecodeError>(sdk.user().select(['basic', 'travelinventory']));
    expect(thrown.partial).toMatchObject({ profile: { name: 'Test' } });
    expect(thrown.raw).toEqual(payload);
  });
  test('P1.5 unknown selections and params pass through facades and openapi()', async () => {
    const { sdk, transport } = mockSdk(() => jsonResponse({ futureselection: { a: 1 }, attacks: [], _metadata: { links: { next: null, prev: null } } }));
    const raw = await sdk.user().rawSelections(['futureselection'], undefined);
    expect(raw.get('futureselection')).toEqual({ a: 1 });
    await sdk.openapi().getMyAttacks({ limit: 5, brand_new_filter: 'x' } as never);
    expect(transport.requests.map(r => r.query)).toEqual([{ selections: 'futureselection' }, { brand_new_filter: 'x', limit: '5' }]);
  });
  test('generated types carry spec descriptions as TSDoc', () => {
    const models = readFileSync(new URL('../src/generated/models.ts', import.meta.url), 'utf8');
    expect(models).toContain('/** Auto-generated link to get the next set of records. */');
    const operations = readFileSync(new URL('../src/generated/operations.ts', import.meta.url), 'utf8');
    expect(operations).toContain('Required key access: limited. `GET /user/travelinventory`');
  });
});

describe('P2 keys, auth and secrets', () => {
  test('P2.1 a key passed as an operation parameter goes to the header, never the URL', async () => {
    const { sdk, transport } = mockSdk([jsonResponse(profile)]);
    await sdk.openapi().getMyBasicInformation({ key: 'OTHERKEY12345678' } as never);
    expect(transport.requests[0]!.apiKey).toBe('OTHERKEY12345678');
    expect(transport.requests[0]!.query).not.toHaveProperty('key');
    expect(transport.requests[0]!.url).not.toContain('OTHERKEY');
  });
  test('P2.2 keys never appear in any formatting path of key-holding types', async () => {
    expect(keyHint(SECRET)).toBe('***4567');
    expect(keyHint('short')).toBe('***');
    const env = RuntimeEnvConfig.fromEnv({ TORN_API_KEY: SECRET });
    const { sdk, client, transport } = mockSdk([tornError(2, 'Incorrect key')], { keys: [SECRET], config: { keyAccess: { [SECRET]: 'full' }, rateLimits: { keyGroups: [[SECRET]] } } });
    const error = await rejection<NoUsableKeysError>(sdk.user().basicRaw());
    expect(error).toBeInstanceOf(NoUsableKeysError);
    const options = new ExecutionOptions({ apiKey: SECRET });
    const report = await mockSdk([jsonResponse({})], { keys: [SECRET] }).client.getResourceData('user', ['basic']);
    for (const value of [env, sdk, client, client.executor, client.executor.config, client.keyStates(), error, error.last, transport.requests[0], options, report.calls[0], report.calls]) {
      for (const output of allOutputs(value)) expect(output).not.toContain(SECRET);
    }
    expect(report.calls[0]!.keyHint).toBe('***4567');
    expect(report.calls[0]!.keyUsed).toBe(SECRET);
  });
  test('P2.3/P2.4 failover disables bad keys, code 14 until UTC midnight, code 16 skips without disabling', async () => {
    const { client, clock } = mockSdk([tornError(14), tornError(16), jsonResponse(profile)], { keys: ['KEY_AAAAAAAA0001', 'KEY_BBBBBBBB0002', 'KEY_CCCCCCCC0003'], startMs: Date.UTC(2026, 9, 31, 12) });
    await client.getResourceData('user', ['basic']);
    const states = client.keyStates();
    expect(states.map(s => s.state)).toEqual(['disabled', 'healthy', 'healthy']);
    expect(states[0]).toMatchObject({ key: '***0001', code: 14, until: Date.UTC(2026, 10, 1) });
    clock.time = Date.UTC(2026, 10, 1) + 1;
    expect(client.keyStates()[0]!.state).toBe('healthy');
    expect(nextUtcMidnight(Date.UTC(2026, 0, 31, 23, 59))).toBe(Date.UTC(2026, 1, 1));
  });
  test('P2.4 code 16 with no other key fails with the API error', async () => {
    const { client } = mockSdk([tornError(16)]);
    await expect(client.getResourceData('user', ['travelinventory'])).rejects.toMatchObject({ code: 16, name: 'ApiError' });
  });
  test('P2.6 fromEnv reads the runtime environment portably (process.env, Deno.env)', () => {
    const previous = process.env.TORN_API_KEY;
    process.env.TORN_API_KEY = 'ENVKEY0000000001';
    try { expect(RuntimeEnvConfig.fromEnv().apiKeys).toEqual(['ENVKEY0000000001']); }
    finally { if (previous === undefined) delete process.env.TORN_API_KEY; else process.env.TORN_API_KEY = previous; }
    const scope = globalThis as { Deno?: unknown };
    scope.Deno = { env: { get: (name: string) => name === 'TORN_API_KEYS' ? 'D1,D2' : undefined } };
    try { expect(runtimeEnv().TORN_API_KEYS).toBe('D1,D2'); expect(RuntimeEnvConfig.fromEnv().apiKeys).toEqual(['D1', 'D2']); }
    finally { delete scope.Deno; }
    expect(() => RuntimeEnvConfig.fromEnv({ TORN_API_KEY: 'x', TORN_VALIDATION: 'loose' })).toThrow(EnvConfigError);
    expect(RuntimeEnvConfig.fromEnv({ TORN_API_KEY: 'x', TORN_VALIDATION: 'strict' }).executorConfig.validation).toBe('strict');
  });
});

describe('P3/P4 rate limits and retries', () => {
  test('P3.2 detectKeyAccess groups keys of the same owner and records access levels', async () => {
    const info = (id: number, type: string) => jsonResponse({ info: { selections: {}, user: { id, faction_id: null, company_id: null }, access: { level: 3, type, faction: false, company: false, log: { custom_permissions: false, available: [] } } } });
    const { client } = mockSdk([info(7, 'Limited Access'), info(7, 'Public Only'), info(8, 'Full Access')], { keys: ['OWNER7KEY0000001', 'OWNER7KEY0000002', 'OWNER8KEY0000003'], config: { rateLimits: { perKeyPerMinute: 2 } } });
    await client.detectKeyAccess();
    expect(client.keyStates().map(s => s.access)).toEqual(['limited', 'public', 'full']);
    expect(client.keyStates().map(s => s.remaining)).toEqual([0, 0, 1]);
  });
  test('P3.4 code 8 rotates to another configured route', async () => {
    const { client, transport } = mockSdk([tornError(8), jsonResponse(profile)], { config: { routes: [{ id: 'a', perIpPerMinute: 10 }, { id: 'b', perIpPerMinute: 10 }] } });
    await client.getResourceData('user', ['basic']);
    expect(transport.requests.map(r => r.routeId)).toEqual(['a', 'b']);
  });
  test('P4.2 full jitter draws from [0, backoff]; backoff is capped', async () => {
    const transport = new MockTransport([tornError(17), tornError(17), jsonResponse({})]), clock = new VirtualScheduler();
    const client = TornClient.withTransport(transport, ['KEY_0000000001'], { retryMaxDelayMs: 600 }, { scheduler: clock, random: () => 0.5 });
    await client.getResourceData('user', ['basic']);
    expect(clock.sleeps).toEqual([250, 300]);
    expect(defaultRetryPolicy).toMatchObject({ maxAttempts: 4, baseDelayMs: 500, maxDelayMs: 30_000, retryAfterCapMs: 120_000 });
  });
  test('P4.4 cancellation aborts waits with CancelledError', async () => {
    const controller = new AbortController();
    const transport = new MockTransport([tornError(17), jsonResponse({})]);
    const client = TornClient.withTransport(transport, ['KEY_0000000001'], { jitter: 'none' }, { scheduler: { now: () => 0, sleep: (_ms, signal) => new Promise((_r, reject) => { controller.abort(new Error('stop')); reject(signal?.reason); }) } });
    const error = await client.getResourceData('user', ['basic'], { executionOptions: { signal: controller.signal } }).catch(e => e);
    expect(error).toBeInstanceOf(CancelledError);
    expect(errorKind(error)).toBe('cancelled');
    expect((error as Error).message).toContain('stop');
  });
});

describe('P5 errors', () => {
  test('P5.1 generated error-code enum and policy table', () => {
    expect(TornErrorCode.IncorrectKey).toBe(2);
    expect(tornErrorCodes[5]).toMatchObject({ name: 'TooManyRequests', action: 'wait_rate_window' });
    expect(Object.keys(tornErrorCodes)).toHaveLength(34);
  });
  test('P5.2 class names are literal (bundler-safe) and kinds are stable', () => {
    const cases: [Error, string][] = [[new SdkError('x'), 'SdkError'], [new ValidationError('x'), 'ValidationError'], [new DecodeError('x'), 'DecodeError'], [new PlannerError('x'), 'PlannerError'], [new TransportError('x'), 'TransportError'], [new TimeoutError('x'), 'TimeoutError'], [new ExecutorError('x'), 'ExecutorError'], [new ApiError('x', { path: '/', status: 200, code: 2 }), 'ApiError'], [new HttpError('x', { path: '/', status: 503 }), 'HttpError'], [new NoUsableKeysError(), 'NoUsableKeysError'], [new CancelledError(new Error('r')), 'CancelledError'], [new AccessLevelError('t', 'full', 'public'), 'AccessLevelError']];
    for (const [error, name] of cases) expect(error.name).toBe(name);
    expect(cases.map(([e]) => errorKind(e))).toEqual(['validation', 'validation', 'decode', 'planner', 'transport', 'transport', 'executor', 'api', 'http', 'no_usable_keys', 'cancelled', 'validation']);
  });
  test('P5.3 helpers classify by code and status only', () => {
    const api = (code: number) => new ApiError('Too many requests backend error', { path: '/', status: 200, code });
    expect(isRetryable(api(17))).toBe(true); expect(isRetryable(api(6))).toBe(false);
    expect(isKeyError(api(2))).toBe(true); expect(isKeyError(api(6))).toBe(false);
    expect(isRateLimit(api(5))).toBe(true); expect(isRateLimit(api(6))).toBe(false);
    expect(isAccessError(api(16))).toBe(true); expect(isAccessError(new AccessLevelError('x', 'limited', 'public'))).toBe(true);
    expect(isTransient(new HttpError('x', { path: '/', status: 502 }))).toBe(true); expect(isTransient(new TransportError('x'))).toBe(true);
    expect(errorCode(new NoUsableKeysError(api(2)))).toBe(2);
  });
});

describe('P6 access levels', () => {
  test('P6.1 per-operation and per-selection levels come from access-levels.json', () => {
    expect(operationAccessLevels.getMyTravelInventory).toBe('limited');
    expect(selectionAccessLevels.user!.travelinventory).toBe('limited');
    expect(accessLevelSatisfies('full', 'limited')).toBe(true);
    expect(accessLevelSatisfies('public', 'minimal')).toBe(false);
    expect(accessLevelSatisfies('custom', 'full')).toBe(true);
  });
  test('P6.2 checkAccess refuses before sending; keyInfo() is typed', async () => {
    const { sdk, transport } = mockSdk([], { config: { checkAccess: true, keyAccess: { TEST_KEY_0000001: 'minimal' } } });
    const error = await rejection<AccessLevelError>(sdk.openapi().getMyTravelInventory());
    expect(error).toMatchObject({ name: 'AccessLevelError', requiredAccess: 'limited', keyAccess: 'minimal' });
    expect(transport.requests).toHaveLength(0);
    const info = { info: { selections: { company: [], faction: [], market: [], property: [], torn: [], user: [], racing: [], forum: [], key: [] }, user: { id: 1, faction_id: null, company_id: null }, access: { level: 4, type: 'Full Access', faction: true, company: true, log: { custom_permissions: false, available: [] } } } };
    const typed = mockSdk([jsonResponse(info)]);
    expect((await typed.sdk.keyInfo()).info.access.type).toBe('Full Access');
  });
});

describe('P7 pagination', () => {
  const page = (next: string | null, prev: string | null, items: number[]) => jsonResponse({ attacks: items, _metadata: { links: { next, prev } } });
  test('items iterate across pages; prev direction; limit; key re-attached via header', async () => {
    const { client, transport } = mockSdk([page('https://api.torn.com/v2/user/attacks?limit=2&to=2&key=LEAK', null, [1, 2]), page(null, null, [3])]);
    const items: unknown[] = [];
    for await (const item of client.paginateItems('/user/attacks', { limit: 2 })) items.push(item);
    expect(items).toEqual([1, 2, 3]);
    expect(transport.requests[1]!.query).toEqual({ limit: '2', to: '2' });
    const back = mockSdk([page(null, 'https://api.torn.com/v2/user/attacks?from=1', [9]), page(null, null, [8])]);
    const seen: unknown[] = [];
    for await (const item of back.client.paginateItems('/user/attacks', {}, { direction: 'prev', limit: 1 })) seen.push(item);
    expect(seen).toEqual([9]);
  });
  test('typed operation pages are decoded with the generated model', async () => {
    const { client } = mockSdk([jsonResponse({ attacks: [], _metadata: { links: { next: null, prev: null } } })]);
    const pages = [];
    for await (const p of client.paginateOperation('getMyAttacks', { limit: 10 })) pages.push(p);
    expect(pages).toHaveLength(1);
    expect(pages[0]!.query).toEqual({ limit: '10' });
  });
  test('links outside the API host or base path are refused', () => {
    const template = { resource: 'user', path: '/user/attacks', method: 'GET' as const, query: {}, selections: [], strategy: 'direct-endpoint' as const, fallbackSplit: [], apiVersion: 'v2' as const };
    expect(() => requestFromLink('https://api.torn.com/v1/user', 'https://api.torn.com/v2', template)).toThrow(ValidationError);
    expect(() => requestFromLink('http://api.torn.com/v2/user', 'https://api.torn.com/v2', template)).toThrow(ValidationError);
    expect(requestFromLink('https://api.torn.com/v2/user/attacks?key=X&to=1', 'https://api.torn.com/v2', template).query).toEqual({ to: '1' });
  });
});

describe('P8 developer experience', () => {
  test('P8.2 raw get + typed decode into any generated model', async () => {
    const { client, transport } = mockSdk([jsonResponse(profile), jsonResponse(profile), jsonResponse({ bazaar: [] })]);
    expect(await client.get('/v2/user/basic', { comment: 'x' })).toEqual(profile);
    expect((await client.getTyped<{ profile: { name: string } }>('/user/basic', 'UserBasicResponse')).profile.name).toBe('Test');
    await client.get('/user/', { selections: 'bazaar' }, { apiVersion: 'v1' });
    expect(transport.requests.map(r => [r.apiVersion, r.path])).toEqual([['v2', '/v2/user/basic'], ['v2', '/v2/user/basic'], ['v1', '/user/']]);
  });
  test('P8.3 hooks receive redacted lifecycle events', async () => {
    const events: string[] = [], payloads: (RequestEvent | RetryEvent | ErrorEvent)[] = [];
    const hooks = { onRequest: (e: RequestEvent) => { events.push('request'); payloads.push(e); }, onResponse: (e: RequestEvent) => { events.push(`response ${e.status}`); payloads.push(e); }, onRetry: (e: RetryEvent) => { events.push(`retry ${e.delayMs}`); payloads.push(e); }, onError: (e: ErrorEvent) => { events.push('error'); payloads.push(e); } };
    const { client } = mockSdk([tornError(17), jsonResponse(profile)], { keys: [SECRET], config: { hooks } });
    await client.getResourceData('user', ['basic']);
    expect(events).toEqual(['request', 'response 200', 'retry 500', 'request', 'response 200']);
    for (const payload of payloads) { expect(JSON.stringify(payload)).not.toContain(SECRET); expect(payload.keyHint).toBe('***4567'); expect(payload.url).toBe('https://api.torn.com/v2/user?selections=basic'); }
    const failing = mockSdk([tornError(6)], { config: { hooks } });
    await failing.client.getResourceData('user', ['basic']).catch(() => undefined);
    expect(events.at(-1)).toBe('error');
  });
  test('P8.4 response cache: off by default, TTL from spec notes, never caches errors', async () => {
    const cache = new MemoryCache();
    const { client, transport, clock } = mockSdk([tornError(6), jsonResponse({ inventory: [] }), jsonResponse({ inventory: [1] })], { dependencies: { cache } });
    await client.getResourceData('user', ['inventory'], { filters: { cat: 'all' } }).catch(() => undefined);
    const first = await client.getResourceData('user', ['inventory'], { filters: { cat: 'all' } });
    const second = await client.getResourceData('user', ['inventory'], { filters: { cat: 'all' } });
    expect(second.calls[0]!.cached).toBe(true);
    expect(second.mergedJson).toEqual(first.mergedJson);
    expect(transport.requests).toHaveLength(2);
    clock.time += operationCacheTtlMs.getMyInventory! + 1;
    expect((await client.getResourceData('user', ['inventory'], { filters: { cat: 'all' } })).mergedJson).toEqual({ inventory: [1] });
    const uncached = mockSdk([jsonResponse({}), jsonResponse({})]);
    await uncached.client.getResourceData('user', ['basic']); await uncached.client.getResourceData('user', ['basic']);
    expect(uncached.transport.requests).toHaveLength(2);
  });
  test('P8.5 test kit: scripted transport, request assertions, fixtures', async () => {
    const { sdk, transport } = mockSdk([jsonResponse(profile)]);
    await sdk.user().basicRaw(5);
    transport.expectRequest(0, { path: '/v2/user', query: { selections: 'basic', id: '5' }, absentQuery: ['key'], apiKey: 'TEST_KEY_0000001' });
    expect(() => transport.expectRequest(0, { path: '/v2/faction' })).toThrow('path');
    transport.assertDone();
    const fixture = await loadFixture<{ scenarios: unknown[] }>(new URL('../spec/shared/conformance/core.json', import.meta.url));
    expect(fixture.scenarios.length).toBeGreaterThan(0);
  });
  test('P8.6 helpers: URLs, timestamps, TCT', () => {
    expect(tornUrls.profile(4)).toBe('https://www.torn.com/profiles.php?XID=4');
    expect(tornUrls.attack(4n)).toBe('https://www.torn.com/loader.php?sid=attack&user2ID=4');
    expect(tornUrls.faction('12')).toBe('https://www.torn.com/factions.php?step=profile&ID=12');
    for (const url of [tornUrls.company(1), tornUrls.bazaar(1), tornUrls.itemMarket(206), tornUrls.trade(3), tornUrls.forumThread(1, 2), tornUrls.property(9)]) expect(url.startsWith('https://www.torn.com/')).toBe(true);
    expect(() => tornUrls.profile('1; drop')).toThrow(RangeError);
    expect(fromTornTimestamp(1_700_000_000).toISOString()).toBe('2023-11-14T22:13:20.000Z');
    expect(toTornTimestamp(new Date('2023-11-14T22:13:20.900Z'))).toBe(1_700_000_000);
    expect(formatTct(Date.UTC(2026, 0, 2, 3, 4, 5))).toBe('03:04:05');
    expect(formatTctDateTime(Date.UTC(2026, 0, 2, 3, 4, 5))).toBe('03:04:05 - 02/01/26');
    expect(tctStartOfDay(Date.UTC(2026, 0, 2, 3)).getTime()).toBe(Date.UTC(2026, 0, 2));
    expect(msUntilTctMidnight(Date.UTC(2026, 0, 2, 23))).toBe(3_600_000);
  });
  test('P8.7 runtime constants', async () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version: string };
    expect(SDK_VERSION).toBe(pkg.version);
    expect(SPEC_VERSION).toBe('6.15.0');
    expect(SPEC_SHA256).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe('deprecated aliases stay functional', () => {
  test('BunTransport and ReqwestTransport alias FetchTransport', () => {
    expect(BunTransport).toBe(FetchTransport);
    expect(ReqwestTransport).toBe(FetchTransport);
    expect(TornSdk.from_env).toBe(TornSdk.fromEnv);
  });
});
