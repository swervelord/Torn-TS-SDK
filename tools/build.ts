import { resolve, sep } from "node:path";
import { mkdir, rm } from "node:fs/promises";

const root=resolve(import.meta.dir,"..");
const output=resolve(root,"dist");
if(output!==`${root}${sep}dist`)throw new Error("Refusing to clean a build directory outside this package");
await rm(output,{recursive:true,force:true});
const tsc=Bun.resolveSync("typescript/bin/tsc",root);
const declaration=await Bun.spawn([process.execPath,tsc,"-p",resolve(root,"tsconfig.build.json")],{cwd:root,stdout:"inherit",stderr:"inherit"}).exited;
if(declaration!==0)process.exit(declaration);
await mkdir(output,{recursive:true});
const result=await Bun.build({entrypoints:[resolve(root,"src/index.ts"),resolve(root,"src/models.ts"),resolve(root,"src/generated/index.ts")],root:resolve(root,"src"),outdir:output,target:"bun",format:"esm",splitting:true,sourcemap:"external",naming:{entry:"[dir]/[name].js",chunk:"chunks/[name]-[hash].js"},minify:false});
if(!result.success){for(const message of result.logs)console.error(message);process.exit(1);}
console.log(`Built ${result.outputs.length} JavaScript artifacts and complete TypeScript declarations.`);
