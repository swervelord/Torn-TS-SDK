import sourceClassification from '../spec/parity/typing-classification.json' with { type: 'json' };
import sourceCapabilities from '../spec/versions/torn-capabilities-6.13.6.json' with { type: 'json' };
import sourceSchemaNames from '../spec/parity/source-schema-names.json' with { type: 'json' };
import { defaultCapabilities, capabilitiesFromPath, type CapabilitiesDocument } from './capabilities.ts';
import { componentSchemaNames } from './generated/operation-data.ts';
import { manualModelMetadata } from './models/manual-metadata.ts';
import { facadeManifest } from './wrapper/manifest.ts';

export type TypingClass = 'strict-typed' | 'typed-with-extra' | 'dynamic-facade' | 'raw-only' | 'missing-schema' | 'schema-exists-but-not-wired';
export const typingClassLabel = (classification: TypingClass): string => classification === 'raw-only' ? 'raw-only' : classification.replaceAll('-', ' ');
export interface SelectionTyping {
  resource: string; selection: string; class: TypingClass;
  helper: string | null; return_type: string | null;
  schema_refs: string[]; missing_schema_refs: string[]; notes: string[];
}
export interface ResourceTypingSummary { total: number; typed_helpers: number; classes: Record<string, number> }
export class TypingGapReport {
  constructor(public total_selections: number, public typed_helpers: number, public resources: Record<string, ResourceTypingSummary>, public selections: SelectionTyping[]) {}
  classCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const selection of this.selections) { const label = typingClassLabel(selection.class); counts[label] = (counts[label] ?? 0) + 1; }
    return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
  }
  missingHelpers(): SelectionTyping[] { return this.selections.filter(selection => selection.helper === null); }
  unexpectedRawHelpers(): SelectionTyping[] { return this.selections.filter(selection => selection.class === 'raw-only' && selection.helper !== null && !selection.helper.endsWith('_raw')); }
  class_counts(): Record<string, number> { return this.classCounts(); }
  missing_helpers(): SelectionTyping[] { return this.missingHelpers(); }
  unexpected_raw_helpers(): SelectionTyping[] { return this.unexpectedRawHelpers(); }
}

/** Provenance is kept explicit because the Rust classifier uses textual model-analysis quirks. */
export const typingClassificationProvenance = sourceClassification.provenance;
/** Audited metadata changes since the source SDK baseline. Other reference drift remains an error. */
export const typingReportSchemaRefUpgrades: Readonly<Record<string, Readonly<Record<string, Readonly<Record<string, string>>>>>> = {
  '6.13.8': { 'torn.elimination': { '#/components/schemas/TornEliminationTeamLeader': '#/components/schemas/TornEliminationTeamCaptain' } },
};
export const sourceTypingReportVersion = '6.13.6';
type Method = { method: string; selection: string; returnType: string };
type Analysis = { has_extra: boolean; has_dynamic: boolean; missing_model: boolean };
export function classifyTyping(helper: { return_type: string } | undefined, schemaRefs: readonly string[], missingSchemaRefs: readonly string[], model: Analysis): TypingClass {
  if (!helper) return schemaRefs.length && !missingSchemaRefs.length ? 'schema-exists-but-not-wired' : 'missing-schema';
  if (helper.return_type === 'RawSelectionBundle') return 'raw-only';
  if (!schemaRefs.length || missingSchemaRefs.length) return 'missing-schema';
  if (model.missing_model) return 'schema-exists-but-not-wired';
  if (model.has_dynamic) return 'dynamic-facade';
  if (model.has_extra) return 'typed-with-extra';
  return 'strict-typed';
}

