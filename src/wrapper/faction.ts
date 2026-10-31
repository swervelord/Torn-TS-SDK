import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle, type OptionsOrId } from "./runtime.ts";
import { FactionOptions } from "./options.ts";
import type { FactionApplicationsBundle, FactionArmorBundle, FactionAttacksBundle, FactionAttacksFullBundle, FactionBalanceBundle, FactionBasicBundle, FactionBoostersBundle, FactionCachesBundle, FactionCesiumBundle, FactionChainBundle, FactionChainReportBundle, FactionChainsBundle, FactionContributorsBundle, FactionCrimeBundle, FactionCrimeExpBundle, FactionCrimesBundle, FactionDrugsBundle, FactionHofBundle, FactionLookupBundle, FactionMedicalBundle, FactionMembersBundle, FactionNewsBundle, FactionPositionsBundle, FactionRacketsBundle, FactionRaidReportBundle, FactionRaidsBundle, FactionRankedWarReportBundle, FactionRankedWarsBundle, FactionReportsBundle, FactionRevivesBundle, FactionRevivesFullBundle, FactionSearchBundle, FactionStatsBundle, FactionTemporaryBundle, FactionTerritoryBundle, FactionTerritoryOwnershipBundle, FactionTerritoryWarReportBundle, FactionTerritoryWarsBundle, FactionTimestampBundle, FactionUpgradesBundle, FactionUtilitiesBundle, FactionWarfareBundle, FactionWarsBundle, FactionWeaponsBundle } from "../models/manual.ts";
import type { FactionInventoryResponse, FactionWarfareChainsResponse, FactionWarfareDirtyBombsResponse, FactionWarfareRaidsResponse, FactionWarfareRankedResponse, FactionWarfareTerritoryWarsResponse } from "../generated/models.ts";
export { FactionOptions } from "./options.ts";

