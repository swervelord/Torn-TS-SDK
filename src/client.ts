import { RequestPlanner, PlanRequest, type PlannerOptions } from "./planner.ts";
import type { CapabilitiesDocument } from "./capabilities.ts";
import { RequestExecutor, type ExecutorDependencies, type KeyStateInfo } from "./executor.ts";
import { RuntimeEnvConfig, type ExecutorConfigInput } from "./config.ts";
import { FetchTransport, type HttpTransport } from "./transport.ts";
import { ValidationError, isJsonObject } from "./errors.ts";
import { decodeModel, operationPlan } from "./generated/runtime.ts";
import { operationDefinitions } from "./generated/operation-data.ts";
import type { KeyInfoResponse } from "./generated/models.ts";
import { pageItems, pageLink, requestFromLink, type Page, type PaginateOptions } from "./pagination.ts";
import type { ApiVersion, DataRequestOptions, Decoder, ExecutionOptions, ExecutionReport, JsonObject, JsonValue, PlannedRequest, PlanRequestData, RequestPlan, TextExecutionReport } from "./types.ts";

export type QueryValue = string | number | bigint | boolean | readonly (string | number | bigint)[];
export interface RawRequestOptions extends ExecutionOptions {
  /** `v2` (default) or `v1`. */
  apiVersion?: ApiVersion;
}
function encodeQuery(query: Record<string, QueryValue | undefined | null> = {}): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    out[name] = Array.isArray(value) ? value.map(String).join(",") : String(value);
  }
  return out;
}
const INSPECT = Symbol.for("nodejs.util.inspect.custom");

export class TornClient<T extends HttpTransport = FetchTransport> {
  constructor(readonly planner:RequestPlanner,readonly executor:RequestExecutor<T>){}
  static fromEnv(capabilitiesPath?:string,env?:Record<string,string|undefined>):TornClient<FetchTransport>|Promise<TornClient<FetchTransport>> {
    const runtime=RuntimeEnvConfig.fromEnv(env);
    return capabilitiesPath?TornClient.fromCapabilitiesFile(capabilitiesPath,runtime.apiKeys,runtime.executorConfig):TornClient.withApiKeys(runtime.apiKeys,runtime.executorConfig);
  }
  static withApiKeys(apiKeys:Iterable<string>,config:ExecutorConfigInput={},deps:ExecutorDependencies={},planner:PlannerOptions={}):TornClient<FetchTransport>{return new TornClient(new RequestPlanner(undefined,planner),RequestExecutor.withDefaultTransport(apiKeys,config,deps));}
  /** Use your own transport (for example the test kit's MockTransport, or a proxy-capable fetch). */
  static withTransport<X extends HttpTransport>(transport:X,apiKeys:Iterable<string>,config:ExecutorConfigInput={},deps:ExecutorDependencies={},planner:PlannerOptions={}):TornClient<X>{return new TornClient(new RequestPlanner(undefined,planner),new RequestExecutor(transport,apiKeys,config,deps));}
  static fromCapabilities(capabilities:CapabilitiesDocument,apiKeys:Iterable<string>,config:ExecutorConfigInput={}):TornClient<FetchTransport>{return new TornClient(new RequestPlanner(capabilities),RequestExecutor.withDefaultTransport(apiKeys,config));}
  static async fromCapabilitiesFile(path:string,apiKeys:Iterable<string>,config:ExecutorConfigInput={}):Promise<TornClient<FetchTransport>>{return new TornClient(await RequestPlanner.fromCapabilitiesFile(path),RequestExecutor.withDefaultTransport(apiKeys,config));}
  /** @deprecated Use fromEnv. */
  static from_env=TornClient.fromEnv;
  /** @deprecated Use fromCapabilities. */
  static from_capabilities=TornClient.fromCapabilities;
  /** @deprecated Use fromCapabilitiesFile. */
  static from_capabilities_file=TornClient.fromCapabilitiesFile;
  execute(request:PlanRequestData):Promise<ExecutionReport>{return this.executeWithOptions(request,{});}
  executeWithOptions(request:PlanRequestData,options:ExecutionOptions={}):Promise<ExecutionReport>{return this.executor.planAndExecuteWithOptions(this.planner,request,options);}
  executePlan(plan:RequestPlan,options:ExecutionOptions={}):Promise<ExecutionReport>{return this.executor.executePlanWithOptions(plan,options);}
  executePlanText(plan:RequestPlan,options:ExecutionOptions={}):Promise<TextExecutionReport>{return this.executor.executePlanTextWithOptions(plan,options);}
  getUserData(selections:Iterable<string>,options:DataRequestOptions={}):Promise<ExecutionReport>{return this.getResourceData("user",selections,options);}
  getResourceData(resource:string,selections:Iterable<string>,options:DataRequestOptions={}):Promise<ExecutionReport>{return this.executeWithOptions(buildPlanRequest(resource,selections,options),options.executionOptions);}
  getResourceText(resource:string,selections:Iterable<string>,options:DataRequestOptions={}):Promise<TextExecutionReport>{return this.executor.planAndExecuteTextWithOptions(this.planner,buildPlanRequest(resource,selections,options),options.executionOptions);}
  async getResourceDataTyped<R>(resource:string,selections:Iterable<string>,options:DataRequestOptions={},decoder?:Decoder<R>):Promise<R>{const report=await this.getResourceData(resource,selections,options);return decoder?decoder(report.mergedJson):report.mergedJson as R;}

