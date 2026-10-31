import type { TornHalloweenResponse } from "../generated/models.ts";
import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle, type OptionsOrId } from "./runtime.ts";
import { TornOptions } from "./options.ts";
import type { TornAttackLogBundle, TornBountiesBundle, TornCalendarBundle, TornCompetitionBundle, TornCrimesBundle, TornEducationBundle, TornEliminationBundle, TornEliminationTeamBundle, TornFactionHofBundle, TornFactionTreeBundle, TornHofBundle, TornHonorsBundle, TornItemAmmoBundle, TornItemModsBundle, TornItemsBundle, TornLogCategoriesBundle, TornLogTypesBundle, TornLookupBundle, TornMedalsBundle, TornMeritsBundle, TornOrganisedCrimesBundle, TornOrganizedCrimesBundle, TornPawnshopBundle, TornPropertiesBundle, TornStockBundle, TornStocksBundle, TornSubcrimesBundle, TornTerritoryBundle, TornTimestampBundle } from "../models/manual.ts";
import type { TornBankResponse, TornCardsResponse, TornCityShopsResponse, TornCityStatsResponse, TornCompaniesResponse, TornGymsResponse, TornItemDetailsResponse, TornItemStatsResponse, TornMuseumResponse, TornPokerTablesResponse, TornRockPaperScissorsResponse, TornSearchForCashResponse, TornShopliftingResponse } from "../generated/models.ts";
export { TornOptions } from "./options.ts";

