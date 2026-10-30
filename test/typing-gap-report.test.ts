import { describe, expect, test } from 'bun:test';
import { fileURLToPath } from 'node:url';
import { buildTypingGapReport, buildSourceTypingGapReport, classifyTyping, formatTypingGapReport, loadReport, typingClassLabel, sourceTypingReportVersion } from '../src/typing-gap.ts';
import { defaultCapabilities } from '../src/capabilities.ts';
import snapshot from '../spec/parity/typing-classification.json' with { type: 'json' };

describe('Typing coverage report regression contract', () => {
  test('classifies all 205 selections according to the committed baseline report', () => {
    const report = buildSourceTypingGapReport();
    expect(report.total_selections).toBe(205);
    expect(report.typed_helpers).toBe(205);
    expect(report.class_counts()).toEqual({ 'dynamic facade': 125, 'missing schema': 19, 'strict typed': 49, 'typed with extra': 12 });
    expect(report.missing_helpers()).toEqual([]);
    expect(report.unexpected_raw_helpers()).toEqual([]);
    expect(Object.keys(report.resources)).toHaveLength(9);
    for (const [index, selection] of report.selections.entries()) {
      const original = snapshot.selections[index]!;
      expect(selection).toMatchObject({ resource: original.resource, selection: original.selection, class: original.class, helper: original.helper, return_type: original.return_type, schema_refs: original.schema_refs, notes: original.notes });
    }
  });
  test('Markdown output matches the committed baseline report', async () => {
    const expected = await Bun.file(new URL('../spec/parity/typing-gap-report.md', import.meta.url)).text();
    expect(formatTypingGapReport(buildSourceTypingGapReport())).toBe(expected);
  });
  test('current report audits the6.13.8 captain rename while preserving baseline source refs', () => {
    const current = buildTypingGapReport();
    const baseline = buildSourceTypingGapReport();
    expect(sourceTypingReportVersion).toBe('6.13.6');
    expect(current.classCounts()).toEqual({ ...baseline.classCounts(), 'strict typed': 52 });
    expect(current.total_selections).toBe(208);
    expect(current.selections.find(selection => selection.resource === 'torn' && selection.selection === 'elimination')!.schema_refs).toContain('#/components/schemas/TornEliminationTeamCaptain');
    expect(baseline.selections.find(selection => selection.resource === 'torn' && selection.selection === 'elimination')!.schema_refs).toContain('#/components/schemas/TornEliminationTeamLeader');
  });
  test('JSON output preserves public field names and serializes only report data', () => {
    const json = JSON.parse(JSON.stringify(buildTypingGapReport()));
    expect(Object.keys(json)).toEqual(['total_selections', 'typed_helpers', 'resources', 'selections']);
    expect(Object.keys(json.selections[0])).toEqual(['resource', 'selection', 'class', 'helper', 'return_type', 'schema_refs', 'missing_schema_refs', 'notes']);
  });
  test('load_report accepts the package root without reference source tooling', async () => {
    const report = await loadReport(fileURLToPath(new URL('..', import.meta.url)));
    expect(report.classCounts()).toEqual(buildTypingGapReport().classCounts());
  });
  test('classifier preserves all six classification precedence branches', () => {
    const model = { has_extra: false, has_dynamic: false, missing_model: false };
    expect(classifyTyping(undefined, ['schema'], [], model)).toBe('schema-exists-but-not-wired');
    expect(classifyTyping(undefined, [], [], model)).toBe('missing-schema');
    expect(classifyTyping({ return_type: 'RawSelectionBundle' }, [], [], model)).toBe('raw-only');
    expect(classifyTyping({ return_type: 'Typed' }, [], [], model)).toBe('missing-schema');
    expect(classifyTyping({ return_type: 'Typed' }, ['schema'], ['schema'], model)).toBe('missing-schema');
    expect(classifyTyping({ return_type: 'Typed' }, ['schema'], [], { ...model, missing_model: true })).toBe('schema-exists-but-not-wired');
    expect(classifyTyping({ return_type: 'Typed' }, ['schema'], [], { ...model, has_dynamic: true, has_extra: true })).toBe('dynamic-facade');
    expect(classifyTyping({ return_type: 'Typed' }, ['schema'], [], { ...model, has_extra: true })).toBe('typed-with-extra');
    expect(classifyTyping({ return_type: 'Typed' }, ['schema'], [], model)).toBe('strict-typed');
    expect(typingClassLabel('raw-only')).toBe('raw-only');
  });
  test('inventory freshness rejects added/removed selections and changed schema refs', () => {
    const added = structuredClone(defaultCapabilities);
    added.resources.user!.selections!.push({ name: 'new-selection' });
    expect(() => buildTypingGapReport(added)).toThrow('inventory is stale');
    const removed = structuredClone(defaultCapabilities);
    removed.resources.user!.selections!.pop();
    expect(() => buildTypingGapReport(removed)).toThrow('capability removed');
    const changed = structuredClone(defaultCapabilities);
    changed.resources.user!.selections![0]!.response_schema_refs = ['#/components/schemas/Changed'];
    expect(() => buildTypingGapReport(changed)).toThrow('schema reference inventory changed');
  });
  test('missing upstream component schemas are diagnosed from current inputs', () => {
    const report = buildTypingGapReport(defaultCapabilities, []);
    expect(report.selections.find(selection => selection.resource === 'user' && selection.selection === 'profile')!.class).toBe('missing-schema');
    expect(report.selections.find(selection => selection.resource === 'user' && selection.selection === 'profile')!.missing_schema_refs.length).toBeGreaterThan(0);
  });
  test('CLI JSON mode runs with Bun alone', async () => {
    const child = Bun.spawn([process.execPath, 'tools/typing-gap-report.ts', '--json'], { cwd: fileURLToPath(new URL('..', import.meta.url)), stdout: 'pipe', stderr: 'pipe' });
    const output = await new Response(child.stdout).text();
    expect(await child.exited).toBe(0);
    expect(JSON.parse(output).total_selections).toBe(208);
  });
});