  /**
   * PARITY_SPEC P8.2 raw escape hatch: GET any path (`/user/attacks`, `/v2/faction/wars`, or a v1 path with
   * `apiVersion: "v1"`) with any query and return the raw JSON. Keys are attached by the executor, never via `query`.
   */
  async get(path:string,query:Record<string,QueryValue|undefined|null>={},options:RawRequestOptions={}):Promise<JsonValue> {
    const {request,apiKey}=rawRequest(path,query,options.apiVersion);
    return (await this.executePlan({resource:request.resource,requests:[request]},apiKey?{...options,apiKey}:options)).mergedJson;
  }
  /** Raw GET decoded into any generated model by schema name (tolerant unless the client is `strict`). */
  async getTyped<R>(path:string,schemaName:string,query:Record<string,QueryValue|undefined|null>={},options:RawRequestOptions={}):Promise<R> {
    return decodeModel<R>(schemaName,await this.get(path,query,options),{mode:this.executor.config.validation,operation:`GET ${path}`});
  }
  /** PARITY_SPEC P6.2: typed `key/info` for the pool's next key (or `options.apiKey`). */
  async keyInfo(options:ExecutionOptions={}):Promise<KeyInfoResponse> {
    const plan=operationPlan("getKeyInfo",{},{mode:this.executor.config.validation});
    return decodeModel<KeyInfoResponse>("KeyInfoResponse",(await this.executePlan(plan,{...options,noCache:true})).mergedJson,{mode:this.executor.config.validation,operation:"getKeyInfo"});
  }
  /** Call `key/info` for every key: record access levels (P6.2) and group keys of the same Torn user (P3.2). */
  detectKeyAccess(options:ExecutionOptions={}):Promise<void>{return this.executor.detectKeyOwners(options);}
  /** PARITY_SPEC P2.5: redacted per-key state and remaining budget. */
  keyStates():KeyStateInfo[]{return this.executor.keyStates();}

