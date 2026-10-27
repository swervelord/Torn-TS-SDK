import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { Schema } from '../src/schema.ts';
import type { JsonObject, JsonValue } from '../src/types.ts';
import { generateCapabilities, equivalentJson } from './refresh.ts';
interface Parameter { name: string; in: string; required?: boolean; schema?: Schema; $ref?: string }
interface Operation { operationId: string; summary?: string; parameters?: Parameter[]; responses: Record<string,{content:Record<string,{schema?:Schema}>}> }
interface Spec { info:{version:string}; components:{schemas:Record<string,Schema>;parameters:Record<string,Parameter>};paths:Record<string,{parameters?:Parameter[];get:Operation}> }
const root = resolve(import.meta.dir, '..');
const spec = await Bun.file(resolve(root,'spec/torn-openapi-current.json')).json() as Spec;
const metadata = await Bun.file(resolve(root,'spec/metadata.json')).json() as {sha256:string;current_version:string;version_file:string};
const currentBytes = await Bun.file(resolve(root,'spec/torn-openapi-current.json')).bytes();
const actualHash = new Bun.CryptoHasher('sha256').update(currentBytes).digest('hex');
// Git's Windows checkout can normalize JSON line endings. Hash the canonical committed LF form too.
const canonicalHash = new Bun.CryptoHasher('sha256').update(new TextDecoder().decode(currentBytes).replace(/\r\n/g,'\n')).digest('hex');
if (![actualHash,canonicalHash].includes(metadata.sha256.toLowerCase())) throw new Error('Pinned specification provenance hash mismatch');
if (spec.info.version !== metadata.current_version) throw new Error('Pinned specification version mismatch');
const versioned = await Bun.file(resolve(root,metadata.version_file)).text();
if (versioned.replace(/\r\n/g,'\n') !== new TextDecoder().decode(currentBytes).replace(/\r\n/g,'\n')) throw new Error('Versioned specification differs from current snapshot');
const overrides = await Bun.file(resolve(root,'spec/capability-overrides.json')).json() as JsonObject;
const capabilities = generateCapabilities(spec as unknown as JsonObject, overrides);
if(Bun.argv.includes('--check')){ if(!equivalentJson(await Bun.file(resolve(root,'spec/capabilities.json')).json() as JsonValue,capabilities)) throw new Error('Planner capabilities are stale'); } else { await Bun.write(resolve(root,'spec/capabilities.json'),JSON.stringify(capabilities,null,4)+'\n'); }
const baselineSpec = await Bun.file(resolve(root,'spec/versions/torn-openapi-6.13.6.json')).json() as Spec;
const baselineMetadata = await Bun.file(resolve(root,'spec/versions/torn-openapi-6.13.6.metadata.json')).json() as {sha256:string};
const baselineBytes = (await Bun.file(resolve(root,'spec/versions/torn-openapi-6.13.6.json')).text()).replace(/\r\n/g,'\n');
if(new Bun.CryptoHasher('sha256').update(baselineBytes).digest('hex') !== baselineMetadata.sha256.toLowerCase()) throw new Error('Frozen baseline specification provenance mismatch');
function generateSources(spec:Spec):Record<string,string> {
const q = JSON.stringify;
const pascal = (s:string) => s.split(/[^A-Za-z0-9]+/).map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join('');
const snake = (s:string) => s.replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2').replace(/([a-z\d])([A-Z])/g,'$1_$2').replace(/-/g,'_').toLowerCase();
const camel = (s:string) => { const p=pascal(snake(s));return p.charAt(0).toLowerCase()+p.slice(1); };
function type(s:Schema):string {
 let result:string;
 if (s.$ref) result = pascal(s.$ref.split('/').at(-1)!);
 else if (s.const !== undefined) result=q(s.const);
 else if(s.enum) result=s.enum.map(x=>q(x)).join(' | ') || 'never';
 else if(s.oneOf || s.anyOf) result=(s.oneOf ?? s.anyOf)!.map(x=>'('+type(x)+')').join(' | ');
 else if(s.allOf) result=s.allOf.map(x=>'('+type(x)+')').join(' & ');
 else if(Array.isArray(s.type)) result=s.type.map(t=>type({...s,type:t})).join(' | ');
 else if(s.type==='null') result='null';
 else if(s.type==='string') result='string';
 else if(s.type==='integer') result='Integer';
 else if(s.type==='number') result='number';
 else if(s.type==='boolean') result='boolean';
 else if(s.type==='array') result='Array<'+type(s.items ?? {})+'>';
 else if(s.type==='object'||s.properties||s.additionalProperties) {
  // Upstream occasionally requires a property without declaring its schema (e.g. Halloween upgrade type).
  // Keep the required key visible as JSON rather than inventing a narrower type or dropping it.
  const properties:Record<string,Schema>={...s.properties};
  for(const key of s.required??[])properties[key]??={};
  const fields=Object.entries(properties).map(([k,v])=>`${q(k)}${s.required?.includes(k)?'':'?'}: ${type(v)}${s.required?.includes(k)?'':' | null'};`).join(' ');
  const additional=s.additionalProperties;
  if(!fields) result=additional===false?'Record<string, never>':`Record<string, ${typeof additional==='object'?type(additional):'JsonValue'}>`;
  else result=`{ ${fields} }`+(typeof additional==='object'?` & Record<string, ${type(additional)}>`:'');
 } else result='JsonValue';
 return s.nullable && !result.includes('null') ? `(${result}) | null` : result;
}
function deref(s:Schema):Schema {return s.$ref?deref(spec.components.schemas[s.$ref.split('/').at(-1)!]!):s;}
function merged(s:Schema):Schema {s=deref(s);if(!s.allOf)return s;const properties:Record<string,Schema>={...s.properties};const required=new Set(s.required);for(const p of s.allOf){const m=merged(p);Object.assign(properties,m.properties);for(const key of m.required??[])required.add(key);}return {...s,allOf:undefined,type:'object',properties,required:[...required]};}
function responseSchema(s:Schema):Schema {
 if(!s.anyOf)return s;
 const properties:Record<string,Schema>={};
 for(const part of s.anyOf){for(const [key,value] of Object.entries(merged(part).properties??{})){
  const old=properties[key];if(!old)properties[key]=value;else if(q(old)===q(value))continue;
  else if(key==='_metadata'){const a=merged(old),b=merged(value);properties[key]={type:'object',properties:{...a.properties,...b.properties},required:(a.required??[]).filter(k=>b.required?.includes(k))};}
  else {const choices=old.oneOf?[...old.oneOf]:[old];if(!choices.some(c=>q(c)===q(value)))choices.push(value);properties[key]={oneOf:choices};}
 }}
 return {type:'object',properties,required:[]};
}
const header='// Generated by bun run tools/generate.ts from Torn API '+spec.info.version+'. Do not edit.\n';
const modelLines=[header,"import type { Integer, JsonValue } from '../types.ts';",''];
const schemas:Record<string,Schema>={...spec.components.schemas};
for(const [name,s] of Object.entries(spec.components.schemas).sort(([a],[b])=>a.localeCompare(b)))modelLines.push(`export type ${pascal(name)} = ${type(s)};`);
const defs:Record<string,{path:string;parameters:Parameter[];response:string;text:boolean;method:string;camel:string}>={};
for(const [path,item] of Object.entries(spec.paths).sort(([a],[b])=>a.localeCompare(b))){
 const op=item.get,name=pascal(op.operationId);const params:Parameter[]=[];
 for(let p of [...item.parameters??[],...op.parameters??[]]){if(p.$ref)p=spec.components.parameters[p.$ref.split('/').at(-1)!]!;if(p.name==='key')continue;const i=params.findIndex(x=>x.name===p.name&&x.in===p.in);if(i>=0)params[i]=p;else params.push(p);}
 const props:Record<string,Schema>={};for(const p of params){props[p.name]=p.schema??{};schemas[name+pascal(p.name)+'Parameter']=p.schema??{};modelLines.push(`export type ${name}${pascal(p.name)}Parameter = ${type(p.schema??{})};`);}
 const paramSchema:Schema={type:'object',properties:props,required:params.filter(x=>x.required||x.in==='path').map(x=>x.name),additionalProperties:false};schemas[name+'Params']=paramSchema;
 modelLines.push(`export type ${name}Params = ${type(paramSchema)};`);
 const content=op.responses['200']!.content,isText=!!content['text/csv'];const response=responseSchema(content['application/json']?.schema??{type:'string'});schemas[name+'Response']=response;
 modelLines.push(`export type ${name}Response = ${isText?'string':type(response)};`);
 defs[op.operationId]={path,parameters:params,response:name+'Response',text:isText,method:snake(op.operationId),camel:camel(op.operationId)};
}
const pending:Record<string,Schema>={...spec.components.schemas};
function registerInline(input:Schema,name:string):string {
 if(input.$ref)return input.$ref.split('/').at(-1)!;
 let s=input.allOf?merged(input):input;
 let union=s.oneOf??s.anyOf??[];
 if(union.length){const nonnull=union.filter(p=>p.type!=='null');if(nonnull.length!==union.length)return registerInline(nonnull.length===1?nonnull[0]!:{oneOf:nonnull},name);}
 if(s.nullable){s={...s};delete s.nullable;return registerInline(s,name);}
 if(s.enum?.length||union.length||(s.type==='object'&&Object.keys(s.properties??{}).length)){
  let candidate=name,n=2;while(pending[candidate]&&q(pending[candidate])!==q(s))candidate=name+n++;
  pending[candidate]=s;return candidate;
 }
 if(s.type==='array')return registerInline(s.items??{},name+'Item');
 if(s.type==='object')return registerInline(typeof s.additionalProperties==='object'?s.additionalProperties:{},name+'Value');
 return '';
}
function specificity(s:Schema):number {s=merged(s);return s.type==='array'?specificity(s.items??{}):(s.required?.length??0)+Object.keys(s.properties??{}).length/1000;}
for(const [id,d] of Object.entries(defs)){
 const n=pascal(id);for(const p of d.parameters)registerInline(p.schema??{},n+pascal(p.name)+'Parameter');if(!d.text)registerInline(schemas[d.response]!,d.response);
}
const defined=new Set<string>();
while(true){const todo=Object.keys(pending).filter(n=>!defined.has(n)).sort();if(!todo.length)break;for(const name of todo){const s=merged(pending[name]!);defined.add(name);
 if(s.enum?.length)continue;
 const union=[...s.oneOf??s.anyOf??[]];if(union.length){union.sort((a,b)=>specificity(b)-specificity(a));union.forEach((branch,i)=>registerInline(branch,name+'Variant'+(i+1)));}
 else if(s.type==='object'&&Object.keys(s.properties??{}).length){for(const [key,part] of Object.entries(s.properties??{}).sort(([a],[b])=>a.localeCompare(b)))registerInline(part,name+pascal(key));if(s.additionalProperties)registerInline(typeof s.additionalProperties==='object'?s.additionalProperties:{},name+'AdditionalValue');}
 else registerInline(s,name+'Value');
}}
const exported=new Set(modelLines.filter(l=>l.startsWith('export type ')).map(l=>l.split(' ')[2]!));
for(const name of Object.keys(pending).sort())if(!exported.has(pascal(name))){modelLines.push(`export type ${pascal(name)} = ${type(pending[name]!)};`);schemas[name]=pending[name]!;}

const operations=[header,"import type { TornClient } from '../client.ts';","import type { ExecutionOptions } from '../types.ts';","import type { HttpTransport } from '../transport.ts';","import type * as M from './models.ts';","import { executeOperation } from './runtime.ts';",'export class OpenApi {','  constructor(private readonly client: TornClient<HttpTransport>) {}'];
for(const [id,d] of Object.entries(defs)){const n=pascal(id),optional=d.parameters.every(p=>!p.required&&p.in!=='path');const args=`params: M.${n}Params${optional?' = {}':''}, options?: ExecutionOptions`;operations.push(`  /** GET ${d.path} */`,`  ${d.method}(${args}): Promise<M.${n}Response> { return executeOperation<M.${n}Response>(this.client, ${q(id)}, params, options); }`);if(d.method!==d.camel)operations.push(`  ${d.camel}(${args}): Promise<M.${n}Response> { return this.${d.method}(params, options); }`);}
operations.push('}');
const files:Record<string,string>={
 'src/generated/models.ts':modelLines.join('\n')+'\n',
 'src/generated/operations.ts':operations.join('\n')+'\n',
 'src/generated/schema-data.ts':header+"import type { Schema } from '../schema.ts';\n"+`export const schemas: Record<string, Schema> = ${q(schemas)};\n`,
 'src/generated/operation-data.ts':header+"import type { OperationDefinition } from './runtime.ts';\n"+`export const operationDefinitions: Record<string, OperationDefinition> = ${q(defs)};\n`+`export const operationIds = ${q(Object.keys(defs))} as const;\nexport type OperationId = typeof operationIds[number];\nexport const specificationVersion = ${q(spec.info.version)};\nexport const specificationSha256 = ${q(metadata.sha256.toLowerCase())};\nexport const componentSchemaNames = ${q(Object.keys(spec.components.schemas).sort())} as const;\n`,
 'src/generated/index.ts':header+"export * from './models.ts';\nexport * from './operations.ts';\nexport { operationDefinitions, operationIds, componentSchemaNames, specificationVersion, specificationSha256 } from './operation-data.ts';\nexport type { OperationId } from './operation-data.ts';\nexport { decodeModel, validateModel } from './runtime.ts';\n"
};
return files;
}
const files=generateSources(spec),baselineFiles=generateSources(baselineSpec);
files['src/generated/legacy-models.ts']=baselineFiles['src/generated/models.ts']!;
files['src/generated/legacy-schema-data.ts']=baselineFiles['src/generated/schema-data.ts']!.replace('export const schemas:', 'export const legacySchemas:');
const currentNames=new Set([...files['src/generated/models.ts']!.matchAll(/^export type (\w+)/gm)].map(m=>m[1]!));
const oldNames=[...baselineFiles['src/generated/models.ts']!.matchAll(/^export type (\w+)/gm)].map(m=>m[1]!);
const removedNames=oldNames.filter(name=>!currentNames.has(name));
for(const name of removedNames) files['src/generated/models.ts']+=`/** @deprecated Frozen 6.13.6 compatibility name. Use current models or legacy6136Models explicitly. */\nexport type ${name} = import('./legacy-models.ts').${name};\n`;
files['src/generated/schema-data.ts']+=`import { legacySchemas } from './legacy-schema-data.ts';\nexport const compatibilitySchemaNames = ${JSON.stringify(removedNames)} as const;\nfor(const name of compatibilitySchemaNames) schemas[name]=legacySchemas[name]!;\n`;
files['src/generated/index.ts']+="export * as legacy6136Models from './legacy-models.ts';\nexport { decodeLegacyModel, validateLegacyModel } from './runtime.ts';\n";
let stale=false;
for(const [path,source] of Object.entries(files)){const target=resolve(root,path);if(Bun.argv.includes('--check')){if(!await Bun.file(target).exists()||await Bun.file(target).text()!==source){console.error('Stale generated file: '+path);stale=true;}}else{await mkdir(resolve(target,'..'),{recursive:true});await Bun.write(target,source);}}
if(stale)process.exit(1);
console.log(`${Bun.argv.includes('--check')?'Verified':'Generated'} ${Object.keys(spec.components.schemas).length} component schemas, ${Object.keys(spec.paths).length} operations, ${Object.values(spec.paths).filter(x=>!!x.get.responses['200']?.content['text/csv']).length} CSV operations.`);
