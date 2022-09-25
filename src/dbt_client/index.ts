import {
  CancellationToken,
  Disposable,
  EventEmitter,
  window,
  Uri,
  workspace,
} from "vscode";
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../commandProcessExecution";
import { DBTInstallationVerificationEvent } from "./dbtVersionEvent";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { provideSingleton } from "../utils";
import { DBTTerminal } from "./dbtTerminal";

@provideSingleton(DBTClient)
export class DBTClient implements Disposable {
  private _onDBTInstallationVerificationEvent =
    new EventEmitter<DBTInstallationVerificationEvent>();
  public readonly onDBTInstallationVerification = this._onDBTInstallationVerificationEvent.event;
  private static readonly INSTALLED_VERSION =
    /installed.*:\s*(\d{1,2}\.\d{1,2}\.\d{1,2})/g;
  private static readonly LATEST_VERSION =
    /latest.*:\s*(\d{1,2}\.\d{1,2}\.\d{1,2})/g;
  private static readonly IS_INSTALLED = /installed/g;
  private pythonPath?: string;
  private dbtInstalled?: boolean;
  private dbtOsmosisInstalled?: boolean;
  private disposables: Disposable[] = [
    this._onDBTInstallationVerificationEvent,
  ];

  constructor(
    private pythonEnvironment: PythonEnvironment,
    private dbtCommandFactory: DBTCommandFactory,
    private queue: DBTCommandQueue,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private terminal: DBTTerminal
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
    const pythonEnvironment = await this.pythonEnvironment.getEnvironment();
    this.disposables.push(
      pythonEnvironment.onDidChangeExecutionDetails(() =>
        this.handlePythonExtension()
      )
    );
    await this.handlePythonExtension();
  }

  getDBTCommandFactory() {
    return this.dbtCommandFactory;
  }

  async rebuildManifest(projectUri: Uri): Promise<void> {
    const listModelsDisabled = workspace
      .getConfiguration("dbt")
      .get<boolean>("listModelsDisabled", false);
    if (listModelsDisabled) {
      return;
    }
    this.addCommandToQueue(
      this.dbtCommandFactory.createListCommand(projectUri)
    );
  }

