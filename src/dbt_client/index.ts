import {
  CancellationToken,
  Disposable,
  EventEmitter,
  window,
  workspace,
  ProgressLocation
} from "vscode";
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../commandProcessExecution";
import { DBTInstallationFoundEvent } from "./dbtVersionEvent";
import { provideSingleton } from "../utils";
import { DBTTerminal } from "./dbtTerminal";
import { reparseProject } from "../osmosis_client";

@provideSingleton(DBTClient)
export class DBTClient implements Disposable {
  private _onDBTInstallationFound =
    new EventEmitter<DBTInstallationFoundEvent>();
  public readonly onDBTInstallationFound = this._onDBTInstallationFound.event;
  private static readonly INSTALLED_VERSION =
    /installed.*:\s*(\d{1,2}\.\d{1,2}\.\d{1,2})/g;
  private static readonly LATEST_VERSION =
    /latest.*:\s*(\d{1,2}\.\d{1,2}\.\d{1,2})/g;
  private static readonly IS_INSTALLED = /installed/g;
  private dbtInstalled?: boolean;
  private disposables: Disposable[] = [
    this._onDBTInstallationFound,
  ];

  constructor(
    private dbtCommandFactory: DBTCommandFactory,
    private queue: DBTCommandQueue,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private terminal: DBTTerminal
  ) { }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  async detectDBT(): Promise<void> {
    await this.checkIfDBTIsInstalled();
  }

  async rebuildManifest(): Promise<void> {
    const rebuildManifestOsmosis = workspace.getConfiguration("dbt").get<boolean>("rebuildManifestOsmosis", false);
    const listModelsEnabled = workspace.getConfiguration("dbt").get<boolean>("listModelsDisabled", false);
    if (rebuildManifestOsmosis) {
      try {
        await window.withProgress(
          { title: "Syncing dbt manifest", location: ProgressLocation.Notification },
          async () => await reparseProject());
      } catch {
        if (listModelsEnabled) {
          console.log("Err: Osmosis server is not available, falling back to dbt ls to trigger manifest regeneration");
          this.addCommandToQueue(
            this.dbtCommandFactory.createListCommand()
          );
        }
      }
    } else {
      if (listModelsEnabled) {
        this.addCommandToQueue(
          this.dbtCommandFactory.createListCommand()
        );
      }
    }

  }

  async checkIfDBTIsInstalled(): Promise<void> {
    const checkDBTInstalledProcess = await this.executeCommand(
      this.dbtCommandFactory.createImportDBTCommand()
    );
    this.raiseDBTInstallationCheckEvent();
    try {
      await checkDBTInstalledProcess.complete();
    } catch (err) {
      window.showErrorMessage(err as string);
      this.raiseDBTNotInstalledEvent();
      return;
    }

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

  addCommandToQueue(command: DBTCommand) {
    if (!this.dbtInstalled) {
      if (command.focus) {
        window.showErrorMessage(
          "Please ensure dbt is installed and on $PATH for the editor instance or configured in settings."
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

  private async executeCommand(
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

    const dbtPath: string = workspace
      .getConfiguration("dbt")
      .get<string>("executablePath") || 'dbt';

    return this.commandProcessExecutionFactory.createCommandProcessExecution(
      dbtPath,
      args,
      cwd,
      token,
      envVars
    );
  }

  private raiseDBTInstallationCheckEvent(): void {
    this.dbtInstalled = undefined;
    this._onDBTInstallationFound.fire({});
  }

  private raiseDBTNotInstalledEvent(): void {
    this.raiseDBTVersionEvent(false);
  }

  private raiseDBTVersionCouldNotBeDeterminedEvent(): void {
    this.raiseDBTVersionEvent(true);
  }

  private raiseDBTVersionEvent(
    dbtInstalled: boolean,
    installedVersion: string | undefined = undefined,
    latestVersion: string | undefined = undefined,
    message: string | undefined = undefined
  ): void {
    this.dbtInstalled = dbtInstalled;
    const upToDate = installedVersion !== undefined &&
      latestVersion !== undefined &&
      installedVersion === latestVersion;

    const versionCheck: string = workspace
      .getConfiguration("dbt")
      .get<string>("versionCheck") || "both";

    if (!upToDate && message && (versionCheck === "both" || versionCheck === "error message")) {
      window.showErrorMessage(message);
    };
    this._onDBTInstallationFound.fire({
      installed: this.dbtInstalled,
      installedVersion,
      latestVersion,
      upToDate
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
    this.raiseDBTVersionEvent(true, installedVersion, latestVersion, message);
  }
}
