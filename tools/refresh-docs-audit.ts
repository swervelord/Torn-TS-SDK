/**
 * Recompute the current-snapshot fields of spec/parity/docs-coverage.json after a spec bump.
 *
 *   bun tools/refresh-docs-audit.ts            # dry run: self-check flags + the recomputed live block
 *   bun tools/refresh-docs-audit.ts --write    # writes the refreshed audit
 *   bun tools/refresh-docs-audit.ts --check    # fails when the committed audit is stale or not reproducible (in `bun run check`)
 *
 * It first self-checks that the committed audit is reproducible from spec/versions/torn-openapi-<audit.live.version>.json,
 * then recomputes from spec/torn-openapi-current.json. operationChanges/addedSchemas/changedSchemas are cumulative against
 * the frozen 6.13.6 baseline, in spec order.
 */
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type Json = Record<string, any>;
const root = resolve(import.meta.dir, "..");
const readJson = async (path: string): Promise<Json> => JSON.parse(await readFile(resolve(root, path), "utf8")) as Json;
function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (value !== null && typeof value === "object") return "{" + Object.keys(value).sort().map(key => JSON.stringify(key) + ":" + canonical((value as Record<string, unknown>)[key])).join(",") + "}";
  return JSON.stringify(value);
}
const hash = (value: unknown) => createHash("sha256").update(canonical(value)).digest("hex");
const auditPath = resolve(root, "spec/parity/docs-coverage.json");
const committed = (await readFile(auditPath, "utf8")).replace(/\r\n/g, "\n");
const audit = JSON.parse(committed) as Json;
const baseline = await readJson("spec/versions/torn-openapi-6.13.6.json");
function compute(current: Json) {
  const opHashes: Record<string, string> = {}; for (const path of Object.keys(current.paths)) opHashes[path] = hash(current.paths[path].get);
  const paramHashes: Record<string, string> = {}; for (const name of Object.keys(audit.currentParameterHashes)) paramHashes[name] = hash(current.components.parameters[name]);
  const operationChanges = Object.keys(current.paths).filter(path => !baseline.paths[path] || hash(baseline.paths[path].get) !== opHashes[path]);
  const addedSchemas = Object.keys(current.components.schemas).filter(name => !baseline.components.schemas[name]);
  const removedSchemas = Object.keys(baseline.components.schemas).filter(name => !current.components.schemas[name]);
  const changedSchemas = Object.keys(current.components.schemas).filter(name => baseline.components.schemas[name] && hash(current.components.schemas[name]) !== hash(baseline.components.schemas[name]));
  return { version: current.info.version, canonicalSha256: hash(current), operationCount: Object.keys(current.paths).length, schemaCount: Object.keys(current.components.schemas).length, operationChanges, addedSchemas, removedSchemas, changedSchemas, opHashes, paramHashes };
}
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const previous = compute(await readJson(`spec/versions/torn-openapi-${audit.live.version}.json`));
const selfCheck = {
  hash: previous.canonicalSha256 === audit.live.canonicalSha256, opChanges: same(previous.operationChanges, audit.live.operationChanges),
  added: same(previous.addedSchemas, audit.live.addedSchemas), changed: same(previous.changedSchemas, audit.live.changedSchemas),
  opHashes: same(previous.opHashes, audit.currentOperationHashes), params: same(previous.paramHashes, audit.currentParameterHashes),
};
const current = compute(await readJson("spec/torn-openapi-current.json"));
audit.sdkCurrent.version = current.version; audit.sdkCurrent.canonicalSha256 = current.canonicalSha256;
for (const key of ["version", "canonicalSha256", "operationCount", "schemaCount", "operationChanges", "addedSchemas", "removedSchemas", "changedSchemas"] as const) audit.live[key] = current[key];
audit.currentOperationHashes = current.opHashes; audit.currentParameterHashes = current.paramHashes;
const refreshed = JSON.stringify(audit, null, 2) + "\n";
if (process.argv.includes("--check")) {
  const failed = Object.entries(selfCheck).filter(([, ok]) => !ok).map(([name]) => name);
  if (failed.length) { console.error(`docs-coverage.json is not reproducible from its own snapshot (${failed.join(", ")})`); process.exit(1); }
  if (refreshed !== committed) { console.error("spec/parity/docs-coverage.json is stale; run bun run refresh:docs-audit"); process.exit(1); }
  console.log(`Docs-coverage audit is current (API ${current.version}, ${current.operationCount} operations, ${current.schemaCount} schemas).`);
} else {
  console.log("reproduces committed audit:", selfCheck);
  console.log(JSON.stringify({ live: audit.live }, null, 1));
  if (process.argv.includes("--write")) await writeFile(auditPath, refreshed);
}
