/**
 * Build the published package (PARITY_SPEC P9.5): portable ESM `dist/*.js` for Node >= 20, Bun, Deno, browsers and
 * workers, plus `.d.ts` declarations whose relative imports end in `.js` (no `allowImportingTsExtensions` needed).
 * Bun is only the build tool: the bundle targets the neutral `browser` platform, so it contains no `Bun.*` and no
 * Node built-ins, and JSON data (capabilities, schemas) is inlined.
 */
import { resolve, sep } from "node:path";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";

const root=resolve(import.meta.dir,"..");
const output=resolve(root,"dist");
if(output!==`${root}${sep}dist`)throw new Error("Refusing to clean a build directory outside this package");
await rm(output,{recursive:true,force:true});
const tsc=Bun.resolveSync("typescript/bin/tsc",root);
const declaration=await Bun.spawn([process.execPath,tsc,"-p",resolve(root,"tsconfig.build.json")],{cwd:root,stdout:"inherit",stderr:"inherit"}).exited;
if(declaration!==0)process.exit(declaration);
await mkdir(output,{recursive:true});
const entrypoints=["src/index.ts","src/models.ts","src/generated/index.ts","src/testing.ts"];
const result=await Bun.build({entrypoints:entrypoints.map(entry=>resolve(root,entry)),root:resolve(root,"src"),outdir:output,target:"browser",format:"esm",splitting:true,sourcemap:"linked",naming:{entry:"[dir]/[name].js",chunk:"chunks/[name]-[hash].js"},minify:false});
if(!result.success){for(const message of result.logs)console.error(message);process.exit(1);}

// Portability guard: the emitted JavaScript must not reference Bun globals or Node built-ins.
const offenders:string[]=[];
async function* files(dir:string):AsyncGenerator<string>{for(const entry of await readdir(dir,{withFileTypes:true})){const path=resolve(dir,entry.name);if(entry.isDirectory())yield* files(path);else yield path;}}
for await(const file of files(output)){
  if(file.endsWith(".js")){
    const source=await readFile(file,"utf8");
    if(/\bBun\.(?!build)|from\s*["']node:|require\(["']node:|from\s*["']bun["']/.test(source.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm,"")))offenders.push(file);
  }
  if(file.endsWith(".d.ts")){
    // Declarations must resolve under moduleResolution node16/nodenext/bundler without TS-extension imports.
    const source=await readFile(file,"utf8");
    const fixed=source.replace(/(from\s+["']\.{1,2}\/[^"']+?)\.ts(["'])/g,"$1.js$2").replace(/(import\(["']\.{1,2}\/[^"']+?)\.ts(["']\))/g,"$1.js$2");
    if(fixed!==source)await writeFile(file,fixed);
    if(/\bBun\b/.test(fixed.replace(/\/\*\*[\s\S]*?\*\//g,"")))offenders.push(file);
  }
}
if(offenders.length){console.error(`Runtime-specific references in build output:\n${offenders.join("\n")}`);process.exit(1);}
console.log(`Built ${result.outputs.length} portable JavaScript artifacts and complete TypeScript declarations.`);
