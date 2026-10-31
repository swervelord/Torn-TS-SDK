import { ValidationError, isJsonObject } from "./errors.ts";
import type { ExecutionOptions, JsonObject, JsonValue, PlannedRequest } from "./types.ts";

export type PageDirection = "next" | "prev";
export interface PaginateOptions extends ExecutionOptions {
  /** Stop after this many pages (default: follow links until there are none). */
  maxPages?: number;
  /** Follow `_metadata.links.next` (default) or `.prev`. */
  direction?: PageDirection;
  /** Stop after this many items (item iteration only). */
  limit?: number;
}
export interface Page<T = JsonObject> {
  /** 0-based page number. */
  index: number;
  data: T;
  /** Path and query of this page's request (never contains a key). */
  path: string;
  query: Record<string, string>;
}

/**
 * PARITY_SPEC P7.1: turn a `_metadata.links.next|prev` URL into the next v2 request. The URL must point at the configured
 * API host and base path; any `key` parameter in it is dropped (the executor re-attaches the key as a header).
 */
export function requestFromLink(link: string, baseUrlV2: string, template: PlannedRequest): PlannedRequest {
  let url: URL, base: URL;
  try { url = new URL(link); base = new URL(baseUrlV2); }
  catch { throw new ValidationError("pagination link is not an absolute URL", { link: "[unparseable]" }); }
  const basePath = base.pathname.replace(/\/+$/, "");
  if (url.protocol !== base.protocol || url.host !== base.host || !(url.pathname === basePath || url.pathname.startsWith(`${basePath}/`)))
    throw new ValidationError(`pagination link points outside ${base.origin}${basePath}; refusing to follow it`, { host: url.host });
  const query: Record<string, string> = {};
  for (const [name, value] of url.searchParams) if (name !== "key") query[name] = value;
  return { ...template, path: url.pathname.slice(basePath.length) || "/", query, fallbackSplit: [], strategy: "direct-endpoint", apiVersion: "v2" };
}
/** `_metadata.links[direction]` of a page, or undefined at the end. */
export function pageLink(page: JsonValue, direction: PageDirection = "next"): string | undefined {
  if (!isJsonObject(page) || !isJsonObject(page._metadata) || !isJsonObject(page._metadata.links)) return undefined;
  const link = page._metadata.links[direction];
  return typeof link === "string" && link ? link : undefined;
}
/** The list carried by a page: `field` when given, else the only array-valued top-level member besides `_metadata`. */
export function pageItems(page: JsonValue, field?: string): JsonValue[] {
  if (!isJsonObject(page)) return [];
  if (field !== undefined) { const value = page[field]; return Array.isArray(value) ? value : []; }
  const arrays = Object.entries(page).filter(([name, value]) => name !== "_metadata" && Array.isArray(value));
  return arrays.length === 1 ? arrays[0]![1] as JsonValue[] : [];
}