  /**
   * PARITY_SPEC P7.1: iterate pages of any paginated v2 path by following `_metadata.links.next` (or `prev`).
   * Link URLs are validated against the API host and their `key` parameter is discarded.
   */
  async *paginate(path:string,query:Record<string,QueryValue|undefined|null>={},options:PaginateOptions={}):AsyncGenerator<Page<JsonObject>,void,undefined> {
    const {request,apiKey}=rawRequest(path,query,"v2");
    yield* this.#pages(request,apiKey?{...options,apiKey}:options,value=>{if(!isJsonObject(value))throw new ValidationError("paginated response is not an object");return value;});
  }
  /** Iterate the items of every page (`field` names the list; by default the page's only array member). */
  async *paginateItems(path:string,query:Record<string,QueryValue|undefined|null>={},options:PaginateOptions&{field?:string}={}):AsyncGenerator<JsonValue,void,undefined> {
    let count=0;
    for await(const page of this.paginate(path,query,options))for(const item of pageItems(page.data,options.field)){
      if(options.limit!==undefined&&count>=options.limit)return;
      count++;yield item;
    }
  }
  /** Typed pages of a generated operation (e.g. `getMyAttacks`); every page is decoded with the operation's model. */
  async *paginateOperation<R>(operationId:string,params:object={},options:PaginateOptions={}):AsyncGenerator<Page<R>,void,undefined> {
    const definition=operationDefinitions[operationId];if(!definition)throw new ValidationError(`Unknown operation '${operationId}'`);
    const first=operationPlan(operationId,params,{mode:this.executor.config.validation}).requests[0]!;
    yield* this.#pages(first,options,value=>decodeModel<R>(definition.response,value,{mode:this.executor.config.validation,operation:operationId}));
  }
  async *#pages<R>(first:PlannedRequest,options:PaginateOptions,decode:(value:JsonValue)=>R):AsyncGenerator<Page<R>,void,undefined> {
    const {maxPages,direction="next",limit:_limit,...execution}=options;
    let request:PlannedRequest|undefined=first;
    for(let index=0;request&&(maxPages===undefined||index<maxPages);index++){
      execution.signal?.throwIfAborted();
      const value=(await this.executePlan({resource:request.resource,requests:[request]},execution)).mergedJson;
      yield {index,data:decode(value),path:request.path,query:{...request.query}};
      const link=pageLink(value,direction);
      request=link?requestFromLink(link,this.executor.config.baseUrlV2,request):undefined;
    }
  }
  /** @deprecated Use executeWithOptions. */
  execute_with_options=this.executeWithOptions.bind(this);
  /** @deprecated Use getUserData. */
  get_user_data=this.getUserData.bind(this);
  /** @deprecated Use getResourceData. */
  get_resource_data=this.getResourceData.bind(this);
  /** @deprecated Use getResourceText. */
  get_resource_text=this.getResourceText.bind(this);
  /** @deprecated Use getResourceDataTyped. */
  get_resource_data_typed=this.getResourceDataTyped.bind(this);
  toJSON():object{return {executor:this.executor.toJSON(),routing:this.planner.routing};}
  [INSPECT]():object{return this.toJSON();}
  toString():string{return `TornClient(${this.executor.toString()})`;}
}
function resourceOf(path:string):string{return path.replace(/^\/(v2\/)?/,"").split(/[/?]/)[0]??"";}
function rawRequest(path:string,query:Record<string,QueryValue|undefined|null>,apiVersion:ApiVersion="v2"):{request:PlannedRequest;apiKey?:string} {
  if(!path.startsWith("/"))path=`/${path}`;
  if(apiVersion==="v2"&&path.startsWith("/v2/"))path=path.slice(3);
  const encoded=encodeQuery(query);
  // PARITY_SPEC P2.1: a `key` given in the query is moved to the request's key (Authorization header on v2).
  const apiKey=encoded.key;delete encoded.key;
  const resource=resourceOf(path);
  return {request:{resource,path,method:"GET",query:encoded,selections:encoded.selections?.split(",").filter(Boolean)??[],strategy:"direct-endpoint",fallbackSplit:[],apiVersion,operation:`GET ${path}`},...(apiKey?{apiKey}:{})};
}
export function buildPlanRequest(resource:string,selections:Iterable<string>,options:DataRequestOptions={}):PlanRequest {
  const request=new PlanRequest(resource,[...selections]);
  if(options.id!==undefined)request.withId(options.id);
  for(const [name,value] of Object.entries(options.filters??{}))request.withFilter(name,value);
  for(const [name,value] of Object.entries(options.pathArgs??{}))request.withPathArg(name,value);
  for(const selection of options.legacySelections??[])request.withLegacySelection(selection);
  return request;
}
