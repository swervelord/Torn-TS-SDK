import { AccessLevelError, ApiError, CancelledError, DecodeError, ExecutorError, HttpError, isJsonObject, keyHint, NoUsableKeysError, TransportError } from "./errors.ts";
import { defaultExecutorConfig, DEFAULT_ROUTE_ID, redactedConfig, validateExecutorConfig, type ExecutorConfigInput } from "./config.ts";
import { RateLimiter } from "./rate-limit.ts";
import { FetchTransport, buildUrl, type HttpTransport, type TransportResponse } from "./transport.ts";
import { sanitizeErrorMessage } from "./redact.ts";
import { V1Catalog } from "./v1-catalog.ts";
import { parseLosslessJson } from "./json.ts";
import { defaultRetryPolicy, tornErrorCodeInfo, type TornErrorAction } from "./generated/error-codes.ts";
import { accessLevelSatisfies, type AccessLevel } from "./generated/access-levels.ts";
import type { ResponseCache } from "./cache.ts";
import type { RequestPlanner } from "./planner.ts";
import type { ClientHooks, Decoder, ExecutedCall, ExecutionOptions, ExecutionReport, ExecutorConfig, JsonValue, PlannedRequest, PlanRequestData, RequestEvent, RequestPlan, Scheduler, SplitRequest, TextExecutionReport } from "./types.ts";

const INSPECT = Symbol.for("nodejs.util.inspect.custom");
export const defaultScheduler: Scheduler = {
  now: () => Date.now(),
  sleep(ms,signal) {
    signal?.throwIfAborted();
    return new Promise<void>((resolve,reject)=>{
      const done=()=>{signal?.removeEventListener("abort",aborted);resolve();};
      const timer=setTimeout(done,ms);
      const aborted=()=>{clearTimeout(timer);signal?.removeEventListener("abort",aborted);reject(signal?.reason);};
      signal?.addEventListener("abort",aborted,{once:true});
    });
  },
};

class Semaphore {
  #active=0;
  #waiters: Array<{resolve:()=>void;reject:(error:unknown)=>void;signal?:AbortSignal;abort:()=>void}>=[];
  constructor(readonly limit:number) {}
  async acquire(signal?:AbortSignal):Promise<()=>void> {
    signal?.throwIfAborted();
    if(this.#active<this.limit){this.#active++;return this.#release;}
    await new Promise<void>((resolve,reject)=>{
      const waiter={resolve,reject,signal,abort:()=>{
        const index=this.#waiters.indexOf(waiter);if(index>=0)this.#waiters.splice(index,1);
        reject(signal?.reason);
      }};
      this.#waiters.push(waiter);signal?.addEventListener("abort",waiter.abort,{once:true});
    });
    return this.#release;
  }
  #release=():void=>{
    const waiter=this.#waiters.shift();
    if(waiter){waiter.signal?.removeEventListener("abort",waiter.abort);waiter.resolve();} else this.#active--;
  };
}

export interface RouteUsage {minuteIndex:number;routeId:string;calls:number;waits:number;limit:number}
export interface ExecutorDependencies {
  scheduler?:Scheduler;
  onRouteUsage?:(usage:RouteUsage)=>void;
  /** Source of jitter in [0,1) (default Math.random). */
  random?:()=>number;
  /** Optional response cache (PARITY_SPEC P8.4); off unless supplied. */
  cache?:ResponseCache;
  /** Default cache TTL when the spec gives none (ms, default 30 000). */
  cacheDefaultTtlMs?:number;
}
/** PARITY_SPEC P2.3 key states. */
export type KeyStateName = "healthy" | "rate_limited" | "disabled";
export interface KeyStateInfo {
  /** `***` + last four characters. */
  key: string;
  state: KeyStateName;
  /** Epoch ms when a rate-limited / temporarily disabled key becomes usable again. */
  until?: number;
  reason?: string;
  code?: number;
  /** Requests left in the key's (group's) rolling window. */
  remaining: number;
  access?: AccessLevel;
}
interface KeyRecord { key:string; disabled?:{reason:string;code?:number;until:number}; rateLimitedUntil?:number }
type Target = SplitRequest;
type Single = {value:JsonValue;call:ExecutedCall};
type Attempt = {response:TransportResponse;key:string;routeId:string;value?:JsonValue};

