import type { AccessLevel } from "./generated/access-levels.ts";
import type { ValidationMode } from "./schema.ts";

/** JSON values are deliberately distinct from `any` and arbitrary JS objects. */
/** Unsafe integral JSON tokens use bigint; ordinary API numbers remain number. */
export type Integer = number | bigint;
export type JsonValue = null | boolean | number | bigint | string | JsonValue[] | JsonObject;
export interface JsonObject { [key: string]: JsonValue }
export type ApiVersion = "v1" | "v2";
export type HttpMethod = "GET";
export type RequestStrategy = "generic-combined" | "generic-single" | "direct-endpoint" | "version-fallback";
export interface ExecutionOptions {
  /** Total HTTP sends allowed for each planned request (PARITY_SPEC P4.2). */
  maxAttempts?: number;
  requestTimeoutMs?: number;
  routeId?: string;
  /** Aborts quota waits, retry sleeps and in-flight requests (PARITY_SPEC P4.4). */
  signal?: AbortSignal;
  /** Use this key for the request instead of the pool (sent in the Authorization header on v2, PARITY_SPEC P2.1). */
  apiKey?: string;
  /** Skip the response cache for this call (P8.4). */
  noCache?: boolean;
}
export interface DataRequestOptions {
  id?: string;
  filters?: Record<string, string>;
  pathArgs?: Record<string, string>;
  legacySelections?: string[];
  executionOptions?: ExecutionOptions;
}
/** Optional builder syntax alongside ordinary typed object literals. Durations are milliseconds. */
export const ExecutionOptions = class ExecutionOptionsBuilder implements ExecutionOptions {
  maxAttempts?: number;
  requestTimeoutMs?: number;
  routeId?: string;
  signal?: AbortSignal;
  apiKey?: string;
  noCache?: boolean;
  constructor(options: ExecutionOptions = {}) { Object.assign(this, options); }
  static default() { return new ExecutionOptions(); }
  withMaxAttempts(value: number): this { this.maxAttempts = value; return this; }
  withRequestTimeout(value: number): this { this.requestTimeoutMs = value; return this; }
  withRouteId(value: string): this { this.routeId = value; return this; }
  withSignal(value: AbortSignal): this { this.signal = value; return this; }
  /** @deprecated Use withMaxAttempts. */
  with_max_attempts = this.withMaxAttempts.bind(this);
  /** @deprecated Use withRequestTimeout. */
  with_request_timeout = this.withRequestTimeout.bind(this);
  /** @deprecated Use withRouteId. */
  with_route_id = this.withRouteId.bind(this);
  toJSON(): object { return { maxAttempts: this.maxAttempts, requestTimeoutMs: this.requestTimeoutMs, routeId: this.routeId, noCache: this.noCache, apiKey: this.apiKey === undefined ? undefined : "***" }; }
  [Symbol.for("nodejs.util.inspect.custom")](): object { return this.toJSON(); }
};
export const DataRequestOptions = class DataRequestOptionsBuilder implements DataRequestOptions {
  id?: string;
  filters: Record<string, string>;
  pathArgs: Record<string, string>;
  legacySelections: string[];
  executionOptions: ExecutionOptions;
  constructor(options: DataRequestOptions = {}) {
    this.id=options.id; this.filters={...options.filters}; this.pathArgs={...options.pathArgs};
    this.legacySelections=[...options.legacySelections??[]]; this.executionOptions={...options.executionOptions};
  }
  static default() { return new DataRequestOptions(); }
  withId(value: string | Integer): this { this.id=String(value); return this; }
  withFilter(name: string, value: string): this { this.filters[name]=value; return this; }
  withPathArg(name: string, value: string): this { this.pathArgs[name]=value; return this; }
  withLegacySelection(value: string): this { this.legacySelections.push(value); return this; }
  withExecutionOptions(value: ExecutionOptions): this { this.executionOptions={...value}; return this; }
  withMaxAttempts(value: number): this { this.executionOptions.maxAttempts=value; return this; }
  withRequestTimeout(value: number): this { this.executionOptions.requestTimeoutMs=value; return this; }
  withRouteId(value: string): this { this.executionOptions.routeId=value; return this; }
  /** @deprecated Use withId. */
  with_id=this.withId.bind(this);
  /** @deprecated Use withFilter. */
  with_filter=this.withFilter.bind(this);
  /** @deprecated Use withPathArg. */
  with_path_arg=this.withPathArg.bind(this);
  /** @deprecated Use withLegacySelection. */
  with_legacy_selection=this.withLegacySelection.bind(this);
  /** @deprecated Use withExecutionOptions. */
  with_execution_options=this.withExecutionOptions.bind(this);
  /** @deprecated Use withMaxAttempts. */
  with_max_attempts=this.withMaxAttempts.bind(this);
  /** @deprecated Use withRequestTimeout. */
  with_request_timeout=this.withRequestTimeout.bind(this);
  /** @deprecated Use withRouteId. */
  with_route_id=this.withRouteId.bind(this);
};
export interface PlanRequestData {
  resource: string;
  selections: string[];
  id?: string;
  filters?: Record<string, string>;
  pathArgs?: Record<string, string>;
  legacySelections?: string[];
}
export interface PlannedRequest {
  resource: string;
  path: string;
  method: HttpMethod;
  query: Record<string, string>;
  selections: string[];
  strategy: RequestStrategy;
  fallbackSplit: SplitRequest[];
  apiVersion: ApiVersion;
  /** Generated operationId for exact `openapi()` requests. */
  operation?: string;
  /** Required key access level when known (PARITY_SPEC P6). */
  access?: AccessLevel;
  /** Response-cache TTL from the spec's cache notes (P8.4); used only when a cache is configured. */
  cacheTtlMs?: number;
}
export type SplitRequest = Omit<PlannedRequest, "fallbackSplit">;
export interface RequestPlan { resource: string; requests: PlannedRequest[] }
export interface ExecutedCall {
  apiVersion: ApiVersion;
  resource: string;
  path: string;
  method: HttpMethod;
  query: Record<string, string>;
  selections: string[];
  strategy: RequestStrategy;
  /** Credential used for the call. Deliberately redacted by SDK inspect/JSON output. */
  readonly keyUsed: string;
  /** `***` + last four characters of the key. */
  readonly keyHint: string;
  /** @deprecated Use keyUsed. */
  readonly key_used: string;
  /** @deprecated Use apiVersion. */
  readonly api_version: ApiVersion;
  /** @deprecated Use routeId. */
  readonly route_id: string;
  status: number;
  fallback: boolean;
  routeId: string;
  /** Served from the response cache (P8.4); no HTTP send happened. */
  cached?: boolean;
}
export interface ExecutionReport {
  mergedJson: JsonValue;
  /** @deprecated Use mergedJson. */
  readonly merged_json: JsonValue;
  calls: ExecutedCall[];
  /** Selections whose per-selection request still failed after a code-4 split (PARITY_SPEC P4.5); the rest are merged. */
  selectionErrors?: Record<string, Error>;
  deserialize<T>(decoder?: Decoder<T>): T;
}
export interface TextExecutionReport { body: string; calls: ExecutedCall[] }
export type Decoder<T> = (value: JsonValue) => T;
export interface EgressRouteConfig { id: string; proxyUrl?: string; perIpPerMinute: number }
export interface RateLimitConfig {
  /** Requests per key (or key group) per rolling window. Default 100. */
  perKeyPerMinute: number;
  /** Requests per egress route (IP) per rolling window. Default 1000. */
  perIpPerMinute: number;
  routeIpLimits: Record<string, number>;
  /** Rolling window length in milliseconds. Default 60 000 (PARITY_SPEC P3.1). */
  windowMs: number;
  /** Keys owned by the same Torn user share one budget (PARITY_SPEC P3.2). */
  keyGroups?: string[][];
}
/** Redacted per-request lifecycle data handed to hooks (PARITY_SPEC P8.3). Never contains a full key. */
export interface RequestEvent {
  /** operationId, or `resource:selections` for planner requests. */
  operation: string;
  method: HttpMethod;
  apiVersion: ApiVersion;
  /** Request URL without any key. */
  url: string;
  /** 1-based send number for this planned request. */
  attempt: number;
  keyHint: string;
  routeId: string;
  status?: number;
  durationMs?: number;
}
export interface RetryEvent extends RequestEvent { delayMs: number; reason: string; code?: number }
export interface ErrorEvent extends RequestEvent { error: Error }
export interface ClientHooks {
  onRequest?(event: RequestEvent): void;
  onResponse?(event: RequestEvent): void;
  onRetry?(event: RetryEvent): void;
  onError?(event: ErrorEvent): void;
}
export interface ExecutorConfig {
  baseUrlV2: string;
  baseUrlV1: string;
  timeoutMs: number;
  userAgent: string;
  /** Total sends per planned request, including retries and key rotations (default 4, PARITY_SPEC P4.2). */
  maxAttempts: number;
  /** Base backoff delay in ms: `base * 2^(n-1)` (default 500). */
  networkRetryBackoffMs: number;
  /** Backoff cap in ms (default 30 000). */
  retryMaxDelayMs: number;
  /** Upper bound for a server `Retry-After` (default 120 000 ms). */
  retryAfterCapMs: number;
  /** `full` jitter (default) draws each delay uniformly from [0, backoff]; `none` is deterministic. */
  jitter: "full" | "none";
  rateLimits: RateLimitConfig;
  maxInFlight: number;
  proxyUrl?: string;
  routes: EgressRouteConfig[];
  /** Response decoding mode for exact operations and facades (default `tolerant`, PARITY_SPEC P1.3). */
  validation: ValidationMode;
  /** Fail before sending when the configured keys' access level is known to be too low (PARITY_SPEC P6.2). */
  checkAccess: boolean;
  /** Known access level per key (filled by `TornClient.detectKeyAccess()` or declared up front). */
  keyAccess: Record<string, AccessLevel>;
  /** Detect each key's owner and access via `key/info` before the first request (P3.2 grouping, P6.2). */
  detectKeyOwners: boolean;
  hooks?: ClientHooks;
}
/** Injectable timing makes quota, retry, and cancellation behavior testable without real waits. */
export interface Scheduler {
  now(): number;
  sleep(ms: number, signal?: AbortSignal): Promise<void>;
}
