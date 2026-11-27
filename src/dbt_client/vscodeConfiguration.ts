import {
  DBTConfiguration,
  DEFAULT_CONFIGURATION_VALUES,
} from "@altimateai/dbt-integration";
import { injectable } from "inversify";
import { Uri, workspace } from "vscode";
import { getFirstWorkspacePath, resolveSettingsVariables } from "../utils";
import { getDbtIntegrationMode } from "./integrationMode";

@injectable()
export class VSCodeDBTConfiguration implements DBTConfiguration {
  /** Folder or file whose resource-scoped `dbt.*` settings apply; undefined
   * reads the window-level (workspace and user) values only. */
  private resource: Uri | undefined;

  /** A configuration that reads resource-scoped settings for `resource`, so a
   * dbt project picks up its own folder's `.vscode/settings.json` in a
   * multi-root workspace. */
  forResource(resource: Uri): VSCodeDBTConfiguration {
    const configuration = new VSCodeDBTConfiguration();
    configuration.resource = resource;
    return configuration;
  }

  private config() {
    return workspace.getConfiguration("dbt", this.resource);
  }

  getDbtCustomRunnerImport(): string {
    return this.config().get<string>(
      "dbtCustomRunnerImport",
      DEFAULT_CONFIGURATION_VALUES.dbtCustomRunnerImport,
    );
  }

  getDbtIntegration(): string {
    return getDbtIntegrationMode();
  }

  getRunModelCommandAdditionalParams(): string[] {
    const params = this.config().get<string[]>(
      "runModelCommandAdditionalParams",
      DEFAULT_CONFIGURATION_VALUES.runModelCommandAdditionalParams,
    );
    return params.map((p) => resolveSettingsVariables(p));
  }

  getBuildModelCommandAdditionalParams(): string[] {
    const params = this.config().get<string[]>(
      "buildModelCommandAdditionalParams",
      DEFAULT_CONFIGURATION_VALUES.buildModelCommandAdditionalParams,
    );
    return params.map((p) => resolveSettingsVariables(p));
  }

  getTestModelCommandAdditionalParams(): string[] {
    const params = this.config().get<string[]>(
      "testModelCommandAdditionalParams",
      DEFAULT_CONFIGURATION_VALUES.testModelCommandAdditionalParams,
    );
    return params.map((p) => resolveSettingsVariables(p));
  }

  getQueryTemplate(): string {
    return this.config().get<string>(
      "queryTemplate",
      DEFAULT_CONFIGURATION_VALUES.queryTemplate,
    );
  }

  getQueryLimit(): number {
    return this.config().get<number>(
      "queryLimit",
      DEFAULT_CONFIGURATION_VALUES.queryLimit,
    );
  }

  getEnableNotebooks(): boolean {
    return this.config().get<boolean>(
      "enableNotebooks",
      DEFAULT_CONFIGURATION_VALUES.enableNotebooks,
    );
  }

  getDisableQueryHistory(): boolean {
    return this.config().get<boolean>(
      "disableQueryHistory",
      DEFAULT_CONFIGURATION_VALUES.disableQueryHistory,
    );
  }

  getInstallDepsOnProjectInitialization(): boolean {
    return this.config().get<boolean>(
      "installDepsOnProjectInitialization",
      DEFAULT_CONFIGURATION_VALUES.installDepsOnProjectInitialization,
    );
  }

  getDisableDepthsCalculation(): boolean {
    return this.config().get<boolean>(
      "disableDepthsCalculation",
      DEFAULT_CONFIGURATION_VALUES.disableDepthsCalculation,
    );
  }

  getWorkingDirectory(): string {
    return getFirstWorkspacePath();
  }

  getAltimateUrl(): string {
    return this.config().get<string>(
      "altimateUrl",
      DEFAULT_CONFIGURATION_VALUES.altimateUrl,
    );
  }

  getIsLocalMode(): boolean {
    return this.config().get<boolean>(
      "isLocalMode",
      DEFAULT_CONFIGURATION_VALUES.isLocalMode,
    );
  }

  getAltimateInstanceName(): string | undefined {
    return this.config().get<string>("altimateInstanceName");
  }

  getAltimateAiKey(): string | undefined {
    return this.config().get<string>("altimateAiKey");
  }
}
