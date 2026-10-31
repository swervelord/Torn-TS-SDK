/**
 * Refresh spec/parity/typing-classification-current.json after a spec bump.
 *
 *   bun tools/refresh-typing-classification.ts            # dry run: prints {added, removed, resynced, apiVersion, total}
 *   bun tools/refresh-typing-classification.ts --write    # writes the refreshed file
 *   bun tools/refresh-typing-classification.ts --check    # fails when the committed file is stale (part of `bun run check`)
 *
 * Adds entries for new capability selections whose facade helper returns a generated (non-manual) model (strict typed),
 * drops removed selections, re-syncs schema_refs from spec/capabilities.json, and refreshes provenance hashes/apiVersion.
 */
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { facadeManifest } from "../src/wrapper/manifest.ts";
import { manualModelMetadata } from "../src/models/manual-metadata.ts";

interface Entry { resource: string; selection: string; class: string; helper: string | null; return_type: string | null; notes: string[]; has_extra: boolean; has_dynamic: boolean; missing_model: boolean; schema_refs: string[] }
interface Capabilities { spec: { version: string }; resources: Record<string, { selections: { name: string; response_schema_refs?: string[] }[] }> }
const root = resolve(import.meta.dir, "..");
const path = resolve(root, "spec/parity/typing-classification-current.json");
const capabilities = JSON.parse(await readFile(resolve(root, "spec/capabilities.json"), "utf8")) as Capabilities;
const committed = (await readFile(path, "utf8")).replace(/\r\n/g, "\n");
const doc = JSON.parse(committed) as { provenance: Record<string, string>; selections: Entry[] };
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const existing = new Map<string, Entry>(doc.selections.map(entry => [`${entry.resource}.${entry.selection}`, entry]));
const out: Entry[] = [], added: string[] = [], resynced: string[] = [];
const manifest = facadeManifest as unknown as Record<string, { methods: readonly { method: string; selection: string; returnType: string }[] }>;
for (const [resource, caps] of Object.entries(capabilities.resources)) {
  const methods = manifest[resource]?.methods ?? [];
  for (const cap of caps.selections) {
    const key = `${resource}.${cap.name}`, refs = [...cap.response_schema_refs ?? []].sort();
    let entry = existing.get(key);
    if (!entry) {
      const candidates = methods.filter(method => method.selection.toLowerCase() === cap.name.toLowerCase());
      const helper = candidates.find(method => method.method === cap.name) ?? candidates[0];
      if (!helper) throw new Error(`No facade helper for new selection ${key}; add it to src/wrapper/manifest.ts first`);
      if (Object.hasOwn(manualModelMetadata, helper.returnType)) throw new Error(`${key} uses manual model ${helper.returnType}; classify it by hand`);
      entry = { resource, selection: cap.name, class: refs.length ? "strict-typed" : "missing-schema", helper: helper.method, return_type: helper.returnType, notes: [], has_extra: false, has_dynamic: false, missing_model: false, schema_refs: refs };
      added.push(key);
    } else if (JSON.stringify([...entry.schema_refs].sort()) !== JSON.stringify(refs)) { entry.schema_refs = refs; resynced.push(key); }
    out.push(entry); existing.delete(key);
  }
}
const removed = [...existing.keys()];
out.sort((a, b) => `${a.resource}.${a.selection}`.localeCompare(`${b.resource}.${b.selection}`));
doc.selections = out;
doc.provenance.facade_manifest_sha256 = hash(facadeManifest);
doc.provenance.manual_metadata_sha256 = hash(manualModelMetadata);
doc.provenance.apiVersion = capabilities.spec.version;
const refreshed = JSON.stringify(doc, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (refreshed !== committed) { console.error("spec/parity/typing-classification-current.json is stale; run bun run refresh:typing-classification"); process.exit(1); }
  console.log(`Typing classification is current (${out.length} selections, API ${doc.provenance.apiVersion}).`);
} else {
  console.log({ added, removed, resynced, apiVersion: doc.provenance.apiVersion, total: out.length });
  if (process.argv.includes("--write")) await writeFile(path, refreshed);
}
