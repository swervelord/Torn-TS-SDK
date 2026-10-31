/**
 * Shared cross-SDK conformance suite (PARITY_SPEC P9.1). Every scenario in every `spec/shared/conformance/*.json` file
 * runs through a scripted transport and a virtual clock; one test per scenario id. A scenario using a feature this
 * harness does not understand fails rather than being skipped.
 */
import { describe, expect, test } from 'bun:test';
import { readdirSync, readFileSync } from 'node:fs';
import { inspect } from 'node:util';
import { TornClient } from '../src/client.ts';
import { TornSdk } from '../src/wrapper/index.ts';
import { TransportError, errorKind, errorCode, AccessLevelError } from '../src/errors.ts';
import { buildUrl, type HttpTransport, type TransportRequest, type TransportResponse } from '../src/transport.ts';
import { decodeSelectionBatch, type JsonSelection, type ResourceName } from '../src/batch.ts';
import { validateModel, operationPlan } from '../src/generated/runtime.ts';
import { defaultCapabilities } from '../src/capabilities.ts';
import { VirtualScheduler } from '../src/testing.ts';
import type { AccessLevel } from '../src/generated/access-levels.ts';
import type { ValidationIssue } from '../src/schema.ts';
import type { JsonValue } from '../src/types.ts';

interface Exchange {
  expect: { method: string; path: string; query?: Record<string, unknown>; absentQuery?: string[]; auth: string; atMs?: number };
  respond: { status?: number; headers?: Record<string, string>; body?: unknown; networkError?: boolean };
}
interface Scenario {
  id: string; requirements: string[];
  config: { keys: string[]; maxAttempts?: number; perKeyPerMinute?: number; routes?: string[]; keyGroups?: string[][]; checkAccess?: boolean; keyAccess?: Record<string, AccessLevel>; jitter?: 'none' | 'full' };
  clock?: { startMs: number };
  preload?: { key: string; sendsAtMs: number[] }[];
  request: { kind: 'selections' | 'operation' | 'raw' | 'paginate'; resource?: string; selections?: string[]; id?: string | number | null; params?: Record<string, unknown>; operationId?: string | null; path?: string | null; maxPages?: number | null };
  exchanges: Exchange[];
  expect: {
    outcome: 'ok' | 'error'; error?: { kind: string; code?: number; requiredAccess?: string }; data?: Record<string, unknown>; sends: number;
    keyStates?: Record<string, string>; minElapsedMs?: number; maxElapsedMs?: number; pages?: number; typedDecode?: 'ok' | 'error'; unknownEnum?: string; secretNotIn?: string;
  };
}
const KNOWN_TOP = new Set(['id', 'requirements', 'config', 'clock', 'preload', 'request', 'exchanges', 'expect']);
const KNOWN_CONFIG = new Set(['keys', 'maxAttempts', 'perKeyPerMinute', 'routes', 'keyGroups', 'checkAccess', 'keyAccess', 'jitter']);
const KNOWN_EXPECT = new Set(['outcome', 'error', 'data', 'sends', 'keyStates', 'minElapsedMs', 'maxElapsedMs', 'pages', 'typedDecode', 'unknownEnum', 'secretNotIn']);

const directory = new URL('../spec/shared/conformance/', import.meta.url);
const files = readdirSync(directory).filter(name => name.endsWith('.json')).sort();
const scenarios: { file: string; scenario: Scenario }[] = files.flatMap(file => (JSON.parse(readFileSync(new URL(file, directory), 'utf8')) as { scenarios: Scenario[] }).scenarios.map(scenario => ({ file, scenario })));

