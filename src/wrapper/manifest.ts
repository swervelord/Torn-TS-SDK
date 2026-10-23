/** Public facade inventory retained for exhaustive dispatch and coverage tests. */
export const facadeManifest = {
  "user": {
    "selections": [
      "revivesFull",
      "search",
      "virus",
      "organizedcrimes",
      "snapshot",
      "ammo",
      "attacks",
      "attacksfull",
      "bars",
      "basic",
      "battlestats",
      "bazaar",
      "bounties",
      "calendar",
      "casino",
      "competition",
      "cooldowns",
      "crimes",
      "criminalrecord",
      "discord",
      "display",
      "education",
      "enlistedcars",
      "equipment",
      "events",
      "faction",
      "factionbalance",
      "forumfeed",
      "forumfriends",
      "forumposts",
      "forumsubscribedthreads",
      "forumthreads",
      "gym",
      "hof",
      "honors",
      "icons",
      "inventory",
      "itemmods",
      "itemmod",
      "itemmarket",
      "job",
      "jobpoints",
      "jobranks",
      "list",
      "log",
      "lookup",
      "medals",
      "merits",
      "messages",
      "missions",
      "money",
      "newevents",
      "networth",
      "newmessages",
      "notifications",
      "organizedcrime",
      "perks",
      "personalstats",
      "profile",
      "properties",
      "property",
      "races",
      "racingrecords",
      "refills",
      "reports",
      "revives",
      "revivesfull",
      "skills",
      "stocks",
      "timestamp",
      "trade",
      "trades",
      "travel",
      "weaponexp",
      "workstats"
    ],
    "options": [
      "crime_id",
      "trade_id"
    ],
    "methods": [
      {
        "method": "search",
        "returnType": "UserSearchResponse",
        "selection": "search",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "virus",
        "returnType": "UserVirusResponse",
        "selection": "virus",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "organizedcrimes",
        "returnType": "UserOrganizedCrimesResponse",
        "selection": "organizedcrimes",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "snapshot",
        "returnType": "String",
        "selection": "snapshot",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "itemmod",
        "returnType": "UserItemModsBundle",
        "selection": "itemmod",
        "alias": "itemmods",
        "idArgument": false
      },
      {
        "method": "profile",
        "returnType": "UserProfileBundle",
        "selection": "profile",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "basic",
        "returnType": "UserBasicBundle",
        "selection": "basic",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "discord",
        "returnType": "UserDiscordBundle",
        "selection": "discord",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "casino",
        "returnType": "UserCasinoBundle",
        "selection": "casino",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "faction",
        "returnType": "UserFactionBundle",
        "selection": "faction",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "money",
        "returnType": "UserMoneyBundle",
        "selection": "money",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "bars",
        "returnType": "UserBarsBundle",
        "selection": "bars",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "cooldowns",
        "returnType": "UserCooldownsBundle",
        "selection": "cooldowns",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "ammo",
        "returnType": "UserAmmoBundle",
        "selection": "ammo",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "battlestats",
        "returnType": "UserBattleStatsBundle",
        "selection": "battlestats",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "equipment",
        "returnType": "UserEquipmentBundle",
        "selection": "equipment",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "missions",
        "returnType": "UserMissionsBundle",
        "selection": "missions",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "timestamp",
        "returnType": "UserTimestampBundle",
        "selection": "timestamp",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "notifications",
        "returnType": "UserNotificationsBundle",
        "selection": "notifications",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "icons",
        "returnType": "UserIconsBundle",
        "selection": "icons",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "enlistedcars",
        "returnType": "UserEnlistedCarsBundle",
        "selection": "enlistedcars",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "job",
        "returnType": "UserJobBundle",
        "selection": "job",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "jobpoints",
        "returnType": "UserJobPointsBundle",
        "selection": "jobpoints",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "jobranks",
        "returnType": "UserJobRanksBundle",
        "selection": "jobranks",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "refills",
        "returnType": "UserRefillsBundle",
        "selection": "refills",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "skills",
        "returnType": "UserSkillsBundle",
        "selection": "skills",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "stocks",
        "returnType": "UserStocksBundle",
        "selection": "stocks",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "calendar",
        "returnType": "UserCalendarBundle",
        "selection": "calendar",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "lookup",
        "returnType": "UserLookupBundle",
        "selection": "lookup",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "events",
        "returnType": "UserEventsBundle",
        "selection": "events",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "newevents",
        "returnType": "UserNewEventsBundle",
        "selection": "newevents",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "messages",
        "returnType": "UserMessagesBundle",
        "selection": "messages",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "newmessages",
        "returnType": "UserNewMessagesBundle",
        "selection": "newmessages",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "races",
        "returnType": "UserRacesBundle",
        "selection": "races",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "attacks",
        "returnType": "UserAttacksBundle",
        "selection": "attacks",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "attacksfull",
        "returnType": "UserAttacksFullBundle",
        "selection": "attacksfull",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "revives",
        "returnType": "UserRevivesBundle",
        "selection": "revives",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "revivesfull",
        "returnType": "UserRevivesFullBundle",
        "selection": "revivesfull",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "hof",
        "returnType": "UserHofBundle",
        "selection": "hof",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "bounties",
        "returnType": "UserBountiesBundle",
        "selection": "bounties",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "properties",
        "returnType": "UserPropertiesBundle",
        "selection": "properties",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "property",
        "returnType": "UserPropertyBundle",
        "selection": "property",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "forumthreads",
        "returnType": "UserForumThreadsBundle",
        "selection": "forumthreads",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "forumposts",
        "returnType": "UserForumPostsBundle",
        "selection": "forumposts",
        "alias": null,
        "idArgument": true
      },
      {
        "method": "forumsubscribedthreads",
        "returnType": "UserForumSubscribedThreadsBundle",
        "selection": "forumsubscribedthreads",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "forumfriends",
        "returnType": "UserForumFriendsBundle",
        "selection": "forumfriends",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "forumfeed",
        "returnType": "UserForumFeedBundle",
        "selection": "forumfeed",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "workstats",
        "returnType": "UserWorkStatsBundle",
        "selection": "workstats",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "merits",
        "returnType": "UserMeritsBundle",
        "selection": "merits",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "itemmarket",
        "returnType": "UserItemMarketBundle",
        "selection": "itemmarket",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "itemmods",
        "returnType": "UserItemModsBundle",
        "selection": "itemmods",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "organizedcrime",
        "returnType": "UserOrganizedCrimeBundle",
        "selection": "organizedcrime",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "factionbalance",
        "returnType": "UserFactionBalanceBundle",
        "selection": "factionbalance",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "education",
        "returnType": "UserEducationBundle",
        "selection": "education",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "competition",
        "returnType": "UserCompetitionBundle",
        "selection": "competition",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "weaponexp",
        "returnType": "UserWeaponExpBundle",
        "selection": "weaponexp",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "racingrecords",
        "returnType": "UserRacingRecordsBundle",
        "selection": "racingrecords",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "honors",
        "returnType": "UserHonorsBundle",
        "selection": "honors",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "medals",
        "returnType": "UserMedalsBundle",
        "selection": "medals",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "inventory",
        "returnType": "UserInventoryBundle",
        "selection": "inventory",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "trades",
        "returnType": "UserTradesBundle",
        "selection": "trades",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "trade",
        "returnType": "UserTradeBundle",
        "selection": "trade",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "travel",
        "returnType": "UserTravelBundle",
        "selection": "travel",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "display",
        "returnType": "UserDisplayBundle",
        "selection": "display",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "gym",
        "returnType": "UserGymResponse",
        "selection": "gym",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "perks",
        "returnType": "UserPerksResponse",
        "selection": "perks",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "criminalrecord",
        "returnType": "UserCriminalRecordBundle",
        "selection": "criminalrecord",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "bazaar",
        "returnType": "UserBazaarBundle",
        "selection": "bazaar",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "reports",
        "returnType": "UserReportsBundle",
        "selection": "reports",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "crimes",
        "returnType": "UserCrimesBundle",
        "selection": "crimes",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "list",
        "returnType": "UserListBundle",
        "selection": "list",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "log",
        "returnType": "UserLogBundle",
        "selection": "log",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "networth",
        "returnType": "UserNetworthResponse",
        "selection": "networth",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "personalstats",
        "returnType": "UserPersonalStatsBundle",
        "selection": "personalstats",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "search_raw",
        "search"
      ],
      [
        "virus_raw",
        "virus"
      ],
      [
        "organizedcrimes_raw",
        "organizedcrimes"
      ],
      [
        "networth_raw",
        "networth"
      ],
      [
        "newevents_raw",
        "newevents"
      ],
      [
        "missions_raw",
        "missions"
      ],
      [
        "money_raw",
        "money"
      ],
      [
        "organizedcrime_raw",
        "organizedcrime"
      ],
      [
        "perks_raw",
        "perks"
      ],
      [
        "newmessages_raw",
        "newmessages"
      ],
      [
        "notifications_raw",
        "notifications"
      ],
      [
        "list_raw",
        "list"
      ],
      [
        "log_raw",
        "log"
      ],
      [
        "jobpoints_raw",
        "jobpoints"
      ],
      [
        "jobranks_raw",
        "jobranks"
      ],
      [
        "merits_raw",
        "merits"
      ],
      [
        "messages_raw",
        "messages"
      ],
      [
        "lookup_raw",
        "lookup"
      ],
      [
        "medals_raw",
        "medals"
      ],
      [
        "personalstats_raw",
        "personalstats"
      ],
      [
        "stocks_raw",
        "stocks"
      ],
      [
        "timestamp_raw",
        "timestamp"
      ],
      [
        "trade_raw",
        "trade"
      ],
      [
        "trades_raw",
        "trades"
      ],
      [
        "revivesfull_raw",
        "revivesfull"
      ],
      [
        "skills_raw",
        "skills"
      ],
      [
        "workstats_raw",
        "workstats"
      ],
      [
        "travel_raw",
        "travel"
      ],
      [
        "weaponexp_raw",
        "weaponexp"
      ],
      [
        "property_raw",
        "property"
      ],
      [
        "races_raw",
        "races"
      ],
      [
        "profile_raw",
        "profile"
      ],
      [
        "properties_raw",
        "properties"
      ],
      [
        "reports_raw",
        "reports"
      ],
      [
        "revives_raw",
        "revives"
      ],
      [
        "racingrecords_raw",
        "racingrecords"
      ],
      [
        "refills_raw",
        "refills"
      ],
      [
        "cooldowns_raw",
        "cooldowns"
      ],
      [
        "crimes_raw",
        "crimes"
      ],
      [
        "calendar_raw",
        "calendar"
      ],
      [
        "casino_raw",
        "casino"
      ],
      [
        "competition_raw",
        "competition"
      ],
      [
        "display_raw",
        "display"
      ],
      [
        "education_raw",
        "education"
      ],
      [
        "criminalrecord_raw",
        "criminalrecord"
      ],
      [
        "discord_raw",
        "discord"
      ],
      [
        "attacksfull_raw",
        "attacksfull"
      ],
      [
        "bars_raw",
        "bars"
      ],
      [
        "ammo_raw",
        "ammo"
      ],
      [
        "attacks_raw",
        "attacks"
      ],
      [
        "bazaar_raw",
        "bazaar"
      ],
      [
        "bounties_raw",
        "bounties"
      ],
      [
        "basic_raw",
        "basic"
      ],
      [
        "battlestats_raw",
        "battlestats"
      ],
      [
        "enlistedcars_raw",
        "enlistedcars"
      ],
      [
        "hof_raw",
        "hof"
      ],
      [
        "honors_raw",
        "honors"
      ],
      [
        "forumthreads_raw",
        "forumthreads"
      ],
      [
        "gym_raw",
        "gym"
      ],
      [
        "itemmarket_raw",
        "itemmarket"
      ],
      [
        "itemmods_raw",
        "itemmods"
      ],
      [
        "job_raw",
        "job"
      ],
      [
        "icons_raw",
        "icons"
      ],
      [
        "inventory_raw",
        "inventory"
      ],
      [
        "faction_raw",
        "faction"
      ],
      [
        "factionbalance_raw",
        "factionbalance"
      ],
      [
        "equipment_raw",
        "equipment"
      ],
      [
        "events_raw",
        "events"
      ],
      [
        "forumposts_raw",
        "forumposts"
      ],
      [
        "forumsubscribedthreads_raw",
        "forumsubscribedthreads"
      ],
      [
        "forumfeed_raw",
        "forumfeed"
      ],
      [
        "forumfriends_raw",
        "forumfriends"
      ]
    ]
  },
  "company": {
    "selections": [
      "applications",
      "companies",
      "employees",
      "lookup",
      "news",
      "profile",
      "search",
      "snapshot",
      "stock",
      "timestamp"
    ],
    "options": [],
    "methods": [
      {
        "method": "lookup",
        "returnType": "CompanyLookupBundle",
        "selection": "lookup",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "applications",
        "returnType": "CompanyApplicationsBundle",
        "selection": "applications",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "companies",
        "returnType": "CompanyCompaniesBundle",
        "selection": "companies",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "timestamp",
        "returnType": "CompanyTimestampBundle",
        "selection": "timestamp",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "profile",
        "returnType": "CompanyProfileBundle",
        "selection": "profile",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "detailed",
        "returnType": "CompanyDetailedBundle",
        "selection": "detailed",
        "alias": "profile",
        "idArgument": false
      },
      {
        "method": "employees",
        "returnType": "CompanyEmployeesBundle",
        "selection": "employees",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "news",
        "returnType": "CompanyNewsBundle",
        "selection": "news",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "search",
        "returnType": "CompanySearchBundle",
        "selection": "search",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "snapshot",
        "returnType": "String",
        "selection": "snapshot",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "stock",
        "returnType": "CompanyStockBundle",
        "selection": "stock",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "applications_raw",
        "applications"
      ],
      [
        "companies_raw",
        "companies"
      ],
      [
        "employees_raw",
        "employees"
      ],
      [
        "lookup_raw",
        "lookup"
      ],
      [
        "news_raw",
        "news"
      ],
      [
        "profile_raw",
        "profile"
      ],
      [
        "search_raw",
        "search"
      ],
      [
        "stock_raw",
        "stock"
      ],
      [
        "timestamp_raw",
        "timestamp"
      ]
    ]
  },
  "faction": {
    "selections": [
      "revivesFull",
      "dirtybombs",
      "dirtbombs",
      "inventory",
      "warfarechains",
      "warfareraids",
      "warfareranked",
      "warfareterritory",
      "snapshot",
      "revives",
      "reports",
      "revivesfull",
      "stats",
      "search",
      "rankedwars",
      "rackets",
      "positions",
      "raidreport",
      "rankedwarreport",
      "raids",
      "utilities",
      "upgrades",
      "warfare",
      "weapons",
      "wars",
      "timestamp",
      "territory",
      "temporary",
      "territoryownership",
      "territorywars",
      "territorywarreport",
      "caches",
      "boosters",
      "cesium",
      "chainreport",
      "chain",
      "basic",
      "armor",
      "applications",
      "attacks",
      "balance",
      "attacksfull",
      "lookup",
      "hof",
      "medical",
      "news",
      "members",
      "drugs",
      "contributors",
      "chains",
      "crime",
      "crimes",
      "crimeexp"
    ],
    "options": [
      "chain_id",
      "crime_id",
      "raid_war_id",
      "ranked_war_id",
      "territory_war_id"
    ],
    "methods": [
      {
        "method": "dirtybombs",
        "returnType": "FactionWarfareDirtyBombsResponse",
        "selection": "dirtybombs",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "inventory",
        "returnType": "FactionInventoryResponse",
        "selection": "inventory",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "warfarechains",
        "returnType": "FactionWarfareChainsResponse",
        "selection": "warfarechains",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "warfareraids",
        "returnType": "FactionWarfareRaidsResponse",
        "selection": "warfareraids",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "warfareranked",
        "returnType": "FactionWarfareRankedResponse",
        "selection": "warfareranked",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "warfareterritory",
        "returnType": "FactionWarfareTerritoryWarsResponse",
        "selection": "warfareterritory",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "snapshot",
        "returnType": "String",
        "selection": "snapshot",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "dirtbombs",
        "returnType": "FactionWarfareDirtyBombsResponse",
        "selection": "dirtbombs",
        "alias": "dirtybombs",
        "idArgument": false
      },
      {
        "method": "basic",
        "returnType": "FactionBasicBundle",
        "selection": "basic",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "members",
        "returnType": "FactionMembersBundle",
        "selection": "members",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "wars",
        "returnType": "FactionWarsBundle",
        "selection": "wars",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "rankedwars",
        "returnType": "FactionRankedWarsBundle",
        "selection": "rankedwars",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "attacks",
        "returnType": "FactionAttacksBundle",
        "selection": "attacks",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "attacksfull",
        "returnType": "FactionAttacksFullBundle",
        "selection": "attacksfull",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "applications",
        "returnType": "FactionApplicationsBundle",
        "selection": "applications",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "armor",
        "returnType": "FactionArmorBundle",
        "selection": "armor",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "boosters",
        "returnType": "FactionBoostersBundle",
        "selection": "boosters",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "caches",
        "returnType": "FactionCachesBundle",
        "selection": "caches",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "cesium",
        "returnType": "FactionCesiumBundle",
        "selection": "cesium",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "lookup",
        "returnType": "FactionLookupBundle",
        "selection": "lookup",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "chain",
        "returnType": "FactionChainBundle",
        "selection": "chain",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "chains",
        "returnType": "FactionChainsBundle",
        "selection": "chains",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "chainreport",
        "returnType": "FactionChainReportBundle",
        "selection": "chainreport",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "balance",
        "returnType": "FactionBalanceBundle",
        "selection": "balance",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "contributors",
        "returnType": "FactionContributorsBundle",
        "selection": "contributors",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "crime",
        "returnType": "FactionCrimeBundle",
        "selection": "crime",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "crimeexp",
        "returnType": "FactionCrimeExpBundle",
        "selection": "crimeexp",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "crimes",
        "returnType": "FactionCrimesBundle",
        "selection": "crimes",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "drugs",
        "returnType": "FactionDrugsBundle",
        "selection": "drugs",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "rackets",
        "returnType": "FactionRacketsBundle",
        "selection": "rackets",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "medical",
        "returnType": "FactionMedicalBundle",
        "selection": "medical",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "hof",
        "returnType": "FactionHofBundle",
        "selection": "hof",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "positions",
        "returnType": "FactionPositionsBundle",
        "selection": "positions",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "search",
        "returnType": "FactionSearchBundle",
        "selection": "search",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "stats",
        "returnType": "FactionStatsBundle",
        "selection": "stats",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "raids",
        "returnType": "FactionRaidsBundle",
        "selection": "raids",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "raidreport",
        "returnType": "FactionRaidReportBundle",
        "selection": "raidreport",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "rankedwarreport",
        "returnType": "FactionRankedWarReportBundle",
        "selection": "rankedwarreport",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "reports",
        "returnType": "FactionReportsBundle",
        "selection": "reports",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "revives",
        "returnType": "FactionRevivesBundle",
        "selection": "revives",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "revivesfull",
        "returnType": "FactionRevivesFullBundle",
        "selection": "revivesfull",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "timestamp",
        "returnType": "FactionTimestampBundle",
        "selection": "timestamp",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "temporary",
        "returnType": "FactionTemporaryBundle",
        "selection": "temporary",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "territory",
        "returnType": "FactionTerritoryBundle",
        "selection": "territory",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "territoryownership",
        "returnType": "FactionTerritoryOwnershipBundle",
        "selection": "territoryownership",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "territorywars",
        "returnType": "FactionTerritoryWarsBundle",
        "selection": "territorywars",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "territorywarreport",
        "returnType": "FactionTerritoryWarReportBundle",
        "selection": "territorywarreport",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "utilities",
        "returnType": "FactionUtilitiesBundle",
        "selection": "utilities",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "warfare",
        "returnType": "FactionWarfareBundle",
        "selection": "warfare",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "weapons",
        "returnType": "FactionWeaponsBundle",
        "selection": "weapons",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "news",
        "returnType": "FactionNewsBundle",
        "selection": "news",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "upgrades",
        "returnType": "FactionUpgradesBundle",
        "selection": "upgrades",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "dirtybombs_raw",
        "dirtybombs"
      ],
      [
        "inventory_raw",
        "inventory"
      ],
      [
        "warfarechains_raw",
        "warfarechains"
      ],
      [
        "warfareraids_raw",
        "warfareraids"
      ],
      [
        "warfareranked_raw",
        "warfareranked"
      ],
      [
        "warfareterritory_raw",
        "warfareterritory"
      ],
      [
        "revives_raw",
        "revives"
      ],
      [
        "reports_raw",
        "reports"
      ],
      [
        "revivesfull_raw",
        "revivesfull"
      ],
      [
        "stats_raw",
        "stats"
      ],
      [
        "search_raw",
        "search"
      ],
      [
        "rankedwars_raw",
        "rankedwars"
      ],
      [
        "rackets_raw",
        "rackets"
      ],
      [
        "positions_raw",
        "positions"
      ],
      [
        "raidreport_raw",
        "raidreport"
      ],
      [
        "rankedwarreport_raw",
        "rankedwarreport"
      ],
      [
        "raids_raw",
        "raids"
      ],
      [
        "utilities_raw",
        "utilities"
      ],
      [
        "upgrades_raw",
        "upgrades"
      ],
      [
        "warfare_raw",
        "warfare"
      ],
      [
        "weapons_raw",
        "weapons"
      ],
      [
        "wars_raw",
        "wars"
      ],
      [
        "timestamp_raw",
        "timestamp"
      ],
      [
        "territory_raw",
        "territory"
      ],
      [
        "temporary_raw",
        "temporary"
      ],
      [
        "territoryownership_raw",
        "territoryownership"
      ],
      [
        "territorywars_raw",
        "territorywars"
      ],
      [
        "territorywarreport_raw",
        "territorywarreport"
      ],
      [
        "caches_raw",
        "caches"
      ],
      [
        "boosters_raw",
        "boosters"
      ],
      [
        "cesium_raw",
        "cesium"
      ],
      [
        "chainreport_raw",
        "chainreport"
      ],
      [
        "chain_raw",
        "chain"
      ],
      [
        "basic_raw",
        "basic"
      ],
      [
        "armor_raw",
        "armor"
      ],
      [
        "applications_raw",
        "applications"
      ],
      [
        "attacks_raw",
        "attacks"
      ],
      [
        "balance_raw",
        "balance"
      ],
      [
        "attacksfull_raw",
        "attacksfull"
      ],
      [
        "lookup_raw",
        "lookup"
      ],
      [
        "hof_raw",
        "hof"
      ],
      [
        "medical_raw",
        "medical"
      ],
      [
        "news_raw",
        "news"
      ],
      [
        "members_raw",
        "members"
      ],
      [
        "drugs_raw",
        "drugs"
      ],
      [
        "contributors_raw",
        "contributors"
      ],
      [
        "chains_raw",
        "chains"
      ],
      [
        "crime_raw",
        "crime"
      ],
      [
        "crimes_raw",
        "crimes"
      ],
      [
        "crimeexp_raw",
        "crimeexp"
      ]
    ]
  },
  "forum": {
    "selections": [
      "thread",
      "threads",
      "timestamp",
      "categories",
      "lookup",
      "posts"
    ],
    "options": [
      "category_ids",
      "thread_id"
    ],
    "methods": [
      {
        "method": "thread",
        "returnType": "ForumThreadBundle",
        "selection": "thread",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "categories",
        "returnType": "ForumCategoriesBundle",
        "selection": "categories",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "lookup",
        "returnType": "ForumLookupBundle",
        "selection": "lookup",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "threads",
        "returnType": "ForumThreadsBundle",
        "selection": "threads",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "posts",
        "returnType": "ForumPostsBundle",
        "selection": "posts",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "timestamp",
        "returnType": "ForumTimestampBundle",
        "selection": "timestamp",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "thread_raw",
        "thread"
      ],
      [
        "threads_raw",
        "threads"
      ],
      [
        "timestamp_raw",
        "timestamp"
      ],
      [
        "categories_raw",
        "categories"
      ],
      [
        "lookup_raw",
        "lookup"
      ],
      [
        "posts_raw",
        "posts"
      ]
    ]
  },
  "key": {
    "selections": [
      "log",
      "info"
    ],
    "options": [],
    "methods": [
      {
        "method": "info",
        "returnType": "KeyInfoBundle",
        "selection": "info",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "log",
        "returnType": "KeyLogBundle",
        "selection": "log",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "log_raw",
        "log"
      ],
      [
        "info_raw",
        "info"
      ]
    ]
  },
  "market": {
    "selections": [
      "properties",
      "pointsmarket",
      "timestamp",
      "rentals",
      "lookup",
      "auctionhouselisting",
      "auctionhouse",
      "itemmarket",
      "bazaar"
    ],
    "options": [
      "property_type_id"
    ],
    "methods": [
      {
        "method": "bazaar",
        "returnType": "MarketBazaarBundle",
        "selection": "bazaar",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "lookup",
        "returnType": "MarketLookupBundle",
        "selection": "lookup",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "timestamp",
        "returnType": "MarketTimestampBundle",
        "selection": "timestamp",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "pointsmarket",
        "returnType": "PointsMarketResponse",
        "selection": "pointsmarket",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "properties",
        "returnType": "MarketPropertiesBundle",
        "selection": "properties",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "rentals",
        "returnType": "MarketRentalsBundle",
        "selection": "rentals",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "itemmarket",
        "returnType": "MarketItemMarketBundle",
        "selection": "itemmarket",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "auctionhouse",
        "returnType": "MarketAuctionHouseBundle",
        "selection": "auctionhouse",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "auctionhouselisting",
        "returnType": "MarketAuctionHouseListingBundle",
        "selection": "auctionhouselisting",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "properties_raw",
        "properties"
      ],
      [
        "pointsmarket_raw",
        "pointsmarket"
      ],
      [
        "timestamp_raw",
        "timestamp"
      ],
      [
        "rentals_raw",
        "rentals"
      ],
      [
        "lookup_raw",
        "lookup"
      ],
      [
        "auctionhouselisting_raw",
        "auctionhouselisting"
      ],
      [
        "auctionhouse_raw",
        "auctionhouse"
      ],
      [
        "itemmarket_raw",
        "itemmarket"
      ],
      [
        "bazaar_raw",
        "bazaar"
      ]
    ]
  },
  "property": {
    "selections": [
      "timestamp",
      "property",
      "lookup"
    ],
    "options": [],
    "methods": [
      {
        "method": "property",
        "returnType": "PropertyBundle",
        "selection": "property",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "lookup",
        "returnType": "PropertyLookupBundle",
        "selection": "lookup",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "timestamp",
        "returnType": "PropertyTimestampBundle",
        "selection": "timestamp",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "timestamp_raw",
        "timestamp"
      ],
      [
        "property_raw",
        "property"
      ],
      [
        "lookup_raw",
        "lookup"
      ]
    ]
  },
  "racing": {
    "selections": [
      "records",
      "races",
      "tracks",
      "timestamp",
      "carupgrades",
      "cars",
      "race",
      "lookup"
    ],
    "options": [
      "race_id",
      "track_id"
    ],
    "methods": [
      {
        "method": "race",
        "returnType": "RacingRaceBundle",
        "selection": "race",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "races",
        "returnType": "RacingRacesBundle",
        "selection": "races",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "records",
        "returnType": "RacingRecordsBundle",
        "selection": "records",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "tracks",
        "returnType": "RacingTracksBundle",
        "selection": "tracks",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "cars",
        "returnType": "RacingCarsBundle",
        "selection": "cars",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "carupgrades",
        "returnType": "RacingCarUpgradesBundle",
        "selection": "carupgrades",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "lookup",
        "returnType": "RacingLookupBundle",
        "selection": "lookup",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "timestamp",
        "returnType": "RacingTimestampBundle",
        "selection": "timestamp",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "records_raw",
        "records"
      ],
      [
        "races_raw",
        "races"
      ],
      [
        "tracks_raw",
        "tracks"
      ],
      [
        "timestamp_raw",
        "timestamp"
      ],
      [
        "carupgrades_raw",
        "carupgrades"
      ],
      [
        "cars_raw",
        "cars"
      ],
      [
        "race_raw",
        "race"
      ],
      [
        "lookup_raw",
        "lookup"
      ]
    ]
  },
  "torn": {
    "selections": [
      "museum",
      "merits",
      "medals",
      "organisedcrimes",
      "pawnshop",
      "organizedcrimes",
      "itemstats",
      "items",
      "logcategories",
      "lookup",
      "logtypes",
      "stocks",
      "stats",
      "subcrimes",
      "timestamp",
      "territory",
      "properties",
      "pokertables",
      "rockpaperscissors",
      "shoplifting",
      "searchforcash",
      "companies",
      "cityshops",
      "competition",
      "education",
      "crimes",
      "bank",
      "attacklog",
      "bounties",
      "cards",
      "calendar",
      "honors",
      "hof",
      "itemammo",
      "itemmods",
      "itemdetails",
      "eliminationteam",
      "elimination",
      "factionhof",
      "gyms",
      "factiontree"
    ],
    "options": [
      "crime_id",
      "ids",
      "log_category_id",
      "stock_id"
    ],
    "methods": [
      {
        "method": "museum",
        "returnType": "TornMuseumResponse",
        "selection": "museum",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "calendar",
        "returnType": "TornCalendarBundle",
        "selection": "calendar",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "items",
        "returnType": "TornItemsBundle",
        "selection": "items",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "honors",
        "returnType": "TornHonorsBundle",
        "selection": "honors",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "medals",
        "returnType": "TornMedalsBundle",
        "selection": "medals",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "logcategories",
        "returnType": "TornLogCategoriesBundle",
        "selection": "logcategories",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "logtypes",
        "returnType": "TornLogTypesBundle",
        "selection": "logtypes",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "merits",
        "returnType": "TornMeritsBundle",
        "selection": "merits",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "itemammo",
        "returnType": "TornItemAmmoBundle",
        "selection": "itemammo",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "itemmods",
        "returnType": "TornItemModsBundle",
        "selection": "itemmods",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "properties",
        "returnType": "TornPropertiesBundle",
        "selection": "properties",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "stocks",
        "returnType": "TornStocksBundle",
        "selection": "stocks",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "stock",
        "returnType": "TornStockBundle",
        "selection": "stocks",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "bounties",
        "returnType": "TornBountiesBundle",
        "selection": "bounties",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "bank",
        "returnType": "TornBankResponse",
        "selection": "bank",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "attacklog",
        "returnType": "TornAttackLogBundle",
        "selection": "attacklog",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "cards",
        "returnType": "TornCardsResponse",
        "selection": "cards",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "cityshops",
        "returnType": "TornCityShopsResponse",
        "selection": "cityshops",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "companies",
        "returnType": "TornCompaniesResponse",
        "selection": "companies",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "gyms",
        "returnType": "TornGymsResponse",
        "selection": "gyms",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "itemstats",
        "returnType": "TornItemStatsResponse",
        "selection": "itemstats",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "itemdetails",
        "returnType": "TornItemDetailsResponse",
        "selection": "itemdetails",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "pawnshop",
        "returnType": "TornPawnshopBundle",
        "selection": "pawnshop",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "pokertables",
        "returnType": "TornPokerTablesResponse",
        "selection": "pokertables",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "lookup",
        "returnType": "TornLookupBundle",
        "selection": "lookup",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "timestamp",
        "returnType": "TornTimestampBundle",
        "selection": "timestamp",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "competition",
        "returnType": "TornCompetitionBundle",
        "selection": "competition",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "crimes",
        "returnType": "TornCrimesBundle",
        "selection": "crimes",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "education",
        "returnType": "TornEducationBundle",
        "selection": "education",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "elimination",
        "returnType": "TornEliminationBundle",
        "selection": "elimination",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "eliminationteam",
        "returnType": "TornEliminationTeamBundle",
        "selection": "eliminationteam",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "factionhof",
        "returnType": "TornFactionHofBundle",
        "selection": "factionhof",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "factiontree",
        "returnType": "TornFactionTreeBundle",
        "selection": "factiontree",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "hof",
        "returnType": "TornHofBundle",
        "selection": "hof",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "organisedcrimes",
        "returnType": "TornOrganisedCrimesBundle",
        "selection": "organisedcrimes",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "organizedcrimes",
        "returnType": "TornOrganizedCrimesBundle",
        "selection": "organizedcrimes",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "rockpaperscissors",
        "returnType": "TornRockPaperScissorsResponse",
        "selection": "rockpaperscissors",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "searchforcash",
        "returnType": "TornSearchForCashResponse",
        "selection": "searchforcash",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "shoplifting",
        "returnType": "TornShopliftingResponse",
        "selection": "shoplifting",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "stats",
        "returnType": "TornCityStatsResponse",
        "selection": "stats",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "subcrimes",
        "returnType": "TornSubcrimesBundle",
        "selection": "subcrimes",
        "alias": null,
        "idArgument": false
      },
      {
        "method": "territory",
        "returnType": "TornTerritoryBundle",
        "selection": "territory",
        "alias": null,
        "idArgument": false
      }
    ],
    "rawMethods": [
      [
        "museum_raw",
        "museum"
      ],
      [
        "merits_raw",
        "merits"
      ],
      [
        "medals_raw",
        "medals"
      ],
      [
        "organisedcrimes_raw",
        "organisedcrimes"
      ],
      [
        "pawnshop_raw",
        "pawnshop"
      ],
      [
        "organizedcrimes_raw",
        "organizedcrimes"
      ],
      [
        "itemstats_raw",
        "itemstats"
      ],
      [
        "items_raw",
        "items"
      ],
      [
        "logcategories_raw",
        "logcategories"
      ],
      [
        "lookup_raw",
        "lookup"
      ],
      [
        "logtypes_raw",
        "logtypes"
      ],
      [
        "stocks_raw",
        "stocks"
      ],
      [
        "stats_raw",
        "stats"
      ],
      [
        "subcrimes_raw",
        "subcrimes"
      ],
      [
        "timestamp_raw",
        "timestamp"
      ],
      [
        "territory_raw",
        "territory"
      ],
      [
        "properties_raw",
        "properties"
      ],
      [
        "pokertables_raw",
        "pokertables"
      ],
      [
        "rockpaperscissors_raw",
        "rockpaperscissors"
      ],
      [
        "shoplifting_raw",
        "shoplifting"
      ],
      [
        "searchforcash_raw",
        "searchforcash"
      ],
      [
        "companies_raw",
        "companies"
      ],
      [
        "cityshops_raw",
        "cityshops"
      ],
      [
        "competition_raw",
        "competition"
      ],
      [
        "education_raw",
        "education"
      ],
      [
        "crimes_raw",
        "crimes"
      ],
      [
        "bank_raw",
        "bank"
      ],
      [
        "attacklog_raw",
        "attacklog"
      ],
      [
        "bounties_raw",
        "bounties"
      ],
      [
        "cards_raw",
        "cards"
      ],
      [
        "calendar_raw",
        "calendar"
      ],
      [
        "honors_raw",
        "honors"
      ],
      [
        "hof_raw",
        "hof"
      ],
      [
        "itemammo_raw",
        "itemammo"
      ],
      [
        "itemmods_raw",
        "itemmods"
      ],
      [
        "itemdetails_raw",
        "itemdetails"
      ],
      [
        "eliminationteam_raw",
        "eliminationteam"
      ],
      [
        "elimination_raw",
        "elimination"
      ],
      [
        "factionhof_raw",
        "factionhof"
      ],
      [
        "gyms_raw",
        "gyms"
      ],
      [
        "factiontree_raw",
        "factiontree"
      ]
    ]
  }
} as const;
