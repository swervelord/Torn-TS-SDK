import type { TornClient } from '../client.ts';
import type { HttpTransport } from '../transport.ts';
import type { ExecutionOptions, RequestPlan } from '../types.ts';
import { DecodeError, ValidationError } from '../errors.ts';
import { validateSchema, type Schema, type ValidationIssue } from '../schema.ts';
import { schemas } from './schema-data.ts';
import { legacySchemas } from './legacy-schema-data.ts';
import { operationDefinitions } from './operation-data.ts';
export interface OperationParameter { [annotation:string]:unknown; name:string; in:string; required?:boolean; schema?:Schema }
export interface OperationDefinition { path:string; parameters:OperationParameter[]; response:string; text:boolean; method:string; camel:string }
export function validateModel(schemaName:string,value:unknown):ValidationIssue[] {
  const schema=schemas[schemaName];
  if(!schema)throw new ValidationError(`Unknown generated schema '${schemaName}'`);
  return validateSchema(schema,value,schemas,{optionalNullable:true});
}
/** Decode an API model using its pinned response schema. No scalar coercion is applied. */
export function decodeModel<T>(schemaName:string,value:unknown):T {
  const issues=validateModel(schemaName,value);
  if(issues.length)throw new DecodeError(`Invalid ${schemaName}: ${issues.slice(0,8).map(i=>`${i.path}: ${i.message}`).join('; ')}`,{schemaName,issues});
  return value as T;
}
/** Validate a frozen 6.13.6 model, independently of the current API schemas. */
export function validateLegacyModel(schemaName:string,value:unknown):ValidationIssue[] {
 const schema=legacySchemas[schemaName];
 if(!schema)throw new ValidationError(`Unknown legacy 6.13.6 schema '${schemaName}'`);
 return validateSchema(schema,value,legacySchemas,{optionalNullable:true});
}
/** Decode the exact original Rust SDK schema contract. Current API operations use decodeModel. */
export function decodeLegacyModel<T>(schemaName:string,value:unknown):T {
 const issues=validateLegacyModel(schemaName,value);
 if(issues.length)throw new DecodeError(`Invalid legacy 6.13.6 ${schemaName}: ${issues.slice(0,8).map(i=>i.path+': '+i.message).join('; ')}`,{schemaName,issues});
 return value as T;
}
function scalar(value:unknown):string {
  if(typeof value==='bigint')return value.toString();
  if(typeof value==='string'||typeof value==='boolean'||(typeof value==='number'&&Number.isFinite(value)))return String(value);
  if(Array.isArray(value))return value.map(v=>{if(Array.isArray(v))throw new ValidationError('Nested parameter arrays are not supported');return scalar(v);}).join(',');
  throw new ValidationError('API parameters must be scalar values or arrays of scalars');
}
/** Build an exact v2 request. Exposed for inspection and deterministic transport tests. */
export function operationPlan(operationId:string,params:object):RequestPlan {
  const def=operationDefinitions[operationId];if(!def)throw new ValidationError(`Unknown operation '${operationId}'`);
  if(params===null||Array.isArray(params)||typeof params!=='object')throw new ValidationError('API parameters must be an object');
  const values=params as Record<string,unknown>;
  // Null optional query parameters are omitted, matching the Rust Option parameter contract.
  const filtered=Object.fromEntries(Object.entries(values).filter(([,v])=>v!==undefined&&v!==null));
  const schema:Schema={type:'object',properties:Object.fromEntries(def.parameters.map(p=>[p.name,p.schema??{}])),required:def.parameters.filter(p=>p.required||p.in==='path').map(p=>p.name),additionalProperties:false};
  const issues=validateSchema(schema,filtered,schemas,{constraints:true});
  if(issues.length)throw new ValidationError(`Invalid ${operationId} parameters: ${issues.map(i=>`${i.path}: ${i.message}`).join('; ')}`,{operationId,issues});
  let path=def.path;const query:Record<string,string>={};
  for(const p of def.parameters){const v=filtered[p.name];if(v===undefined)continue;const encoded=scalar(v);if(p.in==='path'){if(!encoded.length)throw new ValidationError(`Path parameter '${p.name}' must not be empty`);path=path.replaceAll('{'+p.name+'}',encodeURIComponent(encoded).replace(/%2C/gi,',').replace(/[!'()*]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase()));}else if(p.in==='query')query[p.name]=encoded;}
  const resource=def.path.replace(/^\//,'').split('/')[0]!;
  return {resource,requests:[{resource,path,method:'GET',query,selections:[],strategy:'direct-endpoint',fallbackSplit:[],apiVersion:'v2'}]};
}
export async function executeOperation<T>(client:TornClient<HttpTransport>,operationId:string,params:object,options?:ExecutionOptions):Promise<T> {
  const definition=operationDefinitions[operationId];if(!definition)throw new ValidationError(`Unknown operation '${operationId}'`);
  const plan=operationPlan(operationId,params);
  if(definition.text)return (await client.executePlanText(plan,options)).body as T;
  return decodeModel<T>(definition.response,(await client.executePlan(plan,options)).mergedJson);
}
