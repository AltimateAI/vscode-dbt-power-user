import {
  CancellationToken,
  Disposable,
  EventEmitter,
  Terminal,
  window,
  Uri,
} from "vscode";
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import { CommandProcessExecution } from "./commandProcessExecution";
import { DBTInstallationFoundEvent } from "./dbtVersionEvent";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { provideSingleton } from "../utils";

@provideSingleton(DBTClient)
export class DBTClient implements Disposable {
  private _onDBTInstallationFound = new EventEmitter<DBTInstallationFoundEvent>();
  public readonly onDBTInstallationFound = this._onDBTInstallationFound.event;
  static readonly INSTALLED_VERSION = /(?<=installed\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
  static readonly LATEST_VERSION = /(?<=latest\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
  static readonly IS_INSTALLED = /installed\sversion/g;
  private pythonPath?: string;
  private readonly writeEmitter = new EventEmitter<string>();
  private dbtInstalled?: boolean;
  private terminal?: Terminal;
  private disposables: Disposable[] = [
    this.writeEmitter,
    this._onDBTInstallationFound,
  ];

  constructor(private queue: DBTCommandQueue) {}

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  async detectDBT(): Promise<void> {
    const pythonEnvironment = await PythonEnvironment.getEnvironment();
    this.disposables.push(
      pythonEnvironment.onDidChangeExecutionDetails(() =>
        this.handlePythonExtension()
      )
    );
    await this.handlePythonExtension();
  }

  async installDBT(): Promise<void> {
    if (this.pythonPath === undefined) {
      window.showErrorMessage(
        "Please ensure you have selected a Python interpreter before installing DBT."
      );
      return;
    }
    await this.executeCommandImmediately(
      DBTCommandFactory.createInstallDBTCommand()
    );
    await this.handlePythonExtension();
  }

  async updateDBT(): Promise<void> {
    if (this.pythonPath === undefined) {
      window.showErrorMessage(
        "Please ensure you have selected a Python interpreter before updating DBT."
      );
      return;
    }
    await this.executeCommandImmediately(
      DBTCommandFactory.createUpdateDBTCommand()
    );
    await this.handlePythonExtension();
  }

  async listModels(projectUri: Uri): Promise<void> {
    this.addCommandToQueue(DBTCommandFactory.createListCommand(projectUri));
  }

  async checkIfDBTIsInstalled(): Promise<void> {
    const checkDBTInstalledProcess = this.executeCommand(
      DBTCommandFactory.createVersionCommand()
    );
    try {
      this.raiseDBTInstallationCheckEvent();
      await checkDBTInstalledProcess.complete();
      checkDBTInstalledProcess.dispose();
    } catch (err) {
      if (err.match(DBTClient.IS_INSTALLED)) {
        this.checkIfDBTIsUpToDate(err);
        return;
      }
      this.raiseDBTNotInstalledEvent();
    }
  }

  addCommandToQueue(command: DBTCommand) {
    if (!this.dbtInstalled) {
      if (command.focus) {
        window.showErrorMessage(
          "Please ensure DBT is installed in your selected Python environment."
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
    const process = this.executeCommand(command, token);
    await process.completeWithTerminalOutput(this.writeEmitter);
    process.dispose();
  }

  private executeCommand(
    command: DBTCommand,
    token?: CancellationToken
  ): CommandProcessExecution {
    const { args, cwd } = command.processExecutionParams;
    if (this.terminal === undefined) {
      this.terminal = window.createTerminal({
        name: "Tasks - dbt",
        pty: {
          onDidWrite: this.writeEmitter.event,
          open: () => this.writeEmitter.fire(""),
          close: () => {
            this.terminal?.dispose();
            this.terminal = undefined;
          },
        },
      });
    }
    this.writeEmitter.fire(
      `\r> Executing task:  ${command.commandAsString}\n\r\n\r`
    );

    if (command.focus) {
      this.terminal.show(true);
    }
    return new CommandProcessExecution(this.pythonPath!, args, cwd, token);
  }

  private raiseDBTInstallationCheckEvent(): void {
    this.dbtInstalled = undefined;
    this._onDBTInstallationFound.fire({});
  }

  private raiseDBTNotInstalledEvent(): void {
    this.dbtInstalled = false;
    this._onDBTInstallationFound.fire({
      installed: false,
    });
  }

  private raiseDBTVersionEvent(
    installedVersion: string,
    latestVersion: string
  ): void {
    this.dbtInstalled = true;
    this._onDBTInstallationFound.fire({
      installed: installedVersion !== undefined,
      installedVersion,
      latestVersion,
      upToDate: installedVersion === latestVersion,
    });
  }

  private checkIfDBTIsUpToDate(message: string): void {
    const installedVersionMatch = message.match(DBTClient.INSTALLED_VERSION);
    if (installedVersionMatch === null) {
      throw Error(
        `The Regex INSTALLED_VERSION ${DBTClient.INSTALLED_VERSION} is not working ...`
      );
    }
    const installedVersion = installedVersionMatch[0];
    const latestVersionMatch = message.match(DBTClient.LATEST_VERSION);
    if (latestVersionMatch === null) {
      throw Error(
        `The Regex IS_LATEST_VERSION ${DBTClient.LATEST_VERSION} is not working ...`
      );
    }
    const latestVersion = latestVersionMatch[0];
    this.raiseDBTVersionEvent(installedVersion, latestVersion);
  }

  private async handlePythonExtension(): Promise<void> {
    const pythonEnvironment = await PythonEnvironment.getEnvironment();
    this.pythonPath = pythonEnvironment.getPythonPath();
    await this.checkIfDBTIsInstalled();
  }
}
