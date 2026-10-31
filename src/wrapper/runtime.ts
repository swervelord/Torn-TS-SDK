import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import type { JsonValue, JsonObject, Decoder, DataRequestOptions, ExecutionReport } from "../types.ts";
import { ValidationError, DecodeError } from "../errors.ts";
import { clientValidationMode, decodeModel } from "../generated/runtime.ts";
import { ResourceOptions as BaseResourceOptions } from "./options.ts";
import { decodeManualModel } from "../models/manual-runtime.ts";
import { ResourceOptions, TornOptions } from "./options.ts";
import { selectionModelDefinitions } from "../batch-models.ts";
import { decodeSelectionBatch, decodeSelectionBatchSettled, type JsonSelection, type ResourceName, type SelectionBatch, type SelectionBatchReport, type SelectionBatchSettled } from "../batch.ts";

/** JSON selection bundle exposing a flattened selection map and lookup helper. */
export class RawSelectionBundle {
  constructor(readonly selections: JsonObject = {}) {}
  get(selection:string):JsonValue|undefined{return this.selections[selection];}
  toJSON():JsonObject{return this.selections;}
  intoValue():JsonObject{return this.selections;}
}

/** Options object, or an id shorthand (`market().itemmarket(206)`). */
export type OptionsOrId<O> = O | string | number | bigint;
export class ResourceApi<O extends ResourceOptions,R extends ResourceName=ResourceName> {
  constructor(protected readonly client:TornClient<HttpTransport>, readonly resource:R, readonly supportedSelections:readonly string[], private readonly defaults:()=>O){}
  rawClient():TornClient<HttpTransport>{return this.client;}
  /** @deprecated Use rawClient. */
  raw_client():TornClient<HttpTransport>{return this.rawClient();}
  /** Accept an options object or an id shorthand; anything else is a clean ValidationError instead of a TypeError. */
  protected options(value:OptionsOrId<O>|undefined|null):O {
    if(value===undefined||value===null)return this.defaults();
    if(typeof value==="string"||typeof value==="number"||typeof value==="bigint"){const options=this.defaults();options.withId(value);return options;}
    if(value instanceof BaseResourceOptions)return value;
    throw new ValidationError(`resource '${this.resource}' expects an options object or an id, got ${Array.isArray(value)?"an array":typeof value}`);
  }
  /** Execute these selections together through the planner and infer their typed envelopes. */
  async select<const S extends readonly JsonSelection<R>[]>(selections:S,options:OptionsOrId<O>=this.defaults()):Promise<SelectionBatch<R,S>> {
    return (await this.selectWithReport(selections,options)).data;
  }
  /** Return inferred data together with the exact HTTP calls made by the planner/executor. */
  async selectWithReport<const S extends readonly JsonSelection<R>[]>(selections:S,options:OptionsOrId<O>=this.defaults()):Promise<SelectionBatchReport<R,S>> {
    const {requestOptions,report}=await this.#fetchBatch(selections,options);
    const failed=Object.values(report.selectionErrors??{});
    if(failed.length)throw failed[0]!;
    const data=decodeSelectionBatch(this.resource,selections,report.mergedJson,this.#detailStock(requestOptions),{mode:clientValidationMode(this.client)});
    return {data,report};
  }
  /**
   * Like selectWithReport, but a selection that fails to decode does not discard the others (PARITY_SPEC P1.4):
   * `data` holds every decoded selection and `errors` maps each failed selection to its DecodeError.
   */
  async selectSettled<const S extends readonly JsonSelection<R>[]>(selections:S,options:OptionsOrId<O>=this.defaults()):Promise<SelectionBatchSettled<R,S>> {
    const {requestOptions,report}=await this.#fetchBatch(selections,options);
    const failed=report.selectionErrors??{};
    const decodable=selections.filter(selection=>!Object.hasOwn(failed,selection)) as unknown as S;
    const {data,errors}=decodeSelectionBatchSettled(this.resource,decodable,report.mergedJson,this.#detailStock(requestOptions),{mode:clientValidationMode(this.client)});
    return {data:data as Partial<SelectionBatch<R,S>>,errors:{...errors,...failed} as SelectionBatchSettled<R,S>["errors"],report};
  }
  #detailStock(requestOptions:DataRequestOptions):boolean{return this.resource==="torn"&&(requestOptions.pathArgs?.stockId!==undefined||requestOptions.id!==undefined);}
  async #fetchBatch(selections:readonly string[],input:OptionsOrId<O>):Promise<{requestOptions:DataRequestOptions;report:ExecutionReport}> {
    const options=this.options(input);
    for(const selection of selections){
      this.validate(selection,options);
      if(!Object.hasOwn(selectionModelDefinitions[this.resource]??{},selection))throw new ValidationError(`selection '${selection}' is not supported by typed batches for resource '${this.resource}'; use rawSelections() for selections without a typed model`);
    }
    const requestOptions=options.intoDataRequestOptions();
    if(this.resource==="company"&&selections.includes("companies" as JsonSelection<R>)&&requestOptions.id!==undefined){
      requestOptions.pathArgs??={};requestOptions.pathArgs.typeId??=requestOptions.id;
    }
    const report=await this.client.getResourceData(this.resource,selections,requestOptions);
    return {requestOptions,report};
  }
  /** @deprecated Use selectWithReport. */
  select_with_report<const S extends readonly JsonSelection<R>[]>(selections:S,options:O=this.defaults()){return this.selectWithReport(selections,options);}
  /**
   * Client-side argument checks. Selections unknown to this SDK are not refused (PARITY_SPEC P1.5): they pass through to
   * Torn as generic selections. P8.1: selections Torn serves for the key owner need no id.
   */
  protected validate(selection:string,options:O,json=true):void {
    const r=this.resource,b=options.base;
    if(b.from!==undefined&&b.to!==undefined&&b.from>b.to)throw new ValidationError(`resource '${r}' requires 'from' <= 'to' (received from=${b.from}, to=${b.to})`);
    if(json&&selection==="snapshot"&&["user","company","faction"].includes(r))throw new ValidationError(`resource '${r}' selection 'snapshot' returns CSV; use ${r[0]!.toUpperCase()+r.slice(1)}Api::snapshot`);
    const extras=options as O & {crimeId?:string;tradeId?:string;raidWarId?:string;rankedWarId?:string;territoryWarId?:string;propertyTypeId?:string;threadId?:string;raceId?:string;trackId?:string;ids?:string};
    const required=(parameter:string,present:boolean,query=false)=>{if(!present)throw new ValidationError(`resource '${r}' selection '${selection}' requires ${query?"query parameter ":""}'${parameter}' to be provided`);};
    const path=(parameter:string,value:string|undefined)=>required(parameter,value!==undefined||b.id!==undefined);
    const query=(parameter:"cat"|"stat"|"log")=>required(parameter,b[parameter]!==undefined,true);
    if(r==="user"){
      if(selection==="crimes")path("crimeId",extras.crimeId);
      if(selection==="trade")path("tradeId",extras.tradeId);
      if(["list","inventory"].includes(selection))query("cat");
      if(selection==="personalstats"&&((b.cat!==undefined)===(b.stat!==undefined)))throw new ValidationError("resource 'user' selection 'personalstats' requires exactly one of 'cat' or 'stat'");
    }
    if(r==="faction"){
      if(selection==="crime")path("crimeId",extras.crimeId);
      if(selection==="raidreport")path("raidWarId",extras.raidWarId);
      if(selection==="rankedwarreport")path("rankedWarId",extras.rankedWarId);
      if(selection==="territorywarreport")path("territoryWarId",extras.territoryWarId);
      if(selection==="search"&&b.name===undefined)throw new ValidationError("resource 'faction' selection 'search' requires 'name' filter to be provided");
      if(selection==="contributors")query("stat");
      if(["news","warfare","inventory","warfarechains"].includes(selection))query("cat");
    }
    if(r==="forum"&&["thread","posts"].includes(selection))path("threadId",extras.threadId);
    if(r==="market"){
      if(["properties","rentals"].includes(selection))path("propertyTypeId",extras.propertyTypeId);
      // market/bazaar without an id is the bazaar directory; these two have no self-scoped form.
      if(["auctionhouselisting","itemmarket"].includes(selection))required("id",b.id!==undefined);
    }
    if(r==="property"&&selection==="property")required("id",b.id!==undefined);
    if(r==="racing"){
      if(selection==="race")path("raceId",extras.raceId);
      if(selection==="records"){path("trackId",extras.trackId);query("cat");}
    }
    if(r==="torn"){
      if(selection==="attacklog")query("log");
      if(["honors","items","medals","itemstats","itemdetails"].includes(selection))path("ids",extras.ids);
      if(selection==="subcrimes")path("crimeId",extras.crimeId);
      if(selection==="eliminationteam")required("id",b.id!==undefined);
    }
  }
  protected validateStockOptions(options:TornOptions,single:boolean):void {
    this.validate("stocks",options as unknown as O);
    const hasId=options.stockId!==undefined||options.base.id!==undefined;
    if(single&&!hasId)throw new ValidationError("resource 'torn' selection 'stocks' requires 'stockId' to be provided");
    if(!single&&hasId)throw new ValidationError("torn.stocks list helper does not accept stockId; use torn.stock() instead");
  }
  protected async executeTyped<R>(selection:string,input:OptionsOrId<O>|undefined,model:string,manual:boolean):Promise<R> {
    const options=this.options(input);
    this.validate(selection,options);
    const report=await this.client.getResourceData(this.resource,[selection],options.intoDataRequestOptions());
    const where=`${this.resource}.${selection}`;
    return manual?decodeManualModel<R>(model,report.mergedJson,{selection:where}):decodeModel<R>(model,report.mergedJson,{mode:clientValidationMode(this.client),selection:where});
  }
  protected async executeText(selection:string,input:OptionsOrId<O>|undefined):Promise<string> {
    const options=this.options(input);
    this.validate(selection,options,false);
    return (await this.client.getResourceText(this.resource,[selection],options.intoDataRequestOptions())).body;
  }
  async rawSelection(selection:string,input:OptionsOrId<O>=this.defaults()):Promise<RawSelectionBundle> {const options=this.options(input);this.validate(selection,options);return this.rawSelections([selection],options);}
  /** Raw JSON for any selections, including ones newer than this SDK (sent as v2 generic selections, PARITY_SPEC P1.5). */
  async rawSelections(selections:Iterable<string>,input:OptionsOrId<O>=this.defaults()):Promise<RawSelectionBundle> {
    const options=this.options(input),values=[...selections];
    if(!values.length&&["company","key"].includes(this.resource)&&options.base.from!==undefined&&options.base.to!==undefined&&options.base.from>options.base.to)throw new ValidationError(`resource '${this.resource}' requires 'from' <= 'to' (received from=${options.base.from}, to=${options.base.to})`);
    for(const s of values)this.validate(s,options);
    const report=await this.client.getResourceData(this.resource,values,options.intoDataRequestOptions());
    const value=report.mergedJson;if(value===null||typeof value!=="object"||Array.isArray(value))throw new DecodeError("raw selection bundle must be an object");
    return new RawSelectionBundle(value);
  }
  async typedSelection<R>(selection:string,input:OptionsOrId<O>=this.defaults(),decoder?:Decoder<R>):Promise<R> {
    const options=this.options(input);
    this.validate(selection,options);
    const report=await this.client.getResourceData(this.resource,[selection],options.intoDataRequestOptions());
    return decoder?decoder(report.mergedJson):report.mergedJson as R;
  }
  /** @deprecated Use rawSelection. */
  raw_selection(selection:string,options:O=this.defaults()){return this.rawSelection(selection,options);}
  /** @deprecated Use rawSelections. */
  raw_selections(selections:Iterable<string>,options:O=this.defaults()){return this.rawSelections(selections,options);}
  /** @deprecated Use typedSelection. */
  typed_selection<R>(selection:string,options:O=this.defaults(),decoder?:Decoder<R>){return this.typedSelection(selection,options,decoder);}
}
