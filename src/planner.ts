import { capabilitiesFromPath, defaultCapabilities, type CapabilitiesDocument, type ResourceCapabilities, type SelectionCapability } from './capabilities.ts';
import { PlannerError } from './errors.ts';
import { V1Catalog, isAllowedV1Filter } from './v1-catalog.ts';
import type { PlanRequestData, PlannedRequest, RequestPlan, SplitRequest } from './types.ts';

const normalize = (value: string): string => value.trim().replace(/[A-Z]/g, c => c.toLowerCase());
const uniqueSelections = (selections: readonly string[]): string[] => [...new Set(selections.map(normalize).filter(Boolean))];

/** Mutable, chainable request builder with Rust-compatible method aliases. */
export class PlanRequest implements PlanRequestData {
  resource: string;
  selections: string[];
  id?: string;
  filters: Record<string, string> = {};
  pathArgs: Record<string, string> = {};
  legacySelections: string[] = [];
  constructor(resource: string, selections: readonly string[] = []) {
    this.resource = normalize(resource);
    this.selections = selections.map(normalize);
  }
  static new(resource: string, selections: readonly string[] = []): PlanRequest { return new PlanRequest(resource, selections); }
  get path_args(): Record<string, string> { return this.pathArgs; }
  set path_args(value: Record<string, string>) { this.pathArgs = value; }
  get legacy_selections(): string[] { return this.legacySelections; }
  set legacy_selections(value: string[]) { this.legacySelections = value; }
  withId(id: string | number | bigint): this { this.id = String(id); return this; }
  withFilter(name: string, value: string | number | bigint | boolean): this { this.filters[normalize(name)] = String(value); return this; }
  withPathArg(name: string, value: string | number | bigint): this { this.pathArgs[name] = String(value); return this; }
  withLegacySelection(selection: string): this { this.legacySelections.push(normalize(selection)); return this; }
  with_id(id: string | number): this { return this.withId(id); }
  with_filter(name: string, value: string | number | boolean): this { return this.withFilter(name, value); }
  with_path_arg(name: string, value: string | number): this { return this.withPathArg(name, value); }
  with_legacy_selection(selection: string): this { return this.withLegacySelection(selection); }
}

function failure(kind: string, details: Record<string, string>): never {
  const messages: Record<string, string> = {
    UnknownResource: `Unknown resource '${details.resource}'`,
    UnknownSelection: `Unknown selection '${details.selection}' for resource '${details.resource}'`,
    MissingGenericEndpoint: `Missing generic endpoint for resource '${details.resource}'`,
    MissingDirectEndpoint: `Missing direct endpoint for '${details.resource}.${details.selection}'`,
    MissingPathParameter: `Missing path parameter '${details.parameter}' for '${details.resource}.${details.selection}'`,
  };
  throw new PlannerError(messages[kind] ?? kind, kind, details);
}

function placeholders(path: string): string[] {
  const out: string[] = [];
  let active = false, current = '';
  for (const c of path) {
    if (c === '{') { active = true; current = ''; continue; }
    if (c === '}') { if (active && current) out.push(current); active = false; current = ''; continue; }
    if (active) current += c;
  }
  return out;
}

function pathValue(name: string, request: PlanRequestData): string | undefined {
  if (name === 'ids') return request.pathArgs?.[name] ?? request.id;
  if (name === 'id') return request.id ?? request.pathArgs?.[name];
  return request.pathArgs?.[name];
}

function directPath(resource: string, selection: SelectionCapability, request: PlanRequestData): string {
  const endpoints = selection.endpoints ?? [];
  const details = { resource, selection: selection.name };
  if (!endpoints.length) failure('MissingDirectEndpoint', details);
  const withId: string[] = [], withoutId: string[] = [];
  let firstMissing: string | undefined;
  for (const endpoint of endpoints) {
    const params = placeholders(endpoint);
    const missing = params.filter(name => pathValue(name, request) === undefined);
    if (missing.length) { firstMissing ??= missing[0]; continue; }
    (params.includes('id') ? withId : withoutId).push(endpoint);
  }
  const chosen = (request.id !== undefined ? withId[0] : undefined) ?? withoutId[0] ?? withId[0];
  if (chosen === undefined) {
    if (firstMissing !== undefined) failure('MissingPathParameter', { ...details, parameter: firstMissing });
    failure('MissingDirectEndpoint', details);
  }
  let path = chosen;
  for (const name of placeholders(chosen)) path = path.split(`{${name}}`).join(pathValue(name, request)!);
  return path;
}

