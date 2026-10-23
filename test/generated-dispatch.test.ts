import { describe,expect,test } from 'bun:test';
import { OpenApi } from '../src/generated/operations.ts';
import { operationDefinitions, operationIds, componentSchemaNames } from '../src/generated/operation-data.ts';
import { schemas } from '../src/generated/schema-data.ts';
import { legacySchemas } from '../src/generated/legacy-schema-data.ts';
import { validateModel, validateLegacyModel, decodeModel, decodeLegacyModel } from '../src/generated/runtime.ts';
import type { TornClient } from '../src/client.ts';
import type { ExecutionOptions, RequestPlan, JsonValue } from '../src/types.ts';
import type { HttpTransport } from '../src/transport.ts';
import { sampleSchema } from '../tools/schema-samples.ts';
interface Parameter {name:string;in:string;required?:boolean;schema?:import('../src/schema.ts').Schema;$ref?:string}
interface Operation {operationId:string;parameters?:Parameter[]}
interface Spec {components:{parameters:Record<string,Parameter>};paths:Record<string,{parameters?:Parameter[];get:Operation}>}
const spec=await Bun.file(import.meta.dir+'/../spec/torn-openapi-current.json').json() as Spec;
const exactOperations=new Map(Object.entries(spec.paths).map(([path,item])=>[item.get.operationId,{path,item}]));
const scalar=(v:JsonValue):string=>Array.isArray(v)?v.map(scalar).join(','):String(v);
const encode=(v:string):string=>encodeURIComponent(v).replace(/%2C/gi,',').replace(/[!'()*]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase());

describe('every generated operation executes both naming aliases against its exact spec endpoint',()=>{
 for(const id of operationIds)test(id,async()=>{
  const {path,item}=exactOperations.get(id)!;
  const params:Record<string,JsonValue>={};const parameterList:Parameter[]=[];
  for(let p of [...item.parameters??[],...item.get.parameters??[]]){
   if(p.$ref)p=spec.components.parameters[p.$ref.split('/').at(-1)!]!;
   if(p.name==='key')continue;
   const previous=parameterList.findIndex(x=>x.name===p.name&&x.in===p.in);if(previous>=0)parameterList[previous]=p;else parameterList.push(p);
  }
  for(const p of parameterList)params[p.name]=sampleSchema(p.schema??{},schemas,{nonemptyArrays:true,constraints:true});
  let expectedPath=path;const expectedQuery:Record<string,string>={};
  for(const p of parameterList){const value=scalar(params[p.name]!);if(p.in==='path')expectedPath=expectedPath.replaceAll('{'+p.name+'}',encode(value));else if(p.in==='query')expectedQuery[p.name]=value;}
  const sentinel=new Error('transport sentinel '+id);let observedPlan:RequestPlan|undefined,observedOptions:ExecutionOptions|undefined,observedChannel:string|undefined;
  const client={executePlan:async(plan:RequestPlan,options?:ExecutionOptions)=>{observedPlan=plan;observedOptions=options;observedChannel='json';throw sentinel;},executePlanText:async(plan:RequestPlan,options?:ExecutionOptions)=>{observedPlan=plan;observedOptions=options;observedChannel='text';throw sentinel;}} as unknown as TornClient<HttpTransport>;
  const api=new OpenApi(client),definition=operationDefinitions[id]!;
  const options={maxAttempts:2,requestTimeoutMs:1000,routeId:'test-route',signal:new AbortController().signal};
  for(const alias of new Set([definition.method,definition.camel])){
   const method=Reflect.get(api,alias) as (params:object,options:ExecutionOptions)=>Promise<unknown>;
   await expect(method.call(api,params,options)).rejects.toBe(sentinel);
   expect(observedPlan).toEqual({resource:path.slice(1).split('/')[0]!,requests:[{resource:path.slice(1).split('/')[0]!,path:expectedPath,method:'GET',query:expectedQuery,selections:[],strategy:'direct-endpoint',fallbackSplit:[],apiVersion:'v2'}]});
   expect(observedOptions).toBe(options);expect(observedChannel).toBe(definition.text?'text':'json');
   expect(observedPlan!.requests[0]!.query).not.toHaveProperty('key');
  }
 });
});

describe('every component schema has a representative decodable value',()=>{
 for(const name of componentSchemaNames)test(name,()=>{
  const value=sampleSchema(schemas[name]!,schemas);
  expect(validateModel(name,value)).toEqual([]);
 });
});

interface GeneratedGolden {model:string;input:JsonValue;validation:{ok:boolean;normalized?:JsonValue;error?:string}}
const generatedGolden=await Bun.file(import.meta.dir+'/../spec/parity/generated-model-golden.json').json() as GeneratedGolden[];
describe('all generated model names match committed representative payload expectations',()=>{
 test('the regression fixture covers all 1628 baseline generated model names',()=>{
  expect(generatedGolden).toHaveLength(1628);
  expect(new Set(generatedGolden.map(c=>c.model)).size).toBe(1628);
 });
 for(const c of generatedGolden)test(c.model,()=>{
  expect(legacySchemas[c.model]).toBeDefined();
  expect(validateLegacyModel(c.model,c.input).length===0).toBe(c.validation.ok);
  expect(schemas[c.model]).toBeDefined();
  // 6.13.8 changed the elimination team contract; the frozen 6.13.6 sample requires leaders.
  expect(validateModel(c.model,c.input).length===0).toBe(c.model==='TornEliminationTeam'?false:c.validation.ok);
 });
});


describe('6.13.8 elimination migration preserves an explicit frozen 6.13.6 contract',()=>{
 test('current models require captains while frozen models require leaders',()=>{
  const current=sampleSchema(schemas.TornEliminationTeam!,schemas);
  const legacy=sampleSchema(legacySchemas.TornEliminationTeam!,legacySchemas);
  expect(decodeModel('TornEliminationTeam',current)).toBe(current);
  expect(decodeLegacyModel('TornEliminationTeam',legacy)).toBe(legacy);
  expect(()=>decodeModel('TornEliminationTeam',legacy)).toThrow('captains');
  expect(()=>decodeLegacyModel('TornEliminationTeam',current)).toThrow('leaders');
 });
 test('new error33 is typed in the current union and absent from the frozen union',()=>{
  const error={code:33,error:'No competition available'};
  expect(decodeModel('ApiError',error)).toBe(error);
  expect(()=>decodeLegacyModel('ApiError',error)).toThrow('union variant');
 });
});
