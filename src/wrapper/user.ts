import type { UserHalloweenResponse } from "../generated/models.ts";
import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle } from "./runtime.ts";
import { UserOptions } from "./options.ts";
import type { UserAmmoBundle, UserAttacksBundle, UserAttacksFullBundle, UserBarsBundle, UserBasicBundle, UserBattleStatsBundle, UserBazaarBundle, UserBountiesBundle, UserCalendarBundle, UserCasinoBundle, UserCompetitionBundle, UserCooldownsBundle, UserCrimesBundle, UserCriminalRecordBundle, UserDiscordBundle, UserDisplayBundle, UserEducationBundle, UserEnlistedCarsBundle, UserEquipmentBundle, UserEventsBundle, UserFactionBalanceBundle, UserFactionBundle, UserForumFeedBundle, UserForumFriendsBundle, UserForumPostsBundle, UserForumSubscribedThreadsBundle, UserForumThreadsBundle, UserHofBundle, UserHonorsBundle, UserIconsBundle, UserInventoryBundle, UserItemMarketBundle, UserItemModsBundle, UserJobBundle, UserJobPointsBundle, UserJobRanksBundle, UserListBundle, UserLogBundle, UserLookupBundle, UserMedalsBundle, UserMeritsBundle, UserMessagesBundle, UserMissionsBundle, UserMoneyBundle, UserNewEventsBundle, UserNewMessagesBundle, UserNotificationsBundle, UserOrganizedCrimeBundle, UserPersonalStatsBundle, UserProfileBundle, UserPropertiesBundle, UserPropertyBundle, UserRacesBundle, UserRacingRecordsBundle, UserRefillsBundle, UserReportsBundle, UserRevivesBundle, UserRevivesFullBundle, UserSkillsBundle, UserStocksBundle, UserTimestampBundle, UserTradeBundle, UserTradesBundle, UserTravelBundle, UserWeaponExpBundle, UserWorkStatsBundle } from "../models/manual.ts";
import type { UserGymResponse, UserNetworthResponse, UserOrganizedCrimesResponse, UserPerksResponse, UserSearchResponse, UserVirusResponse } from "../generated/models.ts";
export { UserOptions } from "./options.ts";

