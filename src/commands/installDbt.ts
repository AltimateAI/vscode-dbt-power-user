import { window, version } from "vscode";
import * as vscode from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTCommandFactory } from "../dbt_client/dbtCommandFactory";

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
  async validateProjects() {
    const answer = await window.showErrorMessage(
      `Do you want to validate all the projects? This will run the command 'dbt debug' on all the projects. Do you want to continue?`,
      PromptAnswer.YES,
      PromptAnswer.NO,
    );
    if (answer === PromptAnswer.YES) {
      // TODO: telemetry

      try {
        const runModelCommand =
          this.dbtCommandFactory.createCompileModelCommand(
            this.projectRoot,
            this.dbtProfilesDir,
            runModelParams,
          );
        this.telemetry.sendTelemetryEvent("compileModel");
        this.dbtProjectContainer.addCommandToQueue(runModelCommand);
      } catch (err) {
        // do something useful with error
        // TODO: telemetry
      }
    }
  }
  async installDeps() {}

  async isVsCodeOutdatated() {
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
