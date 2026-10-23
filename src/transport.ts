import { DEFAULT_ROUTE_ID } from "./config.ts";
import { TransportError } from "./errors.ts";
import type { HttpMethod } from "./types.ts";

export interface TransportRequest {
  baseUrl:string;path:string;method:HttpMethod;query:Record<string,string>;
  apiKey:string;timeoutMs?:number;routeId?:string;signal?:AbortSignal;
}
export interface TransportResponse {status:number;body:string}
export interface HttpTransport {execute(request:TransportRequest):Promise<TransportResponse>}
export interface TransportRouteConfig {id:string;proxyUrl?:string}
export function sanitizeErrorMessage(message:string):string {
  return message.replace(/key=[^&"'\s)]*/g,"key=[REDACTED]").replace(/([a-z][a-z\d+.-]*:\/\/)[^/@?#\s"')]+@/gi,"$1[REDACTED]@");
}
export function buildUrl(baseUrl:string,path:string,query:Record<string,string>,apiKey:string):URL {
  let url:URL;
  try { url=new URL(`${baseUrl.replace(/\/+$/,"")}${path.startsWith("/")?path:`/${path}`}`); }
  catch { throw new TransportError("invalid URL built from configured base and request path",{path}); }
  for(const [key,value] of Object.entries(query).sort(([a],[b])=>a.localeCompare(b))) url.searchParams.append(key,value);
  url.searchParams.append("key",apiKey);return url;
}
export class BunTransport implements HttpTransport {
  #routes=new Map<string,TransportRouteConfig>();
  #proxyUrl?:string;
  readonly timeoutMs:number;
  readonly userAgent:string;
  constructor(timeoutMs=30_000,userAgent="torn-sdk-typescript/2.0.0",proxyUrl?:string,routes:Iterable<TransportRouteConfig>=[]) {
    this.timeoutMs=timeoutMs;this.userAgent=userAgent;this.#proxyUrl=proxyUrl;
    for(const route of routes)this.#routes.set(route.id,{...route});
  }
  static withProxy(timeoutMs:number,userAgent:string,proxyUrl:string):BunTransport{return new BunTransport(timeoutMs,userAgent,proxyUrl);}
  static withRoutes(timeoutMs:number,userAgent:string,routes:Iterable<TransportRouteConfig>):BunTransport{return new BunTransport(timeoutMs,userAgent,undefined,routes);}
  static with_proxy=BunTransport.withProxy;
  static with_routes=BunTransport.withRoutes;
  async execute(request:TransportRequest):Promise<TransportResponse> {
    request.signal?.throwIfAborted();
    let proxy=this.#proxyUrl;
    if(request.routeId && request.routeId!==DEFAULT_ROUTE_ID) {
      const route=this.#routes.get(request.routeId);
      if(!route) throw new TransportError(`unknown transport route '${request.routeId}'`,{routeId:request.routeId});
      proxy=route.proxyUrl;
    }
    const url=buildUrl(request.baseUrl,request.path,request.query,request.apiKey);
    const timeoutMs=request.timeoutMs??this.timeoutMs;
    const controller=new AbortController();
    const onAbort=()=>controller.abort(request.signal?.reason);
    request.signal?.addEventListener("abort",onAbort,{once:true});
    const timer=setTimeout(()=>controller.abort(new DOMException("HTTP request timed out","TimeoutError")),timeoutMs);
    try {
      const response=await fetch(url,{method:request.method,headers:{"User-Agent":this.userAgent},signal:controller.signal,...(proxy?{proxy}:{} )});
      return {status:response.status,body:await response.text()};
    } catch(error) {
      if(request.signal?.aborted) throw request.signal.reason;
      throw new TransportError(sanitizeErrorMessage(error instanceof Error?error.message:String(error)));
    } finally {clearTimeout(timer);request.signal?.removeEventListener("abort",onAbort);}
  }
  toJSON():object{return {timeoutMs:this.timeoutMs,userAgent:this.userAgent,routes:[...this.#routes.keys()],proxyConfigured:!!this.#proxyUrl};}
  [Symbol.for("nodejs.util.inspect.custom")]():object{return this.toJSON();}
}
/** Naming aliases for the transport abstraction; implementation uses Bun's native fetch. */
export { BunTransport as FetchTransport, BunTransport as ReqwestTransport };
