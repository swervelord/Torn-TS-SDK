import type { ValidationIssue } from '../src/schema.ts';
import { expect, test } from 'bun:test';
import spec from '../spec/torn-openapi-current.json';
import { decodeModel, validateModel } from '../src/generated/runtime.ts';
import { OpenApi } from '../src/generated/operations.ts';
import { enumValues, isKnownEnumValue, knownEnumValues } from '../src/generated/enums.ts';
import { schemas } from '../src/generated/schema-data.ts';
import { operationAccessLevels, selectionAccessLevels } from '../src/generated/access-levels.ts';
import type { AuctionHouseResponse, FactionHeadlinesResponse, FactionOcHistoryEntry, FactionOcHistoryResponse, FactionRankedWarResponse, KeyInfoResponse, MarketItemHistoryResponse, MarketPointsHistoryResponse, TornHeadlinesResponse, UserAuctionHouseResponse, UserBazaarResponse, UserCriminalRecordResponse, UserDisplayResponse, UserFactionBalanceResponse, UserHonorsDetailedResponse, UserHonorsResponse, UserMedalsDetailedResponse } from '../src/generated/models.ts';
import { selectionModelDefinitions } from '../src/batch-models.ts';
import { FactionOptions, MarketOptions, TornSdk, UserOptions } from '../src/wrapper/index.ts';
import { PlanRequest, RequestPlanner } from '../src/planner.ts';
import { TornClient } from '../src/client.ts';
import { RequestExecutor } from '../src/executor.ts';
import { pageItems } from '../src/pagination.ts';
import { decodeManualModel } from '../src/models/manual-runtime.ts';
import type { MarketAuctionHouseBundle } from '../src/models/manual.ts';
import type { HttpTransport, TransportRequest } from '../src/transport.ts';
import type { JsonValue } from '../src/types.ts';

// Scrubbed live 6.21.0 payloads (ids and names anonymised). faction_headlines, faction_ochistory and
// user_criminalrecord_v1 are built from the spec (the test key has no faction; v1 records are not probeable), and the
// urgent torn headline with a null id/link is synthetic. ochistory role ids use the spec's TornOrganizedCrimePositionId
// strings ("P1".."P6").
const fixture=async<T>(name:string):Promise<T>=>await Bun.file(`${import.meta.dir}/fixtures/api-6210/${name}.json`).json() as T;
const tornHeadlines=await fixture<TornHeadlinesResponse>('torn_headlines');
const factionHeadlines=await fixture<FactionHeadlinesResponse>('faction_headlines');
const ochistory=await fixture<FactionOcHistoryResponse>('faction_ochistory');
const rankedwars=await fixture<FactionRankedWarResponse>('faction_rankedwars');
const keyInfo=await fixture<KeyInfoResponse>('key_info');
const auctionOngoing=await fixture<AuctionHouseResponse>('market_auctionhouse_ongoing');
const itemhistory=await fixture<MarketItemHistoryResponse>('market_itemhistory');
const pointshistory=await fixture<MarketPointsHistoryResponse>('market_pointshistory');
const userAuctions=await fixture<UserAuctionHouseResponse>('user_auctionhouse');
const bazaar=await fixture<UserBazaarResponse>('user_bazaar');
const bazaarEmpty=await fixture<UserBazaarResponse>('user_bazaar_empty');
const recordV1=await fixture<UserCriminalRecordResponse>('user_criminalrecord_v1');
const recordV2=await fixture<UserCriminalRecordResponse>('user_criminalrecord_v2');
const display=await fixture<UserDisplayResponse>('user_display');
const honorsBasic=await fixture<UserHonorsResponse>('user_honors_basic');
const honorsDetailed=await fixture<UserHonorsDetailedResponse>('user_honors_detailed');
const medalsDetailed=await fixture<UserMedalsDetailedResponse>('user_medals_detailed');
const clone=<T>(value:T):T=>structuredClone(value);
const offline=(body:(request:TransportRequest)=>JsonValue)=>{
 const calls:TransportRequest[]=[];
 const transport:HttpTransport={execute:async(request)=>{calls.push(request);return {status:200,body:JSON.stringify(body(request))};}};
 const client=new TornClient(new RequestPlanner(),new RequestExecutor(transport,['offline-test'],{maxAttempts:1}));
 return {calls,client,exact:new OpenApi(client),sdk:new TornSdk(client)};
};
type Get={operationId:string;parameters:({$ref:string}|{name:string})[]};
const op=(path:string)=>(spec.paths as unknown as Record<string,{get:Get}>)[path]!.get;
const keyRef=(path:string)=>op(path).parameters.map(p=>'$ref' in p?p.$ref:'').find(ref=>ref.includes('/ApiKey'));
const known=(name:keyof typeof enumValues):readonly unknown[]=>knownEnumValues(name);
const without=<T extends object>(value:T,key:keyof T)=>{const {[key]:_omitted,...rest}=value;return rest;};

