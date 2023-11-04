import { window, version, commands } from "vscode";
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

@provideSingleton(DebugCommands)
export class DebugCommands {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
    private dbtCommandFactory: DBTCommandFactory,
  ) {}

  async installDBTAdapters() {
    await this.askforDBTInstallation();
  }
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
          const runModelProcess =
            await this.dbtProjectContainer.dbtClient?.executeCommand(
              runModelCommand,
            );
          const runModelOutput = await runModelProcess.complete();
          this.terminal.log(
            `${runModelProcess.formatText(runModelOutput.toString())}`,
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
      `Do you want to validate the project: ${projectContext.label}? This will run the command 'dbt deps' inside this project. Do you want to continue?`,
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
          const dbtDepsProcess =
            await this.dbtProjectContainer.dbtClient?.executeCommand(
              depsCommand,
            );
          const depsOut = await dbtDepsProcess.complete();
          this.terminal.log(`${dbtDepsProcess.formatText(depsOut.toString())}`);
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

  async isVsCodeOutdatated() {
    this.telemetry.sendTelemetryEvent("vscodeOutdatedStep");
    const currentVersion = version.toString();
    const minVersion =
      this.dbtProjectContainer.context?.extension.packageJSON.engines.vscode
        .toString()
        .trim()
        .replace(/^[^<>~]/, "");
    if (minVersion === undefined) {
      return false;
    }
    return currentVersion < minVersion;
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

  private async askforDBTInstallation() {
    const answer = await window.showErrorMessage(
      `dbt is not installed in this python environment. Do you want to install dbt?`,
      PromptAnswer.YES,
      PromptAnswer.NO,
    );
    if (answer === PromptAnswer.YES) {
      const adapters = this.dbtProjectContainer.getAdapters();
      if (adapters.length === 0) {
        window.showErrorMessage(
          "No adapters detected. could not determine dbt adapter. Please install dbt manually.",
        );
        // TODO: telemetry
        return;
      }

      if (adapters.length > 1) {
        window.showErrorMessage(
          "Multiple adapters detected. could not determine dbt adapter. Please install dbt manually.",
        );
        // TODO: telemetry
        return;
      }

      // TODO: telemetry
      try {
        await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: this.dbtProjectContainer.getPythonEnvironment().pythonPath,
            //args: ["-m", "pip", "install", "dbt"],
            args: ["--version"],
          })
          .completeWithTerminalOutput(this.terminal);
        return [];
      } catch (err) {
        // do something useful with error
        // TODO: telemetry
      }
    }
  }
}
