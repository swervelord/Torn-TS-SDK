import type { ExecutionReport, JsonValue } from "./types.ts";
import { DecodeError, ValidationError } from "./errors.ts";
import { decodeManualModel } from "./models/manual-runtime.ts";
import { decodeModel } from "./generated/runtime.ts";
import { selectionModelDefinitions, type SelectionModelMap } from "./batch-models.ts";

export { selectionModelDefinitions } from "./batch-models.ts";
export type { SelectionModelMap } from "./batch-models.ts";
export type ResourceName=keyof SelectionModelMap;
/** CSV selections are deliberately absent from the JSON selection map. */
export type JsonSelection<R extends ResourceName>=keyof SelectionModelMap[R] & string;
type SelectedFunction<R extends ResourceName,S extends readonly JsonSelection<R>[]>={
  [I in keyof S]:(value:SelectionModelMap[R][S[I]])=>void
}[number];
type SelectionIntersection<R extends ResourceName,S extends readonly JsonSelection<R>[]>=
  SelectedFunction<R,S> extends (value:infer Result)=>void ? Result : never;
type DynamicSelectedFunction<R extends ResourceName,S extends readonly JsonSelection<R>[]>={
  [K in S[number]]:(value:SelectionModelMap[R][K])=>void
}[S[number]];
type DynamicSelectionIntersection<R extends ResourceName,S extends readonly JsonSelection<R>[]>=
  DynamicSelectedFunction<R,S> extends (value:infer Result)=>void ? Result : never;
/** Literal tuples infer exactly their selected envelopes. A dynamically sized array cannot
 * guarantee any particular field and therefore exposes optional selected-model properties.
 * An individual tuple slot containing a union also retains that uncertainty.
 */
export type SelectionBatch<R extends ResourceName,S extends readonly JsonSelection<R>[]>=
  S[number] extends never ? Record<never,never> : number extends S["length"] ?
    Partial<DynamicSelectionIntersection<R,S>> : SelectionIntersection<R,S>;
export interface SelectionBatchReport<R extends ResourceName,S extends readonly JsonSelection<R>[]> {
  data:SelectionBatch<R,S>;
  report:ExecutionReport;
}
interface Definition {model:string;manual:boolean;inputRoots:readonly string[]}
const definitions:Readonly<Record<string,Readonly<Record<string,Definition>>>>=selectionModelDefinitions;
function object(value:unknown):value is Record<string,unknown>{return value!==null&&typeof value==="object"&&!Array.isArray(value);}
/** Merge decoded envelopes without turning shared defaults into data loss. Arrays represent
 * the same source envelope and are replaced rather than concatenated a second time.
 */
function mergeDecoded(target:Record<string,unknown>,source:Record<string,unknown>):void {
  for(const [key,value] of Object.entries(source)){
    const old=Object.hasOwn(target,key)?target[key]:undefined;
    if(object(old)&&object(value))mergeDecoded(old,value);
    else if(value!==null&&value!==undefined||old===undefined)Object.defineProperty(target,key,{value,writable:true,configurable:true,enumerable:true});
  }
  if(Object.hasOwn(source,"profile")&&typeof source.profile==="function")Object.defineProperty(target,"profile",{value:()=>target.company,configurable:true});
  if(Object.hasOwn(source,"get")&&typeof source.get==="function"){
    const field=Object.hasOwn(target,"fields")?"fields":"stats";
    Object.defineProperty(target,"get",{value:(key:string)=>{const values=target[field] as Record<string,unknown>;return Object.hasOwn(values,key)?values[key]:undefined;},configurable:true});
  }
}
/** Decode all selected envelopes from one planner execution. Global unknown fields stay in
 * flattened extras, while another explicitly selected envelope never becomes a raw extra.
 */
export function decodeSelectionBatch<R extends ResourceName,const S extends readonly JsonSelection<R>[]>(resource:R,selections:S,value:JsonValue,detailStock=false):SelectionBatch<R,S> {
  if(!object(value))throw new DecodeError("typed selection batch response must be an object");
  const specs=selections.map(selection=>{
    const definition=definitions[resource]?.[selection];
    if(!definition)throw new ValidationError(`selection '${selection}' is not a typed JSON selection for resource '${resource}'`);
    return resource==="torn"&&selection==="stocks"&&detailStock?{model:"TornStockBundle",manual:true,inputRoots:["stocks"]}:definition;
  });
  const claimed=new Set(specs.flatMap(d=>[...d.inputRoots]));
  const result:Record<string,unknown>={};
  for(const spec of specs){
    const payload=Object.fromEntries(Object.entries(value).filter(([key])=>spec.inputRoots.includes(key)||!claimed.has(key))) as Record<string,JsonValue>;
    const decoded=spec.manual?decodeManualModel<unknown>(spec.model,payload):decodeModel<unknown>(spec.model,payload);
    if(!object(decoded))throw new DecodeError(`typed selection model '${spec.model}' did not return an envelope`);
    mergeDecoded(result,decoded);
  }
  return result as SelectionBatch<R,S>;
}
