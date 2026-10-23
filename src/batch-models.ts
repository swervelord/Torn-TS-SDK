/** Generated typed JSON batch coverage from the committed resource facade contracts. */
import type * as Manual from "./models/manual.ts";
import type * as Generated from "./generated/models.ts";

export interface SelectionModelMap {
  user: {
    "ammo": Manual.UserAmmoBundle;
    "attacks": Manual.UserAttacksBundle;
    "attacksfull": Manual.UserAttacksFullBundle;
    "bars": Manual.UserBarsBundle;
    "basic": Manual.UserBasicBundle;
    "battlestats": Manual.UserBattleStatsBundle;
    "bazaar": Manual.UserBazaarBundle;
    "bounties": Manual.UserBountiesBundle;
    "calendar": Manual.UserCalendarBundle;
    "casino": Manual.UserCasinoBundle;
    "competition": Manual.UserCompetitionBundle;
    "cooldowns": Manual.UserCooldownsBundle;
    "crimes": Manual.UserCrimesBundle;
    "criminalrecord": Manual.UserCriminalRecordBundle;
    "discord": Manual.UserDiscordBundle;
    "display": Manual.UserDisplayBundle;
    "education": Manual.UserEducationBundle;
    "enlistedcars": Manual.UserEnlistedCarsBundle;
    "equipment": Manual.UserEquipmentBundle;
    "events": Manual.UserEventsBundle;
    "faction": Manual.UserFactionBundle;
    "factionbalance": Manual.UserFactionBalanceBundle;
    "forumfeed": Manual.UserForumFeedBundle;
    "forumfriends": Manual.UserForumFriendsBundle;
    "forumposts": Manual.UserForumPostsBundle;
    "forumsubscribedthreads": Manual.UserForumSubscribedThreadsBundle;
    "forumthreads": Manual.UserForumThreadsBundle;
    "gym": Generated.UserGymResponse;
    "hof": Manual.UserHofBundle;
    "honors": Manual.UserHonorsBundle;
    "icons": Manual.UserIconsBundle;
    "inventory": Manual.UserInventoryBundle;
    "itemmarket": Manual.UserItemMarketBundle;
    "itemmod": Manual.UserItemModsBundle;
    "itemmods": Manual.UserItemModsBundle;
    "job": Manual.UserJobBundle;
    "jobpoints": Manual.UserJobPointsBundle;
    "jobranks": Manual.UserJobRanksBundle;
    "list": Manual.UserListBundle;
    "log": Manual.UserLogBundle;
    "lookup": Manual.UserLookupBundle;
    "medals": Manual.UserMedalsBundle;
    "merits": Manual.UserMeritsBundle;
    "messages": Manual.UserMessagesBundle;
    "missions": Manual.UserMissionsBundle;
    "money": Manual.UserMoneyBundle;
    "networth": Generated.UserNetworthResponse;
    "newevents": Manual.UserNewEventsBundle;
    "newmessages": Manual.UserNewMessagesBundle;
    "notifications": Manual.UserNotificationsBundle;
    "organizedcrime": Manual.UserOrganizedCrimeBundle;
    "organizedcrimes": Generated.UserOrganizedCrimesResponse;
    "perks": Generated.UserPerksResponse;
    "personalstats": Manual.UserPersonalStatsBundle;
    "profile": Manual.UserProfileBundle;
    "properties": Manual.UserPropertiesBundle;
    "property": Manual.UserPropertyBundle;
    "races": Manual.UserRacesBundle;
    "racingrecords": Manual.UserRacingRecordsBundle;
    "refills": Manual.UserRefillsBundle;
    "reports": Manual.UserReportsBundle;
    "revives": Manual.UserRevivesBundle;
    "revivesfull": Manual.UserRevivesFullBundle;
    "search": Generated.UserSearchResponse;
    "skills": Manual.UserSkillsBundle;
    "stocks": Manual.UserStocksBundle;
    "timestamp": Manual.UserTimestampBundle;
    "trade": Manual.UserTradeBundle;
    "trades": Manual.UserTradesBundle;
    "travel": Manual.UserTravelBundle;
    "virus": Generated.UserVirusResponse;
    "weaponexp": Manual.UserWeaponExpBundle;
    "workstats": Manual.UserWorkStatsBundle;
    "revivesFull": Manual.UserRevivesFullBundle;
  };
  company: {
    "applications": Manual.CompanyApplicationsBundle;
    "companies": Manual.CompanyCompaniesBundle;
    "employees": Manual.CompanyEmployeesBundle;
    "lookup": Manual.CompanyLookupBundle;
    "news": Manual.CompanyNewsBundle;
    "profile": Manual.CompanyProfileBundle;
    "search": Manual.CompanySearchBundle;
    "stock": Manual.CompanyStockBundle;
    "timestamp": Manual.CompanyTimestampBundle;
  };
  faction: {
    "applications": Manual.FactionApplicationsBundle;
    "armor": Manual.FactionArmorBundle;
    "attacks": Manual.FactionAttacksBundle;
    "attacksfull": Manual.FactionAttacksFullBundle;
    "balance": Manual.FactionBalanceBundle;
    "basic": Manual.FactionBasicBundle;
    "boosters": Manual.FactionBoostersBundle;
    "caches": Manual.FactionCachesBundle;
    "cesium": Manual.FactionCesiumBundle;
    "chain": Manual.FactionChainBundle;
    "chainreport": Manual.FactionChainReportBundle;
    "chains": Manual.FactionChainsBundle;
    "contributors": Manual.FactionContributorsBundle;
    "crime": Manual.FactionCrimeBundle;
    "crimeexp": Manual.FactionCrimeExpBundle;
    "crimes": Manual.FactionCrimesBundle;
    "dirtbombs": Generated.FactionWarfareDirtyBombsResponse;
    "dirtybombs": Generated.FactionWarfareDirtyBombsResponse;
    "drugs": Manual.FactionDrugsBundle;
    "hof": Manual.FactionHofBundle;
    "inventory": Generated.FactionInventoryResponse;
    "lookup": Manual.FactionLookupBundle;
    "medical": Manual.FactionMedicalBundle;
    "members": Manual.FactionMembersBundle;
    "news": Manual.FactionNewsBundle;
    "positions": Manual.FactionPositionsBundle;
    "rackets": Manual.FactionRacketsBundle;
    "raidreport": Manual.FactionRaidReportBundle;
    "raids": Manual.FactionRaidsBundle;
    "rankedwarreport": Manual.FactionRankedWarReportBundle;
    "rankedwars": Manual.FactionRankedWarsBundle;
    "reports": Manual.FactionReportsBundle;
    "revives": Manual.FactionRevivesBundle;
    "revivesfull": Manual.FactionRevivesFullBundle;
    "search": Manual.FactionSearchBundle;
    "stats": Manual.FactionStatsBundle;
    "temporary": Manual.FactionTemporaryBundle;
    "territory": Manual.FactionTerritoryBundle;
    "territoryownership": Manual.FactionTerritoryOwnershipBundle;
    "territorywarreport": Manual.FactionTerritoryWarReportBundle;
    "territorywars": Manual.FactionTerritoryWarsBundle;
    "timestamp": Manual.FactionTimestampBundle;
    "upgrades": Manual.FactionUpgradesBundle;
    "utilities": Manual.FactionUtilitiesBundle;
    "warfare": Manual.FactionWarfareBundle;
    "warfarechains": Generated.FactionWarfareChainsResponse;
    "warfareraids": Generated.FactionWarfareRaidsResponse;
    "warfareranked": Generated.FactionWarfareRankedResponse;
    "warfareterritory": Generated.FactionWarfareTerritoryWarsResponse;
    "wars": Manual.FactionWarsBundle;
    "weapons": Manual.FactionWeaponsBundle;
    "revivesFull": Manual.FactionRevivesFullBundle;
  };
  forum: {
    "categories": Manual.ForumCategoriesBundle;
    "lookup": Manual.ForumLookupBundle;
    "posts": Manual.ForumPostsBundle;
    "thread": Manual.ForumThreadBundle;
    "threads": Manual.ForumThreadsBundle;
    "timestamp": Manual.ForumTimestampBundle;
  };
  key: {
    "info": Manual.KeyInfoBundle;
    "log": Manual.KeyLogBundle;
  };
  market: {
    "auctionhouse": Manual.MarketAuctionHouseBundle;
    "auctionhouselisting": Manual.MarketAuctionHouseListingBundle;
    "bazaar": Manual.MarketBazaarBundle;
    "itemmarket": Manual.MarketItemMarketBundle;
    "lookup": Manual.MarketLookupBundle;
    "pointsmarket": Generated.PointsMarketResponse;
    "properties": Manual.MarketPropertiesBundle;
    "rentals": Manual.MarketRentalsBundle;
    "timestamp": Manual.MarketTimestampBundle;
  };
  property: {
    "lookup": Manual.PropertyLookupBundle;
    "property": Manual.PropertyBundle;
    "timestamp": Manual.PropertyTimestampBundle;
  };
  racing: {
    "cars": Manual.RacingCarsBundle;
    "carupgrades": Manual.RacingCarUpgradesBundle;
    "lookup": Manual.RacingLookupBundle;
    "race": Manual.RacingRaceBundle;
    "races": Manual.RacingRacesBundle;
    "records": Manual.RacingRecordsBundle;
    "timestamp": Manual.RacingTimestampBundle;
    "tracks": Manual.RacingTracksBundle;
  };
  torn: {
    "attacklog": Manual.TornAttackLogBundle;
    "bank": Generated.TornBankResponse;
    "bounties": Manual.TornBountiesBundle;
    "calendar": Manual.TornCalendarBundle;
    "cards": Generated.TornCardsResponse;
    "cityshops": Generated.TornCityShopsResponse;
    "companies": Generated.TornCompaniesResponse;
    "competition": Manual.TornCompetitionBundle;
    "crimes": Manual.TornCrimesBundle;
    "education": Manual.TornEducationBundle;
    "elimination": Manual.TornEliminationBundle;
    "eliminationteam": Manual.TornEliminationTeamBundle;
    "factionhof": Manual.TornFactionHofBundle;
    "factiontree": Manual.TornFactionTreeBundle;
    "gyms": Generated.TornGymsResponse;
    "hof": Manual.TornHofBundle;
    "honors": Manual.TornHonorsBundle;
    "itemammo": Manual.TornItemAmmoBundle;
    "itemdetails": Generated.TornItemDetailsResponse;
    "itemmods": Manual.TornItemModsBundle;
    "items": Manual.TornItemsBundle;
    "itemstats": Generated.TornItemStatsResponse;
    "logcategories": Manual.TornLogCategoriesBundle;
    "logtypes": Manual.TornLogTypesBundle;
    "lookup": Manual.TornLookupBundle;
    "medals": Manual.TornMedalsBundle;
    "merits": Manual.TornMeritsBundle;
    "museum": Generated.TornMuseumResponse;
    "organisedcrimes": Manual.TornOrganisedCrimesBundle;
    "organizedcrimes": Manual.TornOrganizedCrimesBundle;
    "pawnshop": Manual.TornPawnshopBundle;
    "pokertables": Generated.TornPokerTablesResponse;
    "properties": Manual.TornPropertiesBundle;
    "rockpaperscissors": Generated.TornRockPaperScissorsResponse;
    "searchforcash": Generated.TornSearchForCashResponse;
    "shoplifting": Generated.TornShopliftingResponse;
    "stats": Generated.TornCityStatsResponse;
    "stocks": Manual.TornStocksBundle | Manual.TornStockBundle;
    "subcrimes": Manual.TornSubcrimesBundle;
    "territory": Manual.TornTerritoryBundle;
    "timestamp": Manual.TornTimestampBundle;
  };
}