/** Next UTC midnight after `now` (code 14 disables a key until then). */
export function nextUtcMidnight(now:number):number { const d=new Date(now); return Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()+1); }
function retryAfterMs(response:TransportResponse,now:number):number|undefined {
  const value=response.headers?.["retry-after"];if(value===undefined)return undefined;
  if(/^\s*\d+(\.\d+)?\s*$/.test(value))return Math.round(Number(value)*1000);
  const date=Date.parse(value);return Number.isNaN(date)?undefined:Math.max(0,date-now);
}
const describe=(target:Target)=>target.operation??`${target.resource}:${target.selections.join(",")||target.path}`;

/**
 * Sequential plan execution; independent concurrent calls share the same semaphore, key pool and quota state.
 * Retry, failover and rate-limit policy is driven by `spec/shared/error-codes.json` (PARITY_SPEC P2-P4).
 */
export class RequestExecutor<T extends HttpTransport = FetchTransport> {
  readonly transport:T;
  readonly config:ExecutorConfig;
  readonly rateLimiter:RateLimiter;
  #keys:KeyRecord[];
  #cursor=0;
  #semaphore:Semaphore;
  #scheduler:Scheduler;
  #random:()=>number;
  #cache?:ResponseCache;
  #cacheDefaultTtlMs:number;
  #onRouteUsage?:ExecutorDependencies["onRouteUsage"];
  #routeBlockedUntil=new Map<string,number>();
  #metricsMinute?:number;
  #routeCalls=new Map<string,number>();
  #routeWaits=new Map<string,number>();
  #detecting?:Promise<void>;

