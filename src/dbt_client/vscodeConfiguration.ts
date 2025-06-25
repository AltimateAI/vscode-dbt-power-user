import { workspace } from "vscode";
import { injectable } from "inversify";
import {
  DBTConfiguration,
  DEFAULT_CONFIGURATION_VALUES,
} from "./configuration";
import { getFirstWorkspacePath } from "../utils";

@injectable()
export class VSCodeDBTConfiguration implements DBTConfiguration {
  getDbtCustomRunnerImport(): string {
    return workspace
      .getConfiguration("dbt")
      .get<string>(
        "dbtCustomRunnerImport",
        DEFAULT_CONFIGURATION_VALUES.dbtCustomRunnerImport,
      );
  }

  getDbtIntegration(): string {
    return workspace
      .getConfiguration("dbt")
      .get<string>(
        "dbtIntegration",
        DEFAULT_CONFIGURATION_VALUES.dbtIntegration,
      );
  }

  getRunModelCommandAdditionalParams(): string[] {
    return workspace
      .getConfiguration("dbt")
      .get<
        string[]
      >("runModelCommandAdditionalParams", DEFAULT_CONFIGURATION_VALUES.runModelCommandAdditionalParams);
  }

  getBuildModelCommandAdditionalParams(): string[] {
    return workspace
      .getConfiguration("dbt")
      .get<
        string[]
      >("buildModelCommandAdditionalParams", DEFAULT_CONFIGURATION_VALUES.buildModelCommandAdditionalParams);
  }

  getTestModelCommandAdditionalParams(): string[] {
    return workspace
      .getConfiguration("dbt")
      .get<
        string[]
      >("testModelCommandAdditionalParams", DEFAULT_CONFIGURATION_VALUES.testModelCommandAdditionalParams);
  }

  getQueryTemplate(): string {
    return workspace
      .getConfiguration("dbt")
      .get<string>("queryTemplate", DEFAULT_CONFIGURATION_VALUES.queryTemplate);
  }

  getQueryLimit(): number {
    return workspace
      .getConfiguration("dbt")
      .get<number>("queryLimit", DEFAULT_CONFIGURATION_VALUES.queryLimit);
  }

  getEnableNotebooks(): boolean {
    return workspace
      .getConfiguration("dbt")
      .get<boolean>(
        "enableNotebooks",
        DEFAULT_CONFIGURATION_VALUES.enableNotebooks,
      );
  }

  getDisableQueryHistory(): boolean {
    return workspace
      .getConfiguration("dbt")
      .get<boolean>(
        "disableQueryHistory",
        DEFAULT_CONFIGURATION_VALUES.disableQueryHistory,
      );
  }

  getWorkingDirectory(): string {
    return getFirstWorkspacePath();
  }

  getAltimateUrl(): string {
    return workspace
      .getConfiguration("dbt")
      .get<string>("altimateUrl", DEFAULT_CONFIGURATION_VALUES.altimateUrl);
  }

  getIsLocalMode(): boolean {
    return workspace
      .getConfiguration("dbt")
      .get<boolean>("isLocalMode", DEFAULT_CONFIGURATION_VALUES.isLocalMode);
  }
}
