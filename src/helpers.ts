/**
 * Torn helpers (PARITY_SPEC P8.6): web URL builders, Torn timestamp <-> Date conversion and TCT (Torn City Time = UTC).
 * Pure functions with no I/O; safe in every runtime.
 */
import type { Integer } from "./types.ts";

export const TORN_WEB_BASE = "https://www.torn.com";
type Id = Integer | string;
const id = (value: Id): string => {
  const text = String(value).trim();
  if (!/^\d+$/.test(text)) throw new RangeError(`expected a numeric Torn id, got '${text}'`);
  return text;
};
const page = (path: string, query: Record<string, string>): string => `${TORN_WEB_BASE}/${path}?${new URLSearchParams(query).toString()}`;

/** Web links to Torn pages. */
export const tornUrls = {
  profile: (userId: Id) => page("profiles.php", { XID: id(userId) }),
  attack: (userId: Id) => page("loader.php", { sid: "attack", user2ID: id(userId) }),
  faction: (factionId: Id) => page("factions.php", { step: "profile", ID: id(factionId) }),
  company: (companyId: Id) => page("joblist.php", { ID: id(companyId) }) + "#/p=corpinfo",
  bazaar: (userId: Id) => page("bazaar.php", { userId: id(userId) }),
  itemMarket: (itemId: Id) => page("page.php", { sid: "ItemMarket" }) + `#/market/view=search&itemID=${id(itemId)}`,
  trade: (tradeId?: Id) => tradeId === undefined ? page("trade.php", {}) : page("trade.php", {}) + `#step=view&ID=${id(tradeId)}`,
  forumThread: (forumId: Id, threadId: Id) => page("forums.php", {}) + `#/p=threads&f=${id(forumId)}&t=${id(threadId)}`,
  property: (propertyId: Id) => page("properties.php", { step: "info", ID: id(propertyId) }),
  sendMessage: (userId: Id) => page("messages.php", { p: "compose", XID: id(userId) }),
} as const;

/** Torn timestamps are Unix seconds (UTC). */
export function fromTornTimestamp(seconds: Integer): Date {
  return new Date(Number(seconds) * 1000);
}
export function toTornTimestamp(date: Date | number): number {
  return Math.floor((typeof date === "number" ? date : date.getTime()) / 1000);
}
/** Current Torn City Time (TCT is UTC). `now` is injectable for tests. */
export function tornNow(now: number = Date.now()): Date { return new Date(now); }
/** `HH:MM:SS` TCT clock string. */
export function formatTct(date: Date | number = Date.now()): string {
  return new Date(typeof date === "number" ? date : date.getTime()).toISOString().slice(11, 19);
}
/** `HH:MM:SS - DD/MM/YY`, the format Torn shows in its header. */
export function formatTctDateTime(date: Date | number = Date.now()): string {
  const iso = new Date(typeof date === "number" ? date : date.getTime()).toISOString();
  return `${iso.slice(11, 19)} - ${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(2, 4)}`;
}
/** Start of the TCT day containing `date` (daily resets happen at 00:00 TCT). */
export function tctStartOfDay(date: Date | number = Date.now()): Date {
  const d = new Date(typeof date === "number" ? date : date.getTime());
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
/** Milliseconds until the next 00:00 TCT. */
export function msUntilTctMidnight(now: number = Date.now()): number {
  return tctStartOfDay(now).getTime() + 86_400_000 - now;
}
