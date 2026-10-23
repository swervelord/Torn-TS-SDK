/** Checked-in compatibility decoder schema; no Rust source is needed at runtime. */
export const manualModelMetadata = {
  "DynamicValue": {
    "kind": "union",
    "variants": [
      "null",
      "bool",
      "i64",
      "f64",
      "String",
      "Vec<DynamicValue>",
      "BTreeMap<String, DynamicValue>"
    ]
  },
  "PaginatedMetadata": {
    "kind": "struct",
    "fields": [
      {
        "name": "links",
        "key": "links",
        "type": "Option<PaginatedLinks>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PaginatedLinks": {
    "kind": "struct",
    "fields": [
      {
        "name": "prev",
        "key": "prev",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "next",
        "key": "next",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PaginatedMetadataWithTotal": {
    "kind": "struct",
    "fields": [
      {
        "name": "links",
        "key": "links",
        "type": "Option<PaginatedLinks>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyApplicationsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "applications",
        "key": "applications",
        "type": "Vec<CompanyApplicationSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyCompaniesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "company",
        "key": "company",
        "type": "Option<CompanyProfile>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "companies",
        "key": "companies",
        "type": "Vec<CompanyProfile>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company_timestamp",
        "key": "company_timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company_delay",
        "key": "company_delay",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "companies_timestamp",
        "key": "companies_timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "companies_delay",
        "key": "companies_delay",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadataWithTotal>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanySearchBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "search",
        "key": "search",
        "type": "Vec<CompanySearchEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyLookupBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "selections",
        "key": "selections",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyNewsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "news",
        "key": "news",
        "type": "BTreeMap<String, CompanyNewsEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": "deserialize_company_news"
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyTimestampBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyProfileBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "company",
        "key": "company",
        "type": "CompanyProfile",
        "default": true,
        "flatten": false,
        "aliases": [
          "profile"
        ],
        "custom": null
      }
    ]
  },
  "CompanyProfile": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "ID"
        ],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company_type",
        "key": "company_type",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company_kind",
        "key": "type",
        "type": "Option<CompanyType>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rating",
        "key": "rating",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "age",
        "key": "age",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "days_old",
        "key": "days_old",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "created_at",
        "key": "created_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "image",
        "key": "image",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "daily_income",
        "key": "daily_income",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "weekly_income",
        "key": "weekly_income",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "income",
        "key": "income",
        "type": "Option<CompanyIncome>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "customers",
        "key": "customers",
        "type": "Option<CompanyCustomers>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "employees",
        "key": "employees",
        "type": "Option<BTreeMap<String, CompanyProfileEmployee>>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "director",
        "key": "director",
        "type": "Option<CompanyDirector>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<UserStatus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "funds",
        "key": "funds",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "popularity",
        "key": "popularity",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "efficiency",
        "key": "efficiency",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "environment",
        "key": "environment",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "trains",
        "key": "trains",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "applications_allowed",
        "key": "applications_allowed",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "advertisement_budget",
        "key": "advertisement_budget",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "upgrades",
        "key": "upgrades",
        "type": "Option<CompanyUpgrades>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyType": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyIncome": {
    "kind": "struct",
    "fields": [
      {
        "name": "daily",
        "key": "daily",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "weekly",
        "key": "weekly",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyCustomers": {
    "kind": "struct",
    "fields": [
      {
        "name": "daily",
        "key": "daily",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "weekly",
        "key": "weekly",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyDirector": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<UserStatus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_action",
        "key": "last_action",
        "type": "Option<UserLastAction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyUpgrades": {
    "kind": "struct",
    "fields": [
      {
        "name": "staff_room",
        "key": "staff_room",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "storage",
        "key": "storage",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "storage_capacity",
        "key": "storage_capacity",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": "deserialize_optional_stringish"
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanySearchEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company_kind",
        "key": "type",
        "type": "Option<CompanyType>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rating",
        "key": "rating",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "days_old",
        "key": "days_old",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "image",
        "key": "image",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "income",
        "key": "income",
        "type": "Option<CompanyIncome>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "customers",
        "key": "customers",
        "type": "Option<CompanyCustomers>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "director",
        "key": "director",
        "type": "Option<CompanyDirector>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "applications_allowed",
        "key": "applications_allowed",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyProfileEmployee": {
    "kind": "union",
    "variants": [
      "Box<CompanyProfileEmployeeDetails>",
      "u64"
    ]
  },
  "CompanyProfileEmployeeDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": "deserialize_optional_position_name"
      },
      {
        "name": "days_in_company",
        "key": "days_in_company",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<UserStatus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_action",
        "key": "last_action",
        "type": "Option<UserLastAction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyApplicationSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "user",
        "key": "user",
        "type": "Option<CompanyApplicationUser>",
        "default": true,
        "flatten": false,
        "aliases": [
          "player"
        ],
        "custom": null
      },
      {
        "name": "message",
        "key": "message",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "valid_until",
        "key": "valid_until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "expires_at"
        ],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyApplicationUser": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stats",
        "key": "stats",
        "type": "Option<CompanyApplicationStats>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyApplicationStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "manual_labor",
        "key": "manual_labor",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "intelligence",
        "key": "intelligence",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "endurance",
        "key": "endurance",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyEmployeesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "company_employees",
        "key": "company_employees",
        "type": "Option<BTreeMap<String, CompanyEmployee>>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "employees",
        "key": "employees",
        "type": "Vec<CompanyEmployee>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyEmployee": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": "deserialize_optional_position_name"
      },
      {
        "name": "days_in_company",
        "key": "days_in_company",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "joined_at",
        "key": "joined_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "wage",
        "key": "wage",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "manual_labor",
        "key": "manual_labor",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "intelligence",
        "key": "intelligence",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "endurance",
        "key": "endurance",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stats",
        "key": "stats",
        "type": "Option<CompanyEmployeeStats>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "effectiveness",
        "key": "effectiveness",
        "type": "Option<CompanyEmployeeEffectiveness>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "working_stats",
        "key": "working_stats",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "efficiency",
        "key": "efficiency",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<UserStatus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_action",
        "key": "last_action",
        "type": "Option<UserLastAction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyEmployeeStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "manual_labor",
        "key": "manual_labor",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "intelligence",
        "key": "intelligence",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "endurance",
        "key": "endurance",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyEmployeeEffectiveness": {
    "kind": "struct",
    "fields": [
      {
        "name": "working_stats",
        "key": "working_stats",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "settled_in",
        "key": "settled_in",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "book",
        "key": "book",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "merits",
        "key": "merits",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "director_education",
        "key": "director_education",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "management",
        "key": "management",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "wrong_gender",
        "key": "wrong_gender",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "addiction",
        "key": "addiction",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "inactivity",
        "key": "inactivity",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyStockBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "company_stock",
        "key": "company_stock",
        "type": "BTreeMap<String, CompanyStockEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stock",
        "key": "stock",
        "type": "Vec<CompanyStockEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyStockEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rrp",
        "key": "rrp",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "price",
        "key": "price",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "in_stock",
        "key": "in_stock",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "on_order",
        "key": "on_order",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "sold_amount",
        "key": "sold_amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "sold_worth",
        "key": "sold_worth",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyNewsEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "category",
        "key": "category",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "news",
        "key": "news",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "CompanyDetailedBundle": {
    "kind": "alias",
    "type": "CompanyProfileBundle"
  },
  "FactionBasicBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "basic",
        "key": "basic",
        "type": "FactionBasic",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionMembersBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "members",
        "key": "members",
        "type": "Vec<FactionMemberSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWarsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "wars",
        "key": "wars",
        "type": "FactionWarsSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "pacts",
        "key": "pacts",
        "type": "Vec<FactionPactSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "rankedwars",
        "key": "rankedwars",
        "type": "Vec<FactionRankedWarSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionApplicationsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "applications",
        "key": "applications",
        "type": "Vec<FactionApplicationSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionArmorBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "armor",
        "key": "armor",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionBoostersBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "boosters",
        "key": "boosters",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCachesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "caches",
        "key": "caches",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCesiumBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "cesium",
        "key": "cesium",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "crime",
        "key": "crime",
        "type": "FactionCrime",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeExpBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "crimeexp",
        "key": "crimeexp",
        "type": "FactionCrimeExpSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "crimes",
        "key": "crimes",
        "type": "Vec<FactionCrime>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionDrugsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "drugs",
        "key": "drugs",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionLookupBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "selections",
        "key": "selections",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "chain",
        "key": "chain",
        "type": "FactionOngoingChainSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "chains",
        "key": "chains",
        "type": "Vec<FactionChainSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainReportBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "chainreport",
        "key": "chainreport",
        "type": "FactionChainReportSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionBalanceBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "balance",
        "key": "balance",
        "type": "FactionBalanceSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionContributorsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "contributors",
        "key": "contributors",
        "type": "Vec<FactionContributorSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionMedicalBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "medical",
        "key": "medical",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRacketsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "rackets",
        "key": "rackets",
        "type": "Vec<FactionRacketSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionHofBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "hof",
        "key": "hof",
        "type": "FactionHofSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionPositionsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "positions",
        "key": "positions",
        "type": "Vec<FactionPositionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionSearchBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "search",
        "key": "search",
        "type": "Vec<FactionSearchSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionStatsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "stats",
        "key": "stats",
        "type": "Vec<FactionStatSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRaidsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "raids",
        "key": "raids",
        "type": "Vec<FactionRaidSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTimestampBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTemporaryBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "temporary",
        "key": "temporary",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionAttacksBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Vec<UserAttack>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionAttacksFullBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Vec<UserAttackFull>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRevivesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "revives",
        "key": "revives",
        "type": "Vec<UserRevive>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRevivesFullBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "revives",
        "key": "revives",
        "type": "Vec<UserReviveFull>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionReportsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "reports",
        "key": "reports",
        "type": "Vec<UserReportSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "territory",
        "key": "territory",
        "type": "Vec<FactionTerritorySummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryOwnershipBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "territory_ownership",
        "key": "territoryOwnership",
        "type": "Vec<FactionTerritoryOwnershipSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryWarsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "territorywars",
        "key": "territorywars",
        "type": "Vec<FactionTerritoryWarHistoryEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRaidReportBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "raidreport",
        "key": "raidreport",
        "type": "FactionRaidReportSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarReportBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "rankedwarreport",
        "key": "rankedwarreport",
        "type": "FactionRankedWarReportSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryWarReportBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "territorywarreport",
        "key": "territorywarreport",
        "type": "FactionTerritoryWarReportSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWarfareBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "warfare",
        "key": "warfare",
        "type": "Vec<FactionWarfareEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionUtilitiesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "utilities",
        "key": "utilities",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWeaponsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "weapons",
        "key": "weapons",
        "type": "FactionLegacyItemSelection",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionNewsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "news",
        "key": "news",
        "type": "Vec<FactionNewsEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionUpgradesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "state",
        "key": "state",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "upgrades",
        "key": "upgrades",
        "type": "Option<FactionUpgradesSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionBasic": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tag",
        "key": "tag",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tag_image",
        "key": "tag_image",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "members",
        "key": "members",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "leader_id",
        "key": "leader_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "co_leader_id",
        "key": "co_leader_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<FactionRank>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRank": {
    "kind": "struct",
    "fields": [
      {
        "name": "division",
        "key": "division",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "wins",
        "key": "wins",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionMemberSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "days_in_faction",
        "key": "days_in_faction",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_revivable",
        "key": "is_revivable",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<FactionMemberStatus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_action",
        "key": "last_action",
        "type": "Option<FactionLastAction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionMemberStatus": {
    "kind": "struct",
    "fields": [
      {
        "name": "state",
        "key": "state",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "color",
        "key": "color",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "plane_image_type",
        "key": "plane_image_type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "until",
        "key": "until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionLastAction": {
    "kind": "struct",
    "fields": [
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "relative",
        "key": "relative",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWarsSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "raids",
        "key": "raids",
        "type": "Vec<FactionRaidWarSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ranked",
        "key": "ranked",
        "type": "Option<FactionRankedWarDetails>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRaidWarSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "war_id",
        "key": "war_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "id"
        ],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "factions",
        "key": "factions",
        "type": "Vec<FactionWarFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "war_id",
        "key": "war_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "id"
        ],
        "custom": null
      },
      {
        "name": "target",
        "key": "target",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "winner",
        "key": "winner",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "factions",
        "key": "factions",
        "type": "Vec<FactionWarFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWarFactionSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_aggressor",
        "key": "is_aggressor",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionPactSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_name",
        "key": "faction_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "until",
        "key": "until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "war_id"
        ],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target",
        "key": "target",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "winner",
        "key": "winner",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "factions",
        "key": "factions",
        "type": "Vec<FactionWarFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionApplicationSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "user",
        "key": "user",
        "type": "Option<FactionApplicantSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "message",
        "key": "message",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "valid_until",
        "key": "valid_until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionApplicantSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stats",
        "key": "stats",
        "type": "Option<FactionApplicantStats>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionApplicantStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "strength",
        "key": "strength",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "speed",
        "key": "speed",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dexterity",
        "key": "dexterity",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defense",
        "key": "defense",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionBalanceSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "faction",
        "key": "faction",
        "type": "Option<FactionBalanceFaction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "members",
        "key": "members",
        "type": "Vec<FactionBalanceMember>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionBalanceFaction": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points",
        "key": "points",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "scope",
        "key": "scope",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionBalanceMember": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "username",
        "key": "username",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "money",
        "key": "money",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points",
        "key": "points",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionContributorSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "username",
        "key": "username",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "in_faction",
        "key": "in_faction",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionLegacyItemSelection": {
    "kind": "union",
    "variants": [
      "BTreeMap<String, FactionLegacyItemEntry>",
      "Vec<FactionLegacyItemEntry>",
      "Value"
    ]
  },
  "FactionLegacyItemEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "ID",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "id"
        ],
        "custom": null
      },
      {
        "name": "item_id",
        "key": "item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "uid",
        "key": "uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "category",
        "key": "category",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "available",
        "key": "available",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "loaned",
        "key": "loaned",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "loaned_to",
        "key": "loaned_to",
        "type": "Option<FactionLegacyItemLoanTarget>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market_price",
        "key": "market_price",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "average_price",
        "key": "average_price",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "damage",
        "key": "damage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "accuracy",
        "key": "accuracy",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "armor",
        "key": "armor",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quality",
        "key": "quality",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonus",
        "key": "bonus",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "required",
        "key": "required",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionLegacyItemLoanTarget": {
    "kind": "union",
    "variants": [
      "u64",
      "String",
      "FactionLegacyItemLoanUser",
      "bool"
    ]
  },
  "FactionLegacyItemLoanUser": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeExpSelection": {
    "kind": "union",
    "variants": [
      "BTreeMap<String, FactionCrimeExpEntry>",
      "Vec<FactionCrimeExpEntry>",
      "Value"
    ]
  },
  "FactionCrimeExpEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "crime_exp",
        "key": "crimeexp",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "crime_exp"
        ],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionHofSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<FactionHofValueString>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<FactionHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<FactionHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionHofValueString": {
    "kind": "struct",
    "fields": [
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionHofValue": {
    "kind": "struct",
    "fields": [
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionPositionSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_default",
        "key": "is_default",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "abilities",
        "key": "abilities",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionSearchSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "members",
        "key": "members",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "members_max",
        "key": "members_max",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "leader",
        "key": "leader",
        "type": "Option<FactionSearchLeader>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "co_leader",
        "key": "co_leader",
        "type": "Option<FactionSearchLeader>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "image",
        "key": "image",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tag_image",
        "key": "tag_image",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tag",
        "key": "tag",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_destroyed",
        "key": "is_destroyed",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_recruiting",
        "key": "is_recruiting",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionSearchLeader": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionStatSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionOngoingChainSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "current",
        "key": "current",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "max",
        "key": "max",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timeout",
        "key": "timeout",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifier",
        "key": "modifier",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cooldown",
        "key": "cooldown",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainReportSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "Option<FactionChainReportDetailsSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonuses",
        "key": "bonuses",
        "type": "Vec<FactionChainReportBonusSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attackers",
        "key": "attackers",
        "type": "Vec<FactionChainReportAttackerSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "non_attackers",
        "key": "non_attackers",
        "type": "Vec<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainReportDetailsSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "members",
        "key": "members",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "targets",
        "key": "targets",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "war",
        "key": "war",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "best",
        "key": "best",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "leave",
        "key": "leave",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "mug",
        "key": "mug",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "hospitalize",
        "key": "hospitalize",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "assists",
        "key": "assists",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "retaliations",
        "key": "retaliations",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "overseas",
        "key": "overseas",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "draws",
        "key": "draws",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "escapes",
        "key": "escapes",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "losses",
        "key": "losses",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainReportBonusSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "attacker_id",
        "key": "attacker_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defender_id",
        "key": "defender_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainReportAttackerSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<FactionChainReportAttackerRespectSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Option<FactionChainReportAttacksSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainReportAttackerRespectSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "total",
        "key": "total",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "average",
        "key": "average",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "best",
        "key": "best",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainReportAttacksSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "leave",
        "key": "leave",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "mug",
        "key": "mug",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "hospitalize",
        "key": "hospitalize",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "assists",
        "key": "assists",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "retaliations",
        "key": "retaliations",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "overseas",
        "key": "overseas",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "draws",
        "key": "draws",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "escapes",
        "key": "escapes",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "escpaces"
        ],
        "custom": null
      },
      {
        "name": "losses",
        "key": "losses",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "war",
        "key": "war",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonuses",
        "key": "bonuses",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrime": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "previous_crime_id",
        "key": "previous_crime_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "difficulty",
        "key": "difficulty",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "created_at",
        "key": "created_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "planning_at",
        "key": "planning_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ready_at",
        "key": "ready_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "expired_at",
        "key": "expired_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "executed_at",
        "key": "executed_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "slots",
        "key": "slots",
        "type": "Vec<FactionCrimeSlot>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rewards",
        "key": "rewards",
        "type": "Option<FactionCrimeReward>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeSlot": {
    "kind": "struct",
    "fields": [
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position_info",
        "key": "position_info",
        "type": "Option<FactionCrimePositionInfo>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_requirement",
        "key": "item_requirement",
        "type": "Option<FactionCrimeItemRequirement>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "user",
        "key": "user",
        "type": "Option<FactionCrimeUser>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "checkpoint_pass_rate",
        "key": "checkpoint_pass_rate",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimePositionInfo": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "label",
        "key": "label",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "number",
        "key": "number",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeItemRequirement": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_reusable",
        "key": "is_reusable",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_available",
        "key": "is_available",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeUser": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "outcome",
        "key": "outcome",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "outcome_duration",
        "key": "outcome_duration",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_outcome",
        "key": "item_outcome",
        "type": "Option<FactionCrimeUserItemOutcome>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "joined_at",
        "key": "joined_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "progress",
        "key": "progress",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeUserItemOutcome": {
    "kind": "struct",
    "fields": [
      {
        "name": "owned_by",
        "key": "owned_by",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_id",
        "key": "item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_uid",
        "key": "item_uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "outcome",
        "key": "outcome",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeReward": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Vec<FactionCrimeRewardItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "scope",
        "key": "scope",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "payout",
        "key": "payout",
        "type": "Option<FactionCrimeRewardPayout>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeRewardItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionCrimeRewardPayout": {
    "kind": "struct",
    "fields": [
      {
        "name": "payout_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "percentage",
        "key": "percentage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "paid_by",
        "key": "paid_by",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "paid_at",
        "key": "paid_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRacketSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "territory",
        "key": "territory",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "reward",
        "key": "reward",
        "type": "Option<FactionRacketRewardSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "created_at",
        "key": "created_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "changed_at",
        "key": "changed_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRacketRewardSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "reward_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRaidSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "aggressor",
        "key": "aggressor",
        "type": "Option<FactionWarfareFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defender",
        "key": "defender",
        "type": "Option<FactionWarfareFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritorySummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acquired_at",
        "key": "acquired_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "sector",
        "key": "sector",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "size",
        "key": "size",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "density",
        "key": "density",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "slots",
        "key": "slots",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "coordinates",
        "key": "coordinates",
        "type": "Option<FactionTerritoryCoordinatesSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "racket",
        "key": "racket",
        "type": "Option<FactionRacketSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryCoordinatesSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "x",
        "key": "x",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "y",
        "key": "y",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryOwnershipSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "irradiated",
        "key": "irradiated",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "owned_by",
        "key": "owned_by",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acquired_at",
        "key": "acquired_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryWarHistoryEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "war_id",
        "key": "war_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "territory",
        "key": "territory",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target",
        "key": "target",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "result",
        "key": "result",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "factions",
        "key": "factions",
        "type": "Vec<FactionTerritoryWarParticipantSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryWarParticipantSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_aggressor",
        "key": "is_aggressor",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionChainWarfareSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction",
        "key": "faction",
        "type": "Option<FactionWarfareFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryWarfareSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "territory",
        "key": "territory",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target",
        "key": "target",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "result",
        "key": "result",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "aggressor",
        "key": "aggressor",
        "type": "Option<FactionWarfareFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defender",
        "key": "defender",
        "type": "Option<FactionWarfareFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWarfareEntry": {
    "kind": "union",
    "variants": [
      "FactionRankedWarDetails",
      "FactionTerritoryWarfareSummary",
      "FactionChainWarfareSummary",
      "FactionRaidSummary",
      "FactionUnknownWarfareEntry"
    ]
  },
  "FactionUnknownWarfareEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWarfareFactionSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_aggressor",
        "key": "is_aggressor",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect_lost",
        "key": "respect_lost",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "players_on_wall",
        "key": "players_on_wall",
        "type": "Vec<FactionWarfareWallPlayerSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWarfareWallPlayerSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionWarfareUserSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionNewsEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "text",
        "key": "text",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRaidReportSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "aggressor",
        "key": "aggressor",
        "type": "Option<FactionRaidReportSideSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defender",
        "key": "defender",
        "type": "Option<FactionRaidReportSideSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRaidReportSideSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attackers",
        "key": "attackers",
        "type": "Vec<FactionRaidReportAttackerSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "non_attackers",
        "key": "non_attackers",
        "type": "Vec<FactionRaidReportUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRaidReportAttackerSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "user",
        "key": "user",
        "type": "Option<FactionRaidReportUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "damage",
        "key": "damage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRaidReportUserSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarReportSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "winner",
        "key": "winner",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "forfeit",
        "key": "forfeit",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "factions",
        "key": "factions",
        "type": "Vec<FactionRankedWarReportFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarReportFactionSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<FactionRankedWarReportRankSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rewards",
        "key": "rewards",
        "type": "Option<FactionRankedWarReportRewardsSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "members",
        "key": "members",
        "type": "Vec<FactionRankedWarReportMemberSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarReportRankSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "before",
        "key": "before",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "after",
        "key": "after",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarReportRewardsSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points",
        "key": "points",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Vec<FactionRankedWarReportRewardItemSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarReportRewardItemSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionRankedWarReportMemberSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryWarReportSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "territory",
        "key": "territory",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "started_at",
        "key": "started_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ended_at",
        "key": "ended_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "winner",
        "key": "winner",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "result",
        "key": "result",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "factions",
        "key": "factions",
        "type": "Vec<FactionTerritoryWarReportFactionSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryWarReportFactionSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_aggressor",
        "key": "is_aggressor",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "clears",
        "key": "clears",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "joins",
        "key": "joins",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "members",
        "key": "members",
        "type": "Vec<FactionTerritoryWarReportMemberSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionTerritoryWarReportMemberSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "username",
        "key": "username",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "joins",
        "key": "joins",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "clears",
        "key": "clears",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionUpgradesSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "core",
        "key": "core",
        "type": "Option<FactionUpgradeCore>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "peace",
        "key": "peace",
        "type": "Vec<FactionUpgradeBranch>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "war",
        "key": "war",
        "type": "Vec<FactionUpgradeBranch>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionUpgradeCore": {
    "kind": "struct",
    "fields": [
      {
        "name": "upgrades",
        "key": "upgrades",
        "type": "Vec<FactionUpgradeDetails>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionUpgradeBranch": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "order",
        "key": "order",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "multiplier",
        "key": "multiplier",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "upgrades",
        "key": "upgrades",
        "type": "Vec<FactionUpgradeDetails>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "FactionUpgradeDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ability",
        "key": "ability",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "unlocked_at",
        "key": "unlocked_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumCategoriesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "categories",
        "key": "categories",
        "type": "Vec<ForumCategory>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumLookupBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "selections",
        "key": "selections",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumThreadsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "threads",
        "key": "threads",
        "type": "Vec<ForumThread>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumThreadBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "thread",
        "key": "thread",
        "type": "ForumThread",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumPostsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "posts",
        "key": "posts",
        "type": "Vec<ForumPost>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumTimestampBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumCategory": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acronym",
        "key": "acronym",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "threads",
        "key": "threads",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumThread": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "forum_id",
        "key": "forum_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "posts",
        "key": "posts",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "views",
        "key": "views",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rating",
        "key": "rating",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_locked",
        "key": "is_locked",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_sticky",
        "key": "is_sticky",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "has_poll",
        "key": "has_poll",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "first_post_time",
        "key": "first_post_time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_post_time",
        "key": "last_post_time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "content",
        "key": "content",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "content_raw",
        "key": "content_raw",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "poll",
        "key": "poll",
        "type": "Option<ForumPoll>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "author",
        "key": "author",
        "type": "Option<ForumUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_poster",
        "key": "last_poster",
        "type": "Option<ForumUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "new_posts",
        "key": "new_posts",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumPost": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "thread_id",
        "key": "thread_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "author",
        "key": "author",
        "type": "Option<ForumUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_legacy",
        "key": "is_legacy",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_topic",
        "key": "is_topic",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_edited",
        "key": "is_edited",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_pinned",
        "key": "is_pinned",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "created_time",
        "key": "created_time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "edited_by",
        "key": "edited_by",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "has_quote",
        "key": "has_quote",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quoted_post_id",
        "key": "quoted_post_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "content",
        "key": "content",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "likes",
        "key": "likes",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dislikes",
        "key": "dislikes",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumUserSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "username",
        "key": "username",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "karma",
        "key": "karma",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumPoll": {
    "kind": "struct",
    "fields": [
      {
        "name": "question",
        "key": "question",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "answers_count",
        "key": "answers_count",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "answers",
        "key": "answers",
        "type": "Vec<ForumPollAnswer>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "ForumPollAnswer": {
    "kind": "struct",
    "fields": [
      {
        "name": "answer",
        "key": "answer",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "votes",
        "key": "votes",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "KeyLogBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "log",
        "key": "log",
        "type": "Vec<KeyLogEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "KeyInfoBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "info",
        "key": "info",
        "type": "KeyInfo",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "KeyLogEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "entry_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "selections",
        "key": "selections",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "id",
        "key": "id",
        "type": "Option<KeyLogTargetId>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "comment",
        "key": "comment",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ip",
        "key": "ip",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "KeyLogTargetId": {
    "kind": "union",
    "variants": [
      "u64",
      "String"
    ]
  },
  "KeyInfo": {
    "kind": "struct",
    "fields": [
      {
        "name": "access",
        "key": "access",
        "type": "Option<KeyAccess>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "selections",
        "key": "selections",
        "type": "Option<KeySelections>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "KeyAccess": {
    "kind": "struct",
    "fields": [
      {
        "name": "access_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company",
        "key": "company",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction",
        "key": "faction",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "log",
        "key": "log",
        "type": "Option<KeyLogAccess>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "custom_permissions",
        "key": "custom_permissions",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "KeyLogAccess": {
    "kind": "struct",
    "fields": [
      {
        "name": "available",
        "key": "available",
        "type": "Vec<KeyLogCategoryAccess>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "KeyLogCategoryAccess": {
    "kind": "struct",
    "fields": [
      {
        "name": "category_id",
        "key": "category_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "log_ids",
        "key": "log_ids",
        "type": "Vec<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "KeySelections": {
    "kind": "struct",
    "fields": [
      {
        "name": "user",
        "key": "user",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction",
        "key": "faction",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "forum",
        "key": "forum",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "key",
        "key": "key",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market",
        "key": "market",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "property",
        "key": "property",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "racing",
        "key": "racing",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "torn",
        "key": "torn",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company",
        "key": "company",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketLookupBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "selections",
        "key": "selections",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketTimestampBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketPointsMarketBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "pointsmarket",
        "key": "pointsmarket",
        "type": "BTreeMap<String, MarketPointsMarketListing>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketPointsMarketListing": {
    "kind": "struct",
    "fields": [
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total_cost",
        "key": "total_cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketBazaarBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "bazaar",
        "key": "bazaar",
        "type": "MarketBazaar",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketItemMarketBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "itemmarket",
        "key": "itemmarket",
        "type": "MarketItemMarket",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<MarketMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketPropertiesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "properties",
        "key": "properties",
        "type": "MarketPropertyCatalog",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "properties_timestamp",
        "key": "properties_timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "properties_delay",
        "key": "properties_delay",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<MarketMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketRentalsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "rentals",
        "key": "rentals",
        "type": "MarketRentalCatalog",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rentals_timestamp",
        "key": "rentals_timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rentals_delay",
        "key": "rentals_delay",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<MarketMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketAuctionHouseBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "auctionhouse",
        "key": "auctionhouse",
        "type": "Vec<MarketAuctionHouseListing>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<MarketMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketAuctionHouseListingBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "auctionhouselisting",
        "key": "auctionhouselisting",
        "type": "MarketAuctionHouseListing",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketBazaar": {
    "kind": "struct",
    "fields": [
      {
        "name": "advanced_item",
        "key": "advanced_item",
        "type": "Vec<MarketBazaarSellerSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bargain",
        "key": "bargain",
        "type": "Vec<MarketBazaarSellerSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bulk",
        "key": "bulk",
        "type": "Vec<MarketBazaarSellerSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "busiest",
        "key": "busiest",
        "type": "Vec<MarketBazaarSellerSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dollar_sale",
        "key": "dollar_sale",
        "type": "Vec<MarketBazaarSellerSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketBazaarSellerSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_open",
        "key": "is_open",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "weekly_customers",
        "key": "weekly_customers",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "advanced_item_sales",
        "key": "advanced_item_sales",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bargain_sales",
        "key": "bargain_sales",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bulk_sales",
        "key": "bulk_sales",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dollar_sales",
        "key": "dollar_sales",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketItemMarket": {
    "kind": "struct",
    "fields": [
      {
        "name": "cache_timestamp",
        "key": "cache_timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cache_delay",
        "key": "cache_delay",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item",
        "key": "item",
        "type": "Option<MarketItemSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "listings",
        "key": "listings",
        "type": "Vec<MarketListingSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketItemSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "average_price",
        "key": "average_price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketListingSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "price",
        "key": "price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_details",
        "key": "item_details",
        "type": "Option<MarketItemDetails>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketItemDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "uid",
        "key": "uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rarity",
        "key": "rarity",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stats",
        "key": "stats",
        "type": "Option<MarketItemStats>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonuses",
        "key": "bonuses",
        "type": "Vec<MarketItemBonus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketItemStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "damage",
        "key": "damage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "accuracy",
        "key": "accuracy",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "armor",
        "key": "armor",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quality",
        "key": "quality",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketItemBonus": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketPropertyCatalog": {
    "kind": "struct",
    "fields": [
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "listings",
        "key": "listings",
        "type": "Vec<MarketPropertyListing>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "property",
        "key": "property",
        "type": "Option<MarketPropertyTypeSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketRentalCatalog": {
    "kind": "struct",
    "fields": [
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "listings",
        "key": "listings",
        "type": "Vec<MarketRentalListing>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "property",
        "key": "property",
        "type": "Option<MarketPropertyTypeSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketPropertyListing": {
    "kind": "struct",
    "fields": [
      {
        "name": "happy",
        "key": "happy",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market_price",
        "key": "market_price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "upkeep",
        "key": "upkeep",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifications",
        "key": "modifications",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketRentalListing": {
    "kind": "struct",
    "fields": [
      {
        "name": "happy",
        "key": "happy",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost_per_day",
        "key": "cost_per_day",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rental_period",
        "key": "rental_period",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market_price",
        "key": "market_price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "upkeep",
        "key": "upkeep",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifications",
        "key": "modifications",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketPropertyTypeSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketAuctionHouseListing": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "seller",
        "key": "seller",
        "type": "Option<MarketUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "buyer",
        "key": "buyer",
        "type": "Option<MarketUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "price",
        "key": "price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bids",
        "key": "bids",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item",
        "key": "item",
        "type": "Option<MarketAuctionItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketUserSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketAuctionItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "uid",
        "key": "uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "sub_type",
        "key": "sub_type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stats",
        "key": "stats",
        "type": "Option<MarketItemStats>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonuses",
        "key": "bonuses",
        "type": "Vec<MarketItemBonus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rarity",
        "key": "rarity",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "MarketMetadata": {
    "kind": "alias",
    "type": "PaginatedMetadataWithTotal"
  },
  "MarketPaginationLinks": {
    "kind": "alias",
    "type": "super::common::PaginatedLinks"
  },
  "PropertyLookupBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "selections",
        "key": "selections",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PropertyBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "property",
        "key": "property",
        "type": "PropertyDetails",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PropertyTimestampBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PropertyDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "happy",
        "key": "happy",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market_price",
        "key": "market_price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "owner",
        "key": "owner",
        "type": "Option<PropertyActor>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rented_by",
        "key": "rented_by",
        "type": "Option<PropertyActor>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "used_by",
        "key": "used_by",
        "type": "Vec<PropertyActor>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "staff",
        "key": "staff",
        "type": "Vec<PropertyStaffSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "property",
        "key": "property",
        "type": "Option<PropertyTypeSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "upkeep",
        "key": "upkeep",
        "type": "Option<PropertyUpkeep>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifications",
        "key": "modifications",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PropertyActor": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PropertyStaffSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "staff_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PropertyTypeSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "PropertyUpkeep": {
    "kind": "struct",
    "fields": [
      {
        "name": "property",
        "key": "property",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "staff",
        "key": "staff",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingCarsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "cars",
        "key": "cars",
        "type": "Vec<RacingCar>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingCarUpgradesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "carupgrades",
        "key": "carupgrades",
        "type": "Vec<RacingCarUpgrade>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingLookupBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "selections",
        "key": "selections",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingRaceBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "race",
        "key": "race",
        "type": "RacingRace",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingRacesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "races",
        "key": "races",
        "type": "Vec<RacingRace>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingRecordsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "records",
        "key": "records",
        "type": "Vec<RacingRecord>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingTimestampBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingTracksBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "tracks",
        "key": "tracks",
        "type": "Vec<RacingTrack>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingCar": {
    "kind": "struct",
    "fields": [
      {
        "name": "car_item_id",
        "key": "car_item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_name",
        "key": "car_item_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "top_speed",
        "key": "top_speed",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acceleration",
        "key": "acceleration",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "braking",
        "key": "braking",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dirt",
        "key": "dirt",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "handling",
        "key": "handling",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "safety",
        "key": "safety",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tarmac",
        "key": "tarmac",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_class",
        "key": "class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingCarUpgrade": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "class_required",
        "key": "class_required",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "category",
        "key": "category",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "subcategory",
        "key": "subcategory",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "effects",
        "key": "effects",
        "type": "Option<RacingCarUpgradeEffects>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<RacingCarUpgradeCost>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingCarUpgradeCost": {
    "kind": "struct",
    "fields": [
      {
        "name": "points",
        "key": "points",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cash",
        "key": "cash",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingCarUpgradeEffects": {
    "kind": "struct",
    "fields": [
      {
        "name": "top_speed",
        "key": "top_speed",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acceleration",
        "key": "acceleration",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "braking",
        "key": "braking",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "handling",
        "key": "handling",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "safety",
        "key": "safety",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dirt",
        "key": "dirt",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tarmac",
        "key": "tarmac",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingParticipants": {
    "kind": "struct",
    "fields": [
      {
        "name": "minimum",
        "key": "minimum",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "maximum",
        "key": "maximum",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "current",
        "key": "current",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingRace": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "track_id",
        "key": "track_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "creator_id",
        "key": "creator_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_official",
        "key": "is_official",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "laps",
        "key": "laps",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "participants",
        "key": "participants",
        "type": "Option<RacingParticipants>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "requirements",
        "key": "requirements",
        "type": "Option<RacingRequirements>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "schedule",
        "key": "schedule",
        "type": "Option<RacingSchedule>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "results",
        "key": "results",
        "type": "Vec<RacingResult>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingRecord": {
    "kind": "struct",
    "fields": [
      {
        "name": "driver_id",
        "key": "driver_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "driver_name",
        "key": "driver_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_id",
        "key": "car_item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "lap_time",
        "key": "lap_time",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_name",
        "key": "car_item_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingRequirements": {
    "kind": "struct",
    "fields": [
      {
        "name": "car_class",
        "key": "car_class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_id",
        "key": "car_item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "driver_class",
        "key": "driver_class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "join_fee",
        "key": "join_fee",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "requires_password",
        "key": "requires_password",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "requires_stock_car",
        "key": "requires_stock_car",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingResult": {
    "kind": "struct",
    "fields": [
      {
        "name": "position",
        "key": "position",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "driver_id",
        "key": "driver_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_id",
        "key": "car_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_id",
        "key": "car_item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_name",
        "key": "car_item_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_class",
        "key": "car_class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "race_time",
        "key": "race_time",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "best_lap_time",
        "key": "best_lap_time",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "has_crashed",
        "key": "has_crashed",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "time_ended",
        "key": "time_ended",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingSchedule": {
    "kind": "struct",
    "fields": [
      {
        "name": "join_from",
        "key": "join_from",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "join_until",
        "key": "join_until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "RacingTrack": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCalendarBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "calendar",
        "key": "calendar",
        "type": "TornCalendar",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "items",
        "key": "items",
        "type": "Vec<TornItemSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornHonorsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "honors",
        "key": "honors",
        "type": "Vec<TornHonorSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornMedalsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "medals",
        "key": "medals",
        "type": "Vec<TornMedalSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornLogCategoriesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "logcategories",
        "key": "logcategories",
        "type": "Vec<TornLogCategory>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornLogTypesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "logtypes",
        "key": "logtypes",
        "type": "Vec<TornLogType>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornMeritsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "merits",
        "key": "merits",
        "type": "Vec<TornMerit>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemAmmoBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "itemammo",
        "key": "itemammo",
        "type": "Vec<TornAmmoItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemModsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "itemmods",
        "key": "itemmods",
        "type": "Vec<TornItemMod>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornPropertiesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "properties",
        "key": "properties",
        "type": "Vec<TornPropertyCatalogEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStocksBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "stocks",
        "key": "stocks",
        "type": "Vec<TornStockSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "stock",
        "key": "stocks",
        "type": "TornStockDetailed",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornBountiesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "bounties",
        "key": "bounties",
        "type": "Vec<TornBounty>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bounties_timestamp",
        "key": "bounties_timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bounties_delay",
        "key": "bounties_delay",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadataWithTotal>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornAttackLogBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "attacklog",
        "key": "attacklog",
        "type": "TornAttackLog",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornBankBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "bank",
        "key": "bank",
        "type": "TornBankRates",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCardsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "cards",
        "key": "cards",
        "type": "BTreeMap<String, TornCard>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCityShopsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "cityshops",
        "key": "cityshops",
        "type": "BTreeMap<String, TornCityShop>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCompaniesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "companies",
        "key": "companies",
        "type": "BTreeMap<String, TornCompany>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornGymsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "gyms",
        "key": "gyms",
        "type": "BTreeMap<String, TornGym>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornPawnshopBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "pawnshop",
        "key": "pawnshop",
        "type": "TornPawnshop",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornPokerTablesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "pokertables",
        "key": "pokertables",
        "type": "BTreeMap<String, TornPokerTable>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornLookupBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "selections",
        "key": "selections",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornTimestampBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCompetitionBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "competition",
        "key": "competition",
        "type": "Vec<TornCompetitionEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCrimesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "crimes",
        "key": "crimes",
        "type": "Vec<TornCrime>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornEducationBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "education",
        "key": "education",
        "type": "Vec<TornEducationCourse>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornEliminationBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "elimination",
        "key": "elimination",
        "type": "Option<TornDynamicObject>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornEliminationTeamBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "eliminationteam",
        "key": "eliminationteam",
        "type": "Vec<TornEliminationTeamEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornFactionHofBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "factionhof",
        "key": "factionhof",
        "type": "Option<TornDynamicObject>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornFactionTreeBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "factiontree",
        "key": "factiontree",
        "type": "Option<TornDynamicObject>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornHofBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "hof",
        "key": "hof",
        "type": "Option<TornDynamicObject>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornOrganisedCrimesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "organisedcrimes",
        "key": "organisedcrimes",
        "type": "BTreeMap<String, TornOrganisedCrime>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornOrganizedCrimesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "organizedcrimes",
        "key": "organizedcrimes",
        "type": "Vec<TornOrganizedCrime>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornRockPaperScissorsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "rockpaperscissors",
        "key": "rockpaperscissors",
        "type": "Vec<TornCountEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornSearchForCashBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "searchforcash",
        "key": "searchforcash",
        "type": "BTreeMap<String, TornPercentageEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornShopliftingBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "shoplifting",
        "key": "shoplifting",
        "type": "BTreeMap<String, Vec<TornShopliftingEntry>>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStatsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "stats",
        "key": "stats",
        "type": "BTreeMap<String, DynamicValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornSubcrimesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "subcrimes",
        "key": "subcrimes",
        "type": "Option<TornDynamicObject>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornTerritoryBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "territory",
        "key": "territory",
        "type": "Option<TornDynamicObject>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemDetailsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "itemdetails",
        "key": "itemdetails",
        "type": "Option<TornItemDetailsSelection>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemStatsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "itemstats",
        "key": "itemstats",
        "type": "TornItemStats",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornEliminationTeamEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCompetitionEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "competition_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCrime": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "category",
        "key": "category",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "nerve",
        "key": "nerve",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "notes",
        "key": "notes",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornEducationCourse": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "money_cost",
        "key": "money_cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tier",
        "key": "tier",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "duration",
        "key": "duration",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "results",
        "key": "results",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "prerequisites",
        "key": "prerequisites",
        "type": "Vec<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornOrganisedCrime": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "members",
        "key": "members",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "time",
        "key": "time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "success_chance",
        "key": "success_chance",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornOrganizedCrime": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "difficulty",
        "key": "difficulty",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "scope",
        "key": "scope",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "slots",
        "key": "slots",
        "type": "Vec<TornOrganizedCrimeSlot>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornOrganizedCrimeSlot": {
    "kind": "struct",
    "fields": [
      {
        "name": "position_info",
        "key": "position_info",
        "type": "Option<TornOrganizedCrimePositionInfo>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_requirement",
        "key": "item_requirement",
        "type": "Option<DynamicValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornOrganizedCrimePositionInfo": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "label",
        "key": "label",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "number",
        "key": "number",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemDetailsSelection": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "Option<DynamicValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Vec<TornItemSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCalendar": {
    "kind": "struct",
    "fields": [
      {
        "name": "competitions",
        "key": "competitions",
        "type": "Vec<TornCalendarEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "events",
        "key": "events",
        "type": "Vec<TornCalendarEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCalendarEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "fixed_start_time",
        "key": "fixed_start_time",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "circulation",
        "key": "circulation",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_tradable",
        "key": "is_tradable",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_found_in_city",
        "key": "is_found_in_city",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "Option<TornItemDetails>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "category",
        "key": "category",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "base_stats",
        "key": "base_stats",
        "type": "Option<TornItemBaseStats>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemBaseStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "damage",
        "key": "damage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "accuracy",
        "key": "accuracy",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "armor",
        "key": "armor",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornHonorSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rarity",
        "key": "rarity",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "circulation",
        "key": "circulation",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "equipped",
        "key": "equipped",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "honor_type",
        "key": "type",
        "type": "Option<TornAwardType>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornMedalSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rarity",
        "key": "rarity",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "circulation",
        "key": "circulation",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "medal_type",
        "key": "type",
        "type": "Option<TornAwardType>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornAwardType": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornLogCategory": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornLogType": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornMerit": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornAmmoItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "price",
        "key": "price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "types",
        "key": "types",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemMod": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "image",
        "key": "image",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dual_fit",
        "key": "dual_fit",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "weapons",
        "key": "weapons",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornPropertyCatalogEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "happy",
        "key": "happy",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "upkeep",
        "key": "upkeep",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifications",
        "key": "modifications",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [
          "upgrades_available"
        ],
        "custom": null
      },
      {
        "name": "staff",
        "key": "staff",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [
          "staff_available"
        ],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acronym",
        "key": "acronym",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "images",
        "key": "images",
        "type": "Option<TornStockImages>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market",
        "key": "market",
        "type": "Option<TornStockMarket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonus",
        "key": "bonus",
        "type": "Option<TornStockBonus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockDetailed": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acronym",
        "key": "acronym",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "images",
        "key": "images",
        "type": "Option<TornStockImages>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market",
        "key": "market",
        "type": "Option<TornStockMarket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonus",
        "key": "bonus",
        "type": "Option<TornStockBonus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chart",
        "key": "chart",
        "type": "Option<TornStockChart>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockImages": {
    "kind": "struct",
    "fields": [
      {
        "name": "logo",
        "key": "logo",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "full",
        "key": "full",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockMarket": {
    "kind": "struct",
    "fields": [
      {
        "name": "price",
        "key": "price",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cap",
        "key": "cap",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "shares",
        "key": "shares",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "investors",
        "key": "investors",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockBonus": {
    "kind": "struct",
    "fields": [
      {
        "name": "passive",
        "key": "passive",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "frequency",
        "key": "frequency",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "requirement",
        "key": "requirement",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockChart": {
    "kind": "struct",
    "fields": [
      {
        "name": "performance",
        "key": "performance",
        "type": "Option<TornStockPerformance>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "history",
        "key": "history",
        "type": "Vec<TornStockHistoryEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockPerformance": {
    "kind": "struct",
    "fields": [
      {
        "name": "last_hour",
        "key": "last_hour",
        "type": "Option<TornStockPerformanceWindow>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_day",
        "key": "last_day",
        "type": "Option<TornStockPerformanceWindow>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_week",
        "key": "last_week",
        "type": "Option<TornStockPerformanceWindow>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_month",
        "key": "last_month",
        "type": "Option<TornStockPerformanceWindow>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_year",
        "key": "last_year",
        "type": "Option<TornStockPerformanceWindow>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "all_time",
        "key": "all_time",
        "type": "Option<TornStockPerformanceWindow>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockPerformanceWindow": {
    "kind": "struct",
    "fields": [
      {
        "name": "change",
        "key": "change",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "change_percentage",
        "key": "change_percentage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "high",
        "key": "high",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "low",
        "key": "low",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornStockHistoryEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "price",
        "key": "price",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "change",
        "key": "change",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornBounty": {
    "kind": "struct",
    "fields": [
      {
        "name": "target_id",
        "key": "target_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target_name",
        "key": "target_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target_level",
        "key": "target_level",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "lister_id",
        "key": "lister_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "lister_name",
        "key": "lister_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "reward",
        "key": "reward",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "reason",
        "key": "reason",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_anonymous",
        "key": "is_anonymous",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "valid_until",
        "key": "valid_until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornAttackLog": {
    "kind": "struct",
    "fields": [
      {
        "name": "log",
        "key": "log",
        "type": "Vec<TornAttackLogEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "summary",
        "key": "summary",
        "type": "Vec<TornAttackLogSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornAttackLogSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "hits",
        "key": "hits",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "misses",
        "key": "misses",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "damage",
        "key": "damage",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornAttackLogEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "text",
        "key": "text",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "action",
        "key": "action",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "icon",
        "key": "icon",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacker",
        "key": "attacker",
        "type": "Option<TornAttackParticipant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defender",
        "key": "defender",
        "type": "Option<TornAttackParticipant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacker_item",
        "key": "attacker_item",
        "type": "Option<TornAttackItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornAttackParticipant": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item",
        "key": "item",
        "type": "Option<TornAttackItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornAttackItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornBankRates": {
    "kind": "struct",
    "fields": [
      {
        "name": "one_week",
        "key": "1w",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "two_weeks",
        "key": "2w",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "one_month",
        "key": "1m",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "two_months",
        "key": "2m",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "three_months",
        "key": "3m",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCard": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "short",
        "key": "short",
        "type": "Option<TornCardShort>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "css_class",
        "key": "class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCardShort": {
    "kind": "union",
    "variants": [
      "u64",
      "String"
    ]
  },
  "TornCityShop": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "inventory",
        "key": "inventory",
        "type": "BTreeMap<String, TornCityShopItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCityShopItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "price",
        "key": "price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "in_stock",
        "key": "in_stock",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCompany": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "default_employees",
        "key": "default_employees",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "positions",
        "key": "positions",
        "type": "BTreeMap<String, TornCompanyPosition>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCompanyPosition": {
    "kind": "struct",
    "fields": [
      {
        "name": "man_required",
        "key": "man_required",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "int_required",
        "key": "int_required",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end_required",
        "key": "end_required",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "man_gain",
        "key": "man_gain",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "int_gain",
        "key": "int_gain",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end_gain",
        "key": "end_gain",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "special_ability",
        "key": "special_ability",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornGym": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stage",
        "key": "stage",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "energy",
        "key": "energy",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "strength",
        "key": "strength",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "speed",
        "key": "speed",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defense",
        "key": "defense",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dexterity",
        "key": "dexterity",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "note",
        "key": "note",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornPawnshop": {
    "kind": "struct",
    "fields": [
      {
        "name": "points_value",
        "key": "points_value",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "donatorpack_value",
        "key": "donatorpack_value",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornPokerTable": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "big_blind",
        "key": "big_blind",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "small_blind",
        "key": "small_blind",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "speed",
        "key": "speed",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "current_players",
        "key": "current_players",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "maximum_players",
        "key": "maximum_players",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornItemStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "armory_id",
        "key": "armoryID",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "armory_id"
        ],
        "custom": null
      },
      {
        "name": "id",
        "key": "ID",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "id"
        ],
        "custom": null
      },
      {
        "name": "sell",
        "key": "sell",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "qty",
        "key": "Qty",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "qty"
        ],
        "custom": null
      },
      {
        "name": "sell_total",
        "key": "SellTotal",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "sell_total"
        ],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "type2",
        "key": "type2",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [
          "sub_type"
        ],
        "custom": null
      },
      {
        "name": "dmg",
        "key": "dmg",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "damage",
        "key": "damage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "accuracy",
        "key": "accuracy",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acc",
        "key": "acc",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "arm",
        "key": "arm",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "weptype",
        "key": "weptype",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [
          "weapon_type"
        ],
        "custom": null
      },
      {
        "name": "uid",
        "key": "UID",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "uid"
        ],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "original_type",
        "key": "originalType",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [
          "original_type"
        ],
        "custom": null
      },
      {
        "name": "market_price",
        "key": "market_price",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stats",
        "key": "stats",
        "type": "Vec<DynamicValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornCountEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "entry_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "count",
        "key": "count",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornPercentageEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "percentage",
        "key": "percentage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornShopliftingEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "disabled",
        "key": "disabled",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TornDynamicObject": {
    "kind": "alias",
    "type": "BTreeMap<String, DynamicValue>"
  },
  "UserProfileBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "profile",
        "key": "profile",
        "type": "UserProfile",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBasicBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "profile",
        "key": "profile",
        "type": "UserBasicProfile",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserDiscordBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "discord",
        "key": "discord",
        "type": "UserDiscord",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCasinoBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "casino",
        "key": "casino",
        "type": "UserCasino",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserFactionBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "faction",
        "key": "faction",
        "type": "UserFaction",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMoneyBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "UserMoney",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBarsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "bars",
        "key": "bars",
        "type": "UserBars",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCooldownsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "cooldowns",
        "key": "cooldowns",
        "type": "UserCooldowns",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAmmoBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "ammo",
        "key": "ammo",
        "type": "Vec<UserAmmoItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBattleStatsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "battlestats",
        "key": "battlestats",
        "type": "UserBattleStats",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEquipmentBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "equipment",
        "key": "equipment",
        "type": "Vec<UserEquipmentItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "clothing",
        "key": "clothing",
        "type": "Vec<UserClothingItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserItemModsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "itemmods",
        "key": "itemmods",
        "type": "Vec<TornItemMod>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMissionsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "missions",
        "key": "missions",
        "type": "UserMissions",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTimestampBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserNotificationsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "notifications",
        "key": "notifications",
        "type": "UserNotifications",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserIconsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "icons",
        "key": "icons",
        "type": "Vec<UserIcon>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEnlistedCarsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "enlistedcars",
        "key": "enlistedcars",
        "type": "Vec<UserEnlistedCar>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserJobBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "job",
        "key": "job",
        "type": "Option<UserEmployment>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserJobPointsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "jobpoints",
        "key": "jobpoints",
        "type": "UserJobPoints",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserJobRanksBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "jobranks",
        "key": "jobranks",
        "type": "UserJobRanks",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRefillsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "refills",
        "key": "refills",
        "type": "UserRefills",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserSkillsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "skills",
        "key": "skills",
        "type": "Vec<UserSkill>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserStocksBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "stocks",
        "key": "stocks",
        "type": "Vec<UserStockHolding>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCalendarBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "calendar",
        "key": "calendar",
        "type": "UserCalendar",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserLookupBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "selections",
        "key": "selections",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserFactionBalanceBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "faction_balance",
        "key": "factionBalance",
        "type": "Option<UserFactionBalance>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEducationBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "education",
        "key": "education",
        "type": "UserEducation",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCompetitionBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "competition",
        "key": "competition",
        "type": "Option<UserCompetition>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserWeaponExpBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "weaponexp",
        "key": "weaponexp",
        "type": "Vec<UserWeaponExpEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRacingRecordsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "racingrecords",
        "key": "racingrecords",
        "type": "Vec<UserRacingRecordSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserHonorsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "honors",
        "key": "honors",
        "type": "Vec<UserAwardUnlock>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMedalsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "medals",
        "key": "medals",
        "type": "Vec<UserAwardUnlock>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserInventoryBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "inventory",
        "key": "inventory",
        "type": "UserInventory",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadataWithTotal>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTradesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "trades",
        "key": "trades",
        "type": "Vec<UserTrade>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTradeBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "trade",
        "key": "trade",
        "type": "UserTradeDetailed",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTravelBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "travel",
        "key": "travel",
        "type": "UserTravel",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserDisplayBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "display",
        "key": "display",
        "type": "Vec<UserLegacyItemSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserGymBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "active_gym",
        "key": "active_gym",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPerksBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "faction_perks",
        "key": "faction_perks",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "job_perks",
        "key": "job_perks",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "property_perks",
        "key": "property_perks",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "education_perks",
        "key": "education_perks",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "enhancer_perks",
        "key": "enhancer_perks",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "book_perks",
        "key": "book_perks",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stock_perks",
        "key": "stock_perks",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "merit_perks",
        "key": "merit_perks",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCriminalRecordBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "criminalrecord",
        "key": "criminalrecord",
        "type": "UserCriminalRecord",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBazaarBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "bazaar_is_open",
        "key": "bazaar_is_open",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bazaar",
        "key": "bazaar",
        "type": "Vec<UserLegacyItemSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserReportsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "reports",
        "key": "reports",
        "type": "Vec<UserReportSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "crimes",
        "key": "crimes",
        "type": "UserCrimeSummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserListBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "list",
        "key": "list",
        "type": "Vec<UserListEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadataWithTotal>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserLogBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "log",
        "key": "log",
        "type": "Vec<UserLogEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserNetworthBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "networth",
        "key": "networth",
        "type": "UserNetworth",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPersonalStatsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "personalstats",
        "key": "personalstats",
        "type": "Option<UserPersonalStatsSelection>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEventsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "events",
        "key": "events",
        "type": "Vec<UserEvent>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserNewEventsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "events",
        "key": "events",
        "type": "Vec<UserEvent>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMessagesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "messages",
        "key": "messages",
        "type": "Vec<UserMessage>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserNewMessagesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "messages",
        "key": "messages",
        "type": "Vec<UserMessage>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRacesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "races",
        "key": "races",
        "type": "Vec<UserRace>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAttacksBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Vec<UserAttack>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAttacksFullBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Vec<UserAttackFull>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRevivesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "revives",
        "key": "revives",
        "type": "Vec<UserRevive>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRevivesFullBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "revives",
        "key": "revives",
        "type": "Vec<UserReviveFull>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserHofBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "hof",
        "key": "hof",
        "type": "UserHofStats",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBountiesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "bounties",
        "key": "bounties",
        "type": "Vec<UserBounty>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bounties_timestamp",
        "key": "bounties_timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bounties_delay",
        "key": "bounties_delay",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPropertiesBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "properties",
        "key": "properties",
        "type": "Vec<UserPropertySummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPropertyBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "property",
        "key": "property",
        "type": "UserPropertySummary",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserForumThreadsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "forum_threads",
        "key": "forumThreads",
        "type": "Vec<ForumThread>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserForumPostsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "forum_posts",
        "key": "forumPosts",
        "type": "Vec<ForumPost>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserForumSubscribedThreadsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "forum_subscribed_threads",
        "key": "forumSubscribedThreads",
        "type": "Vec<UserForumSubscribedThread>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserForumFeedBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "forum_feed",
        "key": "forumFeed",
        "type": "Vec<UserForumFeedEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserForumFriendsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "forum_friends",
        "key": "forumFriends",
        "type": "Vec<UserForumFeedEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserWorkStatsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "workstats",
        "key": "workstats",
        "type": "UserWorkStats",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMeritsBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "merits",
        "key": "merits",
        "type": "UserMerits",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserItemMarketBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "itemmarket",
        "key": "itemmarket",
        "type": "Vec<UserItemMarketListing>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "_metadata",
        "key": "_metadata",
        "type": "Option<PaginatedMetadata>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimeBundle": {
    "kind": "struct",
    "fields": [
      {
        "name": "organized_crime",
        "key": "organizedCrime",
        "type": "Option<UserOrganizedCrimeSelection>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserLegacyItemSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "ID",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "id"
        ],
        "custom": null
      },
      {
        "name": "uid",
        "key": "UID",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "uid"
        ],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "circulation",
        "key": "circulation",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market_price",
        "key": "market_price",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCriminalRecord": {
    "kind": "struct",
    "fields": [
      {
        "name": "vandalism",
        "key": "vandalism",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "theft",
        "key": "theft",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "counterfeiting",
        "key": "counterfeiting",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "fraud",
        "key": "fraud",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "illicitservices",
        "key": "illicitservices",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cybercrime",
        "key": "cybercrime",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extortion",
        "key": "extortion",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "illegalproduction",
        "key": "illegalproduction",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserReportSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "report_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target_id",
        "key": "target_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "reporter_id",
        "key": "reporter_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "report",
        "key": "report",
        "type": "UserReportDetails",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "nerve_spent",
        "key": "nerve_spent",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "skill",
        "key": "skill",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "progression_bonus",
        "key": "progression_bonus",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rewards",
        "key": "rewards",
        "type": "Option<UserCrimeRewards>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attempts",
        "key": "attempts",
        "type": "Option<UserCrimeAttempts>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "uniques",
        "key": "uniques",
        "type": "Vec<UserCrimeUnique>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "miscellaneous",
        "key": "miscellaneous",
        "type": "Option<UserCrimeMiscellaneous>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeRewards": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ammo",
        "key": "ammo",
        "type": "Option<UserCrimeRewardAmmo>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Vec<UserCrimeRewardItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeRewardAmmo": {
    "kind": "struct",
    "fields": [
      {
        "name": "standard",
        "key": "standard",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "special",
        "key": "special",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeRewardItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "amount",
          "quantity"
        ],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeAttempts": {
    "kind": "struct",
    "fields": [
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "success",
        "key": "success",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "fail",
        "key": "fail",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "critical_fail",
        "key": "critical_fail",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "subcrimes",
        "key": "subcrimes",
        "type": "Vec<UserCrimeAttemptSubcrime>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeAttemptSubcrime": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "success",
        "key": "success",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "fail",
        "key": "fail",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeUnique": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rewards",
        "key": "rewards",
        "type": "Option<UserCrimeUniqueRewards>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeUniqueRewards": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ammo",
        "key": "ammo",
        "type": "Option<UserCrimeRewardAmmo>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Vec<UserCrimeRewardItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserListEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<UserStatus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_action",
        "key": "last_action",
        "type": "Option<UserLastAction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserLogEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "Option<UserLogDetails>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "data",
        "key": "data",
        "type": "DynamicValue",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "params",
        "key": "params",
        "type": "DynamicValue",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserLogDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "category",
        "key": "category",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserReportDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "fields",
        "key": "fields",
        "type": "BTreeMap<String, DynamicValue>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCrimeMiscellaneous": {
    "kind": "struct",
    "fields": [
      {
        "name": "fields",
        "key": "fields",
        "type": "BTreeMap<String, DynamicValue>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserNetworth": {
    "kind": "struct",
    "fields": [
      {
        "name": "pending",
        "key": "pending",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "wallet",
        "key": "wallet",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bank",
        "key": "bank",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points",
        "key": "points",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cayman",
        "key": "cayman",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "vault",
        "key": "vault",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "piggybank",
        "key": "piggybank",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "displaycase",
        "key": "displaycase",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bazaar",
        "key": "bazaar",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "trade",
        "key": "trade",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "itemmarket",
        "key": "itemmarket",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "properties",
        "key": "properties",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stockmarket",
        "key": "stockmarket",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "auctionhouse",
        "key": "auctionhouse",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company",
        "key": "company",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bookie",
        "key": "bookie",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "enlistedcars",
        "key": "enlistedcars",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "loan",
        "key": "loan",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "unpaidfees",
        "key": "unpaidfees",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "parsetime",
        "key": "parsetime",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPersonalStatsSelection": {
    "kind": "union",
    "variants": [
      "Box<UserPersonalStatsCategory>",
      "Vec<UserPersonalStatPoint>",
      "Value"
    ]
  },
  "UserPersonalStatsCategory": {
    "kind": "struct",
    "fields": [
      {
        "name": "attacking",
        "key": "attacking",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "jobs",
        "key": "jobs",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "hospital",
        "key": "hospital",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "crimes",
        "key": "crimes",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "travel",
        "key": "travel",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "drugs",
        "key": "drugs",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "networth",
        "key": "networth",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "other",
        "key": "other",
        "type": "Option<UserPersonalStatsBucket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPersonalStatsBucket": {
    "kind": "struct",
    "fields": [
      {
        "name": "stats",
        "key": "stats",
        "type": "BTreeMap<String, DynamicValue>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPersonalStatPoint": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserProfile": {
    "kind": "struct",
    "fields": [
      {
        "name": "donator_status",
        "key": "donator_status",
        "type": "Option<crate::models::generated::openapi::UserDonatorStatusEnum>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "revive_setting",
        "key": "revive_setting",
        "type": "Option<crate::models::generated::openapi::ReviveSetting>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "age",
        "key": "age",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "karma",
        "key": "karma",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "revivable",
        "key": "revivable",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "life",
        "key": "life",
        "type": "Option<UserLifeBar>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_action",
        "key": "last_action",
        "type": "Option<UserLastAction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBasicProfile": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "gender",
        "key": "gender",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<UserStatus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserStatus": {
    "kind": "struct",
    "fields": [
      {
        "name": "state",
        "key": "state",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "color",
        "key": "color",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "plane_image_type",
        "key": "plane_image_type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "until",
        "key": "until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserDiscord": {
    "kind": "struct",
    "fields": [
      {
        "name": "discord_id",
        "key": "discord_id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [
          "discordID"
        ],
        "custom": null
      },
      {
        "name": "user_id",
        "key": "user_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCasino": {
    "kind": "struct",
    "fields": [
      {
        "name": "tokens",
        "key": "tokens",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "streak",
        "key": "streak",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserFaction": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tag",
        "key": "tag",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tag_image",
        "key": "tag_image",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "days_in_faction",
        "key": "days_in_faction",
        "type": "Option<u32>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMoney": {
    "kind": "struct",
    "fields": [
      {
        "name": "wallet",
        "key": "wallet",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "vault",
        "key": "vault",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "company",
        "key": "company",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points",
        "key": "points",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cayman_bank",
        "key": "cayman_bank",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "daily_networth",
        "key": "daily_networth",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "city_bank",
        "key": "city_bank",
        "type": "Option<UserCityBank>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction",
        "key": "faction",
        "type": "Option<UserFactionMoney>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCityBank": {
    "kind": "struct",
    "fields": [
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "duration",
        "key": "duration",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "interest_rate",
        "key": "interest_rate",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "invested_at",
        "key": "invested_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "profit",
        "key": "profit",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "until",
        "key": "until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserFactionMoney": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points",
        "key": "points",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEquipmentItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "uid",
        "key": "uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "sub_type",
        "key": "sub_type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stats",
        "key": "stats",
        "type": "Option<UserItemMarketItemStats>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonuses",
        "key": "bonuses",
        "type": "Vec<UserItemMarketItemBonus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rarity",
        "key": "rarity",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "slot",
        "key": "slot",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ammo",
        "key": "ammo",
        "type": "Option<UserEquipmentAmmo>",
        "default": true,
        "flatten": false,
        "aliases": [
          "current_ammo"
        ],
        "custom": null
      },
      {
        "name": "mods",
        "key": "mods",
        "type": "Vec<UserEquipmentMod>",
        "default": true,
        "flatten": false,
        "aliases": [
          "equipped_mods"
        ],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEquipmentAmmo": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ammo_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEquipmentMod": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "image",
        "key": "image",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dual_fit",
        "key": "dual_fit",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "weapons",
        "key": "weapons",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserClothingItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "uid",
        "key": "uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "sub_type",
        "key": "sub_type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "slot",
        "key": "slot",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBars": {
    "kind": "struct",
    "fields": [
      {
        "name": "energy",
        "key": "energy",
        "type": "Option<UserResourceBar>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "happy",
        "key": "happy",
        "type": "Option<UserResourceBar>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "life",
        "key": "life",
        "type": "Option<UserLifeBar>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "nerve",
        "key": "nerve",
        "type": "Option<UserResourceBar>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<UserChainBar>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserResourceBar": {
    "kind": "struct",
    "fields": [
      {
        "name": "increment",
        "key": "increment",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "interval",
        "key": "interval",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tick_time",
        "key": "tick_time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "full_time",
        "key": "full_time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "current",
        "key": "current",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "maximum",
        "key": "maximum",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserLifeBar": {
    "kind": "struct",
    "fields": [
      {
        "name": "increment",
        "key": "increment",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "interval",
        "key": "interval",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tick_time",
        "key": "tick_time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "full_time",
        "key": "full_time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "current",
        "key": "current",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "maximum",
        "key": "maximum",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserChainBar": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "current",
        "key": "current",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "max",
        "key": "max",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifier",
        "key": "modifier",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cooldown",
        "key": "cooldown",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timeout",
        "key": "timeout",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCooldowns": {
    "kind": "struct",
    "fields": [
      {
        "name": "booster",
        "key": "booster",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "drug",
        "key": "drug",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "medical",
        "key": "medical",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAmmoItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "types",
        "key": "types",
        "type": "Vec<UserAmmoVariant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAmmoVariant": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "equipped",
        "key": "equipped",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBattleStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "strength",
        "key": "strength",
        "type": "Option<UserBattleStat>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defense",
        "key": "defense",
        "type": "Option<UserBattleStat>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "speed",
        "key": "speed",
        "type": "Option<UserBattleStat>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dexterity",
        "key": "dexterity",
        "type": "Option<UserBattleStat>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBattleStat": {
    "kind": "struct",
    "fields": [
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifier",
        "key": "modifier",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifiers",
        "key": "modifiers",
        "type": "Vec<UserBattleStatModifier>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBattleStatModifier": {
    "kind": "struct",
    "fields": [
      {
        "name": "effect",
        "key": "effect",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifier_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserNotifications": {
    "kind": "struct",
    "fields": [
      {
        "name": "messages",
        "key": "messages",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "events",
        "key": "events",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "awards",
        "key": "awards",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "competition",
        "key": "competition",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserIcon": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "until",
        "key": "until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEnlistedCar": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_id",
        "key": "car_item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_name",
        "key": "car_item_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_name",
        "key": "car_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [
          "name"
        ],
        "custom": null
      },
      {
        "name": "top_speed",
        "key": "top_speed",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "acceleration",
        "key": "acceleration",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "braking",
        "key": "braking",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "dirt",
        "key": "dirt",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "handling",
        "key": "handling",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "safety",
        "key": "safety",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "tarmac",
        "key": "tarmac",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_class",
        "key": "class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "worth",
        "key": "worth",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points_spent",
        "key": "points_spent",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "races_entered",
        "key": "races_entered",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "races_won",
        "key": "races_won",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_removed",
        "key": "is_removed",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "parts",
        "key": "parts",
        "type": "Vec<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEmployment": {
    "kind": "union",
    "variants": [
      "UserCityJob",
      "UserCompanyJob",
      "UnknownUserEmployment"
    ]
  },
  "UserCityJob": {
    "kind": "struct",
    "fields": [
      {
        "name": "job_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCompanyJob": {
    "kind": "struct",
    "fields": [
      {
        "name": "job_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "type_id",
        "key": "type_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rating",
        "key": "rating",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "days_in_company",
        "key": "days_in_company",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UnknownUserEmployment": {
    "kind": "struct",
    "fields": [
      {
        "name": "job_type",
        "key": "job_type",
        "type": "Option<String>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserJobPoints": {
    "kind": "struct",
    "fields": [
      {
        "name": "jobs",
        "key": "jobs",
        "type": "Option<UserJobPointTotals>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "companies",
        "key": "companies",
        "type": "Vec<UserCompanyPoints>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserJobPointTotals": {
    "kind": "struct",
    "fields": [
      {
        "name": "army",
        "key": "army",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "casino",
        "key": "casino",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "education",
        "key": "education",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "grocer",
        "key": "grocer",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "law",
        "key": "law",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "medical",
        "key": "medical",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCompanyPoints": {
    "kind": "struct",
    "fields": [
      {
        "name": "company",
        "key": "company",
        "type": "Option<UserCompanyPointCompany>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points",
        "key": "points",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCompanyPointCompany": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserJobRanks": {
    "kind": "struct",
    "fields": [
      {
        "name": "army",
        "key": "army",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "grocer",
        "key": "grocer",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "casino",
        "key": "casino",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "medical",
        "key": "medical",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "law",
        "key": "law",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "education",
        "key": "education",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRefills": {
    "kind": "struct",
    "fields": [
      {
        "name": "energy",
        "key": "energy",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "nerve",
        "key": "nerve",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "token",
        "key": "token",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "special_count",
        "key": "special_count",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserSkill": {
    "kind": "struct",
    "fields": [
      {
        "name": "slug",
        "key": "slug",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserStockHolding": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "shares",
        "key": "shares",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "transactions",
        "key": "transactions",
        "type": "Vec<UserStockTransaction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonus",
        "key": "bonus",
        "type": "Option<UserStockBonus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserStockTransaction": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "shares",
        "key": "shares",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "price",
        "key": "price",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserStockBonus": {
    "kind": "struct",
    "fields": [
      {
        "name": "available",
        "key": "available",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "increment",
        "key": "increment",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "progress",
        "key": "progress",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "frequency",
        "key": "frequency",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCalendar": {
    "kind": "struct",
    "fields": [
      {
        "name": "start_time",
        "key": "start_time",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserFactionBalance": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "points",
        "key": "points",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMissions": {
    "kind": "struct",
    "fields": [
      {
        "name": "credits",
        "key": "credits",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "givers",
        "key": "givers",
        "type": "Vec<UserMissionGiver>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rewards",
        "key": "rewards",
        "type": "Vec<UserMissionReward>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMissionGiver": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "contracts",
        "key": "contracts",
        "type": "Vec<UserMissionContract>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMissionContract": {
    "kind": "struct",
    "fields": [
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "difficulty",
        "key": "difficulty",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "created_at",
        "key": "created_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "started_at",
        "key": "started_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "expires_at",
        "key": "expires_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "completed_at",
        "key": "completed_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rewards",
        "key": "rewards",
        "type": "Option<UserMissionContractRewards>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMissionContractRewards": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "credits",
        "key": "credits",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMissionReward": {
    "kind": "struct",
    "fields": [
      {
        "name": "reward_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "Option<UserMissionRewardDetails>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "expires_at",
        "key": "expires_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMissionRewardDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "detail_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "sub_type",
        "key": "sub_type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEducation": {
    "kind": "struct",
    "fields": [
      {
        "name": "complete",
        "key": "complete",
        "type": "Vec<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "current",
        "key": "current",
        "type": "Option<UserCurrentEducation>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCurrentEducation": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "until",
        "key": "until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCompetition": {
    "kind": "union",
    "variants": [
      "UserHalloweenCompetition",
      "UserEasterCompetition",
      "UserRpsCompetition",
      "UserEliminationCompetition",
      "UnknownUserCompetition"
    ]
  },
  "UserHalloweenCompetition": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "treats_collected",
        "key": "treats_collected",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "basket",
        "key": "basket",
        "type": "Option<UserCompetitionBasket>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEasterCompetition": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRpsCompetition": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "hp",
        "key": "hp",
        "type": "Option<UserCompetitionHp>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEliminationCompetition": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "score",
        "key": "score",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "team",
        "key": "team",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCompetitionBasket": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserCompetitionHp": {
    "kind": "struct",
    "fields": [
      {
        "name": "current",
        "key": "current",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "maximum",
        "key": "maximum",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UnknownUserCompetition": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserWeaponExpEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "exp",
        "key": "exp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRacingRecordSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "track",
        "key": "track",
        "type": "Option<UserRaceTrackSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "records",
        "key": "records",
        "type": "Vec<UserRacingLapRecord>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRaceTrackSummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRacingLapRecord": {
    "kind": "struct",
    "fields": [
      {
        "name": "car_id",
        "key": "car_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_name",
        "key": "car_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "lap_time",
        "key": "lap_time",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAwardUnlock": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserInventory": {
    "kind": "struct",
    "fields": [
      {
        "name": "items",
        "key": "items",
        "type": "Vec<UserInventoryItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserInventoryItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "equipped",
        "key": "equipped",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_owned",
        "key": "faction_owned",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "uid",
        "key": "uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTravel": {
    "kind": "struct",
    "fields": [
      {
        "name": "destination",
        "key": "destination",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "method",
        "key": "method",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "time_left",
        "key": "time_left",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "arrival_at",
        "key": "arrival_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "departed_at",
        "key": "departed_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserEvent": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "text",
        "key": "event",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMessage": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "sender",
        "key": "sender",
        "type": "Option<UserIdentitySummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "topic",
        "key": "topic",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "message_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "seen",
        "key": "seen",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "read",
        "key": "read",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserIdentitySummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRace": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "track_id",
        "key": "track_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "creator_id",
        "key": "creator_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "laps",
        "key": "laps",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "participants",
        "key": "participants",
        "type": "Option<UserRaceParticipants>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "schedule",
        "key": "schedule",
        "type": "Option<UserRaceSchedule>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "requirements",
        "key": "requirements",
        "type": "Option<UserRaceRequirements>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_official",
        "key": "is_official",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "skill_gain",
        "key": "skill_gain",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "results",
        "key": "results",
        "type": "Vec<UserRaceResult>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRaceParticipants": {
    "kind": "struct",
    "fields": [
      {
        "name": "minimum",
        "key": "minimum",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "maximum",
        "key": "maximum",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "current",
        "key": "current",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRaceSchedule": {
    "kind": "struct",
    "fields": [
      {
        "name": "join_from",
        "key": "join_from",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "join_until",
        "key": "join_until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "start",
        "key": "start",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "end",
        "key": "end",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRaceRequirements": {
    "kind": "struct",
    "fields": [
      {
        "name": "driver_class",
        "key": "driver_class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_class",
        "key": "car_class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_id",
        "key": "car_item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "requires_stock_car",
        "key": "requires_stock_car",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "requires_password",
        "key": "requires_password",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "join_fee",
        "key": "join_fee",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRaceResult": {
    "kind": "struct",
    "fields": [
      {
        "name": "driver_id",
        "key": "driver_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position",
        "key": "position",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_id",
        "key": "car_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_id",
        "key": "car_item_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_item_name",
        "key": "car_item_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "car_class",
        "key": "car_class",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "has_crashed",
        "key": "has_crashed",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "best_lap_time",
        "key": "best_lap_time",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "race_time",
        "key": "race_time",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "time_ended",
        "key": "time_ended",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAttack": {
    "kind": "struct",
    "fields": [
      {
        "name": "is_territory_war",
        "key": "is_territory_war",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "territory_war_id",
        "key": "territory_war_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "code",
        "key": "code",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "started",
        "key": "started",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ended",
        "key": "ended",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacker",
        "key": "attacker",
        "type": "Option<UserAttackCombatant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defender",
        "key": "defender",
        "type": "Option<UserAttackCombatant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "result",
        "key": "result",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect_gain",
        "key": "respect_gain",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect_loss",
        "key": "respect_loss",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_interrupted",
        "key": "is_interrupted",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_stealthed",
        "key": "is_stealthed",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_raid",
        "key": "is_raid",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_ranked_war",
        "key": "is_ranked_war",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifiers",
        "key": "modifiers",
        "type": "Option<UserAttackModifiers>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "finishing_hit_effects",
        "key": "finishing_hit_effects",
        "type": "Vec<UserAttackFinishingHitEffect>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAttackFull": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "code",
        "key": "code",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "started",
        "key": "started",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ended",
        "key": "ended",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "attacker",
        "key": "attacker",
        "type": "Option<UserAttackCombatant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defender",
        "key": "defender",
        "type": "Option<UserAttackCombatant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "result",
        "key": "result",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect_gain",
        "key": "respect_gain",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect_loss",
        "key": "respect_loss",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAttackCombatant": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction",
        "key": "faction",
        "type": "Option<UserAttackFaction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAttackFaction": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAttackModifiers": {
    "kind": "struct",
    "fields": [
      {
        "name": "fair_fight",
        "key": "fair_fight",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "war",
        "key": "war",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "retaliation",
        "key": "retaliation",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "group",
        "key": "group",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "overseas",
        "key": "overseas",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "chain",
        "key": "chain",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "warlord",
        "key": "warlord",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserAttackFinishingHitEffect": {
    "kind": "struct",
    "fields": [
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserRevive": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "reviver",
        "key": "reviver",
        "type": "Option<UserReviveReviver>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target",
        "key": "target",
        "type": "Option<UserReviveTarget>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "success_chance",
        "key": "success_chance",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "result",
        "key": "result",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserReviveFull": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "reviver",
        "key": "reviver",
        "type": "Option<UserReviveReviver>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target",
        "key": "target",
        "type": "Option<UserReviveTarget>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "success_chance",
        "key": "success_chance",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "result",
        "key": "result",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserReviveReviver": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction",
        "key": "faction",
        "type": "Option<UserAttackFaction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "skill",
        "key": "skill",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserReviveTarget": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction",
        "key": "faction",
        "type": "Option<UserAttackFaction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "faction_id",
        "key": "faction_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "hospital_reason",
        "key": "hospital_reason",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "early_discharge",
        "key": "early_discharge",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "last_action",
        "key": "last_action",
        "type": "Option<UserReviveLastAction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "online_status",
        "key": "online_status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserReviveLastAction": {
    "kind": "union",
    "variants": [
      "UserLastAction",
      "u64",
      "Value"
    ]
  },
  "UserHofStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "attacks",
        "key": "attacks",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "busts",
        "key": "busts",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "defends",
        "key": "defends",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "networth",
        "key": "networth",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "offences",
        "key": "offences",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "revives",
        "key": "revives",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "awards",
        "key": "awards",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "racing_skill",
        "key": "racing_skill",
        "type": "Option<UserHofValueFloat>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "racing_points",
        "key": "racing_points",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "racing_wins",
        "key": "racing_wins",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "travel_time",
        "key": "travel_time",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "working_stats",
        "key": "working_stats",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "battle_stats",
        "key": "battle_stats",
        "type": "Option<UserHofValue>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserHofValue": {
    "kind": "struct",
    "fields": [
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserHofValueFloat": {
    "kind": "struct",
    "fields": [
      {
        "name": "value",
        "key": "value",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rank",
        "key": "rank",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserBounty": {
    "kind": "struct",
    "fields": [
      {
        "name": "target_id",
        "key": "target_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target_name",
        "key": "target_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "target_level",
        "key": "target_level",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "lister_id",
        "key": "lister_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "lister_name",
        "key": "lister_name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "reward",
        "key": "reward",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "reason",
        "key": "reason",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quantity",
        "key": "quantity",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_anonymous",
        "key": "is_anonymous",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "valid_until",
        "key": "valid_until",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPropertySummary": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "owner",
        "key": "owner",
        "type": "Option<UserIdentitySummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "property_info",
        "key": "property",
        "type": "Option<UserPropertyKind>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "happy",
        "key": "happy",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "upkeep",
        "key": "upkeep",
        "type": "Option<UserPropertyUpkeep>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "market_price",
        "key": "market_price",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modifications",
        "key": "modifications",
        "type": "Vec<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "staff",
        "key": "staff",
        "type": "Vec<UserPropertyStaffEntry>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "used_by",
        "key": "used_by",
        "type": "Vec<UserIdentitySummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "cost_per_day",
        "key": "cost_per_day",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rental_period",
        "key": "rental_period",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rental_period_remaining",
        "key": "rental_period_remaining",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rented_by",
        "key": "rented_by",
        "type": "Option<UserIdentitySummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "renter_asked",
        "key": "renter_asked",
        "type": "Option<UserIdentitySummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "lease_extension",
        "key": "lease_extension",
        "type": "Option<UserPropertyLeaseExtension>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPropertyKind": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPropertyUpkeep": {
    "kind": "struct",
    "fields": [
      {
        "name": "property_cost",
        "key": "property",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "staff",
        "key": "staff",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPropertyStaffEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "staff_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserPropertyLeaseExtension": {
    "kind": "struct",
    "fields": [
      {
        "name": "cost",
        "key": "cost",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "period",
        "key": "period",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "created_at",
        "key": "created_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserForumSubscribedThread": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "forum_id",
        "key": "forum_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "author",
        "key": "author",
        "type": "Option<ForumUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "posts",
        "key": "posts",
        "type": "Option<UserForumSubscribedThreadPosts>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserForumSubscribedThreadPosts": {
    "kind": "struct",
    "fields": [
      {
        "name": "new_posts",
        "key": "new",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserForumFeedEntry": {
    "kind": "struct",
    "fields": [
      {
        "name": "thread_id",
        "key": "thread_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "post_id",
        "key": "post_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "user",
        "key": "user",
        "type": "Option<ForumUserSummary>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "text",
        "key": "text",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_seen",
        "key": "is_seen",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "entry_type",
        "key": "type",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserWorkStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "endurance",
        "key": "endurance",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "intelligence",
        "key": "intelligence",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "manual_labor",
        "key": "manual_labor",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "total",
        "key": "total",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMerits": {
    "kind": "struct",
    "fields": [
      {
        "name": "upgrades",
        "key": "upgrades",
        "type": "Vec<UserMeritUpgrade>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "available",
        "key": "available",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "used",
        "key": "used",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "medals",
        "key": "medals",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "honors",
        "key": "honors",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserMeritUpgrade": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "level",
        "key": "level",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserItemMarketListing": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "price",
        "key": "price",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "average_price",
        "key": "average_price",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_anonymous",
        "key": "is_anonymous",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "available",
        "key": "available",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item",
        "key": "item",
        "type": "Option<UserItemMarketItemDetails>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserItemMarketItemDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rarity",
        "key": "rarity",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "uid",
        "key": "uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "stats",
        "key": "stats",
        "type": "Option<UserItemMarketItemStats>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "bonuses",
        "key": "bonuses",
        "type": "Vec<UserItemMarketItemBonus>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserItemMarketItemStats": {
    "kind": "struct",
    "fields": [
      {
        "name": "damage",
        "key": "damage",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "accuracy",
        "key": "accuracy",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "armor",
        "key": "armor",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "quality",
        "key": "quality",
        "type": "Option<f64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserItemMarketItemBonus": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "title",
        "key": "title",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimeSelection": {
    "kind": "union",
    "variants": [
      "Box<UserOrganizedCrime>",
      "UserOrganizedCrimeError"
    ]
  },
  "UserOrganizedCrime": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "previous_crime_id",
        "key": "previous_crime_id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "difficulty",
        "key": "difficulty",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "created_at",
        "key": "created_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "planning_at",
        "key": "planning_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "ready_at",
        "key": "ready_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "expired_at",
        "key": "expired_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "executed_at",
        "key": "executed_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "slots",
        "key": "slots",
        "type": "Vec<UserOrganizedCrimeSlot>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "rewards",
        "key": "rewards",
        "type": "Option<UserOrganizedCrimeRewards>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimeSlot": {
    "kind": "struct",
    "fields": [
      {
        "name": "position",
        "key": "position",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "position_info",
        "key": "position_info",
        "type": "Option<UserOrganizedCrimePositionInfo>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_requirement",
        "key": "item_requirement",
        "type": "Option<UserOrganizedCrimeItemRequirement>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "user",
        "key": "user",
        "type": "Option<UserOrganizedCrimeUser>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "checkpoint_pass_rate",
        "key": "checkpoint_pass_rate",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimePositionInfo": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "label",
        "key": "label",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "number",
        "key": "number",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimeItemRequirement": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_reusable",
        "key": "is_reusable",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "is_available",
        "key": "is_available",
        "type": "Option<bool>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimeUser": {
    "kind": "struct",
    "fields": [
      {
        "name": "outcome",
        "key": "outcome",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "joined_at",
        "key": "joined_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "progress",
        "key": "progress",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_outcome",
        "key": "item_outcome",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimeRewards": {
    "kind": "struct",
    "fields": [
      {
        "name": "money",
        "key": "money",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Vec<UserOrganizedCrimeRewardItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimeRewardItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [
          "amount",
          "quantity"
        ],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserOrganizedCrimeError": {
    "kind": "struct",
    "fields": [
      {
        "name": "code",
        "key": "code",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "error",
        "key": "error",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserLastAction": {
    "kind": "struct",
    "fields": [
      {
        "name": "status",
        "key": "status",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "relative",
        "key": "relative",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTrade": {
    "kind": "struct",
    "fields": [
      {
        "name": "completed_at",
        "key": "completed_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "expires_at",
        "key": "expires_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modified_at",
        "key": "modified_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "UserTradeTimestamp",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "user",
        "key": "user",
        "type": "Option<UserTradeParticipant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "trader",
        "key": "trader",
        "type": "Option<UserTradeParticipant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTradeDetailed": {
    "kind": "struct",
    "fields": [
      {
        "name": "completed_at",
        "key": "completed_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "expires_at",
        "key": "expires_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "modified_at",
        "key": "modified_at",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "timestamp",
        "key": "timestamp",
        "type": "UserTradeTimestamp",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "description",
        "key": "description",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "trade_type",
        "key": "type",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "user",
        "key": "user",
        "type": "Option<UserTradeParticipant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "trader",
        "key": "trader",
        "type": "Option<UserTradeParticipant>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "items",
        "key": "items",
        "type": "Vec<TradeItem>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTradeParticipant": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, serde_json::Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UserTradeTimestamp": {
    "kind": "union",
    "variants": [
      "null",
      "u64",
      "bool",
      "Value"
    ]
  },
  "TradeItem": {
    "kind": "union",
    "variants": [
      "TradeMoneyItem",
      "TradeInventoryItem",
      "TradeFactionItem",
      "TradeCompanyItem",
      "TradePropertyItem",
      "TradeNapItem",
      "UnknownTradeItem"
    ]
  },
  "TradeMoneyItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "user_id",
        "key": "user_id",
        "type": "Option<u64>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "TradeMoneyDetails",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeInventoryItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "user_id",
        "key": "user_id",
        "type": "Option<u64>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "TradeInventoryItemDetails",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeFactionItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "user_id",
        "key": "user_id",
        "type": "Option<u64>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "TradeFactionDetails",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeCompanyItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "user_id",
        "key": "user_id",
        "type": "Option<u64>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "TradeCompanyDetails",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradePropertyItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "user_id",
        "key": "user_id",
        "type": "Option<u64>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "TradePropertyDetails",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeNapItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "user_id",
        "key": "user_id",
        "type": "Option<u64>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "TradeNapDetails",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "UnknownTradeItem": {
    "kind": "struct",
    "fields": [
      {
        "name": "user_id",
        "key": "user_id",
        "type": "Option<u64>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "item_type",
        "key": "item_type",
        "type": "Option<String>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "details",
        "key": "details",
        "type": "Option<DynamicValue>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": false,
        "flatten": false,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeMoneyDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeInventoryItemDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "uid",
        "key": "uid",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "amount",
        "key": "amount",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeFactionDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "respect",
        "key": "respect",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeCompanyDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "value",
        "key": "value",
        "type": "Option<i64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradePropertyDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "happiness",
        "key": "happiness",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeNapDetails": {
    "kind": "struct",
    "fields": [
      {
        "name": "days",
        "key": "days",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "factions",
        "key": "factions",
        "type": "Vec<TradeNapFaction>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  },
  "TradeNapFaction": {
    "kind": "struct",
    "fields": [
      {
        "name": "id",
        "key": "id",
        "type": "Option<u64>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "name",
        "key": "name",
        "type": "Option<String>",
        "default": true,
        "flatten": false,
        "aliases": [],
        "custom": null
      },
      {
        "name": "extra",
        "key": "extra",
        "type": "BTreeMap<String, Value>",
        "default": true,
        "flatten": true,
        "aliases": [],
        "custom": null
      }
    ]
  }
} as const;
