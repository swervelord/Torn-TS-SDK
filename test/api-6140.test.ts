import { expect, test } from 'bun:test';
import spec from '../spec/torn-openapi-current.json';
import { decodeModel } from '../src/generated/runtime.ts';
import { OpenApi } from '../src/generated/operations.ts';
import { TornSdk } from '../src/wrapper/index.ts';
import { RequestPlanner } from '../src/planner.ts';
import { TornClient } from '../src/client.ts';
import { RequestExecutor } from '../src/executor.ts';
import type { HttpTransport, TransportRequest } from '../src/transport.ts';

test('6.14.0 inventory TTL and raw stability annotations remain faithful to upstream',()=>{
 expect(spec.paths['/user/inventory'].get.description).toContain('15 minutes');
 expect(spec.paths['/faction/inventory'].get.description).toContain('5 minutes');
 expect(spec.paths['/user/halloween'].get.parameters).toContainEqual({$ref:'#/components/parameters/ApiKeyMinimal'});
 expect(spec.paths['/user/halloween'].get['x-stability']).toBe('Untable');
 expect(spec.paths['/torn/halloween'].get['x-stability']).toBe('Stable');
});

test('Halloween exact operations, facade helpers, and typed selection batches decode real envelope shapes',async()=>{
 const calls:TransportRequest[]=[];
 const user={halloween:{treats:{total:100,current:25},basket_upgrades:[{id:1,timestamp:1793100000}]}};
 const torn={halloween:{basket_upgrades:[{id:1,name:'Basket',description:'Upgrade',flavor:'Flavor',cost:10,requirement:0,type:{upstream:'undeclared'},future_field:true}]}};
 const transport:HttpTransport={execute:async(request)=>{calls.push(request);return {status:200,body:JSON.stringify(request.path.startsWith('/torn')?torn:user)};}};
 const client=new TornClient(new RequestPlanner(),new RequestExecutor(transport,['offline-test'],{maxAttempts:1}));
 const exact=new OpenApi(client),sdk=new TornSdk(client);
 expect((await exact.getMyHalloween()).halloween.treats.current).toBe(25);
 expect((await exact.getTornHalloween()).halloween.basket_upgrades[0]!.type).toEqual({upstream:'undeclared'});
 expect((await sdk.user().halloween()).halloween.treats.total).toBe(100);
 expect((await sdk.torn().halloween()).halloween.basket_upgrades).toHaveLength(1);
 expect((await sdk.user().select(['halloween'])).halloween.treats.current).toBe(25);
 expect((await sdk.torn().select(['halloween'])).halloween.basket_upgrades[0]!.type).toEqual({upstream:'undeclared'});
 expect(calls).toHaveLength(6);
 expect(calls[0]!.path).toBe('/user/halloween');expect(calls[1]!.path).toBe('/torn/halloween');
});

test('Halloween rejects missing required unknown type and malformed typed treat counts',()=>{
 const upgrade={id:1,name:'Basket',description:'Upgrade',flavor:'Flavor',cost:10,requirement:0};
 expect(()=>decodeModel('TornHalloweenUpgrade',upgrade)).toThrow('type');
 expect(decodeModel('TornHalloweenUpgrade',{...upgrade,type:null})).toEqual({...upgrade,type:null});
 expect(()=>decodeModel('UserHalloweenResponse',{halloween:{treats:{current:'25',total:100},basket_upgrades:[]}})).toThrow('integer');
});
