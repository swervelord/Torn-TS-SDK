import type { JsonValue } from "./types.ts";
/** Parse JSON without rounding integer tokens outside JavaScript's safe integer range. Bun exposes reviver source context. */
export function parseLosslessJson(text:string):JsonValue {
  return JSON.parse(text,(_key:string,value:unknown,context?:{source?:string})=>{
    if(typeof value==="number"&&!Number.isFinite(value))throw new SyntaxError("JSON number is outside the finite f64 range");
    if(typeof value==="number"&&!Number.isSafeInteger(value)&&context?.source&&/^-?\d+$/.test(context.source))return BigInt(context.source);
    return value;
  }) as JsonValue;
}
/** Serialize lossless SDK JSON. Bigints become unquoted integer tokens, matching serde_json. */
export function stringifyLosslessJson(value:JsonValue,space?:number):string {
  // JSON.rawJSON is supported by Bun; the fallback encoder is portable and does not use marker substitutions.
  const raw=(JSON as typeof JSON & {rawJSON?:(source:string)=>unknown}).rawJSON;
  if(raw)return JSON.stringify(value,(_key,item:unknown)=>typeof item==="bigint"?raw(item.toString()):item,space);
  const indent=space?" ".repeat(Math.max(0,Math.min(10,space))):"";
  const encode=(item:JsonValue,depth:number):string=>{
    if(typeof item==="bigint")return item.toString();
    if(item===null||typeof item!=="object")return JSON.stringify(item);
    const entries=Array.isArray(item)?item.map(v=>encode(v,depth+1)):Object.entries(item).map(([k,v])=>`${JSON.stringify(k)}:${indent?" ":""}${encode(v,depth+1)}`);
    const [open,close]=Array.isArray(item)?["[","]"]:["{","}"];
    return entries.length?`${open}${indent?"\n"+indent.repeat(depth+1):""}${entries.join(indent?",\n"+indent.repeat(depth+1):",")}${indent?"\n"+indent.repeat(depth):""}${close}`:`${open}${close}`;
  };
  return encode(value,0);
}
