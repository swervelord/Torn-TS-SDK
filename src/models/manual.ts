/** Complete manual compatibility models ported from the Rust SDK. Field names retain the Rust public model names. */
import type { JsonValue, Integer } from "../types.ts";
import type * as Generated from "../generated/models.ts";
import { DynamicValue as DynamicValueHelpers } from "./manual-values.ts";
export const DynamicValue = DynamicValueHelpers;

export type DynamicValue = JsonValue;

export interface PaginatedMetadata {
  links: (PaginatedLinks | null);
  extra: Record<string, JsonValue>;
}

export interface PaginatedLinks {
  prev: (string | null);
  next: (string | null);
  extra: Record<string, JsonValue>;
}

export interface PaginatedMetadataWithTotal {
  links: (PaginatedLinks | null);
  total: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyApplicationsBundle {
  applications: Array<CompanyApplicationSummary>;
  extra: Record<string, JsonValue>;
}

export interface CompanyCompaniesBundle {
  company: (CompanyProfile | null);
  companies: Array<CompanyProfile>;
  company_timestamp: (Integer | null);
  company_delay: (Integer | null);
  companies_timestamp: (Integer | null);
  companies_delay: (Integer | null);
  _metadata: (PaginatedMetadataWithTotal | null);
  extra: Record<string, JsonValue>;
}

export interface CompanySearchBundle {
  search: Array<CompanySearchEntry>;
  extra: Record<string, JsonValue>;
}

export interface CompanyLookupBundle {
  selections: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface CompanyNewsBundle {
  news: Record<string, CompanyNewsEntry>;
  extra: Record<string, JsonValue>;
}

export interface CompanyTimestampBundle {
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyProfileBundle {
  company: CompanyProfile;
  profile(): CompanyProfile;
}

export interface CompanyProfile {
  id: (Integer | null);
  name: (string | null);
  company_type: (Integer | null);
  company_kind: (CompanyType | null);
  rating: (Integer | null);
  age: (Integer | null);
  days_old: (Integer | null);
  created_at: (Integer | null);
  image: (string | null);
  daily_income: (Integer | null);
  weekly_income: (Integer | null);
  income: (CompanyIncome | null);
  customers: (CompanyCustomers | null);
  employees: (Record<string, CompanyProfileEmployee> | null);
  director: (CompanyDirector | null);
  status: (UserStatus | null);
  funds: (Integer | null);
  popularity: (Integer | null);
  efficiency: (Integer | null);
  environment: (Integer | null);
  trains: (Integer | null);
  applications_allowed: (boolean | null);
  advertisement_budget: (Integer | null);
  upgrades: (CompanyUpgrades | null);
  value: (number | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyType {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyIncome {
  daily: (Integer | null);
  weekly: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyCustomers {
  daily: (Integer | null);
  weekly: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyDirector {
  id: (Integer | null);
  name: (string | null);
  status: (UserStatus | null);
  last_action: (UserLastAction | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyUpgrades {
  staff_room: (string | null);
  storage: (string | null);
  storage_capacity: (string | null);
  extra: Record<string, JsonValue>;
}

export interface CompanySearchEntry {
  id: (Integer | null);
  name: (string | null);
  company_kind: (CompanyType | null);
  rating: (Integer | null);
  days_old: (Integer | null);
  image: (string | null);
  income: (CompanyIncome | null);
  customers: (CompanyCustomers | null);
  director: (CompanyDirector | null);
  applications_allowed: (boolean | null);
  extra: Record<string, JsonValue>;
}

export type CompanyProfileEmployee = CompanyProfileEmployeeDetails | Integer;

export interface CompanyProfileEmployeeDetails {
  id: (Integer | null);
  name: (string | null);
  position: (string | null);
  days_in_company: (Integer | null);
  status: (UserStatus | null);
  last_action: (UserLastAction | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyApplicationSummary {
  id: (Integer | null);
  user: (CompanyApplicationUser | null);
  message: (string | null);
  valid_until: (Integer | null);
  status: (string | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyApplicationUser {
  id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  stats: (CompanyApplicationStats | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyApplicationStats {
  manual_labor: (Integer | null);
  intelligence: (Integer | null);
  endurance: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyEmployeesBundle {
  company_employees: (Record<string, CompanyEmployee> | null);
  employees: Array<CompanyEmployee>;
  extra: Record<string, JsonValue>;
}

export interface CompanyEmployee {
  id: (Integer | null);
  name: (string | null);
  position: (string | null);
  days_in_company: (Integer | null);
  joined_at: (Integer | null);
  wage: (Integer | null);
  manual_labor: (Integer | null);
  intelligence: (Integer | null);
  endurance: (Integer | null);
  stats: (CompanyEmployeeStats | null);
  effectiveness: (CompanyEmployeeEffectiveness | null);
  working_stats: (Integer | null);
  efficiency: (Integer | null);
  value: (number | null);
  status: (UserStatus | null);
  last_action: (UserLastAction | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyEmployeeStats {
  manual_labor: (Integer | null);
  intelligence: (Integer | null);
  endurance: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyEmployeeEffectiveness {
  working_stats: (Integer | null);
  settled_in: (Integer | null);
  book: (Integer | null);
  merits: (Integer | null);
  director_education: (Integer | null);
  management: (Integer | null);
  wrong_gender: (Integer | null);
  addiction: (Integer | null);
  inactivity: (Integer | null);
  total: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyStockBundle {
  company_stock: Record<string, CompanyStockEntry>;
  stock: Array<CompanyStockEntry>;
  extra: Record<string, JsonValue>;
}

export interface CompanyStockEntry {
  id: (Integer | null);
  name: (string | null);
  cost: (Integer | null);
  rrp: (Integer | null);
  price: (Integer | null);
  in_stock: (Integer | null);
  on_order: (Integer | null);
  sold_amount: (Integer | null);
  sold_worth: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface CompanyNewsEntry {
  id: (string | null);
  category: (string | null);
  news: (string | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export type CompanyDetailedBundle = CompanyProfileBundle;

export interface FactionBasicBundle {
  basic: FactionBasic;
}

export interface FactionMembersBundle {
  members: Array<FactionMemberSummary>;
}

export interface FactionWarsBundle {
  wars: FactionWarsSummary;
  pacts: Array<FactionPactSummary>;
}

export interface FactionRankedWarsBundle {
  rankedwars: Array<FactionRankedWarSummary>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionApplicationsBundle {
  applications: Array<FactionApplicationSummary>;
}

export interface FactionArmorBundle {
  armor: FactionLegacyItemSelection;
}

export interface FactionBoostersBundle {
  boosters: FactionLegacyItemSelection;
}

export interface FactionCachesBundle {
  caches: FactionLegacyItemSelection;
}

export interface FactionCesiumBundle {
  cesium: FactionLegacyItemSelection;
}

export interface FactionCrimeBundle {
  crime: FactionCrime;
}

export interface FactionCrimeExpBundle {
  crimeexp: FactionCrimeExpSelection;
}

export interface FactionCrimesBundle {
  crimes: Array<FactionCrime>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionDrugsBundle {
  drugs: FactionLegacyItemSelection;
}

export interface FactionLookupBundle {
  selections: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface FactionChainBundle {
  chain: FactionOngoingChainSummary;
}

export interface FactionChainsBundle {
  chains: Array<FactionChainSummary>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionChainReportBundle {
  chainreport: FactionChainReportSummary;
}

export interface FactionBalanceBundle {
  balance: FactionBalanceSummary;
}

export interface FactionContributorsBundle {
  contributors: Array<FactionContributorSummary>;
}

export interface FactionMedicalBundle {
  medical: FactionLegacyItemSelection;
}

export interface FactionRacketsBundle {
  rackets: Array<FactionRacketSummary>;
}

export interface FactionHofBundle {
  hof: FactionHofSummary;
}

export interface FactionPositionsBundle {
  positions: Array<FactionPositionSummary>;
}

export interface FactionSearchBundle {
  search: Array<FactionSearchSummary>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionStatsBundle {
  stats: Array<FactionStatSummary>;
}

export interface FactionRaidsBundle {
  raids: Array<FactionRaidSummary>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionTimestampBundle {
  timestamp: (Integer | null);
}

export interface FactionTemporaryBundle {
  temporary: FactionLegacyItemSelection;
}

export interface FactionAttacksBundle {
  attacks: Array<UserAttack>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionAttacksFullBundle {
  attacks: Array<UserAttackFull>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionRevivesBundle {
  revives: Array<UserRevive>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionRevivesFullBundle {
  revives: Array<UserReviveFull>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionReportsBundle {
  reports: Array<UserReportSummary>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionTerritoryBundle {
  territory: Array<FactionTerritorySummary>;
}

export interface FactionTerritoryOwnershipBundle {
  territory_ownership: Array<FactionTerritoryOwnershipSummary>;
}

export interface FactionTerritoryWarsBundle {
  territorywars: Array<FactionTerritoryWarHistoryEntry>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionRaidReportBundle {
  raidreport: FactionRaidReportSummary;
}

export interface FactionRankedWarReportBundle {
  rankedwarreport: FactionRankedWarReportSummary;
}

export interface FactionTerritoryWarReportBundle {
  territorywarreport: FactionTerritoryWarReportSummary;
}

export interface FactionWarfareBundle {
  warfare: Array<FactionWarfareEntry>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionUtilitiesBundle {
  utilities: FactionLegacyItemSelection;
}

export interface FactionWeaponsBundle {
  weapons: FactionLegacyItemSelection;
}

export interface FactionNewsBundle {
  news: Array<FactionNewsEntry>;
  _metadata: (PaginatedMetadata | null);
}

export interface FactionUpgradesBundle {
  state: (string | null);
  upgrades: (FactionUpgradesSummary | null);
}

export interface FactionBasic {
  id: (Integer | null);
  name: (string | null);
  tag: (string | null);
  tag_image: (string | null);
  respect: (Integer | null);
  members: (Integer | null);
  leader_id: (Integer | null);
  co_leader_id: (Integer | null);
  rank: (FactionRank | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRank {
  division: (Integer | null);
  level: (Integer | null);
  name: (string | null);
  position: (Integer | null);
  wins: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionMemberSummary {
  id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  position: (string | null);
  days_in_faction: (Integer | null);
  is_revivable: (boolean | null);
  status: (FactionMemberStatus | null);
  last_action: (FactionLastAction | null);
  extra: Record<string, JsonValue>;
}

export interface FactionMemberStatus {
  state: (string | null);
  color: (string | null);
  description: (string | null);
  details: (string | null);
  plane_image_type: (string | null);
  until: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionLastAction {
  status: (string | null);
  relative: (string | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionWarsSummary {
  raids: Array<FactionRaidWarSummary>;
  ranked: (FactionRankedWarDetails | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRaidWarSummary {
  war_id: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  factions: Array<FactionWarFactionSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionRankedWarDetails {
  war_id: (Integer | null);
  target: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  winner: (Integer | null);
  factions: Array<FactionWarFactionSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionWarFactionSummary {
  id: (Integer | null);
  name: (string | null);
  score: (number | null);
  chain: (Integer | null);
  is_aggressor: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface FactionPactSummary {
  faction_id: (Integer | null);
  faction_name: (string | null);
  until: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRankedWarSummary {
  id: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  target: (Integer | null);
  winner: (Integer | null);
  factions: Array<FactionWarFactionSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionApplicationSummary {
  id: (Integer | null);
  user: (FactionApplicantSummary | null);
  message: (string | null);
  valid_until: (Integer | null);
  status: (string | null);
  extra: Record<string, JsonValue>;
}

export interface FactionApplicantSummary {
  id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  stats: (FactionApplicantStats | null);
  extra: Record<string, JsonValue>;
}

export interface FactionApplicantStats {
  strength: (Integer | null);
  speed: (Integer | null);
  dexterity: (Integer | null);
  defense: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionBalanceSummary {
  faction: (FactionBalanceFaction | null);
  members: Array<FactionBalanceMember>;
  extra: Record<string, JsonValue>;
}

export interface FactionBalanceFaction {
  money: (Integer | null);
  points: (Integer | null);
  scope: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionBalanceMember {
  id: (Integer | null);
  username: (string | null);
  money: (Integer | null);
  points: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionContributorSummary {
  id: (Integer | null);
  username: (string | null);
  value: (Integer | null);
  in_faction: (boolean | null);
  extra: Record<string, JsonValue>;
}

export type FactionLegacyItemSelection = Record<string, FactionLegacyItemEntry> | Array<FactionLegacyItemEntry> | JsonValue;

export interface FactionLegacyItemEntry {
  id: (Integer | null);
  item_id: (Integer | null);
  uid: (Integer | null);
  name: (string | null);
  item_type: (string | null);
  category: (string | null);
  quantity: (Integer | null);
  available: (Integer | null);
  loaned: (Integer | null);
  loaned_to: (FactionLegacyItemLoanTarget | null);
  market_price: (Integer | null);
  average_price: (Integer | null);
  damage: (number | null);
  accuracy: (number | null);
  armor: (number | null);
  quality: (number | null);
  bonus: (string | null);
  required: (boolean | null);
  extra: Record<string, JsonValue>;
}

export type FactionLegacyItemLoanTarget = Integer | string | FactionLegacyItemLoanUser | boolean;

export interface FactionLegacyItemLoanUser {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export type FactionCrimeExpSelection = Record<string, FactionCrimeExpEntry> | Array<FactionCrimeExpEntry> | JsonValue;

export interface FactionCrimeExpEntry {
  id: (Integer | null);
  name: (string | null);
  crime_exp: (Integer | null);
  position: (string | null);
  rank: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionHofSummary {
  rank: (FactionHofValueString | null);
  respect: (FactionHofValue | null);
  chain: (FactionHofValue | null);
  extra: Record<string, JsonValue>;
}

export interface FactionHofValueString {
  rank: (string | null);
  value: (string | null);
  extra: Record<string, JsonValue>;
}

export interface FactionHofValue {
  rank: (Integer | null);
  value: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionPositionSummary {
  name: (string | null);
  is_default: (boolean | null);
  abilities: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface FactionSearchSummary {
  id: (Integer | null);
  name: (string | null);
  respect: (Integer | null);
  members: (Integer | null);
  members_max: (Integer | null);
  leader: (FactionSearchLeader | null);
  co_leader: (FactionSearchLeader | null);
  image: (string | null);
  tag_image: (string | null);
  tag: (string | null);
  is_destroyed: (boolean | null);
  is_recruiting: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface FactionSearchLeader {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface FactionStatSummary {
  name: (string | null);
  value: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionOngoingChainSummary {
  id: (Integer | null);
  current: (Integer | null);
  max: (Integer | null);
  timeout: (Integer | null);
  modifier: (number | null);
  cooldown: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionChainSummary {
  id: (Integer | null);
  chain: (Integer | null);
  respect: (number | null);
  start: (Integer | null);
  end: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionChainReportSummary {
  id: (Integer | null);
  faction_id: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  details: (FactionChainReportDetailsSummary | null);
  bonuses: Array<FactionChainReportBonusSummary>;
  attackers: Array<FactionChainReportAttackerSummary>;
  non_attackers: Array<Integer>;
  extra: Record<string, JsonValue>;
}

export interface FactionChainReportDetailsSummary {
  chain: (Integer | null);
  respect: (number | null);
  members: (Integer | null);
  targets: (Integer | null);
  war: (Integer | null);
  best: (number | null);
  leave: (Integer | null);
  mug: (Integer | null);
  hospitalize: (Integer | null);
  assists: (Integer | null);
  retaliations: (Integer | null);
  overseas: (Integer | null);
  draws: (Integer | null);
  escapes: (Integer | null);
  losses: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionChainReportBonusSummary {
  attacker_id: (Integer | null);
  defender_id: (Integer | null);
  chain: (Integer | null);
  respect: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionChainReportAttackerSummary {
  id: (Integer | null);
  respect: (FactionChainReportAttackerRespectSummary | null);
  attacks: (FactionChainReportAttacksSummary | null);
  extra: Record<string, JsonValue>;
}

export interface FactionChainReportAttackerRespectSummary {
  total: (number | null);
  average: (number | null);
  best: (number | null);
  extra: Record<string, JsonValue>;
}

export interface FactionChainReportAttacksSummary {
  total: (Integer | null);
  leave: (Integer | null);
  mug: (Integer | null);
  hospitalize: (Integer | null);
  assists: (Integer | null);
  retaliations: (Integer | null);
  overseas: (Integer | null);
  draws: (Integer | null);
  escapes: (Integer | null);
  losses: (Integer | null);
  war: (Integer | null);
  bonuses: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrime {
  id: (Integer | null);
  previous_crime_id: (Integer | null);
  name: (string | null);
  difficulty: (Integer | null);
  status: (string | null);
  created_at: (Integer | null);
  planning_at: (Integer | null);
  ready_at: (Integer | null);
  expired_at: (Integer | null);
  executed_at: (Integer | null);
  slots: Array<FactionCrimeSlot>;
  rewards: (FactionCrimeReward | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrimeSlot {
  position: (string | null);
  position_info: (FactionCrimePositionInfo | null);
  item_requirement: (FactionCrimeItemRequirement | null);
  user: (FactionCrimeUser | null);
  checkpoint_pass_rate: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrimePositionInfo {
  id: (string | null);
  label: (string | null);
  number: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrimeItemRequirement {
  id: (Integer | null);
  is_reusable: (boolean | null);
  is_available: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrimeUser {
  id: (Integer | null);
  outcome: (string | null);
  outcome_duration: (Integer | null);
  item_outcome: (FactionCrimeUserItemOutcome | null);
  joined_at: (Integer | null);
  progress: (number | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrimeUserItemOutcome {
  owned_by: (string | null);
  item_id: (Integer | null);
  item_uid: (Integer | null);
  outcome: (string | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrimeReward {
  money: (Integer | null);
  items: Array<FactionCrimeRewardItem>;
  respect: (Integer | null);
  scope: (Integer | null);
  payout: (FactionCrimeRewardPayout | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrimeRewardItem {
  id: (Integer | null);
  quantity: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionCrimeRewardPayout {
  payout_type: (string | null);
  percentage: (number | null);
  paid_by: (Integer | null);
  paid_at: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRacketSummary {
  territory: (string | null);
  faction_id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  description: (string | null);
  reward: (FactionRacketRewardSummary | null);
  created_at: (Integer | null);
  changed_at: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRacketRewardSummary {
  reward_type: (string | null);
  quantity: (Integer | null);
  id: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRaidSummary {
  id: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  aggressor: (FactionWarfareFactionSummary | null);
  defender: (FactionWarfareFactionSummary | null);
  extra: Record<string, JsonValue>;
}

export interface FactionTerritorySummary {
  id: (string | null);
  acquired_at: (Integer | null);
  sector: (Integer | null);
  size: (Integer | null);
  density: (Integer | null);
  slots: (Integer | null);
  respect: (Integer | null);
  coordinates: (FactionTerritoryCoordinatesSummary | null);
  racket: (FactionRacketSummary | null);
  extra: Record<string, JsonValue>;
}

export interface FactionTerritoryCoordinatesSummary {
  x: (number | null);
  y: (number | null);
  extra: Record<string, JsonValue>;
}

export interface FactionTerritoryOwnershipSummary {
  id: (string | null);
  irradiated: (boolean | null);
  owned_by: (Integer | null);
  acquired_at: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionTerritoryWarHistoryEntry {
  id: (Integer | null);
  war_id: (Integer | null);
  territory: (string | null);
  start: (Integer | null);
  end: (Integer | null);
  target: (Integer | null);
  result: (string | null);
  factions: Array<FactionTerritoryWarParticipantSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionTerritoryWarParticipantSummary {
  id: (Integer | null);
  name: (string | null);
  score: (number | null);
  is_aggressor: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface FactionChainWarfareSummary {
  id: (Integer | null);
  chain: (Integer | null);
  respect: (number | null);
  start: (Integer | null);
  end: (Integer | null);
  faction: (FactionWarfareFactionSummary | null);
  extra: Record<string, JsonValue>;
}

export interface FactionTerritoryWarfareSummary {
  id: (Integer | null);
  territory: (string | null);
  start: (Integer | null);
  end: (Integer | null);
  target: (Integer | null);
  result: (string | null);
  aggressor: (FactionWarfareFactionSummary | null);
  defender: (FactionWarfareFactionSummary | null);
  extra: Record<string, JsonValue>;
}

export type FactionWarfareEntry = FactionRankedWarDetails | FactionTerritoryWarfareSummary | FactionChainWarfareSummary | FactionRaidSummary | FactionUnknownWarfareEntry;

export interface FactionUnknownWarfareEntry {
  extra: Record<string, JsonValue>;
}

export interface FactionWarfareFactionSummary {
  id: (Integer | null);
  name: (string | null);
  score: (number | null);
  chain: (Integer | null);
  is_aggressor: (boolean | null);
  respect_lost: (Integer | null);
  players_on_wall: Array<FactionWarfareWallPlayerSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionWarfareWallPlayerSummary {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface FactionWarfareUserSummary {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface FactionNewsEntry {
  id: (string | null);
  text: (string | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRaidReportSummary {
  id: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  aggressor: (FactionRaidReportSideSummary | null);
  defender: (FactionRaidReportSideSummary | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRaidReportSideSummary {
  id: (Integer | null);
  name: (string | null);
  score: (number | null);
  attackers: Array<FactionRaidReportAttackerSummary>;
  non_attackers: Array<FactionRaidReportUserSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionRaidReportAttackerSummary {
  user: (FactionRaidReportUserSummary | null);
  attacks: (Integer | null);
  damage: (number | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRaidReportUserSummary {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRankedWarReportSummary {
  id: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  winner: (Integer | null);
  forfeit: (boolean | null);
  factions: Array<FactionRankedWarReportFactionSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionRankedWarReportFactionSummary {
  id: (Integer | null);
  name: (string | null);
  score: (number | null);
  attacks: (Integer | null);
  rank: (FactionRankedWarReportRankSummary | null);
  rewards: (FactionRankedWarReportRewardsSummary | null);
  members: Array<FactionRankedWarReportMemberSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionRankedWarReportRankSummary {
  before: (string | null);
  after: (string | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRankedWarReportRewardsSummary {
  respect: (number | null);
  points: (Integer | null);
  items: Array<FactionRankedWarReportRewardItemSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionRankedWarReportRewardItemSummary {
  id: (Integer | null);
  name: (string | null);
  quantity: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionRankedWarReportMemberSummary {
  id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  score: (number | null);
  attacks: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionTerritoryWarReportSummary {
  id: (Integer | null);
  territory: (string | null);
  started_at: (Integer | null);
  ended_at: (Integer | null);
  winner: (Integer | null);
  result: (string | null);
  factions: Array<FactionTerritoryWarReportFactionSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionTerritoryWarReportFactionSummary {
  id: (Integer | null);
  name: (string | null);
  score: (number | null);
  is_aggressor: (boolean | null);
  clears: (Integer | null);
  joins: (Integer | null);
  members: Array<FactionTerritoryWarReportMemberSummary>;
  extra: Record<string, JsonValue>;
}

export interface FactionTerritoryWarReportMemberSummary {
  id: (Integer | null);
  username: (string | null);
  level: (Integer | null);
  score: (number | null);
  joins: (Integer | null);
  clears: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface FactionUpgradesSummary {
  core: (FactionUpgradeCore | null);
  peace: Array<FactionUpgradeBranch>;
  war: Array<FactionUpgradeBranch>;
  extra: Record<string, JsonValue>;
}

export interface FactionUpgradeCore {
  upgrades: Array<FactionUpgradeDetails>;
  extra: Record<string, JsonValue>;
}

export interface FactionUpgradeBranch {
  name: (string | null);
  order: (Integer | null);
  multiplier: (number | null);
  upgrades: Array<FactionUpgradeDetails>;
  extra: Record<string, JsonValue>;
}

export interface FactionUpgradeDetails {
  id: (Integer | null);
  name: (string | null);
  ability: (string | null);
  level: (Integer | null);
  cost: (Integer | null);
  unlocked_at: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface ForumCategoriesBundle {
  categories: Array<ForumCategory>;
}

export interface ForumLookupBundle {
  selections: Array<string>;
}

export interface ForumThreadsBundle {
  threads: Array<ForumThread>;
  _metadata: (PaginatedMetadata | null);
}

export interface ForumThreadBundle {
  thread: ForumThread;
}

export interface ForumPostsBundle {
  posts: Array<ForumPost>;
  _metadata: (PaginatedMetadata | null);
}

export interface ForumTimestampBundle {
  timestamp: (Integer | null);
}

export interface ForumCategory {
  id: (Integer | null);
  title: (string | null);
  acronym: (string | null);
  threads: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface ForumThread {
  id: (Integer | null);
  title: (string | null);
  forum_id: (Integer | null);
  posts: (Integer | null);
  views: (Integer | null);
  rating: (Integer | null);
  is_locked: (boolean | null);
  is_sticky: (boolean | null);
  has_poll: (boolean | null);
  first_post_time: (Integer | null);
  last_post_time: (Integer | null);
  content: (string | null);
  content_raw: (string | null);
  poll: (ForumPoll | null);
  author: (ForumUserSummary | null);
  last_poster: (ForumUserSummary | null);
  new_posts: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface ForumPost {
  id: (Integer | null);
  thread_id: (Integer | null);
  author: (ForumUserSummary | null);
  is_legacy: (boolean | null);
  is_topic: (boolean | null);
  is_edited: (boolean | null);
  is_pinned: (boolean | null);
  created_time: (Integer | null);
  edited_by: (Integer | null);
  has_quote: (boolean | null);
  quoted_post_id: (Integer | null);
  content: (string | null);
  likes: (Integer | null);
  dislikes: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface ForumUserSummary {
  id: (Integer | null);
  username: (string | null);
  karma: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface ForumPoll {
  question: (string | null);
  answers_count: (Integer | null);
  answers: Array<ForumPollAnswer>;
  extra: Record<string, JsonValue>;
}

export interface ForumPollAnswer {
  answer: (string | null);
  votes: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface KeyLogBundle {
  log: Array<KeyLogEntry>;
}

export interface KeyInfoBundle {
  info: KeyInfo;
}

export interface KeyLogEntry {
  timestamp: (Integer | null);
  entry_type: (string | null);
  selections: (string | null);
  id: (KeyLogTargetId | null);
  comment: (string | null);
  ip: (string | null);
  extra: Record<string, JsonValue>;
}

export type KeyLogTargetId = Integer | string;

export interface KeyInfo {
  access: (KeyAccess | null);
  selections: (KeySelections | null);
  extra: Record<string, JsonValue>;
}

export interface KeyAccess {
  access_type: (string | null);
  level: (Integer | null);
  company: (boolean | null);
  faction: (boolean | null);
  log: (KeyLogAccess | null);
  custom_permissions: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface KeyLogAccess {
  available: Array<KeyLogCategoryAccess>;
  extra: Record<string, JsonValue>;
}

export interface KeyLogCategoryAccess {
  category_id: (Integer | null);
  log_ids: Array<Integer>;
  extra: Record<string, JsonValue>;
}

export interface KeySelections {
  user: Array<string>;
  faction: Array<string>;
  forum: Array<string>;
  key: Array<string>;
  market: Array<string>;
  property: Array<string>;
  racing: Array<string>;
  torn: Array<string>;
  company: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface MarketLookupBundle {
  selections: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface MarketTimestampBundle {
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface MarketPointsMarketBundle {
  pointsmarket: Record<string, MarketPointsMarketListing>;
  extra: Record<string, JsonValue>;
}

export interface MarketPointsMarketListing {
  cost: (Integer | null);
  quantity: (Integer | null);
  total_cost: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface MarketBazaarBundle {
  bazaar: MarketBazaar;
}

export interface MarketItemMarketBundle {
  itemmarket: MarketItemMarket;
  _metadata: (MarketMetadata | null);
}

export interface MarketPropertiesBundle {
  properties: MarketPropertyCatalog;
  properties_timestamp: (Integer | null);
  properties_delay: (Integer | null);
  _metadata: (MarketMetadata | null);
}

export interface MarketRentalsBundle {
  rentals: MarketRentalCatalog;
  rentals_timestamp: (Integer | null);
  rentals_delay: (Integer | null);
  _metadata: (MarketMetadata | null);
}

export interface MarketAuctionHouseBundle {
  auctionhouse: Array<MarketAuctionHouseListing>;
  _metadata: (MarketMetadata | null);
}

export interface MarketAuctionHouseListingBundle {
  auctionhouselisting: MarketAuctionHouseListing;
}

export interface MarketBazaar {
  advanced_item: Array<MarketBazaarSellerSummary>;
  bargain: Array<MarketBazaarSellerSummary>;
  bulk: Array<MarketBazaarSellerSummary>;
  busiest: Array<MarketBazaarSellerSummary>;
  dollar_sale: Array<MarketBazaarSellerSummary>;
  extra: Record<string, JsonValue>;
}

export interface MarketBazaarSellerSummary {
  id: (Integer | null);
  name: (string | null);
  is_open: (boolean | null);
  weekly_customers: (Integer | null);
  advanced_item_sales: (Integer | null);
  bargain_sales: (Integer | null);
  bulk_sales: (Integer | null);
  dollar_sales: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface MarketItemMarket {
  cache_timestamp: (Integer | null);
  cache_delay: (Integer | null);
  total: (Integer | null);
  item: (MarketItemSummary | null);
  listings: Array<MarketListingSummary>;
  extra: Record<string, JsonValue>;
}

export interface MarketItemSummary {
  id: (Integer | null);
  name: (string | null);
  item_type: (string | null);
  average_price: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface MarketListingSummary {
  amount: (Integer | null);
  price: (Integer | null);
  item_details: (MarketItemDetails | null);
  extra: Record<string, JsonValue>;
}

export interface MarketItemDetails {
  uid: (Integer | null);
  rarity: (string | null);
  stats: (MarketItemStats | null);
  bonuses: Array<MarketItemBonus>;
  extra: Record<string, JsonValue>;
}

export interface MarketItemStats {
  damage: (number | null);
  accuracy: (number | null);
  armor: (number | null);
  quality: (number | null);
  extra: Record<string, JsonValue>;
}

export interface MarketItemBonus {
  id: (Integer | null);
  title: (string | null);
  description: (string | null);
  value: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface MarketPropertyCatalog {
  total: (Integer | null);
  listings: Array<MarketPropertyListing>;
  property: (MarketPropertyTypeSummary | null);
  extra: Record<string, JsonValue>;
}

export interface MarketRentalCatalog {
  total: (Integer | null);
  listings: Array<MarketRentalListing>;
  property: (MarketPropertyTypeSummary | null);
  extra: Record<string, JsonValue>;
}

export interface MarketPropertyListing {
  happy: (Integer | null);
  cost: (Integer | null);
  market_price: (Integer | null);
  upkeep: (Integer | null);
  modifications: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface MarketRentalListing {
  happy: (Integer | null);
  cost: (Integer | null);
  cost_per_day: (Integer | null);
  rental_period: (Integer | null);
  market_price: (Integer | null);
  upkeep: (Integer | null);
  modifications: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface MarketPropertyTypeSummary {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface MarketAuctionHouseListing {
  id: (Integer | null);
  seller: (MarketUserSummary | null);
  buyer: (MarketUserSummary | null);
  timestamp: (Integer | null);
  price: (Integer | null);
  bids: (Integer | null);
  item: (MarketAuctionItem | null);
  extra: Record<string, JsonValue>;
}

export interface MarketUserSummary {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface MarketAuctionItem {
  id: (Integer | null);
  uid: (Integer | null);
  name: (string | null);
  item_type: (string | null);
  sub_type: (string | null);
  stats: (MarketItemStats | null);
  bonuses: Array<MarketItemBonus>;
  rarity: (string | null);
  extra: Record<string, JsonValue>;
}

export type MarketMetadata = PaginatedMetadataWithTotal;

export type MarketPaginationLinks = PaginatedLinks;

export interface PropertyLookupBundle {
  selections: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface PropertyBundle {
  property: PropertyDetails;
}

export interface PropertyTimestampBundle {
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface PropertyDetails {
  id: (Integer | null);
  happy: (Integer | null);
  market_price: (Integer | null);
  status: (string | null);
  owner: (PropertyActor | null);
  rented_by: (PropertyActor | null);
  used_by: Array<PropertyActor>;
  staff: Array<PropertyStaffSummary>;
  property: (PropertyTypeSummary | null);
  upkeep: (PropertyUpkeep | null);
  modifications: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface PropertyActor {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface PropertyStaffSummary {
  staff_type: (string | null);
  amount: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface PropertyTypeSummary {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface PropertyUpkeep {
  property: (Integer | null);
  staff: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface RacingCarsBundle {
  cars: Array<RacingCar>;
}

export interface RacingCarUpgradesBundle {
  carupgrades: Array<RacingCarUpgrade>;
}

export interface RacingLookupBundle {
  selections: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface RacingRaceBundle {
  race: RacingRace;
}

export interface RacingRacesBundle {
  races: Array<RacingRace>;
  _metadata: (PaginatedMetadata | null);
}

export interface RacingRecordsBundle {
  records: Array<RacingRecord>;
}

export interface RacingTimestampBundle {
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface RacingTracksBundle {
  tracks: Array<RacingTrack>;
}

export interface RacingCar {
  car_item_id: (Integer | null);
  car_item_name: (string | null);
  top_speed: (Integer | null);
  acceleration: (Integer | null);
  braking: (Integer | null);
  dirt: (Integer | null);
  handling: (Integer | null);
  safety: (Integer | null);
  tarmac: (Integer | null);
  car_class: (string | null);
  extra: Record<string, JsonValue>;
}

export interface RacingCarUpgrade {
  id: (Integer | null);
  class_required: (string | null);
  name: (string | null);
  description: (string | null);
  category: (string | null);
  subcategory: (string | null);
  effects: (RacingCarUpgradeEffects | null);
  cost: (RacingCarUpgradeCost | null);
  extra: Record<string, JsonValue>;
}

export interface RacingCarUpgradeCost {
  points: (Integer | null);
  cash: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface RacingCarUpgradeEffects {
  top_speed: (Integer | null);
  acceleration: (Integer | null);
  braking: (Integer | null);
  handling: (Integer | null);
  safety: (Integer | null);
  dirt: (Integer | null);
  tarmac: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface RacingParticipants {
  minimum: (Integer | null);
  maximum: (Integer | null);
  current: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface RacingRace {
  id: (Integer | null);
  title: (string | null);
  track_id: (Integer | null);
  creator_id: (Integer | null);
  status: (string | null);
  is_official: (boolean | null);
  laps: (Integer | null);
  participants: (RacingParticipants | null);
  requirements: (RacingRequirements | null);
  schedule: (RacingSchedule | null);
  results: Array<RacingResult>;
  extra: Record<string, JsonValue>;
}

export interface RacingRecord {
  driver_id: (Integer | null);
  driver_name: (string | null);
  car_item_id: (Integer | null);
  lap_time: (number | null);
  car_item_name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface RacingRequirements {
  car_class: (string | null);
  car_item_id: (Integer | null);
  driver_class: (string | null);
  join_fee: (Integer | null);
  requires_password: (boolean | null);
  requires_stock_car: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface RacingResult {
  position: (Integer | null);
  driver_id: (Integer | null);
  car_id: (Integer | null);
  car_item_id: (Integer | null);
  car_item_name: (string | null);
  car_class: (string | null);
  race_time: (number | null);
  best_lap_time: (number | null);
  has_crashed: (boolean | null);
  time_ended: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface RacingSchedule {
  join_from: (Integer | null);
  join_until: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface RacingTrack {
  id: (Integer | null);
  title: (string | null);
  description: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornCalendarBundle {
  calendar: TornCalendar;
}

export interface TornItemsBundle {
  items: Array<TornItemSummary>;
}

export interface TornHonorsBundle {
  honors: Array<TornHonorSummary>;
}

export interface TornMedalsBundle {
  medals: Array<TornMedalSummary>;
}

export interface TornLogCategoriesBundle {
  logcategories: Array<TornLogCategory>;
}

export interface TornLogTypesBundle {
  logtypes: Array<TornLogType>;
}

export interface TornMeritsBundle {
  merits: Array<TornMerit>;
}

export interface TornItemAmmoBundle {
  itemammo: Array<TornAmmoItem>;
}

export interface TornItemModsBundle {
  itemmods: Array<TornItemMod>;
}

export interface TornPropertiesBundle {
  properties: Array<TornPropertyCatalogEntry>;
}

export interface TornStocksBundle {
  stocks: Array<TornStockSummary>;
}

export interface TornStockBundle {
  stock: TornStockDetailed;
}

export interface TornBountiesBundle {
  bounties: Array<TornBounty>;
  bounties_timestamp: (Integer | null);
  bounties_delay: (Integer | null);
  _metadata: (PaginatedMetadataWithTotal | null);
}

export interface TornAttackLogBundle {
  attacklog: TornAttackLog;
  _metadata: (PaginatedMetadata | null);
}

export interface TornBankBundle {
  bank: TornBankRates;
}

export interface TornCardsBundle {
  cards: Record<string, TornCard>;
}

export interface TornCityShopsBundle {
  cityshops: Record<string, TornCityShop>;
}

export interface TornCompaniesBundle {
  companies: Record<string, TornCompany>;
}

export interface TornGymsBundle {
  gyms: Record<string, TornGym>;
}

export interface TornPawnshopBundle {
  pawnshop: TornPawnshop;
}

export interface TornPokerTablesBundle {
  pokertables: Record<string, TornPokerTable>;
}

export interface TornLookupBundle {
  selections: Array<string>;
}

export interface TornTimestampBundle {
  timestamp: (Integer | null);
}

export interface TornCompetitionBundle {
  competition: Array<TornCompetitionEntry>;
}

export interface TornCrimesBundle {
  crimes: Array<TornCrime>;
}

export interface TornEducationBundle {
  education: Array<TornEducationCourse>;
}

export interface TornEliminationBundle {
  elimination: (TornDynamicObject | null);
}

export interface TornEliminationTeamBundle {
  eliminationteam: Array<TornEliminationTeamEntry>;
  _metadata: (PaginatedMetadata | null);
}

export interface TornFactionHofBundle {
  factionhof: (TornDynamicObject | null);
}

export interface TornFactionTreeBundle {
  factiontree: (TornDynamicObject | null);
}

export interface TornHofBundle {
  hof: (TornDynamicObject | null);
}

export interface TornOrganisedCrimesBundle {
  organisedcrimes: Record<string, TornOrganisedCrime>;
}

export interface TornOrganizedCrimesBundle {
  organizedcrimes: Array<TornOrganizedCrime>;
}

export interface TornRockPaperScissorsBundle {
  rockpaperscissors: Array<TornCountEntry>;
}

export interface TornSearchForCashBundle {
  searchforcash: Record<string, TornPercentageEntry>;
}

export interface TornShopliftingBundle {
  shoplifting: Record<string, Array<TornShopliftingEntry>>;
}

export interface TornStatsBundle {
  stats: Record<string, DynamicValue>;
}

export interface TornSubcrimesBundle {
  subcrimes: (TornDynamicObject | null);
}

export interface TornTerritoryBundle {
  territory: (TornDynamicObject | null);
}

export interface TornItemDetailsBundle {
  itemdetails: (TornItemDetailsSelection | null);
  _metadata: (PaginatedMetadata | null);
}

export interface TornItemStatsBundle {
  itemstats: TornItemStats;
}

export interface TornEliminationTeamEntry {
  id: (Integer | null);
  name: (string | null);
  rank: (Integer | null);
  score: (number | null);
  extra: Record<string, JsonValue>;
}

export interface TornCompetitionEntry {
  id: (Integer | null);
  name: (string | null);
  competition_type: (string | null);
  title: (string | null);
  status: (string | null);
  start: (Integer | null);
  end: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornCrime {
  id: (Integer | null);
  name: (string | null);
  category: (string | null);
  nerve: (Integer | null);
  notes: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornEducationCourse {
  id: (Integer | null);
  name: (string | null);
  description: (string | null);
  money_cost: (Integer | null);
  tier: (Integer | null);
  duration: (Integer | null);
  results: Array<string>;
  prerequisites: Array<Integer>;
  extra: Record<string, JsonValue>;
}

export interface TornOrganisedCrime {
  id: (Integer | null);
  name: (string | null);
  members: (Integer | null);
  time: (Integer | null);
  cost: (Integer | null);
  success_chance: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornOrganizedCrime {
  id: (Integer | null);
  name: (string | null);
  difficulty: (Integer | null);
  scope: (string | null);
  slots: Array<TornOrganizedCrimeSlot>;
  extra: Record<string, JsonValue>;
}

export interface TornOrganizedCrimeSlot {
  position_info: (TornOrganizedCrimePositionInfo | null);
  position: (string | null);
  item_requirement: (DynamicValue | null);
  extra: Record<string, JsonValue>;
}

export interface TornOrganizedCrimePositionInfo {
  id: (string | null);
  label: (string | null);
  number: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornItemDetailsSelection {
  id: (Integer | null);
  name: (string | null);
  item_type: (string | null);
  details: (DynamicValue | null);
  items: Array<TornItemSummary>;
  extra: Record<string, JsonValue>;
}

export interface TornCalendar {
  competitions: Array<TornCalendarEntry>;
  events: Array<TornCalendarEntry>;
  extra: Record<string, JsonValue>;
}

export interface TornCalendarEntry {
  title: (string | null);
  description: (string | null);
  start: (Integer | null);
  end: (Integer | null);
  fixed_start_time: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface TornItemSummary {
  id: (Integer | null);
  name: (string | null);
  item_type: (string | null);
  circulation: (Integer | null);
  is_tradable: (boolean | null);
  is_found_in_city: (boolean | null);
  description: (string | null);
  details: (TornItemDetails | null);
  extra: Record<string, JsonValue>;
}

export interface TornItemDetails {
  category: (string | null);
  base_stats: (TornItemBaseStats | null);
  extra: Record<string, JsonValue>;
}

export interface TornItemBaseStats {
  damage: (number | null);
  accuracy: (number | null);
  armor: (number | null);
  extra: Record<string, JsonValue>;
}

export interface TornHonorSummary {
  id: (Integer | null);
  name: (string | null);
  description: (string | null);
  rarity: (string | null);
  circulation: (Integer | null);
  equipped: (boolean | null);
  honor_type: (TornAwardType | null);
  extra: Record<string, JsonValue>;
}

export interface TornMedalSummary {
  id: (Integer | null);
  name: (string | null);
  description: (string | null);
  rarity: (string | null);
  circulation: (Integer | null);
  medal_type: (TornAwardType | null);
  extra: Record<string, JsonValue>;
}

export interface TornAwardType {
  id: (Integer | null);
  title: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornLogCategory {
  id: (Integer | null);
  title: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornLogType {
  id: (Integer | null);
  title: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornMerit {
  id: (Integer | null);
  name: (string | null);
  description: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornAmmoItem {
  id: (Integer | null);
  name: (string | null);
  price: (Integer | null);
  types: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface TornItemMod {
  id: (Integer | null);
  name: (string | null);
  image: (string | null);
  description: (string | null);
  dual_fit: (boolean | null);
  weapons: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface TornPropertyCatalogEntry {
  id: (Integer | null);
  name: (string | null);
  cost: (Integer | null);
  happy: (Integer | null);
  upkeep: (Integer | null);
  modifications: Array<string>;
  staff: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface TornStockSummary {
  id: (Integer | null);
  name: (string | null);
  acronym: (string | null);
  images: (TornStockImages | null);
  market: (TornStockMarket | null);
  bonus: (TornStockBonus | null);
  extra: Record<string, JsonValue>;
}

export interface TornStockDetailed {
  id: (Integer | null);
  name: (string | null);
  acronym: (string | null);
  images: (TornStockImages | null);
  market: (TornStockMarket | null);
  bonus: (TornStockBonus | null);
  chart: (TornStockChart | null);
  extra: Record<string, JsonValue>;
}

export interface TornStockImages {
  logo: (string | null);
  full: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornStockMarket {
  price: (number | null);
  cap: (Integer | null);
  shares: (Integer | null);
  investors: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornStockBonus {
  passive: (boolean | null);
  frequency: (Integer | null);
  requirement: (Integer | null);
  description: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornStockChart {
  performance: (TornStockPerformance | null);
  history: Array<TornStockHistoryEntry>;
  extra: Record<string, JsonValue>;
}

export interface TornStockPerformance {
  last_hour: (TornStockPerformanceWindow | null);
  last_day: (TornStockPerformanceWindow | null);
  last_week: (TornStockPerformanceWindow | null);
  last_month: (TornStockPerformanceWindow | null);
  last_year: (TornStockPerformanceWindow | null);
  all_time: (TornStockPerformanceWindow | null);
  extra: Record<string, JsonValue>;
}

export interface TornStockPerformanceWindow {
  change: (number | null);
  change_percentage: (number | null);
  start: (number | null);
  end: (number | null);
  high: (number | null);
  low: (number | null);
  extra: Record<string, JsonValue>;
}

export interface TornStockHistoryEntry {
  timestamp: (Integer | null);
  price: (number | null);
  change: (number | null);
  extra: Record<string, JsonValue>;
}

export interface TornBounty {
  target_id: (Integer | null);
  target_name: (string | null);
  target_level: (Integer | null);
  lister_id: (Integer | null);
  lister_name: (string | null);
  reward: (Integer | null);
  reason: (string | null);
  quantity: (Integer | null);
  is_anonymous: (boolean | null);
  valid_until: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornAttackLog {
  log: Array<TornAttackLogEntry>;
  summary: Array<TornAttackLogSummary>;
  extra: Record<string, JsonValue>;
}

export interface TornAttackLogSummary {
  id: (Integer | null);
  name: (string | null);
  hits: (Integer | null);
  misses: (Integer | null);
  damage: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornAttackLogEntry {
  text: (string | null);
  timestamp: (Integer | null);
  action: (string | null);
  icon: (string | null);
  attacker: (TornAttackParticipant | null);
  defender: (TornAttackParticipant | null);
  attacker_item: (TornAttackItem | null);
  extra: Record<string, JsonValue>;
}

export interface TornAttackParticipant {
  id: (Integer | null);
  name: (string | null);
  item: (TornAttackItem | null);
  extra: Record<string, JsonValue>;
}

export interface TornAttackItem {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornBankRates {
  one_week: (number | null);
  two_weeks: (number | null);
  one_month: (number | null);
  two_months: (number | null);
  three_months: (number | null);
  extra: Record<string, JsonValue>;
}

export interface TornCard {
  name: (string | null);
  short: (TornCardShort | null);
  rank: (Integer | null);
  css_class: (string | null);
  extra: Record<string, JsonValue>;
}

export type TornCardShort = Integer | string;

export interface TornCityShop {
  name: (string | null);
  inventory: Record<string, TornCityShopItem>;
  extra: Record<string, JsonValue>;
}

export interface TornCityShopItem {
  name: (string | null);
  item_type: (string | null);
  price: (Integer | null);
  in_stock: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornCompany {
  name: (string | null);
  cost: (Integer | null);
  default_employees: (Integer | null);
  positions: Record<string, TornCompanyPosition>;
  extra: Record<string, JsonValue>;
}

export interface TornCompanyPosition {
  man_required: (Integer | null);
  int_required: (Integer | null);
  end_required: (Integer | null);
  man_gain: (Integer | null);
  int_gain: (Integer | null);
  end_gain: (Integer | null);
  special_ability: (string | null);
  description: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornGym {
  name: (string | null);
  stage: (Integer | null);
  cost: (Integer | null);
  energy: (Integer | null);
  strength: (Integer | null);
  speed: (Integer | null);
  defense: (Integer | null);
  dexterity: (Integer | null);
  note: (string | null);
  extra: Record<string, JsonValue>;
}

export interface TornPawnshop {
  points_value: (Integer | null);
  donatorpack_value: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornPokerTable {
  name: (string | null);
  big_blind: (Integer | null);
  small_blind: (Integer | null);
  speed: (Integer | null);
  current_players: (Integer | null);
  maximum_players: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornItemStats {
  armory_id: (Integer | null);
  id: (Integer | null);
  sell: (Integer | null);
  qty: (Integer | null);
  sell_total: (Integer | null);
  name: (string | null);
  type2: (string | null);
  dmg: (number | null);
  damage: (number | null);
  accuracy: (number | null);
  acc: (number | null);
  arm: (number | null);
  weptype: (string | null);
  uid: (Integer | null);
  item_type: (string | null);
  original_type: (string | null);
  market_price: (Integer | null);
  stats: Array<DynamicValue>;
  extra: Record<string, JsonValue>;
}

export interface TornCountEntry {
  entry_type: (string | null);
  count: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TornPercentageEntry {
  title: (string | null);
  percentage: (number | null);
  extra: Record<string, JsonValue>;
}

export interface TornShopliftingEntry {
  title: (string | null);
  disabled: (boolean | null);
  extra: Record<string, JsonValue>;
}

export type TornDynamicObject = Record<string, DynamicValue>;

export interface UserProfileBundle {
  profile: UserProfile;
}

export interface UserBasicBundle {
  profile: UserBasicProfile;
}

export interface UserDiscordBundle {
  discord: UserDiscord;
}

export interface UserCasinoBundle {
  casino: UserCasino;
}

export interface UserFactionBundle {
  faction: UserFaction;
}

export interface UserMoneyBundle {
  money: UserMoney;
}

export interface UserBarsBundle {
  bars: UserBars;
}

export interface UserCooldownsBundle {
  cooldowns: UserCooldowns;
}

export interface UserAmmoBundle {
  ammo: Array<UserAmmoItem>;
}

export interface UserBattleStatsBundle {
  battlestats: UserBattleStats;
}

export interface UserEquipmentBundle {
  equipment: Array<UserEquipmentItem>;
  clothing: Array<UserClothingItem>;
}

export interface UserItemModsBundle {
  itemmods: Array<TornItemMod>;
}

export interface UserMissionsBundle {
  missions: UserMissions;
}

export interface UserTimestampBundle {
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserNotificationsBundle {
  notifications: UserNotifications;
}

export interface UserIconsBundle {
  icons: Array<UserIcon>;
}

export interface UserEnlistedCarsBundle {
  enlistedcars: Array<UserEnlistedCar>;
}

export interface UserJobBundle {
  job: (UserEmployment | null);
}

export interface UserJobPointsBundle {
  jobpoints: UserJobPoints;
}

export interface UserJobRanksBundle {
  jobranks: UserJobRanks;
}

export interface UserRefillsBundle {
  refills: UserRefills;
}

export interface UserSkillsBundle {
  skills: Array<UserSkill>;
}

export interface UserStocksBundle {
  stocks: Array<UserStockHolding>;
}

export interface UserCalendarBundle {
  calendar: UserCalendar;
}

export interface UserLookupBundle {
  selections: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface UserFactionBalanceBundle {
  faction_balance: (UserFactionBalance | null);
}

export interface UserEducationBundle {
  education: UserEducation;
}

export interface UserCompetitionBundle {
  competition: (UserCompetition | null);
}

export interface UserWeaponExpBundle {
  weaponexp: Array<UserWeaponExpEntry>;
}

export interface UserRacingRecordsBundle {
  racingrecords: Array<UserRacingRecordSummary>;
}

export interface UserHonorsBundle {
  honors: Array<UserAwardUnlock>;
}

export interface UserMedalsBundle {
  medals: Array<UserAwardUnlock>;
}

export interface UserInventoryBundle {
  inventory: UserInventory;
  _metadata: (PaginatedMetadataWithTotal | null);
}

export interface UserTradesBundle {
  trades: Array<UserTrade>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserTradeBundle {
  trade: UserTradeDetailed;
}

export interface UserTravelBundle {
  travel: UserTravel;
}

export interface UserDisplayBundle {
  display: Array<UserLegacyItemSummary>;
  extra: Record<string, JsonValue>;
}

export interface UserGymBundle {
  active_gym: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserPerksBundle {
  faction_perks: Array<string>;
  job_perks: Array<string>;
  property_perks: Array<string>;
  education_perks: Array<string>;
  enhancer_perks: Array<string>;
  book_perks: Array<string>;
  stock_perks: Array<string>;
  merit_perks: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface UserCriminalRecordBundle {
  criminalrecord: UserCriminalRecord;
}

export interface UserBazaarBundle {
  bazaar_is_open: (boolean | null);
  bazaar: Array<UserLegacyItemSummary>;
  extra: Record<string, JsonValue>;
}

export interface UserReportsBundle {
  reports: Array<UserReportSummary>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserCrimesBundle {
  crimes: UserCrimeSummary;
}

export interface UserListBundle {
  list: Array<UserListEntry>;
  _metadata: (PaginatedMetadataWithTotal | null);
}

export interface UserLogBundle {
  log: Array<UserLogEntry>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserNetworthBundle {
  networth: UserNetworth;
}

export interface UserPersonalStatsBundle {
  personalstats: (UserPersonalStatsSelection | null);
}

export interface UserEventsBundle {
  events: Array<UserEvent>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserNewEventsBundle {
  events: Array<UserEvent>;
}

export interface UserMessagesBundle {
  messages: Array<UserMessage>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserNewMessagesBundle {
  messages: Array<UserMessage>;
}

export interface UserRacesBundle {
  races: Array<UserRace>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserAttacksBundle {
  attacks: Array<UserAttack>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserAttacksFullBundle {
  attacks: Array<UserAttackFull>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserRevivesBundle {
  revives: Array<UserRevive>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserRevivesFullBundle {
  revives: Array<UserReviveFull>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserHofBundle {
  hof: UserHofStats;
}

export interface UserBountiesBundle {
  bounties: Array<UserBounty>;
  bounties_timestamp: (Integer | null);
  bounties_delay: (Integer | null);
}

export interface UserPropertiesBundle {
  properties: Array<UserPropertySummary>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserPropertyBundle {
  property: UserPropertySummary;
}

export interface UserForumThreadsBundle {
  forum_threads: Array<ForumThread>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserForumPostsBundle {
  forum_posts: Array<ForumPost>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserForumSubscribedThreadsBundle {
  forum_subscribed_threads: Array<UserForumSubscribedThread>;
}

export interface UserForumFeedBundle {
  forum_feed: Array<UserForumFeedEntry>;
}

export interface UserForumFriendsBundle {
  forum_friends: Array<UserForumFeedEntry>;
}

export interface UserWorkStatsBundle {
  workstats: UserWorkStats;
}

export interface UserMeritsBundle {
  merits: UserMerits;
}

export interface UserItemMarketBundle {
  itemmarket: Array<UserItemMarketListing>;
  _metadata: (PaginatedMetadata | null);
}

export interface UserOrganizedCrimeBundle {
  organized_crime: (UserOrganizedCrimeSelection | null);
}

export interface UserLegacyItemSummary {
  id: (Integer | null);
  uid: (Integer | null);
  name: (string | null);
  item_type: (string | null);
  quantity: (Integer | null);
  circulation: (Integer | null);
  market_price: (Integer | null);
  cost: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCriminalRecord {
  vandalism: (Integer | null);
  theft: (Integer | null);
  counterfeiting: (Integer | null);
  fraud: (Integer | null);
  illicitservices: (Integer | null);
  cybercrime: (Integer | null);
  extortion: (Integer | null);
  illegalproduction: (Integer | null);
  total: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserReportSummary {
  report_type: (string | null);
  target_id: (Integer | null);
  reporter_id: (Integer | null);
  faction_id: (Integer | null);
  timestamp: (Integer | null);
  report: UserReportDetails;
  extra: Record<string, JsonValue>;
}

export interface UserCrimeSummary {
  nerve_spent: (Integer | null);
  skill: (Integer | null);
  progression_bonus: (Integer | null);
  rewards: (UserCrimeRewards | null);
  attempts: (UserCrimeAttempts | null);
  uniques: Array<UserCrimeUnique>;
  miscellaneous: (UserCrimeMiscellaneous | null);
  extra: Record<string, JsonValue>;
}

export interface UserCrimeRewards {
  money: (Integer | null);
  ammo: (UserCrimeRewardAmmo | null);
  items: Array<UserCrimeRewardItem>;
  extra: Record<string, JsonValue>;
}

export interface UserCrimeRewardAmmo {
  standard: (Integer | null);
  special: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCrimeRewardItem {
  id: (Integer | null);
  amount: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCrimeAttempts {
  total: (Integer | null);
  success: (Integer | null);
  fail: (Integer | null);
  critical_fail: (Integer | null);
  subcrimes: Array<UserCrimeAttemptSubcrime>;
  extra: Record<string, JsonValue>;
}

export interface UserCrimeAttemptSubcrime {
  id: (Integer | null);
  total: (Integer | null);
  success: (Integer | null);
  fail: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCrimeUnique {
  id: (Integer | null);
  rewards: (UserCrimeUniqueRewards | null);
  extra: Record<string, JsonValue>;
}

export interface UserCrimeUniqueRewards {
  money: (Integer | null);
  ammo: (UserCrimeRewardAmmo | null);
  items: Array<UserCrimeRewardItem>;
  extra: Record<string, JsonValue>;
}

export interface UserListEntry {
  id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  faction_id: (Integer | null);
  status: (UserStatus | null);
  last_action: (UserLastAction | null);
  extra: Record<string, JsonValue>;
}

export interface UserLogEntry {
  id: (string | null);
  timestamp: (Integer | null);
  details: (UserLogDetails | null);
  data: DynamicValue;
  params: DynamicValue;
  extra: Record<string, JsonValue>;
}

export interface UserLogDetails {
  id: (Integer | null);
  title: (string | null);
  category: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserReportDetails {
  fields: Record<string, DynamicValue>;
  get(field: string): DynamicValue | undefined;
}

export interface UserCrimeMiscellaneous {
  fields: Record<string, DynamicValue>;
}

export interface UserNetworth {
  pending: (Integer | null);
  wallet: (Integer | null);
  bank: (Integer | null);
  points: (Integer | null);
  cayman: (Integer | null);
  vault: (Integer | null);
  piggybank: (Integer | null);
  items: (Integer | null);
  displaycase: (Integer | null);
  bazaar: (Integer | null);
  trade: (Integer | null);
  itemmarket: (Integer | null);
  properties: (Integer | null);
  stockmarket: (Integer | null);
  auctionhouse: (Integer | null);
  company: (Integer | null);
  bookie: (Integer | null);
  enlistedcars: (Integer | null);
  loan: (Integer | null);
  unpaidfees: (Integer | null);
  total: (Integer | null);
  parsetime: (number | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export type UserPersonalStatsSelection = UserPersonalStatsCategory | Array<UserPersonalStatPoint> | JsonValue;

export interface UserPersonalStatsCategory {
  attacking: (UserPersonalStatsBucket | null);
  jobs: (UserPersonalStatsBucket | null);
  hospital: (UserPersonalStatsBucket | null);
  crimes: (UserPersonalStatsBucket | null);
  items: (UserPersonalStatsBucket | null);
  travel: (UserPersonalStatsBucket | null);
  drugs: (UserPersonalStatsBucket | null);
  networth: (UserPersonalStatsBucket | null);
  other: (UserPersonalStatsBucket | null);
  extra: Record<string, JsonValue>;
}

export interface UserPersonalStatsBucket {
  stats: Record<string, DynamicValue>;
  get(stat: string): DynamicValue | undefined;
}

export interface UserPersonalStatPoint {
  name: (string | null);
  value: (Integer | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserProfile {
  donator_status: (Generated.UserDonatorStatusEnum | null);
  revive_setting: (Generated.ReviveSetting | null);
  id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  rank: (string | null);
  faction_id: (Integer | null);
  age: (Integer | null);
  karma: (Integer | null);
  revivable: (boolean | null);
  life: (UserLifeBar | null);
  last_action: (UserLastAction | null);
  extra: Record<string, JsonValue>;
}

export interface UserBasicProfile {
  id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  gender: (string | null);
  status: (UserStatus | null);
  extra: Record<string, JsonValue>;
}

export interface UserStatus {
  state: (string | null);
  color: (string | null);
  description: (string | null);
  details: (string | null);
  plane_image_type: (string | null);
  until: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserDiscord {
  discord_id: (string | null);
  user_id: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCasino {
  tokens: (Integer | null);
  streak: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserFaction {
  id: (Integer | null);
  name: (string | null);
  position: (string | null);
  tag: (string | null);
  tag_image: (string | null);
  days_in_faction: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserMoney {
  wallet: (Integer | null);
  vault: (Integer | null);
  company: (Integer | null);
  points: (Integer | null);
  cayman_bank: (Integer | null);
  daily_networth: (Integer | null);
  city_bank: (UserCityBank | null);
  faction: (UserFactionMoney | null);
  extra: Record<string, JsonValue>;
}

export interface UserCityBank {
  amount: (Integer | null);
  duration: (Integer | null);
  interest_rate: (number | null);
  invested_at: (Integer | null);
  profit: (Integer | null);
  until: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserFactionMoney {
  money: (Integer | null);
  points: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserEquipmentItem {
  id: (Integer | null);
  name: (string | null);
  uid: (Integer | null);
  item_type: (string | null);
  sub_type: (string | null);
  stats: (UserItemMarketItemStats | null);
  bonuses: Array<UserItemMarketItemBonus>;
  rarity: (string | null);
  slot: (Integer | null);
  ammo: (UserEquipmentAmmo | null);
  mods: Array<UserEquipmentMod>;
  extra: Record<string, JsonValue>;
}

export interface UserEquipmentAmmo {
  id: (Integer | null);
  name: (string | null);
  ammo_type: (string | null);
  quantity: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserEquipmentMod {
  id: (Integer | null);
  name: (string | null);
  image: (string | null);
  description: (string | null);
  dual_fit: (boolean | null);
  weapons: Array<string>;
  extra: Record<string, JsonValue>;
}

export interface UserClothingItem {
  id: (Integer | null);
  name: (string | null);
  uid: (Integer | null);
  item_type: (string | null);
  sub_type: (string | null);
  slot: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserBars {
  energy: (UserResourceBar | null);
  happy: (UserResourceBar | null);
  life: (UserLifeBar | null);
  nerve: (UserResourceBar | null);
  chain: (UserChainBar | null);
  extra: Record<string, JsonValue>;
}

export interface UserResourceBar {
  increment: (Integer | null);
  interval: (Integer | null);
  tick_time: (Integer | null);
  full_time: (Integer | null);
  current: (Integer | null);
  maximum: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserLifeBar {
  increment: (Integer | null);
  interval: (Integer | null);
  tick_time: (Integer | null);
  full_time: (Integer | null);
  current: (Integer | null);
  maximum: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserChainBar {
  id: (Integer | null);
  current: (Integer | null);
  max: (Integer | null);
  modifier: (number | null);
  cooldown: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  timeout: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCooldowns {
  booster: (Integer | null);
  drug: (Integer | null);
  medical: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserAmmoItem {
  id: (Integer | null);
  name: (string | null);
  types: Array<UserAmmoVariant>;
  extra: Record<string, JsonValue>;
}

export interface UserAmmoVariant {
  name: (string | null);
  quantity: (Integer | null);
  equipped: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface UserBattleStats {
  strength: (UserBattleStat | null);
  defense: (UserBattleStat | null);
  speed: (UserBattleStat | null);
  dexterity: (UserBattleStat | null);
  total: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserBattleStat {
  value: (Integer | null);
  modifier: (number | null);
  modifiers: Array<UserBattleStatModifier>;
  extra: Record<string, JsonValue>;
}

export interface UserBattleStatModifier {
  effect: (string | null);
  value: (number | null);
  modifier_type: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserNotifications {
  messages: (Integer | null);
  events: (Integer | null);
  awards: (Integer | null);
  competition: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserIcon {
  id: (Integer | null);
  title: (string | null);
  description: (string | null);
  until: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserEnlistedCar {
  id: (Integer | null);
  car_item_id: (Integer | null);
  car_item_name: (string | null);
  car_name: (string | null);
  top_speed: (Integer | null);
  acceleration: (Integer | null);
  braking: (Integer | null);
  dirt: (Integer | null);
  handling: (Integer | null);
  safety: (Integer | null);
  tarmac: (Integer | null);
  car_class: (string | null);
  worth: (Integer | null);
  points_spent: (Integer | null);
  races_entered: (Integer | null);
  races_won: (Integer | null);
  is_removed: (boolean | null);
  parts: Array<Integer>;
  extra: Record<string, JsonValue>;
}

export type UserEmployment = UserCityJob | UserCompanyJob | UnknownUserEmployment;

export interface UserCityJob {
  job_type: (string | null);
  name: (string | null);
  position: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserCompanyJob {
  job_type: (string | null);
  id: (Integer | null);
  type_id: (Integer | null);
  name: (string | null);
  rating: (Integer | null);
  position: (string | null);
  days_in_company: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UnknownUserEmployment {
  job_type: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserJobPoints {
  jobs: (UserJobPointTotals | null);
  companies: Array<UserCompanyPoints>;
  extra: Record<string, JsonValue>;
}

export interface UserJobPointTotals {
  army: (Integer | null);
  casino: (Integer | null);
  education: (Integer | null);
  grocer: (Integer | null);
  law: (Integer | null);
  medical: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCompanyPoints {
  company: (UserCompanyPointCompany | null);
  points: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCompanyPointCompany {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserJobRanks {
  army: (string | null);
  grocer: (string | null);
  casino: (string | null);
  medical: (string | null);
  law: (string | null);
  education: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserRefills {
  energy: (boolean | null);
  nerve: (boolean | null);
  token: (boolean | null);
  special_count: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserSkill {
  slug: (string | null);
  name: (string | null);
  level: (number | null);
  extra: Record<string, JsonValue>;
}

export interface UserStockHolding {
  id: (Integer | null);
  shares: (Integer | null);
  transactions: Array<UserStockTransaction>;
  bonus: (UserStockBonus | null);
  extra: Record<string, JsonValue>;
}

export interface UserStockTransaction {
  id: (Integer | null);
  shares: (Integer | null);
  price: (number | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserStockBonus {
  available: (boolean | null);
  increment: (Integer | null);
  progress: (Integer | null);
  frequency: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserCalendar {
  start_time: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserFactionBalance {
  money: (Integer | null);
  points: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserMissions {
  credits: (Integer | null);
  givers: Array<UserMissionGiver>;
  rewards: Array<UserMissionReward>;
  extra: Record<string, JsonValue>;
}

export interface UserMissionGiver {
  id: (Integer | null);
  name: (string | null);
  contracts: Array<UserMissionContract>;
  extra: Record<string, JsonValue>;
}

export interface UserMissionContract {
  title: (string | null);
  difficulty: (string | null);
  status: (string | null);
  created_at: (Integer | null);
  started_at: (Integer | null);
  expires_at: (Integer | null);
  completed_at: (Integer | null);
  rewards: (UserMissionContractRewards | null);
  extra: Record<string, JsonValue>;
}

export interface UserMissionContractRewards {
  money: (Integer | null);
  credits: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserMissionReward {
  reward_type: (string | null);
  details: (UserMissionRewardDetails | null);
  amount: (Integer | null);
  cost: (Integer | null);
  expires_at: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserMissionRewardDetails {
  id: (Integer | null);
  name: (string | null);
  detail_type: (string | null);
  sub_type: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserEducation {
  complete: Array<Integer>;
  current: (UserCurrentEducation | null);
  extra: Record<string, JsonValue>;
}

export interface UserCurrentEducation {
  id: (Integer | null);
  until: (Integer | null);
  extra: Record<string, JsonValue>;
}

export type UserCompetition = UserHalloweenCompetition | UserEasterCompetition | UserRpsCompetition | UserEliminationCompetition | UnknownUserCompetition;

export interface UserHalloweenCompetition {
  name: (string | null);
  treats_collected: (Integer | null);
  basket: (UserCompetitionBasket | null);
  extra: Record<string, JsonValue>;
}

export interface UserEasterCompetition {
  name: (string | null);
  score: (Integer | null);
  total: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserRpsCompetition {
  name: (string | null);
  status: (string | null);
  hp: (UserCompetitionHp | null);
  extra: Record<string, JsonValue>;
}

export interface UserEliminationCompetition {
  name: (string | null);
  score: (Integer | null);
  attacks: (Integer | null);
  team: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserCompetitionBasket {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserCompetitionHp {
  current: (Integer | null);
  maximum: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UnknownUserCompetition {
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserWeaponExpEntry {
  id: (Integer | null);
  name: (string | null);
  exp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserRacingRecordSummary {
  track: (UserRaceTrackSummary | null);
  records: Array<UserRacingLapRecord>;
  extra: Record<string, JsonValue>;
}

export interface UserRaceTrackSummary {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserRacingLapRecord {
  car_id: (Integer | null);
  car_name: (string | null);
  lap_time: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserAwardUnlock {
  id: (Integer | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserInventory {
  items: Array<UserInventoryItem>;
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserInventoryItem {
  id: (Integer | null);
  amount: (Integer | null);
  equipped: (boolean | null);
  name: (string | null);
  faction_owned: (boolean | null);
  uid: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserTravel {
  destination: (string | null);
  method: (string | null);
  time_left: (Integer | null);
  arrival_at: (Integer | null);
  departed_at: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserEvent {
  id: (string | null);
  timestamp: (Integer | null);
  text: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserMessage {
  id: (Integer | null);
  sender: (UserIdentitySummary | null);
  timestamp: (Integer | null);
  topic: (string | null);
  message_type: (string | null);
  seen: (boolean | null);
  read: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface UserIdentitySummary {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserRace {
  id: (Integer | null);
  title: (string | null);
  track_id: (Integer | null);
  creator_id: (Integer | null);
  status: (string | null);
  laps: (Integer | null);
  participants: (UserRaceParticipants | null);
  schedule: (UserRaceSchedule | null);
  requirements: (UserRaceRequirements | null);
  is_official: (boolean | null);
  skill_gain: (number | null);
  results: Array<UserRaceResult>;
  extra: Record<string, JsonValue>;
}

export interface UserRaceParticipants {
  minimum: (Integer | null);
  maximum: (Integer | null);
  current: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserRaceSchedule {
  join_from: (Integer | null);
  join_until: (Integer | null);
  start: (Integer | null);
  end: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserRaceRequirements {
  driver_class: (string | null);
  car_class: (string | null);
  car_item_id: (Integer | null);
  requires_stock_car: (boolean | null);
  requires_password: (boolean | null);
  join_fee: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserRaceResult {
  driver_id: (Integer | null);
  position: (Integer | null);
  car_id: (Integer | null);
  car_item_id: (Integer | null);
  car_item_name: (string | null);
  car_class: (string | null);
  has_crashed: (boolean | null);
  best_lap_time: (number | null);
  race_time: (number | null);
  time_ended: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserAttack {
  is_territory_war: (boolean | null);
  territory_war_id: (Integer | null);
  id: (Integer | null);
  code: (string | null);
  started: (Integer | null);
  ended: (Integer | null);
  attacker: (UserAttackCombatant | null);
  defender: (UserAttackCombatant | null);
  result: (string | null);
  respect_gain: (number | null);
  respect_loss: (number | null);
  chain: (Integer | null);
  is_interrupted: (boolean | null);
  is_stealthed: (boolean | null);
  is_raid: (boolean | null);
  is_ranked_war: (boolean | null);
  modifiers: (UserAttackModifiers | null);
  finishing_hit_effects: Array<UserAttackFinishingHitEffect>;
  extra: Record<string, JsonValue>;
}

export interface UserAttackFull {
  id: (Integer | null);
  code: (string | null);
  started: (Integer | null);
  ended: (Integer | null);
  attacker: (UserAttackCombatant | null);
  defender: (UserAttackCombatant | null);
  result: (string | null);
  respect_gain: (number | null);
  respect_loss: (number | null);
  extra: Record<string, JsonValue>;
}

export interface UserAttackCombatant {
  id: (Integer | null);
  name: (string | null);
  level: (Integer | null);
  faction: (UserAttackFaction | null);
  faction_id: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserAttackFaction {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserAttackModifiers {
  fair_fight: (number | null);
  war: (number | null);
  retaliation: (number | null);
  group: (number | null);
  overseas: (number | null);
  chain: (number | null);
  warlord: (number | null);
  extra: Record<string, JsonValue>;
}

export interface UserAttackFinishingHitEffect {
  name: (string | null);
  value: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserRevive {
  id: (Integer | null);
  reviver: (UserReviveReviver | null);
  target: (UserReviveTarget | null);
  success_chance: (number | null);
  result: (string | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserReviveFull {
  id: (Integer | null);
  reviver: (UserReviveReviver | null);
  target: (UserReviveTarget | null);
  success_chance: (number | null);
  result: (string | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserReviveReviver {
  id: (Integer | null);
  name: (string | null);
  faction: (UserAttackFaction | null);
  faction_id: (Integer | null);
  skill: (number | null);
  extra: Record<string, JsonValue>;
}

export interface UserReviveTarget {
  id: (Integer | null);
  name: (string | null);
  faction: (UserAttackFaction | null);
  faction_id: (Integer | null);
  hospital_reason: (string | null);
  early_discharge: (boolean | null);
  last_action: (UserReviveLastAction | null);
  online_status: (string | null);
  extra: Record<string, JsonValue>;
}

export type UserReviveLastAction = UserLastAction | Integer | JsonValue;

export interface UserHofStats {
  attacks: (UserHofValue | null);
  busts: (UserHofValue | null);
  defends: (UserHofValue | null);
  networth: (UserHofValue | null);
  offences: (UserHofValue | null);
  revives: (UserHofValue | null);
  level: (UserHofValue | null);
  rank: (UserHofValue | null);
  awards: (UserHofValue | null);
  racing_skill: (UserHofValueFloat | null);
  racing_points: (UserHofValue | null);
  racing_wins: (UserHofValue | null);
  travel_time: (UserHofValue | null);
  working_stats: (UserHofValue | null);
  battle_stats: (UserHofValue | null);
  extra: Record<string, JsonValue>;
}

export interface UserHofValue {
  value: (Integer | null);
  rank: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserHofValueFloat {
  value: (number | null);
  rank: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserBounty {
  target_id: (Integer | null);
  target_name: (string | null);
  target_level: (Integer | null);
  lister_id: (Integer | null);
  lister_name: (string | null);
  reward: (Integer | null);
  reason: (string | null);
  quantity: (Integer | null);
  is_anonymous: (boolean | null);
  valid_until: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserPropertySummary {
  id: (Integer | null);
  owner: (UserIdentitySummary | null);
  property_info: (UserPropertyKind | null);
  happy: (Integer | null);
  upkeep: (UserPropertyUpkeep | null);
  market_price: (Integer | null);
  modifications: Array<string>;
  staff: Array<UserPropertyStaffEntry>;
  status: (string | null);
  used_by: Array<UserIdentitySummary>;
  cost: (Integer | null);
  cost_per_day: (Integer | null);
  rental_period: (Integer | null);
  rental_period_remaining: (Integer | null);
  rented_by: (UserIdentitySummary | null);
  renter_asked: (UserIdentitySummary | null);
  lease_extension: (UserPropertyLeaseExtension | null);
  extra: Record<string, JsonValue>;
}

export interface UserPropertyKind {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserPropertyUpkeep {
  property_cost: (Integer | null);
  staff: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserPropertyStaffEntry {
  staff_type: (string | null);
  amount: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserPropertyLeaseExtension {
  cost: (Integer | null);
  period: (Integer | null);
  created_at: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserForumSubscribedThread {
  id: (Integer | null);
  forum_id: (Integer | null);
  author: (ForumUserSummary | null);
  title: (string | null);
  posts: (UserForumSubscribedThreadPosts | null);
  extra: Record<string, JsonValue>;
}

export interface UserForumSubscribedThreadPosts {
  new_posts: (Integer | null);
  total: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserForumFeedEntry {
  thread_id: (Integer | null);
  post_id: (Integer | null);
  user: (ForumUserSummary | null);
  title: (string | null);
  text: (string | null);
  timestamp: (Integer | null);
  is_seen: (boolean | null);
  entry_type: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserWorkStats {
  endurance: (Integer | null);
  intelligence: (Integer | null);
  manual_labor: (Integer | null);
  total: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserMerits {
  upgrades: Array<UserMeritUpgrade>;
  available: (Integer | null);
  used: (Integer | null);
  medals: (Integer | null);
  honors: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserMeritUpgrade {
  id: (Integer | null);
  level: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserItemMarketListing {
  id: (Integer | null);
  price: (Integer | null);
  average_price: (Integer | null);
  amount: (Integer | null);
  is_anonymous: (boolean | null);
  available: (Integer | null);
  item: (UserItemMarketItemDetails | null);
  extra: Record<string, JsonValue>;
}

export interface UserItemMarketItemDetails {
  id: (Integer | null);
  name: (string | null);
  item_type: (string | null);
  rarity: (string | null);
  uid: (Integer | null);
  stats: (UserItemMarketItemStats | null);
  bonuses: Array<UserItemMarketItemBonus>;
  extra: Record<string, JsonValue>;
}

export interface UserItemMarketItemStats {
  damage: (number | null);
  accuracy: (number | null);
  armor: (number | null);
  quality: (number | null);
  extra: Record<string, JsonValue>;
}

export interface UserItemMarketItemBonus {
  id: (Integer | null);
  title: (string | null);
  description: (string | null);
  value: (Integer | null);
  extra: Record<string, JsonValue>;
}

export type UserOrganizedCrimeSelection = UserOrganizedCrime | UserOrganizedCrimeError;

export interface UserOrganizedCrime {
  id: (Integer | null);
  previous_crime_id: (Integer | null);
  name: (string | null);
  difficulty: (Integer | null);
  status: (string | null);
  created_at: (Integer | null);
  planning_at: (Integer | null);
  ready_at: (Integer | null);
  expired_at: (Integer | null);
  executed_at: (Integer | null);
  slots: Array<UserOrganizedCrimeSlot>;
  rewards: (UserOrganizedCrimeRewards | null);
  extra: Record<string, JsonValue>;
}

export interface UserOrganizedCrimeSlot {
  position: (string | null);
  position_info: (UserOrganizedCrimePositionInfo | null);
  item_requirement: (UserOrganizedCrimeItemRequirement | null);
  user: (UserOrganizedCrimeUser | null);
  checkpoint_pass_rate: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserOrganizedCrimePositionInfo {
  id: (string | null);
  label: (string | null);
  number: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserOrganizedCrimeItemRequirement {
  id: (Integer | null);
  is_reusable: (boolean | null);
  is_available: (boolean | null);
  extra: Record<string, JsonValue>;
}

export interface UserOrganizedCrimeUser {
  outcome: (string | null);
  id: (Integer | null);
  joined_at: (Integer | null);
  progress: (Integer | null);
  item_outcome: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserOrganizedCrimeRewards {
  money: (Integer | null);
  respect: (Integer | null);
  items: Array<UserOrganizedCrimeRewardItem>;
  extra: Record<string, JsonValue>;
}

export interface UserOrganizedCrimeRewardItem {
  id: (Integer | null);
  amount: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserOrganizedCrimeError {
  code: (Integer | null);
  error: (string | null);
  extra: Record<string, JsonValue>;
}

export interface UserLastAction {
  status: (string | null);
  relative: (string | null);
  timestamp: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface UserTrade {
  completed_at: (Integer | null);
  expires_at: (Integer | null);
  modified_at: (Integer | null);
  id: (Integer | null);
  timestamp: UserTradeTimestamp;
  description: (string | null);
  user: (UserTradeParticipant | null);
  trader: (UserTradeParticipant | null);
  extra: Record<string, JsonValue>;
}

export interface UserTradeDetailed {
  completed_at: (Integer | null);
  expires_at: (Integer | null);
  modified_at: (Integer | null);
  id: (Integer | null);
  timestamp: UserTradeTimestamp;
  description: (string | null);
  trade_type: (string | null);
  user: (UserTradeParticipant | null);
  trader: (UserTradeParticipant | null);
  items: Array<TradeItem>;
  extra: Record<string, JsonValue>;
}

export interface UserTradeParticipant {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}

export type UserTradeTimestamp = null | Integer | boolean | JsonValue;

export type TradeItem = TradeMoneyItem | TradeInventoryItem | TradeFactionItem | TradeCompanyItem | TradePropertyItem | TradeNapItem | UnknownTradeItem;

export interface TradeMoneyItem {
  user_id: (Integer | null);
  details: TradeMoneyDetails;
  extra: Record<string, JsonValue>;
}

export interface TradeInventoryItem {
  user_id: (Integer | null);
  details: TradeInventoryItemDetails;
  extra: Record<string, JsonValue>;
}

export interface TradeFactionItem {
  user_id: (Integer | null);
  details: TradeFactionDetails;
  extra: Record<string, JsonValue>;
}

export interface TradeCompanyItem {
  user_id: (Integer | null);
  details: TradeCompanyDetails;
  extra: Record<string, JsonValue>;
}

export interface TradePropertyItem {
  user_id: (Integer | null);
  details: TradePropertyDetails;
  extra: Record<string, JsonValue>;
}

export interface TradeNapItem {
  user_id: (Integer | null);
  details: TradeNapDetails;
  extra: Record<string, JsonValue>;
}

export interface UnknownTradeItem {
  user_id: (Integer | null);
  item_type: (string | null);
  details: (DynamicValue | null);
  extra: Record<string, JsonValue>;
}

export interface TradeMoneyDetails {
  amount: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TradeInventoryItemDetails {
  id: (Integer | null);
  uid: (Integer | null);
  amount: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TradeFactionDetails {
  id: (Integer | null);
  name: (string | null);
  respect: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TradeCompanyDetails {
  id: (Integer | null);
  name: (string | null);
  value: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TradePropertyDetails {
  id: (Integer | null);
  happiness: (Integer | null);
  extra: Record<string, JsonValue>;
}

export interface TradeNapDetails {
  days: (Integer | null);
  factions: Array<TradeNapFaction>;
  extra: Record<string, JsonValue>;
}

export interface TradeNapFaction {
  id: (Integer | null);
  name: (string | null);
  extra: Record<string, JsonValue>;
}