test('6.21.0 spec: new operations, access keys and selection enums',()=>{
 const expected:[string,string,string][]=[
  ['/torn/headlines','getTornHeadlines','ApiKeyPublic'],['/faction/headlines','getMyFactionHeadlines','ApiKeyMinimal'],
  ['/faction/{crimeId}/ochistory','getMyFactionOrganizedCrimeHistory','ApiKeyLimited'],['/market/pointshistory','getMarketPointsHistory','ApiKeyPublic'],
  ['/market/{id}/itemhistory','getMarketItemHistory','ApiKeyPublic'],['/user/auctionhouse','getMyAuctionHouseListings','ApiKeyLimited'],
  ['/user/bazaar','getMyBazaar','ApiKeyLimited'],['/user/display','getMyDisplayCase','ApiKeyPublic'],['/user/{id}/display','getUserDisplayCase','ApiKeyPublic'],
  ['/user/criminalrecord','getMyCriminalRecord','ApiKeyPublic'],['/user/{id}/criminalrecord','getUserCriminalRecord','ApiKeyPublic'],
 ];
 for(const [path,operationId,key] of expected){expect(op(path).operationId).toBe(operationId);expect(keyRef(path)).toBe(`#/components/parameters/${key}`);}
 for(const name of ['TornHeadline','FactionOcHistoryEntry','FactionRankedWarTemplate','MarketHistoryEntry','UserBazaarItemUid','UserCriminalRecordV1','UserHonorsDetailedResponse','UserMedalsDetailedResponse'])expect(schemas[name]).toBeDefined();
 expect(known('TornSelectionNameVariant1')).toContain('headlines');
 for(const name of ['dirtybombs','headlines','inventory','ochistory','warfare'])expect(known('FactionSelectionNameVariant1')).toContain(name);
 for(const name of ['dirtbombs','search'])expect(known('FactionSelectionNameVariant1')).not.toContain(name);
 for(const name of ['itemhistory','pointshistory'])expect(known('MarketSelectionNameVariant1')).toContain(name);
 for(const name of ['auctionhouse','bazaar','criminalrecord','display','itemmods','organizedcrimes','virus'])expect(known('UserSelectionNameVariant1')).toContain(name);
 for(const name of ['factionbalance','itemmod','snapshot'])expect(known('UserSelectionNameVariant1')).not.toContain(name);
 expect(known('CompanySelectionNameVariant1')).not.toContain('snapshot');
 // Selection enums are open (P1.1): retired names still decode and are only flagged by strict validation.
 expect(decodeModel('UserSelectionName','factionbalance')).toBe('factionbalance');
 expect(validateModel('FactionSelectionName','dirtbombs',{mode:'strict'})).toEqual([]);
 expect(validateModel('FactionSelectionNameVariant1','dirtbombs',{mode:'strict'}).length).toBeGreaterThan(0);
 // The UserSelectionName description no longer lists bazaar/display/criminalrecord/networth as v1 fallbacks.
 expect(JSON.stringify(spec.components.schemas.UserSelectionName)).not.toContain('fallback');
});

