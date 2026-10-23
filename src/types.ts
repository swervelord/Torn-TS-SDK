/** JSON values are deliberately distinct from `any` and arbitrary JS objects. */
/** Unsafe integral JSON tokens use bigint; ordinary API numbers remain number. */
export type Integer = number | bigint;
export type JsonValue = null | boolean | number | bigint | string | JsonValue[] | JsonObject;
export interface JsonObject { [key: string]: JsonValue }
export type ApiVersion = "v1" | "v2";
export type HttpMethod = "GET";
export type RequestStrategy = "generic-combined" | "generic-single" | "direct-endpoint" | "version-fallback";
export interface ExecutionOptions {
  maxAttempts?: number;
  requestTimeoutMs?: number;
  routeId?: string;
  signal?: AbortSignal;
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
  constructor(options: ExecutionOptions = {}) { Object.assign(this, options); }
  static default() { return new ExecutionOptions(); }
  withMaxAttempts(value: number): this { this.maxAttempts = value; return this; }
  withRequestTimeout(value: number): this { this.requestTimeoutMs = value; return this; }
  withRouteId(value: string): this { this.routeId = value; return this; }
  withSignal(value: AbortSignal): this { this.signal = value; return this; }
  with_max_attempts = this.withMaxAttempts.bind(this);
  with_request_timeout = this.withRequestTimeout.bind(this);
  with_route_id = this.withRouteId.bind(this);
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
  with_id=this.withId.bind(this);
  with_filter=this.withFilter.bind(this);
  with_path_arg=this.withPathArg.bind(this);
  with_legacy_selection=this.withLegacySelection.bind(this);
  with_execution_options=this.withExecutionOptions.bind(this);
  with_max_attempts=this.withMaxAttempts.bind(this);
  with_request_timeout=this.withRequestTimeout.bind(this);
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
  readonly key_used: string;
  readonly api_version: ApiVersion;
  readonly route_id: string;
  status: number;
  fallback: boolean;
  routeId: string;
}
export interface ExecutionReport {
  mergedJson: JsonValue;
  readonly merged_json: JsonValue;
  calls: ExecutedCall[];
  deserialize<T>(decoder?: Decoder<T>): T;
}
export interface TextExecutionReport { body: string; calls: ExecutedCall[] }
export type Decoder<T> = (value: JsonValue) => T;
export interface EgressRouteConfig { id: string; proxyUrl?: string; perIpPerMinute: number }
export interface RateLimitConfig {
  perKeyPerMinute: number;
  perIpPerMinute: number;
  routeIpLimits: Record<string, number>;
}
export interface ExecutorConfig {
  baseUrlV2: string;
  baseUrlV1: string;
  timeoutMs: number;
  userAgent: string;
  maxAttempts: number;
  networkRetryBackoffMs: number;
  rateLimits: RateLimitConfig;
  maxInFlight: number;
  proxyUrl?: string;
  routes: EgressRouteConfig[];
}
/** Injectable timing makes quota, retry, and cancellation behavior testable without real waits. */
export interface Scheduler {
  now(): number;
  sleep(ms: number, signal?: AbortSignal): Promise<void>;
}
