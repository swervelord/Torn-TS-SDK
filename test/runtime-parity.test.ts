import { afterAll, describe, expect, test } from 'bun:test';
import { inspect } from 'node:util';
import { RequestExecutor, mergeJson, runtimeV1Fallback, isSelectionCombinationError } from '../src/executor.ts';
import { ApiError, DecodeError, EnvConfigError, TransportError } from '../src/errors.ts';
import { RateLimiter } from '../src/rate-limit.ts';
import { RuntimeEnvConfig, defaultExecutorConfig, type ExecutorConfigInput } from '../src/config.ts';
import { BunTransport, buildUrl, sanitizeErrorMessage, type HttpTransport, type TransportRequest, type TransportResponse } from '../src/transport.ts';
import { PlanRequest, RequestPlanner } from '../src/planner.ts';
import { TornClient } from '../src/client.ts';
import { parseLosslessJson, stringifyLosslessJson } from '../src/json.ts';
import type { JsonValue, PlannedRequest, RequestPlan, Scheduler } from '../src/types.ts';

class Clock implements Scheduler {
  time = 10_000;
  sleeps: number[] = [];
  now(): number { return this.time; }
  async sleep(ms: number, signal?: AbortSignal): Promise<void> { signal?.throwIfAborted(); this.sleeps.push(ms); this.time += ms; }
}
class QueueTransport implements HttpTransport {
  requests: TransportRequest[] = [];
  constructor(public responses: (TransportResponse | Error)[] = []) {}
  async execute(request: TransportRequest): Promise<TransportResponse> {
    this.requests.push(request);
    const response = this.responses.shift();
    if (response instanceof Error) throw response;
    return response ?? { status: 200, body: '{}' };
  }
}
const json = (value: unknown, status = 200): TransportResponse => ({ status, body: JSON.stringify(value) });
const apiError = (message: string, status = 200): TransportResponse => json({ error: { code: 6, error: message } }, status);
const call = (overrides: Partial<PlannedRequest> = {}): PlannedRequest => ({ resource: 'user', path: '/user', method: 'GET', query: { selections: 'profile' }, selections: ['profile'], strategy: 'generic-single', fallbackSplit: [], apiVersion: 'v2', ...overrides });
const plan = (...requests: PlannedRequest[]): RequestPlan => ({ resource: 'user', requests });
const harness = (responses: (TransportResponse | Error)[], config: ExecutorConfigInput = {}, keys = ['test-key-one', 'test-key-two']) => {
  const transport = new QueueTransport(responses), clock = new Clock();
  const executor = new RequestExecutor(transport, keys, { networkRetryBackoffMs: 5, ...config }, { scheduler: clock });
  return { executor, transport, clock };
};

