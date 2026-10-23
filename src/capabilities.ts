import rawCapabilities from '../spec/capabilities.json' with { type: 'json' };
import { PlannerError } from './errors.ts';

/** The pinned OpenAPI-derived planner metadata. JSON field names match Rust. */
export interface CapabilitySpec { version?: string }
export interface ParameterSchema {
  [key: string]: unknown;
  type?: string | null; format?: string | null; description?: string | null;
  default?: unknown; minimum?: unknown; maximum?: unknown; enum?: string[];
}
export interface ParameterCapability {
  name: string; in?: string; required?: boolean; schema?: ParameterSchema | null;
}
export interface SelectionCapability {
  name: string;
  standalone_only?: boolean;
  can_use_generic_endpoint?: boolean;
  requires_direct_endpoint_only?: boolean;
  fallback_to_v1?: boolean;
  unavailable_in_v2?: boolean;
  endpoints?: string[];
  query_parameters?: string[];
  required_path_parameters?: string[];
  response_schema_refs?: string[];
  response_top_level_fields?: string[];
  response_field_paths?: string[];
  notes?: string[];
}
export interface EndpointCapability {
  path: string; method?: string; operation_id?: string | null;
  selection_hint?: string | null; standalone_only?: boolean;
  parameters?: ParameterCapability[]; response_schema_refs?: string[];
  response_top_level_fields?: string[]; response_field_paths?: string[];
}
export interface ResourceCapabilities {
  generic_path?: string | null;
  generic_parameters?: ParameterCapability[];
  generic_filter_parameters?: ParameterCapability[];
  selections?: SelectionCapability[];
  endpoints?: EndpointCapability[];
}
export interface CapabilitiesDocument {
  spec?: CapabilitySpec;
  resources: Record<string, ResourceCapabilities>;
}

export const defaultCapabilities: CapabilitiesDocument = rawCapabilities;

/** Parse JSON, including the BOM accepted by the Rust SDK. */
export function capabilitiesFromJson(content: string): CapabilitiesDocument {
  const parsed: unknown = JSON.parse(content.replace(/^\uFEFF+/, ''));
  validateCapabilities(parsed);
  return { ...parsed, spec: parsed.spec ?? {}, resources: parsed.resources ?? {} };
}

function validateCapabilities(value: unknown): asserts value is Partial<CapabilitiesDocument> {
  const object=(v:unknown,path:string):Record<string,unknown>=>{
    if(v===null||typeof v!=="object"||Array.isArray(v))throw new TypeError(`${path}: expected object`);
    return v as Record<string,unknown>;
  };
  const fields=(v:Record<string,unknown>,path:string,names:readonly string[],type:"string"|"boolean",nullable=false):void=>{
    for(const name of names)if(Object.hasOwn(v,name)&&!(nullable&&v[name]===null)&&typeof v[name]!==type)throw new TypeError(`${path}.${name}: expected ${nullable?"nullable ":""}${type}`);
  };
  const vector=(v:Record<string,unknown>,path:string,name:string,visit:(item:unknown,path:string)=>void):void=>{
    if(!Object.hasOwn(v,name))return;
    if(!Array.isArray(v[name]))throw new TypeError(`${path}.${name}: expected array`);
    (v[name] as unknown[]).forEach((item,index)=>visit(item,`${path}.${name}[${index}]`));
  };
  const string=(v:unknown,path:string):void=>{if(typeof v!=="string")throw new TypeError(`${path}: expected string`);};
  const parameter=(v:unknown,path:string):void=>{
    const p=object(v,path);fields(p,path,["name","in"],"string");fields(p,path,["required"],"boolean");
    if(p.schema!==undefined&&p.schema!==null){const s=object(p.schema,path+".schema");fields(s,path+".schema",["type","format","description"],"string",true);vector(s,path+".schema","enum",string);}
  };
  const root=object(value,"capabilities");
  if(root.spec!==undefined){const spec=object(root.spec,"capabilities.spec");fields(spec,"capabilities.spec",["version"],"string");}
  if(root.resources===undefined)return;
  for(const [resource,entry] of Object.entries(object(root.resources,"capabilities.resources"))){
    const path=`capabilities.resources.${resource}`,r=object(entry,path);
    fields(r,path,["generic_path"],"string",true);
    for(const name of ["generic_parameters","generic_filter_parameters"])vector(r,path,name,parameter);
    vector(r,path,"selections",(entry,path)=>{
      const s=object(entry,path);fields(s,path,["name"],"string");
      fields(s,path,["standalone_only","can_use_generic_endpoint","requires_direct_endpoint_only","fallback_to_v1","unavailable_in_v2"],"boolean");
      for(const name of ["endpoints","query_parameters","required_path_parameters","response_schema_refs","response_top_level_fields","response_field_paths","notes"])vector(s,path,name,string);
    });
    vector(r,path,"endpoints",(entry,path)=>{
      const e=object(entry,path);fields(e,path,["path","method"],"string");fields(e,path,["operation_id","selection_hint"],"string",true);fields(e,path,["standalone_only"],"boolean");
      vector(e,path,"parameters",parameter);
      for(const name of ["response_schema_refs","response_top_level_fields","response_field_paths"])vector(e,path,name,string);
    });
  }
}

/** Companion utility for the Rust resource metadata selection accessor. */
export const ResourceCapabilities = {
  selection(resource: ResourceCapabilities, name: string): SelectionCapability | undefined {
    return resource.selections?.find(selection=>selection.name===name);
  },
};

export async function capabilitiesFromPath(path: string | URL): Promise<CapabilitiesDocument> {
  let content: string;
  try { content = await Bun.file(path).text(); }
  catch (cause) {
    throw new PlannerError(`Failed to read capabilities from ${path}`, 'CapabilitiesRead', { path: String(path), cause });
  }
  try { return capabilitiesFromJson(content); }
  catch (cause) {
    throw new PlannerError(`Failed to parse capabilities from ${path}`, 'CapabilitiesParse', { path: String(path), cause });
  }
}

/** Static helpers are also exposed under the Rust type's name. */
export const CapabilitiesDocument = {
  fromJsonStr: capabilitiesFromJson, from_json_str: capabilitiesFromJson,
  fromPath: capabilitiesFromPath, from_path: capabilitiesFromPath,
};
