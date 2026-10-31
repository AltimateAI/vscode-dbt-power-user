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

const INSTALL_PYTHON_EXTENSION = "Install Python extension";
const RELOAD_WINDOW = "Reload window";
const INSTALL_DBT_FUSION = "Install dbt Fusion";
const TROUBLESHOOT = "Troubleshoot";

/** dbt Core and its command-line mode run through a Python interpreter; dbt Fusion and the dbt Cloud CLI don't. */
export function integrationNeedsPython(dbtIntegrationMode: string): boolean {
  return dbtIntegrationMode === "core" || dbtIntegrationMode === "corecommand";
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

  private async checkAllInstalled(): Promise<void> {
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: true,
    });
    this.shownError = false;
    this._dbtInstalled = undefined;
    this._pythonInstalled = this.pythonPathExists();
    this._dbtInstalled = await this.dbtDetectionFactory().detectDBT();
    // Refresh cached Python version — by this point the Python extension
    // has settled after an interpreter change
    await this.pythonEnvironment.refreshPythonVersion();
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
    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
    if (!integrationNeedsPython(dbtIntegrationMode)) {
      return this.showErrorIfDbtIsNotInstalled();
    }
    if (
      !this.pythonEnvironment.pythonExtensionAvailable &&
      !this._pythonInstalled
    ) {
      if (!this.shownError) {
        this.shownError = true;
        await this.promptToInstallPythonExtension();
      }
      return false;
    }
    if (!this._pythonInstalled) {
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
    if (!this.pythonEnvironment.isPython3) {
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

  private async promptToInstallPythonExtension() {
    const answer = await window.showErrorMessage(
      "dbt Core runs through the Python extension, which is not installed. Install it, or switch dbt.dbtIntegration to fusion to use dbt Fusion without Python.",
      INSTALL_PYTHON_EXTENSION,
      TROUBLESHOOT,
    );
    if (answer === INSTALL_PYTHON_EXTENSION) {
      await commands.executeCommand(
        "workbench.extensions.installExtension",
        "ms-python.python",
      );
      const reload = await window.showInformationMessage(
        "The Python extension is installed. Reload the window to use it with dbt Core.",
        RELOAD_WINDOW,
      );
      if (reload === RELOAD_WINDOW) {
        commands.executeCommand("workbench.action.reloadWindow");
      }
    } else if (answer === TROUBLESHOOT) {
      commands.executeCommand("dbtPowerUser.openSetupWalkthrough");
    }
  }

  private async showDbtFusionNotFound() {
    const answer = await window.showErrorMessage(
      "dbt Fusion was not found: no dbt that reports version 2.x next to the Python interpreter, in ~/.local/bin, or on PATH.",
      INSTALL_DBT_FUSION,
      TROUBLESHOOT,
    );
    if (answer === INSTALL_DBT_FUSION) {
      commands.executeCommand("dbtPowerUser.installDbt");
    } else if (answer === TROUBLESHOOT) {
      commands.executeCommand("dbtPowerUser.openSetupWalkthrough");
    }
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
            await this.showDbtFusionNotFound();
            break;
          case "core":
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
