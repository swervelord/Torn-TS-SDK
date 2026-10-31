import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle, type OptionsOrId } from "./runtime.ts";
import { MarketOptions } from "./options.ts";
import type { MarketAuctionHouseBundle, MarketAuctionHouseListingBundle, MarketBazaarBundle, MarketItemMarketBundle, MarketLookupBundle, MarketPropertiesBundle, MarketRentalsBundle, MarketTimestampBundle } from "../models/manual.ts";
import type { PointsMarketResponse } from "../generated/models.ts";
export { MarketOptions } from "./options.ts";

export class MarketApi extends ResourceApi<MarketOptions, "market"> {
  static readonly SUPPORTED_SELECTIONS = ["properties", "pointsmarket", "timestamp", "rentals", "lookup", "auctionhouselisting", "auctionhouse", "itemmarket", "bazaar"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "market", MarketApi.SUPPORTED_SELECTIONS, () => new MarketOptions()); }
  async bazaar(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<MarketBazaarBundle> {
    return this.executeTyped<MarketBazaarBundle>("bazaar", options, "MarketBazaarBundle", true);
  }
  async lookup(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<MarketLookupBundle> {
    return this.executeTyped<MarketLookupBundle>("lookup", options, "MarketLookupBundle", true);
  }
  async timestamp(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<MarketTimestampBundle> {
    return this.executeTyped<MarketTimestampBundle>("timestamp", options, "MarketTimestampBundle", true);
  }
  async pointsmarket(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<PointsMarketResponse> {
    return this.executeTyped<PointsMarketResponse>("pointsmarket", options, "PointsMarketResponse", false);
  }
  async properties(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<MarketPropertiesBundle> {
    return this.executeTyped<MarketPropertiesBundle>("properties", options, "MarketPropertiesBundle", true);
  }
  async rentals(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<MarketRentalsBundle> {
    return this.executeTyped<MarketRentalsBundle>("rentals", options, "MarketRentalsBundle", true);
  }
  async itemmarket(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<MarketItemMarketBundle> {
    return this.executeTyped<MarketItemMarketBundle>("itemmarket", options, "MarketItemMarketBundle", true);
  }
  async auctionhouse(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<MarketAuctionHouseBundle> {
    return this.executeTyped<MarketAuctionHouseBundle>("auctionhouse", options, "MarketAuctionHouseBundle", true);
  }
  async auctionhouselisting(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<MarketAuctionHouseListingBundle> {
    return this.executeTyped<MarketAuctionHouseListingBundle>("auctionhouselisting", options, "MarketAuctionHouseListingBundle", true);
  }
  /** @deprecated Use propertiesRaw(). */
  properties_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("properties", options); }
  /** @deprecated Use pointsmarketRaw(). */
  pointsmarket_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("pointsmarket", options); }
  /** @deprecated Use timestampRaw(). */
  timestamp_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  /** @deprecated Use rentalsRaw(). */
  rentals_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rentals", options); }
  /** @deprecated Use lookupRaw(). */
  lookup_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  /** @deprecated Use auctionhouselistingRaw(). */
  auctionhouselisting_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("auctionhouselisting", options); }
  /** @deprecated Use auctionhouseRaw(). */
  auctionhouse_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("auctionhouse", options); }
  /** @deprecated Use itemmarketRaw(). */
  itemmarket_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("itemmarket", options); }
  /** @deprecated Use bazaarRaw(). */
  bazaar_raw(options: OptionsOrId<MarketOptions> = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("bazaar", options); }
  propertiesRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.properties_raw(options); }
  pointsmarketRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.pointsmarket_raw(options); }
  timestampRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.timestamp_raw(options); }
  rentalsRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.rentals_raw(options); }
  lookupRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.lookup_raw(options); }
  auctionhouselistingRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.auctionhouselisting_raw(options); }
  auctionhouseRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.auctionhouse_raw(options); }
  itemmarketRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.itemmarket_raw(options); }
  bazaarRaw(options: OptionsOrId<MarketOptions> = new MarketOptions()) { return this.bazaar_raw(options); }
}