export class TornApi extends ResourceApi<TornOptions, "torn"> {
  static readonly SUPPORTED_SELECTIONS = ["museum", "merits", "medals", "organisedcrimes", "pawnshop", "organizedcrimes", "itemstats", "items", "logcategories", "lookup", "logtypes", "stocks", "stats", "subcrimes", "timestamp", "territory", "properties", "pokertables", "rockpaperscissors", "shoplifting", "searchforcash", "companies", "cityshops", "competition", "education", "crimes", "bank", "attacklog", "bounties", "cards", "calendar", "honors", "hof", "itemammo", "itemmods", "itemdetails", "eliminationteam", "elimination", "factionhof", "gyms", "factiontree", "halloween"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "torn", TornApi.SUPPORTED_SELECTIONS, () => new TornOptions()); }
  /** Halloween basket data from API v2. */
  async halloween(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornHalloweenResponse> {
    return this.executeTyped<TornHalloweenResponse>("halloween", options, "TornHalloweenResponse", false);
  }
  halloween_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("halloween", options); }
  halloweenRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.halloween_raw(options); }
  async museum(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornMuseumResponse> {
    return this.executeTyped<TornMuseumResponse>("museum", options, "TornMuseumResponse", false);
  }
  async calendar(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornCalendarBundle> {
    return this.executeTyped<TornCalendarBundle>("calendar", options, "TornCalendarBundle", true);
  }
  async items(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornItemsBundle> {
    return this.executeTyped<TornItemsBundle>("items", options, "TornItemsBundle", true);
  }
  async honors(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornHonorsBundle> {
    return this.executeTyped<TornHonorsBundle>("honors", options, "TornHonorsBundle", true);
  }
  async medals(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornMedalsBundle> {
    return this.executeTyped<TornMedalsBundle>("medals", options, "TornMedalsBundle", true);
  }
  async logcategories(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornLogCategoriesBundle> {
    return this.executeTyped<TornLogCategoriesBundle>("logcategories", options, "TornLogCategoriesBundle", true);
  }
  async logtypes(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornLogTypesBundle> {
    return this.executeTyped<TornLogTypesBundle>("logtypes", options, "TornLogTypesBundle", true);
  }
  async merits(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornMeritsBundle> {
    return this.executeTyped<TornMeritsBundle>("merits", options, "TornMeritsBundle", true);
  }
  async itemammo(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornItemAmmoBundle> {
    return this.executeTyped<TornItemAmmoBundle>("itemammo", options, "TornItemAmmoBundle", true);
  }
  async itemmods(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornItemModsBundle> {
    return this.executeTyped<TornItemModsBundle>("itemmods", options, "TornItemModsBundle", true);
  }
  async properties(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornPropertiesBundle> {
    return this.executeTyped<TornPropertiesBundle>("properties", options, "TornPropertiesBundle", true);
  }
  async stocks(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornStocksBundle> {
    options = this.options(options); this.validateStockOptions(options, false);
    return this.executeTyped<TornStocksBundle>("stocks", options, "TornStocksBundle", true);
  }
  async stock(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornStockBundle> {
    options = this.options(options); this.validateStockOptions(options, true);
    return this.executeTyped<TornStockBundle>("stocks", options, "TornStockBundle", true);
  }
  async bounties(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornBountiesBundle> {
    return this.executeTyped<TornBountiesBundle>("bounties", options, "TornBountiesBundle", true);
  }
  async bank(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornBankResponse> {
    return this.executeTyped<TornBankResponse>("bank", options, "TornBankResponse", false);
  }
  async attacklog(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornAttackLogBundle> {
    return this.executeTyped<TornAttackLogBundle>("attacklog", options, "TornAttackLogBundle", true);
  }
  async cards(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornCardsResponse> {
    return this.executeTyped<TornCardsResponse>("cards", options, "TornCardsResponse", false);
  }
  async cityshops(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornCityShopsResponse> {
    return this.executeTyped<TornCityShopsResponse>("cityshops", options, "TornCityShopsResponse", false);
  }
  async companies(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornCompaniesResponse> {
    return this.executeTyped<TornCompaniesResponse>("companies", options, "TornCompaniesResponse", false);
  }
  async gyms(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornGymsResponse> {
    return this.executeTyped<TornGymsResponse>("gyms", options, "TornGymsResponse", false);
  }
  async itemstats(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornItemStatsResponse> {
    return this.executeTyped<TornItemStatsResponse>("itemstats", options, "TornItemStatsResponse", false);
  }
  async itemdetails(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornItemDetailsResponse> {
    return this.executeTyped<TornItemDetailsResponse>("itemdetails", options, "TornItemDetailsResponse", false);
  }
  async pawnshop(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornPawnshopBundle> {
    return this.executeTyped<TornPawnshopBundle>("pawnshop", options, "TornPawnshopBundle", true);
  }
  async pokertables(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornPokerTablesResponse> {
    return this.executeTyped<TornPokerTablesResponse>("pokertables", options, "TornPokerTablesResponse", false);
  }
  async lookup(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornLookupBundle> {
    return this.executeTyped<TornLookupBundle>("lookup", options, "TornLookupBundle", true);
  }
  async timestamp(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornTimestampBundle> {
    return this.executeTyped<TornTimestampBundle>("timestamp", options, "TornTimestampBundle", true);
  }
  async competition(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornCompetitionBundle> {
    return this.executeTyped<TornCompetitionBundle>("competition", options, "TornCompetitionBundle", true);
  }
  async crimes(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornCrimesBundle> {
    return this.executeTyped<TornCrimesBundle>("crimes", options, "TornCrimesBundle", true);
  }
  async education(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornEducationBundle> {
    return this.executeTyped<TornEducationBundle>("education", options, "TornEducationBundle", true);
  }
  async elimination(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornEliminationBundle> {
    return this.executeTyped<TornEliminationBundle>("elimination", options, "TornEliminationBundle", true);
  }
  async eliminationteam(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornEliminationTeamBundle> {
    return this.executeTyped<TornEliminationTeamBundle>("eliminationteam", options, "TornEliminationTeamBundle", true);
  }
  async factionhof(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornFactionHofBundle> {
    return this.executeTyped<TornFactionHofBundle>("factionhof", options, "TornFactionHofBundle", true);
  }
  async factiontree(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornFactionTreeBundle> {
    return this.executeTyped<TornFactionTreeBundle>("factiontree", options, "TornFactionTreeBundle", true);
  }
  async hof(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornHofBundle> {
    return this.executeTyped<TornHofBundle>("hof", options, "TornHofBundle", true);
  }
  async organisedcrimes(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornOrganisedCrimesBundle> {
    return this.executeTyped<TornOrganisedCrimesBundle>("organisedcrimes", options, "TornOrganisedCrimesBundle", true);
  }
  async organizedcrimes(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornOrganizedCrimesBundle> {
    return this.executeTyped<TornOrganizedCrimesBundle>("organizedcrimes", options, "TornOrganizedCrimesBundle", true);
  }
  async rockpaperscissors(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornRockPaperScissorsResponse> {
    return this.executeTyped<TornRockPaperScissorsResponse>("rockpaperscissors", options, "TornRockPaperScissorsResponse", false);
  }
  async searchforcash(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornSearchForCashResponse> {
    return this.executeTyped<TornSearchForCashResponse>("searchforcash", options, "TornSearchForCashResponse", false);
  }
  async shoplifting(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornShopliftingResponse> {
    return this.executeTyped<TornShopliftingResponse>("shoplifting", options, "TornShopliftingResponse", false);
  }
  async stats(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornCityStatsResponse> {
    return this.executeTyped<TornCityStatsResponse>("stats", options, "TornCityStatsResponse", false);
  }
  async subcrimes(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornSubcrimesBundle> {
    return this.executeTyped<TornSubcrimesBundle>("subcrimes", options, "TornSubcrimesBundle", true);
  }
  async territory(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<TornTerritoryBundle> {
    return this.executeTyped<TornTerritoryBundle>("territory", options, "TornTerritoryBundle", true);
  }
  museum_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("museum", options); }
  merits_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("merits", options); }
  medals_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("medals", options); }
  organisedcrimes_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("organisedcrimes", options); }
  pawnshop_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("pawnshop", options); }
  organizedcrimes_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("organizedcrimes", options); }
  itemstats_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("itemstats", options); }
  items_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("items", options); }
  logcategories_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("logcategories", options); }
  lookup_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  logtypes_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("logtypes", options); }
  stocks_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("stocks", options); }
  stats_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("stats", options); }
  subcrimes_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("subcrimes", options); }
  timestamp_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  territory_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("territory", options); }
  properties_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("properties", options); }
  pokertables_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("pokertables", options); }
  rockpaperscissors_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("rockpaperscissors", options); }
  shoplifting_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("shoplifting", options); }
  searchforcash_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("searchforcash", options); }
  companies_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("companies", options); }
  cityshops_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("cityshops", options); }
  competition_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("competition", options); }
  education_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("education", options); }
  crimes_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("crimes", options); }
  bank_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("bank", options); }
  attacklog_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("attacklog", options); }
  bounties_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("bounties", options); }
  cards_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("cards", options); }
  calendar_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("calendar", options); }
  honors_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("honors", options); }
  hof_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("hof", options); }
  itemammo_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("itemammo", options); }
  itemmods_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("itemmods", options); }
  itemdetails_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("itemdetails", options); }
  eliminationteam_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("eliminationteam", options); }
  elimination_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("elimination", options); }
  factionhof_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("factionhof", options); }
  gyms_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("gyms", options); }
  factiontree_raw(options: OptionsOrId<TornOptions> = new TornOptions()): Promise<RawSelectionBundle> { return this.rawSelection("factiontree", options); }
  museumRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.museum_raw(options); }
  meritsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.merits_raw(options); }
  medalsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.medals_raw(options); }
  organisedcrimesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.organisedcrimes_raw(options); }
  pawnshopRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.pawnshop_raw(options); }
  organizedcrimesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.organizedcrimes_raw(options); }
  itemstatsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.itemstats_raw(options); }
  itemsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.items_raw(options); }
  logcategoriesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.logcategories_raw(options); }
  lookupRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.lookup_raw(options); }
  logtypesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.logtypes_raw(options); }
  stocksRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.stocks_raw(options); }
  statsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.stats_raw(options); }
  subcrimesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.subcrimes_raw(options); }
  timestampRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.timestamp_raw(options); }
  territoryRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.territory_raw(options); }
  propertiesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.properties_raw(options); }
  pokertablesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.pokertables_raw(options); }
  rockpaperscissorsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.rockpaperscissors_raw(options); }
  shopliftingRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.shoplifting_raw(options); }
  searchforcashRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.searchforcash_raw(options); }
  companiesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.companies_raw(options); }
  cityshopsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.cityshops_raw(options); }
  competitionRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.competition_raw(options); }
  educationRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.education_raw(options); }
  crimesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.crimes_raw(options); }
  bankRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.bank_raw(options); }
  attacklogRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.attacklog_raw(options); }
  bountiesRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.bounties_raw(options); }
  cardsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.cards_raw(options); }
  calendarRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.calendar_raw(options); }
  honorsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.honors_raw(options); }
  hofRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.hof_raw(options); }
  itemammoRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.itemammo_raw(options); }
  itemmodsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.itemmods_raw(options); }
  itemdetailsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.itemdetails_raw(options); }
  eliminationteamRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.eliminationteam_raw(options); }
  eliminationRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.elimination_raw(options); }
  factionhofRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.factionhof_raw(options); }
  gymsRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.gyms_raw(options); }
  factiontreeRaw(options: OptionsOrId<TornOptions> = new TornOptions()) { return this.factiontree_raw(options); }
}
