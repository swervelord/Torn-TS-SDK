import { DEFAULT_ROUTE_ID, defaultRateLimitConfig } from "./config.ts";
import type { RateLimitConfig } from "./types.ts";

export type AcquireResult = { acquired: true } | { acquired: false; waitMs: number };
const INSPECT = Symbol.for("nodejs.util.inspect.custom");

/** Rolling log of send times; entries older than the window are discarded. */
class SlidingLog {
  #times: number[] = [];
  prune(now: number, windowMs: number): void { while (this.#times.length && this.#times[0]! <= now - windowMs) this.#times.shift(); }
  count(now: number, windowMs: number): number { this.prune(now, windowMs); return this.#times.length; }
  /** Milliseconds until one more send fits under `limit`. */
  waitFor(now: number, windowMs: number, limit: number): number {
    const used = this.count(now, windowMs);
    if (used < limit) return 0;
    return Math.max(1, this.#times[used - limit]! + windowMs - now);
  }
  oldest(now: number, windowMs: number): number | undefined { this.prune(now, windowMs); return this.#times[0]; }
  /** Move another log's entries into this one (used when keys are grouped after they already sent). */
  absorb(other: SlidingLog): void { for (const time of other.#times) this.add(time); other.#times = []; }
  add(time: number): void {
    let index = this.#times.length;
    while (index > 0 && this.#times[index - 1]! > time) index--;
    this.#times.splice(index, 0, time);
  }
  get size(): number { return this.#times.length; }
}

/**
 * PARITY_SPEC P3.1-P3.2: per-key (or per key group) and per-route budgets over a rolling window
 * (default 100 requests / 60 s per key, 1000 / 60 s per route). Keys declared in one group (same Torn user) share a budget.
 */
export class RateLimiter {
  readonly config: RateLimitConfig;
  #keys = new Map<string, SlidingLog>();
  #routes = new Map<string, SlidingLog>();
  #groupOf = new Map<string, string>();
  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = { ...defaultRateLimitConfig(), ...config, routeIpLimits: { ...config.routeIpLimits } };
    for (const [index, group] of (config.keyGroups ?? []).entries()) for (const key of group) this.#groupOf.set(key, `group:${index}`);
  }
  get windowMs(): number { return this.config.windowMs; }
  /** Declare that `keys` belong to the same Torn user and therefore share one budget (P3.2). */
  setKeyGroup(keys: Iterable<string>, id = `group:${[...new Set(this.#groupOf.values())].length + 1}`): void {
    for (const key of keys) {
      const previous = this.#budget(key);
      this.#groupOf.set(key, id);
      const target = this.#budget(key);
      if (previous !== target) target.absorb(previous);
    }
  }
  #budget(key: string): SlidingLog {
    const id = this.#groupOf.get(key) ?? `key:${key}`;
    let log = this.#keys.get(id); if (!log) this.#keys.set(id, log = new SlidingLog());
    return log;
  }
  #route(route: string): SlidingLog {
    let log = this.#routes.get(route); if (!log) this.#routes.set(route, log = new SlidingLog());
    return log;
  }
  routeLimit(route: string): number { return this.config.routeIpLimits[route] ?? this.config.perIpPerMinute; }
  /** Milliseconds until `key` may send on `route` (0 = now). */
  waitMs(key: string, route: string, nowMs: number): number {
    return Math.max(this.#budget(key).waitFor(nowMs, this.windowMs, this.config.perKeyPerMinute), this.#route(route).waitFor(nowMs, this.windowMs, this.routeLimit(route)));
  }
  /** Requests still available to `key` in the current window. */
  remaining(key: string, nowMs: number): number { return Math.max(0, this.config.perKeyPerMinute - this.#budget(key).count(nowMs, this.windowMs)); }
  tryAcquire(key: string, route: string, nowMs: number): AcquireResult {
    const waitMs = this.waitMs(key, route, nowMs);
    if (waitMs > 0) return { acquired: false, waitMs };
    this.record(key, route, nowMs);
    return { acquired: true };
  }
  /** Record a send that already happened (also used to preload state in tests). */
  record(key: string, route: string, atMs: number): void { this.#budget(key).add(atMs); this.#route(route).add(atMs); }
  /** P3.3: when Torn answers code 5, the key's budget is unusable until its oldest logged send leaves the window. */
  rateLimitedUntil(key: string, nowMs: number): number {
    const oldest = this.#budget(key).oldest(nowMs, this.windowMs);
    return (oldest ?? nowMs) + this.windowMs;
  }

  /** @deprecated Seconds-based API from 2.x; use {@link RateLimiter.tryAcquire} with milliseconds. */
  tryAcquireAtUnixSeconds(key: string, seconds: number): AcquireResult { return this.tryAcquire(key, DEFAULT_ROUTE_ID, seconds * 1000); }
  /** @deprecated Use {@link RateLimiter.tryAcquire}. */
  tryAcquireForRouteAtUnixSeconds(key: string, route: string, seconds: number): AcquireResult { return this.tryAcquire(key, route, seconds * 1000); }
  /** @deprecated The executor tracks rate-limited keys itself (P3.3). Fills the key's window at `seconds`. */
  markKeyExhaustedAtUnixSeconds(key: string, seconds: number): void {
    const log = this.#budget(key), now = seconds * 1000;
    while (log.count(now, this.windowMs) < this.config.perKeyPerMinute) log.add(now);
  }
  /** @deprecated Use route blocking in the executor. */
  markIpExhaustedAtUnixSeconds(seconds: number): void { this.markRouteExhaustedAtUnixSeconds(DEFAULT_ROUTE_ID, seconds); }
  /** @deprecated Use route blocking in the executor. */
  markRouteExhaustedAtUnixSeconds(route: string, seconds: number): void {
    const log = this.#route(route), now = seconds * 1000;
    while (log.count(now, this.windowMs) < this.routeLimit(route)) log.add(now);
  }
  /** @deprecated Calendar-minute arithmetic from 2.x; the limiter is a sliding window. */
  static waitDurationUntilNextMinute(seconds: number): number { return (60 - (Math.floor(seconds) % 60)) * 1000; }
  toJSON(): object { return { config: { ...this.config, keyGroups: this.config.keyGroups ? `${this.config.keyGroups.length} group(s)` : undefined }, budgets: this.#keys.size, routes: [...this.#routes.keys()] }; }
  [INSPECT](): object { return this.toJSON(); }
}
