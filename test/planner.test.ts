import { describe, expect, test } from 'bun:test';
import { CapabilitiesDocument, defaultCapabilities, type ResourceCapabilities } from '../src/capabilities.ts';
import { PlanRequest, RequestPlanner } from '../src/planner.ts';
import { V1Catalog, V1_RESOURCES } from '../src/v1-catalog.ts';

function fixture(): RequestPlanner {
  return new RequestPlanner({ resources: {
    user: {
      generic_path: '/user',
      generic_parameters: ['selections', 'id', 'limit', 'sort', 'striptags', 'timestamp', 'legacy'].map(name => ({ name })),
      selections: [
        ...['profile', 'discord', 'hof'].map(name => ({ name, can_use_generic_endpoint: true })),
        { name: 'bazaar', can_use_generic_endpoint: true, fallback_to_v1: true },
        { name: 'virus', requires_direct_endpoint_only: true, endpoints: ['/user/virus'], query_parameters: ['timestamp'] },
        { name: 'crime', requires_direct_endpoint_only: true, endpoints: ['/user/{crimeId}/crimes'] },
      ],
    },
    faction: {
      generic_path: '/faction', generic_parameters: [{ name: 'selections' }, { name: 'name' }],
      selections: [{ name: 'search', can_use_generic_endpoint: true, standalone_only: true }, { name: 'members', can_use_generic_endpoint: true }],
    },
  } });
}

describe('Rust planner contract', () => {
  test('combines generic requests and precomputes individual fallback', () => {
    const request = new PlanRequest(' USER ', [' Profile ', 'discord', 'PROFILE', '', 'hof'])
      .withId('3637232').withFilter(' LIMIT ', 100).withFilter('foo', 'bar').withFilter('striptags', true);
    const plan = fixture().plan(request);
    expect(plan.resource).toBe('user');
    expect(plan.requests).toHaveLength(1);
    const call = plan.requests[0]!;
    expect(call).toMatchObject({ path: '/user', strategy: 'generic-combined', apiVersion: 'v2', query: { selections: 'profile,discord,hof', id: '3637232', limit: '100', striptags: 'true' } });
    expect(call.query).not.toHaveProperty('foo');
    expect(call.fallbackSplit).toHaveLength(3);
    expect(call.fallbackSplit.map(split => split.query.selections)).toEqual(['profile', 'discord', 'hof']);
    expect(call.fallbackSplit.every(split => split.strategy === 'generic-single')).toBe(true);
    expect(call.fallbackSplit[0]).not.toHaveProperty('fallbackSplit');
  });

  test('direct calls follow generic and use their own query allowlist', () => {
    const plan = fixture().plan(new PlanRequest('user', ['virus', 'profile']).withFilter('timestamp', '1').withFilter('limit', '25'));
    expect(plan.requests.map(call => call.path)).toEqual(['/user', '/user/virus']);
    expect(plan.requests[1]!.query).toEqual({ timestamp: '1' });
    expect(plan.requests[0]!.strategy).toBe('generic-combined');
  });

  test('standalone calls follow combined groups even when requested first', () => {
    const calls = fixture().plan(new PlanRequest('faction', ['search', 'members']).withFilter('name', 'zeta')).requests;
    expect(calls.map(call => call.selections)).toEqual([['members'], ['search']]);
    expect(calls.map(call => call.strategy)).toEqual(['generic-combined', 'generic-single']);
  });

  test('missing path arguments throw actionable errors and preserve case', () => {
    expect(() => fixture().plan(new PlanRequest('user', ['crime']))).toThrow('crimeId');
    expect(fixture().plan(new PlanRequest('user', ['crime']).with_path_arg('crimeId', 42)).requests[0]!.path).toBe('/user/42/crimes');
  });

  test('v1 fallback, only resources and filters match Rust', () => {
    const plan = fixture().plan(new PlanRequest('user', ['bazaar', 'profile']).with_id('3637232'));
    expect(plan.requests.map(call => [call.apiVersion, call.path])).toEqual([['v2', '/user'], ['v1', '/user/3637232']]);
    const company = fixture().plan(new PlanRequest('company', ['companies', 'news']).withId(' 55 ').withFilter('limit', 25).withFilter('timestamp', 1).withFilter('foo', 'bar')).requests[0]!;
    expect(company.path).toBe('/company/55');
    expect(company.query).toEqual({ limit: '25', timestamp: '1', selections: 'companies,news' });
    expect(company.fallbackSplit).toEqual([]);
  });

  test('legacy selections normalize, deduplicate and require endpoint support', () => {
    const request = new PlanRequest('user', ['profile']).with_legacy_selection(' BazAAr ').withLegacySelection('bazaar').withLegacySelection('');
    expect(fixture().plan(request).requests[0]!.query.legacy).toBe('bazaar');
    expect(fixture().plan(new PlanRequest('faction', ['members']).withLegacySelection('basic')).requests[0]!.query).not.toHaveProperty('legacy');
  });

  test('unknown resources and selections reject; empty selection lists return empty plans', () => {
    expect(() => fixture().plan(new PlanRequest('bad', []))).toThrow('Unknown resource');
    expect(() => fixture().plan(new PlanRequest('user', ['nonexistent']))).toThrow('Unknown selection');
    expect(fixture().plan(new PlanRequest('user', ['', ' ']))).toEqual({ resource: 'user', requests: [] });
  });

  test('direct templates prefer id paths only when generic id was provided', () => {
    const planner = new RequestPlanner({ resources: { custom: { selections: [{ name: 'data', endpoints: ['/custom/data', '/custom/{id}/data'] }] } } });
    expect(planner.plan(new PlanRequest('custom', ['data'])).requests[0]!.path).toBe('/custom/data');
    expect(planner.plan(new PlanRequest('custom', ['data']).withId('5')).requests[0]!.path).toBe('/custom/5/data');
    expect(planner.plan(new PlanRequest('custom', ['data']).withPathArg('id', '5')).requests[0]!.path).toBe('/custom/data');
  });

  test('ids supports legacy id, explicit ids wins; explicit id takes precedence for id', () => {
    const planner = new RequestPlanner({ resources: { torn: { selections: [{ name: 'itemdetails', endpoints: ['/torn/{ids}/itemdetails'] }] } } });
    for (const ids of ['788', '788,789']) expect(planner.plan(new PlanRequest('torn', ['itemdetails']).withId(ids)).requests[0]!.path).toBe(`/torn/${ids}/itemdetails`);
    expect(planner.plan(new PlanRequest('torn', ['itemdetails']).withId('788').withPathArg('ids', '789,790')).requests[0]!.path).toBe('/torn/789,790/itemdetails');
  });

  test('reports missing generic and direct endpoints', () => {
    const planner = new RequestPlanner({ resources: { custom: { selections: [{ name: 'generic', can_use_generic_endpoint: true }, { name: 'direct' }] } } });
    expect(() => planner.plan(new PlanRequest('custom', ['generic']))).toThrow('Missing generic endpoint');
    expect(() => planner.plan(new PlanRequest('custom', ['direct']))).toThrow('Missing direct endpoint');
  });

  test('BOM and absent document fields parse like serde defaults', () => {
    expect(CapabilitiesDocument.from_json_str('\uFEFF{}')).toEqual({ spec: {}, resources: {} });
  });

  test('catalog supports exact Rust resource and selection sets', () => {
    const catalog = new V1Catalog();
    expect(Object.keys(V1_RESOURCES)).toEqual(['user', 'property', 'faction', 'company', 'market', 'torn']);
    expect(catalog.has_selection('company', 'news')).toBe(true);
    expect(catalog.hasSelection('company', 'profile')).toBe(false);
    expect(catalog.build_generic_path('user', ' ')).toBe('/user');
    expect(catalog.buildGenericPath('bad')).toBeUndefined();
  });
});

