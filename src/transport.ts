import { DEFAULT_ROUTE_ID, DEFAULT_USER_AGENT } from "./config.ts";
import { TimeoutError, TransportError } from "./errors.ts";
import { sanitizeErrorMessage } from "./redact.ts";
import type { ApiVersion, HttpMethod } from "./types.ts";

export { sanitizeErrorMessage } from "./redact.ts";
export interface TransportRequest {
  baseUrl:string;path:string;method:HttpMethod;query:Record<string,string>;
  /** v2 (the default) sends `Authorization: ApiKey <key>`; v1 has no documented header authentication and sends the `key` query parameter. */
  apiKey:string;apiVersion?:ApiVersion;timeoutMs?:number;routeId?:string;signal?:AbortSignal;
}
export interface TransportResponse {
  status:number;body:string;
  /** Response headers with lower-cased names (used for `Retry-After`, PARITY_SPEC P4.2). */
  headers?:Record<string,string>;
}
export interface HttpTransport {execute(request:TransportRequest):Promise<TransportResponse>}
export interface TransportRouteConfig {id:string;proxyUrl?:string}
/** Minimal `fetch` signature so any WHATWG-compatible implementation (undici, node-fetch, a test double) can be injected. */
export type FetchLike = (input: URL | string, init: RequestInit & Record<string, unknown>) => Promise<Response>;
export interface FetchTransportOptions {
  timeoutMs?: number;
  userAgent?: string;
  proxyUrl?: string;
  routes?: Iterable<TransportRouteConfig>;
  /** Custom fetch (default: `globalThis.fetch`). Use it for proxies on Node, e.g. undici's `fetch` with a `ProxyAgent` dispatcher. */
  fetch?: FetchLike;
}
/** Builds the request URL; `apiKey` is appended as the `key` query parameter only when given. */
export function buildUrl(baseUrl:string,path:string,query:Record<string,string>,apiKey?:string):URL {
  let url:URL;
  try { url=new URL(`${baseUrl.replace(/\/+$/,"")}${path.startsWith("/")?path:`/${path}`}`); }
  catch { throw new TransportError("invalid URL built from configured base and request path",{path}); }
  for(const [key,value] of Object.entries(query).sort(([a],[b])=>a.localeCompare(b))) url.searchParams.append(key,value);
  if(apiKey!==undefined)url.searchParams.append("key",apiKey);
  return url;
}
type ProxyRuntime = { kind: "bun" } | { kind: "deno"; createHttpClient(options: { proxy: { url: string } }): unknown } | { kind: "none" };
/** Feature detection for proxy support: Bun's `fetch(url,{proxy})`, Deno's `Deno.createHttpClient`. Nothing else can proxy without a custom fetch. */
function proxyRuntime(): ProxyRuntime {
  const scope = globalThis as { Bun?: unknown; Deno?: { createHttpClient?: (options: { proxy: { url: string } }) => unknown } };
  if (scope.Bun !== undefined) return { kind: "bun" };
  if (typeof scope.Deno?.createHttpClient === "function") return { kind: "deno", createHttpClient: scope.Deno.createHttpClient.bind(scope.Deno) };
  return { kind: "none" };
}
/**
 * Portable `fetch` transport for Node >= 20, Bun, Deno, browsers and workers (PARITY_SPEC P9.5). Proxies use the
 * runtime's native mechanism when one exists; otherwise a configured proxy fails loudly instead of being bypassed.
 * Browsers ignore the `User-Agent` header (it is a forbidden header there).
 */
