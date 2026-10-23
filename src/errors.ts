import type { JsonValue } from "./types.ts";

export class SdkError extends Error {
  constructor(message: string, public readonly details: Record<string, unknown> = {}, options?: ErrorOptions) {
    super(message, options); this.name = new.target.name;
  }
}
export class ValidationError extends SdkError {}
export class DecodeError extends SdkError {}
export class PlannerError extends SdkError {
  readonly kind: string;
  constructor(message: string, kind = "planning", details: Record<string, unknown> = {}) {
    super(message, details); this.kind = kind;
  }
}
export class EnvConfigError extends SdkError {}
export class TransportError extends SdkError {}
export class ExecutorError extends SdkError {}
export class ClientError extends SdkError {}
export class ApiError extends ExecutorError {
  readonly path: string;
  readonly status: number;
  readonly code?: number;
  #keyUsed?: string;
  constructor(message: string, options: {path: string;status: number;code?: number;keyUsed?: string}) {
    super(message, { path: options.path, status: options.status, code: options.code });
    this.path = options.path; this.status = options.status; this.code = options.code; this.#keyUsed = options.keyUsed;
  }
  get keyUsed(): string | undefined { return this.#keyUsed; }
  get key_used(): string | undefined { return this.#keyUsed; }
  toJSON(): object { return { name: this.name, message: this.message, ...this.details, keyUsed: this.#keyUsed ? "[REDACTED]" : undefined }; }
  [Symbol.for("nodejs.util.inspect.custom")](): object { return this.toJSON(); }
}
export function isJsonObject(value: unknown): value is Record<string, JsonValue> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
