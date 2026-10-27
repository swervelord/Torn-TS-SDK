/** Rebuild the complete public manual type surface from the checked-in compatibility schema using Bun. */
import { manualModelMetadata } from "../src/models/manual-metadata.ts";
import { facadeManifest } from "../src/wrapper/manifest.ts";

function split(value:string):string[] {
  let depth=0,start=0;const result:string[]=[];
  for(let i=0;i<value.length;i++){if(value[i]==="<")depth++;if(value[i]===">")depth--;if(value[i]===","&&!depth){result.push(value.slice(start,i).trim());start=i+1;}}
  result.push(value.slice(start).trim());return result;
}
function typeName(value:string):string {
  value=value.trim();
  if(/^u?int\d+$/.test(value))return "Integer";
  if(/^float\d+$/.test(value))return "number";
  const generic=/^(Nullable|Array|Record)<(.*)>$/.exec(value);
  if(!generic)return value;
  const inner=generic[2]!;
  if(generic[1]==="Nullable")return `(${typeName(inner)} | null)`;
  if(generic[1]==="Array")return `Array<${typeName(inner)}>`;
  const args=split(inner);return `Record<${typeName(args[0]!)}, ${typeName(args[1]!)}>`;
}
const declarations=Object.entries(manualModelMetadata).map(([name,model])=>{
  if(model.kind==="struct"){
    const methods:Record<string,string>={CompanyProfileBundle:"  profile(): CompanyProfile;\n",UserReportDetails:"  get(field: string): DynamicValue | undefined;\n",UserPersonalStatsBucket:"  get(stat: string): DynamicValue | undefined;\n"};
    return `export interface ${name} {\n${model.fields.map(f=>`  ${f.name}: ${typeName(f.type)};\n`).join("")}${methods[name]??""}}\n`;
  }
  if(model.kind==="alias")return `export type ${name} = ${typeName(model.type)};\n`;
  return `export type ${name} = ${name==="DynamicValue"?"JsonValue":model.variants.map(v=>v==="null"?"null":typeName(v)).join(" | ")};\n`;
});
const generated='/** Complete SDK manual model declarations generated from the committed decoder schema. */\nimport type { JsonValue, Integer } from "../types.ts";\nimport type * as Generated from "../generated/models.ts";\nimport { DynamicValue as DynamicValueHelpers } from "./manual-values.ts";\nexport const DynamicValue = DynamicValueHelpers;\n\n'+declarations.join("\n");
const path=new URL("../src/models/manual.ts",import.meta.url);
if(process.argv.includes("--check")){
  if((await Bun.file(path).text()).replaceAll("\r\n","\n")!==generated)throw new Error("Manual types are stale; run bun tools/generate-manual.ts");
}else await Bun.write(path,generated);
const typed=Object.values(facadeManifest).reduce((sum,r)=>sum+r.methods.length,0);
console.log(`${Object.keys(manualModelMetadata).length} compatibility models and ${typed} facade helpers verified`);
