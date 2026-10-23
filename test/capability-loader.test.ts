import {describe,expect,test} from "bun:test";
import {CapabilitiesDocument,ResourceCapabilities} from "../src/capabilities.ts";
import {RequestPlanner,PlanRequest} from "../src/planner.ts";
describe("capability document validation",()=>{
  for(const json of ["null","[]","1",'"text"','{"resources":null}','{"spec":null}','{"spec":{"version":1}}','{"resources":{"user":{"selections":null}}}','{"resources":{"user":{"selections":[{"can_use_generic_endpoint":"true"}]}}}','{"resources":{"user":{"generic_parameters":[{"name":123}]}}}','{"resources":{"user":{"selections":[{"endpoints":[1]}]}}}'])test(`rejects invalid metadata ${json}`,()=>expect(()=>CapabilitiesDocument.fromJsonStr(json)).toThrow());
  test("accepts omitted/default fields, BOM, unknown metadata, and nullable paths",()=>{
    expect(CapabilitiesDocument.fromJsonStr("\uFEFF{}")).toEqual({spec:{},resources:{}});
    const caps=CapabilitiesDocument.fromJsonStr('{"resources":{"user":{"generic_path":null,"future":true,"selections":[{"name":"profile","can_use_generic_endpoint":true}]}}}');
    expect(ResourceCapabilities.selection(caps.resources.user!,"profile")?.name).toBe("profile");
    expect(ResourceCapabilities.selection(caps.resources.user!,"absent")).toBeUndefined();
  });
  test("lossless IDs and filters reach planned routes",()=>{
    const plan=new RequestPlanner().plan(new PlanRequest("user",["profile"]).withId(18446744073709551615n).withFilter("timestamp",9007199254740993n));
    expect(plan.requests[0]!.query.id).toBe("18446744073709551615");expect(plan.requests[0]!.query.timestamp).toBe("9007199254740993");
  });
});
