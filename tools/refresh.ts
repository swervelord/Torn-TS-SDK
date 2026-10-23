import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';
import type { JsonValue, JsonObject } from '../src/types.ts';
const object=(v:unknown):JsonObject => v!==null&&typeof v==='object'&&!Array.isArray(v)?v as JsonObject:{};
const array=(v:unknown):JsonValue[]=>Array.isArray(v)?v:[];
const text=(v:unknown):string=>typeof v==='string'?v:'';
const sorted=(values:Iterable<string>):string[]=>[...new Set(values)].sort();
const strings=(v:unknown):string[]=>array(v).filter((x):x is string=>typeof x==='string');
const at=(v:unknown,...keys:string[]):JsonValue=>{let current:unknown=v;for(const k of keys)current=object(current)[k];return current as JsonValue??null;};
function deref(spec:JsonObject,value:unknown):JsonObject {
 const v=object(value),ref=text(v.$ref);if(!ref.startsWith('#/'))return v;
 return object(at(spec,...ref.slice(2).split('/').map(s=>s.replace(/~1/g,'/').replace(/~0/g,'~'))));
}
function parameters(spec:JsonObject,values:JsonValue[]):JsonValue[] {
 return values.map(v=>{const p=deref(spec,v),r:JsonObject={};for(const k of ['name','in','required','schema'])if(p[k]!==undefined)r[k]=p[k]!;return r;}).sort((a,b)=>text(at(a,'in')).localeCompare(text(at(b,'in')))||text(at(a,'name')).localeCompare(text(at(b,'name'))));
}
function responseInfo(spec:JsonObject,op:JsonObject):JsonObject {
 const refs=new Set<string>(),fields=new Set<string>(),paths=new Set<string>();
 function walk(node:unknown,prefix:string,seen:Set<string>):void {
  const n=object(node),ref=text(n.$ref);if(ref){refs.add(ref);if(seen.has(ref))return;walk(deref(spec,n),prefix,new Set([...seen,ref]));return;}
  for(const k of ['allOf','anyOf','oneOf'])for(const item of array(n[k]))walk(item,prefix,seen);
  for(const [name,child] of Object.entries(object(n.properties))){const p=prefix?prefix+'.'+name:name;paths.add(p);if(!prefix)fields.add(name);walk(child,p,seen);}
  if(n.items!==undefined){const p=prefix+'[]';paths.add(p);walk(n.items,p,seen);}
  if(n.additionalProperties!==null&&typeof n.additionalProperties==='object'&&!Array.isArray(n.additionalProperties)){const p=prefix+'.*';paths.add(p);walk(n.additionalProperties,p,seen);}
 }
 const response=deref(spec,at(op,'responses','200'));
 for(const item of Object.values(object(response.content)))walk(at(item,'schema'),'',new Set());
 return {response_schema_refs:sorted(refs),response_top_level_fields:sorted(fields),response_field_paths:sorted(paths)};
}
/** Rebuild planner metadata using the same pinned OpenAPI + routing overrides as the Rust SDK. */
export function generateCapabilities(spec:JsonObject,overrides:JsonObject):JsonObject {
 const paths=object(spec.paths),resources:JsonObject={};
 for(const resource of sorted(Object.keys(paths).map(p=>p.split('/')[1]!).filter(Boolean))){
  const genericPath='/'+resource,generic=object(at(paths,genericPath,'get')),hasGeneric=Object.keys(generic).length>0;
  const schemaName=resource.charAt(0).toUpperCase()+resource.slice(1)+'SelectionName';
  const schema=object(at(spec,'components','schemas',schemaName)),variants=schema.oneOf?array(schema.oneOf):[schema];
  const enumNames=sorted(variants.flatMap(v=>strings(at(v,'enum'))).map(v=>v.toLowerCase()));
  const names=new Set(enumNames),unavailable=new Set<string>(),fallback=new Set<string>();
  for(const segment of variants.map(v=>text(at(v,'description'))).join('\n').split('The following selections')){
   const dest=segment.includes('not available')?unavailable:segment.includes('fallback')?fallback:undefined;
   if(dest)segment.split("'").forEach((part,i)=>{if(i%2===1)dest.add(part.toLowerCase());});
  }
  for(const n of [...fallback,...strings(at(overrides,'legacy_selections',resource))])names.add(n);
  const endpoints:JsonObject[]=[];
  for(const path of Object.keys(paths).sort()){
   if(path.split('/')[1]!==resource||path===genericPath)continue;
   const item=object(paths[path]);
   for(const method of Object.keys(item).sort()){
    if(!['get','post','put','patch','delete'].includes(method))continue;
    const op=object(item[method]),tail=path.split('/').at(-1)!;if(tail.startsWith('{'))continue;
    const hint=(text(at(overrides,'endpoint_selection_overrides',path))||tail).toLowerCase();names.add(hint);
    const contentTypes=sorted(Object.keys(object(deref(spec,at(op,'responses','200')).content)));
    endpoints.push({path,method,operation_id:op.operationId??null,selection_hint:hint,standalone_only:text(op.description).toLowerCase().includes('standalone'),parameters:parameters(spec,[...array(item.parameters),...array(op.parameters)]),response_content_types:contentTypes,...responseInfo(spec,op)});
   }
  }
  const selections:JsonObject[]=[];
  for(const name of sorted(names)){
   const matchingName=resource==='user'&&name==='itemmod'?'itemmods':resource==='faction'&&name==='dirtbombs'?'dirtybombs':name;
   const matching=endpoints.filter(e=>e.selection_hint===matchingName);
   const standaloneOverride=at(overrides,'standalone_selections',resource,name);
   const standalone=typeof standaloneOverride==='boolean'?standaloneOverride:matching.some(e=>e.standalone_only===true);
   const isFallback=fallback.has(name)&&matching.length===0,isUnavailable=unavailable.has(name)&&matching.length===0;
   let genericOk=hasGeneric&&enumNames.includes(name)&&!isUnavailable;
   if((resource==='faction'&&name==='dirtbombs')||(resource==='user'&&name==='itemmod')||matching.some(e=>strings(e.response_content_types).includes('text/csv')))genericOk=false;
   const params=matching.flatMap(e=>array(e.parameters));
   const s:JsonObject={name,in_selection_enum:enumNames.includes(name),standalone_only:standalone,fallback_to_v1:isFallback,unavailable_in_v2:isUnavailable,endpoints:sorted(matching.map(e=>text(e.path))),query_parameters:sorted(params.filter(p=>at(p,'in')==='query').map(p=>text(at(p,'name')))),required_path_parameters:sorted(params.filter(p=>at(p,'in')==='path'&&at(p,'required')===true).map(p=>text(at(p,'name'))))};
   for(const k of ['response_schema_refs','response_top_level_fields','response_field_paths'])s[k]=sorted(matching.flatMap(e=>strings(e[k])));
   s.notes=at(overrides,'selection_notes',resource,name)??[];
   if(s.notes===null)s.notes=[];
   s.can_use_generic_endpoint=genericOk;s.requires_direct_endpoint_only=!genericOk;
   const routing=object(at(overrides,'selection_routing_overrides',resource,name));
   for(const k of ['can_use_generic_endpoint','requires_direct_endpoint_only','standalone_only','fallback_to_v1','unavailable_in_v2'])if(routing[k]!==undefined)s[k]=routing[k]!;
   selections.push(s);
  }
  const gp=parameters(spec,array(generic.parameters)),lookup=`/${resource}/lookup`,timestamp=`/${resource}/timestamp`;
  resources[resource]={generic_path:hasGeneric?genericPath:null,lookup_path:paths[lookup]!==undefined?lookup:null,timestamp_path:paths[timestamp]!==undefined?timestamp:null,selection_schema:schemaName,selection_schema_ref:'#/components/schemas/'+schemaName,selections_accept_unknown_strings:variants.some(v=>object(v).enum===undefined),selection_count:selections.length,generic_supports_legacy:gp.some(p=>at(p,'name')==='legacy'),generic_parameters:gp,generic_filter_parameters:gp.filter(p=>!['key','comment','selections','id','legacy'].includes(text(at(p,'name')))),selections,endpoints};
 }
 return {spec:{title:at(spec,'info','title'),version:at(spec,'info','version'),openapi:spec.openapi??null,source_file:'spec/torn-openapi-current.json'},planner_notes:['Dedicated v2 endpoints take precedence over legacy selection descriptions.','Selection compatibility is not fully machine-readable; standalone selections are isolated and API errors can trigger request splitting.'],resources};
}
function canonical(v:JsonValue):string {if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';if(v!==null&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k]!)).join(',')+'}';return JSON.stringify(v);}
export function equivalentJson(a:JsonValue,b:JsonValue):boolean {return canonical(a)===canonical(b);}
export async function refresh(args:string[]=Bun.argv.slice(2)):Promise<void> {
 const root=resolve(import.meta.dir,'..'),index=args.indexOf('--spec');
 const source='https://www.torn.com/swagger/openapi.json',userAgent='torn-typescript-sdk-spec-sync/1.0';
 let spec:JsonObject;
 if(index>=0){const filename=args[index+1];if(!filename)throw new Error('--spec requires a file');spec=object(await Bun.file(resolve(filename)).json());}
 else {const response=await fetch(source,{headers:{'User-Agent':userAgent},signal:AbortSignal.timeout(60_000)});if(!response.ok)throw new Error(`Spec fetch failed: HTTP ${response.status}`);spec=object(await response.json());}
 const version=text(at(spec,'info','version'));if(!/^[A-Za-z\d._-]+$/.test(version))throw new Error('Invalid spec version');
 const capabilities=generateCapabilities(spec,object(await Bun.file(resolve(root,'spec/capability-overrides.json')).json()));
 if(args.includes('--check')){const existing=await Bun.file(resolve(root,'spec/capabilities.json')).json() as JsonValue;if(!equivalentJson(existing,capabilities))throw new Error('Capabilities are stale; run bun tools/refresh.ts --spec FILE');console.log('Capabilities match specification and routing overrides.');return;}
 const serialized=JSON.stringify(spec,null,4)+'\n',versionFile=`spec/versions/torn-openapi-${version}.json`;
 await mkdir(resolve(root,'spec/versions'),{recursive:true});
 await Bun.write(resolve(root,versionFile),serialized);await Bun.write(resolve(root,'spec/torn-openapi-current.json'),serialized);
 await Bun.write(resolve(root,'spec/capabilities.json'),JSON.stringify(capabilities,null,4)+'\n');
 await Bun.write(resolve(root,'spec/metadata.json'),JSON.stringify({source_url:source,current_version:version,current_file:'spec/torn-openapi-current.json',version_file:versionFile,sha256:new Bun.CryptoHasher('sha256').update(serialized).digest('hex').toUpperCase(),fetched_at_utc:new Date().toISOString(),user_agent:userAgent},null,4)+'\n');
 console.log(`Refreshed Torn OpenAPI ${version}; run bun tools/generate.ts to update SDK types and operations.`);
}
if(import.meta.main)await refresh();
