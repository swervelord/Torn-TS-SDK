import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import type { JsonValue, JsonObject, Decoder } from "../types.ts";
import { ValidationError, DecodeError } from "../errors.ts";
import { decodeModel } from "../generated/runtime.ts";
import { decodeManualModel } from "../models/manual-runtime.ts";
import { ResourceOptions, TornOptions } from "./options.ts";
import { decodeSelectionBatch, type JsonSelection, type ResourceName, type SelectionBatch, type SelectionBatchReport } from "../batch.ts";

/** JSON selection bundle exposing a flattened selection map and lookup helper. */
export class RawSelectionBundle {
  constructor(readonly selections: JsonObject = {}) {}
  get(selection:string):JsonValue|undefined{return this.selections[selection];}
  toJSON():JsonObject{return this.selections;}
  intoValue():JsonObject{return this.selections;}
}

export class ResourceApi<O extends ResourceOptions,R extends ResourceName=ResourceName> {
  constructor(protected readonly client:TornClient<HttpTransport>, readonly resource:R, readonly supportedSelections:readonly string[], private readonly defaults:()=>O){}
  rawClient():TornClient<HttpTransport>{return this.client;}
  raw_client():TornClient<HttpTransport>{return this.rawClient();}
  /** Execute these selections together through the planner and infer their typed envelopes. */
  async select<const S extends readonly JsonSelection<R>[]>(selections:S,options:O=this.defaults()):Promise<SelectionBatch<R,S>> {
    return (await this.selectWithReport(selections,options)).data;
  }
  /** Return inferred data together with the exact HTTP calls made by the planner/executor. */
  async selectWithReport<const S extends readonly JsonSelection<R>[]>(selections:S,options:O=this.defaults()):Promise<SelectionBatchReport<R,S>> {
    for(const selection of selections)this.validate(selection,options);
    const requestOptions=options.intoDataRequestOptions();
    if(this.resource==="company"&&selections.includes("companies" as JsonSelection<R>)&&requestOptions.id!==undefined){
      requestOptions.pathArgs??={};requestOptions.pathArgs.typeId??=requestOptions.id;
    }
    const report=await this.client.getResourceData(this.resource,selections,requestOptions);
    const data=decodeSelectionBatch(this.resource,selections,report.mergedJson,this.resource==="torn"&&(requestOptions.pathArgs?.stockId!==undefined||requestOptions.id!==undefined));
    return {data,report};
  }
  select_with_report<const S extends readonly JsonSelection<R>[]>(selections:S,options:O=this.defaults()){return this.selectWithReport(selections,options);}
  protected validate(selection:string,options:O,json=true):void {
    const r=this.resource,b=options.base;
    if(!this.supportedSelections.includes(selection))throw new ValidationError(`selection '${selection}' is not supported for resource '${r}'`);
    if(b.from!==undefined&&b.to!==undefined&&b.from>b.to)throw new ValidationError(`resource '${r}' requires 'from' <= 'to' (received from=${b.from}, to=${b.to})`);
    if(json&&selection==="snapshot"&&["user","company","faction"].includes(r))throw new ValidationError(`resource '${r}' selection 'snapshot' returns CSV; use ${r[0]!.toUpperCase()+r.slice(1)}Api::snapshot`);
    const extras=options as O & {crimeId?:string;tradeId?:string;raidWarId?:string;rankedWarId?:string;territoryWarId?:string;propertyTypeId?:string;threadId?:string;raceId?:string;trackId?:string;ids?:string};
    const required=(parameter:string,present:boolean,query=false)=>{if(!present)throw new ValidationError(`resource '${r}' selection '${selection}' requires ${query?"query parameter ":""}'${parameter}' to be provided`);};
    const path=(parameter:string,value:string|undefined)=>required(parameter,value!==undefined||b.id!==undefined);
    const query=(parameter:"cat"|"stat"|"log")=>required(parameter,b[parameter]!==undefined,true);
    if(r==="user"){
      if(["basic","bounties","discord","faction","forumposts","forumthreads","hof","profile","properties","property"].includes(selection))required("id",b.id!==undefined);
      if(selection==="crimes")path("crimeId",extras.crimeId);
      if(selection==="trade")path("tradeId",extras.tradeId);
      if(["list","inventory"].includes(selection))query("cat");
      if(selection==="personalstats"&&((b.cat!==undefined)===(b.stat!==undefined)))throw new ValidationError("resource 'user' selection 'personalstats' requires exactly one of 'cat' or 'stat'");
    }
    if(r==="faction"){
      if(["basic","hof","members","rankedwars","wars"].includes(selection))required("id",b.id!==undefined);
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
      if(["auctionhouselisting","bazaar","itemmarket"].includes(selection))required("id",b.id!==undefined);
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
  protected async executeTyped<R>(selection:string,options:O,model:string,manual:boolean):Promise<R> {
    this.validate(selection,options);
    const report=await this.client.getResourceData(this.resource,[selection],options.intoDataRequestOptions());
    return manual?decodeManualModel<R>(model,report.mergedJson):decodeModel<R>(model,report.mergedJson);
  }
  protected async executeText(selection:string,options:O):Promise<string> {
    this.validate(selection,options,false);
    return (await this.client.getResourceText(this.resource,[selection],options.intoDataRequestOptions())).body;
  }
  async rawSelection(selection:string,options:O=this.defaults()):Promise<RawSelectionBundle> {this.validate(selection,options);return this.rawSelections([selection],options);}
  async rawSelections(selections:Iterable<string>,options:O=this.defaults()):Promise<RawSelectionBundle> {
    const values=[...selections],unknown=values.filter(v=>!this.supportedSelections.includes(v));
    if(unknown.length)throw new ValidationError(`resource '${this.resource}' does not support selections: ${unknown.join(",")}`);
    if(!values.length&&["company","key"].includes(this.resource)&&options.base.from!==undefined&&options.base.to!==undefined&&options.base.from>options.base.to)throw new ValidationError(`resource '${this.resource}' requires 'from' <= 'to' (received from=${options.base.from}, to=${options.base.to})`);
    for(const s of values)this.validate(s,options);
    const report=await this.client.getResourceData(this.resource,values,options.intoDataRequestOptions());
    const value=report.mergedJson;if(value===null||typeof value!=="object"||Array.isArray(value))throw new DecodeError("raw selection bundle must be an object");
    return new RawSelectionBundle(value);
  }
  async typedSelection<R>(selection:string,options:O=this.defaults(),decoder?:Decoder<R>):Promise<R> {
    this.validate(selection,options);
    const report=await this.client.getResourceData(this.resource,[selection],options.intoDataRequestOptions());
    return decoder?decoder(report.mergedJson):report.mergedJson as R;
  }
  raw_selection(selection:string,options:O=this.defaults()){return this.rawSelection(selection,options);}
  raw_selections(selections:Iterable<string>,options:O=this.defaults()){return this.rawSelections(selections,options);}
  typed_selection<R>(selection:string,options:O=this.defaults(),decoder?:Decoder<R>){return this.typedSelection(selection,options,decoder);}
}
