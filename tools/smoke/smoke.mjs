// Consumer smoke test for the packed tarball (PARITY_SPEC P9.5). Runs unchanged on Node >= 20, Deno and Bun:
// `node smoke.mjs`, `deno run --allow-env --allow-read smoke.mjs`, `bun smoke.mjs` inside a project that installed the tarball.
import { ApiError, NoUsableKeysError, DecodeError, RuntimeEnvConfig, SDK_VERSION, SPEC_VERSION, TornSdk, decodeModel, isKnownEnumValue } from "torn-ts-sdk";
import { mockSdk, jsonResponse, tornError } from "torn-ts-sdk/testing";
import { componentSchemaNames } from "torn-ts-sdk/generated";

const check = (condition, message) => { if (!condition) throw new Error(`smoke: ${message}`); };
const runtime = typeof globalThis.Deno !== "undefined" ? "deno" : typeof globalThis.Bun !== "undefined" ? "bun" : "node";

check(new ApiError("x", { path: "/", status: 200, code: 2 }).name === "ApiError", "stable ApiError name");
check(new NoUsableKeysError().name === "NoUsableKeysError", "stable NoUsableKeysError name");
check(new DecodeError("x").name === "DecodeError", "stable DecodeError name");
check(/^\d+\.\d+\.\d+$/.test(SDK_VERSION) && SPEC_VERSION.length > 0, "version constants");
check(componentSchemaNames.length > 700, "generated entry point");
check(decodeModel("UserGenderEnum", "Futuregender") === "Futuregender" && !isKnownEnumValue("UserGenderEnum", "Futuregender"), "open enums");

const status = { description: "Okay", details: null, state: "Okay", color: "green", until: null };
const { sdk, transport } = mockSdk([tornError(2), jsonResponse({ profile: { id: 1, name: "Smoke", level: 1, gender: "Male", status } })], { keys: ["SMOKE_KEY_A_0001", "SMOKE_KEY_B_0002"] });
const basic = await sdk.user().basic();
check(basic.profile.name === "Smoke", "typed facade call");
check(transport.requests.length === 2 && transport.requests[1].apiKey === "SMOKE_KEY_B_0002", "key failover");
check(sdk.keyStates()[0].state === "disabled" && !JSON.stringify(sdk).includes("SMOKE_KEY_A_0001"), "key states + redaction");
check(typeof TornSdk.withApiKeys(["k"]).openapi().getKeyInfo === "function", "real transport construction");

// fromEnv works on every server runtime (process.env / Deno.env).
const env = RuntimeEnvConfig.fromEnv({ TORN_API_KEY: "SMOKE_ENV_KEY_01" });
check(env.apiKeys.length === 1, "explicit env map");
let fromProcess = false;
try { fromProcess = RuntimeEnvConfig.fromEnv().apiKeys.includes("SMOKE_RUNTIME_ENV"); } catch { fromProcess = false; }
check(fromProcess, "runtime env (set TORN_API_KEY=SMOKE_RUNTIME_ENV before running)");
console.log(`smoke ok on ${runtime}`);
