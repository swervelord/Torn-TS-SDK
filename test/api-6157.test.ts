import type { ValidationIssue } from '../src/schema.ts';
import { expect, test } from 'bun:test';
import spec from '../spec/torn-openapi-current.json';
import { decodeModel, validateModel } from '../src/generated/runtime.ts';
import { OpenApi } from '../src/generated/operations.ts';
import { enumValues, isKnownEnumValue, knownEnumValues } from '../src/generated/enums.ts';
import { schemas } from '../src/generated/schema-data.ts';
import type { AttackLogResponse, CompanySearchParameter, GetRacingRacesParams, ReportsResponse, ReportStockAnalysis, TornCalendarResponse, UserGymResponse, UserLogsResponse } from '../src/generated/models.ts';
import { selectionModelDefinitions } from '../src/batch-models.ts';
import { RacingOptions, TornSdk } from '../src/wrapper/index.ts';
import { PlanRequest, RequestPlanner } from '../src/planner.ts';
import { TornClient } from '../src/client.ts';
import { RequestExecutor } from '../src/executor.ts';
import type { HttpTransport, TransportRequest } from '../src/transport.ts';
import type { JsonValue } from '../src/types.ts';

// Scrubbed live 6.15.7 payloads (ids and names anonymised); the stock analysis report is built from the spec (not probeable live).
const fixture=async<T>(name:string):Promise<T>=>await Bun.file(`${import.meta.dir}/fixtures/api-6157/${name}.json`).json() as T;
const gym=await fixture<UserGymResponse>('user_gym');
const calendar=await fixture<TornCalendarResponse>('torn_calendar');
const races=await fixture<JsonValue>('racing_races_available');
const attacklog=await fixture<AttackLogResponse>('torn_attacklog');
const logs=await fixture<UserLogsResponse>('user_log');
const reports=await fixture<ReportsResponse>('faction_reports_stockanalysis');
const clone=<T>(value:T):T=>structuredClone(value);
const offline=(body:(request:TransportRequest)=>JsonValue)=>{
 const calls:TransportRequest[]=[];
 const transport:HttpTransport={execute:async(request)=>{calls.push(request);return {status:200,body:JSON.stringify(body(request))};}};
 const client=new TornClient(new RequestPlanner(),new RequestExecutor(transport,['offline-test'],{maxAttempts:1}));
 return {calls,client,exact:new OpenApi(client),sdk:new TornSdk(client)};
};

test('6.15.7 spec: new schemas, racing category enum, inclusive user/log bounds and simple-style id paths',()=>{
 for(const name of ['UserUnlockedGym','AttackLogAttacker','AttackLogDefender','AttackLogItem','RacingRacesCategoryEnum'])expect(schemas[name]).toBeDefined();
 const cat=spec.paths['/racing/races'].get.parameters.find(p=>'name' in p&&p.name==='cat') as {schema:{$ref:string}};
 expect(cat.schema.$ref).toBe('#/components/schemas/RacingRacesCategoryEnum');
 expect(spec.paths['/user/log'].get.parameters).toContainEqual({$ref:'#/components/parameters/ApiFromLog'});
 expect(spec.paths['/user/log'].get.parameters).toContainEqual({$ref:'#/components/parameters/ApiToLog'});
 const ids=spec.paths['/torn/{ids}/items'].get.parameters.find(p=>'name' in p&&p.name==='ids') as {style:string;explode?:boolean};
 expect(ids.style).toBe('simple');expect(ids.explode).toBeUndefined();
 // RacingRaceTypeEnum is still used by /user/races and stays exported.
 expect(knownEnumValues('RacingRaceTypeEnum')).toEqual(['official','custom']);
});

test('RacingRacesCategoryEnum knows official, custom and available; unknown members stay tolerant (P1.1, P1.3)',()=>{
 expect(knownEnumValues('RacingRacesCategoryEnum')).toEqual(['official','custom','available']);
 for(const value of ['official','custom','available']){
  expect(decodeModel('RacingRacesCategoryEnum',value)).toBe(value);
  expect(isKnownEnumValue('RacingRacesCategoryEnum',value)).toBe(true);
 }
 const warnings:ValidationIssue[]=[];
 expect(validateModel('RacingRacesCategoryEnum','upcoming',{warnings})).toEqual([]);
 expect(warnings).toMatchObject([{path:'$',kind:'unknown_enum',value:'upcoming'}]);
 expect(validateModel('RacingRacesCategoryEnum','upcoming',{mode:'strict'}).length).toBeGreaterThan(0);
 const params:GetRacingRacesParams={cat:'available',limit:5};
 expect(params.cat).toBe('available');
});

