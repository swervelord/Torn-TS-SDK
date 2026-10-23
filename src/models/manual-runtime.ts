import type { JsonValue } from "../types.ts";
import { DecodeError } from "../errors.ts";
import { decodeModel } from "../generated/runtime.ts";
import { manualModelMetadata } from "./manual-metadata.ts";

interface Field {name:string;key:string;type:string;default:boolean;flatten:boolean;aliases:readonly string[];custom:string|null}
type Definition = {kind:"struct";fields:readonly Field[]} | {kind:"union";variants:readonly string[]} | {kind:"alias";type:string};
const metadata: Readonly<Record<string,Definition>>=manualModelMetadata;
export const MANUAL_MODEL_NAMES: readonly string[] = Object.freeze(Object.keys(metadata));
function object(v:unknown): v is Record<string,JsonValue> {return v !== null && typeof v === "object" && !Array.isArray(v);}
function fail(path:string,message:string):never {throw new DecodeError(`${path}: ${message}`);}
function withMethods(name:string,result:Record<string,unknown>):Record<string,unknown> {
  if(name==="CompanyProfileBundle")Object.defineProperty(result,"profile",{value:()=>result.company});
  if(name==="UserReportDetails"||name==="UserPersonalStatsBucket"){
    const field=name==="UserReportDetails"?"fields":"stats";
    Object.defineProperty(result,"get",{value:(key:string)=>{const values=result[field] as Record<string,JsonValue>;return Object.hasOwn(values,key)?values[key]:undefined;}});
  }
  return result;
}
function splitTypes(v:string):string[] {
  const out:string[]=[];let depth=0,start=0;
  for(let i=0;i<v.length;i++){if(v[i]==="<")depth++;if(v[i]===">")depth--;if(v[i]==="," && depth===0){out.push(v.slice(start,i).trim());start=i+1;}}
  out.push(v.slice(start).trim());return out;
}
function typeParts(type:string): {name:string;args:string[]} {
  const m=/^(\w+)<(.*)>$/.exec(type);return m?{name:m[1]!,args:splitTypes(m[2]!)}:{name:type,args:[]};
}
function defaultValue(type:string):unknown {
  const {name,args}=typeParts(type);
  if(name==="Option" || name==="Value" || name==="DynamicValue" || name==="null") return null;
  if(name==="Vec")return [];
  if(name==="BTreeMap")return {};
  if(name==="Box")return defaultValue(args[0]!);
  if(name==="String")return "";
  if(name==="bool")return false;
  if(/^[uif]\d+$/.test(name))return 0;
  const def=metadata[name];
  if(def?.kind==="struct")return withMethods(name,Object.fromEntries(def.fields.map(f=>[f.name,defaultValue(f.type)])));
  if(def?.kind==="alias")return defaultValue(def.type);
  return null;
}
function extras(v:JsonValue):Record<string,JsonValue>{return object(v)?{...v}:{raw:v};}
function decodeTrade(v:JsonValue,path:string):unknown {
  if(!object(v))fail(path,"expected trade item object");
  const user_id=decodeType("Option<u64>",v.user_id,path+".user_id");
  const item_type=decodeType("Option<String>",v.type,path+".type");
  const extra=Object.fromEntries(Object.entries(v).filter(([k])=>!["user_id","type","details"].includes(k)));
  const names:Record<string,string>={Money:"TradeMoneyDetails",Item:"TradeInventoryItemDetails",Faction:"TradeFactionDetails",Company:"TradeCompanyDetails",Property:"TradePropertyDetails",NAP:"TradeNapDetails"};
  const detailType=typeof item_type==="string"?names[item_type]:undefined;
  if(detailType)try{return {user_id,details:decodeType(detailType,v.details ?? null,path+".details"),extra};}catch(e){if(!(e instanceof DecodeError))throw e;}
  return {user_id,item_type,details:v.details ?? null,extra};
}
function decodeSpecial(name:string,v:JsonValue,path:string): {handled:true;value:unknown}|undefined {
  let subtype:string|undefined;
  if(name==="TradeItem")return {handled:true,value:decodeTrade(v,path)};
  if(name==="UserEmployment") {
    if(object(v) && v.type==="job")subtype="UserCityJob";
    else if(object(v) && v.type==="company")subtype="UserCompanyJob";
    else return {handled:true,value:{job_type:object(v)&&typeof v.type==="string"?v.type:null,extra:extras(v)}};
  }
  if(name==="UserCompetition") {
    const names:Record<string,string>={Halloween:"UserHalloweenCompetition","Easter Egg Hunt":"UserEasterCompetition","Rock, Paper, Scissors":"UserRpsCompetition",Elimination:"UserEliminationCompetition"};
    subtype=object(v)&&typeof v.name==="string"?names[v.name]:undefined;
    if(!subtype)return {handled:true,value:{name:object(v)&&typeof v.name==="string"?v.name:null,extra:extras(v)}};
  }
  if(name==="UserOrganizedCrimeSelection") subtype=object(v)&&"code" in v&&"error" in v?"UserOrganizedCrimeError":"UserOrganizedCrime";
  if(name==="FactionWarfareEntry") {
    if(!object(v))return {handled:true,value:{extra:{}}};
    if("territory" in v&&"result" in v)subtype="FactionTerritoryWarfareSummary";
    else if("aggressor" in v&&"defender" in v)subtype="FactionRaidSummary";
    else if("target" in v&&"winner" in v&&"factions" in v)subtype="FactionRankedWarDetails";
    else if("chain" in v&&"faction" in v)subtype="FactionChainWarfareSummary";
    else return {handled:true,value:{extra:extras(v)}};
  }
  return subtype?{handled:true,value:decodeType(subtype,v,path)}:undefined;
}
function customValue(name:string,v:JsonValue|undefined,path:string):unknown {
  if(name==="deserialize_optional_stringish")return typeof v==="string"||typeof v==="number"||typeof v==="bigint"?String(v):null;
  if(name==="deserialize_optional_position_name")return typeof v==="string"?v:object(v)&&typeof v.name==="string"?v.name:null;
  if(name==="deserialize_company_news") {
    if(v===undefined||v===null)return {};
    if(object(v))return Object.fromEntries(Object.entries(v).map(([k,item])=>[k,decodeType("CompanyNewsEntry",item,path+"."+k)]));
    if(!Array.isArray(v))fail(path,"expected company news object or array");
    const result:Record<string,unknown>={};v.forEach((item,i)=>{const entry=decodeType("CompanyNewsEntry",item,path+"["+i+"]") as {id:string|null;timestamp:number|null};result[entry.id ?? String(entry.timestamp ?? i)]=entry;});return result;
  }
  fail(path,"unknown custom decoder "+name);
}
function decodeType(type:string,value:JsonValue|undefined,path:string):unknown {
  type=type.replace("serde_json::","").replace("super::common::","");
  if(type.startsWith("crate::models::generated::openapi::"))return decodeModel(type.slice("crate::models::generated::openapi::".length),value as JsonValue);
  const {name,args}=typeParts(type);
  if(name==="Option")return value===undefined||value===null?null:decodeType(args[0]!,value,path);
  if(value===undefined)fail(path,"missing required field");
  if(name==="Value"||name==="DynamicValue")return value;
  if(name==="null"){if(value!==null)fail(path,"expected null");return null;}
  if(name==="Box")return decodeType(args[0]!,value,path);
  if(name==="String"){if(typeof value!=="string")fail(path,"expected string");return value;}
  if(name==="bool"){if(typeof value!=="boolean")fail(path,"expected boolean");return value;}
  if(/^[uif]\d+$/.test(name)){
    if(typeof value==="bigint"&&name[0]==="f"){const converted=Number(value);if(!Number.isFinite(converted))fail(path,"expected finite number");return converted;}
    if(typeof value==="bigint"&&name[0]!=="f"){
      const bits=BigInt(name.slice(1)),min=name[0]==="u"?0n:-(1n<<(bits-1n)),max=name[0]==="u"?(1n<<bits)-1n:(1n<<(bits-1n))-1n;
      if(value<min||value>max)fail(path,"integer out of range");return value;
    }
    if(typeof value!=="number"||!Number.isFinite(value))fail(path,"expected finite number");
    if(name[0]!=="f"&&!Number.isInteger(value))fail(path,"expected integer");
    if(name[0]==="u"&&value<0)fail(path,"expected unsigned integer");
    const width=BigInt(name.slice(1));
    if(name[0]!=="f"){
      const exact=BigInt(value),min=name[0]==="u"?0n:-(1n<<(width-1n)),max=name[0]==="u"?(1n<<width)-1n:(1n<<(width-1n))-1n;
      if(exact<min||exact>max)fail(path,"integer out of range");
    }
    return value;
  }
  if(name==="Vec") {if(!Array.isArray(value))fail(path,"expected array");return value.map((v,i)=>decodeType(args[0]!,v,`${path}[${i}]`));}
  if(name==="BTreeMap") {if(!object(value))fail(path,"expected object");return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,decodeType(args[1]!,v,path+"."+k)]));}
  const special=decodeSpecial(name,value,path);if(special)return special.value;
  const def=metadata[name];if(!def)fail(path,"unknown manual model "+name);
  if(def.kind==="alias")return decodeType(def.type,value,path);
  if(def.kind==="union") {
    for(const variant of def.variants)try{return decodeType(variant,value,path);}catch(e){if(!(e instanceof DecodeError))throw e;}
    fail(path,"value does not match any variant of "+name);
  }
  if(!object(value))fail(path,"expected object for "+name);
  const result:Record<string,unknown>={},used=new Set<string>();
  for(const f of def.fields) {
    if(f.flatten)continue;
    const keys=[f.key,...f.aliases].filter(k=>k in value);if(keys.length>1)fail(path,"duplicate field "+f.key);
    const key=keys[0] ?? f.key;used.add(key);
    const v=value[key];
    result[f.name]=f.custom?customValue(f.custom,v,path+"."+key):v===undefined&&f.default?defaultValue(f.type):decodeType(f.type,v,path+"."+key);
  }
  for(const f of def.fields)if(f.flatten){const rest=Object.fromEntries(Object.entries(value).filter(([k])=>!used.has(k)));result[f.name]=decodeType(f.type,rest,path+"."+f.name);}
  return withMethods(name,result);
}

/** Deserialize compatibility models, including defaults, aliases, flattened extras, and custom unions. */
export function decodeManualModel<T>(name:string,value:JsonValue):T {return decodeType(name,value,name) as T;}
