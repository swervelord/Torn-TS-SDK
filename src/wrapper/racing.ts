import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle, type OptionsOrId } from "./runtime.ts";
import { RacingOptions } from "./options.ts";
import type { RacingCarUpgradesBundle, RacingCarsBundle, RacingLookupBundle, RacingRaceBundle, RacingRacesBundle, RacingRecordsBundle, RacingTimestampBundle, RacingTracksBundle } from "../models/manual.ts";
export { RacingOptions } from "./options.ts";

export class RacingApi extends ResourceApi<RacingOptions, "racing"> {
  static readonly SUPPORTED_SELECTIONS = ["records", "races", "tracks", "timestamp", "carupgrades", "cars", "race", "lookup"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "racing", RacingApi.SUPPORTED_SELECTIONS, () => new RacingOptions()); }
  async race(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RacingRaceBundle> {
    return this.executeTyped<RacingRaceBundle>("race", options, "RacingRaceBundle", true);
  }
  async races(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RacingRacesBundle> {
    return this.executeTyped<RacingRacesBundle>("races", options, "RacingRacesBundle", true);
  }
  async records(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RacingRecordsBundle> {
    return this.executeTyped<RacingRecordsBundle>("records", options, "RacingRecordsBundle", true);
  }
  async tracks(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RacingTracksBundle> {
    return this.executeTyped<RacingTracksBundle>("tracks", options, "RacingTracksBundle", true);
  }
  async cars(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RacingCarsBundle> {
    return this.executeTyped<RacingCarsBundle>("cars", options, "RacingCarsBundle", true);
  }
  async carupgrades(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RacingCarUpgradesBundle> {
    return this.executeTyped<RacingCarUpgradesBundle>("carupgrades", options, "RacingCarUpgradesBundle", true);
  }
  async lookup(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RacingLookupBundle> {
    return this.executeTyped<RacingLookupBundle>("lookup", options, "RacingLookupBundle", true);
  }
  async timestamp(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RacingTimestampBundle> {
    return this.executeTyped<RacingTimestampBundle>("timestamp", options, "RacingTimestampBundle", true);
  }
  /** @deprecated Use recordsRaw(). */
  records_raw(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("records", options); }
  /** @deprecated Use racesRaw(). */
  races_raw(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("races", options); }
  /** @deprecated Use tracksRaw(). */
  tracks_raw(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("tracks", options); }
  /** @deprecated Use timestampRaw(). */
  timestamp_raw(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  /** @deprecated Use carupgradesRaw(). */
  carupgrades_raw(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("carupgrades", options); }
  /** @deprecated Use carsRaw(). */
  cars_raw(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("cars", options); }
  /** @deprecated Use raceRaw(). */
  race_raw(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("race", options); }
  /** @deprecated Use lookupRaw(). */
  lookup_raw(options: OptionsOrId<RacingOptions> = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  recordsRaw(options: OptionsOrId<RacingOptions> = new RacingOptions()) { return this.records_raw(options); }
  racesRaw(options: OptionsOrId<RacingOptions> = new RacingOptions()) { return this.races_raw(options); }
  tracksRaw(options: OptionsOrId<RacingOptions> = new RacingOptions()) { return this.tracks_raw(options); }
  timestampRaw(options: OptionsOrId<RacingOptions> = new RacingOptions()) { return this.timestamp_raw(options); }
  carupgradesRaw(options: OptionsOrId<RacingOptions> = new RacingOptions()) { return this.carupgrades_raw(options); }
  carsRaw(options: OptionsOrId<RacingOptions> = new RacingOptions()) { return this.cars_raw(options); }
  raceRaw(options: OptionsOrId<RacingOptions> = new RacingOptions()) { return this.race_raw(options); }
  lookupRaw(options: OptionsOrId<RacingOptions> = new RacingOptions()) { return this.lookup_raw(options); }
}
