import { TornSdk } from "../src/index.ts";

// Bun loads TORN_API_KEY or TORN_API_KEYS from .env automatically.
const sdk=await TornSdk.fromEnv();
const info=await sdk.openapi().getKeyInfo();
const profile=await sdk.openapi().getUserProfile({id:info.info.user.id});
console.log(profile.profile.name);
