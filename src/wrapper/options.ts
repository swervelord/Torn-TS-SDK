import type { DataRequestOptions, ExecutionOptions, Integer } from "../types.ts";

export enum SortOrder { Asc = "ASC", Desc = "DESC" }
export interface BaseOptionsInit {
  id?: string | number | bigint;
  limit?: number;
  from?: Integer;
  to?: Integer;
  offset?: number;
  cat?: string;
  stat?: string;
  filters?: string;
  sort?: SortOrder | "ASC" | "DESC";
  striptags?: boolean;
  target?: string;
  name?: string;
  bonus?: string;
  ids?: string;
  log?: string;
  comment?: string;
  timestamp?: string;
  executionOptions?: ExecutionOptions;
  legacySelections?: string[];
  extraFilters?: Record<string,string>;
  extraPathArgs?: Record<string,string>;
}

/** Common options preserve the Rust builder API and offer camelCase aliases. */
export class BaseOptions {
  id?: string;
  limit?: number;
  from?: Integer;
  to?: Integer;
  offset?: number;
  cat?: string;
  stat?: string;
  filters?: string;
  sort?: SortOrder | "ASC" | "DESC";
  striptags?: boolean;
  target?: string;
  name?: string;
  bonus?: string;
  ids?: string;
  log?: string;
  comment?: string;
  timestamp?: string;
  executionOptions: ExecutionOptions = {};
  legacySelections: string[] = [];
  extraFilters: Record<string,string> = {};
  extraPathArgs: Record<string,string> = {};
  constructor(value: BaseOptionsInit = {}) {
    Object.assign(this,value);
    if (value.id !== undefined) this.id=String(value.id);
    this.executionOptions={...value.executionOptions};
    this.legacySelections=[...value.legacySelections ?? []];
    this.extraFilters={...value.extraFilters};
    this.extraPathArgs={...value.extraPathArgs};
  }
  static default() { return new BaseOptions(); }
  withId(value: string | number | bigint): this {this.id=String(value);return this;}
  withLimit(value: number): this {this.limit=value;return this;}
  withFrom(value: Integer): this {this.from=value;return this;}
  withTo(value: Integer): this {this.to=value;return this;}
  withOffset(value: number): this {this.offset=value;return this;}
  withCat(value: string): this {this.cat=value;return this;}
  withStat(value: string): this {this.stat=value;return this;}
  withFilters(value: string): this {this.filters=value;return this;}
  withSort(value: SortOrder | "ASC" | "DESC"): this {this.sort=value;return this;}
  withStriptags(value: boolean): this {this.striptags=value;return this;}
  withTarget(value: string): this {this.target=value;return this;}
  withName(value: string): this {this.name=value;return this;}
  withBonus(value: string): this {this.bonus=value;return this;}
  withIds(value: string): this {this.ids=value;return this;}
  withLog(value: string): this {this.log=value;return this;}
  withComment(value: string): this {this.comment=value;return this;}
  withTimestamp(value: string): this {this.timestamp=value;return this;}
  withCursor(value: string): this {return this.withExtraFilter("cursor",value);}
  withExecutionOptions(value: ExecutionOptions): this {this.executionOptions={...value};return this;}
  withMaxAttempts(value: number): this {this.executionOptions.maxAttempts=value;return this;}
  /** Timeout duration is expressed in milliseconds throughout the TypeScript SDK. */
  withRequestTimeout(value: number): this {this.executionOptions.requestTimeoutMs=value;return this;}
  withRouteId(value: string): this {this.executionOptions.routeId=value;return this;}
  withLegacySelection(value: string): this {this.legacySelections.push(value);return this;}
  withExtraFilter(name: string,value: string): this {this.extraFilters[name]=value;return this;}
  withExtraPathArg(name: string,value: string): this {this.extraPathArgs[name]=value;return this;}
  intoDataRequestOptions(): DataRequestOptions {
    const filters: Record<string,string>={};
    for (const name of ["limit","from","to","offset","cat","stat","filters","sort","striptags","target","name","bonus","ids","log","comment","timestamp"] as const) {
      const value=this[name];if(value !== undefined) filters[name]=String(value);
    }
    return { ...(this.id !== undefined ? {id:this.id}:{}), filters:{...filters,...this.extraFilters},pathArgs:{...this.extraPathArgs},legacySelections:[...this.legacySelections],executionOptions:{...this.executionOptions}};
  }
  get execution_options(){return this.executionOptions;} set execution_options(value:ExecutionOptions){this.executionOptions=value;}
  get legacy_selections(){return this.legacySelections;} set legacy_selections(value:string[]){this.legacySelections=value;}
  get extra_filters(){return this.extraFilters;} set extra_filters(value:Record<string,string>){this.extraFilters=value;}
  get extra_path_args(){return this.extraPathArgs;} set extra_path_args(value:Record<string,string>){this.extraPathArgs=value;}
  with_id=this.withId;with_limit=this.withLimit;with_from=this.withFrom;with_to=this.withTo;with_offset=this.withOffset;
  with_cat=this.withCat;with_stat=this.withStat;with_filters=this.withFilters;with_sort=this.withSort;with_striptags=this.withStriptags;
  with_target=this.withTarget;with_name=this.withName;with_bonus=this.withBonus;with_ids=this.withIds;with_log=this.withLog;
  with_comment=this.withComment;with_timestamp=this.withTimestamp;with_cursor=this.withCursor;
  with_execution_options=this.withExecutionOptions;with_max_attempts=this.withMaxAttempts;with_request_timeout=this.withRequestTimeout;
  with_route_id=this.withRouteId;with_legacy_selection=this.withLegacySelection;with_extra_filter=this.withExtraFilter;
  with_extra_path_arg=this.withExtraPathArg;into_data_request_options=this.intoDataRequestOptions;
}

