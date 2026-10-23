import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle } from "./runtime.ts";
import { FactionOptions } from "./options.ts";
import type { FactionApplicationsBundle, FactionArmorBundle, FactionAttacksBundle, FactionAttacksFullBundle, FactionBalanceBundle, FactionBasicBundle, FactionBoostersBundle, FactionCachesBundle, FactionCesiumBundle, FactionChainBundle, FactionChainReportBundle, FactionChainsBundle, FactionContributorsBundle, FactionCrimeBundle, FactionCrimeExpBundle, FactionCrimesBundle, FactionDrugsBundle, FactionHofBundle, FactionLookupBundle, FactionMedicalBundle, FactionMembersBundle, FactionNewsBundle, FactionPositionsBundle, FactionRacketsBundle, FactionRaidReportBundle, FactionRaidsBundle, FactionRankedWarReportBundle, FactionRankedWarsBundle, FactionReportsBundle, FactionRevivesBundle, FactionRevivesFullBundle, FactionSearchBundle, FactionStatsBundle, FactionTemporaryBundle, FactionTerritoryBundle, FactionTerritoryOwnershipBundle, FactionTerritoryWarReportBundle, FactionTerritoryWarsBundle, FactionTimestampBundle, FactionUpgradesBundle, FactionUtilitiesBundle, FactionWarfareBundle, FactionWarsBundle, FactionWeaponsBundle } from "../models/manual.ts";
import type { FactionInventoryResponse, FactionWarfareChainsResponse, FactionWarfareDirtyBombsResponse, FactionWarfareRaidsResponse, FactionWarfareRankedResponse, FactionWarfareTerritoryWarsResponse } from "../generated/models.ts";
export { FactionOptions } from "./options.ts";

