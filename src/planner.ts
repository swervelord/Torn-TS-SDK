import { capabilitiesFromPath, defaultCapabilities, type CapabilitiesDocument, type ResourceCapabilities, type SelectionCapability } from './capabilities.ts';
import { PlannerError } from './errors.ts';
import { V1Catalog, isAllowedV1Filter } from './v1-catalog.ts';
import { selectionAccessLevels, accessLevelOrder, type AccessLevel } from './generated/access-levels.ts';
import { selectionCacheTtlMs } from './generated/cache-policy.ts';
import type { PlanRequestData, PlannedRequest, RequestPlan, SplitRequest } from './types.ts';

const normalize = (value: string): string => value.trim().replace(/[A-Z]/g, c => c.toLowerCase());
const uniqueSelections = (selections: readonly string[]): string[] => [...new Set(selections.map(normalize).filter(Boolean))];

/**
 * `default` (3.x): unknown selections pass through as v2 generic selections and unknown filters are forwarded verbatim
 * (PARITY_SPEC P1.5); selections Torn v2 serves through its own v1 fallback go to v2 and are re-planned on code 22
 * (P4.3); v1 paths use Torn's documented `/user/` form; requests carry access levels (P6) and cache TTLs (P8.4).
 * `legacy`: the exact 2.x plans (strict selection list, filter scrubbing, proactive v1 routing), kept for the frozen
 * planner goldens and for callers that depend on them.
 */
export type PlannerRouting = 'default' | 'legacy';
export interface PlannerOptions { routing?: PlannerRouting }
const LEGACY_V1_FILTERS = new Set(['cat', 'filters', 'from', 'limit', 'offset', 'sort', 'stat', 'striptags', 'timestamp', 'to']);

/** Mutable, chainable request builder. */
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
  /** @deprecated Use pathArgs. */
  get path_args(): Record<string, string> { return this.pathArgs; }
  set path_args(value: Record<string, string>) { this.pathArgs = value; }
  /** @deprecated Use legacySelections. */
  get legacy_selections(): string[] { return this.legacySelections; }
  set legacy_selections(value: string[]) { this.legacySelections = value; }
  withId(id: string | number | bigint): this { this.id = String(id); return this; }
  withFilter(name: string, value: string | number | bigint | boolean): this { this.filters[normalize(name)] = String(value); return this; }
  withPathArg(name: string, value: string | number | bigint): this { this.pathArgs[name] = String(value); return this; }
  withLegacySelection(selection: string): this { this.legacySelections.push(normalize(selection)); return this; }
  /** @deprecated Use withId. */
  with_id(id: string | number): this { return this.withId(id); }
  /** @deprecated Use withFilter. */
  with_filter(name: string, value: string | number | boolean): this { return this.withFilter(name, value); }
  /** @deprecated Use withPathArg. */
  with_path_arg(name: string, value: string | number): this { return this.withPathArg(name, value); }
  /** @deprecated Use withLegacySelection. */
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

/** The most privileged level among the selections, or undefined when any of them is unknown. */
function strictest(levels: (AccessLevel | undefined)[]): AccessLevel | undefined {
  if (!levels.length || levels.some(level => level === undefined)) return undefined;
  return [...levels as AccessLevel[]].sort((x, y) => accessLevelOrder.indexOf(y) - accessLevelOrder.indexOf(x))[0];
}

/** Plans request grouping, routing order, filter scrubbing and split fallback. */
export class RequestPlanner {
  readonly capabilities: CapabilitiesDocument;
  readonly v1Catalog = new V1Catalog();
  readonly routing: PlannerRouting;
  constructor(capabilities: CapabilitiesDocument = defaultCapabilities, options: PlannerOptions = {}) { this.capabilities = capabilities; this.routing = options.routing ?? 'default'; }
  static fromCapabilities(capabilities: CapabilitiesDocument, options: PlannerOptions = {}): RequestPlanner { return new RequestPlanner(capabilities, options); }
  /** @deprecated Use fromCapabilities. */
  static from_capabilities(capabilities: CapabilitiesDocument): RequestPlanner { return this.fromCapabilities(capabilities); }
  static async fromCapabilitiesFile(path: string | URL, options: PlannerOptions = {}): Promise<RequestPlanner> { return new RequestPlanner(await capabilitiesFromPath(path), options); }
  /** @deprecated Use fromCapabilitiesFile. */
  static from_capabilities_file(path: string | URL): Promise<RequestPlanner> { return this.fromCapabilitiesFile(path); }