test('new enums decode every member and stay open to unknown values (P1.1, P1.3)',()=>{
 const members:Record<string,string[]>={
  FactionOcHistoryActionEnum:['Joined','Left','Kicked','RoleChanged','Spawned','ItemUsed','ItemLost','Jailed','Hospitalized','Injured','Completed','Failed','Expired','Payout','PayoutReceived'],
  FactionOcHistoryPayoutTypeEnum:['money','item'],FactionOcHistoryPayoutDestinationEnum:['wallet','balance'],
  TornHeadlineImportance:['normal','urgent'],MarketAuctionHouseCategory:['complete','ongoing'],UserAuctionHouseCategory:['all','ongoing','complete'],
  UserArmouryItemDetailsRarity:['yellow','orange','red'],UserCriminalRecordV1Version:['v1'],UserCriminalRecordV2Version:['v2'],
  UserMedalsCategory:['all','latest','general','attacking','crimes','commitment','rank','level','networth'],
  FactionRankedWarModeVariant1:['Tug of War'],FactionRankedWarRuleVariant1:['Day War','50% Reduced score requirement','Frying Pans'],
 };
 for(const [name,values] of Object.entries(members)){
  expect(known(name as keyof typeof enumValues)).toEqual(values);
  for(const value of values)expect(isKnownEnumValue(name as keyof typeof enumValues,value)).toBe(true);
 }
 for(const value of members.FactionOcHistoryActionEnum!)expect(decodeModel('FactionOcHistoryActionEnum',value)).toBe(value);
 expect(knownEnumValues('UserHonorsCategory')).toContain('crimes');expect(knownEnumValues('UserHonorsCategory')).toHaveLength(20);
 expect(knownEnumValues('UserItemsCategory')).toContain('Melee');expect(knownEnumValues('UserItemsCategory')[0]).toBe('All');
 const warnings:ValidationIssue[]=[];
 expect(validateModel('FactionOcHistoryActionEnum','Cancelled',{warnings})).toEqual([]);
 expect(warnings).toMatchObject([{path:'$',kind:'unknown_enum',value:'Cancelled'}]);
 expect(validateModel('FactionOcHistoryActionEnum','Cancelled',{mode:'strict'}).length).toBeGreaterThan(0);
 expect(validateModel('TornHeadlineImportance','critical',{mode:'strict'}).length).toBeGreaterThan(0);
 // Ranked war mode and rules are open strings: unknown names are valid even in strict mode.
 expect(validateModel('FactionRankedWarMode','King of the Hill',{mode:'strict'})).toEqual([]);
 expect(validateModel('FactionRankedWarRule','Double Respect',{mode:'strict'})).toEqual([]);
});

test('torn/headlines and faction/headlines decode null id/link and urgent importance',()=>{
 expect(decodeModel('TornHeadlinesResponse',tornHeadlines)).toEqual(tornHeadlines);
 expect(decodeModel('FactionHeadlinesResponse',factionHeadlines)).toEqual(factionHeadlines);
 const urgent=tornHeadlines.headlines.find(h=>h.importance==='urgent')!;
 expect(urgent).toMatchObject({id:null,link:null,has_countdown:true});
 expect(tornHeadlines.headlines[0]!.headline).toContain('<b>');
 for(const key of ['id','link','importance','has_countdown'] as const)expect(()=>decodeModel('TornHeadline',without(urgent,key))).toThrow(key);
 expect(()=>decodeModel('TornHeadline',{...urgent,start_at:'now'})).toThrow('integer');
});

test('faction/ochistory maps every action to its details shape and tolerates unknown actions',()=>{
 expect(decodeModel('FactionOcHistoryResponse',ochistory)).toEqual(ochistory);
 const byAction=new Map<string,FactionOcHistoryEntry>(ochistory.ochistory.history.map(entry=>[entry.action,entry]));
 const shapes:Record<string,[string,string[]]>={
  Joined:['FactionOcHistoryRoleDetails',['role']],Kicked:['FactionOcHistoryRoleDetails',['role']],RoleChanged:['FactionOcHistoryRoleChangeDetails',['old_role','new_role']],
  Spawned:['FactionOcHistorySpawnDetails',['scope']],ItemUsed:['FactionOcHistoryItem',['item_id','item_name','quantity']],Jailed:['FactionOcHistoryPunishmentDetails',['reason','duration']],
  Injured:['FactionOcHistoryInjuryDetails',['life_lost']],Payout:['FactionOcHistoryPayoutDetails',['type','destination','percentage','money','items','participants']],
  PayoutReceived:['FactionOcHistoryPayoutReceivedDetails',['type','destination','percentage','money','items','role','crime_id']],
 };
 for(const [action,[schema,keys]] of Object.entries(shapes)){
  const details=byAction.get(action)!.details as Record<string,JsonValue>;
  expect(Object.keys(details).sort(),action).toEqual([...keys].sort());
  expect(decodeModel(schema as 'FactionOcHistoryItem',details),action).toEqual(details as never);
 }
 expect(byAction.get('Completed')!.details).toBeNull();
 expect((byAction.get('Kicked')!.details as {role:{id:string|null}}).role.id).toBeNull();
 expect((byAction.get('Payout')!.details as {destination:string|null;money:number|null}).destination).toBeNull();
 // Unknown future action (entry 9000): tolerant by default (P1.1), reported in strict mode (P1.3).
 const unknown=byAction.get('SomeFutureAction')!;
 expect(decodeModel('FactionOcHistoryEntry',unknown)).toEqual(unknown);
 const strict=validateModel('FactionOcHistoryResponse',ochistory,{mode:'strict'});
 expect(strict).toMatchObject([{kind:'unknown_enum',value:'SomeFutureAction'}]);
 // An unknown action carrying a known details shape, and extra details keys, also decode.
 expect(decodeModel('FactionOcHistoryEntry',{...unknown,details:{life_lost:5,new_key:true}})).toMatchObject({details:{life_lost:5}});
 for(const key of ['action','details','performed_by'] as const)expect(()=>decodeModel('FactionOcHistoryEntry',without(unknown,key))).toThrow(key);
 expect(()=>decodeModel('FactionOcHistoryInjuryDetails',{life_lost:'250'})).toThrow();
});

