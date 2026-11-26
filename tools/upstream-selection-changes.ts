/**
 * Selections whose routing Torn itself changed after the frozen 6.13.6 contract. Frozen fixtures that pin 6.13.6 routing
 * (spec/parity/planner-golden.json, the docs-coverage selection flags) are checked against the frozen 6.13.6 capabilities
 * only for these; their current routing is pinned by test/api-6210.test.ts.
 */
import type { PlanRequestData } from '../src/types.ts';

export const upstreamRoutingChanges: Readonly<Record<string, readonly string[]>> = {
  // API 6.21.0: dirtybombs, inventory and warfare joined FactionSelectionName (generic `/faction?selections=`);
  // search left it (direct `/faction/search`).
  faction: ['dirtybombs', 'inventory', 'search', 'warfare'],
  // API 6.21.0: bazaar, criminalrecord and display are native v2 (no v1 fallback, so legacy routing no longer sends them
  // to v1); itemmods, organizedcrimes and virus joined UserSelectionName; factionbalance was removed (legacy routing,
  // which refuses unknown selections, now rejects it; default routing passes it through, P1.5).
  user: ['bazaar', 'criminalrecord', 'display', 'factionbalance', 'itemmods', 'organizedcrimes', 'virus'],
};

/** Selections Torn removed upstream; they are absent from the current capabilities. */
export const upstreamRemovedSelections: Readonly<Record<string, readonly string[]>> = { user: ['factionbalance'] };

const normalize = (value: string): string => value.trim().toLowerCase();

/** True when the selection is listed in upstreamRoutingChanges. */
export function selectionChangedUpstream(resource: string, selection: string): boolean {
  return (upstreamRoutingChanges[normalize(resource)] ?? []).includes(normalize(selection));
}

/** True when a golden scenario requests a selection listed in upstreamRoutingChanges. */
export function changedUpstream(input: PlanRequestData): boolean {
  return input.selections.some(selection => selectionChangedUpstream(input.resource, selection));
}