export class FetchTransport implements HttpTransport {
  #routes=new Map<string,TransportRouteConfig>();
  #proxyUrl?:string;
  #fetch?:FetchLike;
  #denoClients=new Map<string,unknown>();
  readonly timeoutMs:number;
  readonly userAgent:string;
  constructor(timeoutMs?:number,userAgent?:string,proxyUrl?:string,routes?:Iterable<TransportRouteConfig>);
  constructor(options:FetchTransportOptions);
  constructor(timeoutOrOptions:number|FetchTransportOptions=30_000,userAgent=DEFAULT_USER_AGENT,proxyUrl?:string,routes:Iterable<TransportRouteConfig>=[]) {
    const options:FetchTransportOptions=typeof timeoutOrOptions==="object"?timeoutOrOptions:{timeoutMs:timeoutOrOptions,userAgent,proxyUrl,routes};
    this.timeoutMs=options.timeoutMs??30_000;this.userAgent=options.userAgent??DEFAULT_USER_AGENT;this.#proxyUrl=options.proxyUrl;this.#fetch=options.fetch;
    for(const route of options.routes??[])this.#routes.set(route.id,{...route});
  }
  static withProxy(timeoutMs:number,userAgent:string,proxyUrl:string):FetchTransport{return new FetchTransport({timeoutMs,userAgent,proxyUrl});}
  static withRoutes(timeoutMs:number,userAgent:string,routes:Iterable<TransportRouteConfig>):FetchTransport{return new FetchTransport({timeoutMs,userAgent,routes});}
  /** @deprecated Use FetchTransport.withProxy. */
  static with_proxy=FetchTransport.withProxy;
  /** @deprecated Use FetchTransport.withRoutes. */
  static with_routes=FetchTransport.withRoutes;
  #proxyInit(proxy:string|undefined):Record<string,unknown> {
    if(!proxy)return {};
    if(this.#fetch)return {proxy};
    const runtime=proxyRuntime();
    if(runtime.kind==="bun")return {proxy};
    if(runtime.kind==="deno"){
      let client=this.#denoClients.get(proxy);
      if(!client){client=runtime.createHttpClient({proxy:{url:proxy}});this.#denoClients.set(proxy,client);}
      return {client};
    }
    throw new TransportError("a proxy is configured but this runtime's fetch cannot use one; pass FetchTransportOptions.fetch (for example undici's fetch with a ProxyAgent dispatcher)");
  }
  async execute(request:TransportRequest):Promise<TransportResponse> {
    request.signal?.throwIfAborted();
    let proxy=this.#proxyUrl;
    if(request.routeId && request.routeId!==DEFAULT_ROUTE_ID) {
      const route=this.#routes.get(request.routeId);
      if(!route) throw new TransportError(`unknown transport route '${request.routeId}'`,{routeId:request.routeId});
      proxy=route.proxyUrl;
    }
    const v1=request.apiVersion==="v1";
    const url=buildUrl(request.baseUrl,request.path,request.query,v1?request.apiKey:undefined);
    const headers:Record<string,string>={"User-Agent":this.userAgent};
    if(!v1)headers.Authorization=`ApiKey ${request.apiKey}`;
    const proxyInit=this.#proxyInit(proxy);
    const timeoutMs=request.timeoutMs??this.timeoutMs;
    const controller=new AbortController();
    let timedOut=false;
    const onAbort=()=>controller.abort(request.signal?.reason);
    request.signal?.addEventListener("abort",onAbort,{once:true});
    const timer=setTimeout(()=>{timedOut=true;controller.abort();},timeoutMs);
    try {
      const fetcher:FetchLike=this.#fetch??((input,init)=>globalThis.fetch(input,init));
      const response=await fetcher(url,{method:request.method,headers,signal:controller.signal,...proxyInit});
      const responseHeaders:Record<string,string>={};
      response.headers.forEach((value,name)=>{responseHeaders[name.toLowerCase()]=value;});
      return {status:response.status,body:await response.text(),headers:responseHeaders};
    } catch(error) {
      if(request.signal?.aborted) throw request.signal.reason;
      if(timedOut)throw new TimeoutError(`HTTP request timed out after ${timeoutMs} ms`);
      throw new TransportError(sanitizeErrorMessage(error instanceof Error?error.message:String(error)),{},{cause:error instanceof Error?new Error(sanitizeErrorMessage(error.message)):undefined});
    } finally {clearTimeout(timer);request.signal?.removeEventListener("abort",onAbort);}
  }
  toJSON():object{return {timeoutMs:this.timeoutMs,userAgent:this.userAgent,routes:[...this.#routes.keys()],proxyConfigured:!!this.#proxyUrl,customFetch:!!this.#fetch};}
  [Symbol.for("nodejs.util.inspect.custom")]():object{return this.toJSON();}
}
/** @deprecated Renamed to {@link FetchTransport}; it is portable and no longer Bun-specific. */
export const BunTransport = FetchTransport;
/** @deprecated Renamed to {@link FetchTransport}. */
export type BunTransport = FetchTransport;
/** @deprecated Rust naming alias; use {@link FetchTransport}. */
export const ReqwestTransport = FetchTransport;
/** @deprecated Rust naming alias; use {@link FetchTransport}. */
export type ReqwestTransport = FetchTransport;
