/** Remove `key=` query values and URL userinfo (proxy passwords) from free text (PARITY_SPEC P2.2). */
export function sanitizeErrorMessage(message: string): string {
  return message.replace(/key=[^&"'\s)]*/g, "key=[REDACTED]").replace(/([a-z][a-z\d+.-]*:\/\/)[^/@?#\s"')]+@/gi, "$1[REDACTED]@");
}
/** Truncated, redacted JSON excerpt of a value for decode diagnostics (PARITY_SPEC P1.4). */
export function valueExcerpt(value: unknown, max = 120): string {
  let text: string;
  try { text = JSON.stringify(value, (_key, item: unknown) => typeof item === "bigint" ? item.toString() : item) ?? String(value); }
  catch { text = String(value); }
  text = sanitizeErrorMessage(text);
  const chars = Array.from(text);
  return chars.length > max ? `${chars.slice(0, max).join("")}...` : text;
}
