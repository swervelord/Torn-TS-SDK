import { describe, expect, test } from "bun:test";
import { TornClient } from "../src/client.ts";
import { TornSdk } from "../src/wrapper/index.ts";
import { UserOptions } from "../src/wrapper/options.ts";
import { ApiError, DecodeError } from "../src/errors.ts";
import { operationDefinitions } from "../src/generated/operation-data.ts";
import { OpenApi } from "../src/generated/operations.ts";
import { schemas } from "../src/generated/schema-data.ts";

// Explicit opt-in only (PARITY_SPEC P9.2): TORN_API_KEY, or the legacy TORN_LIVE_TEST_API_KEY. Credentials are read from
// the process and never printed or persisted.
const apiKey=(process.env.TORN_API_KEY??process.env.TORN_LIVE_TEST_API_KEY)?.trim()||undefined;
describe("opt-in live Torn contracts",()=>{
  const live=apiKey?test:test.skip;
  live("generated key info, timestamp, profile and facade decode live responses",async()=>{
    const sdk=new TornSdk(TornClient.withApiKeys([apiKey!],{timeoutMs:15_000}));
    const info=await sdk.openapi().getKeyInfo();
    expect(info.info.user.id).toBeDefined();
    const timestamp=await sdk.openapi().getTornTimestamp();
    expect(Number(timestamp.timestamp)).toBeGreaterThan(1_000_000_000);
    const profile=await sdk.openapi().getUserProfile({id:info.info.user.id});
    expect(typeof profile.profile.name).toBe("string");
    const facade=await sdk.user().profile(String(info.info.user.id));
    expect(facade.profile.name).toBe(profile.profile.name);
    const batch=await sdk.user().selectWithReport(["profile","job"],new UserOptions().withId(info.info.user.id));
    expect(batch.data.profile.name).toBe(profile.profile.name);
    expect(batch.data.job).toBeDefined();
    expect(batch.report.calls).toHaveLength(1);
    expect(batch.report.calls[0]!.apiVersion).toBe("v2");
    expect(batch.report.calls[0]!.query.selections).toBe("profile,job");
  },65_000);
  live("6.15.0 travel inventory and job decode live responses",async()=>{
    // Travel inventory requires a Limited key; job positions include the 6.15.0 casino Dealer member.
    const sdk=new TornSdk(TornClient.withApiKeys([apiKey!],{timeoutMs:15_000}));
    const exact=await sdk.openapi().getMyTravelInventory();
    expect(Number.isInteger(exact.travelinventory.capacity.base)).toBe(true);
    expect(Number.isInteger(exact.travelinventory.capacity.special)).toBe(true);
    for(const slot of exact.travelinventory.inventory)if(slot.item)expect(typeof slot.item.name).toBe("string");
    const facade=await sdk.user().travelinventory();
    expect(facade.travelinventory.capacity).toEqual(exact.travelinventory.capacity);
    const job=await sdk.openapi().getMyJob();
    expect(job).toHaveProperty("job");
    const batch=await sdk.user().selectWithReport(["travelinventory","job"]);
    expect(batch.data.travelinventory.capacity).toEqual(exact.travelinventory.capacity);
    expect(batch.data).toHaveProperty("job");
    expect(batch.report.calls).toHaveLength(1);
    expect(batch.report.calls[0]!.path).toBe("/user");
    expect(batch.report.calls[0]!.query.selections).toBe("travelinventory,job");
  },65_000);
  /**
   * P9.2 live sweep: every typed operation reachable with the key owner's ids (plus public catalog ids such as item 206)
   * is called through `openapi()` and decoded in the default tolerant mode. Decode failures fail the test with their
   * JSON path; API errors (no faction, access level, private data) are logged and counted. Calls are spaced 0.7 s apart
   * and back off 61 s once on code 5 because other tools share the key.
   */
  live("live sweep: every reachable typed operation decodes in tolerant mode",async()=>{
    const client=TornClient.withApiKeys([apiKey!],{maxAttempts:1,timeoutMs:20_000});
    const api=new OpenApi(client);
    const pace=()=>new Promise(resolve=>setTimeout(resolve,700));
    const call=async(camel:string,params:Record<string,unknown>):Promise<unknown>=>{
      for(let attempt=0;;attempt++){
        try{const value=await (Reflect.get(api,camel) as (p:object)=>Promise<unknown>).call(api,params);await pace();return value;}
        catch(error){
          await pace();
          if(error instanceof ApiError&&error.code===5&&attempt===0){console.log(`code 5 on ${camel}; backing off 61 s`);await new Promise(resolve=>setTimeout(resolve,61_000));client.executor.resetKeyStates();continue;}
          throw error;
        }
      }
    };
    const info=await call("getKeyInfo",{}) as {info:{user:{id:number;faction_id:number|null;company_id:number|null}}};
    const owner:Record<string,string>={user:String(info.info.user.id),market:"206"};
    if(info.info.user.faction_id!==null)owner.faction=String(info.info.user.faction_id);
    if(info.info.user.company_id!==null)owner.company=String(info.info.user.company_id);
    const publicIds:Record<string,string>={typeId:"1",propertyTypeId:"13",categoryIds:"2",crimeId:"1",ids:"1",logCategoryId:"1",shopId:"1",stockId:"1",trackId:"6"};
    let decoded=0,apiErrors=0,skipped=0;const failures:string[]=[];
    for(const [id,definition] of Object.entries(operationDefinitions).sort(([,a],[,b])=>a.path.localeCompare(b.path))){
      const resource=definition.path.split("/")[1]!;const params:Record<string,unknown>={};let reason="";
      for(const parameter of definition.parameters){
        if(!(parameter.required||parameter.in==="path"))continue;
        const value=parameter.in==="path"&&parameter.name==="id"?owner[resource]:publicIds[parameter.name];
        if(value===undefined){reason=`needs ${parameter.name}`;break;}
        // Typed parameters: integers as numbers, id lists as arrays (the strict parameter schema is still enforced).
        let schema=parameter.schema as {type?:string;$ref?:string;oneOf?:unknown[]}|undefined;
        while(schema?.$ref)schema=schemas[schema.$ref.split("/").at(-1)!] as typeof schema;
        if(!schema?.type&&schema?.oneOf)schema=(schema.oneOf as {type?:string}[]).find(branch=>branch.type==="array")??schema.oneOf[0] as typeof schema;
        params[parameter.name]=schema?.type==="array"?[Number(value)]:schema?.type==="integer"?Number(value):value;
      }
      if(reason){skipped++;console.log(`skip ${id.padEnd(36)} ${reason}`);continue;}
      try{await call(definition.camel,params);decoded++;}
      catch(error){
        if(error instanceof DecodeError){failures.push(`${id}: ${error.jsonPath} ${error.expected} (got ${error.excerpt})`);continue;}
        if(error instanceof ApiError){apiErrors++;console.log(`api  ${id.padEnd(36)} code ${error.code??error.status}`);continue;}
        failures.push(`${id}: ${error instanceof Error?error.name+" "+error.message:String(error)}`);
      }
    }
    console.log(`live sweep: ${decoded} decoded, ${apiErrors} API errors, ${skipped} skipped, ${failures.length} decode failures`);
    expect(failures).toEqual([]);
    expect(decoded).toBeGreaterThan(100);
  },900_000);
});