export class UserApi extends ResourceApi<UserOptions, "user"> {
  static readonly SUPPORTED_SELECTIONS = ["revivesFull", "search", "virus", "organizedcrimes", "snapshot", "ammo", "attacks", "attacksfull", "bars", "basic", "battlestats", "bazaar", "bounties", "calendar", "casino", "competition", "cooldowns", "crimes", "criminalrecord", "discord", "display", "education", "enlistedcars", "equipment", "events", "faction", "factionbalance", "forumfeed", "forumfriends", "forumposts", "forumsubscribedthreads", "forumthreads", "gym", "hof", "honors", "icons", "inventory", "itemmods", "itemmod", "itemmarket", "job", "jobpoints", "jobranks", "list", "log", "lookup", "medals", "merits", "messages", "missions", "money", "newevents", "networth", "newmessages", "notifications", "organizedcrime", "perks", "personalstats", "profile", "properties", "property", "races", "racingrecords", "refills", "reports", "revives", "revivesfull", "skills", "stocks", "timestamp", "trade", "trades", "travel", "weaponexp", "workstats", "halloween"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "user", UserApi.SUPPORTED_SELECTIONS, () => new UserOptions()); }
  /** Halloween basket data from API v2. Requires a Minimal access key. */
  async halloween(options: UserOptions = new UserOptions()): Promise<UserHalloweenResponse> {
    return this.executeTyped<UserHalloweenResponse>("halloween", options, "UserHalloweenResponse", false);
  }
  halloween_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("halloween", options); }
  halloweenRaw(options: UserOptions = new UserOptions()) { return this.halloween_raw(options); }
  async search(options: UserOptions = new UserOptions()): Promise<UserSearchResponse> {
    return this.executeTyped<UserSearchResponse>("search", options, "UserSearchResponse", false);
  }
  async virus(options: UserOptions = new UserOptions()): Promise<UserVirusResponse> {
    return this.executeTyped<UserVirusResponse>("virus", options, "UserVirusResponse", false);
  }
  async organizedcrimes(options: UserOptions = new UserOptions()): Promise<UserOrganizedCrimesResponse> {
    return this.executeTyped<UserOrganizedCrimesResponse>("organizedcrimes", options, "UserOrganizedCrimesResponse", false);
  }
  async snapshot(options: UserOptions = new UserOptions()): Promise<string> {
    return this.executeText("snapshot", options);
  }
  async itemmod(options: UserOptions = new UserOptions()): Promise<UserItemModsBundle> {
    return this.itemmods(options);
  }
  async profile(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserProfileBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserProfileBundle>("profile", options, "UserProfileBundle", true);
  }
  async basic(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserBasicBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserBasicBundle>("basic", options, "UserBasicBundle", true);
  }
  async discord(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserDiscordBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserDiscordBundle>("discord", options, "UserDiscordBundle", true);
  }
  async casino(options: UserOptions = new UserOptions()): Promise<UserCasinoBundle> {
    return this.executeTyped<UserCasinoBundle>("casino", options, "UserCasinoBundle", true);
  }
  async faction(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserFactionBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserFactionBundle>("faction", options, "UserFactionBundle", true);
  }
  async money(options: UserOptions = new UserOptions()): Promise<UserMoneyBundle> {
    return this.executeTyped<UserMoneyBundle>("money", options, "UserMoneyBundle", true);
  }
  async bars(options: UserOptions = new UserOptions()): Promise<UserBarsBundle> {
    return this.executeTyped<UserBarsBundle>("bars", options, "UserBarsBundle", true);
  }
  async cooldowns(options: UserOptions = new UserOptions()): Promise<UserCooldownsBundle> {
    return this.executeTyped<UserCooldownsBundle>("cooldowns", options, "UserCooldownsBundle", true);
  }
  async ammo(options: UserOptions = new UserOptions()): Promise<UserAmmoBundle> {
    return this.executeTyped<UserAmmoBundle>("ammo", options, "UserAmmoBundle", true);
  }
  async battlestats(options: UserOptions = new UserOptions()): Promise<UserBattleStatsBundle> {
    return this.executeTyped<UserBattleStatsBundle>("battlestats", options, "UserBattleStatsBundle", true);
  }
  async equipment(options: UserOptions = new UserOptions()): Promise<UserEquipmentBundle> {
    return this.executeTyped<UserEquipmentBundle>("equipment", options, "UserEquipmentBundle", true);
  }
  async missions(options: UserOptions = new UserOptions()): Promise<UserMissionsBundle> {
    return this.executeTyped<UserMissionsBundle>("missions", options, "UserMissionsBundle", true);
  }
  async timestamp(options: UserOptions = new UserOptions()): Promise<UserTimestampBundle> {
    return this.executeTyped<UserTimestampBundle>("timestamp", options, "UserTimestampBundle", true);
  }
  async notifications(options: UserOptions = new UserOptions()): Promise<UserNotificationsBundle> {
    return this.executeTyped<UserNotificationsBundle>("notifications", options, "UserNotificationsBundle", true);
  }
  async icons(options: UserOptions = new UserOptions()): Promise<UserIconsBundle> {
    return this.executeTyped<UserIconsBundle>("icons", options, "UserIconsBundle", true);
  }
  async enlistedcars(options: UserOptions = new UserOptions()): Promise<UserEnlistedCarsBundle> {
    return this.executeTyped<UserEnlistedCarsBundle>("enlistedcars", options, "UserEnlistedCarsBundle", true);
  }
  async job(options: UserOptions = new UserOptions()): Promise<UserJobBundle> {
    return this.executeTyped<UserJobBundle>("job", options, "UserJobBundle", true);
  }
  async jobpoints(options: UserOptions = new UserOptions()): Promise<UserJobPointsBundle> {
    return this.executeTyped<UserJobPointsBundle>("jobpoints", options, "UserJobPointsBundle", true);
  }
  async jobranks(options: UserOptions = new UserOptions()): Promise<UserJobRanksBundle> {
    return this.executeTyped<UserJobRanksBundle>("jobranks", options, "UserJobRanksBundle", true);
  }
  async refills(options: UserOptions = new UserOptions()): Promise<UserRefillsBundle> {
    return this.executeTyped<UserRefillsBundle>("refills", options, "UserRefillsBundle", true);
  }
  async skills(options: UserOptions = new UserOptions()): Promise<UserSkillsBundle> {
    return this.executeTyped<UserSkillsBundle>("skills", options, "UserSkillsBundle", true);
  }
  async stocks(options: UserOptions = new UserOptions()): Promise<UserStocksBundle> {
    return this.executeTyped<UserStocksBundle>("stocks", options, "UserStocksBundle", true);
  }
  async calendar(options: UserOptions = new UserOptions()): Promise<UserCalendarBundle> {
    return this.executeTyped<UserCalendarBundle>("calendar", options, "UserCalendarBundle", true);
  }
  async lookup(options: UserOptions = new UserOptions()): Promise<UserLookupBundle> {
    return this.executeTyped<UserLookupBundle>("lookup", options, "UserLookupBundle", true);
  }
  async events(options: UserOptions = new UserOptions()): Promise<UserEventsBundle> {
    return this.executeTyped<UserEventsBundle>("events", options, "UserEventsBundle", true);
  }
  async newevents(options: UserOptions = new UserOptions()): Promise<UserNewEventsBundle> {
    return this.executeTyped<UserNewEventsBundle>("newevents", options, "UserNewEventsBundle", true);
  }
  async messages(options: UserOptions = new UserOptions()): Promise<UserMessagesBundle> {
    return this.executeTyped<UserMessagesBundle>("messages", options, "UserMessagesBundle", true);
  }
  async newmessages(options: UserOptions = new UserOptions()): Promise<UserNewMessagesBundle> {
    return this.executeTyped<UserNewMessagesBundle>("newmessages", options, "UserNewMessagesBundle", true);
  }
  async races(options: UserOptions = new UserOptions()): Promise<UserRacesBundle> {
    return this.executeTyped<UserRacesBundle>("races", options, "UserRacesBundle", true);
  }
  async attacks(options: UserOptions = new UserOptions()): Promise<UserAttacksBundle> {
    return this.executeTyped<UserAttacksBundle>("attacks", options, "UserAttacksBundle", true);
  }
  async attacksfull(options: UserOptions = new UserOptions()): Promise<UserAttacksFullBundle> {
    return this.executeTyped<UserAttacksFullBundle>("attacksfull", options, "UserAttacksFullBundle", true);
  }
  async revives(options: UserOptions = new UserOptions()): Promise<UserRevivesBundle> {
    return this.executeTyped<UserRevivesBundle>("revives", options, "UserRevivesBundle", true);
  }
  async revivesfull(options: UserOptions = new UserOptions()): Promise<UserRevivesFullBundle> {
    return this.executeTyped<UserRevivesFullBundle>("revivesfull", options, "UserRevivesFullBundle", true);
  }
  async hof(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserHofBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserHofBundle>("hof", options, "UserHofBundle", true);
  }
  async bounties(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserBountiesBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserBountiesBundle>("bounties", options, "UserBountiesBundle", true);
  }
  async properties(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserPropertiesBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserPropertiesBundle>("properties", options, "UserPropertiesBundle", true);
  }
  async property(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserPropertyBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserPropertyBundle>("property", options, "UserPropertyBundle", true);
  }
  async forumthreads(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserForumThreadsBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserForumThreadsBundle>("forumthreads", options, "UserForumThreadsBundle", true);
  }
  async forumposts(options: UserOptions | string | number | bigint = new UserOptions()): Promise<UserForumPostsBundle> {
    if (typeof options === "string" || typeof options === "number" || typeof options === "bigint") options = new UserOptions().withId(options);
    return this.executeTyped<UserForumPostsBundle>("forumposts", options, "UserForumPostsBundle", true);
  }
  async forumsubscribedthreads(options: UserOptions = new UserOptions()): Promise<UserForumSubscribedThreadsBundle> {
    return this.executeTyped<UserForumSubscribedThreadsBundle>("forumsubscribedthreads", options, "UserForumSubscribedThreadsBundle", true);
  }
  async forumfriends(options: UserOptions = new UserOptions()): Promise<UserForumFriendsBundle> {
    return this.executeTyped<UserForumFriendsBundle>("forumfriends", options, "UserForumFriendsBundle", true);
  }
  async forumfeed(options: UserOptions = new UserOptions()): Promise<UserForumFeedBundle> {
    return this.executeTyped<UserForumFeedBundle>("forumfeed", options, "UserForumFeedBundle", true);
  }
  async workstats(options: UserOptions = new UserOptions()): Promise<UserWorkStatsBundle> {
    return this.executeTyped<UserWorkStatsBundle>("workstats", options, "UserWorkStatsBundle", true);
  }
  async merits(options: UserOptions = new UserOptions()): Promise<UserMeritsBundle> {
    return this.executeTyped<UserMeritsBundle>("merits", options, "UserMeritsBundle", true);
  }
  async itemmarket(options: UserOptions = new UserOptions()): Promise<UserItemMarketBundle> {
    return this.executeTyped<UserItemMarketBundle>("itemmarket", options, "UserItemMarketBundle", true);
  }
  async itemmods(options: UserOptions = new UserOptions()): Promise<UserItemModsBundle> {
    return this.executeTyped<UserItemModsBundle>("itemmods", options, "UserItemModsBundle", true);
  }
  async organizedcrime(options: UserOptions = new UserOptions()): Promise<UserOrganizedCrimeBundle> {
    return this.executeTyped<UserOrganizedCrimeBundle>("organizedcrime", options, "UserOrganizedCrimeBundle", true);
  }
  async factionbalance(options: UserOptions = new UserOptions()): Promise<UserFactionBalanceBundle> {
    return this.executeTyped<UserFactionBalanceBundle>("factionbalance", options, "UserFactionBalanceBundle", true);
  }
  async education(options: UserOptions = new UserOptions()): Promise<UserEducationBundle> {
    return this.executeTyped<UserEducationBundle>("education", options, "UserEducationBundle", true);
  }
  async competition(options: UserOptions = new UserOptions()): Promise<UserCompetitionBundle> {
    return this.executeTyped<UserCompetitionBundle>("competition", options, "UserCompetitionBundle", true);
  }
  async weaponexp(options: UserOptions = new UserOptions()): Promise<UserWeaponExpBundle> {
    return this.executeTyped<UserWeaponExpBundle>("weaponexp", options, "UserWeaponExpBundle", true);
  }
  async racingrecords(options: UserOptions = new UserOptions()): Promise<UserRacingRecordsBundle> {
    return this.executeTyped<UserRacingRecordsBundle>("racingrecords", options, "UserRacingRecordsBundle", true);
  }
  async honors(options: UserOptions = new UserOptions()): Promise<UserHonorsBundle> {
    return this.executeTyped<UserHonorsBundle>("honors", options, "UserHonorsBundle", true);
  }
  async medals(options: UserOptions = new UserOptions()): Promise<UserMedalsBundle> {
    return this.executeTyped<UserMedalsBundle>("medals", options, "UserMedalsBundle", true);
  }
  async inventory(options: UserOptions = new UserOptions()): Promise<UserInventoryBundle> {
    return this.executeTyped<UserInventoryBundle>("inventory", options, "UserInventoryBundle", true);
  }
  async trades(options: UserOptions = new UserOptions()): Promise<UserTradesBundle> {
    return this.executeTyped<UserTradesBundle>("trades", options, "UserTradesBundle", true);
  }
  async trade(options: UserOptions = new UserOptions()): Promise<UserTradeBundle> {
    return this.executeTyped<UserTradeBundle>("trade", options, "UserTradeBundle", true);
  }
  async travel(options: UserOptions = new UserOptions()): Promise<UserTravelBundle> {
    return this.executeTyped<UserTravelBundle>("travel", options, "UserTravelBundle", true);
  }
  async display(options: UserOptions = new UserOptions()): Promise<UserDisplayBundle> {
    return this.executeTyped<UserDisplayBundle>("display", options, "UserDisplayBundle", true);
  }
  async gym(options: UserOptions = new UserOptions()): Promise<UserGymResponse> {
    return this.executeTyped<UserGymResponse>("gym", options, "UserGymResponse", false);
  }
  async perks(options: UserOptions = new UserOptions()): Promise<UserPerksResponse> {
    return this.executeTyped<UserPerksResponse>("perks", options, "UserPerksResponse", false);
  }
  async criminalrecord(options: UserOptions = new UserOptions()): Promise<UserCriminalRecordBundle> {
    return this.executeTyped<UserCriminalRecordBundle>("criminalrecord", options, "UserCriminalRecordBundle", true);
  }
  async bazaar(options: UserOptions = new UserOptions()): Promise<UserBazaarBundle> {
    return this.executeTyped<UserBazaarBundle>("bazaar", options, "UserBazaarBundle", true);
  }
  async reports(options: UserOptions = new UserOptions()): Promise<UserReportsBundle> {
    return this.executeTyped<UserReportsBundle>("reports", options, "UserReportsBundle", true);
  }
  async crimes(options: UserOptions = new UserOptions()): Promise<UserCrimesBundle> {
    return this.executeTyped<UserCrimesBundle>("crimes", options, "UserCrimesBundle", true);
  }
  async list(options: UserOptions = new UserOptions()): Promise<UserListBundle> {
    return this.executeTyped<UserListBundle>("list", options, "UserListBundle", true);
  }
  async log(options: UserOptions = new UserOptions()): Promise<UserLogBundle> {
    return this.executeTyped<UserLogBundle>("log", options, "UserLogBundle", true);
  }
  async networth(options: UserOptions = new UserOptions()): Promise<UserNetworthResponse> {
    return this.executeTyped<UserNetworthResponse>("networth", options, "UserNetworthResponse", false);
  }
  async personalstats(options: UserOptions = new UserOptions()): Promise<UserPersonalStatsBundle> {
    return this.executeTyped<UserPersonalStatsBundle>("personalstats", options, "UserPersonalStatsBundle", true);
  }
  search_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("search", options); }
  virus_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("virus", options); }
  organizedcrimes_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("organizedcrimes", options); }
  networth_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("networth", options); }
  newevents_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("newevents", options); }
  missions_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("missions", options); }
  money_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("money", options); }
  organizedcrime_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("organizedcrime", options); }
  perks_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("perks", options); }
  newmessages_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("newmessages", options); }
  notifications_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("notifications", options); }
  list_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("list", options); }
  log_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("log", options); }
  jobpoints_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("jobpoints", options); }
  jobranks_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("jobranks", options); }
  merits_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("merits", options); }
  messages_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("messages", options); }
  lookup_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  medals_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("medals", options); }
  personalstats_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("personalstats", options); }
  stocks_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("stocks", options); }
  timestamp_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  trade_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("trade", options); }
  trades_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("trades", options); }
  revivesfull_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("revivesfull", options); }
  skills_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("skills", options); }
  workstats_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("workstats", options); }
  travel_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("travel", options); }
  weaponexp_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("weaponexp", options); }
  property_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("property", options); }
  races_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("races", options); }
  profile_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("profile", options); }
  properties_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("properties", options); }
  reports_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("reports", options); }
  revives_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("revives", options); }
  racingrecords_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("racingrecords", options); }
  refills_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("refills", options); }
  cooldowns_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("cooldowns", options); }
  crimes_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("crimes", options); }
  calendar_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("calendar", options); }
  casino_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("casino", options); }
  competition_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("competition", options); }
  display_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("display", options); }
  education_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("education", options); }
  criminalrecord_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("criminalrecord", options); }
  discord_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("discord", options); }
  attacksfull_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("attacksfull", options); }
  bars_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("bars", options); }
  ammo_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("ammo", options); }
  attacks_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("attacks", options); }
  bazaar_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("bazaar", options); }
  bounties_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("bounties", options); }
  basic_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("basic", options); }
  battlestats_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("battlestats", options); }
  enlistedcars_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("enlistedcars", options); }
  hof_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("hof", options); }
  honors_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("honors", options); }
  forumthreads_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("forumthreads", options); }
  gym_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("gym", options); }
  itemmarket_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("itemmarket", options); }
  itemmods_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("itemmods", options); }
  job_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("job", options); }
  icons_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("icons", options); }
  inventory_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("inventory", options); }
  faction_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("faction", options); }
  factionbalance_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("factionbalance", options); }
  equipment_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("equipment", options); }
  events_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("events", options); }
  forumposts_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("forumposts", options); }
  forumsubscribedthreads_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("forumsubscribedthreads", options); }
  forumfeed_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("forumfeed", options); }
  forumfriends_raw(options: UserOptions = new UserOptions()): Promise<RawSelectionBundle> { return this.rawSelection("forumfriends", options); }
  searchRaw(options: UserOptions = new UserOptions()) { return this.search_raw(options); }
  virusRaw(options: UserOptions = new UserOptions()) { return this.virus_raw(options); }
  organizedcrimesRaw(options: UserOptions = new UserOptions()) { return this.organizedcrimes_raw(options); }
  networthRaw(options: UserOptions = new UserOptions()) { return this.networth_raw(options); }
  neweventsRaw(options: UserOptions = new UserOptions()) { return this.newevents_raw(options); }
  missionsRaw(options: UserOptions = new UserOptions()) { return this.missions_raw(options); }
  moneyRaw(options: UserOptions = new UserOptions()) { return this.money_raw(options); }
  organizedcrimeRaw(options: UserOptions = new UserOptions()) { return this.organizedcrime_raw(options); }
  perksRaw(options: UserOptions = new UserOptions()) { return this.perks_raw(options); }
  newmessagesRaw(options: UserOptions = new UserOptions()) { return this.newmessages_raw(options); }
  notificationsRaw(options: UserOptions = new UserOptions()) { return this.notifications_raw(options); }
  listRaw(options: UserOptions = new UserOptions()) { return this.list_raw(options); }
  logRaw(options: UserOptions = new UserOptions()) { return this.log_raw(options); }
  jobpointsRaw(options: UserOptions = new UserOptions()) { return this.jobpoints_raw(options); }
  jobranksRaw(options: UserOptions = new UserOptions()) { return this.jobranks_raw(options); }
  meritsRaw(options: UserOptions = new UserOptions()) { return this.merits_raw(options); }
  messagesRaw(options: UserOptions = new UserOptions()) { return this.messages_raw(options); }
  lookupRaw(options: UserOptions = new UserOptions()) { return this.lookup_raw(options); }
  medalsRaw(options: UserOptions = new UserOptions()) { return this.medals_raw(options); }
  personalstatsRaw(options: UserOptions = new UserOptions()) { return this.personalstats_raw(options); }
  stocksRaw(options: UserOptions = new UserOptions()) { return this.stocks_raw(options); }
  timestampRaw(options: UserOptions = new UserOptions()) { return this.timestamp_raw(options); }
  tradeRaw(options: UserOptions = new UserOptions()) { return this.trade_raw(options); }
  tradesRaw(options: UserOptions = new UserOptions()) { return this.trades_raw(options); }
  revivesfullRaw(options: UserOptions = new UserOptions()) { return this.revivesfull_raw(options); }
  skillsRaw(options: UserOptions = new UserOptions()) { return this.skills_raw(options); }
  workstatsRaw(options: UserOptions = new UserOptions()) { return this.workstats_raw(options); }
  travelRaw(options: UserOptions = new UserOptions()) { return this.travel_raw(options); }
  weaponexpRaw(options: UserOptions = new UserOptions()) { return this.weaponexp_raw(options); }
  propertyRaw(options: UserOptions = new UserOptions()) { return this.property_raw(options); }
  racesRaw(options: UserOptions = new UserOptions()) { return this.races_raw(options); }
  profileRaw(options: UserOptions = new UserOptions()) { return this.profile_raw(options); }
  propertiesRaw(options: UserOptions = new UserOptions()) { return this.properties_raw(options); }
  reportsRaw(options: UserOptions = new UserOptions()) { return this.reports_raw(options); }
  revivesRaw(options: UserOptions = new UserOptions()) { return this.revives_raw(options); }
  racingrecordsRaw(options: UserOptions = new UserOptions()) { return this.racingrecords_raw(options); }
  refillsRaw(options: UserOptions = new UserOptions()) { return this.refills_raw(options); }
  cooldownsRaw(options: UserOptions = new UserOptions()) { return this.cooldowns_raw(options); }
  crimesRaw(options: UserOptions = new UserOptions()) { return this.crimes_raw(options); }
  calendarRaw(options: UserOptions = new UserOptions()) { return this.calendar_raw(options); }
  casinoRaw(options: UserOptions = new UserOptions()) { return this.casino_raw(options); }
  competitionRaw(options: UserOptions = new UserOptions()) { return this.competition_raw(options); }
  displayRaw(options: UserOptions = new UserOptions()) { return this.display_raw(options); }
  educationRaw(options: UserOptions = new UserOptions()) { return this.education_raw(options); }
  criminalrecordRaw(options: UserOptions = new UserOptions()) { return this.criminalrecord_raw(options); }
  discordRaw(options: UserOptions = new UserOptions()) { return this.discord_raw(options); }
  attacksfullRaw(options: UserOptions = new UserOptions()) { return this.attacksfull_raw(options); }
  barsRaw(options: UserOptions = new UserOptions()) { return this.bars_raw(options); }
  ammoRaw(options: UserOptions = new UserOptions()) { return this.ammo_raw(options); }
  attacksRaw(options: UserOptions = new UserOptions()) { return this.attacks_raw(options); }
  bazaarRaw(options: UserOptions = new UserOptions()) { return this.bazaar_raw(options); }
  bountiesRaw(options: UserOptions = new UserOptions()) { return this.bounties_raw(options); }
  basicRaw(options: UserOptions = new UserOptions()) { return this.basic_raw(options); }
  battlestatsRaw(options: UserOptions = new UserOptions()) { return this.battlestats_raw(options); }
  enlistedcarsRaw(options: UserOptions = new UserOptions()) { return this.enlistedcars_raw(options); }
  hofRaw(options: UserOptions = new UserOptions()) { return this.hof_raw(options); }
  honorsRaw(options: UserOptions = new UserOptions()) { return this.honors_raw(options); }
  forumthreadsRaw(options: UserOptions = new UserOptions()) { return this.forumthreads_raw(options); }
  gymRaw(options: UserOptions = new UserOptions()) { return this.gym_raw(options); }
  itemmarketRaw(options: UserOptions = new UserOptions()) { return this.itemmarket_raw(options); }
  itemmodsRaw(options: UserOptions = new UserOptions()) { return this.itemmods_raw(options); }
  jobRaw(options: UserOptions = new UserOptions()) { return this.job_raw(options); }
  iconsRaw(options: UserOptions = new UserOptions()) { return this.icons_raw(options); }
  inventoryRaw(options: UserOptions = new UserOptions()) { return this.inventory_raw(options); }
  factionRaw(options: UserOptions = new UserOptions()) { return this.faction_raw(options); }
  factionbalanceRaw(options: UserOptions = new UserOptions()) { return this.factionbalance_raw(options); }
  equipmentRaw(options: UserOptions = new UserOptions()) { return this.equipment_raw(options); }
  eventsRaw(options: UserOptions = new UserOptions()) { return this.events_raw(options); }
  forumpostsRaw(options: UserOptions = new UserOptions()) { return this.forumposts_raw(options); }
  forumsubscribedthreadsRaw(options: UserOptions = new UserOptions()) { return this.forumsubscribedthreads_raw(options); }
  forumfeedRaw(options: UserOptions = new UserOptions()) { return this.forumfeed_raw(options); }
  forumfriendsRaw(options: UserOptions = new UserOptions()) { return this.forumfriends_raw(options); }
}