export class FactionApi extends ResourceApi<FactionOptions, "faction"> {
  static readonly SUPPORTED_SELECTIONS = ["revivesFull", "dirtybombs", "dirtbombs", "inventory", "warfarechains", "warfareraids", "warfareranked", "warfareterritory", "snapshot", "revives", "reports", "revivesfull", "stats", "search", "rankedwars", "rackets", "positions", "raidreport", "rankedwarreport", "raids", "utilities", "upgrades", "warfare", "weapons", "wars", "timestamp", "territory", "temporary", "territoryownership", "territorywars", "territorywarreport", "caches", "boosters", "cesium", "chainreport", "chain", "basic", "armor", "applications", "attacks", "balance", "attacksfull", "lookup", "hof", "medical", "news", "members", "drugs", "contributors", "chains", "crime", "crimes", "crimeexp"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "faction", FactionApi.SUPPORTED_SELECTIONS, () => new FactionOptions()); }
  async dirtybombs(options: FactionOptions = new FactionOptions()): Promise<FactionWarfareDirtyBombsResponse> {
    return this.executeTyped<FactionWarfareDirtyBombsResponse>("dirtybombs", options, "FactionWarfareDirtyBombsResponse", false);
  }
  async inventory(options: FactionOptions = new FactionOptions()): Promise<FactionInventoryResponse> {
    return this.executeTyped<FactionInventoryResponse>("inventory", options, "FactionInventoryResponse", false);
  }
  async warfarechains(options: FactionOptions = new FactionOptions()): Promise<FactionWarfareChainsResponse> {
    return this.executeTyped<FactionWarfareChainsResponse>("warfarechains", options, "FactionWarfareChainsResponse", false);
  }
  async warfareraids(options: FactionOptions = new FactionOptions()): Promise<FactionWarfareRaidsResponse> {
    return this.executeTyped<FactionWarfareRaidsResponse>("warfareraids", options, "FactionWarfareRaidsResponse", false);
  }
  async warfareranked(options: FactionOptions = new FactionOptions()): Promise<FactionWarfareRankedResponse> {
    return this.executeTyped<FactionWarfareRankedResponse>("warfareranked", options, "FactionWarfareRankedResponse", false);
  }
  async warfareterritory(options: FactionOptions = new FactionOptions()): Promise<FactionWarfareTerritoryWarsResponse> {
    return this.executeTyped<FactionWarfareTerritoryWarsResponse>("warfareterritory", options, "FactionWarfareTerritoryWarsResponse", false);
  }
  async snapshot(options: FactionOptions = new FactionOptions()): Promise<string> {
    return this.executeText("snapshot", options);
  }
  async dirtbombs(options: FactionOptions = new FactionOptions()): Promise<FactionWarfareDirtyBombsResponse> {
    return this.dirtybombs(options);
  }
  async basic(options: FactionOptions = new FactionOptions()): Promise<FactionBasicBundle> {
    return this.executeTyped<FactionBasicBundle>("basic", options, "FactionBasicBundle", true);
  }
  async members(options: FactionOptions = new FactionOptions()): Promise<FactionMembersBundle> {
    return this.executeTyped<FactionMembersBundle>("members", options, "FactionMembersBundle", true);
  }
  async wars(options: FactionOptions = new FactionOptions()): Promise<FactionWarsBundle> {
    return this.executeTyped<FactionWarsBundle>("wars", options, "FactionWarsBundle", true);
  }
  async rankedwars(options: FactionOptions = new FactionOptions()): Promise<FactionRankedWarsBundle> {
    return this.executeTyped<FactionRankedWarsBundle>("rankedwars", options, "FactionRankedWarsBundle", true);
  }
  async attacks(options: FactionOptions = new FactionOptions()): Promise<FactionAttacksBundle> {
    return this.executeTyped<FactionAttacksBundle>("attacks", options, "FactionAttacksBundle", true);
  }
  async attacksfull(options: FactionOptions = new FactionOptions()): Promise<FactionAttacksFullBundle> {
    return this.executeTyped<FactionAttacksFullBundle>("attacksfull", options, "FactionAttacksFullBundle", true);
  }
  async applications(options: FactionOptions = new FactionOptions()): Promise<FactionApplicationsBundle> {
    return this.executeTyped<FactionApplicationsBundle>("applications", options, "FactionApplicationsBundle", true);
  }
  async armor(options: FactionOptions = new FactionOptions()): Promise<FactionArmorBundle> {
    return this.executeTyped<FactionArmorBundle>("armor", options, "FactionArmorBundle", true);
  }
  async boosters(options: FactionOptions = new FactionOptions()): Promise<FactionBoostersBundle> {
    return this.executeTyped<FactionBoostersBundle>("boosters", options, "FactionBoostersBundle", true);
  }
  async caches(options: FactionOptions = new FactionOptions()): Promise<FactionCachesBundle> {
    return this.executeTyped<FactionCachesBundle>("caches", options, "FactionCachesBundle", true);
  }
  async cesium(options: FactionOptions = new FactionOptions()): Promise<FactionCesiumBundle> {
    return this.executeTyped<FactionCesiumBundle>("cesium", options, "FactionCesiumBundle", true);
  }
  async lookup(options: FactionOptions = new FactionOptions()): Promise<FactionLookupBundle> {
    return this.executeTyped<FactionLookupBundle>("lookup", options, "FactionLookupBundle", true);
  }
  async chain(options: FactionOptions = new FactionOptions()): Promise<FactionChainBundle> {
    return this.executeTyped<FactionChainBundle>("chain", options, "FactionChainBundle", true);
  }
  async chains(options: FactionOptions = new FactionOptions()): Promise<FactionChainsBundle> {
    return this.executeTyped<FactionChainsBundle>("chains", options, "FactionChainsBundle", true);
  }
  async chainreport(options: FactionOptions = new FactionOptions()): Promise<FactionChainReportBundle> {
    return this.executeTyped<FactionChainReportBundle>("chainreport", options, "FactionChainReportBundle", true);
  }
  async balance(options: FactionOptions = new FactionOptions()): Promise<FactionBalanceBundle> {
    return this.executeTyped<FactionBalanceBundle>("balance", options, "FactionBalanceBundle", true);
  }
  async contributors(options: FactionOptions = new FactionOptions()): Promise<FactionContributorsBundle> {
    return this.executeTyped<FactionContributorsBundle>("contributors", options, "FactionContributorsBundle", true);
  }
  async crime(options: FactionOptions = new FactionOptions()): Promise<FactionCrimeBundle> {
    return this.executeTyped<FactionCrimeBundle>("crime", options, "FactionCrimeBundle", true);
  }
  async crimeexp(options: FactionOptions = new FactionOptions()): Promise<FactionCrimeExpBundle> {
    return this.executeTyped<FactionCrimeExpBundle>("crimeexp", options, "FactionCrimeExpBundle", true);
  }
  async crimes(options: FactionOptions = new FactionOptions()): Promise<FactionCrimesBundle> {
    return this.executeTyped<FactionCrimesBundle>("crimes", options, "FactionCrimesBundle", true);
  }
  async drugs(options: FactionOptions = new FactionOptions()): Promise<FactionDrugsBundle> {
    return this.executeTyped<FactionDrugsBundle>("drugs", options, "FactionDrugsBundle", true);
  }
  async rackets(options: FactionOptions = new FactionOptions()): Promise<FactionRacketsBundle> {
    return this.executeTyped<FactionRacketsBundle>("rackets", options, "FactionRacketsBundle", true);
  }
  async medical(options: FactionOptions = new FactionOptions()): Promise<FactionMedicalBundle> {
    return this.executeTyped<FactionMedicalBundle>("medical", options, "FactionMedicalBundle", true);
  }
  async hof(options: FactionOptions = new FactionOptions()): Promise<FactionHofBundle> {
    return this.executeTyped<FactionHofBundle>("hof", options, "FactionHofBundle", true);
  }
  async positions(options: FactionOptions = new FactionOptions()): Promise<FactionPositionsBundle> {
    return this.executeTyped<FactionPositionsBundle>("positions", options, "FactionPositionsBundle", true);
  }
  async search(options: FactionOptions = new FactionOptions()): Promise<FactionSearchBundle> {
    return this.executeTyped<FactionSearchBundle>("search", options, "FactionSearchBundle", true);
  }
  async stats(options: FactionOptions = new FactionOptions()): Promise<FactionStatsBundle> {
    return this.executeTyped<FactionStatsBundle>("stats", options, "FactionStatsBundle", true);
  }
  async raids(options: FactionOptions = new FactionOptions()): Promise<FactionRaidsBundle> {
    return this.executeTyped<FactionRaidsBundle>("raids", options, "FactionRaidsBundle", true);
  }
  async raidreport(options: FactionOptions = new FactionOptions()): Promise<FactionRaidReportBundle> {
    return this.executeTyped<FactionRaidReportBundle>("raidreport", options, "FactionRaidReportBundle", true);
  }
  async rankedwarreport(options: FactionOptions = new FactionOptions()): Promise<FactionRankedWarReportBundle> {
    return this.executeTyped<FactionRankedWarReportBundle>("rankedwarreport", options, "FactionRankedWarReportBundle", true);
  }
  async reports(options: FactionOptions = new FactionOptions()): Promise<FactionReportsBundle> {
    return this.executeTyped<FactionReportsBundle>("reports", options, "FactionReportsBundle", true);
  }
  async revives(options: FactionOptions = new FactionOptions()): Promise<FactionRevivesBundle> {
    return this.executeTyped<FactionRevivesBundle>("revives", options, "FactionRevivesBundle", true);
  }
  async revivesfull(options: FactionOptions = new FactionOptions()): Promise<FactionRevivesFullBundle> {
    return this.executeTyped<FactionRevivesFullBundle>("revivesfull", options, "FactionRevivesFullBundle", true);
  }
  async timestamp(options: FactionOptions = new FactionOptions()): Promise<FactionTimestampBundle> {
    return this.executeTyped<FactionTimestampBundle>("timestamp", options, "FactionTimestampBundle", true);
  }
  async temporary(options: FactionOptions = new FactionOptions()): Promise<FactionTemporaryBundle> {
    return this.executeTyped<FactionTemporaryBundle>("temporary", options, "FactionTemporaryBundle", true);
  }
  async territory(options: FactionOptions = new FactionOptions()): Promise<FactionTerritoryBundle> {
    return this.executeTyped<FactionTerritoryBundle>("territory", options, "FactionTerritoryBundle", true);
  }
  async territoryownership(options: FactionOptions = new FactionOptions()): Promise<FactionTerritoryOwnershipBundle> {
    return this.executeTyped<FactionTerritoryOwnershipBundle>("territoryownership", options, "FactionTerritoryOwnershipBundle", true);
  }
  async territorywars(options: FactionOptions = new FactionOptions()): Promise<FactionTerritoryWarsBundle> {
    return this.executeTyped<FactionTerritoryWarsBundle>("territorywars", options, "FactionTerritoryWarsBundle", true);
  }
  async territorywarreport(options: FactionOptions = new FactionOptions()): Promise<FactionTerritoryWarReportBundle> {
    return this.executeTyped<FactionTerritoryWarReportBundle>("territorywarreport", options, "FactionTerritoryWarReportBundle", true);
  }
  async utilities(options: FactionOptions = new FactionOptions()): Promise<FactionUtilitiesBundle> {
    return this.executeTyped<FactionUtilitiesBundle>("utilities", options, "FactionUtilitiesBundle", true);
  }
  async warfare(options: FactionOptions = new FactionOptions()): Promise<FactionWarfareBundle> {
    return this.executeTyped<FactionWarfareBundle>("warfare", options, "FactionWarfareBundle", true);
  }
  async weapons(options: FactionOptions = new FactionOptions()): Promise<FactionWeaponsBundle> {
    return this.executeTyped<FactionWeaponsBundle>("weapons", options, "FactionWeaponsBundle", true);
  }
  async news(options: FactionOptions = new FactionOptions()): Promise<FactionNewsBundle> {
    return this.executeTyped<FactionNewsBundle>("news", options, "FactionNewsBundle", true);
  }
  async upgrades(options: FactionOptions = new FactionOptions()): Promise<FactionUpgradesBundle> {
    return this.executeTyped<FactionUpgradesBundle>("upgrades", options, "FactionUpgradesBundle", true);
  }
  dirtybombs_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("dirtybombs", options); }
  inventory_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("inventory", options); }
  warfarechains_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfarechains", options); }
  warfareraids_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfareraids", options); }
  warfareranked_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfareranked", options); }
  warfareterritory_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfareterritory", options); }
  revives_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("revives", options); }
  reports_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("reports", options); }
  revivesfull_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("revivesfull", options); }
  stats_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("stats", options); }
  search_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("search", options); }
  rankedwars_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rankedwars", options); }
  rackets_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rackets", options); }
  positions_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("positions", options); }
  raidreport_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("raidreport", options); }
  rankedwarreport_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rankedwarreport", options); }
  raids_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("raids", options); }
  utilities_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("utilities", options); }
  upgrades_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("upgrades", options); }
  warfare_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("warfare", options); }
  weapons_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("weapons", options); }
  wars_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("wars", options); }
  timestamp_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  territory_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territory", options); }
  temporary_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("temporary", options); }
  territoryownership_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territoryownership", options); }
  territorywars_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territorywars", options); }
  territorywarreport_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territorywarreport", options); }
  caches_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("caches", options); }
  boosters_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("boosters", options); }
  cesium_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("cesium", options); }
  chainreport_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("chainreport", options); }
  chain_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("chain", options); }
  basic_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("basic", options); }
  armor_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("armor", options); }
  applications_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("applications", options); }
  attacks_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("attacks", options); }
  balance_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("balance", options); }
  attacksfull_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("attacksfull", options); }
  lookup_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  hof_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("hof", options); }
  medical_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("medical", options); }
  news_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("news", options); }
  members_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("members", options); }
  drugs_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("drugs", options); }
  contributors_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("contributors", options); }
  chains_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("chains", options); }
  crime_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("crime", options); }
  crimes_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("crimes", options); }
  crimeexp_raw(options: FactionOptions = new FactionOptions()): Promise<RawSelectionBundle> { return this.rawSelection("crimeexp", options); }
  dirtybombsRaw(options: FactionOptions = new FactionOptions()) { return this.dirtybombs_raw(options); }
  inventoryRaw(options: FactionOptions = new FactionOptions()) { return this.inventory_raw(options); }
  warfarechainsRaw(options: FactionOptions = new FactionOptions()) { return this.warfarechains_raw(options); }
  warfareraidsRaw(options: FactionOptions = new FactionOptions()) { return this.warfareraids_raw(options); }
  warfarerankedRaw(options: FactionOptions = new FactionOptions()) { return this.warfareranked_raw(options); }
  warfareterritoryRaw(options: FactionOptions = new FactionOptions()) { return this.warfareterritory_raw(options); }
  revivesRaw(options: FactionOptions = new FactionOptions()) { return this.revives_raw(options); }
  reportsRaw(options: FactionOptions = new FactionOptions()) { return this.reports_raw(options); }
  revivesfullRaw(options: FactionOptions = new FactionOptions()) { return this.revivesfull_raw(options); }
  statsRaw(options: FactionOptions = new FactionOptions()) { return this.stats_raw(options); }
  searchRaw(options: FactionOptions = new FactionOptions()) { return this.search_raw(options); }
  rankedwarsRaw(options: FactionOptions = new FactionOptions()) { return this.rankedwars_raw(options); }
  racketsRaw(options: FactionOptions = new FactionOptions()) { return this.rackets_raw(options); }
  positionsRaw(options: FactionOptions = new FactionOptions()) { return this.positions_raw(options); }
  raidreportRaw(options: FactionOptions = new FactionOptions()) { return this.raidreport_raw(options); }
  rankedwarreportRaw(options: FactionOptions = new FactionOptions()) { return this.rankedwarreport_raw(options); }
  raidsRaw(options: FactionOptions = new FactionOptions()) { return this.raids_raw(options); }
  utilitiesRaw(options: FactionOptions = new FactionOptions()) { return this.utilities_raw(options); }
  upgradesRaw(options: FactionOptions = new FactionOptions()) { return this.upgrades_raw(options); }
  warfareRaw(options: FactionOptions = new FactionOptions()) { return this.warfare_raw(options); }
  weaponsRaw(options: FactionOptions = new FactionOptions()) { return this.weapons_raw(options); }
  warsRaw(options: FactionOptions = new FactionOptions()) { return this.wars_raw(options); }
  timestampRaw(options: FactionOptions = new FactionOptions()) { return this.timestamp_raw(options); }
  territoryRaw(options: FactionOptions = new FactionOptions()) { return this.territory_raw(options); }
  temporaryRaw(options: FactionOptions = new FactionOptions()) { return this.temporary_raw(options); }
  territoryownershipRaw(options: FactionOptions = new FactionOptions()) { return this.territoryownership_raw(options); }
  territorywarsRaw(options: FactionOptions = new FactionOptions()) { return this.territorywars_raw(options); }
  territorywarreportRaw(options: FactionOptions = new FactionOptions()) { return this.territorywarreport_raw(options); }
  cachesRaw(options: FactionOptions = new FactionOptions()) { return this.caches_raw(options); }
  boostersRaw(options: FactionOptions = new FactionOptions()) { return this.boosters_raw(options); }
  cesiumRaw(options: FactionOptions = new FactionOptions()) { return this.cesium_raw(options); }
  chainreportRaw(options: FactionOptions = new FactionOptions()) { return this.chainreport_raw(options); }
  chainRaw(options: FactionOptions = new FactionOptions()) { return this.chain_raw(options); }
  basicRaw(options: FactionOptions = new FactionOptions()) { return this.basic_raw(options); }
  armorRaw(options: FactionOptions = new FactionOptions()) { return this.armor_raw(options); }
  applicationsRaw(options: FactionOptions = new FactionOptions()) { return this.applications_raw(options); }
  attacksRaw(options: FactionOptions = new FactionOptions()) { return this.attacks_raw(options); }
  balanceRaw(options: FactionOptions = new FactionOptions()) { return this.balance_raw(options); }
  attacksfullRaw(options: FactionOptions = new FactionOptions()) { return this.attacksfull_raw(options); }
  lookupRaw(options: FactionOptions = new FactionOptions()) { return this.lookup_raw(options); }
  hofRaw(options: FactionOptions = new FactionOptions()) { return this.hof_raw(options); }
  medicalRaw(options: FactionOptions = new FactionOptions()) { return this.medical_raw(options); }
  newsRaw(options: FactionOptions = new FactionOptions()) { return this.news_raw(options); }
  membersRaw(options: FactionOptions = new FactionOptions()) { return this.members_raw(options); }
  drugsRaw(options: FactionOptions = new FactionOptions()) { return this.drugs_raw(options); }
  contributorsRaw(options: FactionOptions = new FactionOptions()) { return this.contributors_raw(options); }
  chainsRaw(options: FactionOptions = new FactionOptions()) { return this.chains_raw(options); }
  crimeRaw(options: FactionOptions = new FactionOptions()) { return this.crime_raw(options); }
  crimesRaw(options: FactionOptions = new FactionOptions()) { return this.crimes_raw(options); }
  crimeexpRaw(options: FactionOptions = new FactionOptions()) { return this.crimeexp_raw(options); }
}