test('schemas removed in 6.15.7 keep deprecated type aliases, enum entries and decoders',()=>{
 const filter:CompanySearchParameter='recruiting';
 expect(decodeModel('CompanySearchParameter',filter)).toBe('recruiting');
 expect(decodeModel('UserSearchParameter','traveling')).toBe('traveling');
 expect(decodeModel('Parameters','destroyed')).toBe('destroyed');
 expect(enumValues.CompanySearchParameterVariant1).toEqual(['recruiting','notRecruiting']);
 expect(knownEnumValues('ParametersVariant1')).toContain('notDestroyed');
 expect(isKnownEnumValue('UserSearchParameterVariant1','married')).toBe(true);
});

test('user/gym decodes unlocked_gyms including unavailable gyms',()=>{
 expect(decodeModel('UserGymResponse',gym)).toEqual(gym);
 expect(gym.gym.unlocked_gyms.length).toBeGreaterThan(0);
 expect(gym.gym.unlocked_gyms.some(g=>!g.available)).toBe(true);
 expect(()=>decodeModel('UserGymResponse',{gym:{id:26,name:'Frontline Fitness'}})).toThrow('unlocked_gyms');
 expect(()=>decodeModel('UserUnlockedGym',{id:1,name:'Premier Fitness'})).toThrow('available');
 expect(()=>decodeModel('UserUnlockedGym',{id:1,name:'Premier Fitness',available:'yes'})).toThrow();
});

test('torn/calendar decodes earliest_start, latest_end and the now-required fixed_start_time',()=>{
 expect(decodeModel('TornCalendarResponse',calendar)).toEqual(calendar);
 for(const activity of [...calendar.calendar.competitions,...calendar.calendar.events]){
  expect(typeof activity.earliest_start).toBe('number');expect(typeof activity.latest_end).toBe('number');expect(typeof activity.fixed_start_time).toBe('boolean');
 }
 const activity=calendar.calendar.events[0]!;
 for(const key of ['earliest_start','latest_end','fixed_start_time'] as const){
  const {[key]:_omitted,...rest}=activity;
  expect(()=>decodeModel('TornCalendarActivity',rest)).toThrow(key);
 }
 expect(()=>decodeModel('TornCalendarActivity',{...activity,earliest_start:'soon'})).toThrow('integer');
});

test('racing/races cat=available decodes open races with a null schedule end',()=>{
 expect(decodeModel('RacingRacesResponse',races)).toEqual(races);
 const list=(races as {races:{status:string;schedule:{end:number|null}}[]}).races;
 expect(list.length).toBeGreaterThan(0);
 for(const race of list){expect(race.status).toBe('open');expect(race.schedule.end).toBeNull();}
});

test('torn/attacklog decodes named attacker/defender/item schemas and the all-null stealthed entry',()=>{
 expect(decodeModel('AttackLogResponse',attacklog)).toEqual(attacklog);
 const stealthed=attacklog.attacklog.log.at(-1)!;
 expect(stealthed).toMatchObject({attacker:null,defender:null,attacker_item:null});
 const hit=attacklog.attacklog.log.find(entry=>entry.attacker?.item?.name==='Cobra Derringer')!;
 expect(decodeModel('AttackLogAttacker',hit.attacker)).toEqual(hit.attacker);
 expect(decodeModel('AttackLogDefender',hit.defender)).toEqual(hit.defender);
 expect(decodeModel('AttackLogItem',hit.attacker!.item)).toEqual({id:177,name:'Cobra Derringer'});
 expect(decodeModel('AttackLogAttacker',{id:1,name:'A',item:null})).toEqual({id:1,name:'A',item:null});
 expect(()=>decodeModel('AttackLogAttacker',{id:1,name:'A'})).toThrow('item');
 expect(()=>decodeModel('AttackLogItem',{id:177})).toThrow('name');
 expect(()=>decodeModel('AttackLog',{...stealthed,attacker_item:{id:'177',name:'Cobra Derringer'}})).toThrow();
});

test('user/log keeps _metadata.nanostamp as the paging cursor',()=>{
 expect(decodeModel('UserLogsResponse',logs)).toEqual(logs);
 expect(logs._metadata.nanostamp).toBe('1794235873988461998');
 expect(new URL(logs._metadata.links.prev!).searchParams.get('nanostamp')).toBe(logs._metadata.nanostamp!);
 expect(()=>decodeModel('RequestMetadataWithLinksAndNanostamp',{links:logs._metadata.links,nanostamp:1794235873988461998})).toThrow();
});

test('faction/reports stock analysis decodes restock_timestamp (null and set) and item stock',()=>{
 expect(decodeModel('ReportsResponse',reports)).toEqual(reports);
 const analysis=reports.reports[0]!.report as ReportStockAnalysis;
 expect(analysis.items.map(i=>i.restock_timestamp)).toEqual([null,1794231200]);
 expect(analysis.items.map(i=>i.item.stock)).toEqual([412,0]);
 const {restock_timestamp:_restock,...withoutRestock}=analysis.items[0]!;
 expect(()=>decodeModel('ReportStockAnalysis',{items:[withoutRestock]})).toThrow('restock_timestamp');
 expect(()=>decodeModel('ReportStockAnalysis',{items:[{...analysis.items[0]!,item:{...analysis.items[0]!.item,stock:'412'}}]})).toThrow('integer');
});

