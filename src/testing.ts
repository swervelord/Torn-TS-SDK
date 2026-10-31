/**
 * Consumer test kit (PARITY_SPEC P8.5), published as `torn-ts-sdk/testing`: a scripted mock transport with request
 * assertions, a virtual clock, and fixture loading. No network, no real waits.
 */
import { TornClient } from "./client.ts";
import { TornSdk } from "./wrapper/index.ts";
import { TransportError, keyHint } from "./errors.ts";
import { buildUrl, type HttpTransport, type TransportRequest, type TransportResponse } from "./transport.ts";
import { readTextFile } from "./capabilities.ts";
import { parseLosslessJson, stringifyLosslessJson } from "./json.ts";
import type { ExecutorConfigInput } from "./config.ts";
import type { ExecutorDependencies } from "./executor.ts";
import type { PlannerOptions } from "./planner.ts";
import type { ApiVersion, JsonValue, Scheduler } from "./types.ts";

/** One scripted reply. `body` objects are serialized as JSON; strings are sent verbatim. */
export interface ScriptedResponse {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
  /** Simulate a network failure instead of a response. */
  networkError?: boolean | string;
}
export interface RecordedRequest {
  method: string;
  apiVersion: ApiVersion;
  /** Path relative to the API base, e.g. `/v2/user` or `/user/`. */
  path: string;
  query: Record<string, string>;
  /** Full URL without any key. */
  url: string;
  /** The key the SDK authenticated with (Authorization header on v2, `key=` query on v1). Test keys only. */
  apiKey: string;
  routeId?: string;
}
export type Responder = (request: RecordedRequest) => ScriptedResponse | undefined;

/** Deterministic HTTP transport: replies from a queue (or a responder function) and records every request. */
export class MockTransport implements HttpTransport {
  readonly requests: RecordedRequest[] = [];
  #queue: ScriptedResponse[] = [];
  #responder?: Responder;
  constructor(script: ScriptedResponse[] | Responder = []) {
    if (typeof script === "function") this.#responder = script; else this.#queue.push(...script);
  }
  /** Queue more replies. */
  enqueue(...responses: ScriptedResponse[]): this { this.#queue.push(...responses); return this; }
  /** Replies still queued. */
  get pending(): number { return this.#queue.length; }
  async execute(request: TransportRequest): Promise<TransportResponse> {
    request.signal?.throwIfAborted();
    const v1 = request.apiVersion === "v1";
    const url = buildUrl(request.baseUrl, request.path, request.query);
    const recorded: RecordedRequest = { method: request.method, apiVersion: v1 ? "v1" : "v2", path: url.pathname, query: { ...request.query }, url: url.toString(), apiKey: request.apiKey, ...(request.routeId ? { routeId: request.routeId } : {}) };
    const safe = () => ({ ...recorded, apiKey: keyHint(request.apiKey) });
    Object.defineProperty(recorded, "toJSON", { value: safe });
    Object.defineProperty(recorded, Symbol.for("nodejs.util.inspect.custom"), { value: safe });
    this.requests.push(recorded);
    const reply = this.#responder?.(recorded) ?? this.#queue.shift();
    if (!reply) throw new Error(`MockTransport: no scripted response for request #${this.requests.length} (${recorded.path})`);
    if (reply.networkError) throw new TransportError(typeof reply.networkError === "string" ? reply.networkError : "mock network error");
    const body = typeof reply.body === "string" ? reply.body : reply.body === undefined ? "" : stringifyLosslessJson(reply.body as JsonValue);
    const headers = Object.fromEntries(Object.entries(reply.headers ?? {}).map(([name, value]) => [name.toLowerCase(), value]));
    return { status: reply.status ?? 200, body, headers };
  }
  /** Throw unless request `index` matches the expectation (path exact; query values as a subset). */
  expectRequest(index: number, expected: { path?: string; query?: Record<string, string>; absentQuery?: string[]; apiKey?: string; apiVersion?: ApiVersion }): RecordedRequest {
    const request = this.requests[index];
    if (!request) throw new Error(`MockTransport: expected request #${index + 1}, only ${this.requests.length} were sent`);
    const fail = (what: string) => { throw new Error(`MockTransport: request #${index + 1} ${what}`); };
    if (expected.path !== undefined && request.path !== expected.path) fail(`path ${request.path} !== ${expected.path}`);
    if (expected.apiVersion !== undefined && request.apiVersion !== expected.apiVersion) fail(`apiVersion ${request.apiVersion} !== ${expected.apiVersion}`);
    if (expected.apiKey !== undefined && request.apiKey !== expected.apiKey) fail(`used key ${keyHint(request.apiKey)}, expected ${keyHint(expected.apiKey)}`);
    for (const [name, value] of Object.entries(expected.query ?? {})) if (request.query[name] !== value) fail(`query ${name}=${request.query[name]} !== ${value}`);
    for (const name of expected.absentQuery ?? []) if (Object.hasOwn(request.query, name)) fail(`unexpectedly carries query '${name}'`);
    return request;
  }
  /** Throw if replies remain queued. */
  assertDone(): void { if (this.#queue.length) throw new Error(`MockTransport: ${this.#queue.length} scripted response(s) were not used`); }
}
/** JSON reply helper. */
export const jsonResponse = (body: unknown, status = 200, headers: Record<string, string> = {}): ScriptedResponse => ({ status, body, headers });
/** Torn error envelope reply helper. */
export const tornError = (code: number, message = "error"): ScriptedResponse => ({ status: 200, body: { error: { code, error: message } } });

/** Virtual clock: `sleep` advances time instantly; every sleep is recorded. */
export class VirtualScheduler implements Scheduler {
  time: number;
  readonly sleeps: number[] = [];
  constructor(startMs = 0) { this.time = startMs; }
  now(): number { return this.time; }
  async sleep(ms: number, signal?: AbortSignal): Promise<void> { signal?.throwIfAborted(); this.sleeps.push(ms); this.time += ms; }
}

export interface MockSdkOptions {
  keys?: string[];
  config?: ExecutorConfigInput;
  dependencies?: ExecutorDependencies;
  planner?: PlannerOptions;
  startMs?: number;
}
/** A `TornSdk` wired to a MockTransport and a VirtualScheduler (deterministic retries: `jitter: "none"`). */
export function mockSdk(script: ScriptedResponse[] | Responder = [], options: MockSdkOptions = {}): { sdk: TornSdk; client: TornClient<MockTransport>; transport: MockTransport; clock: VirtualScheduler } {
  const transport = new MockTransport(script), clock = new VirtualScheduler(options.startMs ?? 0);
  const client = TornClient.withTransport(transport, options.keys ?? ["TEST_KEY_0000001"], { jitter: "none", ...options.config }, { scheduler: clock, ...options.dependencies }, options.planner);
  return { sdk: new TornSdk(client), client, transport, clock };
}
/** Load a JSON fixture (file path, file URL or http(s) URL) losslessly (int64 values stay exact). */
export async function loadFixture<T = JsonValue>(path: string | URL): Promise<T> {
  return parseLosslessJson(await readTextFile(path)) as T;
}
