import { TornSdk } from "../src/index.ts";

// fromEnv reads TORN_API_KEY or TORN_API_KEYS from process.env (Node, Bun) or Deno.env.
const sdk=await TornSdk.fromEnv();
const info=await sdk.openapi().getKeyInfo();
const profile=await sdk.user().profile(); // self-scoped: the key owner
console.log(info.info.access.type,profile.profile.name);
