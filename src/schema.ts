/** The JSON Schema subset used by Torn's pinned OpenAPI specification. */
export interface Schema {
  [keyword: string]: unknown;
  $ref?: string;
  type?: string | string[];
  enum?: unknown[];
  const?: unknown;
  nullable?: boolean;
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema;
  additionalProperties?: boolean | Schema;
  allOf?: Schema[];
  anyOf?: Schema[];
  oneOf?: Schema[];
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: boolean | number;
  exclusiveMaximum?: boolean | number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  description?: string;
  format?: string;
  default?: unknown;
  example?: unknown;
  deprecated?: boolean;
  discriminator?: unknown;
  title?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: unknown;
  externalDocs?: unknown;
  /** Properties made optional by `spec/shared/spec-overrides.json` (PARITY_SPEC P1.2). */
  "x-sdk-relaxed-required"?: string[];
}
/** Why a validation issue was raised. Only `error` issues fail a tolerant decode (PARITY_SPEC P1.3). */
export type ValidationIssueKind = "error" | "unknown_enum" | "unknown_property" | "relaxed_required";
export interface ValidationIssue {
  /** JSON path of the offending value, e.g. `$.profile.status.state`. */
  path: string;
  message: string;
  /** Absent means `error`. */
  kind?: ValidationIssueKind;
  /** The offending value (absent for missing properties). */
  value?: unknown;
}
/**
 * `tolerant` (default): unknown enum values, unknown properties and override-relaxed fields are accepted and reported
 * as warnings. `strict`: the same conditions are errors (the SDK's own tests and CI use it). PARITY_SPEC P1.1-P1.3.
 */