  plan(request: PlanRequestData): RequestPlan {
    const legacy = this.routing === 'legacy';
    const resource = normalize(request.resource);
    const caps = Object.hasOwn(this.capabilities.resources, resource) ? this.capabilities.resources[resource] : undefined;
    if (!caps && !this.v1Catalog.resource(resource)) failure('UnknownResource', { resource });
    const combined: SelectionCapability[] = [], standalone: SelectionCapability[] = [], direct: SelectionCapability[] = [];
    const v1: string[] = [];
    for (const name of uniqueSelections(request.selections)) {
      const selection = caps?.selections?.find(item => item.name === name);
      if (selection) {
        // Torn v2 itself falls back to v1 for `fallback_to_v1` selections; only legacy routing sends them to v1 up front.
        const toV1 = selection.unavailable_in_v2 || (legacy && selection.fallback_to_v1);
        if (toV1 && this.v1Catalog.hasSelection(resource, name)) v1.push(name);
        else if (selection.requires_direct_endpoint_only || !selection.can_use_generic_endpoint) direct.push(selection);
        else if (selection.standalone_only) standalone.push(selection);
        else combined.push(selection);
      } else if (this.v1Catalog.hasSelection(resource, name)) v1.push(name);
      // PARITY_SPEC P1.5: a selection newer than the bundled capabilities is sent as a v2 generic selection.
      else if (!legacy && caps?.generic_path) combined.push({ name, can_use_generic_endpoint: true });
      else failure('UnknownSelection', { resource, selection: name });
    }
    const extra = legacy ? new Set<string>() : this.unknownFilters(resource, caps, request);
    const decorate = <R extends PlannedRequest | SplitRequest>(planned: R, names: string[]): R => {
      if (legacy) return planned;
      const access = planned.apiVersion === 'v2' ? strictest(names.map(name => selectionAccessLevels[resource]?.[name])) : undefined;
      const ttls = names.map(name => selectionCacheTtlMs[resource]?.[name]);
      const ttl = ttls.length && ttls.every(value => value !== undefined) ? Math.min(...ttls as number[]) : undefined;
      return { ...planned, ...(access ? { access } : {}), ...(ttl !== undefined ? { cacheTtlMs: ttl } : {}) };
    };
    const requests: PlannedRequest[] = [];
    if (combined.length) {
      const names = combined.map(item => item.name);
      const planned = this.generic(resource, caps!, request, names, 'generic-combined', extra);
      if (combined.length > 1) planned.fallbackSplit = combined.map(item => {
        const { fallbackSplit: _, ...split } = this.generic(resource, caps!, request, [item.name], 'generic-single', extra);
        return decorate(split satisfies SplitRequest, [item.name]);
      });
      requests.push(decorate(planned, names));
    }
    for (const selection of standalone) requests.push(decorate(this.generic(resource, caps!, request, [selection.name], 'generic-single', extra), [selection.name]));
    for (const selection of direct) requests.push(decorate({
      resource, path: directPath(resource, selection, request), method: 'GET',
      query: this.filters(request, new Set([...selection.query_parameters ?? [], ...extra])),
      selections: [selection.name], strategy: 'direct-endpoint', fallbackSplit: [], apiVersion: 'v2',
    }, [selection.name]));
    if (v1.length) requests.push(decorate({
      resource, path: this.v1Catalog.buildGenericPath(resource, request.id, !legacy)!, method: 'GET',
      query: { ...this.filters(request, legacy ? LEGACY_V1_FILTERS : { has: (name: string) => isAllowedV1Filter(name) || extra.has(name) }), selections: v1.join(',') },
      selections: v1, strategy: v1.length > 1 ? 'generic-combined' : 'generic-single', fallbackSplit: [], apiVersion: 'v1',
    }, v1));
    return { resource, requests };
  }

  /** Filter names unknown to every route of the resource; they are forwarded verbatim to every request (P1.5). */
  private unknownFilters(resource: string, caps: ResourceCapabilities | undefined, request: PlanRequestData): Set<string> {
    const known = new Set<string>(['selections', 'key', 'id', 'legacy']);
    for (const parameter of [...caps?.generic_parameters ?? [], ...caps?.generic_filter_parameters ?? []]) known.add(parameter.name);
    for (const endpoint of caps?.endpoints ?? []) for (const parameter of endpoint.parameters ?? []) known.add(parameter.name);
    for (const selection of caps?.selections ?? []) for (const name of selection.query_parameters ?? []) known.add(name);
    if (this.v1Catalog.resource(resource)) for (const name of LEGACY_V1_FILTERS) known.add(name);
    // `comment` is accepted by every Torn route (v1 and v2), so it always travels with every planned request.
    known.delete('comment');
    return new Set(Object.keys(request.filters ?? {}).filter(name => !known.has(name)));
  }
  private filters(request: PlanRequestData, allowed: { has(name: string): boolean }): Record<string, string> {
    return Object.fromEntries(Object.entries(request.filters ?? {}).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).filter(([name]) => allowed.has(name)));
  }
  private generic(resource: string, caps: ResourceCapabilities, request: PlanRequestData, selections: string[], strategy: PlannedRequest['strategy'], extra: Set<string> = new Set()): PlannedRequest {
    if (caps.generic_path === undefined || caps.generic_path === null) failure('MissingGenericEndpoint', { resource });
    const allowed = new Set([...(caps.generic_parameters ?? []).map(item => item.name), ...extra]);
    const query = this.filters(request, allowed);
    const legacy = uniqueSelections(request.legacySelections ?? []);
    if (legacy.length && allowed.has('legacy')) query.legacy = legacy.join(',');
    if (request.id !== undefined && allowed.has('id')) query.id = request.id;
    query.selections = selections.join(',');
    return { resource, path: caps.generic_path, method: 'GET', query, selections, strategy, fallbackSplit: [], apiVersion: 'v2' };
  }
}