describe('full pinned capability coverage', () => {
  const planner = new RequestPlanner();
  for (const [resource, caps] of Object.entries(defaultCapabilities.resources)) {
    for (const selection of caps.selections ?? []) {
      test(`${resource}.${selection.name} has an executable plan`, () => {
        const request = new PlanRequest(resource, [selection.name]).withId('123');
        for (const path of selection.endpoints ?? []) for (const match of path.matchAll(/\{([^}]+)\}/g)) request.withPathArg(match[1]!, '123');
        const calls = planner.plan(request).requests;
        expect(calls).toHaveLength(1);
        expect(calls[0]!.path).not.toContain('{');
        expect(calls[0]!.selections).toEqual([selection.name]);
      });
    }
  }
  for (const [resource, spec] of Object.entries(V1_RESOURCES)) {
    test(`every historical ${resource} selection remains supported`, () => {
      for (const selection of spec.selections) {
        const request = new PlanRequest(resource, [selection]).withId('123');
        const caps: ResourceCapabilities | undefined = defaultCapabilities.resources[resource];
        for (const endpoint of caps?.selections?.find(item => item.name === selection)?.endpoints ?? []) for (const match of endpoint.matchAll(/\{([^}]+)\}/g)) request.withPathArg(match[1]!, '123');
        expect(planner.plan(request).requests.length).toBeGreaterThan(0);
      }
    });
  }

  test('migrated endpoints use v2 and snapshots remain isolated', () => {
    for (const [resource, selections] of Object.entries({ user: ['gym', 'perks', 'networth'], faction: ['crimeexp'], market: ['pointsmarket'], torn: ['bank', 'cards', 'cityshops', 'companies', 'gyms', 'stats'] })) expect(planner.plan(new PlanRequest(resource, selections)).requests.every(call => call.apiVersion === 'v2')).toBe(true);
    for (const resource of ['company', 'faction', 'user']) expect(planner.plan(new PlanRequest(resource, ['snapshot', 'timestamp'])).requests).toHaveLength(2);
  });
  test('published endpoint aliases are preserved', () => {
    for (const [resource, selection, path] of [['faction', 'inventory', '/faction/inventory'], ['faction', 'dirtbombs', '/faction/dirtybombs'], ['user', 'itemmod', '/user/itemmods']]) expect(planner.plan(new PlanRequest(resource!, [selection!])).requests[0]!.path).toBe(path!);
  });
});