  async checkIfDBTIsInstalled(): Promise<void> {
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: true
    });
    this.dbtInstalled = undefined;
    this.dbtOsmosisInstalled = undefined;
    const checkDBTInstalledProcess = await this.executeCommand(
      this.dbtCommandFactory.createVerifyDbtInstalledCommand()
    );

    // TODO: run checks in parallel
    
    // check for dbt installed
    try {
      await checkDBTInstalledProcess.complete();
    } catch (err) {
      this.dbtInstalled = false;
      this.raiseDBTNotInstalledEvent();
      return;
    }
    this.dbtInstalled = true;

    // check for dbt osmosis installed
    const checkDBTOsmosisInstalledProcess = await this.executeCommand(
      this.dbtCommandFactory.createVerifyDbtOsmosisInstalledCommand()
    );
    try {
      await checkDBTOsmosisInstalledProcess.complete();
    } catch (err) {
      this.dbtOsmosisInstalled = false;
      this.raiseDBTOsmosisNotInstalledEvent();
    }
    this.dbtOsmosisInstalled = true;

    // TODO: this shouldn't block the UI
    // version check
    const checkDBTVersionProcess = await this.executeCommand(
      this.dbtCommandFactory.createVersionCommand()
    );
    const timeoutCmd = new Promise((resolve, _) => {
      setTimeout(resolve, 10000, "Could not connect");
    });
    try {
      await Promise.race([checkDBTVersionProcess.complete(), timeoutCmd]);
      checkDBTVersionProcess.dispose();
    } catch (err) {
      if (typeof (err) === 'string' && err.match(DBTClient.IS_INSTALLED)) {
        const stripAnsi = require("strip-ansi");
        this.checkIfDBTIsUpToDate(stripAnsi(err.replace("Process returned an error:", "")));
        return;
      }
    }
    this.raiseDBTVersionCouldNotBeDeterminedEvent();
  }

  async installDbtOsmosis(){
    if (this.pythonPath === undefined) {
      window.showErrorMessage(
        "Please ensure you have selected a Python interpreter before updating DBT."
      );
      return;
    }
    await this.executeCommandImmediately(
      this.dbtCommandFactory.createDbtOsmosisInstallCommand()
    );
  }

  addCommandToQueue(command: DBTCommand) {
    if (!this.dbtInstalled) {
      if (command.focus) {
        window.showErrorMessage(
          "Please ensure dbt is installed in your selected Python environment."
        );
      }
      return;
    }

    this.queue.addToQueue({
      command: (token) => this.executeCommandImmediately(command, token),
      statusMessage: command.statusMessage,
      focus: command.focus,
    });
  }

  async executeCommandImmediately(
    command: DBTCommand,
    token?: CancellationToken
  ) {
    const completedProcess = await this.executeCommand(command, token);
    completedProcess.completeWithTerminalOutput(this.terminal);
    completedProcess.dispose();
  }

  public async executeCommand(
    command: DBTCommand,
    token?: CancellationToken
  ): Promise<CommandProcessExecution> {
    const { args, cwd } = command.processExecutionParams;
    const configText = workspace.getConfiguration();
    const config = JSON.parse(JSON.stringify(configText));
    let envVars = {};
    if (config.terminal !== undefined && config.terminal.integrated !== undefined && config.terminal.integrated.env !== undefined) {
      const env = config.terminal.integrated.env;
      for (let prop in env) {
        envVars = {
          ...process.env,
          ...envVars,
          ...env[prop],
        };
      }
    }
    if (command.commandAsString !== undefined) {
      this.terminal.log(`> Executing task: ${command.commandAsString}\n\r`);

      if (command.focus) {
        this.terminal.show(true);
      }
    }

    return this.commandProcessExecutionFactory.createCommandProcessExecution(
      this.pythonPath!,
      args,
      cwd,
      token,
      envVars
    );
  }

  private raiseDBTNotInstalledEvent(): void {
    this.raiseDBTVersionEvent(false, false);
  }

  private raiseDBTOsmosisNotInstalledEvent(): void {
    this.raiseDBTVersionEvent(true, false);
  }

  private raiseDBTVersionCouldNotBeDeterminedEvent(): void {
    this.raiseDBTVersionEvent(true, true);
  }

  private raiseDBTVersionEvent(
    dbtInstalled: boolean,
    dbtOsmosisInstalled: boolean,
    installedVersion: string | undefined = undefined,
    latestVersion: string | undefined = undefined,
    message: string | undefined = undefined
  ): void {
    this.dbtInstalled = dbtInstalled;
    this.dbtOsmosisInstalled = dbtOsmosisInstalled;
    const upToDate = installedVersion !== undefined &&
      latestVersion !== undefined &&
      installedVersion === latestVersion;

    const versionCheck: string = workspace
      .getConfiguration("dbt")
      .get<string>("versionCheck") || "both";

    if (!upToDate && message && (versionCheck === "both" || versionCheck === "error message")) {
      window.showErrorMessage(message);
    };
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: false,
      dbtInstallationFound: {
        installed: this.dbtInstalled,
        installedVersion,
        latestVersion,
        upToDate
      },
      dbtOsmosisInstallationFound: this.dbtOsmosisInstalled,
    });
  }

  private checkIfDBTIsUpToDate(message: string): void {
    const installedVersionMatch = DBTClient.INSTALLED_VERSION.exec(message);
    if (installedVersionMatch === null || installedVersionMatch.length !== 2) {
      throw Error(
        `The Regex INSTALLED_VERSION ${DBTClient.INSTALLED_VERSION} is not working ...`
      );
    }
    const installedVersion = installedVersionMatch[1];
    if (installedVersion === 'unknown') {
      this.raiseDBTVersionCouldNotBeDeterminedEvent();
      return;
    }
    const latestVersionMatch = DBTClient.LATEST_VERSION.exec(message);
    if (latestVersionMatch === null || latestVersionMatch.length !== 2) {
      throw Error(
        `The Regex IS_LATEST_VERSION ${DBTClient.LATEST_VERSION} is not working ...`
      );
    }
    const latestVersion = latestVersionMatch !== null ? latestVersionMatch[1] : undefined;
    this.raiseDBTVersionEvent(true, this.dbtOsmosisInstalled!, installedVersion, latestVersion, message);
  }

  private async handlePythonExtension(): Promise<void> {
    const pythonEnvironment = await this.pythonEnvironment.getEnvironment();
    this.pythonPath = pythonEnvironment.getPythonPath();
    await this.checkIfDBTIsInstalled();
  }
}
