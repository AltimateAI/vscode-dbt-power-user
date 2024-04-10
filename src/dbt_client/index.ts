import { commands, Disposable, EventEmitter, window, workspace } from "vscode";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { provideSingleton } from "../utils";
import { DBTInstallationVerificationEvent } from "./dbtVersionEvent";
import { existsSync } from "fs";
import { DBTCoreDetection } from "./dbtCoreIntegration";
import { DBTCloudDetection } from "./dbtCloudIntegration";
import { DBTDetection } from "./dbtIntegration";

enum DbtInstallationPromptAnswer {
  INSTALL = "Install dbt",
  INSTALL_CLOUD = "Install dbt cli",
}

enum PythonInterpreterPromptAnswer {
  SELECT = "Select Python interpreter",
}

@provideSingleton(DBTClient)
export class DBTClient implements Disposable {
  private _onDBTInstallationVerificationEvent =
    new EventEmitter<DBTInstallationVerificationEvent>();
  public readonly onDBTInstallationVerification =
    this._onDBTInstallationVerificationEvent.event;
  private dbtInstalled?: boolean;
  private pythonInstalled?: boolean;
  private disposables: Disposable[] = [
    this._onDBTInstallationVerificationEvent,
  ];
  private shownError = false;
  private dbtIntegrationMode = "core";
  private dbtDetection: DBTDetection;

  constructor(
    private pythonEnvironment: PythonEnvironment,
    private dbtCoreDetection: DBTCoreDetection,
    private dbtCloudDetection: DBTCloudDetection,
  ) {
    this.dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");

    switch (this.dbtIntegrationMode) {
      case "cloud":
        this.dbtDetection = this.dbtCloudDetection;
        break;
      default:
        this.dbtDetection = this.dbtCoreDetection;
        break;
    }
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  async detectDBT(): Promise<void> {
    await this.pythonEnvironment.initialize();
    this.disposables.push(
      this.pythonEnvironment.onPythonEnvironmentChanged(() => {
        this.checkAllInstalled();
      }),
    );
    await this.checkAllInstalled();
  }

  private async checkAllInstalled(): Promise<void> {
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: true,
    });
    this.shownError = false;
    this.dbtInstalled = undefined;
    this.pythonInstalled = this.pythonPathExists();
    this.dbtInstalled = await this.dbtDetection.detectDBT();
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: false,
      installed: this.dbtInstalled,
    });
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.dbtInstalled",
      this.dbtInstalled,
    );
    if (!this.dbtInstalled) {
      this.showErrorIfDbtOrPythonNotInstalled();
    }
  }

  async showErrorIfDbtOrPythonNotInstalled() {
    if (!this.pythonInstalled) {
      if (!this.shownError) {
        // We don't want to flood the user with errors
        this.shownError = true;
        const answer = await window.showErrorMessage(
          "No Python interpreter is selected or Python is not installed",
          PythonInterpreterPromptAnswer.SELECT,
        );
        if (answer === PythonInterpreterPromptAnswer.SELECT) {
          commands.executeCommand("python.setInterpreter");
        }
      }
      return false;
    }
    return this.showErrorIfDbtIsNotInstalled();
  }

  private async executeInstallDbtCommand(
    message: string,
    option: DbtInstallationPromptAnswer,
  ) {
    const answer = await window.showErrorMessage(message, option);
    if (answer === option) {
      commands.executeCommand("dbtPowerUser.installDbt");
    }
  }

  async showErrorIfDbtIsNotInstalled() {
    if (!this.dbtInstalled) {
      if (!this.shownError) {
        // We don't want to flood the user with errors
        this.shownError = true;
        if (this.dbtIntegrationMode === "cloud") {
          await this.executeInstallDbtCommand(
            "Please ensure dbt cloud cli is installed.",
            DbtInstallationPromptAnswer.INSTALL_CLOUD,
          );
        } else {
          await this.executeInstallDbtCommand(
            "Please ensure dbt is installed.",
            DbtInstallationPromptAnswer.INSTALL,
          );
        }
      }
      return false;
    }
    return true;
  }

  getPythonEnvironment() {
    return this.pythonEnvironment;
  }

  private pythonPathExists() {
    return (
      this.pythonEnvironment.pythonPath !== undefined &&
      existsSync(this.pythonEnvironment.pythonPath)
    );
  }
}
