import type { JsonValue } from "./types.ts";
import { defaultRetryPolicy, tornErrorCodeInfo, type TornErrorCodeInfo } from "./generated/error-codes.ts";
import type { AccessLevel } from "./generated/access-levels.ts";
import type { ValidationIssue } from "./schema.ts";

/** PARITY_SPEC P5.2 error taxonomy. `planner`, `config` and `executor` are SDK-local refinements of `validation`. */
export type ErrorKind = "api" | "http" | "transport" | "decode" | "validation" | "no_usable_keys" | "cancelled" | "planner" | "config" | "executor";
const INSPECT = Symbol.for("nodejs.util.inspect.custom");

/** PARITY_SPEC P2.2: at most `***` plus the last four characters of a key are ever shown. */
export function keyHint(key: string | undefined): string | undefined {
  if (key === undefined) return undefined;
  return key.length > 8 ? `***${key.slice(-4)}` : "***";
}

/**
 * Base class. Every subclass declares its `name` literally so bundlers that rename classes (`ApiError2`) cannot change
 * what `error.name` reports.
 */
export class SdkError extends Error {
  override name = "SdkError";
  readonly details: Record<string, unknown>;
  constructor(message: string, details: Record<string, unknown> = {}, options?: ErrorOptions) {
    super(message, options); this.details = details;
  }
  /** Coarse taxonomy shared by all four Torn SDKs. */
  get errorKind(): ErrorKind { return "validation"; }
}
export class ValidationError extends SdkError {
  override name = "ValidationError";
  readonly issues: ValidationIssue[];
  constructor(message: string, details: Record<string, unknown> = {}, options?: ErrorOptions) {
    super(message, details, options); this.issues = Array.isArray(details.issues) ? details.issues as ValidationIssue[] : [];
  }
}
/** PARITY_SPEC P6.2: the configured key's access level is known to be too low; nothing was sent. */
export class AccessLevelError extends ValidationError {
  override name = "AccessLevelError";
  readonly requiredAccess: AccessLevel;
  readonly keyAccess: AccessLevel;
  readonly target: string;
  constructor(target: string, requiredAccess: AccessLevel, keyAccess: AccessLevel) {
    super(`'${target}' requires a ${requiredAccess} access key; the configured key(s) only have ${keyAccess} access`, { target, requiredAccess, keyAccess });
    this.target = target; this.requiredAccess = requiredAccess; this.keyAccess = keyAccess;
  }
}
export interface DecodeErrorDetails {
  [key: string]: unknown;
  /** Generated operationId for `openapi()` calls. */
  operation?: string;
  /** Selection(s) being decoded for facade/batch calls. */
  selection?: string;
  schemaName?: string;
  /** JSON path of the first failing value, e.g. `$.territorywars[0].result`. */
  jsonPath?: string;
  /** What the schema expected at `jsonPath`. */
  expected?: string;
  /** Truncated, key-redacted excerpt of the offending value. */
  excerpt?: string;
  issues?: ValidationIssue[];
  /** The complete decoded-JSON payload; never lost on a decode failure (PARITY_SPEC P1.4). */
  raw?: JsonValue;
  /** Successfully decoded selections of a multi-selection batch. */
  partial?: Record<string, unknown>;
}
/** A response did not match the expected model. The full payload stays available through `raw` / `rawBody`. */
export class DecodeError extends SdkError {
  override name = "DecodeError";
  readonly operation?: string;
  readonly selection?: string;
  readonly schemaName?: string;
  readonly jsonPath?: string;
  readonly expected?: string;
  readonly excerpt?: string;
  readonly issues: ValidationIssue[];
  constructor(message: string, details: DecodeErrorDetails = {}, options?: ErrorOptions) {
    const { raw, partial, ...rest } = details;
    super(message, rest, options);
    this.operation = details.operation; this.selection = details.selection; this.schemaName = details.schemaName;
    this.jsonPath = details.jsonPath; this.expected = details.expected; this.excerpt = details.excerpt;
    this.issues = details.issues ?? [];
    // Non-enumerable: payloads can be large and are not part of JSON/inspect output.
    Object.defineProperty(this, "raw", { value: raw, enumerable: false });
    Object.defineProperty(this, "partial", { value: partial, enumerable: false });
  }
  declare readonly raw: JsonValue | undefined;
  declare readonly partial: Record<string, unknown> | undefined;
  /** The payload re-serialized losslessly (bigints stay exact). */
  get rawBody(): string | undefined {
    if (this.raw === undefined) return undefined;
    return JSON.stringify(this.raw, (_k, v: unknown) => typeof v === "bigint" ? (JSON as typeof JSON & { rawJSON?: (s: string) => unknown }).rawJSON?.(v.toString()) ?? v.toString() : v);
  }
  override get errorKind(): ErrorKind { return "decode"; }
}
export class PlannerError extends SdkError {
  override name = "PlannerError";
  readonly kind: string;
  constructor(message: string, kind = "planning", details: Record<string, unknown> = {}) {
    super(message, details); this.kind = kind;
  }
  override get errorKind(): ErrorKind { return "planner"; }
}
export class EnvConfigError extends SdkError {
  override name = "EnvConfigError";
  override get errorKind(): ErrorKind { return "config"; }
}
/** Network failure (DNS, connection, TLS, reset). Retried with backoff (PARITY_SPEC P4.2). */
export class TransportError extends SdkError {
  override name = "TransportError";
  override get errorKind(): ErrorKind { return "transport"; }
}
/** A single HTTP send exceeded its timeout. Retried like any other network error. */
export class TimeoutError extends TransportError {
  override name = "TimeoutError";
}
export class ExecutorError extends SdkError {
  override name = "ExecutorError";
  override get errorKind(): ErrorKind { return "executor"; }
}
export class ClientError extends SdkError {
  override name = "ClientError";
}
/** The caller's AbortSignal fired. `cause` is the signal's reason. */
export class CancelledError extends SdkError {
  override name = "CancelledError";
  constructor(reason: unknown) {
    super(`request cancelled${reason instanceof Error && reason.message ? `: ${reason.message}` : ""}`, {}, { cause: reason });
  }
  override get errorKind(): ErrorKind { return "cancelled"; }
}
export interface ApiErrorOptions { path: string; status: number; code?: number; keyUsed?: string; operation?: string; routeId?: string }
/** Torn returned `{"error":{"code":N,"error":"..."}}` (or an HTTP error status with such an envelope). */
export class ApiError extends ExecutorError {
  override name = "ApiError";
  readonly path: string;
  readonly status: number;
  readonly code?: number;
  /** Planner selections or operationId of the failed request. */
  readonly operation?: string;
  readonly routeId?: string;
  #keyUsed?: string;
  constructor(message: string, options: ApiErrorOptions) {
    super(message, { path: options.path, status: options.status, code: options.code, ...(options.operation ? { operation: options.operation } : {}) });
    this.path = options.path; this.status = options.status; this.code = options.code; this.operation = options.operation; this.routeId = options.routeId;
    this.#keyUsed = options.keyUsed;
  }
  /** The full key, for programmatic use only; never printed by toJSON/inspect/toString. */
  get keyUsed(): string | undefined { return this.#keyUsed; }
  /** @deprecated Use {@link ApiError.keyUsed}. */
  get key_used(): string | undefined { return this.#keyUsed; }
  /** `***` + last four characters of the key that received the error. */
  get keyHint(): string | undefined { return keyHint(this.#keyUsed); }
  /** Policy row from `error-codes.json`, or undefined for HTTP errors and codes newer than the SDK. */
  get info(): TornErrorCodeInfo | undefined { return tornErrorCodeInfo(this.code); }
  override get errorKind(): ErrorKind { return "api"; }
  toJSON(): object { return { name: this.name, message: this.message, ...this.details, keyHint: this.keyHint }; }
  [INSPECT](): object { return this.toJSON(); }
}
/** HTTP error status without a Torn error envelope. */
export class HttpError extends ApiError {
  override name = "HttpError";
  override get errorKind(): ErrorKind { return "http"; }
}
/** PARITY_SPEC P2.4: every configured key is disabled (or exhausted for this request). `last` is the final API error. */
export class NoUsableKeysError extends ExecutorError {
  override name = "NoUsableKeysError";
  readonly last?: ApiError;
  constructor(last?: ApiError) {
    super(`no usable API keys remain${last ? ` (last error: code ${last.code ?? "?"} ${last.message})` : ""}`, { code: last?.code }, { cause: last });
    this.last = last;
  }
  /** Torn code of the last error. */
  get code(): number | undefined { return this.last?.code; }
  override get errorKind(): ErrorKind { return "no_usable_keys"; }
  toJSON(): object { return { name: this.name, message: this.message, code: this.code, last: this.last?.toJSON() }; }
  [INSPECT](): object { return this.toJSON(); }
}

/** PARITY_SPEC P5.2 kind of any thrown value (non-SDK aborts map to `cancelled`, other values to `undefined`). */
export function errorKind(error: unknown): ErrorKind | undefined {
  if (error instanceof SdkError) return error.errorKind;
  if (error instanceof Error && error.name === "AbortError") return "cancelled";
  return undefined;
}
/** Torn error code of an API (or no-usable-keys) error. */
export function errorCode(error: unknown): number | undefined {
  return error instanceof ApiError || error instanceof NoUsableKeysError ? error.code : undefined;
}
/** PARITY_SPEC P5.3 helpers. Classification uses codes and statuses only, never message text (P4.1). */
export function isRetryable(error: unknown): boolean {
  if (error instanceof HttpError) return defaultRetryPolicy.httpRetryStatuses.includes(error.status);
  if (error instanceof ApiError) return error.info?.retryable ?? false;
  return error instanceof TransportError;
}
export function isKeyError(error: unknown): boolean {
  return error instanceof NoUsableKeysError || (error instanceof ApiError && error.info?.category === "key");
}
export function isRateLimit(error: unknown): boolean {
  return error instanceof ApiError && (error.code === 5 || error.status === 429);
}
export function isAccessError(error: unknown): boolean {
  return error instanceof AccessLevelError || (error instanceof ApiError && error.info?.category === "access");
}
export function isTransient(error: unknown): boolean {
  if (error instanceof TransportError) return true;
  if (error instanceof HttpError) return defaultRetryPolicy.httpRetryStatuses.includes(error.status);
  return error instanceof ApiError && error.info?.category === "transient";
}
export function isJsonObject(value: unknown): value is Record<string, JsonValue> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