describe('Rust executor contract audit', () => {
  test('unsafe signed and unsigned Rust integers survive parsing, merging and re-serialization', async () => {
    const body = '{"unsigned":18446744073709551615,"signed":-9223372036854775808,"safe":9007199254740991,"decimal":1.25,"string":"18446744073709551615"}';
    const { executor } = harness([{ status: 200, body }, json({ nested: [1, 2] })]);
    const report = await executor.executePlan(plan(call(), call()));
    expect(report.mergedJson).toMatchObject({ unsigned: 18446744073709551615n, signed: -9223372036854775808n, safe: 9007199254740991, decimal: 1.25, string: '18446744073709551615' });
    expect(parseLosslessJson(stringifyLosslessJson(report.mergedJson))).toEqual(report.mergedJson);
    expect(stringifyLosslessJson(report.mergedJson)).toContain('"unsigned":18446744073709551615');
  });
  test('reports expose Rust aliases and deserialize copies without mutating merged JSON', async () => {
    const report = await harness([json({ nested: { value: 1 } })]).executor.executePlan(plan(call()));
    expect(report.merged_json).toEqual(report.mergedJson);
    expect(report.calls[0]!.key_used).toBe('test-key-one');
    expect(report.calls[0]!.api_version).toBe('v2');
    expect(report.calls[0]!.route_id).toBe('default');
    expect(report.deserialize(value => { (value as { nested: { value: number } }).nested.value = 2; return 42; })).toBe(42);
    expect(report.mergedJson).toEqual({ nested: { value: 1 } });
  });
  test('merges sequential calls recursively and later arrays/scalars replace previous data', async () => {
    const { executor, transport } = harness([json({ profile: { id: 1 }, nested: { a: 1 }, list: [1, 2] }), json({ nested: { b: 2 }, list: [3], profile: null })]);
    const report = await executor.executePlan(plan(call(), call({ path: '/user/discord', selections: ['discord'] })));
    expect(report.mergedJson).toEqual({ profile: null, nested: { a: 1, b: 2 }, list: [3] });
    expect(transport.requests.map(request => request.apiKey)).toEqual(['test-key-one', 'test-key-two']);
    expect(report.calls.map(value => value.fallback)).toEqual([false, false]);
  });
  test('empty plans return the initial object without transport activity', async () => {
    const { executor, transport } = harness([]);
    expect(await executor.executePlan(plan())).toMatchObject({ mergedJson: {}, calls: [] });
    expect(transport.requests).toHaveLength(0);
  });
  test('split fallback omits failed combination attempt from the report', async () => {
    const planner = new RequestPlanner();
    const request = planner.plan(new PlanRequest('user', ['profile', 'discord']));
    const { executor, transport } = harness([apiError('Selections cannot be used together'), json({ profile: 1 }), json({ discord: 2 })]);
    const report = await executor.executePlan(request);
    expect(report.mergedJson).toEqual({ profile: 1, discord: 2 });
    expect(report.calls).toHaveLength(2);
    expect(report.calls.every(value => value.fallback)).toBe(true);
    expect(transport.requests.map(value => value.query.selections)).toEqual(['profile,discord', 'profile', 'discord']);
  });
  test('split errors are terminal and do not recursively migrate or split', async () => {
    const request = new RequestPlanner().plan(new PlanRequest('user', ['profile', 'discord']));
    const { executor, transport } = harness([apiError('standalone selection'), apiError('selection not available in API v2')]);
    await expect(executor.executePlan(request)).rejects.toBeInstanceOf(ApiError);
    expect(transport.requests).toHaveLength(2);
    expect(transport.requests.every(value => value.baseUrl.endsWith('/v2'))).toBe(true);
  });
  test('migration fallback precedes splitting, preserves allowed filters, uses v1 base and path id', async () => {
    const request = new RequestPlanner().plan(new PlanRequest('user', ['profile', 'discord']).withId('55').withFilter('limit', 10).withFilter('comment', 'tool'));
    const { executor, transport } = harness([apiError('selection must fallback to API v1, cannot combine'), json({ profile: 1, discord: 2 })]);
    const report = await executor.executePlan(request);
    expect(transport.requests).toHaveLength(2);
    expect(transport.requests[1]).toMatchObject({ baseUrl: 'https://api.torn.com', path: '/user/55', query: { selections: 'profile,discord', limit: '10' } });
    expect(transport.requests[1]!.query).not.toHaveProperty('comment');
    expect(transport.requests[1]!.query).not.toHaveProperty('id');
    expect(report.calls[0]).toMatchObject({ fallback: true, strategy: 'version-fallback', apiVersion: 'v1' });
  });
  test('migration is not available for v1 or unsupported v1 resources', () => {
    const error = new ApiError('not available in API v2', { path: '/', status: 400 });
    expect(runtimeV1Fallback(call({ apiVersion: 'v1' }), error)).toBeUndefined();
    expect(runtimeV1Fallback(call({ resource: 'forum' }), error)).toBeUndefined();
    expect(runtimeV1Fallback(call(), new TransportError('fallback to API v1'))).toBeUndefined();
    expect(isSelectionCombinationError(new Error('standalone'))).toBe(false);
  });
  test('transport failure uses linear backoff and rotates keys across attempts', async () => {
    const { executor, transport, clock } = harness([new TransportError('offline'), new Error('offline'), json({ ok: true })]);
    const report = await executor.executePlan(plan(call()));
    expect(clock.sleeps).toEqual([5, 10]);
    expect(transport.requests.map(value => value.apiKey)).toEqual(['test-key-one', 'test-key-two', 'test-key-one']);
    expect(report.calls).toHaveLength(1);
  });
  test('native custom transport errors sanitize embedded query keys and proxy passwords', async () => {
    const { executor } = harness([new Error('failed http://user:secret@localhost?key=hidden')], { maxAttempts: 1 });
    const error = await executor.executePlan(plan(call())).catch(value => value as Error);
    expect((error as Error).message).not.toContain('secret');
    expect((error as Error).message).not.toContain('hidden');
  });
  for (const status of [500, 502, 503, 504]) test(`HTTP ${status} retries JSON and non-JSON responses`, async () => {
    const { executor, clock } = harness([json({}, status), { status, body: '<html>Unavailable</html>' }, json({ ok: true })]);
    expect((await executor.executePlan(plan(call()))).mergedJson).toEqual({ ok: true });
    expect(clock.sleeps).toEqual([5, 10]);
  });
  test('other error statuses fail immediately with API key accessible and redacted from diagnostics', async () => {
    const { executor, transport, clock } = harness([json({}, 501)]);
    const error = await executor.executePlan(plan(call())).catch(value => value as ApiError);
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).keyUsed).toBe('test-key-one');
    expect(JSON.stringify(error)).not.toContain('test-key-one');
    expect(inspect(error)).not.toContain('test-key-one');
    expect(transport.requests).toHaveLength(1);
    expect(clock.sleeps).toEqual([]);
  });
  test('429 marks key and IP route exhausted, waits to the minute, then retries', async () => {
    const { executor, transport, clock } = harness([apiError('IP rate limit reached', 429), json({ ok: true })]);
    expect((await executor.executePlan(plan(call()))).mergedJson).toEqual({ ok: true });
    expect(clock.sleeps).toEqual([50_000]);
    expect(transport.requests).toHaveLength(2);
  });
  test('application rate errors exhaust key even on the final attempt', async () => {
    const { executor, clock } = harness([apiError('Too many calls')], { maxAttempts: 1 });
    await expect(executor.executePlan(plan(call()))).rejects.toBeInstanceOf(ApiError);
    expect(executor.rateLimiter.tryAcquireAtUnixSeconds('test-key-one', 10).acquired).toBe(false);
    expect(executor.rateLimiter.tryAcquireAtUnixSeconds('test-key-two', 10).acquired).toBe(true);
    expect(clock.sleeps).toEqual([]);
  });
  test('malformed success JSON is a terminal decode failure; HTTP errors show a Unicode-safe snippet', async () => {
    const bad = harness([{ status: 200, body: 'invalid' }]);
    await expect(bad.executor.executePlan(plan(call()))).rejects.toBeInstanceOf(DecodeError);
    expect(bad.transport.requests).toHaveLength(1);
    const { executor } = harness([{ status: 418, body: '☀'.repeat(200) }]);
    const error = await executor.executePlan(plan(call())).catch(value => value as ApiError);
    expect((error as ApiError).message).toBe(`HTTP error response: ${'☀'.repeat(160)}...`);
  });
  test('canonical pure error envelope is required on success; invalid code types do not deserialize in Rust', async () => {
    for (const body of [{ error: { error: 'Invalid', code: 1 }, timestamp: 1 }, { error: 'Invalid' }, { error: { error: ' ' } }, { error: { error: 'Invalid', code: '1' } }, { error: { error: 'Invalid', code: 1.5 } }]) {
      const { executor } = harness([json(body)]);
      expect((await executor.executePlan(plan(call()))).mergedJson).toEqual(body as JsonValue);
    }
    await expect(harness([apiError('Invalid key')]).executor.executePlan(plan(call()))).rejects.toBeInstanceOf(ApiError);
  });
  test('attempt override zero means one attempt, and timeout override reaches transport', async () => {
    const { executor, transport } = harness([new TransportError('failed'), json({})]);
    await expect(executor.executePlanWithOptions(plan(call()), { maxAttempts: 0, requestTimeoutMs: 12 })).rejects.toBeInstanceOf(TransportError);
    expect(transport.requests).toHaveLength(1);
    expect(transport.requests[0]!.timeoutMs).toBe(12);
  });
  test('text mode preserves 200 error envelopes as literal text and validates exactly one call', async () => {
    const response = apiError('Invalid key');
    const { executor } = harness([response]);
    expect((await executor.executePlanTextWithOptions(plan(call()))).body).toBe(response.body);
    await expect(executor.executePlanTextWithOptions(plan())).rejects.toThrow('got 0');
    await expect(executor.executePlanTextWithOptions(plan(call(), call()))).rejects.toThrow('got 2');
  });
  test('text mode retries transport, transient HTTP, and rate errors', async () => {
    const { executor, clock } = harness([new TransportError('offline'), apiError('slow', 503), { status: 200, body: 'snapshot-text' }]);
    expect((await executor.executePlanTextWithOptions(plan(call()))).body).toBe('snapshot-text');
    expect(clock.sleeps).toEqual([5, 10]);
    const limited = harness([apiError('Rate limit', 429), { status: 200, body: 'ok' }]);
    expect((await limited.executor.executePlanTextWithOptions(plan(call()))).body).toBe('ok');
    expect(limited.clock.sleeps).toEqual([50_000]);
  });
  test('quota waits use shared state and minute rollover, named routes spill before default', async () => {
    const { executor, transport, clock } = harness([json({}), json({}), json({}), json({})], { rateLimits: { perKeyPerMinute: 10, perIpPerMinute: 1 }, routes: [{ id: 'a', perIpPerMinute: 1 }, { id: 'b', perIpPerMinute: 1 }] });
    for (let i = 0; i < 4; i++) await executor.executePlan(plan(call()));
    expect(transport.requests.map(value => value.routeId)).toEqual(['a', 'b', 'default', 'a']);
    expect(clock.sleeps).toEqual([50_000]);
    expect(executor.routeCandidates('default')).toEqual(['default']);
    expect(executor.routeCandidates('unknown')).toEqual(['unknown']);
  });
  test('explicit default route never consumes named capacity; metrics flush at rollover', async () => {
    const metrics: unknown[] = [], clock = new Clock(), transport = new QueueTransport();
    const executor = new RequestExecutor(transport, ['test'], { routes: [{ id: 'named', perIpPerMinute: 1 }] }, { scheduler: clock, onRouteUsage: value => metrics.push(value) });
    await executor.executePlanWithOptions(plan(call()), { routeId: 'default' });
    await executor.executePlan(plan(call()));
    clock.time = 60_000;
    await executor.executePlan(plan(call()));
    expect(transport.requests.map(value => value.routeId)).toEqual(['default', 'named', 'named']);
    expect(metrics).toEqual([{ minuteIndex: 0, routeId: 'default', calls: 1, waits: 0, limit: 1000 }, { minuteIndex: 0, routeId: 'named', calls: 1, waits: 0, limit: 1 }]);
  });
  test('executor, call, transport request and proxy config diagnostics redact secrets', async () => {
    const { executor, transport } = harness([json({})], { proxyUrl: 'http://user:pass@localhost:1', routes: [{ id: 'route', proxyUrl: 'http://route:secret@localhost:2', perIpPerMinute: 10 }] });
    const report = await executor.executePlan(plan(call()));
    expect(report.calls[0]!.keyUsed).toBe('test-key-one');
    for (const value of [executor, report.calls[0], transport.requests[0]]) for (const output of [JSON.stringify(value), inspect(value)]) {
      expect(output).not.toContain('test-key-one'); expect(output).not.toContain('user:pass'); expect(output).not.toContain('route:secret');
    }
  });
  test('merge does not pollute object prototypes', () => {
    const result = mergeJson({}, JSON.parse('{"__proto__":{"polluted":true}}'));
    expect(Object.hasOwn(result as object, '__proto__')).toBe(true);
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
  });
});

