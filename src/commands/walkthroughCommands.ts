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
}
