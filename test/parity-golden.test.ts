import { describe, expect, test } from 'bun:test';
import fixtures from '../spec/parity/planner-golden.json' with { type: 'json' };
import manifest from '../spec/parity/parity-manifest.json' with { type: 'json' };
import { PlanRequest, RequestPlanner } from '../src/planner.ts';
import type { PlanRequestData } from '../src/types.ts';
import { operationDefinitions, componentSchemaNames } from '../src/generated/operation-data.ts';
import sourceCapabilities from '../spec/versions/torn-capabilities-6.13.6.json' with { type: 'json' };
import sourceSchemaNames from '../spec/parity/source-schema-names.json' with { type: 'json' };

describe('differential parity against executed Rust reference', () => {
  const planner = new RequestPlanner();
  const sourcePlanner = new RequestPlanner(sourceCapabilities);
  for (const [index, fixture] of fixtures.entries()) {
    const input = fixture.input as PlanRequestData;
    test(`${index + 1}: ${input.resource.trim()}.${input.selections.join(',') || '(empty)'}`, () => {
      const builder = new PlanRequest(input.resource, input.selections);
      if (input.id !== undefined) builder.withId(input.id);
      for (const [name, value] of Object.entries(input.filters ?? {})) builder.withFilter(name, value);
      for (const [name, value] of Object.entries(input.pathArgs ?? {})) builder.withPathArg(name, value);
      for (const selection of input.legacySelections ?? []) builder.withLegacySelection(selection);
      let actual: unknown;
      try { actual = { plan: planner.plan(builder) }; }
      catch (error) { const typed = error as { kind: string; details: unknown }; actual = { error: { kind: typed.kind, details: typed.details } }; }
      expect(actual).toEqual(fixture.expected);
      let source: unknown;
      try { source = { plan: sourcePlanner.plan(builder) }; }
      catch (error) { const typed = error as { kind: string; details: unknown }; source = { error: { kind: typed.kind, details: typed.details } }; }
      expect(source).toEqual(fixture.expected);
    });
  }

  test('golden content hash matches pinned provenance', async () => {
    const hasher = new Bun.CryptoHasher('sha256');
    hasher.update(await Bun.file(new URL('../spec/parity/planner-golden.json', import.meta.url)).arrayBuffer());
    expect(hasher.digest('hex')).toBe(manifest.provenance.goldenSha256);
    expect(fixtures).toHaveLength(manifest.plannerScenarioCount);
  });

  test('source baseline schema inventory remains frozen; current generated coverage follows current spec', async () => {
    expect(Object.values(operationDefinitions).map(operation => operation.path).sort()).toEqual(manifest.operations.map(operation => operation.path).sort());
    expect(Object.keys(operationDefinitions)).toHaveLength(manifest.operationCount);
    const spec = await Bun.file(new URL('../spec/torn-openapi-current.json', import.meta.url)).json();
    expect((Array.from(componentSchemaNames) as string[]).sort()).toEqual(Object.keys(spec.components.schemas).sort());
    const baseline = await Bun.file(new URL('../spec/versions/torn-openapi-6.13.6.json', import.meta.url)).json();
    expect(sourceSchemaNames).toHaveLength(manifest.schemaCount);
    expect([...sourceSchemaNames].sort()).toEqual(Object.keys(baseline.components.schemas).sort());
    expect(Object.keys(baseline.components.schemas)).toHaveLength(manifest.schemaCount);
    expect(baseline.info.version).toBe(manifest.provenance.apiVersion);
    expect(sourceCapabilities.spec.version).toBe(manifest.provenance.apiVersion);
  });

  test('every public Rust manual model has a TypeScript declaration', async () => {
    const source = await Bun.file(new URL('../src/models/manual.ts', import.meta.url)).text();
    const declarations = new Set([...source.matchAll(/export\s+(?:interface|type|class|enum)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g)].map(match => match[1]!));
    for (const names of Object.values(manifest.manualModels)) for (const name of names) expect(declarations.has(name), `Missing Rust manual model ${name}`).toBe(true);
  });
});
