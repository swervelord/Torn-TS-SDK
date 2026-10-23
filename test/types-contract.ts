/** Compile-only public API contract checks. These are deliberately included by tsc. */
import { OpenApi, TornClient, RequestExecutor, RequestPlanner, TornSdk } from '../src/index.ts';
import type { HttpTransport, TransportRequest, TransportResponse } from '../src/transport.ts';
import type { GetUserDiscordResponse, GetTornItemDetailsResponse, UserInventoryItem, RaceClassEnum, GetTornItemDetailsParams } from '../src/generated/models.ts';

class CustomTransport implements HttpTransport {
 async execute(_request:TransportRequest):Promise<TransportResponse>{return {status:200,body:'{}'};}
}
const customClient=new TornClient(new RequestPlanner(),new RequestExecutor(new CustomTransport(),['compile-only-test-key']));
const customApi=new OpenApi(customClient);
const sdk=new TornSdk(customClient);
const discord:Promise<GetUserDiscordResponse>=customApi.getUserDiscord({id:1});
const snakeDiscord:Promise<GetUserDiscordResponse>=customApi.get_user_discord({id:1n});
const details:Promise<GetTornItemDetailsResponse>=customApi.getTornItemDetails({ids:[1,9007199254740993n]});
const csv:Promise<string>=customApi.getUsersSnapshot();
const ids:GetTornItemDetailsParams={ids:[1n]};
const enumValue:RaceClassEnum='A';
// @ts-expect-error Missing required path parameter must never compile.
customApi.getUserDiscord();
// @ts-expect-error Unrecognized parameters must never compile.
customApi.getUserDiscord({id:1,doesNotExist:true});
// @ts-expect-error API keys belong to the executor, not generated params.
customApi.getUserDiscord({id:1,key:'forbidden'});
// @ts-expect-error Required path parameters are nonnullable.
customApi.getUserDiscord({id:null});
// @ts-expect-error Path UID arrays must contain integers, not arbitrary objects.
customApi.getTornItemDetails({ids:[{id:1}]});
// @ts-expect-error Exact generated enums reject unknown strings.
const invalidEnum:RaceClassEnum='F';
// @ts-expect-error Required nullable uid must be present even when null.
const missingRequiredNullable:UserInventoryItem={id:1,amount:1,equipped:false,name:'test',faction_owned:false};
const nullableUid:UserInventoryItem={id:1,amount:1,equipped:false,name:'test',faction_owned:false,uid:null};
void [discord,snakeDiscord,details,csv,ids,enumValue,invalidEnum,missingRequiredNullable,nullableUid,sdk];

import type { legacy6136Models, TornEliminationTeam, TornEliminationTeamLeader, TornEliminationTeamCaptain } from '../src/generated/index.ts';
declare const currentTeam:TornEliminationTeam;
declare const originalTeam:legacy6136Models.TornEliminationTeam;
const currentCaptains=currentTeam.captains;
const originalLeaders=originalTeam.leaders;
// @ts-expect-error Live6.13.8 changed leaders to captains; the root type must describe the real response.
currentTeam.leaders;
// @ts-expect-error Frozen6.13.6 keeps the original Rust response contract.
originalTeam.captains;
declare const compatibilityLeader:TornEliminationTeamLeader;
const newCaptain:TornEliminationTeamCaptain=compatibilityLeader;
void [currentCaptains,originalLeaders,newCaptain];
