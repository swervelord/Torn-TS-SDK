import { expect, test } from 'bun:test';
import spec from '../spec/torn-openapi-current.json';
import { decodeModel, validateModel } from '../src/generated/runtime.ts';
import { OpenApi } from '../src/generated/operations.ts';
import type { UserTravelInventoryResponse } from '../src/generated/models.ts';
import { selectionModelDefinitions } from '../src/batch-models.ts';
import { TornSdk } from '../src/wrapper/index.ts';
import { PlanRequest, RequestPlanner } from '../src/planner.ts';
import { TornClient } from '../src/client.ts';
import { RequestExecutor } from '../src/executor.ts';
import type { HttpTransport, TransportRequest } from '../src/transport.ts';

// Representative /v2/user/travelinventory payload: one equipped weapon with a UID and one stackable item without one.
const sample={travelinventory:{capacity:{base:28,special:0},inventory:[
 {id:732365689,item:{id:177,uid:18545986362,name:'Cobra Derringer',type:'Secondary',is_equipped:true,is_faction_owned:false,is_permanent:true}},
 {id:742823284,item:{id:738,uid:null,name:'Blood Bag : O+',type:'Medical',is_equipped:false,is_faction_owned:false,is_permanent:true}},
]}};

test('6.15.0 travel inventory endpoint requires a Limited key and joins the user selection enum',()=>{
 expect(spec.paths['/user/travelinventory'].get.operationId).toBe('getMyTravelInventory');
 expect(spec.paths['/user/travelinventory'].get.parameters).toContainEqual({$ref:'#/components/parameters/ApiKeyLimited'});
 expect(spec.components.schemas.UserSelectionName.oneOf[0]!.enum).toContain('travelinventory');
});

test('6.15.0 enum additions decode and unknown members are still rejected',()=>{
 expect(decodeModel('JobPositionCasinoEnum','Dealer')).toBe('Dealer');
 expect(decodeModel('FactionTerritoryWarResultEnum','end_with_dirty_bomb')).toBe('end_with_dirty_bomb');
 expect(validateModel('JobPositionCasinoEnum','Croupier').length).toBeGreaterThan(0);
 expect(validateModel('FactionTerritoryWarResultEnum','end_with_nuke').length).toBeGreaterThan(0);
});

test('travel inventory sample decodes with nullable slot item and item UID',()=>{
 const decoded=decodeModel('UserTravelInventoryResponse',sample) as UserTravelInventoryResponse;
 expect(decoded).toEqual(sample);
 expect(decoded.travelinventory.capacity).toEqual({base:28,special:0});
 expect(decoded.travelinventory.inventory[0]!.item!.uid).toBe(18545986362);
 expect(decoded.travelinventory.inventory[1]!.item!.uid).toBeNull();
 const empty={travelinventory:{capacity:{base:28,special:5},inventory:[{id:1,item:null}]}};
 expect(decodeModel('UserTravelInventoryResponse',empty)).toEqual(empty);
});

test('travel inventory rejects missing required nullable keys and malformed values',()=>{
 const item=sample.travelinventory.inventory[0]!.item;
 const {uid:_uid,...withoutUid}=item;
 expect(()=>decodeModel('UserTravelInventoryItem',withoutUid)).toThrow('uid');
 expect(()=>decodeModel('UserTravelInventorySlot',{id:1})).toThrow('item');
 expect(()=>decodeModel('UserTravelInventoryItem',{...item,uid:'18545986362'})).toThrow();
 expect(()=>decodeModel('UserTravelInventoryCapacity',{base:'28',special:0})).toThrow('integer');
 expect(()=>decodeModel('UserTravelInventoryResponse',{travelinventory:{capacity:{base:28,special:0}}})).toThrow('inventory');
});

test('travel inventory plans through the generic user endpoint and batches with other selections',()=>{
 const planner=new RequestPlanner();
 const single=planner.plan(new PlanRequest('user',['travelinventory']));
 expect(single.requests).toHaveLength(1);
 expect(single.requests[0]).toMatchObject({apiVersion:'v2',query:{selections:'travelinventory'}});
 const combined=planner.plan(new PlanRequest('user',['travel','travelinventory','job']));
 expect(combined.requests).toHaveLength(1);
 expect(combined.requests[0]).toMatchObject({path:'/user',strategy:'generic-combined',apiVersion:'v2',query:{selections:'travel,travelinventory,job'}});
 expect(selectionModelDefinitions.user.travelinventory).toEqual({model:'UserTravelInventoryResponse',manual:false,inputRoots:['travelinventory']});
});

test('travel inventory exact operation, facade helpers, and typed selection batches decode the sample envelope',async()=>{
 const calls:TransportRequest[]=[];
 const transport:HttpTransport={execute:async(request)=>{calls.push(request);return {status:200,body:JSON.stringify(sample)};}};
 const client=new TornClient(new RequestPlanner(),new RequestExecutor(transport,['offline-test'],{maxAttempts:1}));
 const exact=new OpenApi(client),sdk=new TornSdk(client);
 expect((await exact.getMyTravelInventory()).travelinventory.capacity.base).toBe(28);
 expect((await exact.get_my_travel_inventory()).travelinventory.inventory).toHaveLength(2);
 expect((await sdk.user().travelinventory()).travelinventory.inventory[1]!.item!.uid).toBeNull();
 expect((await sdk.user().travelinventoryRaw()).get('travelinventory')).toEqual(sample.travelinventory);
 expect((await sdk.user().select(['travelinventory'])).travelinventory.inventory[0]!.item!.name).toBe('Cobra Derringer');
 expect(calls).toHaveLength(5);
 expect(calls[0]!.path).toBe('/user/travelinventory');
});
