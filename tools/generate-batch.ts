import capabilities from "../spec/capabilities.json";
import { facadeManifest } from "../src/wrapper/manifest.ts";
import { manualModelMetadata } from "../src/models/manual-metadata.ts";
import { schemas } from "../src/generated/schema-data.ts";
import type { Schema } from "../src/schema.ts";

interface Operation {method:string;selection:string;returnType:string;alias:string|null}
const manual:Readonly<Record<string,unknown>>=manualModelMetadata;
function roots(name:string):string[]{
  const model=Reflect.get(manualModelMetadata,name) as {kind:string;fields?:{key:string;aliases:readonly string[];flatten:boolean}[];type?:string}|undefined;
  if(model?.kind==="alias")return roots(model.type!);
  if(model?.kind==="struct")return [...new Set(model.fields!.filter(f=>!f.flatten).flatMap(f=>[f.key,...f.aliases]))];
  const walk=(schema:Schema,seen=new Set<string>()):string[]=>{
    if(schema.$ref){const key=schema.$ref.split("/").at(-1)!;if(seen.has(key))return [];seen.add(key);return walk(schemas[key]!,seen);}
    return [...Object.keys(schema.properties??{}),...(schema.allOf??[]).flatMap(s=>walk(s,seen))];
  };
  return [...new Set(walk(schemas[name]!))];
}
const descriptors:Record<string,Record<string,{model:string;manual:boolean;inputRoots:string[]}>>={};
const interfaces:string[]=[];
for(const [resource,definition] of Object.entries(facadeManifest)){
  descriptors[resource]={};const properties:string[]=[];
  const selections=new Set([...Reflect.get(capabilities.resources,resource).selections.map((s:{name:string})=>s.name),...definition.selections]);
  for(const selection of selections){
    const methods:readonly Operation[]=definition.methods;
    let op=methods.find(m=>m.method.toLowerCase()===selection.toLowerCase())??methods.find(m=>m.selection.toLowerCase()===selection.toLowerCase());
    if(!op)throw new Error(`Missing typed selection ${resource}.${selection}`);
    if(op.alias)op=methods.find(m=>m.method===op!.alias)!;
    if(op.returnType==="string")continue;
    const isManual=op.returnType in manual;
    const type=(isManual?"Manual.":"Generated.")+op.returnType;
    properties.push(`    ${JSON.stringify(selection)}: ${type}${resource==="torn"&&selection==="stocks"?" | Manual.TornStockBundle":""};`);
    descriptors[resource]![selection]={model:op.returnType,manual:isManual,inputRoots:roots(op.returnType)};
  }
  interfaces.push(`  ${resource}: {\n${properties.join("\n")}\n  };`);
}
const output='/** Generated typed JSON batch coverage from the committed resource facade contracts. */\nimport type * as Manual from "./models/manual.ts";\nimport type * as Generated from "./generated/models.ts";\n\nexport interface SelectionModelMap {\n'+interfaces.join("\n")+'\n}\n\nexport const selectionModelDefinitions = '+JSON.stringify(descriptors,null,2)+' as const;\n';
const path=new URL("../src/batch-models.ts",import.meta.url);
if(process.argv.includes("--check")){if((await Bun.file(path).text()).replaceAll("\r\n","\n")!==output)throw new Error("Batch selection models are stale; run bun tools/generate-batch.ts");}else await Bun.write(path,output);
console.log(`${Object.values(descriptors).reduce((n,r)=>n+Object.keys(r).length,0)} typed JSON batch selections verified`);
