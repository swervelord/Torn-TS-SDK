import { describe,expect,test } from 'bun:test';
import type { JsonValue } from '../src/types.ts';
import { operationDefinitions, componentSchemaNames, specificationVersion } from '../src/generated/operation-data.ts';
import { schemas } from '../src/generated/schema-data.ts';
import { legacySchemas } from '../src/generated/legacy-schema-data.ts';
interface OperationEntry {path:string;method:string;operationId:string;document:string;hash:string;parameterCount:number;responseContentTypes:string[]}
interface SchemaEntry {name:string;document:string;hash:string}
interface Selection {name:string;combine:string;flags:string;sdkCapabilityPresent:boolean;sdkGeneric:boolean;sdkStandalone:boolean;sdkFallback:boolean}
interface Audit {currentOperationHashes:Record<string,string>;currentParameterHashes:Record<string,string>;docs:{repository:string;commit:string;version:string;canonicalSha256:string;operationCount:number;schemaCount:number;sharedParameterCount:number};sdkBaseline:{version:string;semanticallyIdenticalToDocs:boolean};sdkCurrent:{version:string;canonicalSha256:string;matchesAuditedLiveSnapshot:boolean};live:{version:string;canonicalSha256:string;operationCount:number;schemaCount:number;operationChanges:string[];addedSchemas:string[];removedSchemas:string[];changedSchemas:string[]};operations:OperationEntry[];schemas:SchemaEntry[];sharedParameters:{name:string;hash:string}[];resources:{resource:string;selections:Selection[]}[];errors:string[];v1:{dedicatedSpecificationPresent:boolean;completeV1InventoryDocumented:boolean};otherServices:{service:string;endpointDocumentCount:number;sdkCovered:boolean}[]}
interface Spec {info:{version:string};paths:Record<string,Record<string,JsonValue>>;components:{schemas:Record<string,JsonValue>;parameters:Record<string,JsonValue>}}
interface Capabilities {resources:Record<string,{selections:{name:string;can_use_generic_endpoint:boolean;standalone_only:boolean;fallback_to_v1:boolean}[]}>}
const audit=await Bun.file(import.meta.dir+'/../spec/parity/docs-coverage.json').json() as Audit;
const baseline=await Bun.file(import.meta.dir+'/../spec/versions/torn-openapi-6.13.6.json').json() as Spec;
const current=await Bun.file(import.meta.dir+'/../spec/torn-openapi-current.json').json() as Spec;
const capabilities=await Bun.file(import.meta.dir+'/../spec/capabilities.json').json() as Capabilities;
function canonical(v:unknown):string {if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';if(v!==null&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical((v as Record<string,unknown>)[k])).join(',')+'}';return JSON.stringify(v);}
const hash=(v:unknown)=>new Bun.CryptoHasher('sha256').update(canonical(v)).digest('hex');

describe('official Torn Markdown vault coverage and freshness',()=>{
 test('audit has explicit immutable docs provenance and no missing Markdown definitions',()=>{
  expect(audit.docs.commit).toBe('ac4ba829bbdbdc4ef5e058b48aae5088b9d5fd22');
  expect(audit.errors).toEqual([]);expect(audit.docs.operationCount).toBe(234);expect(audit.docs.schemaCount).toBe(711);expect(audit.docs.sharedParameterCount).toBe(38);
  expect(hash(baseline)).toBe(audit.docs.canonicalSha256);expect(audit.sdkBaseline.semanticallyIdenticalToDocs).toBe(true);
 });
 test('current snapshot is the separately audited live6.13.8 API, not mislabeled frozen docs',()=>{
  expect(audit.docs.version).toBe('6.13.6');expect(current.info.version).toBe('6.14.0');expect(specificationVersion).toBe('6.14.0');
  expect(hash(current)).toBe(audit.live.canonicalSha256);expect(hash(current)).toBe(audit.sdkCurrent.canonicalSha256);
  expect(componentSchemaNames).toHaveLength(719);expect(audit.live.operationChanges).toContain("/user/halloween");expect(audit.live.operationChanges).toContain("/torn/halloween");
 });
 for(const entry of audit.operations)test(`${entry.method.toUpperCase()} ${entry.path} includes every documented parameter and response`,()=>{
  expect(hash(baseline.paths[entry.path]?.[entry.method])).toBe(entry.hash);
  expect(hash(current.paths[entry.path]?.[entry.method])).toBe(audit.currentOperationHashes[entry.path]!);
  expect(operationDefinitions[entry.operationId]?.path).toBe(entry.path);
  expect(entry.document).toStartWith('refs/endpoints/');
 });
 for(const entry of audit.schemas)test(`frozen Markdown schema ${entry.name}`,()=>{
  expect(hash(baseline.components.schemas[entry.name])).toBe(entry.hash);
  expect(hash(legacySchemas[entry.name])).toBe(entry.hash);
 });
 for(const entry of audit.sharedParameters)test(`shared parameter ${entry.name}`,()=>{
  expect(hash(baseline.components.parameters[entry.name])).toBe(entry.hash);
  expect(hash(current.components.parameters[entry.name])).toBe(audit.currentParameterHashes[entry.name]!);
 });
 test('all and only live schema changes are explicitly recorded',()=>{
  const added=Object.keys(current.components.schemas).filter(n=>!baseline.components.schemas[n]);
  const removed=Object.keys(baseline.components.schemas).filter(n=>!current.components.schemas[n]);
  const changed=Object.keys(baseline.components.schemas).filter(n=>current.components.schemas[n]&&hash(current.components.schemas[n])!==hash(baseline.components.schemas[n]));
  expect(added.sort()).toEqual([...audit.live.addedSchemas].sort());expect(removed.sort()).toEqual([...audit.live.removedSchemas].sort());expect(changed.sort()).toEqual([...audit.live.changedSchemas].sort());
  expect(added).toHaveLength(9);expect(added).toContain("UserHalloweenResponse");expect(added).toContain("TornHalloweenResponse");expect(removed).toEqual(['TornEliminationTeamLeader']);
  for(const name of added)expect(schemas[name]).toBeDefined();
 });
 for(const resource of audit.resources)for(const selection of resource.selections)test(`documented selection ${resource.resource}.${selection.name} is supported`,()=>{
  const capability=capabilities.resources[resource.resource]?.selections.find(s=>s.name===selection.name);
  expect(capability).toBeDefined();expect(selection.sdkCapabilityPresent).toBe(true);
  expect(capability?.can_use_generic_endpoint).toBe(selection.sdkGeneric);expect(capability?.standalone_only).toBe(selection.sdkStandalone);expect(capability?.fallback_to_v1).toBe(selection.sdkFallback);
 });
 test('coverage boundaries are explicit: no complete v1 spec or third-party SDK is implied',()=>{
  expect(audit.v1.dedicatedSpecificationPresent).toBe(false);expect(audit.v1.completeV1InventoryDocumented).toBe(false);
  expect(audit.otherServices.map(s=>[s.service,s.endpointDocumentCount,s.sdkCovered])).toEqual([['weav3r',11,false],['tornstats',17,false],['yata',10,false]]);
  expect(audit.resources.reduce((total,r)=>total+r.selections.length,0)).toBe(195);
 });
});