/** Preserves Rust planner grouping, routing order, filter scrubbing and split fallback. */
export class RequestPlanner {
  readonly capabilities: CapabilitiesDocument;
  readonly v1Catalog = new V1Catalog();
  constructor(capabilities: CapabilitiesDocument = defaultCapabilities) { this.capabilities = capabilities; }
  static fromCapabilities(capabilities: CapabilitiesDocument): RequestPlanner { return new RequestPlanner(capabilities); }
  static from_capabilities(capabilities: CapabilitiesDocument): RequestPlanner { return this.fromCapabilities(capabilities); }
  static async fromCapabilitiesFile(path: string | URL): Promise<RequestPlanner> { return new RequestPlanner(await capabilitiesFromPath(path)); }
  static from_capabilities_file(path: string | URL): Promise<RequestPlanner> { return this.fromCapabilitiesFile(path); }

  plan(request: PlanRequestData): RequestPlan {
    const resource = normalize(request.resource);
    const caps = Object.hasOwn(this.capabilities.resources, resource) ? this.capabilities.resources[resource] : undefined;
    if (!caps && !this.v1Catalog.resource(resource)) failure('UnknownResource', { resource });
    const combined: SelectionCapability[] = [], standalone: SelectionCapability[] = [], direct: SelectionCapability[] = [];
    const v1: string[] = [];
    for (const name of uniqueSelections(request.selections)) {
      const selection = caps?.selections?.find(item => item.name === name);
      if (selection) {
        if ((selection.unavailable_in_v2 || selection.fallback_to_v1) && this.v1Catalog.hasSelection(resource, name)) v1.push(name);
        else if (selection.requires_direct_endpoint_only || !selection.can_use_generic_endpoint) direct.push(selection);
        else if (selection.standalone_only) standalone.push(selection);
        else combined.push(selection);
      } else if (this.v1Catalog.hasSelection(resource, name)) v1.push(name);
      else failure('UnknownSelection', { resource, selection: name });
    }
    const requests: PlannedRequest[] = [];
    if (combined.length) {
      const planned = this.generic(resource, caps!, request, combined.map(item => item.name), 'generic-combined');
      if (combined.length > 1) planned.fallbackSplit = combined.map(item => {
        const { fallbackSplit: _, ...split } = this.generic(resource, caps!, request, [item.name], 'generic-single');
        return split satisfies SplitRequest;
      });
      requests.push(planned);
    }
    for (const selection of standalone) requests.push(this.generic(resource, caps!, request, [selection.name], 'generic-single'));
    for (const selection of direct) requests.push({
      resource, path: directPath(resource, selection, request), method: 'GET',
      query: this.filters(request, new Set(selection.query_parameters ?? [])),
      selections: [selection.name], strategy: 'direct-endpoint', fallbackSplit: [], apiVersion: 'v2',
    });
    if (v1.length) requests.push({
      resource, path: this.v1Catalog.buildGenericPath(resource, request.id)!, method: 'GET',
      query: { ...this.filters(request, { has: isAllowedV1Filter }), selections: v1.join(',') },
      selections: v1, strategy: v1.length > 1 ? 'generic-combined' : 'generic-single', fallbackSplit: [], apiVersion: 'v1',
    });
    return { resource, requests };
  }

  private filters(request: PlanRequestData, allowed: { has(name: string): boolean }): Record<string, string> {
    return Object.fromEntries(Object.entries(request.filters ?? {}).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).filter(([name]) => allowed.has(name)));
  }
  private generic(resource: string, caps: ResourceCapabilities, request: PlanRequestData, selections: string[], strategy: PlannedRequest['strategy']): PlannedRequest {
    if (caps.generic_path === undefined || caps.generic_path === null) failure('MissingGenericEndpoint', { resource });
    const allowed = new Set((caps.generic_parameters ?? []).map(item => item.name));
    const query = this.filters(request, allowed);
    const legacy = uniqueSelections(request.legacySelections ?? []);
    if (legacy.length && allowed.has('legacy')) query.legacy = legacy.join(',');
    if (request.id !== undefined && allowed.has('id')) query.id = request.id;
    query.selections = selections.join(',');
    return { resource, path: caps.generic_path, method: 'GET', query, selections, strategy, fallbackSplit: [], apiVersion: 'v2' };
  }
}
