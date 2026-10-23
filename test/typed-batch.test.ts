import { describe, expect, test } from "bun:test";
import { TornSdk, UserOptions, CompanyOptions, TornOptions, BaseOptions } from "../src/wrapper/index.ts";
import { TornClient } from "../src/client.ts";
import { RequestPlanner } from "../src/planner.ts";
import { RequestExecutor } from "../src/executor.ts";
import type { HttpTransport, TransportRequest, TransportResponse } from "../src/transport.ts";
import { decodeSelectionBatch, selectionModelDefinitions } from "../src/batch.ts";
import capabilities from "../spec/capabilities.json";
import { parseLosslessJson } from "../src/json.ts";

class Transport implements HttpTransport {
  calls:TransportRequest[]=[];
  constructor(private readonly response:(request:TransportRequest,index:number)=>object){}
  async execute(request:TransportRequest):Promise<TransportResponse>{this.calls.push(request);return {status:200,body:JSON.stringify(this.response(request,this.calls.length))};}
}
function sdk(response:(request:TransportRequest,index:number)=>object){
  const transport=new Transport(response);
  const client=new TornClient(new RequestPlanner(),new RequestExecutor(transport,["test-key"],{maxAttempts:1}));
  return {sdk:new TornSdk(client),transport};
}
describe("typed planner batches",()=>{
  test("profile + job are inferred, decoded, and fetched with one combined HTTP request",async()=>{
    const {sdk:api,transport}=sdk(()=>({profile:{id:42,name:"Example",level:10},job:{type:"company",id:123,name:"Business",position:"Director"}}));
    const data=await api.user().select(["profile","job"],new UserOptions().withId(42));
    expect(data.profile.name).toBe("Example");expect(data.profile.level).toBe(10);
    expect(data.job).toMatchObject({job_type:"company",id:123,name:"Business",position:"Director"});
    expect(transport.calls).toHaveLength(1);
    expect(transport.calls[0]?.query.selections?.split(",").sort()).toEqual(["job","profile"]);
  });
  test("report variant exposes actual calls, while separate calls remain independent",async()=>{
    const {sdk:api,transport}=sdk(()=>({profile:{id:42,name:"Example"},job:{type:"job",name:"Army"}}));
    const {data,report}=await api.user().selectWithReport(["profile","job"],new UserOptions().withId(42));
    expect(data.profile.id).toBe(42);expect(report.calls).toHaveLength(1);expect(report.mergedJson).toMatchObject({profile:{id:42},job:{type:"job"}});
    await api.user().profile(42);await api.user().job();expect(transport.calls).toHaveLength(3);
    const snake=await api.user().select_with_report(["job"]);expect(snake.data.job).toMatchObject({job_type:"job"});
  });
  test("standalone selections are split by the same planner and merged into inferred data",async()=>{
    const {sdk:api,transport}=sdk(request=>request.path.endsWith("/search")?{search:[],_metadata:{links:{prev:null,next:null}}}:{profile:{id:42,name:"Example"}});
    const {data,report}=await api.user().selectWithReport(["profile","search"],new UserOptions().withId(42));
    expect(data.profile.name).toBe("Example");expect(data.search).toEqual([]);expect(transport.calls.length).toBeGreaterThan(1);expect(report.calls.length).toBe(transport.calls.length);
  });
  test("incompatible combined selections fall back without losing inferred fields",async()=>{
    const {sdk:api,transport}=sdk((request,index)=>index===1?{error:{code:6,error:"Selections cannot be used together"}}:request.query.selections==="job"||request.path.endsWith("/job")?{job:{type:"job",name:"Army"}}:{profile:{id:42,name:"Example"}});
    const {data,report}=await api.user().selectWithReport(["profile","job"],new UserOptions().withId(42));
    expect(data.profile.name).toBe("Example");expect(data.job).toMatchObject({name:"Army"});expect(transport.calls).toHaveLength(3);expect(report.calls).toHaveLength(2);
  });
  test("CSV and unsupported selections are rejected before HTTP; required options and ranges are validated",async()=>{
    const {sdk:api,transport}=sdk(()=>({}));
    // @ts-expect-error CSV responses cannot form a JSON batch.
    await expect(api.user().select(["snapshot"])).rejects.toThrow("CSV");
    // @ts-expect-error Resource selections are checked statically and at runtime.
    await expect(api.user().select(["not-a-selection"])).rejects.toThrow("not supported");
    await expect(api.user().select(["profile","job"])).rejects.toThrow("requires 'id'");
    await expect(api.user().select(["inventory"])).rejects.toThrow("cat");
    await expect(api.user().select(["job"],new UserOptions().withBase(new BaseOptions().withFrom(2).withTo(1)))).rejects.toThrow("'from' <= 'to'");
    expect(transport.calls).toHaveLength(0);
  });
  test("shared profile envelopes preserve all model fields and defaults",()=>{
    const data=decodeSelectionBatch("user",["basic","profile"],{profile:{id:42,name:"Example",gender:"Male",rank:"Veteran",custom:true}});
    expect(data.profile).toMatchObject({id:42,name:"Example",gender:"Male",rank:"Veteran"});expect(data.profile.extra.custom).toBe(true);
    const reverse=decodeSelectionBatch("user",["profile","basic"],{profile:{id:42,name:"Example",gender:"Male",rank:"Veteran",custom:true}});
    expect(reverse.profile).toEqual(data.profile);
  });
  test("selected envelopes are kept out of each other's flattened extras; unknown fields survive",async()=>{
    const {sdk:api}=sdk(()=>({timestamp:123,selections:["profile","job"],future:{value:true}}));
    const data=await api.user().select(["timestamp","lookup"]);
    expect(data.timestamp).toBe(123);expect(data.selections).toEqual(["profile","job"]);expect(data.extra).toEqual({future:{value:true}});
  });
  test("company custom aliases and methods survive envelope merging",async()=>{
    const {sdk:api}=sdk(()=>({profile:{id:42,name:"Example"},timestamp:123}));
    const data=await api.company().select(["profile","timestamp"],new CompanyOptions().withId(42));
    expect(data.company.name).toBe("Example");expect(data.profile()).toBe(data.company);expect(data.timestamp).toBe(123);expect(Object.keys(data)).not.toContain("profile");
    expect(data.extra).toEqual({});
  });
  test("nested compatibility getters and unknown object keys survive safe merging",()=>{
    const data=decodeSelectionBatch("user",["personalstats","timestamp"],parseLosslessJson('{"personalstats":{"attacking":{"attackswon":42}},"timestamp":123,"__proto__":{"batchUntrusted":true},"constructor":{"custom":true}}'));
    expect(data.timestamp).toBe(123);
    if(!Array.isArray(data.personalstats)&&data.personalstats!==null&&typeof data.personalstats==="object"&&"attacking" in data.personalstats){
      const bucket=data.personalstats.attacking;
      expect(bucket!==null&&typeof bucket==="object"&&"get" in bucket&&typeof bucket.get==="function"?bucket.get("attackswon"):undefined).toBe(42);
    }else throw new Error("expected category personal stats");
    expect(Object.hasOwn(data.extra,"__proto__")).toBe(true);
    expect(Object.entries(data.extra).find(([key])=>key==="constructor")?.[1]).toEqual({custom:true});
    expect(Object.hasOwn(Object.prototype,"batchUntrusted")).toBe(false);
  });
  test("malformed envelopes reject decoding after execution and companies retain the type ID fallback",async()=>{
    const invalid=sdk(()=>({profile:{name:42},job:{type:"job"}}));
    await expect(invalid.sdk.user().select(["profile","job"],new UserOptions().withId(42))).rejects.toThrow("expected string");
    expect(invalid.transport.calls).toHaveLength(1);
    const company=sdk(()=>({companies:[]}));
    await company.sdk.company().select(["companies"],new CompanyOptions().withId(10));
    expect(company.transport.calls[0]?.path).toContain("10");
  });
  test("stock collection and detail use the correct envelope with the same selection",async()=>{
    const {sdk:api}=sdk((_request,index)=>index===2?{stocks:{id:123,name:"Example"}}:{stocks:[]});
    const collection=await api.torn().select(["stocks"]);expect(collection).toEqual({stocks:[]});
    const detail=await api.torn().select(["stocks"],new TornOptions().withStockId(123));expect(detail).toHaveProperty("stock.id",123);
  });
  test("all capability JSON selections and compatible aliases have typed decoder mappings",()=>{
    let count=0;
    for(const [resource,data] of Object.entries(capabilities.resources))for(const selection of data.selections){
      const mapping=Reflect.get(selectionModelDefinitions,resource);
      if(selection.name==="snapshot")expect(mapping[selection.name]).toBeUndefined();
      else {expect(mapping[selection.name],`${resource}.${selection.name}`).toHaveProperty("model");count++;}
    }
    expect(count).toBe(202);expect(selectionModelDefinitions.user.revivesFull.model).toBe("UserRevivesFullBundle");
  });
  test("batch model generator remains deterministic from committed schemas",async()=>{
    const process=Bun.spawn([Bun.which("bun")!,"tools/generate-batch.ts","--check"],{cwd:import.meta.dir+"/..",stdout:"pipe",stderr:"pipe"});
    expect(await process.exited,await new Response(process.stderr).text()).toBe(0);
  });
});
