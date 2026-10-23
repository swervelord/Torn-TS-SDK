import type { Schema } from '../src/schema.ts';
import type { JsonValue } from '../src/types.ts';
/** Deterministic representative schema values for exhaustive transport and decoder contract tests. */
export function sampleSchema(s:Schema,registry:Record<string,Schema>,options:{nonemptyArrays?:boolean;constraints?:boolean}={},seen=new Set<string>()):JsonValue {
 if(s.$ref){const name=s.$ref.split('/').at(-1)!;if(seen.has(name))return null;const target=registry[name];if(!target)throw new Error('Unknown sample schema '+name);return sampleSchema(target,registry,options,new Set([...seen,name]));}
 if(s.enum?.length)return s.enum[0] as JsonValue;
 if(s.const!==undefined)return s.const as JsonValue;
 if(s.nullable&&!options.constraints)return null;
 if(s.oneOf||s.anyOf){const variants=s.oneOf??s.anyOf??[];return sampleSchema((!options.constraints?variants.find(x=>x.type==='null'):undefined)??variants.find(x=>x.type!=='null')??variants[0]!,registry,options,seen);}
 if(s.allOf){const values=s.allOf.map(x=>sampleSchema(x,registry,options,seen));return Object.assign({},...values.filter(v=>v!==null&&typeof v==='object'&&!Array.isArray(v)));}
 if(Array.isArray(s.type))return sampleSchema({...s,type:s.type.find(x=>x!=='null')??s.type[0]},registry,options,seen);
 if(s.type==='null')return null;
 if(s.type==='integer'||s.type==='number'){
  let n=Math.max(1,s.minimum??1);if(typeof s.exclusiveMinimum==='number')n=Math.max(n,s.exclusiveMinimum+1);if(s.maximum!==undefined)n=Math.min(n,s.maximum);if(typeof s.exclusiveMaximum==='number')n=Math.min(n,s.exclusiveMaximum-1);return s.type==='integer'?Math.ceil(n):n;
 }
 if(s.type==='boolean')return true;
 if(s.type==='string'){const length=Math.max(s.minLength??0,1);return 'sample'.repeat(Math.ceil(length/6)).slice(0,s.maxLength??Math.max(length,6));}
 if(s.type==='array'){const count=Math.max(s.minItems??0,options.nonemptyArrays?1:0);return Array.from({length:count},()=>sampleSchema(s.items??{},registry,options,seen));}
 if(s.type==='object'||s.properties)return Object.fromEntries((s.required??[]).map(key=>[key,sampleSchema(s.properties?.[key]??{},registry,options,seen)]));
 return null;
}