  constructor(transport:T,apiKeys:Iterable<string>,input:ExecutorConfigInput={},deps:ExecutorDependencies={}) {
    const keys=[...apiKeys];
    if(!keys.length)throw new ExecutorError("no API keys configured",{kind:"NoApiKeys"});
    this.#keys=keys.map(key=>({key}));
    this.config=defaultExecutorConfig(input);validateExecutorConfig(this.config);
    this.config.routes=this.config.routes.map(route=>({...route}));
    if(this.config.routes.length)this.config.rateLimits.routeIpLimits=Object.fromEntries(this.config.routes.map(route=>[route.id,route.perIpPerMinute]));
    this.transport=transport;this.rateLimiter=new RateLimiter(this.config.rateLimits);
    this.#semaphore=new Semaphore(this.config.maxInFlight);this.#scheduler=deps.scheduler??defaultScheduler;this.#onRouteUsage=deps.onRouteUsage;
    this.#random=deps.random??Math.random;this.#cache=deps.cache;this.#cacheDefaultTtlMs=deps.cacheDefaultTtlMs??30_000;
  }
  static withDefaultTransport(apiKeys:Iterable<string>,input:ExecutorConfigInput={},deps:ExecutorDependencies={}):RequestExecutor<FetchTransport> {
    const config=defaultExecutorConfig(input);
    const transport=config.routes.length?FetchTransport.withRoutes(config.timeoutMs,config.userAgent,config.routes):new FetchTransport({timeoutMs:config.timeoutMs,userAgent:config.userAgent,...(config.proxyUrl?{proxyUrl:config.proxyUrl}:{})});
    return new RequestExecutor(transport,apiKeys,config,deps);
  }
  /** @deprecated Use withDefaultTransport. */
  static with_default_transport=RequestExecutor.withDefaultTransport;
  get scheduler():Scheduler{return this.#scheduler;}

  /** PARITY_SPEC P2.5: per-key redacted id, state and remaining budget. */
  keyStates():KeyStateInfo[] {
    const now=this.#scheduler.now();
    return this.#keys.map(record=>{
      const access=this.config.keyAccess[record.key];
      const base={key:keyHint(record.key)!,remaining:this.rateLimiter.remaining(record.key,now),...(access?{access}:{})};
      const disabled=this.#disabled(record,now);
      if(disabled)return {...base,state:"disabled",reason:disabled.reason,...(disabled.code!==undefined?{code:disabled.code}:{}),...(Number.isFinite(disabled.until)?{until:disabled.until}:{})};
      if((record.rateLimitedUntil??0)>now)return {...base,state:"rate_limited",until:record.rateLimitedUntil!};
      return {...base,state:"healthy"};
    });
  }
  /** Look up the state of one configured key (by full key). */
  keyState(key:string):KeyStateInfo|undefined { const index=this.#keys.findIndex(record=>record.key===key); return index<0?undefined:this.keyStates()[index]; }
  #disabled(record:KeyRecord,now:number):KeyRecord["disabled"] {
    if(record.disabled&&record.disabled.until<=now)record.disabled=undefined;
    return record.disabled;
  }
  /** Re-enable every disabled key (for example after fixing a paused key). */
  resetKeyStates():void { for(const record of this.#keys){record.disabled=undefined;record.rateLimitedUntil=undefined;} this.#routeBlockedUntil.clear(); }

  /**
   * PARITY_SPEC P3.2/P6.2: call `key/info` for every key, group keys of the same Torn user into one rate budget and record
   * each key's access level. Runs automatically before the first request when `detectKeyOwners` is enabled.
   */
  async detectKeyOwners(options:ExecutionOptions={}):Promise<void> {
    const owners=new Map<string,string[]>();
    for(const record of this.#keys){
      try{
        const report=await this.executePlanWithOptions({resource:"key",requests:[{resource:"key",path:"/key/info",method:"GET",query:{},selections:["info"],strategy:"direct-endpoint",fallbackSplit:[],apiVersion:"v2",operation:"getKeyInfo"}]},{...options,apiKey:record.key,noCache:true});
        const info=isJsonObject(report.mergedJson)&&isJsonObject(report.mergedJson.info)?report.mergedJson.info:undefined;
        const user=info&&isJsonObject(info.user)?info.user.id:undefined;
        const type=info&&isJsonObject(info.access)?info.access.type:undefined;
        const level=({"Public Only":"public","Minimal Access":"minimal","Limited Access":"limited","Full Access":"full","Custom":"custom"} as Record<string,AccessLevel>)[String(type)];
        if(level)this.config.keyAccess[record.key]=level;
        if(user!==undefined&&user!==null){const id=String(user);owners.set(id,[...owners.get(id)??[],record.key]);}
      }catch(error){if(options.signal?.aborted)throw error;/* the key's own failure is handled by its state; keep going */}
    }
    for(const [owner,keys] of owners)if(keys.length>1)this.rateLimiter.setKeyGroup(keys,`owner:${owner}`);
  }

  planAndExecute(planner:RequestPlanner,request:PlanRequestData):Promise<ExecutionReport>{return this.planAndExecuteWithOptions(planner,request,{});}
  planAndExecuteWithOptions(planner:RequestPlanner,request:PlanRequestData,options:ExecutionOptions={}):Promise<ExecutionReport>{return this.executePlanWithOptions(planner.plan(request),options);}
  planAndExecuteTextWithOptions(planner:RequestPlanner,request:PlanRequestData,options:ExecutionOptions={}):Promise<TextExecutionReport>{return this.executePlanTextWithOptions(planner.plan(request),options);}
  executePlan(plan:RequestPlan):Promise<ExecutionReport>{return this.executePlanWithOptions(plan,{});}
  async executePlanWithOptions(plan:RequestPlan,options:ExecutionOptions={}):Promise<ExecutionReport> {
    return this.#cancellable(options,async()=>{
      await this.#ensureDetected(options);
      let mergedJson:JsonValue={};const calls:ExecutedCall[]=[];
      for(const request of plan.requests) {
        options.signal?.throwIfAborted();
        try {
          const single=await this.#executeJson(request,options,false);mergedJson=mergeJson(mergedJson,single.value);calls.push(single.call);
        } catch(error) {
          if(options.signal?.aborted)throw error;
          // PARITY_SPEC P4.3: codes 22/23 re-plan the request once on the other API version.
          const rerouted=runtimeV1Fallback(request,error);
          if(rerouted){const single=await this.#executeJson(rerouted,options,true);mergedJson=mergeJson(mergedJson,single.value);calls.push(single.call);continue;}
          if(!request.fallbackSplit.length||!isSelectionCombinationError(error))throw error;
          for(const split of request.fallbackSplit){const single=await this.#executeJson(split,options,true);mergedJson=mergeJson(mergedJson,single.value);calls.push(single.call);}
        }
      }
      const report={mergedJson,calls};
      Object.defineProperties(report,{
        merged_json:{get:()=>report.mergedJson},
        deserialize:{value:<R>(decoder?:Decoder<R>):R=>{const cloned=structuredClone(report.mergedJson);return decoder?decoder(cloned):cloned as R;}},
      });
      return report as ExecutionReport;
    });
  }
  async executePlanTextWithOptions(plan:RequestPlan,options:ExecutionOptions={}):Promise<TextExecutionReport> {
    if(plan.requests.length!==1)throw new ApiError(`text execution requires exactly one planned request, got ${plan.requests.length}`,{path:plan.requests[0]?.path??"",status:0});
    return this.#cancellable(options,async()=>{
      await this.#ensureDetected(options);
      const target=plan.requests[0]!;
      const {response,key,routeId}=await this.#attempts(target,options,true);
      return {body:response.body,calls:[makeCall(target,key,routeId,response.status,false)]};
    });
  }
  async #cancellable<R>(options:ExecutionOptions,run:()=>Promise<R>):Promise<R> {
    try{return await run();}
    catch(error){
      if(options.signal?.aborted&&!(error instanceof CancelledError))throw new CancelledError(options.signal.reason);
      throw error;
    }
  }
  async #ensureDetected(options:ExecutionOptions):Promise<void> {
    if(!this.config.detectKeyOwners||options.apiKey!==undefined)return;
    this.#detecting??=this.detectKeyOwners({...(options.signal?{signal:options.signal}:{})});
    await this.#detecting;
  }
  async #executeJson(target:Target,options:ExecutionOptions,fallback:boolean):Promise<Single> {
    const cacheKey=this.#cache&&!options.noCache?cacheKeyFor(target,options.apiKey??(this.#keys.length===1?this.#keys[0]!.key:this.#keys.map(k=>k.key).join(","))):undefined;
    if(cacheKey){
      const hit=await this.#cache!.get(cacheKey);
      if(hit&&hit.expiresAt>this.#scheduler.now()){
        const call=makeCall(target,options.apiKey??this.#keys[0]!.key,options.routeId??DEFAULT_ROUTE_ID,200,fallback);call.cached=true;
        return {value:structuredClone(hit.value),call};
      }
    }
    const {response,key,routeId,value}=await this.#attempts(target,options,false);
    if(cacheKey){const ttl=target.cacheTtlMs??this.#cacheDefaultTtlMs;if(ttl>0)await this.#cache!.set(cacheKey,{value:structuredClone(value!),expiresAt:this.#scheduler.now()+ttl},ttl);}
    return {value:value!,call:makeCall(target,key,routeId,response.status,fallback)};
  }
  #event(target:Target,key:string,routeId:string,attempt:number,extra:Partial<RequestEvent>={}):RequestEvent {
    const base=target.apiVersion==="v2"?this.config.baseUrlV2:this.config.baseUrlV1;
    let url:string;try{url=buildUrl(base,target.path,target.query).toString();}catch{url=target.path;}
    return {operation:describe(target),method:target.method,apiVersion:target.apiVersion,url,attempt,keyHint:keyHint(key)!,routeId,...extra};
  }
  #hook<K extends keyof ClientHooks>(name:K,event:Parameters<NonNullable<ClientHooks[K]>>[0]):void {
    const hook=this.config.hooks?.[name] as ((event:unknown)=>void)|undefined;
    if(!hook)return;
    try{hook(event);}catch{/* hooks never break requests */}
  }
  #backoff(retry:number):number {
    const exponential=Math.min(this.config.retryMaxDelayMs,this.config.networkRetryBackoffMs*2**Math.max(0,retry-1));
    return this.config.jitter==="none"?exponential:Math.floor(this.#random()*exponential);
  }
  #classify(error:ApiError):TornErrorAction {
    const transientStatus=defaultRetryPolicy.httpRetryStatuses.includes(error.status);
    if(error instanceof HttpError||error.code===undefined)return transientStatus?"retry_backoff":"fail";
    const action=tornErrorCodeInfo(error.code)?.action??"fail";
    return action==="fail"&&transientStatus?"retry_backoff":action;
  }
  async #attempts(target:Target,options:ExecutionOptions,text:boolean):Promise<Attempt> {
    const count=options.maxAttempts??this.config.maxAttempts;
    if(!Number.isSafeInteger(count)||count<0)throw new ExecutorError("maxAttempts must be a non-negative safe integer");
    if(options.requestTimeoutMs!==undefined&&(!Number.isSafeInteger(options.requestTimeoutMs)||options.requestTimeoutMs<0))throw new ExecutorError("requestTimeoutMs must be a non-negative safe integer");
    this.#checkAccess(target,options);
    const maxAttempts=Math.max(1,count),requestedRoute=options.routeId??this.config.routes[0]?.id??DEFAULT_ROUTE_ID;
    const skipKeys=new Set<string>();
    let sends=0,retries=0,last:Error|undefined;
    while(true) {
      options.signal?.throwIfAborted();
      const {key,routeId,response:result,started}=await this.#send(target,options,requestedRoute,skipKeys,last);
      sends++;
      const now=this.#scheduler.now();
      const retryOrThrow=async(error:Error,delayMs:number,reason:string,code?:number)=>{
        last=error;
        if(sends>=maxAttempts){this.#hook("onError",{...this.#event(target,key,routeId,sends),error});throw error;}
        this.#hook("onRetry",{...this.#event(target,key,routeId,sends),delayMs,reason,...(code!==undefined?{code}:{})});
        if(delayMs>0)await this.#scheduler.sleep(delayMs,options.signal);
      };
      if(result instanceof TransportError) {await retryOrThrow(result,this.#backoff(++retries),"network");continue;}
      const response=result;
      this.#hook("onResponse",this.#event(target,key,routeId,sends,{status:response.status,durationMs:now-started}));
      let value:JsonValue|undefined,error:ApiError|undefined;
      if(text) {
        if(response.status>=400){
          let json:JsonValue|undefined;try{json=parseLosslessJson(response.body);}catch{/* non-JSON error body */}
          error=(json!==undefined?parseApiError(target,response,json,key,routeId):undefined)??httpStatusError(target,response,key,routeId);
        }
      } else {
        try{value=parseLosslessJson(response.body);}
        catch{
          if(response.status>=400)error=httpStatusError(target,response,key,routeId);
          else throw new DecodeError(`failed to parse JSON response for path '${target.path}' (status ${response.status})`,{operation:describe(target),jsonPath:"$",expected:"JSON document",excerpt:sanitizeErrorMessage(Array.from(response.body).slice(0,120).join(""))});
        }
        if(value!==undefined)error=parseApiError(target,response,value,key,routeId);
      }
      if(!error)return {response,key,routeId,...(value!==undefined?{value}:{})};
      const action=this.#classify(error),record=this.#keys.find(r=>r.key===key);
      switch(action){
        case "retry_backoff":{
          const after=retryAfterMs(response,now);
          await retryOrThrow(error,after!==undefined?Math.min(after,this.config.retryAfterCapMs):this.#backoff(++retries),`code ${error.code??`HTTP ${error.status}`}`,error.code);
          continue;
        }
        case "rotate_key":{
          // PARITY_SPEC P2.4: immediate retry with the next healthy key; no backoff.
          const policy=error.info?.disableKey??"none";
          if(record&&policy!=="none")record.disabled={reason:error.info?.name??`code ${error.code}`,...(error.code!==undefined?{code:error.code}:{}),until:policy==="until_utc_midnight"?nextUtcMidnight(now):Number.POSITIVE_INFINITY};
          else skipKeys.add(key);
          if(options.apiKey!==undefined||!this.#usableKeys(skipKeys,now).length){
            this.#hook("onError",{...this.#event(target,key,routeId,sends),error});
            if(options.apiKey===undefined&&policy!=="none")throw new NoUsableKeysError(error);
            throw error;
          }
          await retryOrThrow(error,0,`rotate key (code ${error.code})`,error.code);
          continue;
        }
        case "wait_rate_window":{
          // PARITY_SPEC P3.3: the key waits for its window; another key with budget is used immediately.
          if(record)record.rateLimitedUntil=Math.max(record.rateLimitedUntil??0,this.rateLimiter.rateLimitedUntil(key,now));
          await retryOrThrow(error,0,"rate limited (code 5)",error.code);
          continue;
        }
        case "rotate_route":{
          // PARITY_SPEC P3.4: never retry an IP-blocked route; move to another configured route if there is one.
          this.#routeBlockedUntil.set(routeId,now+this.rateLimiter.windowMs);
          if(!this.#routeCandidates(requestedRoute,now).length){this.#hook("onError",{...this.#event(target,key,routeId,sends),error});throw error;}
          await retryOrThrow(error,0,"route blocked (code 8)",error.code);
          continue;
        }
        default:
          this.#hook("onError",{...this.#event(target,key,routeId,sends),error});
          throw error;
      }
    }
  }
  #checkAccess(target:Target,options:ExecutionOptions):void {
    if(!this.config.checkAccess||!target.access)return;
    const keys=options.apiKey!==undefined?[options.apiKey]:this.#keys.map(r=>r.key);
    const levels=keys.map(key=>this.config.keyAccess[key]);
    // Unknown levels never block; only fail when every key's level is known and insufficient.
    if(levels.some(level=>level===undefined||accessLevelSatisfies(level,target.access!)))return;
    const best=levels.reduce((a,b)=>accessLevelSatisfies(a!,b!)?a:b)!;
    throw new AccessLevelError(describe(target),target.access,best);
  }
  #usableKeys(skip:Set<string>,now:number):KeyRecord[] { return this.#keys.filter(record=>!skip.has(record.key)&&!this.#disabled(record,now)); }
  #routeCandidates(requestedRouteId:string,now:number):string[] {
    return this.routeCandidates(requestedRouteId).filter(route=>(this.#routeBlockedUntil.get(route)??0)<=now);
  }
  async #send(target:Target,options:ExecutionOptions,requestedRoute:string,skipKeys:Set<string>,last:Error|undefined):Promise<{key:string;routeId:string;started:number;response:TransportResponse|TransportError}> {
    while(true){
      options.signal?.throwIfAborted();
      const release=await this.#semaphore.acquire(options.signal),now=this.#scheduler.now();
      const slot=this.#acquireSlot(requestedRoute,now,skipKeys,options.apiKey,target);
      if("error" in slot){release();throw slot.error??new NoUsableKeysError(last instanceof ApiError?last:undefined);}
      if("waitMs" in slot){release();this.#record(requestedRoute,"wait",now);await this.#scheduler.sleep(slot.waitMs,options.signal);continue;}
      const {key,routeId}=slot;this.#record(routeId,"call",now);
      this.#hook("onRequest",this.#event(target,key,routeId,0));
      try {
        const request={baseUrl:target.apiVersion==="v2"?this.config.baseUrlV2:this.config.baseUrlV1,path:target.path,method:target.method,query:{...target.query},apiKey:key,apiVersion:target.apiVersion,timeoutMs:options.requestTimeoutMs,routeId,signal:options.signal};
        const safe=()=>({...request,apiKey:keyHint(key)});
        Object.defineProperty(request,"toJSON",{value:safe});
        Object.defineProperty(request,INSPECT,{value:safe});
        const response=await this.transport.execute(request);
        return {key,routeId,started:now,response};
      } catch(error) {
        if(options.signal?.aborted)throw options.signal.reason;
        return {key,routeId,started:now,response:error instanceof TransportError?error:new TransportError(sanitizeErrorMessage(error instanceof Error?error.message:String(error)))};
      } finally {release();}
    }
  }
  /** Pick the next healthy key with budget (round-robin), or how long to wait, or why nothing can be sent. */
  #acquireSlot(requestedRoute:string,now:number,skipKeys:Set<string>,override:string|undefined,target:Target):{key:string;routeId:string}|{waitMs:number}|{error:Error|null} {
    const routes=this.#routeCandidates(requestedRoute,now);
    if(!routes.length)return {error:new ExecutorError("every egress route is IP-blocked (Torn code 8); retry later or configure another route",{kind:"RoutesBlocked"})};
    let candidates:KeyRecord[];
    if(override!==undefined)candidates=[this.#keys.find(r=>r.key===override)??{key:override}];
    else {
      candidates=this.#usableKeys(skipKeys,now);
      if(this.config.checkAccess&&target.access){
        const allowed=candidates.filter(r=>{const level=this.config.keyAccess[r.key];return level===undefined||accessLevelSatisfies(level,target.access!);});
        if(allowed.length)candidates=allowed;
      }
      if(!candidates.length)return {error:null};
    }
    let wait=Number.POSITIVE_INFINITY;
    for(const routeId of routes){
      for(let offset=0;offset<candidates.length;offset++){
        const index=(this.#cursor+offset)%candidates.length,record=candidates[index]!;
        const limited=(record.rateLimitedUntil??0)-now;
        if(limited>0){wait=Math.min(wait,limited);continue;}
        const acquired=this.rateLimiter.tryAcquire(record.key,routeId,now);
        if(acquired.acquired){if(override===undefined)this.#cursor=(this.#keys.indexOf(record)+1)%this.#keys.length;return {key:record.key,routeId};}
        wait=Math.min(wait,acquired.waitMs);
      }
    }
    return {waitMs:Number.isFinite(wait)?Math.max(1,wait):this.rateLimiter.windowMs};
  }
  routeCandidates(requestedRouteId:string):string[] {
    if(requestedRouteId===DEFAULT_ROUTE_ID||!this.config.routes.some(route=>route.id===requestedRouteId))return [requestedRouteId];
    return [...new Set([requestedRouteId,...this.config.routes.map(route=>route.id),DEFAULT_ROUTE_ID])];
  }
  /** @deprecated Seconds-based 2.x helper; the executor acquires slots internally. */
  tryAcquireKeySlotAt(requestedRouteId:string,seconds:number):{key:string;routeId:string}|undefined {
    const slot=this.#acquireSlot(requestedRouteId,seconds*1000,new Set(),undefined,{resource:"",path:"",method:"GET",query:{},selections:[],strategy:"generic-single",apiVersion:"v2"});
    return "key" in slot?slot:undefined;
  }
  #record(route:string,kind:"call"|"wait",nowMs:number):void {
    const minute=Math.floor(nowMs/60_000);
    if(this.#metricsMinute!==minute){this.flushMetrics();this.#metricsMinute=minute;this.#routeCalls.clear();this.#routeWaits.clear();}
    const counts=kind==="call"?this.#routeCalls:this.#routeWaits;counts.set(route,(counts.get(route)??0)+1);
  }
  flushMetrics():void {
    if(this.#metricsMinute===undefined)return;
    for(const [routeId,calls] of this.#routeCalls)this.#onRouteUsage?.({minuteIndex:this.#metricsMinute,routeId,calls,waits:this.#routeWaits.get(routeId)??0,limit:this.rateLimiter.routeLimit(routeId)});
  }
  /** @deprecated Use planAndExecute. */
  plan_and_execute=this.planAndExecute.bind(this);
  /** @deprecated Use planAndExecuteWithOptions. */
  plan_and_execute_with_options=this.planAndExecuteWithOptions.bind(this);
  /** @deprecated Use planAndExecuteTextWithOptions. */
  plan_and_execute_text_with_options=this.planAndExecuteTextWithOptions.bind(this);
  /** @deprecated Use executePlan. */
  execute_plan=this.executePlan.bind(this);
  /** @deprecated Use executePlanWithOptions. */
  execute_plan_with_options=this.executePlanWithOptions.bind(this);
  /** @deprecated Use executePlanTextWithOptions. */
  execute_plan_text_with_options=this.executePlanTextWithOptions.bind(this);
  toJSON():object{return {apiKeyCount:this.#keys.length,keyStates:this.keyStates(),config:redactedConfig(this.config),rateLimiter:this.rateLimiter.toJSON()};}
  [INSPECT]():object{return this.toJSON();}
  toString():string{return `RequestExecutor(${this.#keys.length} key(s))`;}
}

/** Cache identity: request URL plus a non-reversible fingerprint of the key (responses can be key-owner specific). */
function cacheKeyFor(target:Target,keyMaterial:string):string {
  let hash=0xcbf29ce484222325n;
  for(const char of keyMaterial){hash^=BigInt(char.codePointAt(0)!);hash=(hash*0x100000001b3n)&0xffffffffffffffffn;}
  const query=Object.entries(target.query).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([k,v])=>`${k}=${v}`).join("&");
  return `${target.apiVersion} ${target.path}?${query} #${hash.toString(16)}`;
}
function makeCall(target:Target,key:string,routeId:string,status:number,fallback:boolean):ExecutedCall {
  const {fallbackSplit:_,access:_access,cacheTtlMs:_ttl,...base}=target as PlannedRequest;
  const call={...base,query:{...target.query},selections:[...target.selections],keyUsed:key,keyHint:keyHint(key)!,status,fallback,routeId};
  Object.defineProperty(call,"keyUsed",{value:key,enumerable:false});
  const safe=()=>({...call,keyHint:keyHint(key)});
  Object.defineProperty(call,"toJSON",{value:safe});Object.defineProperty(call,INSPECT,{value:safe});
  Object.defineProperties(call,{key_used:{get:()=>key},api_version:{get:()=>call.apiVersion},route_id:{get:()=>call.routeId}});
  return call as unknown as ExecutedCall;
}
function extractTornError(json:JsonValue):{code?:number;message:string}|undefined {
  if(!isJsonObject(json)||!isJsonObject(json.error)||typeof json.error.error!=="string"||!json.error.error.trim())return;
  if(json.error.code!==undefined&&json.error.code!==null&&(typeof json.error.code!=="number"||!Number.isInteger(json.error.code)))return;
  return {message:json.error.error.trim(),...(typeof json.error.code==="number"?{code:json.error.code}:{})};
}
function parseApiError(target:Target,response:TransportResponse,json:JsonValue,key:string,routeId:string):ApiError|undefined {
  const envelope=extractTornError(json);
  const common={path:target.path,status:response.status,keyUsed:key,operation:describe(target),routeId};
  if(response.status>=400)return envelope?new ApiError(envelope.message,{...common,code:envelope.code}):new HttpError("HTTP error response",common);
  if(isJsonObject(json)&&Object.keys(json).length===1&&Object.hasOwn(json,"error")&&envelope)return new ApiError(envelope.message,{...common,code:envelope.code});
}
function httpStatusError(target:Target,response:TransportResponse,key:string,routeId:string):ApiError {
  const text=response.body.trim(),snippet=Array.from(text).slice(0,160).join("");
  return new HttpError(text?`HTTP error response: ${sanitizeErrorMessage(snippet)}${Array.from(text).length>160?"...":""}`:"HTTP error response",{path:target.path,status:response.status,keyUsed:key,operation:describe(target),routeId});
}
/** @deprecated Use {@link isRateLimit} from the errors module; classification is by code 5 / HTTP 429 (PARITY_SPEC P4.1). */
export function isRateLimitError(error:unknown):boolean{return error instanceof ApiError&&(error.code===5||error.status===429);}
/**
 * Whether a combined request should be split into single selections: Torn code 4 ("wrong fields") on a combined request.
 * Classification is by code only (PARITY_SPEC P4.1).
 */
export function isSelectionCombinationError(error:unknown):boolean{return error instanceof ApiError&&!(error instanceof HttpError)&&error.code===4;}
/**
 * PARITY_SPEC P4.3: re-plan a request on the other API version after code 22 (only in v1) or 23 (only in v2).
 * Returns undefined when the error is not a version error or the resource has no route on the other version.
 */
export function runtimeV1Fallback(request:PlannedRequest|SplitRequest,error:unknown):PlannedRequest|undefined {
  if(!(error instanceof ApiError)||(error.code!==22&&error.code!==23))return;
  const selections=request.selections.length?request.selections:(request.query.selections?.split(",").filter(Boolean)??[]);
  if(error.code===22&&request.apiVersion==="v2"){
    const segment=request.path.split("/").filter(Boolean)[1];
    const id=request.query.id??(segment&&/^\d+$/.test(segment)?segment:undefined);
    const path=new V1Catalog().buildGenericPath(request.resource,id,true);if(!path||!selections.length)return;
    const query:Record<string,string>=Object.fromEntries(Object.entries(request.query).filter(([name])=>!V2_ONLY_PARAMETERS.has(name)));
    query.selections=selections.join(",");
    const {access:_a,operation:_o,cacheTtlMs:_c,...rest}=request as PlannedRequest;
    return {...rest,path,query,selections,apiVersion:"v1",strategy:"version-fallback",fallbackSplit:[]};
  }
  if(error.code===23&&request.apiVersion==="v1"){
    const segments=request.path.split("/").filter(Boolean);const id=segments[1];
    const query:Record<string,string>={...request.query,selections:selections.join(",")};
    if(id)query.id=id;
    const {access:_a,operation:_o,cacheTtlMs:_c,...rest}=request as PlannedRequest;
    return {...rest,path:`/${request.resource}`,query,selections,apiVersion:"v2",strategy:"version-fallback",fallbackSplit:[]};
  }
}
/** v2 query parameters that Torn's v1 API does not understand; everything else (including `comment`) is forwarded on a reroute (P1.5). */
const V2_ONLY_PARAMETERS=new Set(["id","legacy","cursor"]);
/** Object members merge recursively; later arrays/scalars replace earlier values. */
export function mergeJson(target:JsonValue,incoming:JsonValue):JsonValue {
  if(isJsonObject(target)&&isJsonObject(incoming)){
    for(const [key,value] of Object.entries(incoming)){
      const next=Object.hasOwn(target,key)?mergeJson(target[key]!,value):structuredClone(value);
      Object.defineProperty(target,key,{value:next,enumerable:true,configurable:true,writable:true});
    }
    return target;
  }
  return structuredClone(incoming);
}