test('market/itemhistory and pointshistory decode null price and circulation',()=>{
 expect(decodeModel('MarketItemHistoryResponse',itemhistory)).toEqual(itemhistory);
 expect(decodeModel('MarketPointsHistoryResponse',pointshistory)).toEqual(pointshistory);
 expect(itemhistory.itemhistory.at(-1)!.price).toBeNull();
 const entry={timestamp:1795305600,price:null,circulation:null};
 expect(decodeModel('MarketHistoryEntry',entry)).toEqual(entry);
 for(const key of ['timestamp','price','circulation'] as const)expect(()=>decodeModel('MarketHistoryEntry',without(entry,key))).toThrow(key);
 expect(()=>decodeModel('MarketHistoryEntry',{...entry,price:'832389'})).toThrow();
 expect(new URL(itemhistory._metadata.links.prev!).pathname).toBe('/v2/market/206/itemhistory');
});

test('user/criminalrecord decodes the v2 and v1 shapes selected by version',()=>{
 expect(decodeModel('UserCriminalRecordResponse',recordV2)).toEqual(recordV2);
 expect(decodeModel('UserCriminalRecordResponse',recordV1)).toEqual(recordV1);
 expect(recordV2.criminalrecord).toMatchObject({version:'v2',illicit_services:35,total:3797});
 expect(recordV1.criminalrecord).toMatchObject({version:'v1',sell_illegal_goods:12,total:434});
 expect(decodeModel('UserCriminalRecordV2',recordV2.criminalrecord)).toEqual(recordV2.criminalrecord as never);
 expect(()=>decodeModel('UserCriminalRecordV2',recordV1.criminalrecord)).toThrow('vandalism');
 expect(()=>decodeModel('UserCriminalRecordV1',recordV2.criminalrecord)).toThrow('sell_illegal_goods');
 expect(()=>decodeModel('UserCriminalRecordResponse',{criminalrecord:without(recordV2.criminalrecord as {total:number},'total')})).toThrow();
});

test('user/bazaar and user/display decode uid prices, null prices and item details',()=>{
 expect(decodeModel('UserBazaarResponse',bazaar)).toEqual(bazaar);
 expect(decodeModel('UserBazaarResponse',bazaarEmpty)).toEqual(bazaarEmpty);
 expect(bazaarEmpty.bazaar).toEqual({exists:true,is_open:false,items:[]});
 const [stack,knife]=bazaar.bazaar.items;
 expect(stack).toMatchObject({uids:[],price:830000,item_details:null});
 expect(knife!.price).toBeNull();expect(knife!.uids).toEqual([{uid:10000000001,price:950000},{uid:10000000002,price:960000}]);
 expect(knife!.item_details).toMatchObject({stats:{armor:null},bonuses:[],rarity:null});
 expect(()=>decodeModel('UserBazaarItemUid',{uid:10000000001})).toThrow('price');
 expect(()=>decodeModel('UserBazaar',without(bazaar.bazaar,'is_open'))).toThrow('is_open');
 expect(decodeModel('UserDisplayResponse',display)).toEqual(display);
 const weapon=display.display.items.find(item=>item.item_details!==null)!;
 expect(weapon.uids).toEqual([10000000000]);expect(weapon.item_details).toMatchObject({stats:{armor:null},rarity:'yellow'});
 expect(weapon.item_details!.bonuses[0]).toMatchObject({title:'Empower',value:68});
 expect(()=>decodeModel('UserDisplayItem',without(weapon,'circulation'))).toThrow('circulation');
 expect(()=>decodeModel('UserArmouryItemDetails',without(weapon.item_details!,'stats'))).toThrow('stats');
});

