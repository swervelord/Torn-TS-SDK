import { describe, expect, test } from 'bun:test';
import { OpenApi } from '../src/generated/operations.ts';
import { operationDefinitions, operationIds, componentSchemaNames } from '../src/generated/operation-data.ts';
import { schemas } from '../src/generated/schema-data.ts';
import { decodeModel, operationPlan, validateModel } from '../src/generated/runtime.ts';
import { validateSchema } from '../src/schema.ts';
import type { TornClient } from '../src/client.ts';
import type { RequestPlan } from '../src/types.ts';

describe('complete pinned OpenAPI surface',()=>{
 test('all 724 schemas and 237 operations are exported and both aliases exist',()=>{
  expect(componentSchemaNames).toHaveLength(724);expect(operationIds).toHaveLength(237);
  for(const name of componentSchemaNames)expect(schemas[name]).toBeDefined();
  const api=new OpenApi({} as TornClient);
  for(const id of operationIds){const d=operationDefinitions[id]!;expect(typeof Reflect.get(api,d.method)).toBe('function');expect(typeof Reflect.get(api,d.camel)).toBe('function');}
  expect(Object.values(operationDefinitions).filter(d=>d.text)).toHaveLength(3);
 });
 test('enums and required nullable properties decode without coercion',()=>{
  expect(decodeModel('RaceClassEnum','A')).toBe('A');expect(()=>decodeModel('RaceClassEnum','Z')).toThrow('expected one of');
  const schema={type:'object',required:['value'],properties:{value:{oneOf:[{type:'integer'},{type:'null'}]}}};
  expect(validateSchema(schema,{value:null},{})).toEqual([]);
  expect(validateSchema(schema,{},{})).toHaveLength(1);
  expect(validateSchema(schema,{value:'1'},{})).toHaveLength(1);
 });
 test('union decoding supports overlapping object variants and allOf requirements',()=>{
  expect(validateSchema({oneOf:[{type:'object',required:['id'],properties:{id:{type:'integer'}}},{type:'object',required:['id','name'],properties:{id:{type:'integer'},name:{type:'string'}}}]},{id:1,name:'Torn'},{})).toEqual([]);
  expect(validateSchema({allOf:[{type:'object',required:['id']},{type:'object',required:['name']}]},{id:1},{})).toHaveLength(1);
 });
 test('combined generic selection envelopes validate every selected property',()=>{
  expect(validateModel('GetUserGenericResponse',{discord:{discord_id:'12365',user_id:1}})).toEqual([]);
  expect(validateModel('GetUserGenericResponse',{discord:{discord_id:'12365',user_id:'bad'}}).length).toBeGreaterThan(0);
  expect(validateModel('GetUserGenericResponse',{})).toEqual([]);
 });
 test('unknown log payloads are retained and known fields still validated',()=>{
  const payload={discord:{discord_id:'123',user_id:1},future_field:{nested:[1,'two']}};
  expect(decodeModel('UserDiscordResponse',payload)).toBe(payload);
  expect(()=>decodeModel('UserDiscordResponse',{})).toThrow('required property');
 });
 test('item UID arrays serialize to comma-separated exact paths',()=>{
  const request=operationPlan('getTornItemDetails',{ids:[123,456],comment:'hello world'}).requests[0]!;
  expect(request.path).toBe('/torn/123,456/itemdetails');expect(request.query).toEqual({comment:'hello world'});expect(request.apiVersion).toBe('v2');
  expect(()=>operationPlan('getTornItemDetails',{})).toThrow('required property');
  expect(()=>operationPlan('getTornItemDetails',{ids:[123],key:'do-not-pass'})).toThrow('unknown property');
 });
 test('scalar path escaping and null optional query omission',()=>{
  const p=operationPlan('getUserDiscord',{id:123,comment:null}).requests[0]!;
  expect(p.path).toBe('/user/123/discord');expect(p.query).toEqual({});
 });
 test('CSV methods use text transport and preserve body exactly',async()=>{
  let observed:RequestPlan|undefined;
  const client={executePlanText:async(plan:RequestPlan)=>{observed=plan;return {body:'id,name\n1,Example\n',calls:[]};},executePlan:()=>{throw new Error('JSON path used');}} as unknown as TornClient;
  expect(await new OpenApi(client).getUsersSnapshot()).toBe('id,name\n1,Example\n');
  expect(observed?.requests[0]?.path).toBe('/user/snapshot');
 });
 test('JSON operations reject malformed transport payloads',async()=>{
  const client={executePlan:async()=>({mergedJson:{discord:{user_id:'bad',discord_id:'123'}},calls:[]})} as unknown as TornClient;
  await expect(new OpenApi(client).getUserDiscord({id:1})).rejects.toThrow('Invalid GetUserDiscordResponse');
 });
 test('generator is fresh and pinned provenance is intact',async()=>{
  const proc=Bun.spawn([process.execPath,'tools/generate.ts','--check'],{cwd:import.meta.dir+'/..',stdout:'pipe',stderr:'pipe'});
  const output=await new Response(proc.stderr).text();expect(await proc.exited,output).toBe(0);
 });
});


test('integer models and parameters retain precision beyond Number.MAX_SAFE_INTEGER',()=>{
 const value=9007199254740993n;
 expect(decodeModel('ItemUid',value)).toBe(value);
 expect(operationPlan('getTornItemDetails',{ids:[value,9007199254740995n]}).requests[0]?.path).toBe('/torn/9007199254740993,9007199254740995/itemdetails');
 expect(validateSchema({type:'integer'},9223372036854775807n,{})).toEqual([]);
 expect(validateSchema({type:'integer'},9223372036854775808n,{})).toHaveLength(1);
 expect(validateSchema({type:'integer'},-9223372036854775809n,{})).toHaveLength(1);
 expect(validateSchema({type:'integer',enum:[1,2]},1n,{})).toEqual([]);
 expect(validateSchema({type:'integer',minimum:9007199254740992},9007199254740991n,{}, {constraints:true})).toHaveLength(1);
});

test('capability refresh matches every committed routing entry',async()=>{
 const {generateCapabilities,equivalentJson}=await import('../tools/refresh.ts');
 const spec=await Bun.file(import.meta.dir+'/../spec/torn-openapi-current.json').json();
 const overrides=await Bun.file(import.meta.dir+'/../spec/capability-overrides.json').json();
 const existing=await Bun.file(import.meta.dir+'/../spec/capabilities.json').json();
 expect(equivalentJson(generateCapabilities(spec,overrides),existing)).toBe(true);
 const changed=generateCapabilities(spec,{...overrides,selection_routing_overrides:{user:{discord:{standalone_only:true}}}});
 const user=changed.resources as Record<string,Record<string,unknown>>;
 expect((user.user!.selections as Record<string,unknown>[]).find(s=>s.name==='discord')?.standalone_only).toBe(true);
});

test('optional fields accept explicit null, while required nonnullable fields reject it',()=>{
 expect(validateModel('GetUserGenericResponse',{discord:null})).toEqual([]);
 expect(validateModel('UserDiscordResponse',{discord:null})).not.toEqual([]);
});

test('response decoding ignores upstream closed-object unknown fields, while inputs remain strict',()=>{
 const schema={type:'object',properties:{id:{type:'integer'}},required:['id'],additionalProperties:false};
 expect(validateSchema(schema,{id:1,future:true},{})).toEqual([]);
 expect(validateSchema(schema,{id:1,future:true},{},{constraints:true})).toHaveLength(1);
});
