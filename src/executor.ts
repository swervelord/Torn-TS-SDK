import { ApiError, DecodeError, ExecutorError, isJsonObject, TransportError } from "./errors.ts";
import { defaultExecutorConfig, DEFAULT_ROUTE_ID, redactedConfig, validateExecutorConfig, type ExecutorConfigInput } from "./config.ts";
import { RateLimiter } from "./rate-limit.ts";
import { BunTransport, sanitizeErrorMessage, type HttpTransport, type TransportResponse } from "./transport.ts";
import { V1Catalog, isAllowedV1Filter } from "./v1-catalog.ts";
import { parseLosslessJson } from "./json.ts";
import type { RequestPlanner } from "./planner.ts";
import type { Decoder, ExecutedCall, ExecutionOptions, ExecutionReport, ExecutorConfig, JsonValue, PlannedRequest, PlanRequestData, RequestPlan, Scheduler, SplitRequest, TextExecutionReport } from "./types.ts";

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
export interface ExecutorDependencies {scheduler?:Scheduler;onRouteUsage?:(usage:RouteUsage)=>void}
type Target = SplitRequest;
type Single = {value:JsonValue;call:ExecutedCall};

/** Sequential plan execution; independent concurrent calls share the same semaphore and quota state. */
export class RequestExecutor<T extends HttpTransport = BunTransport> {
  readonly transport:T;
  readonly config:ExecutorConfig;
  readonly rateLimiter:RateLimiter;
  #apiKeys:string[];
  #cursor=0;
  #semaphore:Semaphore;
  #scheduler:Scheduler;
  #onRouteUsage?:ExecutorDependencies["onRouteUsage"];
  #metricsMinute?:number;
  #routeCalls=new Map<string,number>();
  #routeWaits=new Map<string,number>();

