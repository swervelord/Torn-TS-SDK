import { describe, expect, test } from "bun:test";
import { TornClient } from "../src/client.ts";
import { TornSdk } from "../src/wrapper/index.ts";
import { UserOptions } from "../src/wrapper/options.ts";

// Explicit opt-in only. Credentials are read from the process and never printed or persisted.
const apiKey=Bun.env.TORN_LIVE_TEST_API_KEY;
describe("opt-in live Torn contracts",()=>{
  const live=apiKey?test:test.skip;
  live("generated key info, timestamp, profile and facade decode live responses",async()=>{
    const sdk=new TornSdk(TornClient.withApiKeys([apiKey!],{maxAttempts:1,timeoutMs:15_000}));
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
    const sdk=new TornSdk(TornClient.withApiKeys([apiKey!],{maxAttempts:1,timeoutMs:15_000}));
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
});