class ScriptTransport implements HttpTransport {
  sent: { request: TransportRequest; atMs: number }[] = [];
  constructor(readonly exchanges: Exchange[], readonly clock: VirtualScheduler) {}
  async execute(request: TransportRequest): Promise<TransportResponse> {
    this.sent.push({ request: { ...request, query: { ...request.query } }, atMs: this.clock.now() });
    const exchange = this.exchanges[this.sent.length - 1];
    if (!exchange) return { status: 599, body: `conformance: unexpected send #${this.sent.length}` };
    if (exchange.respond.networkError) throw new TransportError('conformance network error');
    const body = typeof exchange.respond.body === 'string' ? exchange.respond.body : JSON.stringify(exchange.respond.body ?? null);
    return { status: exchange.respond.status ?? 200, body, headers: Object.fromEntries(Object.entries(exchange.respond.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v])) };
  }
}
const stringify = (value: unknown): string => Array.isArray(value) ? value.map(String).join(',') : String(value);
function at(value: JsonValue, path: string): unknown {
  let current: unknown = value;
  for (const part of path.split('.')) current = current !== null && typeof current === 'object' ? (current as Record<string, unknown>)[part] : undefined;
  return current;
}

describe(`shared conformance (${scenarios.length} scenarios from ${files.join(', ')})`, () => {
  test('scenario ids are unique', () => {
    expect(new Set(scenarios.map(entry => entry.scenario.id)).size).toBe(scenarios.length);
  });
  for (const { scenario: s } of scenarios) test(`${s.id} [${s.requirements.join(', ')}]`, async () => {
    for (const key of Object.keys(s)) expect(KNOWN_TOP.has(key), `unsupported scenario field '${key}'`).toBe(true);
    for (const key of Object.keys(s.config)) expect(KNOWN_CONFIG.has(key), `unsupported config field '${key}'`).toBe(true);
    for (const key of Object.keys(s.expect)) expect(KNOWN_EXPECT.has(key), `unsupported expectation '${key}'`).toBe(true);
    const startMs = s.clock?.startMs ?? 0, clock = new VirtualScheduler(startMs);
    const transport = new ScriptTransport(s.exchanges, clock);
    const routes = s.config.routes?.filter(route => route !== 'direct' && route !== 'default') ?? [];
    const client = TornClient.withTransport(transport, s.config.keys, {
      jitter: s.config.jitter ?? 'none',
      ...(s.config.maxAttempts !== undefined ? { maxAttempts: s.config.maxAttempts } : {}),
      rateLimits: { ...(s.config.perKeyPerMinute !== undefined ? { perKeyPerMinute: s.config.perKeyPerMinute } : {}), ...(s.config.keyGroups ? { keyGroups: s.config.keyGroups } : {}) },
      ...(routes.length ? { routes: routes.map(id => ({ id, perIpPerMinute: 1000 })) } : {}),
      checkAccess: s.config.checkAccess ?? false,
      keyAccess: s.config.keyAccess ?? {},
    }, { scheduler: clock });
    for (const preload of s.preload ?? []) for (const time of preload.sendsAtMs) client.executor.rateLimiter.record(preload.key, routes[0] ?? 'default', time);

    let data: JsonValue | undefined, error: unknown, pages = 0;
    const params = Object.fromEntries(Object.entries(s.request.params ?? {}).map(([k, v]) => [k, stringify(v)]));
    try {
      if (s.request.kind === 'selections') {
        data = (await client.getResourceData(s.request.resource!, s.request.selections ?? [], { ...(s.request.id !== null && s.request.id !== undefined ? { id: String(s.request.id) } : {}), filters: params })).mergedJson;
      } else if (s.request.kind === 'operation') {
        data = (await client.executePlan(operationPlan(s.request.operationId!, s.request.params ?? {}))).mergedJson;
      } else if (s.request.kind === 'raw') {
        data = await client.get(s.request.path!, params);
      } else if (s.request.kind === 'paginate') {
        for await (const page of client.paginate(s.request.path!, params, s.request.maxPages ? { maxPages: s.request.maxPages } : {})) { pages++; data = page.data; }
      } else throw new Error(`unsupported request kind ${(s.request as { kind: string }).kind}`);
    } catch (caught) { error = caught; }

    // Exchanges: exact order, path, query subset, absent query names, auth, virtual send time.
    for (const [index, exchange] of s.exchanges.entries()) {
      const sent = transport.sent[index];
      expect(sent, `send #${index + 1} missing (error: ${String(error)})`).toBeDefined();
      const url = buildUrl(sent!.request.baseUrl, sent!.request.path, sent!.request.query);
      expect(url.host).toBe('api.torn.com');
      expect(sent!.request.method as string).toBe(exchange.expect.method);
      expect(url.pathname).toBe(exchange.expect.path);
      for (const [name, value] of Object.entries(exchange.expect.query ?? {})) expect(sent!.request.query[name], `query ${name}`).toBe(stringify(value));
      for (const name of exchange.expect.absentQuery ?? []) expect(Object.hasOwn(sent!.request.query, name), `absent query ${name}`).toBe(false);
      expect(sent!.request.apiKey).toBe(exchange.expect.auth);
      expect(sent!.request.apiVersion ?? 'v2').toBe(url.pathname.startsWith('/v2/') ? 'v2' : 'v1');
      if (exchange.expect.atMs !== undefined) expect(sent!.atMs).toBeGreaterThanOrEqual(exchange.expect.atMs);
    }
    expect(transport.sent.length).toBe(s.expect.sends);
    expect(s.exchanges.length).toBe(s.expect.sends);

    if (s.expect.outcome === 'ok') {
      expect(error, `unexpected error: ${error instanceof Error ? error.message : String(error)}`).toBeUndefined();
    } else {
      expect(error).toBeDefined();
      expect(errorKind(error)).toBe(s.expect.error!.kind as never);
      if (s.expect.error!.code !== undefined) expect(errorCode(error)).toBe(s.expect.error!.code);
      if (s.expect.error!.requiredAccess !== undefined) expect((error as AccessLevelError).requiredAccess).toBe(s.expect.error!.requiredAccess as AccessLevel);
    }
    for (const [path, value] of Object.entries(s.expect.data ?? {})) expect(at(data!, path)).toEqual(value);
    for (const [key, state] of Object.entries(s.expect.keyStates ?? {})) expect(client.executor.keyState(key)?.state, `state of ${key}`).toBe(state as never);
    const elapsed = clock.now() - startMs;
    if (s.expect.minElapsedMs !== undefined) expect(elapsed).toBeGreaterThanOrEqual(s.expect.minElapsedMs);
    if (s.expect.maxElapsedMs !== undefined) expect(elapsed).toBeLessThanOrEqual(s.expect.maxElapsedMs);
    if (s.expect.pages !== undefined) expect(pages).toBe(s.expect.pages);
    if (s.expect.typedDecode !== undefined) {
      expect(s.request.kind).toBe('selections');
      let decoded = 'ok';
      try { decodeSelectionBatch(s.request.resource as ResourceName, (s.request.selections ?? []) as JsonSelection<ResourceName>[], data!); } catch { decoded = 'error'; }
      expect(decoded).toBe(s.expect.typedDecode);
    }
    if (s.expect.unknownEnum !== undefined) {
      // The generated v2 model of the selection keeps the unknown value and reports it as an unknown enum member (P1.1).
      const selection = defaultCapabilities.resources[s.request.resource!]!.selections!.find(item => item.name === s.request.selections![0]);
      const model = selection!.response_schema_refs!.map(ref => ref.split('/').at(-1)!).find(name => name.endsWith('Response'))!;
      const warnings: ValidationIssue[] = [];
      expect(validateModel(model, data, { warnings })).toEqual([]);
      expect(warnings).toContainEqual(expect.objectContaining({ path: `$.${s.expect.unknownEnum}`, kind: 'unknown_enum', value: at(data!, s.expect.unknownEnum) }));
      expect(validateModel(model, data, { mode: 'strict' }).length).toBeGreaterThan(0);
    }
    if (s.expect.secretNotIn !== undefined) {
      const secret = s.expect.secretNotIn, sdk = new TornSdk(client);
      const outputs = [error, client, client.executor, sdk, client.executor.config, client.keyStates()].flatMap(value => [
        JSON.stringify(value), inspect(value, { depth: 10, showHidden: false }), String(value), `${value}`,
        ...(value instanceof Error ? [value.message, value.stack ?? '', inspect(value.cause, { depth: 10 })] : []),
      ]);
      for (const output of outputs) expect(output).not.toContain(secret);
    }
  });
});
