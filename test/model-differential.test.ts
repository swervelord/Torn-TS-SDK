import { describe,expect,test } from 'bun:test';
import { decodeManualModel } from '../src/models/manual-runtime.ts';
import { DecodeError } from '../src/errors.ts';
import type { JsonValue } from '../src/types.ts';
interface GoldenCase {model:string;input:JsonValue;ok:boolean;normalized?:JsonValue}
const golden=await Bun.file(import.meta.dir+'/../spec/parity/manual-model-golden.json').json() as {source_commit:string;cases:GoldenCase[]};
describe('manual decoder differential fixtures from Rust cd8716d',()=>{
 test('golden fixture provenance and representative custom branches',()=>{
  expect(golden.source_commit).toBe('cd8716d');expect(golden.cases.length).toBeGreaterThanOrEqual(50);
  for(const model of ['UserInventory','UserPersonalStatsSelection','UserTrade','TradeItem','UserEmployment','UserCompetition','CompanyNewsBundle','CompanyUpgrades','CompanyProfileEmployeeDetails'])expect(golden.cases.some(c=>c.model===model)).toBe(true);
 });
 for(const [i,c] of golden.cases.entries())test(`${i+1}. ${c.model}: ${JSON.stringify(c.input)}`,()=>{
  if(c.ok)expect(decodeManualModel(c.model,c.input)).toEqual(c.normalized);
  else expect(()=>decodeManualModel(c.model,c.input)).toThrow(DecodeError);
 });
});
