/**
 * Pack the package and smoke-test the tarball in fresh consumer projects (PARITY_SPEC P9.5).
 *
 *   bun tools/pack-smoke.ts [--runtime node|deno|bun|tsc|all] [--keep]
 *
 * Creates `<tmp>/torn-ts-sdk-smoke-*`, installs the tarball with npm (no other dependencies; TypeScript is installed
 * only for the `tsc` consumer check), then runs tools/smoke/smoke.mjs under the requested runtimes and typechecks
 * tools/smoke/consumer.ts with default `tsc` settings (module nodenext, strict). Requires npm (and deno for `deno`).
 */
import { mkdtemp, copyFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root=resolve(import.meta.dir,"..");
const args=process.argv.slice(2);
const runtimeArg=args.includes("--runtime")?args[args.indexOf("--runtime")+1]!:"all";
const runtimes=runtimeArg==="all"?["node","bun","deno","tsc"]:runtimeArg.split(",");
const npm=process.platform==="win32"?"npm.cmd":"npm";
async function run(command:string[],cwd:string,env:Record<string,string>={}):Promise<string> {
  const child=Bun.spawn(command,{cwd,stdout:"pipe",stderr:"pipe",env:{...process.env,...env}});
  const [out,err,code]=await Promise.all([new Response(child.stdout).text(),new Response(child.stderr).text(),child.exited]);
  if(code!==0)throw new Error(`${command.join(" ")} failed (${code}):\n${out}\n${err}`);
  return out;
}
const packed=(await run([npm,"pack","--json","--pack-destination",tmpdir()],root)).trim();
const tarball=join(tmpdir(),(JSON.parse(packed) as {filename:string}[])[0]!.filename);
const project=await mkdtemp(join(tmpdir(),"torn-ts-sdk-smoke-"));
try {
  await writeFile(join(project,"package.json"),JSON.stringify({name:"torn-ts-sdk-smoke",private:true,type:"module"},null,2));
  await run([npm,"install","--no-audit","--no-fund",tarball],project);
  await copyFile(resolve(root,"tools/smoke/smoke.mjs"),join(project,"smoke.mjs"));
  const env={TORN_API_KEY:"SMOKE_RUNTIME_ENV"};
  for(const runtime of runtimes){
    if(runtime==="node")console.log((await run(["node","smoke.mjs"],project,env)).trim());
    else if(runtime==="bun")console.log((await run([process.execPath,"smoke.mjs"],project,env)).trim());
    else if(runtime==="deno")console.log((await run(["deno","run","--allow-env","--allow-read","smoke.mjs"],project,env)).trim());
    else if(runtime==="tsc"){
      await run([npm,"install","--no-audit","--no-fund","typescript@5.9.3"],project);
      await copyFile(resolve(root,"tools/smoke/consumer.ts"),join(project,"consumer.ts"));
      await writeFile(join(project,"tsconfig.json"),JSON.stringify({compilerOptions:{target:"es2022",module:"nodenext",moduleResolution:"nodenext",strict:true,noEmit:true,types:[]},files:["consumer.ts"]},null,2));
      await run(["node",join(project,"node_modules/typescript/bin/tsc"),"-p","tsconfig.json"],project);
      console.log("tsc consumer typecheck ok (module nodenext, strict, no allowImportingTsExtensions)");
    } else throw new Error(`unknown runtime ${runtime}`);
  }
} finally {
  if(!args.includes("--keep"))await rm(project,{recursive:true,force:true});
  await rm(tarball,{force:true});
}
