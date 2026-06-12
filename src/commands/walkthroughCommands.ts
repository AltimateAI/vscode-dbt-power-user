import {
  CommandProcessExecutionFactory,
  DBTTerminal,
} from "@altimateai/dbt-integration";
import { existsSync } from "fs";
import { inject } from "inversify";
import { join } from "path";
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
    const platform = process.platform;
    this.telemetry.sendTelemetryEvent("installDbtFusion", { platform });
    let error = undefined;
    await window.withProgress(
      {
        title: `Installing dbt fusion...`,
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
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
              envVars: this.pythonEnvironment.getEnvironmentVariables(),
            })
            .completeWithTerminalOutput();

          // Initialize after installation
          await this.dbtProjectContainer.detectDBT();
          this.dbtProjectContainer.initialize();
        } catch (err) {
          error = err;
          this.telemetry.sendTelemetryError("installDbtFusionError", err, {
            platform,
          });
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
    const platform = process.platform;
    const telemetryProps = {
      platform,
      pythonPath: this.pythonEnvironment.pythonPath ?? "unknown",
      pythonVersion: this.pythonEnvironment.pythonVersion ?? "unknown",
    };
    this.telemetry.sendTelemetryEvent("installDbtCloud", telemetryProps);
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
              envVars: this.pythonEnvironment.getEnvironmentVariables(),
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
          this.telemetry.sendTelemetryError(
            "installDbtCloudError",
            err,
            telemetryProps,
          );
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
        "risingwave",
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
    const platform = process.platform;
    const telemetryProps = {
      adapter: adapter.label,
      packageName,
      dbtVersion: packageVersion,
      platform,
      pythonPath: this.pythonEnvironment.pythonPath ?? "unknown",
      pythonVersion: this.pythonEnvironment.pythonVersion ?? "unknown",
    };
    this.telemetry.sendTelemetryEvent("installDbtCore", telemetryProps);

    const installArgs = [
      "-m",
      "pip",
      "install",
      "--no-cache-dir",
      "--force-reinstall",
    ];
    if (gte(packageVersion + ".0", "1.8.0")) {
      installArgs.push(`dbt-core~=${packageVersion}.0`);
      installArgs.push(`${packageName}`);
    } else {
      installArgs.push(`${packageName}==${packageVersion}`);
    }

    const pythonPath = this.pythonEnvironment.pythonPath;
    let error: unknown;
    await window.withProgress(
      {
        title: `Installing ${packageName} ${packageVersion}...`,
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
          await this.runPipInstall(pythonPath, installArgs);
          await this.dbtProjectContainer.detectDBT();
          this.dbtProjectContainer.initialize();
        } catch (err) {
          error = err;
          this.telemetry.sendTelemetryError(
            "installDbtCoreError",
            err,
            telemetryProps,
          );
        }
      },
    );
    if (!error) {
      return;
    }
    const message = (error as Error).message ?? String(error);
    // PEP 668: the interpreter (commonly a Homebrew Python) refuses global
    // installs. Offer a virtual environment instead of a dead-end retry.
    if (this.isExternallyManagedError(message)) {
      await this.handleExternallyManagedInstall(
        pythonPath,
        installArgs,
        telemetryProps,
      );
      return;
    }
    const answer = await window.showErrorMessage(
      "Could not install dbt: " + message,
      DbtInstallationPromptAnswer.INSTALL,
    );
    if (answer === DbtInstallationPromptAnswer.INSTALL) {
      commands.executeCommand("dbtPowerUser.installDbt");
    }
  }

  /**
   * Run `python -m pip install ...` and treat the absence of a success marker
   * (with output on stderr) as a failure, mirroring pip's exit semantics.
   */
  private async runPipInstall(
    pythonPath: string,
    args: string[],
  ): Promise<void> {
    const { stdout, stderr } = await this.commandProcessExecutionFactory
      .createCommandProcessExecution({
        command: pythonPath,
        args,
        cwd: getFirstWorkspacePath(),
        envVars: this.pythonEnvironment.getEnvironmentVariables(),
      })
      .completeWithTerminalOutput();
    if (
      !stdout.includes("Successfully installed") &&
      !stdout.includes("Requirement already satisfied") &&
      stderr
    ) {
      throw new Error(stderr);
    }
  }

  /**
   * Whether a pip failure is PEP 668 "externally-managed-environment" — the
   * interpreter's stdlib carries an EXTERNALLY-MANAGED marker (Homebrew, Debian,
   * Ubuntu) and pip refuses to install into it globally.
   */
  private isExternallyManagedError(message: string): boolean {
    return /externally[-\s]managed/i.test(message);
  }

  private resolveVenvPython(venvDir: string): string {
    return process.platform === "win32"
      ? join(venvDir, "Scripts", "python.exe")
      : join(venvDir, "bin", "python");
  }

  /**
   * Remediation for an externally-managed interpreter: offer to create a virtual
   * environment and install dbt there (what the Homebrew error itself
   * recommends), with an explicit opt-in to override the protection as fallback.
   */
  private async handleExternallyManagedInstall(
    pythonPath: string,
    installArgs: string[],
    telemetryProps: Record<string, string>,
  ): Promise<void> {
    const CREATE_VENV = "Create virtual environment";
    const FORCE = "Install anyway";
    const answer = await window.showErrorMessage(
      `Could not install dbt: the selected Python interpreter (${pythonPath}) is externally managed (PEP 668), ` +
        `so packages cannot be installed into it globally. Create a virtual environment and install dbt there instead?`,
      CREATE_VENV,
      FORCE,
    );
    if (answer === CREATE_VENV) {
      await this.createVenvAndInstallDbtCore(
        pythonPath,
        installArgs,
        telemetryProps,
      );
    } else if (answer === FORCE) {
      await this.forceInstallDbtCore(pythonPath, installArgs, telemetryProps);
    }
  }

  private async createVenvAndInstallDbtCore(
    pythonPath: string,
    installArgs: string[],
    telemetryProps: Record<string, string>,
  ): Promise<void> {
    const workspacePath = workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspacePath) {
      window.showErrorMessage(
        "Cannot create a virtual environment: no workspace folder is open.",
      );
      return;
    }
    const venvDir = join(workspacePath, ".venv");
    const venvPython = this.resolveVenvPython(venvDir);
    const config = workspace.getConfiguration("dbt");
    const previousOverride = config.get<string>("dbtPythonPathOverride");
    let overrideUpdated = false;
    this.telemetry.sendTelemetryEvent("installDbtCoreVenv", telemetryProps);
    let error: unknown;
    await window.withProgress(
      {
        title: "Creating virtual environment and installing dbt...",
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
          if (!existsSync(venvPython)) {
            const { stderr } = await this.commandProcessExecutionFactory
              .createCommandProcessExecution({
                command: pythonPath,
                args: ["-m", "venv", venvDir],
                cwd: workspacePath,
                envVars: this.pythonEnvironment.getEnvironmentVariables(),
              })
              .completeWithTerminalOutput();
            if (!existsSync(venvPython)) {
              throw new Error(
                stderr ||
                  `Failed to create a virtual environment at ${venvDir}`,
              );
            }
          }
          await this.runPipInstall(venvPython, installArgs);
          // Point the interpreter at the venv before re-detecting so detection
          // resolves dbt from the new environment.
          await config.update("dbtPythonPathOverride", venvPython);
          overrideUpdated = true;
          await this.dbtProjectContainer.detectDBT();
          this.dbtProjectContainer.initialize();
        } catch (err) {
          // Don't leave the workspace pointing at a half-set interpreter if a
          // later step failed; restore the previous override.
          if (overrideUpdated) {
            await config.update("dbtPythonPathOverride", previousOverride);
          }
          error = err;
          this.telemetry.sendTelemetryError(
            "installDbtCoreVenvError",
            err,
            telemetryProps,
          );
        }
      },
    );
    if (error) {
      window.showErrorMessage(
        "Could not install dbt into a virtual environment: " +
          ((error as Error).message ?? String(error)),
      );
      return;
    }
    window.showInformationMessage(
      `dbt installed in ${venvDir}. The Python interpreter has been set to the new virtual environment.`,
    );
  }

  private async forceInstallDbtCore(
    pythonPath: string,
    installArgs: string[],
    telemetryProps: Record<string, string>,
  ): Promise<void> {
    this.telemetry.sendTelemetryEvent(
      "installDbtCoreBreakSystemPackages",
      telemetryProps,
    );
    let error: unknown;
    await window.withProgress(
      {
        title: "Installing dbt...",
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
          await this.runPipInstall(pythonPath, [
            ...installArgs,
            "--break-system-packages",
          ]);
          await this.dbtProjectContainer.detectDBT();
          this.dbtProjectContainer.initialize();
        } catch (err) {
          error = err;
          this.telemetry.sendTelemetryError(
            "installDbtCoreBreakSystemPackagesError",
            err,
            telemetryProps,
          );
        }
      },
    );
    if (error) {
      window.showErrorMessage(
        "Could not install dbt: " + ((error as Error).message ?? String(error)),
      );
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
      case "risingwave":
        return "dbt-risingwave";
    }
    throw new Error("Adapter is not supported" + adapter);
  }
}
