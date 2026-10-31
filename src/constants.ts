/** Runtime constants (PARITY_SPEC P8.7). Capabilities and schemas are embedded; nothing is read from disk at runtime. */
import { SDK_VERSION } from "./config.ts";
import { specificationSha256, specificationVersion } from "./generated/operation-data.ts";

export { SDK_VERSION } from "./config.ts";
/** Torn OpenAPI version this SDK was generated from. */
export const SPEC_VERSION: string = specificationVersion;
/** sha256 of the pinned OpenAPI document (`spec/torn-openapi-current.json`). */
export const SPEC_SHA256: string = specificationSha256;
/** `torn-ts-sdk/<version> (Torn API <spec>)`. */
export const SDK_DESCRIPTION = `torn-ts-sdk/${SDK_VERSION} (Torn API ${specificationVersion})`;
