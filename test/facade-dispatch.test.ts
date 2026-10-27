import { describe, expect, test } from "bun:test";
import type { TornClient } from "../src/client.ts";
import { TornSdk, ResourceOptions, BaseOptions, TornOptions, CompanyOptions } from "../src/wrapper/index.ts";
import { MANUAL_MODEL_NAMES } from "../src/models/manual-runtime.ts";
import golden from "../spec/parity/facade-dispatch.json";

type Invocation = {kind:"typed"|"text"|"raw";selection:string;options:ResourceOptions;model?:string;manual?:boolean};
function camel(name:string){return name.replace(/_([a-z])/g,(_,letter:string)=>letter.toUpperCase());}
const sentinel=Object.freeze({dispatch:"sentinel"});

/** The intercept is below each actual public helper body and above shared validation and HTTP.
 * Other suites verify the shared decoder/validation using committed model regression fixtures.
 * This suite verifies the committed public helper to selection/model/alias mapping.
 */
function create(resource:string) {
  const sdk=new TornSdk({} as TornClient);
  const api=Reflect.get(sdk,resource).call(sdk) as object;
  const invocations:Invocation[]=[],stockValidation:boolean[]=[];
  const record=(invocation:Invocation)=>{invocations.push(invocation);return Promise.resolve(sentinel);};
  Object.defineProperty(api,"executeTyped",{value:(selection:string,options:ResourceOptions,model:string,manual:boolean)=>record({kind:"typed",selection,options,model,manual})});
  Object.defineProperty(api,"executeText",{value:(selection:string,options:ResourceOptions)=>record({kind:"text",selection,options})});
  Object.defineProperty(api,"rawSelection",{value:(selection:string,options:ResourceOptions)=>record({kind:"raw",selection,options})});
  Object.defineProperty(api,"validateStockOptions",{value:(_options:TornOptions,single:boolean)=>stockValidation.push(single)});
  return {api,invocations,stockValidation};
}

