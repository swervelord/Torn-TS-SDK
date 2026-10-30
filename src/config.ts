import type { ExecutorConfig, RateLimitConfig } from "./types.ts";
import { EnvConfigError, ExecutorError } from "./errors.ts";

export type ExecutorConfigInput = Partial<Omit<ExecutorConfig, "rateLimits">> & { rateLimits?: Partial<RateLimitConfig> };
export const DEFAULT_ROUTE_ID = "default";
/** Package version; kept equal to package.json by tests. */
export const SDK_VERSION = "2.2.0";
export const DEFAULT_USER_AGENT = `torn-sdk-typescript/${SDK_VERSION}`;
export function defaultRateLimitConfig(): RateLimitConfig {
  return { perKeyPerMinute: 100, perIpPerMinute: 1000, routeIpLimits: {} };
}
export function defaultExecutorConfig(input: ExecutorConfigInput = {}): ExecutorConfig {
  const config:ExecutorConfig = {
    baseUrlV2: "https://api.torn.com/v2", baseUrlV1: "https://api.torn.com",
    timeoutMs: 30_000, userAgent: DEFAULT_USER_AGENT, maxAttempts: 3,
    networkRetryBackoffMs: 250, maxInFlight: 8, routes: [], ...input,
    rateLimits: { ...defaultRateLimitConfig(), ...input.rateLimits, routeIpLimits: { ...input.rateLimits?.routeIpLimits } },
  };
  Object.defineProperties(config, {
    toJSON: { value: () => redactedConfig(config) },
    [Symbol.for("nodejs.util.inspect.custom")]: { value: () => redactedConfig(config) },
  });
  return config;
}
export function validateExecutorConfig(config: ExecutorConfig): void {
  for (const [field, value] of Object.entries({maxInFlight:config.maxInFlight, perKeyPerMinute:config.rateLimits.perKeyPerMinute, perIpPerMinute:config.rateLimits.perIpPerMinute})) {
    if (!Number.isSafeInteger(value) || value <= 0) throw new ExecutorError(`invalid executor configuration for '${field}': must be a positive safe integer`, { field });
  }
  for (const [field, value] of Object.entries({maxAttempts:config.maxAttempts,timeoutMs:config.timeoutMs,networkRetryBackoffMs:config.networkRetryBackoffMs})) {
    if (!Number.isSafeInteger(value) || value < 0) throw new ExecutorError(`invalid executor configuration for '${field}': must be a non-negative safe integer`, { field });
  }
  for (const route of config.routes) {
    if (!Number.isSafeInteger(route.perIpPerMinute) || route.perIpPerMinute <= 0) throw new ExecutorError(`invalid route quota for '${route.id}'`);
  }
}
export const ENV_API_KEYS = "TORN_API_KEYS";
export const ENV_API_KEY = "TORN_API_KEY";
export const ENV_BASE_URL_V2 = "TORN_API_BASE_URL_V2";
export const ENV_BASE_URL_V1 = "TORN_API_BASE_URL_V1";
export const ENV_HTTP_TIMEOUT_SECS = "TORN_HTTP_TIMEOUT_SECS";
export const ENV_USER_AGENT = "TORN_USER_AGENT";
export const ENV_MAX_ATTEMPTS = "TORN_MAX_ATTEMPTS";
export const ENV_NETWORK_RETRY_BACKOFF_MS = "TORN_NETWORK_RETRY_BACKOFF_MS";
export const ENV_RATE_LIMIT_PER_KEY = "TORN_RATE_LIMIT_PER_KEY_PER_MIN";
export const ENV_RATE_LIMIT_PER_IP = "TORN_RATE_LIMIT_PER_IP_PER_MIN";
export const ENV_MAX_IN_FLIGHT = "TORN_MAX_IN_FLIGHT";

export class RuntimeEnvConfig {
  #apiKeys: string[];
  readonly executorConfig: ExecutorConfig;
  constructor(apiKeys: string[], executorConfig: ExecutorConfig) { this.#apiKeys = [...apiKeys]; this.executorConfig = executorConfig; }
  get apiKeys(): string[] { return [...this.#apiKeys]; }
  get api_keys(): string[] { return this.apiKeys; }
  get executor_config(): ExecutorConfig { return this.executorConfig; }
  /** Bun automatically loads .env files at process startup. Explicit maps make tests deterministic. */
  static fromEnv(env: Record<string, string | undefined> = Bun.env): RuntimeEnvConfig {
    const keys = env[ENV_API_KEYS]?.split(",").map(v=>v.trim()).filter(Boolean) ?? [];
    if (!keys.length && env[ENV_API_KEY]?.trim()) keys.push(env[ENV_API_KEY]!.trim());
    if (!keys.length) throw new EnvConfigError(`no Torn API keys found; set '${ENV_API_KEYS}' or '${ENV_API_KEY}'`);
    const config = defaultExecutorConfig();
    for (const [name, field] of [[ENV_BASE_URL_V2,"baseUrlV2"],[ENV_BASE_URL_V1,"baseUrlV1"],[ENV_USER_AGENT,"userAgent"]] as const) {
      if (env[name]?.trim()) config[field] = env[name]!.trim();
    }
    const uint = (name: string, max: number): number | undefined => {
      const value = env[name]?.trim();
      if (!value) return undefined;
      if (!/^\+?\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value)>max) throw new EnvConfigError(`invalid value for env var '${name}': expected unsigned integer`, { varName:name });
      return Number(value);
    };
    const timeout = uint(ENV_HTTP_TIMEOUT_SECS,Math.floor(Number.MAX_SAFE_INTEGER/1000));
    if (timeout !== undefined) config.timeoutMs=timeout*1000;
    const attempts = uint(ENV_MAX_ATTEMPTS,0xffff_ffff); if(attempts!==undefined) config.maxAttempts=attempts;
    const backoff = uint(ENV_NETWORK_RETRY_BACKOFF_MS,Number.MAX_SAFE_INTEGER); if(backoff!==undefined) config.networkRetryBackoffMs=backoff;
    const perKey=uint(ENV_RATE_LIMIT_PER_KEY,0xffff_ffff); if(perKey!==undefined) config.rateLimits.perKeyPerMinute=perKey;
    const perIp=uint(ENV_RATE_LIMIT_PER_IP,0xffff_ffff); if(perIp!==undefined) config.rateLimits.perIpPerMinute=perIp;
    const concurrency=uint(ENV_MAX_IN_FLIGHT,0xffff_ffff); if(concurrency!==undefined) config.maxInFlight=concurrency;
    try { validateExecutorConfig(config); } catch { throw new EnvConfigError("invalid environment configuration: rate limits and concurrency must be positive"); }
    return new RuntimeEnvConfig(keys,config);
  }
  static from_env = RuntimeEnvConfig.fromEnv;
  toJSON(): object { return { apiKeys: this.#apiKeys.map(()=>"[REDACTED]"), executorConfig: redactedConfig(this.executorConfig) }; }
  [Symbol.for("nodejs.util.inspect.custom")](): object { return this.toJSON(); }
}
export function redactedConfig(config: ExecutorConfig): object {
  return {...config,proxyUrl: config.proxyUrl ? "[REDACTED]" : undefined,routes:config.routes.map(r=>({...r,proxyUrl:r.proxyUrl?"[REDACTED]":undefined}))};
}
