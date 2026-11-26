import { describe, expect, test } from "bun:test";
import { TornClient } from "../src/client.ts";
import { TornSdk } from "../src/wrapper/index.ts";
import { BaseOptions, FactionOptions, MarketOptions, UserOptions } from "../src/wrapper/options.ts";
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
  live("6.15.7 gym unlocked_gyms, calendar bounds and available races decode live responses",async()=>{
    // Calls are spaced 0.7 s apart and back off 61 s once on code 5 because other tools share the key.
    const sdk=new TornSdk(TornClient.withApiKeys([apiKey!],{maxAttempts:1,timeoutMs:15_000}));
    const paced=async<T>(run:()=>Promise<T>):Promise<T>=>{
      for(let attempt=0;;attempt++){
        await new Promise(resolve=>setTimeout(resolve,700));
        try{return await run();}
        catch(error){
          if(error instanceof ApiError&&error.code===5&&attempt===0){await new Promise(resolve=>setTimeout(resolve,61_000));sdk.client().executor.resetKeyStates();continue;}
          throw error;
        }
      }
    };
    const gym=await paced(()=>sdk.openapi().getMyGym());
    expect(gym.gym.unlocked_gyms.length).toBeGreaterThan(0);
    for(const unlocked of gym.gym.unlocked_gyms){expect(Number.isInteger(unlocked.id)).toBe(true);expect(typeof unlocked.available).toBe("boolean");}
    const facadeGym=await paced(()=>sdk.user().gym());
    expect(facadeGym.gym.unlocked_gyms.length).toBe(gym.gym.unlocked_gyms.length);
    const batch=await paced(()=>sdk.user().selectWithReport(["gym","bars"]));
    expect(batch.data.gym.unlocked_gyms.length).toBe(gym.gym.unlocked_gyms.length);
    expect(batch.data).toHaveProperty("bars");
    expect(batch.report.calls).toHaveLength(1);
    expect(batch.report.calls[0]!.path).toBe("/user");
    expect(batch.report.calls[0]!.query.selections).toBe("gym,bars");
    const calendar=await paced(()=>sdk.openapi().getTornCalendar());
    for(const activity of [...calendar.calendar.competitions,...calendar.calendar.events]){
      expect(Number.isInteger(activity.earliest_start)).toBe(true);
      expect(Number.isInteger(activity.latest_end)).toBe(true);
      expect(typeof activity.fixed_start_time).toBe("boolean");
    }
    const races=await paced(()=>sdk.openapi().getRacingRaces({cat:"available",limit:10}));
    for(const race of races.races)expect(race.schedule.end).toBeNull();
  },200_000);
  live("6.21.0 headlines, market history, auction house, bazaar, display, criminal record and honor categories decode live responses",async()=>{
    // Read-only; response data is asserted on, never printed or persisted. Spaced 0.7 s apart, one 61 s backoff on code 5.
    const sdk=new TornSdk(TornClient.withApiKeys([apiKey!],{maxAttempts:1,timeoutMs:15_000}));
    const paced=async<T>(run:()=>Promise<T>):Promise<T>=>{
      for(let attempt=0;;attempt++){
        await new Promise(resolve=>setTimeout(resolve,700));
        try{return await run();}
        catch(error){
          if(error instanceof ApiError&&error.code===5&&attempt===0){await new Promise(resolve=>setTimeout(resolve,61_000));sdk.client().executor.resetKeyStates();continue;}
          throw error;
        }
      }
    };
    const info=await paced(()=>sdk.openapi().getKeyInfo());
    expect(typeof info.info.access.sensitive_data).toBe("boolean");
    expect(typeof info.info.access.legacy_permissions).toBe("boolean");
    const headlines=await paced(()=>sdk.openapi().getTornHeadlines());
    for(const headline of headlines.headlines){expect(typeof headline.headline).toBe("string");expect(typeof headline.has_countdown).toBe("boolean");}
    const facadeHeadlines=await paced(()=>sdk.torn().headlines());
    expect(Array.isArray(facadeHeadlines.headlines)).toBe(true);
    const points=await paced(()=>sdk.openapi().getMarketPointsHistory({limit:3}));
    expect(points.pointshistory.length).toBeGreaterThan(0);
    const history=await paced(()=>sdk.openapi().getMarketItemHistory({id:206,limit:3}));
    expect(history.itemhistory.length).toBeGreaterThan(0);
    for(const entry of history.itemhistory)expect(Number.isInteger(entry.timestamp)).toBe(true);
    const facadeHistory=await paced(()=>sdk.market().itemhistory(new MarketOptions().withBase(new BaseOptions().withId(206).withLimit(3))));
    expect(facadeHistory.itemhistory.length).toBeGreaterThan(0);
    const ongoing=await paced(()=>sdk.openapi().getMarketAuctionHouse({cat:"ongoing",limit:2}));
    expect(Number.isInteger(ongoing.auctionhouse_delay)).toBe(true);
    const record=await paced(()=>sdk.openapi().getMyCriminalRecord());
    expect(["v1","v2"]).toContain(record.criminalrecord.version);
    const otherRecord=await paced(()=>sdk.user().criminalrecord(1));
    expect(Number.isInteger(otherRecord.criminalrecord.total)).toBe(true);
    const caseItems=await paced(()=>sdk.openapi().getMyDisplayCase({limit:3}));
    expect(Array.isArray(caseItems.display.items)).toBe(true);
    const auctions=await paced(()=>sdk.user().auctionhouse());
    expect(Array.isArray(auctions.auctionhouse)).toBe(true);
    const honors=await paced(()=>sdk.user().honorsDetailed("latest"));
    for(const honor of honors.honors){expect(typeof honor.name).toBe("string");expect(typeof honor.is_unlocked).toBe("boolean");}
    const medals=await paced(()=>sdk.openapi().getMyMedals({cat:"latest"}));
    expect(medals.medals.length).toBeGreaterThanOrEqual(0);
    // bazaar, display and criminalrecord are native v2 selections: one combined /user call with an existing selection.
    const batch=await paced(()=>sdk.user().selectWithReport(["bazaar","display","criminalrecord","bars"]));
    expect(typeof batch.data.bazaar.is_open).toBe("boolean");
    expect(Array.isArray(batch.data.display.items)).toBe(true);
    expect(batch.data.criminalrecord.total).toBe(record.criminalrecord.total);
    expect(batch.data).toHaveProperty("bars");
    expect(batch.report.calls).toHaveLength(1);
    expect(batch.report.calls[0]!.path).toBe("/user");
    expect(batch.report.calls[0]!.apiVersion).toBe("v2");
    expect(batch.report.calls[0]!.query.selections).toBe("bazaar,display,criminalrecord,bars");
  },300_000);
  live("6.21.0 faction headlines and organized crime history decode live responses (code 7 without a faction)",async()=>{
    const sdk=new TornSdk(TornClient.withApiKeys([apiKey!],{maxAttempts:1,timeoutMs:15_000}));
    const noFaction=(error:unknown)=>error instanceof ApiError&&error.code===7;
    await new Promise(resolve=>setTimeout(resolve,700));
    let headlines;
    try{headlines=await sdk.faction().headlines();}
    catch(error){if(noFaction(error))return;throw error;}
    expect(Array.isArray(headlines.headlines)).toBe(true);
    await new Promise(resolve=>setTimeout(resolve,700));
    const crimes=await sdk.openapi().getMyFactionOrganizedCrimes({cat:"completed",limit:1});
    const crime=crimes.crimes[0];
    if(!crime)return;
    await new Promise(resolve=>setTimeout(resolve,700));
    try{
      const history=await sdk.faction().ochistory(new FactionOptions().withCrimeId(crime.id));
      expect(history.ochistory.crime_id).toBe(crime.id);
    }catch(error){if(noFaction(error))return;throw error;}
  },120_000);
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