describe("exhaustive public facade dispatch",()=>{
  test("the reference freezes all 207 typed and 200 raw convenience methods",()=>{
    expect(golden.provenance.kind).toBe("facade-dispatch-regression");
    expect(Object.values(golden.resources).reduce((n,r)=>n+r.methods.length,0)).toBe(207);
    expect(Object.values(golden.resources).reduce((n,r)=>n+r.rawMethods.length,0)).toBe(200);
  });
  for(const [resource,reference] of Object.entries(golden.resources)){
    test(`${resource} options: each path builder, alias, default, initializer and ID precedence`,async()=>{
      const {api,invocations}=create(resource);
      const first=reference.methods[0]!;
      await Reflect.get(api,first.method).call(api);
      const options=invocations.pop()!.options;
      const ctor=options.constructor as {new(value?:object):ResourceOptions;default():ResourceOptions};
      const standard=ctor.default();expect(standard).toBeInstanceOf(ctor);
      expect(standard.intoDataRequestOptions().pathArgs).toEqual({});
      const pathArgs:Record<string,string>={},init:Record<string,string>={};
      for(const [index,field] of reference.options.entries()){
        const value=String(index+100),name=camel(field),setter="with"+name[0]!.toUpperCase()+name.slice(1);
        expect(Reflect.get(standard,setter).call(standard,value)).toBe(standard);
        expect(Reflect.get(standard,field)).toBe(value);
        Reflect.set(standard,field,value+"0");expect(Reflect.get(standard,name)).toBe(value+"0");
        expect(Reflect.get(standard,"with_"+field).call(standard,value)).toBe(standard);
        pathArgs[name]=value;init[name]=value;
      }
      expect(standard.into_data_request_options().pathArgs).toEqual(pathArgs);
      expect(new ctor(init).intoDataRequestOptions().pathArgs).toEqual(pathArgs);
      const snakeInit=Object.fromEntries(reference.options.map(field=>[field,init[camel(field)]!]));
      expect(new ctor(snakeInit).intoDataRequestOptions().pathArgs).toEqual(pathArgs);
      if(reference.options.length)expect(standard.intoDataRequestOptions().id).toBe("100");
      expect(standard.with_id("generic").intoDataRequestOptions()).toMatchObject({id:"generic",pathArgs});
    });
    for(const op of reference.methods){
      test(`${resource}.${op.method}: exact selection, return model, explicit/default options${op.alias?", alias "+op.alias:""}`,async()=>{
        const {api,invocations,stockValidation}=create(resource);
        // Actual resource options constructor is reached through the helper's own default branch.
        const method=Reflect.get(api,op.method) as (options?:ResourceOptions|string|number|bigint)=>Promise<unknown>;
        expect(await method.call(api)).toBe(sentinel);
        const initial=invocations.pop()!;
        expect(initial.options).toBeInstanceOf(ResourceOptions);
        expect(initial.options.constructor.name).toBe(resource[0]!.toUpperCase()+resource.slice(1)+"Options");
        expect(initial.options.base.id).toBeUndefined();
        const expected=op.alias?reference.methods.find(m=>m.method===op.alias)!:op;
        const kind=expected.returnType==="string"?"text":"typed";
        expect(initial).toMatchObject({kind,selection:expected.selection,...(kind==="typed"?{model:expected.returnType,manual:MANUAL_MODEL_NAMES.includes(expected.returnType)}:{})});
        // Reuse resource-specific options, exercise the explicit argument branch, and preserve identity.
        const options=initial.options;
        options.withBase(new BaseOptions().withId("42").withFrom(1).withTo(2).withExtraFilter("custom","value"));
        expect(await method.call(api,options)).toBe(sentinel);
        const explicit=invocations.pop()!;
        expect(explicit.selection).toBe(expected.selection);
        expect(explicit.model).toBe(initial.model);
        expect(explicit.options.base.intoDataRequestOptions()).toMatchObject({id:"42",filters:{from:"1",to:"2",custom:"value"}});
        if(resource==="company"&&op.method==="companies"){
          expect(explicit.options).not.toBe(options);
          expect(explicit.options.base.extraPathArgs).toEqual({typeId:"42"});
          expect(options.base.extraPathArgs).toEqual({});
          options.base.withExtraPathArg("typeId","existing");await method.call(api,options);expect(invocations.pop()?.options.base.extraPathArgs.typeId).toBe("existing");
        }else expect(explicit.options).toBe(options);
        if(op.idArgument){
          for(const id of [123,"456",9007199254740993n]){
            expect(await method.call(api,id)).toBe(sentinel);
            expect(invocations.pop()?.options.base.id).toBe(String(id));
          }
        }
        const alias=camel(op.method);
        if(alias!==op.method){expect(await Reflect.get(api,alias).call(api,options)).toBe(sentinel);expect(invocations.pop()?.selection).toBe(expected.selection);}
        if(resource==="torn"&&["stock","stocks"].includes(op.method))expect(stockValidation).toEqual([op.method==="stock",op.method==="stock"]);
        expect(invocations).toHaveLength(0);
      });
    }
    for(const raw of reference.rawMethods){
      const method=raw[0]!,selection=raw[1]!;
      test(`${resource}.${method}: raw and camel alias dispatch with explicit/default options`,async()=>{
        const {api,invocations}=create(resource);
        const fn=Reflect.get(api,method) as (options?:ResourceOptions)=>Promise<unknown>;
        expect(await fn.call(api)).toBe(sentinel);
        const first=invocations.pop()!;
        expect(first).toMatchObject({kind:"raw",selection});
        expect(first.options.constructor.name).toBe(resource[0]!.toUpperCase()+resource.slice(1)+"Options");
        const options=first.options.withId(42).withBase(new BaseOptions().withId(42).withCat("all"));
        expect(await fn.call(api,options)).toBe(sentinel);
        expect(invocations.pop()).toEqual({kind:"raw",selection,options});
        expect(await Reflect.get(api,camel(method)).call(api,options)).toBe(sentinel);
        expect(invocations.pop()).toEqual({kind:"raw",selection,options});
        expect(invocations).toHaveLength(0);
      });
    }
  }
  test("SDK exposes its client, all resources and OpenAPI through real constructors",()=>{
    const client={} as TornClient,sdk=TornSdk.new(client);expect(sdk.client()).toBe(client);
    expect(sdk.openapi().constructor.name).toBe("OpenApi");
    expect(new CompanyOptions().withTypeId(4).intoDataRequestOptions().pathArgs).toEqual({typeId:"4"});
  });
});
