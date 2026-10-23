import { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import type { ExecutorConfigInput } from "../config.ts";
import type { ExecutorDependencies } from "../executor.ts";
import { OpenApi } from "../generated/operations.ts";
import { UserApi } from "./user.ts";
import { CompanyApi } from "./company.ts";
import { FactionApi } from "./faction.ts";
import { ForumApi } from "./forum.ts";
import { KeyApi } from "./key.ts";
import { MarketApi } from "./market.ts";
import { PropertyApi } from "./property.ts";
import { RacingApi } from "./racing.ts";
import { TornApi } from "./torn.ts";
export * from "./options.ts";
export * from "./runtime.ts";
export * from "./user.ts";
export * from "./company.ts";
export * from "./faction.ts";
export * from "./forum.ts";
export * from "./key.ts";
export * from "./market.ts";
export * from "./property.ts";
export * from "./racing.ts";
export * from "./torn.ts";
export { facadeManifest } from "./manifest.ts";

/** Ergonomic facade over the planner, executor, and all exact OpenAPI operations. */
export class TornSdk {
  constructor(private readonly underlyingClient:TornClient<HttpTransport>){}
  static new(client:TornClient<HttpTransport>):TornSdk{return new TornSdk(client);}
  static async fromEnv(capabilitiesPath?:string,env?:Record<string,string|undefined>):Promise<TornSdk>{return new TornSdk(await TornClient.fromEnv(capabilitiesPath,env));}
  static from_env=TornSdk.fromEnv;
  static withApiKeys(keys:Iterable<string>,config:ExecutorConfigInput={},dependencies:ExecutorDependencies={}):TornSdk{return new TornSdk(TornClient.withApiKeys(keys,config,dependencies));}
  client():TornClient<HttpTransport>{return this.underlyingClient;}
  openapi():OpenApi{return new OpenApi(this.underlyingClient);}
  user():UserApi{return new UserApi(this.underlyingClient);}
  company():CompanyApi{return new CompanyApi(this.underlyingClient);}
  faction():FactionApi{return new FactionApi(this.underlyingClient);}
  forum():ForumApi{return new ForumApi(this.underlyingClient);}
  key():KeyApi{return new KeyApi(this.underlyingClient);}
  market():MarketApi{return new MarketApi(this.underlyingClient);}
  property():PropertyApi{return new PropertyApi(this.underlyingClient);}
  racing():RacingApi{return new RacingApi(this.underlyingClient);}
  torn():TornApi{return new TornApi(this.underlyingClient);}
}
