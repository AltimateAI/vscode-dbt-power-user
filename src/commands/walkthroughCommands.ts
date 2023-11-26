import { window, QuickPickItem, ProgressLocation } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTCommandFactory } from "../dbt_client/dbtCommandFactory";
import { ProjectQuickPickItem } from "../quickpick/projectQuickPick";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

@provideSingleton(WalkthroughCommands)
export class WalkthroughCommands {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
    private dbtCommandFactory: DBTCommandFactory,
  ) {}

  async validateProjects(projectContext: ProjectQuickPickItem | undefined) {
    if (projectContext === undefined) {
      // This shouldnt happen really
      window.showErrorMessage(
        "No project was selected, please select a project in the step 'Pick a dbt project' above.",
      );
      return;
    }
    const answer = await window.showInformationMessage(
      `Do you want to validate the project: ${projectContext.label}? This will run the command 'dbt debug' inside this project. Do you want to continue?`,
      PromptAnswer.YES,
      PromptAnswer.NO,
    );
    if (answer === PromptAnswer.YES) {
      try {
        this.telemetry.sendTelemetryEvent("validateProject");
        const project = this.dbtProjectContainer.findDBTProject(
          projectContext.uri,
        );
        if (project === undefined) {
          window.showErrorMessage(
            `Project ${projectContext.label} was not found`,
          );
          return;
        }
        const runModelCommand = this.dbtCommandFactory.createDebugCommand(
          project.projectRoot,
          project.dbtProfilesDir,
        );
        try {
          const runModelOutput: string =
            await this.dbtProjectContainer.runCommandAndReturnResults(
              runModelCommand,
            );
          if (runModelOutput.includes("ERROR")) {
            throw new Error();
          }
        } catch (runError) {
          console.log(runError);
          window.showErrorMessage(
            "Error running dbt debug for project " +
              projectContext.label +
              ". Please check the output tab for more details.",
          );
        }
      } catch (err) {
        console.log(err);
        this.telemetry.sendTelemetryError("validateProjectError", err);
      }
    }
  }
  async installDeps(projectContext: ProjectQuickPickItem | undefined) {
    if (projectContext === undefined) {
      // This shouldnt happen really
      window.showErrorMessage(
        "No project was selected, please select a project in the step 'Pick a dbt project' above.",
      );
      return;
    }
    const answer = await window.showInformationMessage(
      `Do you want to install packages for the project: ${projectContext.label}? This will run the command 'dbt deps' inside this project. Do you want to continue?`,
      PromptAnswer.YES,
      PromptAnswer.NO,
    );
    if (answer === PromptAnswer.YES) {
      try {
        this.telemetry.sendTelemetryEvent("installDeps");
        const project = this.dbtProjectContainer.findDBTProject(
          projectContext.uri,
        );
        if (project === undefined) {
          window.showErrorMessage(
            `Project ${projectContext.label} was not found`,
          );
          return;
        }

        const depsCommand = this.dbtCommandFactory.createInstallDepsCommand(
          project.projectRoot,
          project.dbtProfilesDir,
        );
        try {
          await this.dbtProjectContainer.runCommandAndReturnResults(
            depsCommand,
          );
        } catch (depsError) {
          console.log(depsError);
          window.showErrorMessage(
            "Error installing dbt dependencies for project " +
              projectContext.label +
              ". Please check the output tab for more details.",
          );
        }
      } catch (err) {
        console.log(err);
        this.telemetry.sendTelemetryError("installDepsError", err);
      }
    }
  }

  async isExtensionOutdated() {
    this.telemetry.sendTelemetryEvent("versionOutdatedStep");
    const currentVersion = this.dbtProjectContainer.extensionVersion.toString();
    const extLatestJson = await fetch(
      "https://api.github.com/repos/AltimateAI/vscode-dbt-power-user/releases/latest",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const extLatest = await extLatestJson.json();
    const latestVersion = extLatest.tag_name.toString();
    return currentVersion < latestVersion;
  }

  async installDbt(): Promise<void> {
    const dbtVersion: QuickPickItem | undefined = await window.showQuickPick(
      ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7"].map((value) => ({
        label: value,
      })),
      {
        title: "Select your dbt version",
        canPickMany: false,
      },
    );
    if (dbtVersion) {
      const adapter: QuickPickItem | undefined = await window.showQuickPick(
        [
          "snowflake",
          "bigquery",
          "redshift",
          "postgres",
          "databricks",
          "sqlserver",
          "duckdb",
          "athena",
          "spark",
          "clickhouse",
          "trino",
          "synapse",
        ].map((value) => ({
          label: value,
        })),
        {
          title: "Select your adapter",
          canPickMany: false,
        },
      );
      if (adapter && adapter.label) {
        return window.withProgress(
          {
            title: "Installing dbt",
            location: ProgressLocation.Notification,
            cancellable: false,
          },
          async () => {
            try {
              await this.dbtProjectContainer.runCommandAndReturnResults(
                this.dbtCommandFactory.createDbtInstallCommand(
                  this.mapToAdapterPackage(adapter.label),
                  dbtVersion.label,
                ),
              );
            } catch (err) {
              console.log(err);
              window.showErrorMessage("Could not install dbt: " + err);
            }
          },
        );
      }
    }
  }

  private mapToAdapterPackage(adapter: string): string {
    switch (adapter) {
      case "snowflake":
        return "dbt-snowflake";
      case "bigquery":
        return "dbt-bigquery";
      case "redshift":
        return "dbt-redshift";
      case "postgres":
        return "dbt-postgres";
      case "databricks":
        return "dbt-databricks";
      case "sqlserver":
        return "dbt-sqlserver";
      case "duckdb":
        return "dbt-duckdb";
      case "athena":
        return "dbt-athena-community";
      case "spark":
        return "dbt-spark";
      case "clickhouse":
        return "dbt-clickhouse";
      case "trino":
        return "dbt-trino";
      case "synapse":
        return "dbt-synapse";
    }
    throw new Error("Adapter is not supported" + adapter);
  }
}
