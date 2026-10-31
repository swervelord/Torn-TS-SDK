import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle, type OptionsOrId } from "./runtime.ts";
import { CompanyOptions } from "./options.ts";
import type { CompanyApplicationsBundle, CompanyCompaniesBundle, CompanyDetailedBundle, CompanyEmployeesBundle, CompanyLookupBundle, CompanyNewsBundle, CompanyProfileBundle, CompanySearchBundle, CompanyStockBundle, CompanyTimestampBundle } from "../models/manual.ts";
export { CompanyOptions } from "./options.ts";

export class CompanyApi extends ResourceApi<CompanyOptions, "company"> {
  static readonly SUPPORTED_SELECTIONS = ["applications", "companies", "employees", "lookup", "news", "profile", "search", "snapshot", "stock", "timestamp"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "company", CompanyApi.SUPPORTED_SELECTIONS, () => new CompanyOptions()); }
  async lookup(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyLookupBundle> {
    return this.executeTyped<CompanyLookupBundle>("lookup", options, "CompanyLookupBundle", true);
  }
  async applications(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyApplicationsBundle> {
    return this.executeTyped<CompanyApplicationsBundle>("applications", options, "CompanyApplicationsBundle", true);
  }
  async companies(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyCompaniesBundle> {
    options = new CompanyOptions(this.options(options)); if (options.base.id !== undefined && options.base.extraPathArgs.typeId === undefined) options.base.extraPathArgs.typeId = options.base.id;
    return this.executeTyped<CompanyCompaniesBundle>("companies", options, "CompanyCompaniesBundle", true);
  }
  async timestamp(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyTimestampBundle> {
    return this.executeTyped<CompanyTimestampBundle>("timestamp", options, "CompanyTimestampBundle", true);
  }
  async profile(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyProfileBundle> {
    return this.executeTyped<CompanyProfileBundle>("profile", options, "CompanyProfileBundle", true);
  }
  async detailed(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyDetailedBundle> {
    return this.profile(options);
  }
  async employees(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyEmployeesBundle> {
    return this.executeTyped<CompanyEmployeesBundle>("employees", options, "CompanyEmployeesBundle", true);
  }
  async news(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyNewsBundle> {
    return this.executeTyped<CompanyNewsBundle>("news", options, "CompanyNewsBundle", true);
  }
  async search(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanySearchBundle> {
    return this.executeTyped<CompanySearchBundle>("search", options, "CompanySearchBundle", true);
  }
  async snapshot(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<string> {
    return this.executeText("snapshot", options);
  }
  async stock(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<CompanyStockBundle> {
    return this.executeTyped<CompanyStockBundle>("stock", options, "CompanyStockBundle", true);
  }
  /** @deprecated Use applicationsRaw(). */
  applications_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("applications", options); }
  /** @deprecated Use companiesRaw(). */
  companies_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("companies", options); }
  /** @deprecated Use employeesRaw(). */
  employees_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("employees", options); }
  /** @deprecated Use lookupRaw(). */
  lookup_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  /** @deprecated Use newsRaw(). */
  news_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("news", options); }
  /** @deprecated Use profileRaw(). */
  profile_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("profile", options); }
  /** @deprecated Use searchRaw(). */
  search_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("search", options); }
  /** @deprecated Use stockRaw(). */
  stock_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("stock", options); }
  /** @deprecated Use timestampRaw(). */
  timestamp_raw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  applicationsRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.applications_raw(options); }
  companiesRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.companies_raw(options); }
  employeesRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.employees_raw(options); }
  lookupRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.lookup_raw(options); }
  newsRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.news_raw(options); }
  profileRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.profile_raw(options); }
  searchRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.search_raw(options); }
  stockRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.stock_raw(options); }
  timestampRaw(options: OptionsOrId<CompanyOptions> = new CompanyOptions()) { return this.timestamp_raw(options); }
}
