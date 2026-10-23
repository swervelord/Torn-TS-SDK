import { DEFAULT_ROUTE_ID, defaultRateLimitConfig } from "./config.ts";
import type { RateLimitConfig } from "./types.ts";

export type AcquireResult = { acquired: true } | { acquired: false; waitMs: number };
export class RateLimiter {
  #minuteIndex = 0;
  #keyCounts = new Map<string,number>();
  #routeCounts = new Map<string,number>();
  readonly config: RateLimitConfig;
  constructor(config: Partial<RateLimitConfig> = {}) { this.config = {...defaultRateLimitConfig(),...config,routeIpLimits:{...config.routeIpLimits}}; }
  #sync(seconds: number): void {
    const minuteIndex=Math.floor(seconds/60);
    if (minuteIndex!==this.#minuteIndex) { this.#minuteIndex=minuteIndex; this.#keyCounts.clear();this.#routeCounts.clear(); }
  }
  tryAcquireAtUnixSeconds(key:string,seconds:number):AcquireResult {return this.tryAcquireForRouteAtUnixSeconds(key,DEFAULT_ROUTE_ID,seconds);}
  tryAcquireForRouteAtUnixSeconds(key:string,route:string,seconds:number):AcquireResult {
    this.#sync(seconds);
    const keys=this.#keyCounts.get(key)??0,routes=this.#routeCounts.get(route)??0;
    if(keys>=this.config.perKeyPerMinute||routes>=this.routeLimit(route)) return {acquired:false,waitMs:RateLimiter.waitDurationUntilNextMinute(seconds)};
    this.#keyCounts.set(key,keys+1);this.#routeCounts.set(route,routes+1);return {acquired:true};
  }
  markKeyExhaustedAtUnixSeconds(key:string,seconds:number):void {this.#sync(seconds);this.#keyCounts.set(key,this.config.perKeyPerMinute);}
  markIpExhaustedAtUnixSeconds(seconds:number):void {this.markRouteExhaustedAtUnixSeconds(DEFAULT_ROUTE_ID,seconds);}
  markRouteExhaustedAtUnixSeconds(route:string,seconds:number):void {this.#sync(seconds);this.#routeCounts.set(route,this.routeLimit(route));}
  routeLimit(route:string):number {return this.config.routeIpLimits[route]??this.config.perIpPerMinute;}
  static waitDurationUntilNextMinute(seconds:number):number {return (60-(Math.floor(seconds)%60))*1000;}
  try_acquire_at_unix_seconds=this.tryAcquireAtUnixSeconds.bind(this);
  try_acquire_for_route_at_unix_seconds=this.tryAcquireForRouteAtUnixSeconds.bind(this);
  mark_key_exhausted_at_unix_seconds=this.markKeyExhaustedAtUnixSeconds.bind(this);
  mark_ip_exhausted_at_unix_seconds=this.markIpExhaustedAtUnixSeconds.bind(this);
  mark_route_exhausted_at_unix_seconds=this.markRouteExhaustedAtUnixSeconds.bind(this);
  static wait_duration_until_next_minute=RateLimiter.waitDurationUntilNextMinute;
  toJSON():object{return {config:this.config,minuteIndex:this.#minuteIndex,keyCount:this.#keyCounts.size,routeCounts:Object.fromEntries(this.#routeCounts)};}
  [Symbol.for("nodejs.util.inspect.custom")]():object{return this.toJSON();}
}
