import { expect, test } from "bun:test";
import { decodeManualModel } from "../src/models/manual-runtime.ts";
import { DynamicValue, type CompanyProfileBundle, type UserPersonalStatsCategory, type UserReportSummary, type UserReportDetails } from "../src/models/manual.ts";

test("CompanyProfileBundle.profile exposes the normalized company without adding JSON fields",()=>{
  const bundle=decodeManualModel<CompanyProfileBundle>("CompanyProfileBundle",{profile:{id:42,name:"Example"}});
  expect(bundle.profile()).toBe(bundle.company);
  expect(bundle.profile().id).toBe(42);
  expect(Object.keys(bundle)).toEqual(["company"]);
  expect(Object.getOwnPropertyDescriptor(bundle,"profile")?.enumerable).toBe(false);
  expect(JSON.parse(JSON.stringify(bundle))).toEqual({company:bundle.company});
});

test("report detail get works when nested or defaulted, preserves dynamic values and hides methods",()=>{
  const summary=decodeManualModel<UserReportSummary>("UserReportSummary",{report:{strength:42,nested:{value:"example"},get:"payload field"},future:true});
  expect(summary.report.get("strength")).toBe(42);
  expect(summary.report.get("nested")).toEqual({value:"example"});
  expect(summary.report.get("get")).toBe("payload field");
  expect(summary.report.get("missing")).toBeUndefined();
  expect(summary.report.get("toString")).toBeUndefined();
  expect(summary.extra).toEqual({future:true});
  expect(Object.keys(summary.report)).toEqual(["fields"]);
  expect(JSON.parse(JSON.stringify(summary.report))).toEqual({fields:{strength:42,nested:{value:"example"},get:"payload field"}});
  const defaulted=decodeManualModel<UserReportSummary>("UserReportSummary",{});
  expect(defaulted.report.get("anything")).toBeUndefined();
  const details=decodeManualModel<UserReportDetails>("UserReportDetails",{field:null});expect(details.get("field")).toBeNull();
});

test("personal statistics bucket get works on nested categories and does not consume unknown statistics",()=>{
  const category=decodeManualModel<UserPersonalStatsCategory>("UserPersonalStatsCategory",{attacking:{attackswon:123,custom:{nested:true},get:"statistic"},future:"retained"});
  expect(category.attacking?.get("attackswon")).toBe(123);
  expect(category.attacking?.get("custom")).toEqual({nested:true});
  expect(category.attacking?.get("get")).toBe("statistic");
  expect(category.attacking?.get("missing")).toBeUndefined();
  expect(category.extra).toEqual({future:"retained"});
  expect(Object.keys(category.attacking!)).toEqual(["stats"]);
  expect(JSON.parse(JSON.stringify(category.attacking))).toEqual({stats:{attackswon:123,custom:{nested:true},get:"statistic"}});
});

test("DynamicValue companion exposes accessors for native TypeScript primitives",()=>{
  expect(DynamicValue.asI64(42)).toBe(42);
  expect(DynamicValue.as_i64(-(1n<<63n))).toBe(-(1n<<63n));
  expect(DynamicValue.asI64((1n<<63n)-1n)).toBe((1n<<63n)-1n);
  for(const value of [(1n<<63n),-(1n<<63n)-1n,1.5,NaN,Infinity,"42",true,null,[],{}])expect(DynamicValue.asI64(value)).toBeUndefined();
  expect(DynamicValue.asStr("value")).toBe("value");expect(DynamicValue.as_str("alias")).toBe("alias");
  for(const value of [1,1n,false,null,{},[]])expect(DynamicValue.asStr(value)).toBeUndefined();
  const nested={payload:{list:[true,"value"]},nil:null};
  expect(DynamicValue.get(nested,"payload")).toBe(nested.payload);
  expect(DynamicValue.get(nested,"nil")).toBeNull();
  expect(DynamicValue.get(nested,"missing")).toBeUndefined();
  expect(DynamicValue.get({},"toString")).toBeUndefined();
  for(const value of [null,true,1,1n,"string",["item"]])expect(DynamicValue.get(value,"0")).toBeUndefined();
});
