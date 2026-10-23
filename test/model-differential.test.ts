import { describe,expect,test } from 'bun:test';
import { decodeManualModel } from '../src/models/manual-runtime.ts';
import { DecodeError } from '../src/errors.ts';
import type { JsonValue } from '../src/types.ts';
interface GoldenCase {model:string;input:JsonValue;ok:boolean;normalized?:JsonValue}
const golden=await Bun.file(import.meta.dir+'/../spec/parity/manual-model-golden.json').json() as {contract_kind:string;cases:GoldenCase[]};
describe('manual decoder regression fixtures',()=>{
 test('golden fixture provenance and representative custom branches',()=>{
  expect(golden.contract_kind).toBe('manual-decoder-regression');expect(golden.cases.length).toBeGreaterThanOrEqual(50);
  for(const model of ['UserInventory','UserPersonalStatsSelection','UserTrade','TradeItem','UserEmployment','UserCompetition','CompanyNewsBundle','CompanyUpgrades','CompanyProfileEmployeeDetails'])expect(golden.cases.some(c=>c.model===model)).toBe(true);
 });
 for(const [i,c] of golden.cases.entries())test(`${i+1}. ${c.model}: ${JSON.stringify(c.input)}`,()=>{
  if(c.ok)expect(decodeManualModel(c.model,c.input)).toEqual(c.normalized);
  else expect(()=>decodeManualModel(c.model,c.input)).toThrow(DecodeError);
 });
});
