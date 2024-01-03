import { window, QuickPickItem, ProgressLocation, commands } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { ProjectQuickPickItem } from "../quickpick/projectQuickPick";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

enum DbtInstallationPromptAnswer {
  INSTALL = "Install dbt",
}

@provideSingleton(WalkthroughCommands)
export class WalkthroughCommands {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
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
        project.debug();
        // TODO: make above Promise<string>

        // try {
        //   const runModelOutput: string =
        //     await this.dbtProjectContainer.runCommandAndReturnResults(
        //       runModelCommand,
        //     );
        //   if (runModelOutput.includes("ERROR")) {
        //     throw new Error();
        //   }
        // } catch (runError) {
        //   console.log(runError);
        //   window.showErrorMessage(
        //     "Error running dbt debug for project " +
        //       projectContext.label +
        //       ". Please check the output tab for more details.",
        //   );
        // }
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

        const result = await project.installDeps();
      } catch (err) {
        console.log(err);
        this.telemetry.sendTelemetryError("installDepsError", err);
        window.showErrorMessage(
          "Error installing dbt dependencies for project " +
            projectContext.label +
            ". Please check the output tab for more details.",
        );
      }
    }
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
        const packageVersion = dbtVersion.label;
        const packageName = this.mapToAdapterPackage(adapter.label);
        let error = undefined;
        await window.withProgress(
          {
            title: `Installing ${packageName} ${packageVersion}...`,
            location: ProgressLocation.Notification,
            cancellable: false,
          },
          async () => {
            try {
              // TODO: change here
              // await this.dbtProjectContainer.runCommandAndReturnResults(
              //   this.dbtCommandFactory.createDbtInstallCommand(
              //     packageName,
              //     packageVersion,
              //   ),
              // );
              await this.dbtProjectContainer.detectDBT();
              this.dbtProjectContainer.initialize();
            } catch (err) {
              console.log(err);
              error = err;
            }
          },
        );
        if (error) {
          const answer = await window.showErrorMessage(
            "Could not install dbt: " + error,
            DbtInstallationPromptAnswer.INSTALL,
          );
          if (answer === DbtInstallationPromptAnswer.INSTALL) {
            commands.executeCommand("dbtPowerUser.installDbt");
          }
        }
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
