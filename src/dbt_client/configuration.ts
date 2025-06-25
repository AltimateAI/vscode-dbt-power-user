export interface DBTConfiguration {
  // dbt integration settings
  getDbtCustomRunnerImport(): string;
  getDbtIntegration(): string;

  // Command parameters
  getRunModelCommandAdditionalParams(): string[];
  getBuildModelCommandAdditionalParams(): string[];
  getTestModelCommandAdditionalParams(): string[];

  // Query settings
  getQueryTemplate(): string;
  getQueryLimit(): number;

  // Feature toggles
  getEnableNotebooks(): boolean;
  getDisableQueryHistory(): boolean;

  // Workspace settings
  getWorkingDirectory(): string;

  // Altimate settings
  getAltimateUrl(): string;
  getIsLocalMode(): boolean;
}

export const DEFAULT_CONFIGURATION_VALUES = {
  dbtCustomRunnerImport: "from dbt.cli.main import dbtRunner",
  dbtIntegration: "core",
  runModelCommandAdditionalParams: [] as string[],
  buildModelCommandAdditionalParams: [] as string[],
  testModelCommandAdditionalParams: [] as string[],
  queryTemplate: "select * from ({query}) as query limit {limit}",
  queryLimit: 500,
  enableNotebooks: false,
  disableQueryHistory: false,
  altimateUrl: "https://api.myaltimate.com",
  isLocalMode: false,
} as const;