export class FactionApi extends ResourceApi<FactionOptions, "faction"> {
  static readonly SUPPORTED_SELECTIONS = ["revivesFull", "dirtybombs", "dirtbombs", "inventory", "warfarechains", "warfareraids", "warfareranked", "warfareterritory", "snapshot", "revives", "reports", "revivesfull", "stats", "search", "rankedwars", "rackets", "positions", "raidreport", "rankedwarreport", "raids", "utilities", "upgrades", "warfare", "weapons", "wars", "timestamp", "territory", "temporary", "territoryownership", "territorywars", "territorywarreport", "caches", "boosters", "cesium", "chainreport", "chain", "basic", "armor", "applications", "attacks", "balance", "attacksfull", "lookup", "hof", "medical", "news", "members", "drugs", "contributors", "chains", "crime", "crimes", "crimeexp"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "faction", FactionApi.SUPPORTED_SELECTIONS, () => new FactionOptions()); }
  async dirtybombs(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWarfareDirtyBombsResponse> {
    return this.executeTyped<FactionWarfareDirtyBombsResponse>("dirtybombs", options, "FactionWarfareDirtyBombsResponse", false);
  }
  async inventory(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionInventoryResponse> {
    return this.executeTyped<FactionInventoryResponse>("inventory", options, "FactionInventoryResponse", false);
  }
  async warfarechains(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWarfareChainsResponse> {
    return this.executeTyped<FactionWarfareChainsResponse>("warfarechains", options, "FactionWarfareChainsResponse", false);
  }
  async warfareraids(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWarfareRaidsResponse> {
    return this.executeTyped<FactionWarfareRaidsResponse>("warfareraids", options, "FactionWarfareRaidsResponse", false);
  }
  async warfareranked(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWarfareRankedResponse> {
    return this.executeTyped<FactionWarfareRankedResponse>("warfareranked", options, "FactionWarfareRankedResponse", false);
  }
  async warfareterritory(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWarfareTerritoryWarsResponse> {
    return this.executeTyped<FactionWarfareTerritoryWarsResponse>("warfareterritory", options, "FactionWarfareTerritoryWarsResponse", false);
  }
  async snapshot(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<string> {
    return this.executeText("snapshot", options);
  }
  async dirtbombs(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWarfareDirtyBombsResponse> {
    return this.dirtybombs(options);
  }
  async basic(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionBasicBundle> {
    return this.executeTyped<FactionBasicBundle>("basic", options, "FactionBasicBundle", true);
  }
  async members(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionMembersBundle> {
    return this.executeTyped<FactionMembersBundle>("members", options, "FactionMembersBundle", true);
  }
  async wars(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWarsBundle> {
    return this.executeTyped<FactionWarsBundle>("wars", options, "FactionWarsBundle", true);
  }
  async rankedwars(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionRankedWarsBundle> {
    return this.executeTyped<FactionRankedWarsBundle>("rankedwars", options, "FactionRankedWarsBundle", true);
  }
  async attacks(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionAttacksBundle> {
    return this.executeTyped<FactionAttacksBundle>("attacks", options, "FactionAttacksBundle", true);
  }
  async attacksfull(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionAttacksFullBundle> {
    return this.executeTyped<FactionAttacksFullBundle>("attacksfull", options, "FactionAttacksFullBundle", true);
  }
  async applications(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionApplicationsBundle> {
    return this.executeTyped<FactionApplicationsBundle>("applications", options, "FactionApplicationsBundle", true);
  }
  async armor(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionArmorBundle> {
    return this.executeTyped<FactionArmorBundle>("armor", options, "FactionArmorBundle", true);
  }
  async boosters(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionBoostersBundle> {
    return this.executeTyped<FactionBoostersBundle>("boosters", options, "FactionBoostersBundle", true);
  }
  async caches(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionCachesBundle> {
    return this.executeTyped<FactionCachesBundle>("caches", options, "FactionCachesBundle", true);
  }
  async cesium(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionCesiumBundle> {
    return this.executeTyped<FactionCesiumBundle>("cesium", options, "FactionCesiumBundle", true);
  }
  async lookup(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionLookupBundle> {
    return this.executeTyped<FactionLookupBundle>("lookup", options, "FactionLookupBundle", true);
  }
  async chain(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionChainBundle> {
    return this.executeTyped<FactionChainBundle>("chain", options, "FactionChainBundle", true);
  }
  async chains(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionChainsBundle> {
    return this.executeTyped<FactionChainsBundle>("chains", options, "FactionChainsBundle", true);
  }
  async chainreport(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionChainReportBundle> {
    return this.executeTyped<FactionChainReportBundle>("chainreport", options, "FactionChainReportBundle", true);
  }
  async balance(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionBalanceBundle> {
    return this.executeTyped<FactionBalanceBundle>("balance", options, "FactionBalanceBundle", true);
  }
  async contributors(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionContributorsBundle> {
    return this.executeTyped<FactionContributorsBundle>("contributors", options, "FactionContributorsBundle", true);
  }
  async crime(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionCrimeBundle> {
    return this.executeTyped<FactionCrimeBundle>("crime", options, "FactionCrimeBundle", true);
  }
  async crimeexp(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionCrimeExpBundle> {
    return this.executeTyped<FactionCrimeExpBundle>("crimeexp", options, "FactionCrimeExpBundle", true);
  }
  async crimes(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionCrimesBundle> {
    return this.executeTyped<FactionCrimesBundle>("crimes", options, "FactionCrimesBundle", true);
  }
  async drugs(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionDrugsBundle> {
    return this.executeTyped<FactionDrugsBundle>("drugs", options, "FactionDrugsBundle", true);
  }
  async rackets(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionRacketsBundle> {
    return this.executeTyped<FactionRacketsBundle>("rackets", options, "FactionRacketsBundle", true);
  }
  async medical(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionMedicalBundle> {
    return this.executeTyped<FactionMedicalBundle>("medical", options, "FactionMedicalBundle", true);
  }
  async hof(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionHofBundle> {
    return this.executeTyped<FactionHofBundle>("hof", options, "FactionHofBundle", true);
  }
  async positions(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionPositionsBundle> {
    return this.executeTyped<FactionPositionsBundle>("positions", options, "FactionPositionsBundle", true);
  }
  async search(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionSearchBundle> {
    return this.executeTyped<FactionSearchBundle>("search", options, "FactionSearchBundle", true);
  }
  async stats(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionStatsBundle> {
    return this.executeTyped<FactionStatsBundle>("stats", options, "FactionStatsBundle", true);
  }
  async raids(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionRaidsBundle> {
    return this.executeTyped<FactionRaidsBundle>("raids", options, "FactionRaidsBundle", true);
  }
  async raidreport(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionRaidReportBundle> {
    return this.executeTyped<FactionRaidReportBundle>("raidreport", options, "FactionRaidReportBundle", true);
  }
  async rankedwarreport(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionRankedWarReportBundle> {
    return this.executeTyped<FactionRankedWarReportBundle>("rankedwarreport", options, "FactionRankedWarReportBundle", true);
  }
  async reports(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionReportsBundle> {
    return this.executeTyped<FactionReportsBundle>("reports", options, "FactionReportsBundle", true);
  }
  async revives(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionRevivesBundle> {
    return this.executeTyped<FactionRevivesBundle>("revives", options, "FactionRevivesBundle", true);
  }
  async revivesfull(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionRevivesFullBundle> {
    return this.executeTyped<FactionRevivesFullBundle>("revivesfull", options, "FactionRevivesFullBundle", true);
  }
  async timestamp(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionTimestampBundle> {
    return this.executeTyped<FactionTimestampBundle>("timestamp", options, "FactionTimestampBundle", true);
  }
  async temporary(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionTemporaryBundle> {
    return this.executeTyped<FactionTemporaryBundle>("temporary", options, "FactionTemporaryBundle", true);
  }
  async territory(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionTerritoryBundle> {
    return this.executeTyped<FactionTerritoryBundle>("territory", options, "FactionTerritoryBundle", true);
  }
  async territoryownership(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionTerritoryOwnershipBundle> {
    return this.executeTyped<FactionTerritoryOwnershipBundle>("territoryownership", options, "FactionTerritoryOwnershipBundle", true);
  }
  async territorywars(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionTerritoryWarsBundle> {
    return this.executeTyped<FactionTerritoryWarsBundle>("territorywars", options, "FactionTerritoryWarsBundle", true);
  }
  async territorywarreport(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionTerritoryWarReportBundle> {
    return this.executeTyped<FactionTerritoryWarReportBundle>("territorywarreport", options, "FactionTerritoryWarReportBundle", true);
  }
  async utilities(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionUtilitiesBundle> {
    return this.executeTyped<FactionUtilitiesBundle>("utilities", options, "FactionUtilitiesBundle", true);
  }
  async warfare(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWarfareBundle> {
    return this.executeTyped<FactionWarfareBundle>("warfare", options, "FactionWarfareBundle", true);
  }
  async weapons(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionWeaponsBundle> {
    return this.executeTyped<FactionWeaponsBundle>("weapons", options, "FactionWeaponsBundle", true);
  }
  async news(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionNewsBundle> {
    return this.executeTyped<FactionNewsBundle>("news", options, "FactionNewsBundle", true);
  }
  async upgrades(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<FactionUpgradesBundle> {
    return this.executeTyped<FactionUpgradesBundle>("upgrades", options, "FactionUpgradesBundle", true);
  }
  /** @deprecated Use dirtybombsRaw(). */
  dirtybombs_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("dirtybombs", options); }
  /** @deprecated Use inventoryRaw(). */
  inventory_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("inventory", options); }
  /** @deprecated Use warfarechainsRaw(). */
  warfarechains_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfarechains", options); }
  /** @deprecated Use warfareraidsRaw(). */
  warfareraids_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfareraids", options); }
  /** @deprecated Use warfarerankedRaw(). */
  warfareranked_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfareranked", options); }
  /** @deprecated Use warfareterritoryRaw(). */
  warfareterritory_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfareterritory", options); }
  /** @deprecated Use revivesRaw(). */
  revives_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("revives", options); }
  /** @deprecated Use reportsRaw(). */
  reports_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("reports", options); }
  /** @deprecated Use revivesfullRaw(). */
  revivesfull_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("revivesfull", options); }
  /** @deprecated Use statsRaw(). */
  stats_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("stats", options); }
  /** @deprecated Use searchRaw(). */
  search_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("search", options); }
  /** @deprecated Use rankedwarsRaw(). */
  rankedwars_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rankedwars", options); }
  /** @deprecated Use racketsRaw(). */
  rackets_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rackets", options); }
  /** @deprecated Use positionsRaw(). */
  positions_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("positions", options); }
  /** @deprecated Use raidreportRaw(). */
  raidreport_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("raidreport", options); }
  /** @deprecated Use rankedwarreportRaw(). */
  rankedwarreport_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rankedwarreport", options); }
  /** @deprecated Use raidsRaw(). */
  raids_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("raids", options); }
  /** @deprecated Use utilitiesRaw(). */
  utilities_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("utilities", options); }
  /** @deprecated Use upgradesRaw(). */
  upgrades_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("upgrades", options); }
  /** @deprecated Use warfareRaw(). */
  warfare_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfare", options); }
  /** @deprecated Use weaponsRaw(). */
  weapons_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("weapons", options); }
  /** @deprecated Use warsRaw(). */
  wars_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("wars", options); }
  /** @deprecated Use timestampRaw(). */
  timestamp_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  /** @deprecated Use territoryRaw(). */
  territory_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territory", options); }
  /** @deprecated Use temporaryRaw(). */
  temporary_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("temporary", options); }
  /** @deprecated Use territoryownershipRaw(). */
  territoryownership_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territoryownership", options); }
  /** @deprecated Use territorywarsRaw(). */
  territorywars_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territorywars", options); }
  /** @deprecated Use territorywarreportRaw(). */
  territorywarreport_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territorywarreport", options); }
  /** @deprecated Use cachesRaw(). */
  caches_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("caches", options); }
  /** @deprecated Use boostersRaw(). */
  boosters_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("boosters", options); }
  /** @deprecated Use cesiumRaw(). */
  cesium_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("cesium", options); }
  /** @deprecated Use chainreportRaw(). */
  chainreport_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("chainreport", options); }
  /** @deprecated Use chainRaw(). */
  chain_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("chain", options); }
  /** @deprecated Use basicRaw(). */
  basic_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("basic", options); }
  /** @deprecated Use armorRaw(). */
  armor_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("armor", options); }
  /** @deprecated Use applicationsRaw(). */
  applications_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("applications", options); }
  /** @deprecated Use attacksRaw(). */
  attacks_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("attacks", options); }
  /** @deprecated Use balanceRaw(). */
  balance_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("balance", options); }
  /** @deprecated Use attacksfullRaw(). */
  attacksfull_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("attacksfull", options); }
  /** @deprecated Use lookupRaw(). */
  lookup_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  /** @deprecated Use hofRaw(). */
  hof_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("hof", options); }
  /** @deprecated Use medicalRaw(). */
  medical_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("medical", options); }
  /** @deprecated Use newsRaw(). */
  news_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("news", options); }
  /** @deprecated Use membersRaw(). */
  members_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("members", options); }
  /** @deprecated Use drugsRaw(). */
  drugs_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("drugs", options); }
  /** @deprecated Use contributorsRaw(). */
  contributors_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("contributors", options); }
  /** @deprecated Use chainsRaw(). */
  chains_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("chains", options); }
  /** @deprecated Use crimeRaw(). */
  crime_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("crime", options); }
  /** @deprecated Use crimesRaw(). */
  crimes_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("crimes", options); }
  /** @deprecated Use crimeexpRaw(). */
  crimeexp_raw(options: OptionsOrId<FactionOptions> = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("crimeexp", options); }
  dirtybombsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.dirtybombs_raw(options); }
  inventoryRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.inventory_raw(options); }
  warfarechainsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.warfarechains_raw(options); }
  warfareraidsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.warfareraids_raw(options); }
  warfarerankedRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.warfareranked_raw(options); }
  warfareterritoryRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.warfareterritory_raw(options); }
  revivesRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.revives_raw(options); }
  reportsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.reports_raw(options); }
  revivesfullRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.revivesfull_raw(options); }
  statsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.stats_raw(options); }
  searchRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.search_raw(options); }
  rankedwarsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.rankedwars_raw(options); }
  racketsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.rackets_raw(options); }
  positionsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.positions_raw(options); }
  raidreportRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.raidreport_raw(options); }
  rankedwarreportRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.rankedwarreport_raw(options); }
  raidsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.raids_raw(options); }
  utilitiesRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.utilities_raw(options); }
  upgradesRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.upgrades_raw(options); }
  warfareRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.warfare_raw(options); }
  weaponsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.weapons_raw(options); }
  warsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.wars_raw(options); }
  timestampRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.timestamp_raw(options); }
  territoryRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.territory_raw(options); }
  temporaryRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.temporary_raw(options); }
  territoryownershipRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.territoryownership_raw(options); }
  territorywarsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.territorywars_raw(options); }
  territorywarreportRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.territorywarreport_raw(options); }
  cachesRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.caches_raw(options); }
  boostersRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.boosters_raw(options); }
  cesiumRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.cesium_raw(options); }
  chainreportRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.chainreport_raw(options); }
  chainRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.chain_raw(options); }
  basicRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.basic_raw(options); }
  armorRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.armor_raw(options); }
  applicationsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.applications_raw(options); }
  attacksRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.attacks_raw(options); }
  balanceRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.balance_raw(options); }
  attacksfullRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.attacksfull_raw(options); }
  lookupRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.lookup_raw(options); }
  hofRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.hof_raw(options); }
  medicalRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.medical_raw(options); }
  newsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.news_raw(options); }
  membersRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.members_raw(options); }
  drugsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.drugs_raw(options); }
  contributorsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.contributors_raw(options); }
  chainsRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.chains_raw(options); }
  crimeRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.crime_raw(options); }
  crimesRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.crimes_raw(options); }
  crimeexpRaw(options: OptionsOrId<FactionOptions> = new FactionOptions()) { return this.crimeexp_raw(options); }
}