test('auction house: user listings with a weapon item and the market ongoing delay fields',()=>{
 expect(decodeModel('UserAuctionHouseResponse',userAuctions)).toEqual(userAuctions);
 expect(userAuctions.auctionhouse[0]!.item).toMatchObject({name:'Swiss Army Knife',type:'Weapon',rarity:'yellow'});
 expect(()=>decodeModel('UserAuctionHouseListing',without(userAuctions.auctionhouse[0]!,'buyer'))).toThrow('buyer');
 expect(decodeModel('AuctionHouseResponse',auctionOngoing)).toEqual(auctionOngoing);
 expect(auctionOngoing).toMatchObject({auctionhouse_timestamp:1795651880,auctionhouse_delay:900});
 // Both fields are optional: completed listings (the default category) omit them.
 const {auctionhouse_timestamp:_timestamp,auctionhouse_delay:_delay,...completed}=auctionOngoing;
 expect(decodeModel('AuctionHouseResponse',completed)).toEqual(completed as never);
 expect(()=>decodeModel('AuctionHouseResponse',{...auctionOngoing,auctionhouse_delay:'900'})).toThrow();
 // The frozen 3.x manual facade model still decodes the ongoing page; its envelope has no `extra`, so the delay
 // fields are only available from the exact operation (getMarketAuctionHouse) or the raw helper.
 const facade=decodeManualModel<MarketAuctionHouseBundle>('MarketAuctionHouseBundle',auctionOngoing);
 expect(facade.auctionhouse).toHaveLength(2);
});

test('honors and medals: the basic shape is unchanged; categories return the detailed shape',()=>{
 expect(decodeModel('UserHonorsResponse',honorsBasic)).toEqual(honorsBasic);
 expect(decodeModel('GetMyHonorsResponse',honorsBasic)).toEqual(honorsBasic);
 expect(decodeModel('UserHonorsDetailedResponse',honorsDetailed)).toEqual(honorsDetailed);
 expect(decodeModel('GetMyHonorsResponse',honorsDetailed)).toEqual(honorsDetailed);
 expect(decodeModel('UserMedalsDetailedResponse',medalsDetailed)).toEqual(medalsDetailed);
 expect(decodeModel('GetMyMedalsResponse',medalsDetailed)).toEqual(medalsDetailed);
 const locked=honorsDetailed.honors.find(h=>!h.is_unlocked)!,unlocked=honorsDetailed.honors.find(h=>h.is_unlocked)!;
 expect(locked).toMatchObject({timestamp:null,progress:{current:5,target:8},is_tracked:true});
 expect(unlocked.progress).toBeNull();expect(typeof unlocked.timestamp).toBe('number');
 expect(medalsDetailed.medals.find(m=>!m.is_unlocked)).toMatchObject({timestamp:null,progress:{current:88,target:90}});
 expect(()=>decodeModel('UserHonorDetailed',without(locked,'is_tracked'))).toThrow('is_tracked');
 expect(()=>decodeModel('UserMedalDetailed',without(medalsDetailed.medals[0]!,'progress'))).toThrow('progress');
 expect(()=>decodeModel('UserHonorsResponse',honorsDetailed)).toThrow();
});

test('key/info access flags and ranked war templates are required (named and null mode)',()=>{
 expect(decodeModel('KeyInfoResponse',keyInfo)).toEqual(keyInfo);
 expect(keyInfo.info.access).toMatchObject({sensitive_data:true,legacy_permissions:false});
 for(const key of ['sensitive_data','legacy_permissions'] as const)expect(()=>decodeModel('KeyInfoResponse',{info:{...keyInfo.info,access:without(keyInfo.info.access,key)}})).toThrow(key);
 expect(decodeModel('FactionRankedWarResponse',rankedwars)).toEqual(rankedwars);
 expect(rankedwars.rankedwars.map(w=>w.template)).toEqual([{mode:'Tug of War',rules:['Day War']},{mode:null,rules:[]}]);
 expect(()=>decodeModel('FactionRankedWar',without(rankedwars.rankedwars[0]!,'template'))).toThrow('template');
 expect(()=>decodeModel('FactionRankedWarTemplate',{mode:null})).toThrow('rules');
});

test('removed user factionbalance keeps its deprecated type, decoder and facade helper',()=>{
 const balance:UserFactionBalanceResponse={factionBalance:{money:1,points:2}};
 expect(decodeModel('UserFactionBalanceResponse',balance)).toEqual(balance);
 expect(enumValues.UserSelectionNameVariant1 as readonly string[]).not.toContain('factionbalance');
 expect(selectionModelDefinitions.user.factionbalance.model).toBe('UserFactionBalanceBundle');
 // Default routing passes the retired name through as a v2 generic selection (P1.5); Torn decides.
 expect(new RequestPlanner().plan(new PlanRequest('user',['factionbalance'])).requests[0]).toMatchObject({path:'/user',query:{selections:'factionbalance'},apiVersion:'v2'});
});