export type ValidationMode = "tolerant" | "strict";
export interface SchemaValidationOptions {
  /** Torn response unions accept any matching variant. */
  exactOneOf?: boolean;
  /** Optional model fields accept explicit null as well as omission. */
  optionalNullable?: boolean;
  /** Validate additional schema constraints for input parameters. */
  constraints?: boolean;
  /** Defaults to `tolerant`. */
  mode?: ValidationMode;
  /** Receives tolerant-mode warnings (unknown enum values / properties, override-relaxed fields). */
  warnings?: ValidationIssue[];
}
type Sink = ValidationIssue[];
/** Validate without coercion or dropping unknown response fields. Returns errors; tolerant findings go to `options.warnings`. */
export function validateSchema(schema: Schema, value: unknown, registry: Record<string, Schema>, options: SchemaValidationOptions = {}): ValidationIssue[] {
  const strict = options.mode === "strict";
  const issues: Sink = [], warnings: Sink = [];
  const stringify = (v: unknown): string | undefined => JSON.stringify(v, (_key, item: unknown) => typeof item === "bigint" ? { __sdkBigInt: item.toString() } : item);
  const literal = (v: unknown): string => JSON.stringify(v, (_key, item: unknown) => typeof item === "bigint" ? item.toString() : item);
  const equal = (a: unknown, b: unknown): boolean => {
    if (typeof a === "bigint" && typeof b === "number" && Number.isInteger(b)) return a === BigInt(b);
    if (typeof b === "bigint" && typeof a === "number" && Number.isInteger(a)) return b === BigInt(a);
    return stringify(a) === stringify(b);
  };
  /** An unknown enum member must still have the enum's primitive kind to be preserved. */
  const sameKind = (members: unknown[], v: unknown): boolean =>
    typeof v === "string" ? members.some(m => typeof m === "string")
      : (typeof v === "number" && Number.isInteger(v)) || typeof v === "bigint" ? members.some(m => typeof m === "number") : false;
  function check(s: Schema, v: unknown, path: string, out: Sink, warn: Sink, depth: number): void {
    const fail = (message: string) => out.push({ path, message, kind: "error", ...(v === undefined ? {} : { value: v }) });
    const soft = (kind: ValidationIssueKind, message: string, at = path, offending: unknown = v) =>
      (strict ? out : warn).push({ path: at, message, kind, ...(offending === undefined ? {} : { value: offending }) });
    if (depth > 200) { fail("maximum schema recursion depth exceeded"); return; }
    if (s.$ref) {
      const name = s.$ref.split("/").at(-1)!; const target = registry[name];
      if (!target) { fail("unknown schema reference " + name); return; }
      check(target, v, path, out, warn, depth + 1); return;
    }
    if (v === null && s.nullable) return;
    if (s.const !== undefined && !equal(s.const, v)) { fail("expected constant " + literal(s.const)); return; }
    if (s.enum && !s.enum.some(x => equal(x, v))) {
      const expected = "one of " + s.enum.map(literal).join(", ");
      // PARITY_SPEC P1.1: a value of the enum's kind that the pinned spec does not know is preserved, not rejected.
      if (sameKind(s.enum, v)) { soft("unknown_enum", "unknown enum value; known values are " + expected); return; }
      fail("expected " + expected); return;
    }
    if (s.allOf) for (const branch of s.allOf) check(branch, v, path, out, warn, depth + 1);
    const union = s.oneOf ?? s.anyOf;
    if (union) {
      const results = union.map(branch => { const errors: Sink = [], found: Sink = []; check(branch, v, path, errors, found, depth + 1); return { errors, found }; });
      const matches = results.filter(result => result.errors.length === 0);
      if (!matches.length) {
        // P1.4: name the closest variant's failing leaf instead of a bare "no variant matched".
        const best = results.reduce((a, b) => b.errors.length < a.errors.length ? b : a);
        const leaf = best.errors[0];
        fail(`value matches no union variant (closest variant ${results.indexOf(best) + 1}: ${leaf ? `${leaf.path}: ${leaf.message}` : "no detail"})`);
        return;
      }
      if (s.oneOf && options.exactOneOf && matches.length !== 1) { fail("value matches more than one oneOf variant"); return; }
      warn.push(...matches.reduce((a, b) => b.found.length < a.found.length ? b : a).found);
    }
    if (Array.isArray(s.type)) {
      const results = s.type.map(t => { const errors: Sink = [], found: Sink = []; check({ ...s, type: t }, v, path, errors, found, depth + 1); return { errors, found }; });
      const ok = results.find(result => result.errors.length === 0);
      if (!ok) fail("expected " + s.type.join(" or ")); else warn.push(...ok.found);
      return;
    }
    const kind = s.type ?? (s.properties || s.additionalProperties !== undefined ? "object" : undefined);
    if (kind === "null") { if (v !== null) fail("expected null"); return; }
    if (kind === "string") {
      if (typeof v !== "string") { fail("expected string"); return; }
      if (options.constraints) {
        if (s.minLength !== undefined && [...v].length < s.minLength) fail("string shorter than " + s.minLength);
        if (s.maxLength !== undefined && [...v].length > s.maxLength) fail("string longer than " + s.maxLength);
        if (s.pattern && !new RegExp(s.pattern).test(v)) fail("string does not match " + s.pattern);
      }
    } else if (kind === "integer" || kind === "number") {
      if ((typeof v !== "number" && !(kind === "integer" && typeof v === "bigint")) || (typeof v === "number" && (!Number.isFinite(v) || (kind === "integer" && !Number.isInteger(v))))) { fail("expected " + kind); return; }
      const numeric = v as number | bigint;
      const below = (bound: number, inclusive = false) => typeof numeric === "bigint" && Number.isInteger(bound) ? inclusive ? numeric <= BigInt(bound) : numeric < BigInt(bound) : inclusive ? numeric <= bound : numeric < bound;
      const above = (bound: number, inclusive = false) => typeof numeric === "bigint" && Number.isInteger(bound) ? inclusive ? numeric >= BigInt(bound) : numeric > BigInt(bound) : inclusive ? numeric >= bound : numeric > bound;
      if (kind === "integer" && (numeric < -9223372036854775808n || numeric > 9223372036854775807n)) { fail("integer outside signed 64-bit range"); return; }
      if (options.constraints) {
        if (s.minimum !== undefined && below(s.minimum)) fail("number below " + s.minimum);
        if (s.maximum !== undefined && above(s.maximum)) fail("number above " + s.maximum);
        if (typeof s.exclusiveMinimum === "number" && below(s.exclusiveMinimum, true)) fail("number must exceed " + s.exclusiveMinimum);
        if (typeof s.exclusiveMaximum === "number" && above(s.exclusiveMaximum, true)) fail("number must be below " + s.exclusiveMaximum);
      }
    } else if (kind === "boolean") { if (typeof v !== "boolean") fail("expected boolean"); }
    else if (kind === "array") {
      if (!Array.isArray(v)) { fail("expected array"); return; }
      if (s.items) v.forEach((item, index) => check(s.items!, item, `${path}[${index}]`, out, warn, depth + 1));
      if (options.constraints) {
        if (s.minItems !== undefined && v.length < s.minItems) fail("too few array items");
        if (s.maxItems !== undefined && v.length > s.maxItems) fail("too many array items");
        if (s.uniqueItems && new Set(v.map(x => stringify(x))).size !== v.length) fail("array items must be unique");
      }
    } else if (kind === "object") {
      if (v === null || typeof v !== "object" || Array.isArray(v)) { fail("expected object"); return; }
      const obj = v as Record<string, unknown>;
      const relaxed = s["x-sdk-relaxed-required"] ?? [];
      for (const key of s.required ?? []) if (!Object.hasOwn(obj, key) || obj[key] === undefined) out.push({ path: path + "." + key, message: "required property is missing", kind: "error" });
      // P1.2: properties relaxed by spec-overrides.json remain required in strict mode.
      for (const key of relaxed) if (!Object.hasOwn(obj, key) || obj[key] === undefined) soft("relaxed_required", "required property is missing (relaxed by spec-overrides.json)", path + "." + key, undefined);
      for (const [key, item] of Object.entries(obj)) {
        const property = s.properties?.[key];
        if (property) { if (!(options.optionalNullable && item === null && !s.required?.includes(key))) check(property, item, path + "." + key, out, warn, depth + 1); }
        else if (s.additionalProperties === false && options.constraints) out.push({ path: path + "." + key, message: "unknown property", kind: "error", value: item });
        else if (typeof s.additionalProperties === "object") check(s.additionalProperties, item, path + "." + key, out, warn, depth + 1);
        else if (s.properties && s.additionalProperties === undefined && !relaxed.includes(key)) soft("unknown_property", "unknown property", path + "." + key, item);
      }
    }
  }
  check(schema, value, "$", issues, warnings, 0);
  options.warnings?.push(...warnings);
  return issues;
}
