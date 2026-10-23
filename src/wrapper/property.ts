import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle } from "./runtime.ts";
import { PropertyOptions } from "./options.ts";
import type { PropertyBundle, PropertyLookupBundle, PropertyTimestampBundle } from "../models/manual.ts";
export { PropertyOptions } from "./options.ts";

export class PropertyApi extends ResourceApi<PropertyOptions, "property"> {
  static readonly SUPPORTED_SELECTIONS = ["timestamp", "property", "lookup"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "property", PropertyApi.SUPPORTED_SELECTIONS, () => new PropertyOptions()); }
  async property(options: PropertyOptions = new PropertyOptions()): Promise<PropertyBundle> {
    return this.executeTyped<PropertyBundle>("property", options, "PropertyBundle", true);
  }
  async lookup(options: PropertyOptions = new PropertyOptions()): Promise<PropertyLookupBundle> {
    return this.executeTyped<PropertyLookupBundle>("lookup", options, "PropertyLookupBundle", true);
  }
  async timestamp(options: PropertyOptions = new PropertyOptions()): Promise<PropertyTimestampBundle> {
    return this.executeTyped<PropertyTimestampBundle>("timestamp", options, "PropertyTimestampBundle", true);
  }
  timestamp_raw(options: PropertyOptions = new PropertyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  property_raw(options: PropertyOptions = new PropertyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("property", options); }
  lookup_raw(options: PropertyOptions = new PropertyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  timestampRaw(options: PropertyOptions = new PropertyOptions()) { return this.timestamp_raw(options); }
  propertyRaw(options: PropertyOptions = new PropertyOptions()) { return this.property_raw(options); }
  lookupRaw(options: PropertyOptions = new PropertyOptions()) { return this.lookup_raw(options); }
}