describe('concurrency and cancellation', () => {
  test('concurrent independent plans never exceed maxInFlight', async () => {
    let active = 0, peak = 0;
    const transport: HttpTransport = { async execute() { active++; peak = Math.max(peak, active); await Bun.sleep(2); active--; return json({}); } };
    const executor = new RequestExecutor(transport, ['test'], { maxInFlight: 2 });
    const reports = await Promise.all(Array.from({ length: 10 }, () => executor.executePlan(plan(call()))));
    expect(peak).toBe(2); expect(active).toBe(0); expect(reports).toHaveLength(10);
  });
  test('canceled semaphore waiter is removed; success releases capacity', async () => {
    let releaseFirst!: () => void;
    let started!: () => void;
    const firstStarted = new Promise<void>(resolve => { started = resolve; });
    let calls = 0;
    const transport: HttpTransport = { async execute() { calls++; if (calls === 1) { started(); await new Promise<void>(resolve => { releaseFirst = resolve; }); } return json({ calls }); } };
    const executor = new RequestExecutor(transport, ['test'], { maxInFlight: 1 });
    const first = executor.executePlan(plan(call())); await firstStarted;
    const controller = new AbortController();
    const second = executor.executePlanWithOptions(plan(call()), { signal: controller.signal });
    controller.abort(new Error('cancel queued'));
    await expect(second).rejects.toThrow('cancel queued');
    releaseFirst(); await first;
    expect((await executor.executePlan(plan(call()))).calls).toHaveLength(1);
    expect(calls).toBe(2);
  });
  test('quota and retry sleeps can be canceled without dispatching another transport request', async () => {
    let sleeping!: () => void;
    const asleep = new Promise<void>(resolve => { sleeping = resolve; });
    const scheduler: Scheduler = { now: () => 10_000, sleep(_ms, signal) { sleeping(); return new Promise((_resolve, reject) => signal?.addEventListener('abort', () => reject(signal.reason), { once: true })); } };
    const transport = new QueueTransport([new TransportError('offline')]);
    const executor = new RequestExecutor(transport, ['test'], {}, { scheduler });
    const controller = new AbortController();
    const pending = executor.executePlanWithOptions(plan(call()), { signal: controller.signal });
    await asleep; controller.abort(new Error('cancel sleep'));
    await expect(pending).rejects.toThrow('cancel sleep');
    expect(transport.requests).toHaveLength(1);
  });
  test('transport failure releases semaphore to the next request', async () => {
    const { executor, transport } = harness([new TransportError('failed'), json({ ok: true })], { maxInFlight: 1, maxAttempts: 1 });
    const results = await Promise.allSettled([executor.executePlan(plan(call())), executor.executePlan(plan(call()))]);
    expect(results.map(result => result.status)).toEqual(['rejected', 'fulfilled']);
    expect(transport.requests).toHaveLength(2);
  });
  test('pre-aborted execution never acquires quota or calls the transport', async () => {
    const { executor, transport } = harness([]), controller = new AbortController();
    controller.abort(new Error('already canceled'));
    await expect(executor.executePlanWithOptions(plan(call()), { signal: controller.signal })).rejects.toThrow('already canceled');
    expect(transport.requests).toHaveLength(0);
  });
});

