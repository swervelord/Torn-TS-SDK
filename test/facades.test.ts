import { describe, expect, test } from "bun:test";
import type { TornClient } from "../src/client.ts";
import type { DataRequestOptions, JsonValue } from "../src/types.ts";
import { TornSdk, BaseOptions, UserOptions, FactionOptions, ForumOptions, MarketOptions, RacingOptions, TornOptions, CompanyOptions, SortOrder, RawSelectionBundle } from "../src/wrapper/index.ts";
import { facadeManifest } from "../src/wrapper/manifest.ts";
import { MANUAL_MODEL_NAMES, decodeManualModel } from "../src/models/manual-runtime.ts";
import type { CompanyNewsBundle, CompanyProfileBundle, UserJobBundle, UserCompetitionBundle, UserTradeTimestamp, UserTimestampBundle } from "../src/models/manual.ts";
import fixtures from "./fixtures/manual-contracts.json";

function harness(initial:JsonValue={}) {
  let value=initial;
  const calls:{resource:string;selections:string[];options:DataRequestOptions}[]=[];
  const client={getResourceData:async(resource:string,selections:Iterable<string>,options:DataRequestOptions={})=>{calls.push({resource,selections:[...selections],options});return {mergedJson:value,calls:[]};},getResourceText:async(resource:string,selections:Iterable<string>,options:DataRequestOptions={})=>{calls.push({resource,selections:[...selections],options});return {body:"id,name\n1,Example\n",calls:[]};}} as unknown as TornClient;
  return {sdk:new TornSdk(client),calls,setValue(next:JsonValue){value=next;}};
}
describe("complete facade surface",()=>{
  test("all nine resources, 210 typed helpers, and 203 raw helpers are available",()=>{
    const {sdk}=harness();let typed=0,raw=0;
    for(const [r,manifest] of Object.entries(facadeManifest)){
      const api=Reflect.get(sdk,r).call(sdk);
      expect(api.supportedSelections).toEqual(manifest.selections);
      for(const {method} of manifest.methods){expect(typeof Reflect.get(api,method),`${r}.${method}`).toBe("function");typed++;}
      for(const [method] of manifest.rawMethods){expect(typeof Reflect.get(api,method),`${r}.${method}`).toBe("function");raw++;}
      for(const selection of manifest.selections){
        expect(manifest.methods.some(m=>m.selection.toLowerCase()===selection.toLowerCase()) || manifest.rawMethods.some(m=>m[1]===selection),`${r}.${selection}`).toBe(true);
      }
    }
    expect(typed).toBe(210);expect(raw).toBe(203);expect(MANUAL_MODEL_NAMES).toHaveLength(549);
  });
  test("builders forward all filters, paths, execution overrides, and legacy selections",()=>{
    const base=new BaseOptions().withId(123).withLimit(100).withFrom(10n).withTo(20n).withOffset(1).withCat("all").withStat("strength").withFilters("online").withSort(SortOrder.Desc).withStriptags(false).withTarget("2").withName("Example").withBonus("3").withIds("4,5").withLog("6").withComment("sdk").withTimestamp("now").withCursor("cursor").withMaxAttempts(2).withRequestTimeout(2500).withRouteId("route").withLegacySelection("inventory").withExtraFilter("limit","50").withExtraPathArg("custom","value");
    expect(base.into_data_request_options()).toEqual({id:"123",filters:{limit:"50",from:"10",to:"20",offset:"1",cat:"all",stat:"strength",filters:"online",sort:"DESC",striptags:"false",target:"2",name:"Example",bonus:"3",ids:"4,5",log:"6",comment:"sdk",timestamp:"now",cursor:"cursor"},pathArgs:{custom:"value"},legacySelections:["inventory"],executionOptions:{maxAttempts:2,requestTimeoutMs:2500,routeId:"route"}});
    expect(new FactionOptions().with_chain_id(1).with_crime_id(2).with_raid_war_id(3).with_ranked_war_id(4).with_territory_war_id(5).intoDataRequestOptions()).toMatchObject({id:"1",pathArgs:{chainId:"1",crimeId:"2",raidWarId:"3",rankedWarId:"4",territoryWarId:"5"}});
    expect(new CompanyOptions().with_type_id(10).with_category("all").with_snapshot_timestamp(123).intoDataRequestOptions()).toMatchObject({pathArgs:{typeId:"10"},filters:{cat:"all",timestamp:"123"}});
    expect(new TornOptions().with_shop_id(3).intoDataRequestOptions()).toMatchObject({id:"3",pathArgs:{shopId:"3"}});
  });
  test("required endpoint parameters and mutually exclusive personal stats filters reject before transport",async()=>{
    const {sdk,calls}=harness();
    await expect(sdk.user().profile()).rejects.toThrow("requires 'id'");
    await expect(sdk.user().crimes()).rejects.toThrow("crimeId");
    await expect(sdk.user().trade()).rejects.toThrow("tradeId");
    await expect(sdk.user().inventory()).rejects.toThrow("query parameter 'cat'");
    await expect(sdk.user().personalstats()).rejects.toThrow("exactly one");
    await expect(sdk.user().personalstats(new UserOptions().withBase(new BaseOptions().withCat("all").withStat("strength")))).rejects.toThrow("exactly one");
    await expect(sdk.faction().search()).rejects.toThrow("name");
    await expect(sdk.faction().news()).rejects.toThrow("cat");
    await expect(sdk.market().properties()).rejects.toThrow("propertyTypeId");
    await expect(sdk.forum().posts()).rejects.toThrow("threadId");
    await expect(sdk.racing().records()).rejects.toThrow("trackId");
    await expect(sdk.torn().items()).rejects.toThrow("ids");
    await expect(sdk.torn().stock()).rejects.toThrow("stockId");
    await expect(sdk.torn().stocks(new TornOptions().withStockId(1))).rejects.toThrow("does not accept stockId");
    await expect(sdk.user().rawSelection("snapshot")).rejects.toThrow("CSV");
    await expect(sdk.user().rawSelections(["fake"])).rejects.toThrow("does not support");
    await expect(sdk.user().money(new UserOptions().withBase(new BaseOptions().withFrom(20).withTo(10)))).rejects.toThrow("'from' <= 'to'");
    expect(calls).toHaveLength(0);
  });
  test("typed helpers, raw aliases, custom caller decoders and CSV dispatch preserve requests",async()=>{
    const {sdk,calls,setValue}=harness({profile:{id:123,name:"Example"}});
    expect((await sdk.user().profile(123)).profile.name).toBe("Example");
    expect(calls[0]).toMatchObject({resource:"user",selections:["profile"],options:{id:"123"}});
    setValue({future:{nested:[1,true]}});
    const raw=await sdk.user().money_raw();expect(raw).toBeInstanceOf(RawSelectionBundle);expect(raw.get("future")).toEqual({nested:[1,true]});expect(JSON.stringify(raw)).toBe('{"future":{"nested":[1,true]}}');
    const result=await sdk.user().typedSelection("money",new UserOptions(),v=>({received:v}));expect(result.received).toEqual({future:{nested:[1,true]}});
    expect(await sdk.company().snapshot()).toBe("id,name\n1,Example\n");
    setValue({companies:[]});await sdk.company().companies(new CompanyOptions().withId(10));expect(calls.at(-1)?.options.pathArgs).toEqual({typeId:"10"});
    setValue({posts:[]});await sdk.forum().posts(new ForumOptions().withThreadId(42));expect(calls.at(-1)?.options).toMatchObject({id:"42",pathArgs:{threadId:"42"}});
    setValue({properties:{}});await sdk.market().properties(new MarketOptions().withPropertyTypeId(7));expect(calls.at(-1)?.options.pathArgs).toEqual({propertyTypeId:"7"});
    setValue({records:[]});await sdk.racing().records(new RacingOptions().withTrackId(6).withBase(new BaseOptions().withCat("D")));expect(calls.at(-1)?.options).toMatchObject({pathArgs:{trackId:"6"},filters:{cat:"D"}});
  });
});
describe("manual compatibility decoding",()=>{
  for(const fixture of fixtures)test(`Model contract: ${fixture.name} (${fixture.model})`,()=>{expect(()=>decodeManualModel(fixture.model,fixture.value as unknown as JsonValue)).not.toThrow();});
  test("default fields, field aliases, flattened extras, company array news and custom position names",()=>{
    const bundle=decodeManualModel<CompanyProfileBundle>("CompanyProfileBundle",{profile:{ID:123,employees:{"5":{position:{name:"Florist"}}},future:{x:1}}});
    expect(bundle.company.id).toBe(123);expect(bundle.company.name).toBeNull();expect(bundle.company.extra.future).toEqual({x:1});
    const news=decodeManualModel<CompanyNewsBundle>("CompanyNewsBundle",{news:[{id:"n1",news:"A"},{timestamp:123,news:"B"},{news:"C"}]});
    expect(Object.keys(news.news)).toEqual(["2","123","n1"]);expect(news.news.n1?.news).toBe("A");
    expect(()=>decodeManualModel("CompanyNewsBundle",{news:42})).toThrow("expected company news");
    expect(()=>decodeManualModel("UserBarsBundle",{})).toThrow("missing required field");
    expect(()=>decodeManualModel("UserTimestampBundle",{timestamp:-1})).toThrow("unsigned");
  });
  test("custom tagged unions retain future variants and normalize known branches",()=>{
    const job=decodeManualModel<UserJobBundle>("UserJobBundle",{job:{type:"company",id:1,name:"Company",future:2}});expect(job.job).toMatchObject({job_type:"company",id:1,extra:{future:2}});
    const unknown=decodeManualModel<UserJobBundle>("UserJobBundle",{job:{type:"future",x:1}});expect(unknown.job).toEqual({job_type:"future",extra:{type:"future",x:1}});
    const competition=decodeManualModel<UserCompetitionBundle>("UserCompetitionBundle",{competition:{name:"Future",x:true}});expect(competition.competition).toEqual({name:"Future",extra:{name:"Future",x:true}});
    expect(decodeManualModel("TradeItem",{user_id:1,type:"Money",details:{amount:123},x:true})).toEqual({user_id:1,details:{amount:123,extra:{}},extra:{x:true}});
    expect(decodeManualModel("TradeItem",{user_id:1,type:"Future",details:{x:true}})).toEqual({user_id:1,item_type:"Future",details:{x:true},extra:{}});
    expect(decodeManualModel<UserTradeTimestamp>("UserTradeTimestamp",false)).toBe(false);
  });
  test("unsigned and signed 64-bit values preserve BigInt without precision loss",()=>{
    const max=(1n<<64n)-1n;expect(decodeManualModel<UserTimestampBundle>("UserTimestampBundle",{timestamp:max}).timestamp).toBe(max);
    expect(()=>decodeManualModel("UserTimestampBundle",{timestamp:max+1n})).toThrow("out of range");
  });
});