test('planner: multi-id torn items stay comma-joined and racing races carries cat=available',()=>{
 const planner=new RequestPlanner();
 const itemsRequest=new PlanRequest('torn',['items']);itemsRequest.id='1,2';
 expect(planner.plan(itemsRequest).requests[0]).toMatchObject({path:'/torn',query:{id:'1,2',selections:'items'}});
 const racesRequest=new PlanRequest('racing',['races']);racesRequest.filters={cat:'available'};
 expect(planner.plan(racesRequest).requests[0]).toMatchObject({path:'/racing',query:{cat:'available',selections:'races'}});
 expect(selectionModelDefinitions.user.gym).toEqual({model:'UserGymResponse',manual:false,inputRoots:['gym']});
});

test('exact operations and facades send the documented paths and decode the 6.15.7 fixtures',async()=>{
 const bodies:Record<string,JsonValue>={'/user/gym':gym,'/user':gym,'/torn/calendar':calendar,'/torn':calendar,'/racing':races,'/racing/races':races,'/torn/attacklog':attacklog,'/torn/1,2/items':{items:[]},'/faction/reports':reports};
 const {calls,exact,sdk}=offline(request=>{if(!(request.path in bodies))throw new Error('unexpected path '+request.path);return clone(bodies[request.path]!);});
 expect((await exact.getMyGym()).gym.unlocked_gyms[0]).toEqual({id:1,name:'Premier Fitness',available:true});
 expect((await exact.get_my_gym()).gym.unlocked_gyms).toHaveLength(gym.gym.unlocked_gyms.length);
 expect((await sdk.user().gym()).gym.unlocked_gyms.at(-1)!.available).toBe(false);
 expect((await sdk.user().gymRaw()).get('gym')).toEqual(gym.gym);
 expect((await sdk.user().select(['gym'])).gym.unlocked_gyms).toEqual(gym.gym.unlocked_gyms);
 expect((await exact.getTornCalendar()).calendar.events[0]!.earliest_start).toBe(calendar.calendar.events[0]!.earliest_start);
 // Manual 6.13.6 facade models keep fields added later in `extra` (never dropped).
 const facadeCalendar=await sdk.torn().calendar();
 const facadeRaces=await sdk.racing().races(new RacingOptions({base:{cat:'available'}}));
 expect(facadeRaces.races.every(r=>r.schedule?.end===null)).toBe(true);
 expect(facadeCalendar.calendar.events[0]!.fixed_start_time).toBe(true);
 expect(facadeCalendar.calendar.events[0]!.extra).toMatchObject({earliest_start:calendar.calendar.events[0]!.earliest_start,latest_end:calendar.calendar.events[0]!.latest_end});
 expect((await exact.getRacingRaces({cat:'available'})).races.every(r=>r.schedule.end===null)).toBe(true);
 expect((await exact.getTornAttackLog({log:'0123456789abcdef'})).attacklog.log.at(-1)!.attacker_item).toBeNull();
 expect((await exact.getTornItemsSpecific({ids:[1,2]})).items).toEqual([]);
 expect((await exact.getMyFactionReports({cat:'stockanalysis'})).reports).toHaveLength(1);
 expect(calls.map(c=>c.path)).toEqual(['/user/gym','/user/gym','/user','/user','/user','/torn/calendar','/torn','/racing','/racing/races','/torn/attacklog','/torn/1,2/items','/faction/reports']);
 expect(calls[7]!.query).toMatchObject({selections:'races',cat:'available'});
 expect(calls[8]!.query).toMatchObject({cat:'available'});
 for(const call of calls)expect(call.query).not.toHaveProperty('key');
});

test('user/log pager follows the prev link with its nanostamp and never puts the key in the query',async()=>{
 const pages=[logs,{log:[],_metadata:{links:{prev:null,next:null}}}];
 const {calls,client}=offline(()=>clone(pages[Math.min(calls.length-1,1)]!));
 const seen:Record<string,string>[]=[];
 for await(const page of client.paginate('/user/log',{limit:3},{direction:'prev',apiKey:'offline-test'}))seen.push(page.query);
 expect(calls).toHaveLength(2);
 expect(calls[1]!.path).toBe('/user/log');
 expect(calls[1]!.query).toEqual({limit:'3',nanostamp:'1794235873988461998'});
 for(const call of calls){expect(call.query).not.toHaveProperty('key');expect(call.apiKey).toBe('offline-test');}
 expect(seen[1]).toEqual(calls[1]!.query);
});
