import type { TornSdk } from "../src/wrapper/index.ts";
import type { Integer } from "../src/types.ts";
import type { UserEmployment } from "../src/models/manual.ts";
import { UserOptions } from "../src/wrapper/options.ts";
import type { JsonSelection } from "../src/batch.ts";

// Compile-only public API contract: no asserted caller response type is needed.
async function inferredBatchContracts(sdk:TornSdk){
  const user=await sdk.user().select(["profile","job"],new UserOptions().withId(42));
  const name:string|null=user.profile.name;
  const id:Integer|null=user.profile.id;
  const job:UserEmployment|null=user.job;
  // @ts-expect-error Unselected money is not a claimed typed field.
  user.money;
  // @ts-expect-error CSV is excluded from JSON batches.
  sdk.user().select(["snapshot"]);
  // @ts-expect-error Faction-only selections cannot be requested from user.
  sdk.user().select(["rankedwars"]);
  // @ts-expect-error Invented selections are rejected.
  sdk.faction().select(["imaginary"]);
  const selected=await sdk.faction().select(["timestamp","lookup"]);
  const timestamp:Integer|null=selected.timestamp;
  const names:string[]=selected.selections;
  const {data,report}=await sdk.user().selectWithReport(["job"]);
  const employment:UserEmployment|null=data.job;
  const calls:number=report.calls.length;
  const stocks=await sdk.torn().select(["stocks"]);
  if("stock" in stocks){const stockId:Integer|null=stocks.stock.id;void stockId;}
  else {const stockCount:number=stocks.stocks.length;void stockCount;}
  const dynamicSelections:JsonSelection<"user">[]=["profile","job"];
  const dynamic=await sdk.user().select(dynamicSelections,new UserOptions().withId(42));
  // @ts-expect-error A dynamically sized array cannot promise a profile was requested.
  const assumedProfile:string|null=dynamic.profile.name;
  const safeName:string|null|undefined=dynamic.profile?.name;
  const either:readonly ["profile"|"job"]=[Math.random()>0.5?"profile":"job"];
  const uncertain=await sdk.user().select(either,new UserOptions().withId(42));
  // @ts-expect-error A union in one tuple slot promises either envelope rather than both.
  uncertain.profile;
  void [assumedProfile,safeName,uncertain];
  void [name,id,job,timestamp,names,employment,calls];
}
void inferredBatchContracts;
