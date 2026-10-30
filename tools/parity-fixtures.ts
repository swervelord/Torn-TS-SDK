/** Verify the committed planner regression contracts against both supported specification snapshots. */
import { PlanRequest, RequestPlanner } from '../src/planner.ts';
import { defaultCapabilities } from '../src/capabilities.ts';
import type { PlanRequestData } from '../src/types.ts';
import sourceCapabilities from '../spec/versions/torn-capabilities-6.13.6.json' with { type: 'json' };
import { componentSchemaNames, operationDefinitions } from '../src/generated/operation-data.ts';

const goldenPath = new URL('../spec/parity/planner-golden.json', import.meta.url);
const manifestPath = new URL('../spec/parity/parity-manifest.json', import.meta.url);
const fixtures = await Bun.file(goldenPath).json() as { input: PlanRequestData; expected: unknown }[];
const manifest = await Bun.file(manifestPath).json();
const planners = [new RequestPlanner(sourceCapabilities), new RequestPlanner()];
for (const planner of planners) {
for (const fixture of fixtures) {
  const input = fixture.input;
  const builder = new PlanRequest(input.resource, input.selections);
  if (input.id !== undefined) builder.withId(input.id);
  for (const [name, value] of Object.entries(input.filters ?? {})) builder.withFilter(name, value);
  for (const [name, value] of Object.entries(input.pathArgs ?? {})) builder.withPathArg(name, value);
  for (const selection of input.legacySelections ?? []) builder.withLegacySelection(selection);
  let result: unknown;
  try { result = { plan: planner.plan(builder) }; }
  catch (error) { const typed = error as { kind: string; details: unknown }; result = { error: { kind: typed.kind, details: typed.details } }; }
  if (!Bun.deepEquals(result, fixture.expected)) throw new Error(`Planner regression contract mismatch: ${JSON.stringify(input)}`);
}
}
const hash = new Bun.CryptoHasher('sha256'); hash.update(await Bun.file(goldenPath).arrayBuffer());
if (hash.digest('hex') !== manifest.provenance.goldenSha256) throw new Error('Golden hash differs from pinned provenance manifest');
if (fixtures.length !== manifest.plannerScenarioCount) throw new Error('Golden scenario count differs from parity manifest');
const selections = Object.values(defaultCapabilities.resources).reduce((total, caps) => total + (caps.selections?.length ?? 0), 0);
if (selections !== manifest.selectionCount + 3) throw new Error('Capability selection coverage differs from pinned parity manifest');
const baselineSpec = await Bun.file(new URL('../spec/versions/torn-openapi-6.13.6.json', import.meta.url)).json();
const currentSpec = await Bun.file(new URL('../spec/torn-openapi-current.json', import.meta.url)).json();
if (Object.keys(baselineSpec.components.schemas).length !== manifest.schemaCount) throw new Error('Source baseline schema count differs from pinned parity manifest');
if (!Bun.deepEquals([...componentSchemaNames].sort(), Object.keys(currentSpec.components.schemas).sort())) throw new Error('Current generated schema coverage differs from current spec');
if (!Bun.deepEquals(Object.values(operationDefinitions).map(operation => operation.path).sort(), Object.keys(currentSpec.paths).sort())) throw new Error('Generated operation paths differ from source operation inventory');
console.log(`SDK regression contracts: ${fixtures.length} planner scenarios verified against baseline ${baselineSpec.info.version} and current ${currentSpec.info.version}; ${selections} current selections, ${Object.keys(operationDefinitions).length} current operations; source ${manifest.schemaCount} / current ${componentSchemaNames.length} schemas.`);