test('planner: new selections use the generic endpoints, combine, and carry access levels',()=>{
 const planner=new RequestPlanner();
 const plan=(resource:string,selections:string[],build:(request:PlanRequest)=>void=()=>{})=>{const request=new PlanRequest(resource,selections);build(request);return planner.plan(request).requests;};
 expect(plan('torn',['headlines','bank'])).toMatchObject([{path:'/torn',strategy:'generic-combined',query:{selections:'headlines,bank'},access:'public'}]);
 expect(plan('faction',['headlines'])).toMatchObject([{path:'/faction',query:{selections:'headlines'},access:'minimal'}]);
 expect(plan('faction',['ochistory'],r=>r.withId('123'))).toMatchObject([{path:'/faction',query:{id:'123',selections:'ochistory'},access:'limited'}]);
 expect(plan('market',['itemhistory'],r=>r.withId('206').withFilter('limit','3').withFilter('sort','ASC'))).toMatchObject([{path:'/market',query:{id:'206',limit:'3',sort:'ASC',selections:'itemhistory'},access:'public'}]);
 expect(plan('market',['pointshistory'])).toMatchObject([{path:'/market',query:{selections:'pointshistory'}}]);
 expect(plan('market',['auctionhouse'],r=>r.withFilter('cat','ongoing'))).toMatchObject([{path:'/market',query:{cat:'ongoing',selections:'auctionhouse'}}]);
 expect(plan('user',['honors'],r=>r.withFilter('cat','crimes'))).toMatchObject([{path:'/user',query:{cat:'crimes',selections:'honors'},access:'minimal'}]);
 expect(plan('user',['display'],r=>r.withFilter('cat','Melee').withFilter('offset','3'))).toMatchObject([{path:'/user',query:{cat:'Melee',offset:'3',selections:'display'},access:'public'}]);
 // bazaar/criminalrecord/display are native v2 now: one combined v2 call in default and legacy routing (no v1 group).
 const native=plan('user',['bazaar','criminalrecord','display','auctionhouse','profile'],r=>r.withId('1'));
 expect(native).toHaveLength(1);
 expect(native[0]).toMatchObject({apiVersion:'v2',path:'/user',strategy:'generic-combined',query:{id:'1',selections:'bazaar,criminalrecord,display,auctionhouse,profile'},access:'limited'});
 expect(new RequestPlanner(undefined,{routing:'legacy'}).plan(new PlanRequest('user',['bazaar'])).requests[0]).toMatchObject({apiVersion:'v2',path:'/user'});
 // Selections Torn added to the enums leave their dedicated endpoints; search left the enum; retired aliases keep their endpoints.
 expect(plan('faction',['dirtybombs','inventory','warfare'],r=>r.withFilter('cat','ranked'))).toMatchObject([{path:'/faction',query:{selections:'dirtybombs,inventory,warfare'}}]);
 expect(plan('faction',['search'])).toMatchObject([{path:'/faction/search',strategy:'direct-endpoint'}]);
 expect(plan('user',['itemmods','organizedcrimes','virus'])).toMatchObject([{path:'/user',query:{selections:'itemmods,organizedcrimes,virus'}}]);
 expect(plan('faction',['dirtbombs'])).toMatchObject([{path:'/faction/dirtybombs',strategy:'direct-endpoint'}]);
 expect(plan('user',['itemmod'])).toMatchObject([{path:'/user/itemmods',strategy:'direct-endpoint'}]);
 for(const [resource,selection,model] of [['torn','headlines','TornHeadlinesResponse'],['faction','headlines','FactionHeadlinesResponse'],['faction','ochistory','FactionOcHistoryResponse'],['market','itemhistory','MarketItemHistoryResponse'],['market','pointshistory','MarketPointsHistoryResponse'],['user','auctionhouse','UserAuctionHouseResponse'],['user','bazaar','UserBazaarResponse'],['user','display','UserDisplayResponse'],['user','criminalrecord','UserCriminalRecordResponse']] as const)
  expect(Reflect.get(selectionModelDefinitions[resource],selection)).toMatchObject({model,manual:false});
});