/** Re-evaluates source classifications against current capabilities, helpers and schema coverage. */
export function buildTypingGapReport(capabilities: CapabilitiesDocument = defaultCapabilities, schemaNames: Iterable<string> = componentSchemaNames): TypingGapReport {
  const hash = (value: unknown): string => new Bun.CryptoHasher('sha256').update(JSON.stringify(value)).digest('hex');
  if (hash(manualModelMetadata) !== sourceClassification.provenance.manual_metadata_sha256 || hash(facadeManifest) !== sourceClassification.provenance.facade_manifest_sha256) throw new Error('Typing model/helper metadata changed; refresh classification provenance');
  const schemas = new Set(schemaNames);
  const original = new Map(sourceClassification.selections.map(selection => [`${selection.resource}.${selection.selection}`, selection]));
  const observed = new Set<string>();
  const selections: SelectionTyping[] = [];
  const resources: Record<string, ResourceTypingSummary> = {};
  for (const [resource, caps] of Object.entries(capabilities.resources).sort(([a], [b]) => a.localeCompare(b))) {
    const methods = (facadeManifest as unknown as Record<string, { methods: Method[] }>)[resource]?.methods ?? [];
    for (const capability of caps.selections ?? []) {
      const key = `${resource}.${capability.name}`;
      const reference = original.get(key);
      if (!reference) throw new Error(`Typing classification inventory is stale: missing ${key}`);
      observed.add(key);
      const candidates = methods.filter(method => method.selection.toLowerCase() === capability.name.toLowerCase());
      const helper = candidates.find(method => method.method === capability.name) ?? candidates[0];
      if (helper?.method !== reference.helper || helper?.returnType !== reference.return_type) throw new Error(`Typing helper inventory changed for ${key}; refresh classification provenance`);
      const replacements = typingReportSchemaRefUpgrades[capabilities.spec?.version ?? '']?.[key] ?? {};
      const auditedRefs = reference.schema_refs.map(ref => replacements[ref] ?? ref).sort();
      if (JSON.stringify([...(capability.response_schema_refs ?? [])].sort()) !== JSON.stringify(auditedRefs)) throw new Error(`Typing schema reference inventory changed for ${key}; refresh classification provenance`);
      const schemaRefs = [...(capability.response_schema_refs ?? [])];
      const missingRefs = schemaRefs.filter(ref => !ref.startsWith('#/components/schemas/') || !schemas.has(ref.slice('#/components/schemas/'.length)));
      // The imported metadata proves the compatibility type still exists; the frozen flags
      // reproduce the pinned Rust classifier's source-level interpretation of that type.
      const knownModel = helper?.returnType === 'String' || helper?.returnType === 'RawSelectionBundle' || Object.hasOwn(manualModelMetadata, helper?.returnType ?? '') || schemas.has(helper?.returnType ?? '');
      const model = { has_extra: reference.has_extra, has_dynamic: reference.has_dynamic, missing_model: reference.missing_model || !knownModel };
      const classification = classifyTyping(helper ? { return_type: helper.returnType } : undefined, schemaRefs, missingRefs, model);
      const notes = [...(capability.notes ?? [])];
      if (model.has_extra) notes.push('manual model preserves unknown fields in extra');
      if (model.has_dynamic) notes.push('manual model contains dynamic JSON or open union fields');
      if (model.missing_model) notes.push('wrapper return type was not found in manual/generated models');
      if (missingRefs.length) notes.push('capability response schema reference is absent from OpenAPI components');
      if (!schemaRefs.length) notes.push('capability selection has no response schema reference');
      const selection: SelectionTyping = { resource, selection: capability.name, class: classification, helper: helper?.method ?? null, return_type: helper?.returnType ?? null, schema_refs: schemaRefs, missing_schema_refs: missingRefs, notes };
      selections.push(selection);
      const summary = resources[resource] ??= { total: 0, typed_helpers: 0, classes: {} };
      summary.total++;
      if (helper) summary.typed_helpers++;
      const label = typingClassLabel(classification); summary.classes[label] = (summary.classes[label] ?? 0) + 1;
    }
  }
  for (const key of original.keys()) if (!observed.has(key)) throw new Error(`Typing classification inventory is stale: capability removed ${key}`);
  selections.sort((a, b) => `${a.resource}.${a.selection}`.localeCompare(`${b.resource}.${b.selection}`));
  for (const summary of Object.values(resources)) summary.classes = Object.fromEntries(Object.entries(summary.classes).sort(([a], [b]) => a.localeCompare(b)));
  return new TypingGapReport(selections.length, selections.filter(selection => selection.helper !== null).length, resources, selections);
}

/** Reproduce the frozen Rust source report using its original capabilities and schema inventory. */
export function buildSourceTypingGapReport(): TypingGapReport {
  return buildTypingGapReport(sourceCapabilities, sourceSchemaNames);
}

export async function loadReport(root?: string): Promise<TypingGapReport> {
  if (!root) return buildTypingGapReport();
  const normalized = root.replace(/[\\/]+$/, '');
  const caps = await capabilitiesFromPath(`${normalized}/spec/capabilities.json`);
  const spec = await Bun.file(`${normalized}/spec/torn-openapi-current.json`).json();
  return buildTypingGapReport(caps, Object.keys(spec.components.schemas));
}
export const load_report = loadReport;

export function formatTypingGapReport(report: TypingGapReport): string {
  const lines = ['# Typing Gap Report', '', `- Typed helper coverage: \`${report.typed_helpers}\` / \`${report.total_selections}\` capability selections`, '- Payload classification:'];
  for (const [label, count] of Object.entries(report.classCounts())) lines.push(`  - \`${label}\`: ${count}`);
  lines.push('', '## Resource Summary', '', '| Resource | Typed Helpers | Total | Classes |', '| --- | ---: | ---: | --- |');
  for (const [resource, summary] of Object.entries(report.resources)) lines.push(`| \`${resource}\` | ${summary.typed_helpers} | ${summary.total} | ${Object.entries(summary.classes).map(([label, count]) => `${label}: ${count}`).join(', ')} |`);
  lines.push('', '## Selection Detail', '', '| Selection | Class | Helper | Return Type | Schema Refs | Notes |', '| --- | --- | --- | --- | --- | --- |');
  for (const selection of report.selections) lines.push(`| \`${selection.resource}.${selection.selection}\` | ${typingClassLabel(selection.class)} | \`${selection.helper ?? '-'}\` | \`${selection.return_type ?? '-'}\` | ${selection.schema_refs.join('<br>') || '-'} | ${selection.notes.join('<br>') || '-'} |`);
  return lines.join('\n') + '\n';
}
