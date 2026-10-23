import { describe, expect, test } from "bun:test";
import { parseLosslessJson, stringifyLosslessJson } from "../src/json.ts";
describe("lossless Rust integer parity",()=>{
  test("preserves signed/unsigned 64-bit integral tokens and normal number ergonomics",()=>{
    const value=parseLosslessJson('{"safe":42,"min":-9223372036854775808,"max":18446744073709551615,"float":1.25,"string":"9007199254740993"}');
    expect(value).toEqual({safe:42,min:-9223372036854775808n,max:18446744073709551615n,float:1.25,string:"9007199254740993"});
    expect(parseLosslessJson(stringifyLosslessJson(value))).toEqual(value);
  });
  test("roundtrips nested arrays, escapes, and pretty printing",()=>{
    const value={numbers:[9007199254740993n,-9007199254740993n,1],text:'a"\\\n',object:{yes:true,nil:null}};
    expect(parseLosslessJson(stringifyLosslessJson(value,2))).toEqual(value);
    expect(stringifyLosslessJson(value,2)).toContain("\n");
  });
  test("does not reinterpret quoted integers or round safe boundary integers",()=>{
    expect(parseLosslessJson('[9007199254740991,9007199254740992,"9007199254740992"]')).toEqual([9007199254740991,9007199254740992n,"9007199254740992"]);
    expect(()=>parseLosslessJson('{"broken":}')).toThrow();
    expect(()=>parseLosslessJson('{"overflow":1e400}')).toThrow("finite f64 range");
  });
});
