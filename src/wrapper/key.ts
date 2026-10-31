import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle, type OptionsOrId } from "./runtime.ts";
import { KeyOptions } from "./options.ts";
import type { KeyInfoBundle, KeyLogBundle } from "../models/manual.ts";
export { KeyOptions } from "./options.ts";

export class KeyApi extends ResourceApi<KeyOptions, "key"> {
  static readonly SUPPORTED_SELECTIONS = ["log", "info"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "key", KeyApi.SUPPORTED_SELECTIONS, () => new KeyOptions()); }
  async info(options: OptionsOrId<KeyOptions> = new KeyOptions()): Promise<KeyInfoBundle> {
    return this.executeTyped<KeyInfoBundle>("info", options, "KeyInfoBundle", true);
  }
  async log(options: OptionsOrId<KeyOptions> = new KeyOptions()): Promise<KeyLogBundle> {
    return this.executeTyped<KeyLogBundle>("log", options, "KeyLogBundle", true);
  }
  /** @deprecated Use logRaw(). */
  log_raw(options: OptionsOrId<KeyOptions> = new KeyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("log", options); }
  /** @deprecated Use infoRaw(). */
  info_raw(options: OptionsOrId<KeyOptions> = new KeyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("info", options); }
  logRaw(options: OptionsOrId<KeyOptions> = new KeyOptions()) { return this.log_raw(options); }
  infoRaw(options: OptionsOrId<KeyOptions> = new KeyOptions()) { return this.info_raw(options); }
}