export interface ResourceOptionsInit { base?: BaseOptionsInit; }
export class ResourceOptions {
  base: BaseOptions;
  constructor(value: ResourceOptionsInit = {}) {this.base=new BaseOptions(value.base);}
  withBase(value: BaseOptions): this {this.base=value;return this;}
  withId(value: string | number | bigint): this {this.base.withId(value);return this;}
  intoDataRequestOptions(): DataRequestOptions {return this.base.intoDataRequestOptions();}
  with_base=this.withBase;with_id=this.withId;into_data_request_options(){return this.intoDataRequestOptions();}
  protected specialPaths(values: Record<string,string | undefined>): DataRequestOptions {
    const result=this.base.intoDataRequestOptions();
    for (const [key,value] of Object.entries(values)) if(value !== undefined){result.id ??= value;result.pathArgs ??={};result.pathArgs[key]=value;}
    return result;
  }
}
// RESOURCE OPTIONS
export interface UserOptionsInit extends ResourceOptionsInit {
  crimeId?: string | number | bigint;
  crime_id?: string | number | bigint;
  tradeId?: string | number | bigint;
  trade_id?: string | number | bigint;
}
export class UserOptions extends ResourceOptions {
  crimeId?: string;
  tradeId?: string;
  constructor(value: UserOptionsInit = {}) { super(value);
    if (value.crimeId !== undefined || value.crime_id !== undefined) this.crimeId = String(value.crimeId ?? value.crime_id);
    if (value.tradeId !== undefined || value.trade_id !== undefined) this.tradeId = String(value.tradeId ?? value.trade_id);
  }
  static default() { return new UserOptions(); }
  withCrimeId(value: string | number | bigint): this { this.crimeId=String(value);return this; }
  with_crime_id=this.withCrimeId;
  get crime_id(){return this.crimeId;} set crime_id(value:string | undefined){this.crimeId=value;}
  withTradeId(value: string | number | bigint): this { this.tradeId=String(value);return this; }
  with_trade_id=this.withTradeId;
  get trade_id(){return this.tradeId;} set trade_id(value:string | undefined){this.tradeId=value;}
  override intoDataRequestOptions(): DataRequestOptions {return this.specialPaths({crimeId:this.crimeId,tradeId:this.tradeId});}
}
export interface CompanyOptionsInit extends ResourceOptionsInit {
}
export class CompanyOptions extends ResourceOptions {
  constructor(value: CompanyOptionsInit = {}) { super(value);
  }
  static default() { return new CompanyOptions(); }
  withTypeId(value:string|number|bigint):this { this.base.withExtraPathArg("typeId",String(value));return this;}
  withCategory(value:string):this {this.base.withCat(value);return this;}
  withSnapshotTimestamp(value:string|number|bigint):this {this.base.withTimestamp(String(value));return this;}
  with_type_id=this.withTypeId;with_category=this.withCategory;with_snapshot_timestamp=this.withSnapshotTimestamp;
}
export interface FactionOptionsInit extends ResourceOptionsInit {
  chainId?: string | number | bigint;
  chain_id?: string | number | bigint;
  crimeId?: string | number | bigint;
  crime_id?: string | number | bigint;
  raidWarId?: string | number | bigint;
  raid_war_id?: string | number | bigint;
  rankedWarId?: string | number | bigint;
  ranked_war_id?: string | number | bigint;
  territoryWarId?: string | number | bigint;
  territory_war_id?: string | number | bigint;
}
export class FactionOptions extends ResourceOptions {
  chainId?: string;
  crimeId?: string;
  raidWarId?: string;
  rankedWarId?: string;
  territoryWarId?: string;
  constructor(value: FactionOptionsInit = {}) { super(value);
    if (value.chainId !== undefined || value.chain_id !== undefined) this.chainId = String(value.chainId ?? value.chain_id);
    if (value.crimeId !== undefined || value.crime_id !== undefined) this.crimeId = String(value.crimeId ?? value.crime_id);
    if (value.raidWarId !== undefined || value.raid_war_id !== undefined) this.raidWarId = String(value.raidWarId ?? value.raid_war_id);
    if (value.rankedWarId !== undefined || value.ranked_war_id !== undefined) this.rankedWarId = String(value.rankedWarId ?? value.ranked_war_id);
    if (value.territoryWarId !== undefined || value.territory_war_id !== undefined) this.territoryWarId = String(value.territoryWarId ?? value.territory_war_id);
  }
  static default() { return new FactionOptions(); }
  withChainId(value: string | number | bigint): this { this.chainId=String(value);return this; }
  with_chain_id=this.withChainId;
  get chain_id(){return this.chainId;} set chain_id(value:string | undefined){this.chainId=value;}
  withCrimeId(value: string | number | bigint): this { this.crimeId=String(value);return this; }
  with_crime_id=this.withCrimeId;
  get crime_id(){return this.crimeId;} set crime_id(value:string | undefined){this.crimeId=value;}
  withRaidWarId(value: string | number | bigint): this { this.raidWarId=String(value);return this; }
  with_raid_war_id=this.withRaidWarId;
  get raid_war_id(){return this.raidWarId;} set raid_war_id(value:string | undefined){this.raidWarId=value;}
  withRankedWarId(value: string | number | bigint): this { this.rankedWarId=String(value);return this; }
  with_ranked_war_id=this.withRankedWarId;
  get ranked_war_id(){return this.rankedWarId;} set ranked_war_id(value:string | undefined){this.rankedWarId=value;}
  withTerritoryWarId(value: string | number | bigint): this { this.territoryWarId=String(value);return this; }
  with_territory_war_id=this.withTerritoryWarId;
  get territory_war_id(){return this.territoryWarId;} set territory_war_id(value:string | undefined){this.territoryWarId=value;}
  override intoDataRequestOptions(): DataRequestOptions {return this.specialPaths({chainId:this.chainId,crimeId:this.crimeId,raidWarId:this.raidWarId,rankedWarId:this.rankedWarId,territoryWarId:this.territoryWarId});}
}
export interface ForumOptionsInit extends ResourceOptionsInit {
  categoryIds?: string | number | bigint;
  category_ids?: string | number | bigint;
  threadId?: string | number | bigint;
  thread_id?: string | number | bigint;
}
export class ForumOptions extends ResourceOptions {
  categoryIds?: string;
  threadId?: string;
  constructor(value: ForumOptionsInit = {}) { super(value);
    if (value.categoryIds !== undefined || value.category_ids !== undefined) this.categoryIds = String(value.categoryIds ?? value.category_ids);
    if (value.threadId !== undefined || value.thread_id !== undefined) this.threadId = String(value.threadId ?? value.thread_id);
  }
  static default() { return new ForumOptions(); }
  withCategoryIds(value: string | number | bigint): this { this.categoryIds=String(value);return this; }
  with_category_ids=this.withCategoryIds;
  get category_ids(){return this.categoryIds;} set category_ids(value:string | undefined){this.categoryIds=value;}
  withThreadId(value: string | number | bigint): this { this.threadId=String(value);return this; }
  with_thread_id=this.withThreadId;
  get thread_id(){return this.threadId;} set thread_id(value:string | undefined){this.threadId=value;}
  override intoDataRequestOptions(): DataRequestOptions {return this.specialPaths({categoryIds:this.categoryIds,threadId:this.threadId});}
}
export interface KeyOptionsInit extends ResourceOptionsInit {
}
export class KeyOptions extends ResourceOptions {
  constructor(value: KeyOptionsInit = {}) { super(value);
  }
  static default() { return new KeyOptions(); }
}
export interface MarketOptionsInit extends ResourceOptionsInit {
  propertyTypeId?: string | number | bigint;
  property_type_id?: string | number | bigint;
}
export class MarketOptions extends ResourceOptions {
  propertyTypeId?: string;
  constructor(value: MarketOptionsInit = {}) { super(value);
    if (value.propertyTypeId !== undefined || value.property_type_id !== undefined) this.propertyTypeId = String(value.propertyTypeId ?? value.property_type_id);
  }
  static default() { return new MarketOptions(); }
  withPropertyTypeId(value: string | number | bigint): this { this.propertyTypeId=String(value);return this; }
  with_property_type_id=this.withPropertyTypeId;
  get property_type_id(){return this.propertyTypeId;} set property_type_id(value:string | undefined){this.propertyTypeId=value;}
  override intoDataRequestOptions(): DataRequestOptions {return this.specialPaths({propertyTypeId:this.propertyTypeId});}
}
export interface PropertyOptionsInit extends ResourceOptionsInit {
}
export class PropertyOptions extends ResourceOptions {
  constructor(value: PropertyOptionsInit = {}) { super(value);
  }
  static default() { return new PropertyOptions(); }
}
export interface RacingOptionsInit extends ResourceOptionsInit {
  raceId?: string | number | bigint;
  race_id?: string | number | bigint;
  trackId?: string | number | bigint;
  track_id?: string | number | bigint;
}
export class RacingOptions extends ResourceOptions {
  raceId?: string;
  trackId?: string;
  constructor(value: RacingOptionsInit = {}) { super(value);
    if (value.raceId !== undefined || value.race_id !== undefined) this.raceId = String(value.raceId ?? value.race_id);
    if (value.trackId !== undefined || value.track_id !== undefined) this.trackId = String(value.trackId ?? value.track_id);
  }
  static default() { return new RacingOptions(); }
  withRaceId(value: string | number | bigint): this { this.raceId=String(value);return this; }
  with_race_id=this.withRaceId;
  get race_id(){return this.raceId;} set race_id(value:string | undefined){this.raceId=value;}
  withTrackId(value: string | number | bigint): this { this.trackId=String(value);return this; }
  with_track_id=this.withTrackId;
  get track_id(){return this.trackId;} set track_id(value:string | undefined){this.trackId=value;}
  override intoDataRequestOptions(): DataRequestOptions {return this.specialPaths({raceId:this.raceId,trackId:this.trackId});}
}
export interface TornOptionsInit extends ResourceOptionsInit {
  crimeId?: string | number | bigint;
  crime_id?: string | number | bigint;
  ids?: string | number | bigint;
  logCategoryId?: string | number | bigint;
  log_category_id?: string | number | bigint;
  stockId?: string | number | bigint;
  stock_id?: string | number | bigint;
}
export class TornOptions extends ResourceOptions {
  crimeId?: string;
  ids?: string;
  logCategoryId?: string;
  stockId?: string;
  constructor(value: TornOptionsInit = {}) { super(value);
    if (value.crimeId !== undefined || value.crime_id !== undefined) this.crimeId = String(value.crimeId ?? value.crime_id);
    if (value.ids !== undefined || value.ids !== undefined) this.ids = String(value.ids ?? value.ids);
    if (value.logCategoryId !== undefined || value.log_category_id !== undefined) this.logCategoryId = String(value.logCategoryId ?? value.log_category_id);
    if (value.stockId !== undefined || value.stock_id !== undefined) this.stockId = String(value.stockId ?? value.stock_id);
  }
  static default() { return new TornOptions(); }
  withShopId(value:string|number|bigint):this {this.base.withId(value).withExtraPathArg("shopId",String(value));return this;}
  withTypeId(value:string|number|bigint):this {this.base.withId(value).withExtraPathArg("typeId",String(value));return this;}
  with_shop_id=this.withShopId;with_type_id=this.withTypeId;
  withCrimeId(value: string | number | bigint): this { this.crimeId=String(value);return this; }
  with_crime_id=this.withCrimeId;
  get crime_id(){return this.crimeId;} set crime_id(value:string | undefined){this.crimeId=value;}
  withIds(value: string | number | bigint): this { this.ids=String(value);return this; }
  with_ids=this.withIds;
  withLogCategoryId(value: string | number | bigint): this { this.logCategoryId=String(value);return this; }
  with_log_category_id=this.withLogCategoryId;
  get log_category_id(){return this.logCategoryId;} set log_category_id(value:string | undefined){this.logCategoryId=value;}
  withStockId(value: string | number | bigint): this { this.stockId=String(value);return this; }
  with_stock_id=this.withStockId;
  get stock_id(){return this.stockId;} set stock_id(value:string | undefined){this.stockId=value;}
  override intoDataRequestOptions(): DataRequestOptions {return this.specialPaths({crimeId:this.crimeId,ids:this.ids,logCategoryId:this.logCategoryId,stockId:this.stockId});}
}