describe('environment and quota contracts', () => {
  test('all Rust environment variables map to runtime configuration', () => {
    const runtime = RuntimeEnvConfig.fromEnv({ TORN_API_KEYS: ' one, ,two,one ', TORN_API_KEY: 'ignored', TORN_API_BASE_URL_V2: ' http://localhost/v2 ', TORN_API_BASE_URL_V1: ' http://localhost/v1 ', TORN_USER_AGENT: ' custom-agent ', TORN_HTTP_TIMEOUT_SECS: '2', TORN_MAX_ATTEMPTS: '0', TORN_NETWORK_RETRY_BACKOFF_MS: '10', TORN_RATE_LIMIT_PER_KEY_PER_MIN: '5', TORN_RATE_LIMIT_PER_IP_PER_MIN: '50', TORN_MAX_IN_FLIGHT: '2' });
    expect(runtime.apiKeys).toEqual(['one', 'two', 'one']);
    expect(runtime.executorConfig).toMatchObject({ baseUrlV2: 'http://localhost/v2', baseUrlV1: 'http://localhost/v1', userAgent: 'custom-agent', timeoutMs: 2000, maxAttempts: 0, networkRetryBackoffMs: 10, maxInFlight: 2, rateLimits: { perKeyPerMinute: 5, perIpPerMinute: 50 } });
    runtime.apiKeys.push('third'); expect(runtime.apiKeys).toHaveLength(3);
    expect(JSON.stringify(runtime)).not.toContain('"one"');
  });
  test('single key fallback, whitespace defaults and Rust integer limits', () => {
    expect(RuntimeEnvConfig.fromEnv({ TORN_API_KEYS: ', , ', TORN_API_KEY: ' single ', TORN_MAX_ATTEMPTS: ' ' }).apiKeys).toEqual(['single']);
    expect(() => RuntimeEnvConfig.fromEnv({})).toThrow(EnvConfigError);
    for (const [field, value] of [['TORN_MAX_ATTEMPTS', '-1'], ['TORN_MAX_ATTEMPTS', '1.5'], ['TORN_MAX_ATTEMPTS', '4294967296'], ['TORN_MAX_IN_FLIGHT', '4294967296'], ['TORN_MAX_IN_FLIGHT', '0'], ['TORN_RATE_LIMIT_PER_KEY_PER_MIN', '0'], ['TORN_RATE_LIMIT_PER_IP_PER_MIN', '0']]) expect(() => RuntimeEnvConfig.fromEnv({ TORN_API_KEY: 'test', [field!]: value })).toThrow(EnvConfigError);
    expect(RuntimeEnvConfig.fromEnv({ TORN_API_KEY: 'test', TORN_MAX_ATTEMPTS: '+2' }).executorConfig.maxAttempts).toBe(2);
  });
  test('config validation rejects empty key set and zero quotas/concurrency/routes', () => {
    expect(() => new RequestExecutor(new QueueTransport(), [])).toThrow('no API keys');
    for (const config of [{ maxInFlight: 0 }, { rateLimits: { perKeyPerMinute: 0 } }, { rateLimits: { perIpPerMinute: 0 } }, { routes: [{ id: 'bad', perIpPerMinute: 0 }] }]) expect(() => new RequestExecutor(new QueueTransport(), ['test'], config)).toThrow();
    expect(defaultExecutorConfig().rateLimits).toEqual({ perKeyPerMinute: 100, perIpPerMinute: 1000, routeIpLimits: {} });
  });
  test('per-key quota is global across routes, per-route quota is independent, minutes roll over', () => {
    const limiter = new RateLimiter({ perKeyPerMinute: 2, perIpPerMinute: 1, routeIpLimits: { a: 2 } });
    expect(limiter.tryAcquireForRouteAtUnixSeconds('one', 'a', 10).acquired).toBe(true);
    expect(limiter.tryAcquireForRouteAtUnixSeconds('one', 'b', 10).acquired).toBe(true);
    expect(limiter.tryAcquireForRouteAtUnixSeconds('one', 'a', 10)).toEqual({ acquired: false, waitMs: 50_000 });
    expect(limiter.tryAcquireForRouteAtUnixSeconds('two', 'a', 10).acquired).toBe(true);
    expect(limiter.tryAcquireForRouteAtUnixSeconds('three', 'a', 10).acquired).toBe(false);
    expect(limiter.tryAcquireForRouteAtUnixSeconds('one', 'a', 60).acquired).toBe(true);
    expect(RateLimiter.waitDurationUntilNextMinute(60)).toBe(60_000);
    expect(RateLimiter.waitDurationUntilNextMinute(119)).toBe(1000);
  });
});

