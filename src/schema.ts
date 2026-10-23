/** The JSON Schema subset used by Torn's pinned OpenAPI specification. */
export interface Schema {
  [keyword: string]: unknown;
  $ref?: string;
  type?: string | string[];
  enum?: unknown[];
  const?: unknown;
  nullable?: boolean;
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema;
  additionalProperties?: boolean | Schema;
  allOf?: Schema[];
  anyOf?: Schema[];
  oneOf?: Schema[];
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: boolean | number;
  exclusiveMaximum?: boolean | number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  description?: string;
  format?: string;
  default?: unknown;
  example?: unknown;
  deprecated?: boolean;
  discriminator?: unknown;
  title?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: unknown;
  externalDocs?: unknown;
}
export interface ValidationIssue { path: string; message: string }
export interface SchemaValidationOptions {
  /** Torn response unions, like serde untagged unions, accept any matching variant. */
  exactOneOf?: boolean;
  /** Rust serde Option fields accept explicit null as well as omission. */
  optionalNullable?: boolean;
  /** Validate constraints beyond the Rust serde model contract (for input parameters). */
  constraints?: boolean;
}
/** Validate without coercion or dropping unknown response fields. Unknown fields are accepted unless explicitly forbidden. */
export function validateSchema(schema: Schema, value: unknown, registry: Record<string, Schema>, options: SchemaValidationOptions = {}): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const stringify=(v:unknown):string|undefined=>JSON.stringify(v,(_key,item:unknown)=>typeof item==='bigint'?{__sdkBigInt:item.toString()}:item);
  const equal=(a:unknown,b:unknown):boolean=>{
    if(typeof a==='bigint'&&typeof b==='number'&&Number.isInteger(b))return a===BigInt(b);
    if(typeof b==='bigint'&&typeof a==='number'&&Number.isInteger(a))return b===BigInt(a);
    return stringify(a)===stringify(b);
  };
  function check(s: Schema, v: unknown, path: string, out: ValidationIssue[], depth: number): void {
    const fail=(message:string)=>out.push({path,message});
    if(depth>200){fail('maximum schema recursion depth exceeded');return;}
    if(s.$ref){const name=s.$ref.split('/').at(-1)!;const target=registry[name];if(!target){fail('unknown schema reference '+name);return;}check(target,v,path,out,depth+1);return;}
    if(v===null && s.nullable)return;
    if(s.const!==undefined && !equal(s.const,v)){fail('expected constant '+JSON.stringify(s.const));return;}
    if(s.enum && !s.enum.some(x=>equal(x,v))){fail('expected one of '+s.enum.map(x=>JSON.stringify(x)).join(', '));return;}
    if(s.allOf)for(const branch of s.allOf)check(branch,v,path,out,depth+1);
    const union=s.oneOf??s.anyOf;
    if(union){const results=union.map(branch=>{const b:ValidationIssue[]=[];check(branch,v,path,b,depth+1);return b;});const matches=results.filter(x=>x.length===0).length;if(matches===0){fail('value matches no union variant');return;}if(s.oneOf&&options.exactOneOf&&matches!==1){fail('value matches more than one oneOf variant');return;}}
    if(Array.isArray(s.type)){const results=s.type.map(t=>{const b:ValidationIssue[]=[];check({...s,type:t},v,path,b,depth+1);return b;});if(!results.some(x=>x.length===0))fail('expected '+s.type.join(' or '));return;}
    const kind=s.type??(s.properties||s.additionalProperties!==undefined?'object':undefined);
    if(kind==='null'){if(v!==null)fail('expected null');return;}
    if(kind==='string'){
      if(typeof v!=='string'){fail('expected string');return;}
      if(options.constraints){if(s.minLength!==undefined&&[...v].length<s.minLength)fail('string shorter than '+s.minLength);if(s.maxLength!==undefined&&[...v].length>s.maxLength)fail('string longer than '+s.maxLength);if(s.pattern&&!new RegExp(s.pattern).test(v))fail('string does not match '+s.pattern);}
    } else if(kind==='integer'||kind==='number'){
      if((typeof v!=='number'&&!(kind==='integer'&&typeof v==='bigint'))||(typeof v==='number'&&(!Number.isFinite(v)||(kind==='integer'&&!Number.isInteger(v))))){fail('expected '+kind);return;}
      const numeric=v as number|bigint;
      const below=(bound:number,inclusive=false)=>typeof numeric==='bigint'&&Number.isInteger(bound)?inclusive?numeric<=BigInt(bound):numeric<BigInt(bound):inclusive?numeric<=bound:numeric<bound;
      const above=(bound:number,inclusive=false)=>typeof numeric==='bigint'&&Number.isInteger(bound)?inclusive?numeric>=BigInt(bound):numeric>BigInt(bound):inclusive?numeric>=bound:numeric>bound;
      if(kind==='integer'&&(numeric < -9223372036854775808n || numeric > 9223372036854775807n)){fail('integer outside signed 64-bit range');return;}
      if(options.constraints){if(s.minimum!==undefined&&below(s.minimum))fail('number below '+s.minimum);if(s.maximum!==undefined&&above(s.maximum))fail('number above '+s.maximum);if(typeof s.exclusiveMinimum==='number'&&below(s.exclusiveMinimum,true))fail('number must exceed '+s.exclusiveMinimum);if(typeof s.exclusiveMaximum==='number'&&above(s.exclusiveMaximum,true))fail('number must be below '+s.exclusiveMaximum);}
    } else if(kind==='boolean'){if(typeof v!=='boolean')fail('expected boolean');}
    else if(kind==='array'){
      if(!Array.isArray(v)){fail('expected array');return;}
      if(s.items)v.forEach((item,index)=>check(s.items!,item,`${path}[${index}]`,out,depth+1));
      if(options.constraints){if(s.minItems!==undefined&&v.length<s.minItems)fail('too few array items');if(s.maxItems!==undefined&&v.length>s.maxItems)fail('too many array items');if(s.uniqueItems&&new Set(v.map(x=>stringify(x))).size!==v.length)fail('array items must be unique');}
    } else if(kind==='object'){
      if(v===null||typeof v!=='object'||Array.isArray(v)){fail('expected object');return;}
      const obj=v as Record<string,unknown>;
      for(const key of s.required??[])if(!Object.hasOwn(obj,key)||obj[key]===undefined)out.push({path:path+'.'+key,message:'required property is missing'});
      for(const [key,item] of Object.entries(obj)){
        const property=s.properties?.[key];if(property){if(!(options.optionalNullable&&item===null&&!s.required?.includes(key)))check(property,item,path+'.'+key,out,depth+1);}
        else if(s.additionalProperties===false&&options.constraints)out.push({path:path+'.'+key,message:'unknown property'});
        else if(typeof s.additionalProperties==='object')check(s.additionalProperties,item,path+'.'+key,out,depth+1);
      }
    }
  }
  check(schema,value,'$',issues,0);
  return issues;
}
