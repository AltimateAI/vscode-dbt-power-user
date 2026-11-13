import { DBTDetection } from "@altimateai/dbt-integration";
import { existsSync } from "fs";
import { inject } from "inversify";
import { delimiter, isAbsolute, join } from "path";
import { commands, Disposable, EventEmitter, window, workspace } from "vscode";
import { DBTInstallationVerificationEvent } from "./dbtVersionEvent";
import {
  PythonEnvironment,
  PythonInterpreterPromptAnswer,
} from "./pythonEnvironment";

const INSTALL_PYTHON_EXTENSION = "Install Python extension";
const RELOAD_WINDOW = "Reload window";
const INSTALL_DBT_FUSION = "Install dbt Fusion";
const TROUBLESHOOT = "Troubleshoot";

/**
 * Every mode but dbt Fusion runs dbt from the selected Python interpreter:
 * dbt Core through the bridge or its console script, the dbt Cloud CLI from
 * the interpreter's environment. Fusion is a native binary.
 */
export function integrationNeedsPython(dbtIntegrationMode: string): boolean {
  return dbtIntegrationMode !== "fusion";
}

/**
 * The mode runs dbt through Python, and there is no interpreter: the Python
 * extension, which selects it, is missing and `dbt.dbtPythonPathOverride`
 * names no interpreter that exists. Until the extension is installed, dbt is
 * reported as not installed and projects don't start their integration, as
 * before the extension could activate without the Python extension.
 */
export function awaitingPythonExtension(
  dbtIntegrationMode: string,
  pythonEnvironment: PythonEnvironment,
): boolean {
  return (
    integrationNeedsPython(dbtIntegrationMode) &&
    !pythonEnvironment.pythonExtensionAvailable &&
    !interpreterExists(
      pythonEnvironment.pythonPath,
      environmentOf(pythonEnvironment),
    )
  );
}

/**
 * The environment dbt runs with: the process environment merged with
 * `terminal.integrated.env`. Before the environment is initialized, the
 * process environment.
 */
function environmentOf(
  pythonEnvironment: PythonEnvironment,
): Record<string, string | undefined> {
  try {
    return pythonEnvironment.getEnvironmentVariables();
  } catch {
    return process.env;
  }
}

/**
 * Whether `pythonPath` names an interpreter that exists: a path on disk, or a
 * bare command such as `python3` found on the PATH of `env`, the environment
 * the interpreter runs with (`dbt.dbtPythonPathOverride` accepts both).
 */
export function interpreterExists(
  pythonPath: string | undefined,
  env: Record<string, string | undefined> = process.env,
): boolean {
  if (!pythonPath) {
    return false;
  }
  if (/[\\/]/.test(pythonPath)) {
    return existsSync(pythonPath);
  }
  // Windows reads environment names in any case (`Path`, `PATHEXT`), and the
  // merged environment there can carry a process `Path` next to a `PATH` set
  // in `terminal.integrated.env`: search every spelling. Elsewhere names are
  // case-sensitive and only `PATH` is the search path.
  const isWindows = process.platform === "win32";
  const values = (name: string) =>
    Object.keys(env)
      .filter((key) => (isWindows ? key.toUpperCase() === name : key === name))
      .map((key) => env[key] ?? "")
      .join(delimiter);
  const extensions = isWindows
    ? ["", ...(values("PATHEXT") || ".EXE;.CMD;.BAT").split(";")]
    : [""];
  return values("PATH")
    .split(delimiter)
    .filter(Boolean)
    .some((dir) =>
      extensions.some((extension) =>
        existsSync(join(dir, pythonPath + extension)),
      ),
    );
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
    // The dbt Cloud CLI is found on PATH without an interpreter, but every
    // command then needs one: don't report it until the extension is there.
    this._dbtInstalled = this.pythonExtensionMissing()
      ? false
      : await this.dbtDetectionFactory().detectDBT();
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

  private dbtIntegrationMode(): string {
    return workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
  }

  private pythonExtensionMissing(): boolean {
    return awaitingPythonExtension(
      this.dbtIntegrationMode(),
      this.pythonEnvironment,
    );
  }

  private async promptToInstallPythonExtensionOnce() {
    if (!this.shownError) {
      this.shownError = true;
      await this.promptToInstallPythonExtension();
    }
  }

  async showErrorIfDbtOrPythonNotInstalled() {
    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
    if (!integrationNeedsPython(dbtIntegrationMode)) {
      return this.showErrorIfDbtIsNotInstalled();
    }
    if (this.pythonExtensionMissing()) {
      await this.promptToInstallPythonExtensionOnce();
      return false;
    }
    if (!this._pythonInstalled) {
      if (!this.shownError) {
        // We don't want to flood the user with errors
        this.shownError = true;
        // A path that no longer exists, typically a deleted or moved virtual
        // environment. A bare command such as `python` is left to the general
        // message: it may be on the PATH.
        const pythonPath = this.pythonEnvironment.pythonPath;
        if (
          pythonPath &&
          (isAbsolute(pythonPath) || /[\\/]/.test(pythonPath))
        ) {
          await this.pythonEnvironment.showInterpreterNotFound(pythonPath);
          return false;
        }
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
    // Name the runner for the mode in use: dbt Core (core and corecommand)
    // keeps its wording; cloud mode names the dbt Cloud CLI.
    const runner =
      this.dbtIntegrationMode() === "cloud"
        ? "The dbt Cloud CLI runs"
        : "dbt Core runs";
    const answer = await window.showErrorMessage(
      `${runner} through the Python extension, which is not installed. Install it, or switch dbt.dbtIntegration to fusion to use dbt Fusion without Python.`,
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
    return interpreterExists(
      this.pythonEnvironment.pythonPath,
      environmentOf(this.pythonEnvironment),
    );
  }
}
