import { DBTDetection } from "@altimateai/dbt-integration";
import { existsSync } from "fs";
import { inject } from "inversify";
import { commands, Disposable, EventEmitter, window, workspace } from "vscode";
import { DBTInstallationVerificationEvent } from "./dbtVersionEvent";
import { PythonEnvironment } from "./pythonEnvironment";

enum PythonInterpreterPromptAnswer {
  SELECT = "Select Python interpreter",
  DETECT = "Detect from terminal",
}

export class DBTClient implements Disposable {
  private _onDBTInstallationVerificationEvent =
    new EventEmitter<DBTInstallationVerificationEvent>();
  public readonly onDBTInstallationVerification =
    this._onDBTInstallationVerificationEvent.event;
  private _dbtInstalled?: boolean;
  private _pythonInstalled?: boolean;
  public get dbtInstalled() {
    return this._dbtInstalled;
  }
  public get pythonInstalled() {
    return this._pythonInstalled;
  }
  private disposables: Disposable[] = [
    this._onDBTInstallationVerificationEvent,
  ];
  private shownError = false;
  constructor(
    @inject(PythonEnvironment)
    private pythonEnvironment: PythonEnvironment,
    @inject("Factory<DBTDetection>")
    private dbtDetectionFactory: () => DBTDetection,
  ) {}

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

  private isCLIMode(): boolean {
    const mode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
    return mode === "corecommand" || mode === "cloud" || mode === "fusion";
  }

  private async checkAllInstalled(): Promise<void> {
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: true,
    });
    this.shownError = false;
    this._dbtInstalled = undefined;
    // CLI-based modes (corecommand, cloud, fusion) don't require a Python
    // interpreter on disk — they shell out to a dbt binary directly.
    this._pythonInstalled = this.isCLIMode() || this.pythonPathExists();
    this._dbtInstalled = await this.dbtDetectionFactory().detectDBT();
    if (!this.isCLIMode()) {
      // Refresh cached Python version — by this point the Python extension
      // has settled after an interpreter change
      await this.pythonEnvironment.refreshPythonVersion();
    }
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: false,
      installed: this._dbtInstalled,
    });
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.dbtInstalled",
      this._dbtInstalled,
    );
    if (!this._dbtInstalled) {
      this.showErrorIfDbtOrPythonNotInstalled();
    }
  }

  async showErrorIfDbtOrPythonNotInstalled() {
    // CLI modes don't need a Python interpreter
    if (!this._pythonInstalled && !this.isCLIMode()) {
      if (!this.shownError) {
        // We don't want to flood the user with errors
        this.shownError = true;
        const answer = await window.showErrorMessage(
          "No Python interpreter is selected or Python is not installed",
          PythonInterpreterPromptAnswer.SELECT,
          PythonInterpreterPromptAnswer.DETECT,
        );
        if (answer === PythonInterpreterPromptAnswer.SELECT) {
          commands.executeCommand("python.setInterpreter");
        } else if (answer === PythonInterpreterPromptAnswer.DETECT) {
          commands.executeCommand("dbtPowerUser.detectPythonFromTerminal");
        }
      }
      return false;
    }
    if (!this.isCLIMode() && !this.pythonEnvironment.isPython3) {
      const answer = await window.showErrorMessage(
        "Only Python 3 is supported by dbt, please select a Python 3 interpreter",
        PythonInterpreterPromptAnswer.SELECT,
        PythonInterpreterPromptAnswer.DETECT,
      );
      if (answer === PythonInterpreterPromptAnswer.SELECT) {
        commands.executeCommand("python.setInterpreter");
      } else if (answer === PythonInterpreterPromptAnswer.DETECT) {
        commands.executeCommand("dbtPowerUser.detectPythonFromTerminal");
      }
      return false;
    }
    return this.showErrorIfDbtIsNotInstalled();
  }

  private async executeInstallDbtCommand(message: string, option: string) {
    const answer = await window.showErrorMessage(
      message,
      option,
      PythonInterpreterPromptAnswer.DETECT,
      "Troubleshoot",
    );
    if (answer === option) {
      commands.executeCommand("dbtPowerUser.installDbt");
    } else if (answer === PythonInterpreterPromptAnswer.DETECT) {
      commands.executeCommand("dbtPowerUser.detectPythonFromTerminal");
    } else if (answer?.includes("Troubleshoot")) {
      commands.executeCommand("dbtPowerUser.openSetupWalkthrough");
    }
  }

  async showErrorIfDbtIsNotInstalled() {
    if (!this._dbtInstalled) {
      if (!this.shownError) {
        // We don't want to flood the user with errors
        this.shownError = true;
        const dbtIntegrationMode = workspace
          .getConfiguration("dbt")
          .get<string>("dbtIntegration", "core");
        switch (dbtIntegrationMode) {
          case "fusion":
            await this.executeInstallDbtCommand(
              "Please ensure dbt fusion cli is installed.",
              "Install dbt fusion",
            );
            break;
          case "core":
          case "corecommand":
            await this.executeInstallDbtCommand(
              "Please ensure dbt core cli is installed.",
              "Install dbt core",
            );
            break;
          case "cloud":
            await this.executeInstallDbtCommand(
              "Please ensure dbt cloud cli is installed.",
              "Install dbt cloud",
            );
            break;
          default:
            window.showErrorMessage(
              `Unknown dbt integration mode: ${dbtIntegrationMode}. Supported modes are: core, cloud, fusion.`,
            );
            break;
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
