import {
  CommandProcessExecutionFactory,
  DBTTerminal,
} from "@altimateai/dbt-integration";
import { inject } from "inversify";
import { gte } from "semver";
import {
  commands,
  ProgressLocation,
  QuickPickItem,
  window,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { PythonEnvironment } from "../dbt_client/pythonEnvironment";
import { ProjectQuickPickItem } from "../quickpick/projectQuickPick";
import { TelemetryService } from "../telemetry";
import { getFirstWorkspacePath } from "../utils";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

enum DbtInstallationPromptAnswer {
  INSTALL = "Install dbt core",
  INSTALL_CLOUD = "Install dbt cloud",
  INSTALL_FUSION = "Install dbt fusion",
}

export class WalkthroughCommands {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    @inject(PythonEnvironment)
    private pythonEnvironment: PythonEnvironment,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
  ) {}

  async validateProjects(
    projectContext: ProjectQuickPickItem | undefined,
    skipConfirmation = false,
  ) {
    if (projectContext === undefined) {
      // This shouldnt happen really
      window.showErrorMessage(
        "No project was selected, please select a project in the step 'Pick a dbt project' above.",
      );
      return;
    }
    let debugCommand = "dbt debug";
    if (
      workspace
        .getConfiguration("dbt")
        .get<string>("dbtIntegration", "core") === "cloud"
    ) {
      debugCommand = "dbt environment show";
    }
    if (!skipConfirmation) {
      const answer = await window.showInformationMessage(
        `Do you want to validate the project: ${projectContext.label}? This will run the command '${debugCommand}' inside this project. Do you want to continue?`,
        PromptAnswer.YES,
        PromptAnswer.NO,
      );
      if (answer !== PromptAnswer.YES) {
        return;
      }
    }
    try {
      this.telemetry.sendTelemetryEvent("validateProject");
      const project = this.dbtProjectContainer.findDBTProject(
        projectContext.uri,
      );
      if (project === undefined) {
        throw new Error(`Project ${projectContext.label} was not found`);
      }
      const runModelOutput = await project.debug();
      if (runModelOutput.fullOutput.includes("ERROR")) {
        throw new Error(runModelOutput.fullOutput);
      }
    } catch (err) {
      this.dbtTerminal.error(
        "validateProjectError",
        `Error when validating ${projectContext.label}`,
        err,
      );
      window.showErrorMessage(
        "Error running dbt debug for project " +
          projectContext.label +
          ". Please check the output tab for more details.",
      );
      throw err;
    }
  }
  async installDeps(
    projectContext: ProjectQuickPickItem | undefined,
    skipConfirmation = false,
  ) {
    if (projectContext === undefined) {
      // This shouldnt happen really
      window.showErrorMessage(
        "No project was selected, please select a project in the step 'Pick a dbt project' above.",
      );
      return;
    }
    if (!skipConfirmation) {
      const answer = await window.showInformationMessage(
        `Do you want to install packages for the project: ${projectContext.label}? This will run the command 'dbt deps' inside this project. Do you want to continue?`,
        PromptAnswer.YES,
        PromptAnswer.NO,
      );
      if (answer !== PromptAnswer.YES) {
        return;
      }
    }
    try {
      this.telemetry.sendTelemetryEvent("installDeps");
      const project = this.dbtProjectContainer.findDBTProject(
        projectContext.uri,
      );
      if (project === undefined) {
        throw new Error(`Project ${projectContext.label} was not found`);
      }

      await project.installDeps();
    } catch (err) {
      this.dbtTerminal.debug(
        "WalkthroughCommands.installDeps",
        "Could not install deps",
        err,
      );
      this.telemetry.sendTelemetryError("installDepsError", err);
      window.showErrorMessage(
        "Error installing dbt dependencies for project " +
          projectContext.label +
          ". Please check the output tab for more details.",
      );
      throw err;
    }
  }

  async installDbt(): Promise<void> {
    const dbtIntegration = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
    switch (dbtIntegration) {
      case "core":
        return this.installDbtCore();
      case "fusion":
        return this.installDbtFusion();
      case "cloud":
        return this.installDbtCloud();
      default:
        throw new Error(
          `Unsupported dbt integration: ${dbtIntegration}. Supported values are 'core', 'cloud', 'fusion'.`,
        );
    }
  }

  private async installDbtFusion(): Promise<void> {
    let error = undefined;
    await window.withProgress(
      {
        title: `Installing dbt fusion...`,
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
          const platform = process.platform;
          let command: string;
          let args: string[];

          if (platform === "darwin" || platform === "linux") {
            command = "sh";
            args = [
              "-c",
              "curl -fsSL https://public.cdn.getdbt.com/fs/install/install.sh | sh -s -- --update",
            ];
          } else if (platform === "win32") {
            command = "powershell";
            args = [
              "-Command",
              "irm https://public.cdn.getdbt.com/fs/install/install.ps1 | iex",
            ];
          } else {
            throw new Error(
              `Unsupported platform: ${platform}, only MacOS, Linux and Windows are supported for dbt fusion installation`,
            );
          }

          await this.commandProcessExecutionFactory
            .createCommandProcessExecution({
              command,
              args,
              cwd: getFirstWorkspacePath(),
              envVars: this.pythonEnvironment.environmentVariables,
            })
            .completeWithTerminalOutput();

          // Initialize after installation
          await this.dbtProjectContainer.detectDBT();
          this.dbtProjectContainer.initialize();
        } catch (err) {
          error = err;
        }
      },
    );
    if (error) {
      const answer = await window.showErrorMessage(
        "Could not install dbt fusion: " + (error as Error).message,
        DbtInstallationPromptAnswer.INSTALL_FUSION,
      );
      if (answer === DbtInstallationPromptAnswer.INSTALL_FUSION) {
        commands.executeCommand("dbtPowerUser.installDbt");
      }
    }
  }

  private async installDbtCloud(): Promise<void> {
    let error = undefined;
    await window.withProgress(
      {
        title: `Installing dbt cloud...`,
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
          const { stdout, stderr } = await this.commandProcessExecutionFactory
            .createCommandProcessExecution({
              command: this.pythonEnvironment.pythonPath,
              args: [
                "-m",
                "pip",
                "install",
                "dbt",
                "--no-cache-dir",
                "--force-reinstall",
              ],
              cwd: getFirstWorkspacePath(),
              envVars: this.pythonEnvironment.environmentVariables,
            })
            .completeWithTerminalOutput();
          if (
            !stdout.includes("Successfully installed") &&
            !stdout.includes("Requirement already satisfied") &&
            stderr
          ) {
            throw new Error(stderr);
          }
          await this.dbtProjectContainer.detectDBT();
          this.dbtProjectContainer.initialize();
        } catch (err) {
          error = err;
        }
      },
    );
    if (error) {
      const answer = await window.showErrorMessage(
        "Could not install dbt cloud: " + (error as Error).message,
        DbtInstallationPromptAnswer.INSTALL_CLOUD,
      );
      if (answer === DbtInstallationPromptAnswer.INSTALL_CLOUD) {
        commands.executeCommand("dbtPowerUser.installDbt");
      }
    }
  }

  private async installDbtCore(): Promise<void> {
    const dbtVersion: QuickPickItem | undefined = await window.showQuickPick(
      ["1.8", "1.9", "1.10", "1.11"].map((value) => ({
        label: value,
      })),
      {
        title: "Select your dbt version",
        canPickMany: false,
      },
    );
    if (!dbtVersion) {
      return;
    }
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
        "fabric",
      ].map((value) => ({ label: value })),
      {
        title: "Select your adapter",
        canPickMany: false,
      },
    );
    if (!adapter || !adapter.label) {
      return;
    }
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
          const args = [
            "-m",
            "pip",
            "install",
            "--no-cache-dir",
            "--force-reinstall",
          ];
          const isIndependentAdapterPackage = gte(
            packageVersion + ".0",
            "1.8.0",
          );
          if (isIndependentAdapterPackage) {
            args.push(`dbt-core==${packageVersion}`);
            args.push(`${packageName}`);
          } else {
            args.push(`${packageName}==${packageVersion}`);
          }
          args.push("--upgrade");
          const { stdout, stderr } = await this.commandProcessExecutionFactory
            .createCommandProcessExecution({
              command: this.pythonEnvironment.pythonPath,
              args,
              cwd: getFirstWorkspacePath(),
              envVars: this.pythonEnvironment.environmentVariables,
            })
            .completeWithTerminalOutput();
          if (
            !stdout.includes("Successfully installed") &&
            !stdout.includes("Requirement already satisfied") &&
            stderr
          ) {
            throw new Error(stderr);
          }
          await this.dbtProjectContainer.detectDBT();
          this.dbtProjectContainer.initialize();
        } catch (err) {
          error = err;
        }
      },
    );
    if (error) {
      const answer = await window.showErrorMessage(
        "Could not install dbt: " + (error as Error).message,
        DbtInstallationPromptAnswer.INSTALL,
      );
      if (answer === DbtInstallationPromptAnswer.INSTALL) {
        commands.executeCommand("dbtPowerUser.installDbt");
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
      case "fabric":
        return "dbt-fabric";
    }
    throw new Error("Adapter is not supported" + adapter);
  }
}