test('P6 access levels: revives now need a minimal key; new operations follow access-levels.json',()=>{
 for(const resource of ['user','faction'])for(const selection of ['revives','revivesfull'])expect(selectionAccessLevels[resource]![selection]).toBe('minimal');
 expect(operationAccessLevels.getMyRevives).toBe('minimal');expect(operationAccessLevels.getMyFactionRevives).toBe('minimal');
 expect(operationAccessLevels).toMatchObject({getTornHeadlines:'public',getMyFactionHeadlines:'minimal',getMyFactionOrganizedCrimeHistory:'limited',getMarketPointsHistory:'public',getMarketItemHistory:'public',getMyAuctionHouseListings:'limited',getMyBazaar:'limited',getMyDisplayCase:'public',getUserDisplayCase:'public',getMyCriminalRecord:'public',getUserCriminalRecord:'public'});
});

test('exact operations, facades and raw helpers send the documented paths and decode the 6.21.0 fixtures',async()=>{
 const bodies:Record<string,JsonValue>={
  '/torn/headlines':tornHeadlines,'/torn':tornHeadlines,'/faction/headlines':factionHeadlines,'/faction/123/ochistory':ochistory,'/faction':ochistory,
  '/market/pointshistory':pointshistory,'/market/206/itemhistory':itemhistory,'/market/auctionhouse':auctionOngoing,
  '/user/auctionhouse':userAuctions,'/user/bazaar':bazaar,'/user/display':display,'/user/1/display':display,'/user/criminalrecord':recordV2,'/user/1/criminalrecord':recordV1,
  '/user/honors':honorsDetailed,'/user/medals':medalsDetailed,
 };
 const generic:Record<string,JsonValue>={headlines:tornHeadlines,pointshistory,itemhistory,auctionhouse:userAuctions,bazaar,display,criminalrecord:recordV2,honors:honorsDetailed,medals:medalsDetailed};
 const {calls,exact,sdk}=offline(request=>{
  if(request.path==='/market'||request.path==='/user')return Object.assign({},...String(request.query.selections).split(',').map(name=>clone(generic[name]!)));
  if(!(request.path in bodies))throw new Error('unexpected path '+request.path);
  return clone(bodies[request.path]!);
 });
 expect((await exact.getTornHeadlines()).headlines).toHaveLength(3);
 expect((await exact.get_torn_headlines({striptags:'true'})).headlines[2]!.importance).toBe('urgent');
 expect((await exact.getMyFactionHeadlines()).headlines).toHaveLength(2);
 expect((await exact.getMyFactionOrganizedCrimeHistory({crimeId:123})).ochistory.crime_id).toBe(123456);
 expect((await exact.getMarketPointsHistory({limit:3})).pointshistory).toHaveLength(4);
 expect((await exact.getMarketItemHistory({id:206,limit:3,sort:'ASC'})).itemhistory.at(-1)!.price).toBeNull();
 expect((await exact.getMarketAuctionHouse({cat:'ongoing'})).auctionhouse_delay).toBe(900);
 expect((await exact.getMyAuctionHouseListings({cat:'complete'})).auctionhouse).toHaveLength(3);
 expect((await exact.getMyBazaar()).bazaar.is_open).toBe(true);
 expect((await exact.getMyDisplayCase({cat:'Melee',offset:3})).display.items).toHaveLength(3);
 expect((await exact.getUserDisplayCase({id:1})).display.items).toHaveLength(3);
 expect((await exact.getMyCriminalRecord()).criminalrecord.version).toBe('v2');
 expect((await exact.getUserCriminalRecord({id:1})).criminalrecord.version).toBe('v1');
 expect((await exact.getMyHonors({cat:'crimes'})).honors).toHaveLength(4);
 expect((await exact.getMyMedals({cat:'latest'})).medals).toHaveLength(4);
 const exactCalls=calls.length;
 expect(calls.slice(0,exactCalls).map(c=>c.path)).toEqual(['/torn/headlines','/torn/headlines','/faction/headlines','/faction/123/ochistory','/market/pointshistory','/market/206/itemhistory','/market/auctionhouse','/user/auctionhouse','/user/bazaar','/user/display','/user/1/display','/user/criminalrecord','/user/1/criminalrecord','/user/honors','/user/medals']);
 expect(calls[1]!.query).toEqual({striptags:'true'});
 expect(calls[5]!.query).toEqual({limit:'3',sort:'ASC'});
 expect(calls[6]!.query).toEqual({cat:'ongoing'});
 expect(calls[9]!.query).toEqual({cat:'Melee',offset:'3'});
 expect(calls[13]!.query).toEqual({cat:'crimes'});

 // Facades (generic `/resource?selections=` routing) and raw helpers.
 expect((await sdk.torn().headlines()).headlines[2]!.id).toBeNull();
 expect((await sdk.torn().headlinesRaw()).get('headlines')).toEqual(tornHeadlines.headlines);
 expect((await sdk.torn().select(['headlines'])).headlines).toEqual(tornHeadlines.headlines);
 const generic0=calls.length;
 const crime=new FactionOptions().withCrimeId(123);
 expect((await sdk.faction().ochistory(crime)).ochistory.history).toHaveLength(11);
 expect((await sdk.market().pointshistory()).pointshistory[0]!.circulation).toBe(pointshistory.pointshistory[0]!.circulation);
 expect((await sdk.market().itemhistory(206)).itemhistory).toHaveLength(4);
 expect((await sdk.user().auctionhouse()).auctionhouse[0]!.buyer.name).toBe('Player1001');
 expect((await sdk.user().bazaar()).bazaar.items[1]!.uids).toHaveLength(2);
 expect((await sdk.user().display(new UserOptions().withId(1))).display.items[2]!.item_details!.rarity).toBe('yellow');
 expect((await sdk.user().criminalrecord()).criminalrecord.total).toBe(3797);
 const honorsOptions=new UserOptions();
 expect((await sdk.user().honorsDetailed('crimes',honorsOptions)).honors[0]!.progress).toEqual({current:5,target:8});
 expect(honorsOptions.base.cat).toBeUndefined();
 expect((await sdk.user().medalsDetailed('latest')).medals[2]!.timestamp).toBe(1741305512);
 expect((await sdk.user().bazaarRaw()).get('bazaar')).toEqual(bazaar.bazaar);
 expect((await sdk.user().select(['bazaar','display'])).bazaar.is_open).toBe(true);
 expect(calls.slice(generic0).map(c=>[c.path,c.query.selections,c.query.id,c.query.cat])).toEqual([
  ['/faction','ochistory','123',undefined],['/market','pointshistory',undefined,undefined],['/market','itemhistory','206',undefined],
  ['/user','auctionhouse',undefined,undefined],['/user','bazaar',undefined,undefined],['/user','display','1',undefined],['/user','criminalrecord',undefined,undefined],
  ['/user','honors',undefined,'crimes'],['/user','medals',undefined,'latest'],['/user','bazaar',undefined,undefined],['/user','bazaar,display',undefined,undefined],
 ]);
 for(const call of calls)expect(call.query).not.toHaveProperty('key');
});

