import type { TornClient } from '../client.ts';
import type { HttpTransport } from '../transport.ts';
import type { ExecutionOptions, RequestPlan } from '../types.ts';
import { DecodeError, ValidationError } from '../errors.ts';
import { valueExcerpt } from '../redact.ts';
import { validateSchema, type Schema, type ValidationIssue, type ValidationMode } from '../schema.ts';
import { schemas } from './schema-data.ts';
import { legacySchemas } from './legacy-schema-data.ts';
import { operationDefinitions } from './operation-data.ts';
import type { AccessLevel } from './access-levels.ts';
import { operationCacheTtlMs } from './cache-policy.ts';
export interface OperationParameter { [annotation:string]:unknown; name:string; in:string; required?:boolean; schema?:Schema }
export interface OperationDefinition { path:string; parameters:OperationParameter[]; response:string; text:boolean; method:string; camel:string; access:AccessLevel|null; summary:string|null }
export interface ModelValidationOptions {
  /** `tolerant` (default) or `strict` (PARITY_SPEC P1.3). */
  mode?: ValidationMode;
  /** Receives tolerant-mode warnings: unknown enum values, unknown properties, override-relaxed fields. */
  warnings?: ValidationIssue[];
}
export interface DecodeOptions extends ModelValidationOptions {
  /** Operation id or selection named in a DecodeError (PARITY_SPEC P1.4). */
  operation?: string;
  selection?: string;
}
/** Validate a value against a generated schema. Returns the errors; warnings go to `options.warnings`. */
export function validateModel(schemaName:string,value:unknown,options:ModelValidationOptions={}):ValidationIssue[] {
  const schema=schemas[schemaName];
  if(!schema)throw new ValidationError(`Unknown generated schema '${schemaName}'`);
  return validateSchema(schema,value,schemas,{optionalNullable:true,mode:options.mode??'tolerant',...(options.warnings?{warnings:options.warnings}:{})});
}
/** Build a P1.4 decode error: operation/selection, JSON path, expected type, redacted excerpt, and the raw payload. */
export function decodeFailure(label:string,issues:ValidationIssue[],raw:unknown,options:DecodeOptions&{schemaName?:string}={}):DecodeError {
  const first=issues[0];
  const where=[options.operation&&`operation ${options.operation}`,options.selection&&`selection ${options.selection}`].filter(Boolean).join(', ');
  const message=`Invalid ${label}${where?` (${where})`:''}: ${issues.slice(0,8).map(i=>`${i.path}: ${i.message}${i.value!==undefined?` (got ${valueExcerpt(i.value,60)})`:''}`).join('; ')}${issues.length>8?`; ... ${issues.length-8} more`:''}`;
  return new DecodeError(message,{
    ...(options.operation?{operation:options.operation}:{}),...(options.selection?{selection:options.selection}:{}),
    ...(options.schemaName?{schemaName:options.schemaName}:{}),
    ...(first?{jsonPath:first.path,expected:first.message,...(first.value!==undefined?{excerpt:valueExcerpt(first.value)}:{})}:{}),
    issues,raw:raw as never,
  });
}
/** Decode an API model using its pinned response schema. No scalar coercion is applied; tolerant by default. */
export function decodeModel<T>(schemaName:string,value:unknown,options:DecodeOptions={}):T {
  const issues=validateModel(schemaName,value,options);
  if(issues.length)throw decodeFailure(schemaName,issues,value,{...options,schemaName});
  return value as T;
}
/** Decode and return the tolerant-mode warnings (unknown enum values / properties) alongside the value. */
export function decodeModelWithWarnings<T>(schemaName:string,value:unknown,options:Omit<DecodeOptions,'warnings'>={}):{value:T;warnings:ValidationIssue[]} {
  const warnings:ValidationIssue[]=[];
  return {value:decodeModel<T>(schemaName,value,{...options,warnings}),warnings};
}
/** Validate a frozen 6.13.6 model, independently of the current API schemas. */
export function validateLegacyModel(schemaName:string,value:unknown,options:ModelValidationOptions={}):ValidationIssue[] {
 const schema=legacySchemas[schemaName];
 if(!schema)throw new ValidationError(`Unknown legacy 6.13.6 schema '${schemaName}'`);
 return validateSchema(schema,value,legacySchemas,{optionalNullable:true,mode:options.mode??'tolerant',...(options.warnings?{warnings:options.warnings}:{})});
}
/** Decode the frozen 6.13.6 schema contract. Current API operations use decodeModel. */
export function decodeLegacyModel<T>(schemaName:string,value:unknown,options:DecodeOptions={}):T {
 const issues=validateLegacyModel(schemaName,value,options);
 if(issues.length)throw decodeFailure('legacy 6.13.6 '+schemaName,issues,value,{...options,schemaName});
 return value as T;
}
function scalar(value:unknown):string {
  if(typeof value==='bigint')return value.toString();
  if(typeof value==='string'||typeof value==='boolean'||(typeof value==='number'&&Number.isFinite(value)))return String(value);
  if(Array.isArray(value))return value.map(v=>{if(Array.isArray(v))throw new ValidationError('Nested parameter arrays are not supported');return scalar(v);}).join(',');
  throw new ValidationError('API parameters must be scalar values or arrays of scalars');
}
export interface OperationPlanOptions {
  /** `strict` rejects unknown parameters and unknown enum values; `tolerant` (default) forwards them verbatim (PARITY_SPEC P1.5). */
  mode?: ValidationMode;
}
/** Build an exact v2 request. Exposed for inspection and deterministic transport tests. */
export function operationPlan(operationId:string,params:object,options:OperationPlanOptions={}):RequestPlan {
  const def=operationDefinitions[operationId];if(!def)throw new ValidationError(`Unknown operation '${operationId}'`);
  if(params===null||Array.isArray(params)||typeof params!=='object')throw new ValidationError('API parameters must be an object');
  const strict=options.mode==='strict';
  // Null optional query parameters are omitted. PARITY_SPEC P2.1: a `key` never reaches a v2 URL (see executeOperation).
  const filtered=Object.fromEntries(Object.entries(params as Record<string,unknown>).filter(([k,v])=>v!==undefined&&v!==null&&k!=='key'));
  const known=new Set(def.parameters.map(p=>p.name));
  const schema:Schema={type:'object',properties:Object.fromEntries(def.parameters.map(p=>[p.name,p.schema??{}])),required:def.parameters.filter(p=>p.required||p.in==='path').map(p=>p.name),...(strict?{additionalProperties:false}:{})};
  const toValidate=strict?filtered:Object.fromEntries(Object.entries(filtered).filter(([k])=>known.has(k)));
  const issues=validateSchema(schema,toValidate,schemas,{constraints:true,mode:strict?'strict':'tolerant'});
  if(issues.length)throw new ValidationError(`Invalid ${operationId} parameters: ${issues.map(i=>`${i.path}: ${i.message}`).join('; ')}`,{operationId,issues});
  let path=def.path;const query:Record<string,string>={};
  for(const p of def.parameters){const v=filtered[p.name];if(v===undefined)continue;const encoded=scalar(v);if(p.in==='path'){if(!encoded.length)throw new ValidationError(`Path parameter '${p.name}' must not be empty`);path=path.replaceAll('{'+p.name+'}',encodeURIComponent(encoded).replace(/%2C/gi,',').replace(/[!'()*]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase()));}else if(p.in==='query')query[p.name]=encoded;}
  // PARITY_SPEC P1.5: parameters newer than the pinned spec are forwarded verbatim.
  for(const [name,value] of Object.entries(filtered))if(!known.has(name))query[name]=scalar(value);
  const resource=def.path.replace(/^\//,'').split('/')[0]!;
  return {resource,requests:[{resource,path,method:'GET',query,selections:[],strategy:'direct-endpoint',fallbackSplit:[],apiVersion:'v2',operation:operationId,...(def.access?{access:def.access}:{}),...(operationCacheTtlMs[operationId]!==undefined?{cacheTtlMs:operationCacheTtlMs[operationId]}:{})}]};
}
/** The client's configured decode mode (`tolerant` unless configured `strict`). */
export function clientValidationMode(client:{executor?:{config?:{validation?:ValidationMode}}}):ValidationMode {return client.executor?.config?.validation??'tolerant';}
export async function executeOperation<T>(client:TornClient<HttpTransport>,operationId:string,params:object,options?:ExecutionOptions):Promise<T> {
  const definition=operationDefinitions[operationId];if(!definition)throw new ValidationError(`Unknown operation '${operationId}'`);
  const mode=clientValidationMode(client);
  const plan=operationPlan(operationId,params,{mode});
  // PARITY_SPEC P2.1: a caller-supplied `key` is moved to the Authorization header of this request.
  const key=(params as {key?:unknown}).key;
  const execution=typeof key==='string'&&key?{...options,apiKey:key}:options;
  if(definition.text)return (await client.executePlanText(plan,execution)).body as T;
  return decodeModel<T>(definition.response,(await client.executePlan(plan,execution)).mergedJson,{mode,operation:operationId});
}