describe('Bun native transport local integration', () => {
  const servers: ReturnType<typeof Bun.serve>[] = [];
  afterAll(() => { for (const server of servers) server.stop(true); });
  function serve(fetch: (request: Request) => Response | Promise<Response>): string {
    const server = Bun.serve({ hostname: '127.0.0.1', port: 0, fetch }); servers.push(server); return `http://127.0.0.1:${server.port}`;
  }
  const request = (baseUrl: string, extra: Partial<TransportRequest> = {}): TransportRequest => ({ baseUrl, path: '/user', method: 'GET', query: { selections: 'profile', search: 'a b&c' }, apiKey: 'local-test-secret', ...extra });
  test('sends encoded query, key, user agent and returns non-JSON bodies with status', async () => {
    let receivedUrl = '', receivedAgent: string | null = null;
    const baseUrl = serve(req => { receivedUrl = req.url; receivedAgent = req.headers.get('user-agent'); return new Response('plain-text', { status: 202 }); });
    const transport = new BunTransport(1000, 'sdk-local-test');
    expect(await transport.execute(request(baseUrl))).toEqual({ status: 202, body: 'plain-text' });
    const url = new URL(receivedUrl);
    expect(url.pathname).toBe('/user'); expect(url.searchParams.get('search')).toBe('a b&c'); expect(url.searchParams.get('key')).toBe('local-test-secret');
    expect(receivedAgent as string | null).toBe('sdk-local-test');
  });
  test('per-call timeout and cancellation abort network requests and permit later requests', async () => {
    const baseUrl = serve(async req => { if (new URL(req.url).pathname === '/slow') await Bun.sleep(250); return new Response('{}'); });
    const transport = new BunTransport(1000);
    await expect(transport.execute(request(baseUrl, { path: '/slow', timeoutMs: 10 }))).rejects.toBeInstanceOf(TransportError);
    const controller = new AbortController();
    const pending = transport.execute(request(baseUrl, { path: '/slow', signal: controller.signal }));
    controller.abort(new Error('cancel local transport'));
    await expect(pending).rejects.toThrow('cancel local transport');
    expect((await transport.execute(request(baseUrl))).status).toBe(200);
  });
  test('named direct routes work, unknown route rejects, default ignores named proxy configuration', async () => {
    const baseUrl = serve(() => new Response('direct'));
    const transport = BunTransport.withRoutes(1000, 'local-test', [{ id: 'direct' }, { id: 'proxy', proxyUrl: 'http://127.0.0.1:1' }]);
    expect((await transport.execute(request(baseUrl, { routeId: 'direct' }))).body).toBe('direct');
    expect((await transport.execute(request(baseUrl, { routeId: 'default' }))).body).toBe('direct');
    await expect(transport.execute(request(baseUrl, { routeId: 'missing' }))).rejects.toThrow('unknown transport route');
    await expect(transport.execute(request(baseUrl, { routeId: 'proxy' }))).rejects.toBeInstanceOf(TransportError);
  });
  test('named HTTP proxy performs the request through a local proxy endpoint', async () => {
    let requests = 0;
    const proxyUrl = serve(() => { requests++; return new Response('proxied'); });
    const transport = BunTransport.withRoutes(1000, 'proxy-test', [{ id: 'proxy', proxyUrl }]);
    const response = await transport.execute(request('http://127.0.0.1:1', { routeId: 'proxy' }));
    expect(response.body).toBe('proxied'); expect(requests).toBe(1);
  });
  test('URL builder and sanitized errors preserve query semantics without disclosing secrets', () => {
    const url = buildUrl('http://localhost/v2///', 'user', { selections: 'profile', special: 'x y&z' }, 'secret');
    expect(url.pathname).toBe('/v2/user'); expect(url.searchParams.get('special')).toBe('x y&z'); expect(url.searchParams.get('key')).toBe('secret');
    expect(() => buildUrl('://bad', '/user', {}, 'secret')).toThrow(TransportError);
    const output = sanitizeErrorMessage('failed https://api.example/user?key=secret&x=1 via http://user:password@proxy.invalid:8080');
    expect(output).not.toContain('secret'); expect(output).not.toContain('password'); expect(output).toContain('x=1');
  });
  test('client uses local transport end to end for typed decoder and text', async () => {
    const baseUrl = serve(req => new URL(req.url).searchParams.get('selections') === 'timestamp' ? Response.json({ timestamp: 42 }) : new Response('snapshot'));
    const client = TornClient.withApiKeys(['local-test'], { baseUrlV2: baseUrl, baseUrlV1: baseUrl });
    expect(await client.getResourceDataTyped('user', ['timestamp'], {}, value => (value as { timestamp: number }).timestamp)).toBe(42);
    expect((await client.getResourceText('user', ['snapshot'])).body).toBe('snapshot');
  });
});
