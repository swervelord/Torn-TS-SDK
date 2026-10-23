import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle } from "./runtime.ts";
import { MarketOptions } from "./options.ts";
import type { MarketAuctionHouseBundle, MarketAuctionHouseListingBundle, MarketBazaarBundle, MarketItemMarketBundle, MarketLookupBundle, MarketPropertiesBundle, MarketRentalsBundle, MarketTimestampBundle } from "../models/manual.ts";
import type { PointsMarketResponse } from "../generated/models.ts";
export { MarketOptions } from "./options.ts";

export class MarketApi extends ResourceApi<MarketOptions, "market"> {
  static readonly SUPPORTED_SELECTIONS = ["properties", "pointsmarket", "timestamp", "rentals", "lookup", "auctionhouselisting", "auctionhouse", "itemmarket", "bazaar"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "market", MarketApi.SUPPORTED_SELECTIONS, () => new MarketOptions()); }
  async bazaar(options: MarketOptions = new MarketOptions()): Promise<MarketBazaarBundle> {
    return this.executeTyped<MarketBazaarBundle>("bazaar", options, "MarketBazaarBundle", true);
  }
  async lookup(options: MarketOptions = new MarketOptions()): Promise<MarketLookupBundle> {
    return this.executeTyped<MarketLookupBundle>("lookup", options, "MarketLookupBundle", true);
  }
  async timestamp(options: MarketOptions = new MarketOptions()): Promise<MarketTimestampBundle> {
    return this.executeTyped<MarketTimestampBundle>("timestamp", options, "MarketTimestampBundle", true);
  }
  async pointsmarket(options: MarketOptions = new MarketOptions()): Promise<PointsMarketResponse> {
    return this.executeTyped<PointsMarketResponse>("pointsmarket", options, "PointsMarketResponse", false);
  }
  async properties(options: MarketOptions = new MarketOptions()): Promise<MarketPropertiesBundle> {
    return this.executeTyped<MarketPropertiesBundle>("properties", options, "MarketPropertiesBundle", true);
  }
  async rentals(options: MarketOptions = new MarketOptions()): Promise<MarketRentalsBundle> {
    return this.executeTyped<MarketRentalsBundle>("rentals", options, "MarketRentalsBundle", true);
  }
  async itemmarket(options: MarketOptions = new MarketOptions()): Promise<MarketItemMarketBundle> {
    return this.executeTyped<MarketItemMarketBundle>("itemmarket", options, "MarketItemMarketBundle", true);
  }
  async auctionhouse(options: MarketOptions = new MarketOptions()): Promise<MarketAuctionHouseBundle> {
    return this.executeTyped<MarketAuctionHouseBundle>("auctionhouse", options, "MarketAuctionHouseBundle", true);
  }
  async auctionhouselisting(options: MarketOptions = new MarketOptions()): Promise<MarketAuctionHouseListingBundle> {
    return this.executeTyped<MarketAuctionHouseListingBundle>("auctionhouselisting", options, "MarketAuctionHouseListingBundle", true);
  }
  properties_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("properties", options); }
  pointsmarket_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("pointsmarket", options); }
  timestamp_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  rentals_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rentals", options); }
  lookup_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  auctionhouselisting_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("auctionhouselisting", options); }
  auctionhouse_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("auctionhouse", options); }
  itemmarket_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("itemmarket", options); }
  bazaar_raw(options: MarketOptions = new MarketOptions()): Promise<RawSelectionBundle> { return this.rawSelection("bazaar", options); }
  propertiesRaw(options: MarketOptions = new MarketOptions()) { return this.properties_raw(options); }
  pointsmarketRaw(options: MarketOptions = new MarketOptions()) { return this.pointsmarket_raw(options); }
  timestampRaw(options: MarketOptions = new MarketOptions()) { return this.timestamp_raw(options); }
  rentalsRaw(options: MarketOptions = new MarketOptions()) { return this.rentals_raw(options); }
  lookupRaw(options: MarketOptions = new MarketOptions()) { return this.lookup_raw(options); }
  auctionhouselistingRaw(options: MarketOptions = new MarketOptions()) { return this.auctionhouselisting_raw(options); }
  auctionhouseRaw(options: MarketOptions = new MarketOptions()) { return this.auctionhouse_raw(options); }
  itemmarketRaw(options: MarketOptions = new MarketOptions()) { return this.itemmarket_raw(options); }
  bazaarRaw(options: MarketOptions = new MarketOptions()) { return this.bazaar_raw(options); }
}
