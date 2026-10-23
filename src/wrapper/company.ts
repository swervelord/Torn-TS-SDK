import type { TornClient } from "../client.ts";
import type { HttpTransport } from "../transport.ts";
import { ResourceApi, RawSelectionBundle } from "./runtime.ts";
import { CompanyOptions } from "./options.ts";
import type { CompanyApplicationsBundle, CompanyCompaniesBundle, CompanyDetailedBundle, CompanyEmployeesBundle, CompanyLookupBundle, CompanyNewsBundle, CompanyProfileBundle, CompanySearchBundle, CompanyStockBundle, CompanyTimestampBundle } from "../models/manual.ts";
export { CompanyOptions } from "./options.ts";

export class CompanyApi extends ResourceApi<CompanyOptions, "company"> {
  static readonly SUPPORTED_SELECTIONS = ["applications", "companies", "employees", "lookup", "news", "profile", "search", "snapshot", "stock", "timestamp"] as const;
  constructor(client: TornClient<HttpTransport>) { super(client, "company", CompanyApi.SUPPORTED_SELECTIONS, () => new CompanyOptions()); }
  async lookup(options: CompanyOptions = new CompanyOptions()): Promise<CompanyLookupBundle> {
    return this.executeTyped<CompanyLookupBundle>("lookup", options, "CompanyLookupBundle", true);
  }
  async applications(options: CompanyOptions = new CompanyOptions()): Promise<CompanyApplicationsBundle> {
    return this.executeTyped<CompanyApplicationsBundle>("applications", options, "CompanyApplicationsBundle", true);
  }
  async companies(options: CompanyOptions = new CompanyOptions()): Promise<CompanyCompaniesBundle> {
    options = new CompanyOptions(options); if (options.base.id !== undefined && options.base.extraPathArgs.typeId === undefined) options.base.extraPathArgs.typeId = options.base.id;
    return this.executeTyped<CompanyCompaniesBundle>("companies", options, "CompanyCompaniesBundle", true);
  }
  async timestamp(options: CompanyOptions = new CompanyOptions()): Promise<CompanyTimestampBundle> {
    return this.executeTyped<CompanyTimestampBundle>("timestamp", options, "CompanyTimestampBundle", true);
  }
  async profile(options: CompanyOptions = new CompanyOptions()): Promise<CompanyProfileBundle> {
    return this.executeTyped<CompanyProfileBundle>("profile", options, "CompanyProfileBundle", true);
  }
  async detailed(options: CompanyOptions = new CompanyOptions()): Promise<CompanyDetailedBundle> {
    return this.profile(options);
  }
  async employees(options: CompanyOptions = new CompanyOptions()): Promise<CompanyEmployeesBundle> {
    return this.executeTyped<CompanyEmployeesBundle>("employees", options, "CompanyEmployeesBundle", true);
  }
  async news(options: CompanyOptions = new CompanyOptions()): Promise<CompanyNewsBundle> {
    return this.executeTyped<CompanyNewsBundle>("news", options, "CompanyNewsBundle", true);
  }
  async search(options: CompanyOptions = new CompanyOptions()): Promise<CompanySearchBundle> {
    return this.executeTyped<CompanySearchBundle>("search", options, "CompanySearchBundle", true);
  }
  async snapshot(options: CompanyOptions = new CompanyOptions()): Promise<string> {
    return this.executeText("snapshot", options);
  }
  async stock(options: CompanyOptions = new CompanyOptions()): Promise<CompanyStockBundle> {
    return this.executeTyped<CompanyStockBundle>("stock", options, "CompanyStockBundle", true);
  }
  applications_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("applications", options); }
  companies_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("companies", options); }
  employees_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("employees", options); }
  lookup_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("lookup", options); }
  news_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("news", options); }
  profile_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("profile", options); }
  search_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("search", options); }
  stock_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("stock", options); }
  timestamp_raw(options: CompanyOptions = new CompanyOptions()): Promise<RawSelectionBundle> { return this.rawSelection("timestamp", options); }
  applicationsRaw(options: CompanyOptions = new CompanyOptions()) { return this.applications_raw(options); }
  companiesRaw(options: CompanyOptions = new CompanyOptions()) { return this.companies_raw(options); }
  employeesRaw(options: CompanyOptions = new CompanyOptions()) { return this.employees_raw(options); }
  lookupRaw(options: CompanyOptions = new CompanyOptions()) { return this.lookup_raw(options); }
  newsRaw(options: CompanyOptions = new CompanyOptions()) { return this.news_raw(options); }
  profileRaw(options: CompanyOptions = new CompanyOptions()) { return this.profile_raw(options); }
  searchRaw(options: CompanyOptions = new CompanyOptions()) { return this.search_raw(options); }
  stockRaw(options: CompanyOptions = new CompanyOptions()) { return this.stock_raw(options); }
  timestampRaw(options: CompanyOptions = new CompanyOptions()) { return this.timestamp_raw(options); }
}
