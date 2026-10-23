import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle } from "./runtime.ts";
import { RacingOptions } from "./options.ts";
import type { RacingCarUpgradesBundle, RacingCarsBundle, RacingLookupBundle, RacingRaceBundle, RacingRacesBundle, RacingRecordsBundle, RacingTimestampBundle, RacingTracksBundle } from "../models/manual.ts";
export { RacingOptions } from "./options.ts";

export class RacingApi extends ResourceApi<RacingOptions, "racing"> {
  static readonly SUPPORTED_SELECTIONS = ["records", "races", "tracks", "timestamp", "carupgrades", "cars", "race", "lookup"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "racing", RacingApi.SUPPORTED_SELECTIONS, () => new RacingOptions()); }
  async race(options: RacingOptions = new RacingOptions()): Promise<RacingRaceBundle> {
    return this.executeTyped<RacingRaceBundle>("race", options, "RacingRaceBundle", true);
  }
  async races(options: RacingOptions = new RacingOptions()): Promise<RacingRacesBundle> {
    return this.executeTyped<RacingRacesBundle>("races", options, "RacingRacesBundle", true);
  }
  async records(options: RacingOptions = new RacingOptions()): Promise<RacingRecordsBundle> {
    return this.executeTyped<RacingRecordsBundle>("records", options, "RacingRecordsBundle", true);
  }
  async tracks(options: RacingOptions = new RacingOptions()): Promise<RacingTracksBundle> {
    return this.executeTyped<RacingTracksBundle>("tracks", options, "RacingTracksBundle", true);
  }
  async cars(options: RacingOptions = new RacingOptions()): Promise<RacingCarsBundle> {
    return this.executeTyped<RacingCarsBundle>("cars", options, "RacingCarsBundle", true);
  }
  async carupgrades(options: RacingOptions = new RacingOptions()): Promise<RacingCarUpgradesBundle> {
    return this.executeTyped<RacingCarUpgradesBundle>("carupgrades", options, "RacingCarUpgradesBundle", true);
  }
  async lookup(options: RacingOptions = new RacingOptions()): Promise<RacingLookupBundle> {
    return this.executeTyped<RacingLookupBundle>("lookup", options, "RacingLookupBundle", true);
  }
  async timestamp(options: RacingOptions = new RacingOptions()): Promise<RacingTimestampBundle> {
    return this.executeTyped<RacingTimestampBundle>("timestamp", options, "RacingTimestampBundle", true);
  }
  records_raw(options: RacingOptions = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("records", options); }
  races_raw(options: RacingOptions = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("races", options); }
  tracks_raw(options: RacingOptions = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("tracks", options); }
  timestamp_raw(options: RacingOptions = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  carupgrades_raw(options: RacingOptions = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("carupgrades", options); }
  cars_raw(options: RacingOptions = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("cars", options); }
  race_raw(options: RacingOptions = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("race", options); }
  lookup_raw(options: RacingOptions = new RacingOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  recordsRaw(options: RacingOptions = new RacingOptions()) { return this.records_raw(options); }
  racesRaw(options: RacingOptions = new RacingOptions()) { return this.races_raw(options); }
  tracksRaw(options: RacingOptions = new RacingOptions()) { return this.tracks_raw(options); }
  timestampRaw(options: RacingOptions = new RacingOptions()) { return this.timestamp_raw(options); }
  carupgradesRaw(options: RacingOptions = new RacingOptions()) { return this.carupgrades_raw(options); }
  carsRaw(options: RacingOptions = new RacingOptions()) { return this.cars_raw(options); }
  raceRaw(options: RacingOptions = new RacingOptions()) { return this.race_raw(options); }
  lookupRaw(options: RacingOptions = new RacingOptions()) { return this.lookup_raw(options); }
}