test('facade validation rejects missing ids and the basic honors category before sending',async()=>{
 const {calls,sdk}=offline(()=>({}));
 await expect(sdk.faction().ochistory()).rejects.toThrow('crimeId');
 await expect(sdk.market().itemhistory()).rejects.toThrow("requires 'id'");
 await expect(sdk.market().itemhistory(new MarketOptions())).rejects.toThrow("requires 'id'");
 await expect(sdk.user().honorsDetailed('all')).rejects.toThrow("other than 'all'");
 await expect(sdk.user().medalsDetailed('')).rejects.toThrow("other than 'all'");
 expect(calls).toHaveLength(0);
});

test('pagers follow itemhistory prev and display next (offset) links and never put the key in the query',async()=>{
 const history=offline(request=>request.query.to?{itemhistory:[],_metadata:{links:{prev:null,next:null}}}:clone(itemhistory));
 const pages:Record<string,string>[]=[];
 for await(const page of history.client.paginate('/market/206/itemhistory',{limit:3},{direction:'prev',apiKey:'offline-test'}))pages.push(page.query);
 expect(history.calls.map(c=>[c.path,c.query])).toEqual([['/market/206/itemhistory',{limit:'3'}],['/market/206/itemhistory',{limit:'3',sort:'desc',to:'1795391999'}]]);
 const cases=offline(request=>request.query.offset?{display:{items:[]},_metadata:{links:{prev:null,next:null}}}:clone(display));
 const items:JsonValue[]=[];
 for await(const item of cases.client.paginateItems('/user/display',{limit:3},{apiKey:'offline-test'}))items.push(item);
 expect(items).toEqual(display.display.items);
 expect(cases.calls[1]!.query).toEqual({limit:'3',cat:'All',offset:'3'});
 for(const call of [...history.calls,...cases.calls]){expect(call.query).not.toHaveProperty('key');expect(call.apiKey).toBe('offline-test');}
 // Wrapped item lists (display/bazaar) are found without naming a field; flat lists are unchanged.
 expect(pageItems(bazaar)).toEqual(bazaar.bazaar.items);
 expect(pageItems(itemhistory)).toEqual(itemhistory.itemhistory);
 expect(pageItems({crime:{items:[1]},other:{items:[2]}})).toEqual([]);
 expect(pages).toHaveLength(2);
});