  constructor(transport:T,apiKeys:Iterable<string>,input:ExecutorConfigInput={},deps:ExecutorDependencies={}) {
    this.#apiKeys=[...apiKeys];
    if(!this.#apiKeys.length)throw new ExecutorError("no API keys configured",{kind:"NoApiKeys"});
    this.config=defaultExecutorConfig(input);validateExecutorConfig(this.config);
    this.config.routes=this.config.routes.map(route=>({...route}));
    if(this.config.routes.length)this.config.rateLimits.routeIpLimits=Object.fromEntries(this.config.routes.map(route=>[route.id,route.perIpPerMinute]));
    this.transport=transport;this.rateLimiter=new RateLimiter(this.config.rateLimits);
    this.#semaphore=new Semaphore(this.config.maxInFlight);this.#scheduler=deps.scheduler??defaultScheduler;this.#onRouteUsage=deps.onRouteUsage;
  }
  static withDefaultTransport(apiKeys:Iterable<string>,input:ExecutorConfigInput={},deps:ExecutorDependencies={}):RequestExecutor<BunTransport> {
    const config=defaultExecutorConfig(input);
    const transport=config.routes.length?BunTransport.withRoutes(config.timeoutMs,config.userAgent,config.routes):new BunTransport(config.timeoutMs,config.userAgent,config.proxyUrl);
    return new RequestExecutor(transport,apiKeys,config,deps);
  }
  static with_default_transport=RequestExecutor.withDefaultTransport;
  planAndExecute(planner:RequestPlanner,request:PlanRequestData):Promise<ExecutionReport>{return this.planAndExecuteWithOptions(planner,request,{});}
  planAndExecuteWithOptions(planner:RequestPlanner,request:PlanRequestData,options:ExecutionOptions={}):Promise<ExecutionReport>{return this.executePlanWithOptions(planner.plan(request),options);}
  planAndExecuteTextWithOptions(planner:RequestPlanner,request:PlanRequestData,options:ExecutionOptions={}):Promise<TextExecutionReport>{return this.executePlanTextWithOptions(planner.plan(request),options);}
  executePlan(plan:RequestPlan):Promise<ExecutionReport>{return this.executePlanWithOptions(plan,{});}
  async executePlanWithOptions(plan:RequestPlan,options:ExecutionOptions={}):Promise<ExecutionReport> {
    let mergedJson:JsonValue={};const calls:ExecutedCall[]=[];
    for(const request of plan.requests) {
      options.signal?.throwIfAborted();
      try {
        const single=await this.#executeJson(request,options,false);mergedJson=mergeJson(mergedJson,single.value);calls.push(single.call);
      } catch(error) {
        if(options.signal?.aborted)throw options.signal.reason;
        const legacy=runtimeV1Fallback(request,error);
        if(legacy){const single=await this.#executeJson(legacy,options,true);mergedJson=mergeJson(mergedJson,single.value);calls.push(single.call);continue;}
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
  }
  async executePlanTextWithOptions(plan:RequestPlan,options:ExecutionOptions={}):Promise<TextExecutionReport> {
    if(plan.requests.length!==1)throw new ApiError(`text execution requires exactly one planned request, got ${plan.requests.length}`,{path:plan.requests[0]?.path??"",status:0});
    const target=plan.requests[0]!;
    const {response,key,routeId}=await this.#attempts(target,options,true);
    return {body:response.body,calls:[makeCall(target,key,routeId,response.status,false)]};
  }
  async #executeJson(target:Target,options:ExecutionOptions,fallback:boolean):Promise<Single> {
    const {response,key,routeId,value}=await this.#attempts(target,options,false);
    return {value:value!,call:makeCall(target,key,routeId,response.status,fallback)};
  }
  async #attempts(target:Target,options:ExecutionOptions,text:boolean):Promise<{response:TransportResponse;key:string;routeId:string;value?:JsonValue}> {
    const count=options.maxAttempts??this.config.maxAttempts;
    if(!Number.isSafeInteger(count)||count<0)throw new ExecutorError("maxAttempts must be a non-negative safe integer");
    if(options.requestTimeoutMs!==undefined&&(!Number.isSafeInteger(options.requestTimeoutMs)||options.requestTimeoutMs<0))throw new ExecutorError("requestTimeoutMs must be a non-negative safe integer");
    const maxAttempts=Math.max(1,count),requestedRoute=options.routeId??this.config.routes[0]?.id??DEFAULT_ROUTE_ID;
    for(let attempt=0;attempt<maxAttempts;attempt++) {
      options.signal?.throwIfAborted();
      const {key,routeId,response:result}=await this.#send(target,options,requestedRoute);
      if(result instanceof TransportError) {
        if(attempt+1<maxAttempts){await this.#scheduler.sleep(this.config.networkRetryBackoffMs*(attempt+1),options.signal);continue;}
        throw result;
      }
      const response=result;let value:JsonValue|undefined,error:ApiError|undefined;
      if(text) {
        if(response.status>=400){
          let json:JsonValue|undefined;try{json=parseLosslessJson(response.body);}catch{/* non-JSON error body */}
          error=(json!==undefined?parseApiError(target.path,response,json,key):undefined)??httpStatusError(target.path,response,key);
        }
      } else {
        try{value=parseLosslessJson(response.body);}
        catch{
          if(response.status>=400)error=httpStatusError(target.path,response,key);
          else throw new DecodeError(`failed to parse JSON response for path '${target.path}' (status ${response.status})`,{path:target.path,status:response.status});
        }
        if(value!==undefined)error=parseApiError(target.path,response,value,key);
      }
      if(!error)return {response,key,routeId,...(value!==undefined?{value}:{})};
      if(isRateLimitError(error)) {
        const seconds=this.#seconds();this.rateLimiter.markKeyExhaustedAtUnixSeconds(key,seconds);
        if(error.message.toLowerCase().includes("ip"))this.rateLimiter.markRouteExhaustedAtUnixSeconds(routeId,seconds);
        if(attempt+1<maxAttempts){await this.#scheduler.sleep(RateLimiter.waitDurationUntilNextMinute(seconds),options.signal);continue;}
      }else if([500,502,503,504].includes(error.status)&&attempt+1<maxAttempts){await this.#scheduler.sleep(this.config.networkRetryBackoffMs*(attempt+1),options.signal);continue;}
      throw error;
    }
    throw new ExecutorError("request attempts exhausted");
  }
  async #send(target:Target,options:ExecutionOptions,requestedRoute:string):Promise<{key:string;routeId:string;response:TransportResponse|TransportError}> {
    while(true){
      options.signal?.throwIfAborted();
      const release=await this.#semaphore.acquire(options.signal),now=this.#seconds();
      const slot=this.tryAcquireKeySlotAt(requestedRoute,now);
      if(!slot){release();this.#record(requestedRoute,"wait",now);await this.#scheduler.sleep(RateLimiter.waitDurationUntilNextMinute(now),options.signal);continue;}
      const {key,routeId}=slot;this.#record(routeId,"call",now);
      try {
        const request={baseUrl:target.apiVersion==="v2"?this.config.baseUrlV2:this.config.baseUrlV1,path:target.path,method:target.method,query:{...target.query},apiKey:key,timeoutMs:options.requestTimeoutMs,routeId,signal:options.signal};
        const safe=()=>({...request,apiKey:"[REDACTED]"});
        Object.defineProperty(request,"toJSON",{value:safe});
        Object.defineProperty(request,Symbol.for("nodejs.util.inspect.custom"),{value:safe});
        const response=await this.transport.execute(request);
        return {key,routeId,response};
      } catch(error) {
        if(options.signal?.aborted)throw options.signal.reason;
        return {key,routeId,response:error instanceof TransportError?error:new TransportError(sanitizeErrorMessage(error instanceof Error?error.message:String(error)))};
      } finally {release();}
    }
  }
  routeCandidates(requestedRouteId:string):string[] {
    if(requestedRouteId===DEFAULT_ROUTE_ID||!this.config.routes.some(route=>route.id===requestedRouteId))return [requestedRouteId];
    return [...new Set([requestedRouteId,...this.config.routes.map(route=>route.id),DEFAULT_ROUTE_ID])];
  }
  tryAcquireKeySlotAt(requestedRouteId:string,seconds:number):{key:string;routeId:string}|undefined {
    for(const routeId of this.routeCandidates(requestedRouteId)){
      for(let offset=0;offset<this.#apiKeys.length;offset++){
        const index=(this.#cursor+offset)%this.#apiKeys.length,key=this.#apiKeys[index]!;
        if(this.rateLimiter.tryAcquireForRouteAtUnixSeconds(key,routeId,seconds).acquired){this.#cursor=(index+1)%this.#apiKeys.length;return {key,routeId};}
      }
    }
    return undefined;
  }
  #seconds():number{return Math.floor(this.#scheduler.now()/1000);}
  #record(route:string,kind:"call"|"wait",seconds:number):void {
    const minute=Math.floor(seconds/60);
    if(this.#metricsMinute!==minute){this.flushMetrics();this.#metricsMinute=minute;this.#routeCalls.clear();this.#routeWaits.clear();}
    const counts=kind==="call"?this.#routeCalls:this.#routeWaits;counts.set(route,(counts.get(route)??0)+1);
  }
  flushMetrics():void {
    if(this.#metricsMinute===undefined)return;
    for(const [routeId,calls] of this.#routeCalls)this.#onRouteUsage?.({minuteIndex:this.#metricsMinute,routeId,calls,waits:this.#routeWaits.get(routeId)??0,limit:this.rateLimiter.routeLimit(routeId)});
  }
  plan_and_execute=this.planAndExecute.bind(this);
  plan_and_execute_with_options=this.planAndExecuteWithOptions.bind(this);
  plan_and_execute_text_with_options=this.planAndExecuteTextWithOptions.bind(this);
  execute_plan=this.executePlan.bind(this);
  execute_plan_with_options=this.executePlanWithOptions.bind(this);
  execute_plan_text_with_options=this.executePlanTextWithOptions.bind(this);
  toJSON():object{return {apiKeyCount:this.#apiKeys.length,config:redactedConfig(this.config),rateLimiter:this.rateLimiter.toJSON()};}
  [Symbol.for("nodejs.util.inspect.custom")]():object{return this.toJSON();}
}

function makeCall(target:Target,key:string,routeId:string,status:number,fallback:boolean):ExecutedCall {
  const {fallbackSplit:_,...base}=target as PlannedRequest;
  const call={...base,query:{...target.query},selections:[...target.selections],keyUsed:key,status,fallback,routeId};
  const safe=()=>({...call,keyUsed:"[REDACTED]"});
  Object.defineProperty(call,"toJSON",{value:safe});Object.defineProperty(call,Symbol.for("nodejs.util.inspect.custom"),{value:safe});
  Object.defineProperties(call,{key_used:{get:()=>call.keyUsed},api_version:{get:()=>call.apiVersion},route_id:{get:()=>call.routeId}});
  return call as ExecutedCall;
}
function extractTornError(json:JsonValue):{code?:number;message:string}|undefined {
  if(!isJsonObject(json)||!isJsonObject(json.error)||typeof json.error.error!=="string"||!json.error.error.trim())return;
  if(json.error.code!==undefined&&json.error.code!==null&&(typeof json.error.code!=="number"||!Number.isInteger(json.error.code)))return;
  return {message:json.error.error.trim(),...(typeof json.error.code==="number"?{code:json.error.code}:{})};
}
function parseApiError(path:string,response:TransportResponse,json:JsonValue,key:string):ApiError|undefined {
  const envelope=extractTornError(json);
  if(response.status>=400)return new ApiError(envelope?.message??"HTTP error response",{path,status:response.status,code:envelope?.code,keyUsed:key});
  if(isJsonObject(json)&&Object.keys(json).length===1&&Object.hasOwn(json,"error")&&envelope)return new ApiError(envelope.message,{path,status:response.status,code:envelope.code,keyUsed:key});
}
function httpStatusError(path:string,response:TransportResponse,key:string):ApiError {
  const text=response.body.trim(),snippet=Array.from(text).slice(0,160).join("");
  return new ApiError(text?`HTTP error response: ${snippet}${Array.from(text).length>160?"...":""}`:"HTTP error response",{path,status:response.status,keyUsed:key});
}
export function isRateLimitError(error:unknown):boolean{return error instanceof ApiError&&(error.status===429||/rate limit|too many request|too many calls|request limit/i.test(error.message));}
export function isSelectionCombinationError(error:unknown):boolean{return error instanceof ApiError&&(/selection/i.test(error.message)&&/cannot/i.test(error.message)||/cannot be used together|standalone/i.test(error.message));}
export function runtimeV1Fallback(request:PlannedRequest,error:unknown):PlannedRequest|undefined {
  if(request.apiVersion!=="v2"||!(error instanceof ApiError))return;
  const message=error.message.toLowerCase();
  if(!(/not available in api v2|fallback to api v1|fall back to api v1/.test(message)||message.includes("api v1")&&message.includes("selection")))return;
  const path=new V1Catalog().buildGenericPath(request.resource,request.query.id);if(!path)return;
  const query=Object.fromEntries(Object.entries(request.query).filter(([name])=>name==="selections"||isAllowedV1Filter(name)));
  return {...request,path,query,apiVersion:"v1",strategy:"version-fallback",fallbackSplit:[]};
}
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
