import type { Integer, JsonValue } from "../types.ts";

/** JSON primitives stay native TypeScript values. Number values do not retain the
 * lexical distinction between an integer token and a whole-valued float token;
 * asI64 accepts integer-valued numbers and signed 64-bit bigints.
 */
function asI64(value: JsonValue): Integer | undefined {
  if (typeof value !== "bigint" && (typeof value !== "number" || !Number.isInteger(value))) return undefined;
  const integer=typeof value === "bigint" ? value : BigInt(value);
  return integer >= -(1n<<63n) && integer <= (1n<<63n)-1n ? value : undefined;
}
function asStr(value: JsonValue): string | undefined {return typeof value === "string" ? value : undefined;}
function get(value: JsonValue, field: string): JsonValue | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value) && Object.hasOwn(value,field) ? value[field] : undefined;
}
/** Companion utility namespace for the DynamicValue native JSON union. */
export const DynamicValue=Object.freeze({asI64,as_i64:asI64,asStr,as_str:asStr,get});