export const selectionModelDefinitions = {
  "user": {
    "ammo": {
      "model": "UserAmmoBundle",
      "manual": true,
      "inputRoots": [
        "ammo"
      ]
    },
    "attacks": {
      "model": "UserAttacksBundle",
      "manual": true,
      "inputRoots": [
        "attacks",
        "_metadata"
      ]
    },
    "attacksfull": {
      "model": "UserAttacksFullBundle",
      "manual": true,
      "inputRoots": [
        "attacks",
        "_metadata"
      ]
    },
    "bars": {
      "model": "UserBarsBundle",
      "manual": true,
      "inputRoots": [
        "bars"
      ]
    },
    "basic": {
      "model": "UserBasicBundle",
      "manual": true,
      "inputRoots": [
        "profile"
      ]
    },
    "battlestats": {
      "model": "UserBattleStatsBundle",
      "manual": true,
      "inputRoots": [
        "battlestats"
      ]
    },
    "bazaar": {
      "model": "UserBazaarBundle",
      "manual": true,
      "inputRoots": [
        "bazaar_is_open",
        "bazaar"
      ]
    },
    "bounties": {
      "model": "UserBountiesBundle",
      "manual": true,
      "inputRoots": [
        "bounties",
        "bounties_timestamp",
        "bounties_delay"
      ]
    },
    "calendar": {
      "model": "UserCalendarBundle",
      "manual": true,
      "inputRoots": [
        "calendar"
      ]
    },
    "casino": {
      "model": "UserCasinoBundle",
      "manual": true,
      "inputRoots": [
        "casino"
      ]
    },
    "competition": {
      "model": "UserCompetitionBundle",
      "manual": true,
      "inputRoots": [
        "competition"
      ]
    },
    "cooldowns": {
      "model": "UserCooldownsBundle",
      "manual": true,
      "inputRoots": [
        "cooldowns"
      ]
    },
    "crimes": {
      "model": "UserCrimesBundle",
      "manual": true,
      "inputRoots": [
        "crimes"
      ]
    },
    "criminalrecord": {
      "model": "UserCriminalRecordBundle",
      "manual": true,
      "inputRoots": [
        "criminalrecord"
      ]
    },
    "discord": {
      "model": "UserDiscordBundle",
      "manual": true,
      "inputRoots": [
        "discord"
      ]
    },
    "display": {
      "model": "UserDisplayBundle",
      "manual": true,
      "inputRoots": [
        "display"
      ]
    },
    "education": {
      "model": "UserEducationBundle",
      "manual": true,
      "inputRoots": [
        "education"
      ]
    },
    "enlistedcars": {
      "model": "UserEnlistedCarsBundle",
      "manual": true,
      "inputRoots": [
        "enlistedcars"
      ]
    },
    "equipment": {
      "model": "UserEquipmentBundle",
      "manual": true,
      "inputRoots": [
        "equipment",
        "clothing"
      ]
    },
    "events": {
      "model": "UserEventsBundle",
      "manual": true,
      "inputRoots": [
        "events",
        "_metadata"
      ]
    },
    "faction": {
      "model": "UserFactionBundle",
      "manual": true,
      "inputRoots": [
        "faction"
      ]
    },
    "factionbalance": {
      "model": "UserFactionBalanceBundle",
      "manual": true,
      "inputRoots": [
        "factionBalance"
      ]
    },
    "forumfeed": {
      "model": "UserForumFeedBundle",
      "manual": true,
      "inputRoots": [
        "forumFeed"
      ]
    },
    "forumfriends": {
      "model": "UserForumFriendsBundle",
      "manual": true,
      "inputRoots": [
        "forumFriends"
      ]
    },
    "forumposts": {
      "model": "UserForumPostsBundle",
      "manual": true,
      "inputRoots": [
        "forumPosts",
        "_metadata"
      ]
    },
    "forumsubscribedthreads": {
      "model": "UserForumSubscribedThreadsBundle",
      "manual": true,
      "inputRoots": [
        "forumSubscribedThreads"
      ]
    },
    "forumthreads": {
      "model": "UserForumThreadsBundle",
      "manual": true,
      "inputRoots": [
        "forumThreads",
        "_metadata"
      ]
    },
    "gym": {
      "model": "UserGymResponse",
      "manual": false,
      "inputRoots": [
        "gym"
      ]
    },
    "hof": {
      "model": "UserHofBundle",
      "manual": true,
      "inputRoots": [
        "hof"
      ]
    },
    "honors": {
      "model": "UserHonorsBundle",
      "manual": true,
      "inputRoots": [
        "honors"
      ]
    },
    "icons": {
      "model": "UserIconsBundle",
      "manual": true,
      "inputRoots": [
        "icons"
      ]
    },
    "inventory": {
      "model": "UserInventoryBundle",
      "manual": true,
      "inputRoots": [
        "inventory",
        "_metadata"
      ]
    },
    "itemmarket": {
      "model": "UserItemMarketBundle",
      "manual": true,
      "inputRoots": [
        "itemmarket",
        "_metadata"
      ]
    },
    "itemmod": {
      "model": "UserItemModsBundle",
      "manual": true,
      "inputRoots": [
        "itemmods"
      ]
    },
    "itemmods": {
      "model": "UserItemModsBundle",
      "manual": true,
      "inputRoots": [
        "itemmods"
      ]
    },
    "job": {
      "model": "UserJobBundle",
      "manual": true,
      "inputRoots": [
        "job"
      ]
    },
    "jobpoints": {
      "model": "UserJobPointsBundle",
      "manual": true,
      "inputRoots": [
        "jobpoints"
      ]
    },
    "jobranks": {
      "model": "UserJobRanksBundle",
      "manual": true,
      "inputRoots": [
        "jobranks"
      ]
    },
    "list": {
      "model": "UserListBundle",
      "manual": true,
      "inputRoots": [
        "list",
        "_metadata"
      ]
    },
    "log": {
      "model": "UserLogBundle",
      "manual": true,
      "inputRoots": [
        "log",
        "_metadata"
      ]
    },
    "lookup": {
      "model": "UserLookupBundle",
      "manual": true,
      "inputRoots": [
        "selections"
      ]
    },
    "medals": {
      "model": "UserMedalsBundle",
      "manual": true,
      "inputRoots": [
        "medals"
      ]
    },
    "merits": {
      "model": "UserMeritsBundle",
      "manual": true,
      "inputRoots": [
        "merits"
      ]
    },
    "messages": {
      "model": "UserMessagesBundle",
      "manual": true,
      "inputRoots": [
        "messages",
        "_metadata"
      ]
    },
    "missions": {
      "model": "UserMissionsBundle",
      "manual": true,
      "inputRoots": [
        "missions"
      ]
    },
    "money": {
      "model": "UserMoneyBundle",
      "manual": true,
      "inputRoots": [
        "money"
      ]
    },
    "networth": {
      "model": "UserNetworthResponse",
      "manual": false,
      "inputRoots": [
        "networth"
      ]
    },
    "newevents": {
      "model": "UserNewEventsBundle",
      "manual": true,
      "inputRoots": [
        "events"
      ]
    },
    "newmessages": {
      "model": "UserNewMessagesBundle",
      "manual": true,
      "inputRoots": [
        "messages"
      ]
    },
    "notifications": {
      "model": "UserNotificationsBundle",
      "manual": true,
      "inputRoots": [
        "notifications"
      ]
    },
    "organizedcrime": {
      "model": "UserOrganizedCrimeBundle",
      "manual": true,
      "inputRoots": [
        "organizedCrime"
      ]
    },
    "organizedcrimes": {
      "model": "UserOrganizedCrimesResponse",
      "manual": false,
      "inputRoots": [
        "organizedcrimes"
      ]
    },
    "perks": {
      "model": "UserPerksResponse",
      "manual": false,
      "inputRoots": [
        "perks"
      ]
    },
    "personalstats": {
      "model": "UserPersonalStatsBundle",
      "manual": true,
      "inputRoots": [
        "personalstats"
      ]
    },
    "profile": {
      "model": "UserProfileBundle",
      "manual": true,
      "inputRoots": [
        "profile"
      ]
    },
    "properties": {
      "model": "UserPropertiesBundle",
      "manual": true,
      "inputRoots": [
        "properties",
        "_metadata"
      ]
    },
    "property": {
      "model": "UserPropertyBundle",
      "manual": true,
      "inputRoots": [
        "property"
      ]
    },
    "races": {
      "model": "UserRacesBundle",
      "manual": true,
      "inputRoots": [
        "races",
        "_metadata"
      ]
    },
    "racingrecords": {
      "model": "UserRacingRecordsBundle",
      "manual": true,
      "inputRoots": [
        "racingrecords"
      ]
    },
    "refills": {
      "model": "UserRefillsBundle",
      "manual": true,
      "inputRoots": [
        "refills"
      ]
    },
    "reports": {
      "model": "UserReportsBundle",
      "manual": true,
      "inputRoots": [
        "reports",
        "_metadata"
      ]
    },
    "revives": {
      "model": "UserRevivesBundle",
      "manual": true,
      "inputRoots": [
        "revives",
        "_metadata"
      ]
    },
    "revivesfull": {
      "model": "UserRevivesFullBundle",
      "manual": true,
      "inputRoots": [
        "revives",
        "_metadata"
      ]
    },
    "search": {
      "model": "UserSearchResponse",
      "manual": false,
      "inputRoots": [
        "search",
        "_metadata"
      ]
    },
    "skills": {
      "model": "UserSkillsBundle",
      "manual": true,
      "inputRoots": [
        "skills"
      ]
    },
    "stocks": {
      "model": "UserStocksBundle",
      "manual": true,
      "inputRoots": [
        "stocks"
      ]
    },
    "timestamp": {
      "model": "UserTimestampBundle",
      "manual": true,
      "inputRoots": [
        "timestamp"
      ]
    },
    "trade": {
      "model": "UserTradeBundle",
      "manual": true,
      "inputRoots": [
        "trade"
      ]
    },
    "trades": {
      "model": "UserTradesBundle",
      "manual": true,
      "inputRoots": [
        "trades",
        "_metadata"
      ]
    },
    "travel": {
      "model": "UserTravelBundle",
      "manual": true,
      "inputRoots": [
        "travel"
      ]
    },
    "virus": {
      "model": "UserVirusResponse",
      "manual": false,
      "inputRoots": [
        "virus"
      ]
    },
    "weaponexp": {
      "model": "UserWeaponExpBundle",
      "manual": true,
      "inputRoots": [
        "weaponexp"
      ]
    },
    "workstats": {
      "model": "UserWorkStatsBundle",
      "manual": true,
      "inputRoots": [
        "workstats"
      ]
    },
    "revivesFull": {
      "model": "UserRevivesFullBundle",
      "manual": true,
      "inputRoots": [
        "revives",
        "_metadata"
      ]
    }
  },
  "company": {
    "applications": {
      "model": "CompanyApplicationsBundle",
      "manual": true,
      "inputRoots": [
        "applications"
      ]
    },
    "companies": {
      "model": "CompanyCompaniesBundle",
      "manual": true,
      "inputRoots": [
        "company",
        "companies",
        "company_timestamp",
        "company_delay",
        "companies_timestamp",
        "companies_delay",
        "_metadata"
      ]
    },
    "employees": {
      "model": "CompanyEmployeesBundle",
      "manual": true,
      "inputRoots": [
        "company_employees",
        "employees"
      ]
    },
    "lookup": {
      "model": "CompanyLookupBundle",
      "manual": true,
      "inputRoots": [
        "selections"
      ]
    },
    "news": {
      "model": "CompanyNewsBundle",
      "manual": true,
      "inputRoots": [
        "news"
      ]
    },
    "profile": {
      "model": "CompanyProfileBundle",
      "manual": true,
      "inputRoots": [
        "company",
        "profile"
      ]
    },
    "search": {
      "model": "CompanySearchBundle",
      "manual": true,
      "inputRoots": [
        "search"
      ]
    },
    "stock": {
      "model": "CompanyStockBundle",
      "manual": true,
      "inputRoots": [
        "company_stock",
        "stock"
      ]
    },
    "timestamp": {
      "model": "CompanyTimestampBundle",
      "manual": true,
      "inputRoots": [
        "timestamp"
      ]
    }
  },
  "faction": {
    "applications": {
      "model": "FactionApplicationsBundle",
      "manual": true,
      "inputRoots": [
        "applications"
      ]
    },
    "armor": {
      "model": "FactionArmorBundle",
      "manual": true,
      "inputRoots": [
        "armor"
      ]
    },
    "attacks": {
      "model": "FactionAttacksBundle",
      "manual": true,
      "inputRoots": [
        "attacks",
        "_metadata"
      ]
    },
    "attacksfull": {
      "model": "FactionAttacksFullBundle",
      "manual": true,
      "inputRoots": [
        "attacks",
        "_metadata"
      ]
    },
    "balance": {
      "model": "FactionBalanceBundle",
      "manual": true,
      "inputRoots": [
        "balance"
      ]
    },
    "basic": {
      "model": "FactionBasicBundle",
      "manual": true,
      "inputRoots": [
        "basic"
      ]
    },
    "boosters": {
      "model": "FactionBoostersBundle",
      "manual": true,
      "inputRoots": [
        "boosters"
      ]
    },
    "caches": {
      "model": "FactionCachesBundle",
      "manual": true,
      "inputRoots": [
        "caches"
      ]
    },
    "cesium": {
      "model": "FactionCesiumBundle",
      "manual": true,
      "inputRoots": [
        "cesium"
      ]
    },
    "chain": {
      "model": "FactionChainBundle",
      "manual": true,
      "inputRoots": [
        "chain"
      ]
    },
    "chainreport": {
      "model": "FactionChainReportBundle",
      "manual": true,
      "inputRoots": [
        "chainreport"
      ]
    },
    "chains": {
      "model": "FactionChainsBundle",
      "manual": true,
      "inputRoots": [
        "chains",
        "_metadata"
      ]
    },
    "contributors": {
      "model": "FactionContributorsBundle",
      "manual": true,
      "inputRoots": [
        "contributors"
      ]
    },
    "crime": {
      "model": "FactionCrimeBundle",
      "manual": true,
      "inputRoots": [
        "crime"
      ]
    },
    "crimeexp": {
      "model": "FactionCrimeExpBundle",
      "manual": true,
      "inputRoots": [
        "crimeexp"
      ]
    },
    "crimes": {
      "model": "FactionCrimesBundle",
      "manual": true,
      "inputRoots": [
        "crimes",
        "_metadata"
      ]
    },
    "dirtbombs": {
      "model": "FactionWarfareDirtyBombsResponse",
      "manual": false,
      "inputRoots": [
        "dirtybombs"
      ]
    },
    "dirtybombs": {
      "model": "FactionWarfareDirtyBombsResponse",
      "manual": false,
      "inputRoots": [
        "dirtybombs"
      ]
    },
    "drugs": {
      "model": "FactionDrugsBundle",
      "manual": true,
      "inputRoots": [
        "drugs"
      ]
    },
    "hof": {
      "model": "FactionHofBundle",
      "manual": true,
      "inputRoots": [
        "hof"
      ]
    },
    "inventory": {
      "model": "FactionInventoryResponse",
      "manual": false,
      "inputRoots": [
        "inventory_timestamp",
        "inventory",
        "_metadata"
      ]
    },
    "lookup": {
      "model": "FactionLookupBundle",
      "manual": true,
      "inputRoots": [
        "selections"
      ]
    },
    "medical": {
      "model": "FactionMedicalBundle",
      "manual": true,
      "inputRoots": [
        "medical"
      ]
    },
    "members": {
      "model": "FactionMembersBundle",
      "manual": true,
      "inputRoots": [
        "members"
      ]
    },
    "news": {
      "model": "FactionNewsBundle",
      "manual": true,
      "inputRoots": [
        "news",
        "_metadata"
      ]
    },
    "positions": {
      "model": "FactionPositionsBundle",
      "manual": true,
      "inputRoots": [
        "positions"
      ]
    },
    "rackets": {
      "model": "FactionRacketsBundle",
      "manual": true,
      "inputRoots": [
        "rackets"
      ]
    },
    "raidreport": {
      "model": "FactionRaidReportBundle",
      "manual": true,
      "inputRoots": [
        "raidreport"
      ]
    },
    "raids": {
      "model": "FactionRaidsBundle",
      "manual": true,
      "inputRoots": [
        "raids",
        "_metadata"
      ]
    },
    "rankedwarreport": {
      "model": "FactionRankedWarReportBundle",
      "manual": true,
      "inputRoots": [
        "rankedwarreport"
      ]
    },
    "rankedwars": {
      "model": "FactionRankedWarsBundle",
      "manual": true,
      "inputRoots": [
        "rankedwars",
        "_metadata"
      ]
    },
    "reports": {
      "model": "FactionReportsBundle",
      "manual": true,
      "inputRoots": [
        "reports",
        "_metadata"
      ]
    },
    "revives": {
      "model": "FactionRevivesBundle",
      "manual": true,
      "inputRoots": [
        "revives",
        "_metadata"
      ]
    },
    "revivesfull": {
      "model": "FactionRevivesFullBundle",
      "manual": true,
      "inputRoots": [
        "revives",
        "_metadata"
      ]
    },
    "search": {
      "model": "FactionSearchBundle",
      "manual": true,
      "inputRoots": [
        "search",
        "_metadata"
      ]
    },
    "stats": {
      "model": "FactionStatsBundle",
      "manual": true,
      "inputRoots": [
        "stats"
      ]
    },
    "temporary": {
      "model": "FactionTemporaryBundle",
      "manual": true,
      "inputRoots": [
        "temporary"
      ]
    },
    "territory": {
      "model": "FactionTerritoryBundle",
      "manual": true,
      "inputRoots": [
        "territory"
      ]
    },
    "territoryownership": {
      "model": "FactionTerritoryOwnershipBundle",
      "manual": true,
      "inputRoots": [
        "territoryOwnership"
      ]
    },
    "territorywarreport": {
      "model": "FactionTerritoryWarReportBundle",
      "manual": true,
      "inputRoots": [
        "territorywarreport"
      ]
    },
    "territorywars": {
      "model": "FactionTerritoryWarsBundle",
      "manual": true,
      "inputRoots": [
        "territorywars",
        "_metadata"
      ]
    },
    "timestamp": {
      "model": "FactionTimestampBundle",
      "manual": true,
      "inputRoots": [
        "timestamp"
      ]
    },
    "upgrades": {
      "model": "FactionUpgradesBundle",
      "manual": true,
      "inputRoots": [
        "state",
        "upgrades"
      ]
    },
    "utilities": {
      "model": "FactionUtilitiesBundle",
      "manual": true,
      "inputRoots": [
        "utilities"
      ]
    },
    "warfare": {
      "model": "FactionWarfareBundle",
      "manual": true,
      "inputRoots": [
        "warfare",
        "_metadata"
      ]
    },
    "warfarechains": {
      "model": "FactionWarfareChainsResponse",
      "manual": false,
      "inputRoots": [
        "warfarechains",
        "_metadata"
      ]
    },
    "warfareraids": {
      "model": "FactionWarfareRaidsResponse",
      "manual": false,
      "inputRoots": [
        "warfareraids",
        "_metadata"
      ]
    },
    "warfareranked": {
      "model": "FactionWarfareRankedResponse",
      "manual": false,
      "inputRoots": [
        "warfareranked",
        "_metadata"
      ]
    },
    "warfareterritory": {
      "model": "FactionWarfareTerritoryWarsResponse",
      "manual": false,
      "inputRoots": [
        "warfareterritory",
        "_metadata"
      ]
    },
    "wars": {
      "model": "FactionWarsBundle",
      "manual": true,
      "inputRoots": [
        "wars",
        "pacts"
      ]
    },
    "weapons": {
      "model": "FactionWeaponsBundle",
      "manual": true,
      "inputRoots": [
        "weapons"
      ]
    },
    "revivesFull": {
      "model": "FactionRevivesFullBundle",
      "manual": true,
      "inputRoots": [
        "revives",
        "_metadata"
      ]
    }
  },
  "forum": {
    "categories": {
      "model": "ForumCategoriesBundle",
      "manual": true,
      "inputRoots": [
        "categories"
      ]
    },
    "lookup": {
      "model": "ForumLookupBundle",
      "manual": true,
      "inputRoots": [
        "selections"
      ]
    },
    "posts": {
      "model": "ForumPostsBundle",
      "manual": true,
      "inputRoots": [
        "posts",
        "_metadata"
      ]
    },
    "thread": {
      "model": "ForumThreadBundle",
      "manual": true,
      "inputRoots": [
        "thread"
      ]
    },
    "threads": {
      "model": "ForumThreadsBundle",
      "manual": true,
      "inputRoots": [
        "threads",
        "_metadata"
      ]
    },
    "timestamp": {
      "model": "ForumTimestampBundle",
      "manual": true,
      "inputRoots": [
        "timestamp"
      ]
    }
  },
  "key": {
    "info": {
      "model": "KeyInfoBundle",
      "manual": true,
      "inputRoots": [
        "info"
      ]
    },
    "log": {
      "model": "KeyLogBundle",
      "manual": true,
      "inputRoots": [
        "log"
      ]
    }
  },
  "market": {
    "auctionhouse": {
      "model": "MarketAuctionHouseBundle",
      "manual": true,
      "inputRoots": [
        "auctionhouse",
        "_metadata"
      ]
    },
    "auctionhouselisting": {
      "model": "MarketAuctionHouseListingBundle",
      "manual": true,
      "inputRoots": [
        "auctionhouselisting"
      ]
    },
    "bazaar": {
      "model": "MarketBazaarBundle",
      "manual": true,
      "inputRoots": [
        "bazaar"
      ]
    },
    "itemmarket": {
      "model": "MarketItemMarketBundle",
      "manual": true,
      "inputRoots": [
        "itemmarket",
        "_metadata"
      ]
    },
    "lookup": {
      "model": "MarketLookupBundle",
      "manual": true,
      "inputRoots": [
        "selections"
      ]
    },
    "pointsmarket": {
      "model": "PointsMarketResponse",
      "manual": false,
      "inputRoots": [
        "pointsmarket"
      ]
    },
    "properties": {
      "model": "MarketPropertiesBundle",
      "manual": true,
      "inputRoots": [
        "properties",
        "properties_timestamp",
        "properties_delay",
        "_metadata"
      ]
    },
    "rentals": {
      "model": "MarketRentalsBundle",
      "manual": true,
      "inputRoots": [
        "rentals",
        "rentals_timestamp",
        "rentals_delay",
        "_metadata"
      ]
    },
    "timestamp": {
      "model": "MarketTimestampBundle",
      "manual": true,
      "inputRoots": [
        "timestamp"
      ]
    }
  },
  "property": {
    "lookup": {
      "model": "PropertyLookupBundle",
      "manual": true,
      "inputRoots": [
        "selections"
      ]
    },
    "property": {
      "model": "PropertyBundle",
      "manual": true,
      "inputRoots": [
        "property"
      ]
    },
    "timestamp": {
      "model": "PropertyTimestampBundle",
      "manual": true,
      "inputRoots": [
        "timestamp"
      ]
    }
  },
  "racing": {
    "cars": {
      "model": "RacingCarsBundle",
      "manual": true,
      "inputRoots": [
        "cars"
      ]
    },
    "carupgrades": {
      "model": "RacingCarUpgradesBundle",
      "manual": true,
      "inputRoots": [
        "carupgrades"
      ]
    },
    "lookup": {
      "model": "RacingLookupBundle",
      "manual": true,
      "inputRoots": [
        "selections"
      ]
    },
    "race": {
      "model": "RacingRaceBundle",
      "manual": true,
      "inputRoots": [
        "race"
      ]
    },
    "races": {
      "model": "RacingRacesBundle",
      "manual": true,
      "inputRoots": [
        "races",
        "_metadata"
      ]
    },
    "records": {
      "model": "RacingRecordsBundle",
      "manual": true,
      "inputRoots": [
        "records"
      ]
    },
    "timestamp": {
      "model": "RacingTimestampBundle",
      "manual": true,
      "inputRoots": [
        "timestamp"
      ]
    },
    "tracks": {
      "model": "RacingTracksBundle",
      "manual": true,
      "inputRoots": [
        "tracks"
      ]
    }
  },
  "torn": {
    "attacklog": {
      "model": "TornAttackLogBundle",
      "manual": true,
      "inputRoots": [
        "attacklog",
        "_metadata"
      ]
    },
    "bank": {
      "model": "TornBankResponse",
      "manual": false,
      "inputRoots": [
        "bank"
      ]
    },
    "bounties": {
      "model": "TornBountiesBundle",
      "manual": true,
      "inputRoots": [
        "bounties",
        "bounties_timestamp",
        "bounties_delay",
        "_metadata"
      ]
    },
    "calendar": {
      "model": "TornCalendarBundle",
      "manual": true,
      "inputRoots": [
        "calendar"
      ]
    },
    "cards": {
      "model": "TornCardsResponse",
      "manual": false,
      "inputRoots": [
        "cards"
      ]
    },
    "cityshops": {
      "model": "TornCityShopsResponse",
      "manual": false,
      "inputRoots": [
        "cityshops"
      ]
    },
    "companies": {
      "model": "TornCompaniesResponse",
      "manual": false,
      "inputRoots": [
        "companies"
      ]
    },
    "competition": {
      "model": "TornCompetitionBundle",
      "manual": true,
      "inputRoots": [
        "competition"
      ]
    },
    "crimes": {
      "model": "TornCrimesBundle",
      "manual": true,
      "inputRoots": [
        "crimes"
      ]
    },
    "education": {
      "model": "TornEducationBundle",
      "manual": true,
      "inputRoots": [
        "education"
      ]
    },
    "elimination": {
      "model": "TornEliminationBundle",
      "manual": true,
      "inputRoots": [
        "elimination"
      ]
    },
    "eliminationteam": {
      "model": "TornEliminationTeamBundle",
      "manual": true,
      "inputRoots": [
        "eliminationteam",
        "_metadata"
      ]
    },
    "factionhof": {
      "model": "TornFactionHofBundle",
      "manual": true,
      "inputRoots": [
        "factionhof"
      ]
    },
    "factiontree": {
      "model": "TornFactionTreeBundle",
      "manual": true,
      "inputRoots": [
        "factiontree"
      ]
    },
    "gyms": {
      "model": "TornGymsResponse",
      "manual": false,
      "inputRoots": [
        "gyms"
      ]
    },
    "hof": {
      "model": "TornHofBundle",
      "manual": true,
      "inputRoots": [
        "hof"
      ]
    },
    "honors": {
      "model": "TornHonorsBundle",
      "manual": true,
      "inputRoots": [
        "honors"
      ]
    },
    "itemammo": {
      "model": "TornItemAmmoBundle",
      "manual": true,
      "inputRoots": [
        "itemammo"
      ]
    },
    "itemdetails": {
      "model": "TornItemDetailsResponse",
      "manual": false,
      "inputRoots": [
        "itemdetails"
      ]
    },
    "itemmods": {
      "model": "TornItemModsBundle",
      "manual": true,
      "inputRoots": [
        "itemmods"
      ]
    },
    "items": {
      "model": "TornItemsBundle",
      "manual": true,
      "inputRoots": [
        "items"
      ]
    },
    "itemstats": {
      "model": "TornItemStatsResponse",
      "manual": false,
      "inputRoots": [
        "itemdetails"
      ]
    },
    "logcategories": {
      "model": "TornLogCategoriesBundle",
      "manual": true,
      "inputRoots": [
        "logcategories"
      ]
    },
    "logtypes": {
      "model": "TornLogTypesBundle",
      "manual": true,
      "inputRoots": [
        "logtypes"
      ]
    },
    "lookup": {
      "model": "TornLookupBundle",
      "manual": true,
      "inputRoots": [
        "selections"
      ]
    },
    "medals": {
      "model": "TornMedalsBundle",
      "manual": true,
      "inputRoots": [
        "medals"
      ]
    },
    "merits": {
      "model": "TornMeritsBundle",
      "manual": true,
      "inputRoots": [
        "merits"
      ]
    },
    "museum": {
      "model": "TornMuseumResponse",
      "manual": false,
      "inputRoots": [
        "museum"
      ]
    },
    "organisedcrimes": {
      "model": "TornOrganisedCrimesBundle",
      "manual": true,
      "inputRoots": [
        "organisedcrimes"
      ]
    },
    "organizedcrimes": {
      "model": "TornOrganizedCrimesBundle",
      "manual": true,
      "inputRoots": [
        "organizedcrimes"
      ]
    },
    "pawnshop": {
      "model": "TornPawnshopBundle",
      "manual": true,
      "inputRoots": [
        "pawnshop"
      ]
    },
    "pokertables": {
      "model": "TornPokerTablesResponse",
      "manual": false,
      "inputRoots": [
        "pokertables"
      ]
    },
    "properties": {
      "model": "TornPropertiesBundle",
      "manual": true,
      "inputRoots": [
        "properties"
      ]
    },
    "rockpaperscissors": {
      "model": "TornRockPaperScissorsResponse",
      "manual": false,
      "inputRoots": [
        "rockpaperscissors"
      ]
    },
    "searchforcash": {
      "model": "TornSearchForCashResponse",
      "manual": false,
      "inputRoots": [
        "searchforcash"
      ]
    },
    "shoplifting": {
      "model": "TornShopliftingResponse",
      "manual": false,
      "inputRoots": [
        "shoplifting"
      ]
    },
    "stats": {
      "model": "TornCityStatsResponse",
      "manual": false,
      "inputRoots": [
        "stats"
      ]
    },
    "stocks": {
      "model": "TornStocksBundle",
      "manual": true,
      "inputRoots": [
        "stocks"
      ]
    },
    "subcrimes": {
      "model": "TornSubcrimesBundle",
      "manual": true,
      "inputRoots": [
        "subcrimes"
      ]
    },
    "territory": {
      "model": "TornTerritoryBundle",
      "manual": true,
      "inputRoots": [
        "territory"
      ]
    },
    "timestamp": {
      "model": "TornTimestampBundle",
      "manual": true,
      "inputRoots": [
        "timestamp"
      ]
    }
  }
} as const;
