import { RequestPlanner, PlanRequest } from "./planner.ts";
import type { CapabilitiesDocument } from "./capabilities.ts";
import { RequestExecutor, type ExecutorDependencies } from "./executor.ts";
import { RuntimeEnvConfig, type ExecutorConfigInput } from "./config.ts";
import { BunTransport, type HttpTransport } from "./transport.ts";
import type { DataRequestOptions, Decoder, ExecutionOptions, ExecutionReport, PlanRequestData, RequestPlan, TextExecutionReport } from "./types.ts";

export class TornClient<T extends HttpTransport = BunTransport> {
  constructor(readonly planner:RequestPlanner,readonly executor:RequestExecutor<T>){}
  static fromEnv(capabilitiesPath?:string,env?:Record<string,string|undefined>):TornClient<BunTransport>|Promise<TornClient<BunTransport>> {
    const runtime=RuntimeEnvConfig.fromEnv(env);
    return capabilitiesPath?TornClient.fromCapabilitiesFile(capabilitiesPath,runtime.apiKeys,runtime.executorConfig):TornClient.withApiKeys(runtime.apiKeys,runtime.executorConfig);
  }
  static withApiKeys(apiKeys:Iterable<string>,config:ExecutorConfigInput={},deps:ExecutorDependencies={}):TornClient<BunTransport>{return new TornClient(new RequestPlanner(),RequestExecutor.withDefaultTransport(apiKeys,config,deps));}
  static fromCapabilities(capabilities:CapabilitiesDocument,apiKeys:Iterable<string>,config:ExecutorConfigInput={}):TornClient<BunTransport>{return new TornClient(new RequestPlanner(capabilities),RequestExecutor.withDefaultTransport(apiKeys,config));}
  static async fromCapabilitiesFile(path:string,apiKeys:Iterable<string>,config:ExecutorConfigInput={}):Promise<TornClient<BunTransport>>{return new TornClient(await RequestPlanner.fromCapabilitiesFile(path),RequestExecutor.withDefaultTransport(apiKeys,config));}
  static from_env=TornClient.fromEnv;
  static from_capabilities=TornClient.fromCapabilities;
  static from_capabilities_file=TornClient.fromCapabilitiesFile;
  execute(request:PlanRequestData):Promise<ExecutionReport>{return this.executeWithOptions(request,{});}
  executeWithOptions(request:PlanRequestData,options:ExecutionOptions={}):Promise<ExecutionReport>{return this.executor.planAndExecuteWithOptions(this.planner,request,options);}
  executePlan(plan:RequestPlan,options:ExecutionOptions={}):Promise<ExecutionReport>{return this.executor.executePlanWithOptions(plan,options);}
  executePlanText(plan:RequestPlan,options:ExecutionOptions={}):Promise<TextExecutionReport>{return this.executor.executePlanTextWithOptions(plan,options);}
  getUserData(selections:Iterable<string>,options:DataRequestOptions={}):Promise<ExecutionReport>{return this.getResourceData("user",selections,options);}
  getResourceData(resource:string,selections:Iterable<string>,options:DataRequestOptions={}):Promise<ExecutionReport>{return this.executeWithOptions(buildPlanRequest(resource,selections,options),options.executionOptions);}
  getResourceText(resource:string,selections:Iterable<string>,options:DataRequestOptions={}):Promise<TextExecutionReport>{return this.executor.planAndExecuteTextWithOptions(this.planner,buildPlanRequest(resource,selections,options),options.executionOptions);}
  async getResourceDataTyped<R>(resource:string,selections:Iterable<string>,options:DataRequestOptions={},decoder?:Decoder<R>):Promise<R>{const report=await this.getResourceData(resource,selections,options);return decoder?decoder(report.mergedJson):report.mergedJson as R;}
  execute_with_options=this.executeWithOptions.bind(this);
  get_user_data=this.getUserData.bind(this);
  get_resource_data=this.getResourceData.bind(this);
  get_resource_text=this.getResourceText.bind(this);
  get_resource_data_typed=this.getResourceDataTyped.bind(this);
}
export function buildPlanRequest(resource:string,selections:Iterable<string>,options:DataRequestOptions={}):PlanRequest {
  const request=new PlanRequest(resource,[...selections]);
  if(options.id!==undefined)request.withId(options.id);
  for(const [name,value] of Object.entries(options.filters??{}))request.withFilter(name,value);
  for(const [name,value] of Object.entries(options.pathArgs??{}))request.withPathArg(name,value);
  for(const selection of options.legacySelections??[])request.withLegacySelection(selection);
  return request;
}
