import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle, type OptionsOrId } from "./runtime.ts";
import { PropertyOptions } from "./options.ts";
import type { PropertyBundle, PropertyLookupBundle, PropertyTimestampBundle } from "../models/manual.ts";
export { PropertyOptions } from "./options.ts";

export class PropertyApi extends ResourceApi<PropertyOptions, "property"> {
  static readonly SUPPORTED_SELECTIONS = ["timestamp", "property", "lookup"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "property", PropertyApi.SUPPORTED_SELECTIONS, () => new PropertyOptions()); }
  async property(options: OptionsOrId<PropertyOptions> = new PropertyOptions()): Promise<PropertyBundle> {
    return this.executeTyped<PropertyBundle>("property", options, "PropertyBundle", true);
  }
  async lookup(options: OptionsOrId<PropertyOptions> = new PropertyOptions()): Promise<PropertyLookupBundle> {
    return this.executeTyped<PropertyLookupBundle>("lookup", options, "PropertyLookupBundle", true);
  }
  async timestamp(options: OptionsOrId<PropertyOptions> = new PropertyOptions()): Promise<PropertyTimestampBundle> {
    return this.executeTyped<PropertyTimestampBundle>("timestamp", options, "PropertyTimestampBundle", true);
  }
  timestamp_raw(options: OptionsOrId<PropertyOptions> = new PropertyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  property_raw(options: OptionsOrId<PropertyOptions> = new PropertyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("property", options); }
  lookup_raw(options: OptionsOrId<PropertyOptions> = new PropertyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  timestampRaw(options: OptionsOrId<PropertyOptions> = new PropertyOptions()) { return this.timestamp_raw(options); }
  propertyRaw(options: OptionsOrId<PropertyOptions> = new PropertyOptions()) { return this.property_raw(options); }
  lookupRaw(options: OptionsOrId<PropertyOptions> = new PropertyOptions()) { return this.lookup_raw(options); }
}
