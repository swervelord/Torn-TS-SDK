import type { JsonValue } from "./types.ts";

/** A cached successful JSON response. `expiresAt` uses the executor's scheduler clock (epoch ms). */
export interface CachedResponse { value: JsonValue; expiresAt: number }
/**
 * Pluggable response cache (PARITY_SPEC P8.4). Off by default; pass one as `TornClient.withApiKeys(keys, config, { cache })`.
 * Only successful JSON responses are stored, never errors. Cache keys contain the request URL and a non-reversible key
 * fingerprint, never a key.
 */
export interface ResponseCache {
  get(key: string): CachedResponse | undefined | Promise<CachedResponse | undefined>;
  set(key: string, entry: CachedResponse, ttlMs: number): void | Promise<void>;
  delete?(key: string): void | Promise<void>;
  clear?(): void | Promise<void>;
}
/** In-memory LRU-ish TTL cache. Expired entries are dropped on read; the oldest entries are evicted past `maxEntries`. */
export class MemoryCache implements ResponseCache {
  #entries = new Map<string, CachedResponse>();
  readonly maxEntries: number;
  constructor(options: { maxEntries?: number } = {}) { this.maxEntries = options.maxEntries ?? 1000; }
  get(key: string): CachedResponse | undefined {
    const entry = this.#entries.get(key);
    if (entry) { this.#entries.delete(key); this.#entries.set(key, entry); }
    return entry;
  }
  set(key: string, entry: CachedResponse): void {
    this.#entries.delete(key); this.#entries.set(key, entry);
    while (this.#entries.size > this.maxEntries) this.#entries.delete(this.#entries.keys().next().value!);
  }
  delete(key: string): void { this.#entries.delete(key); }
  clear(): void { this.#entries.clear(); }
  get size(): number { return this.#entries.size; }
  toJSON(): object { return { entries: this.#entries.size, maxEntries: this.maxEntries }; }
}
