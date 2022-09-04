import {
  CancellationToken,
  Disposable,
  EventEmitter,
  window,
  Uri,
  workspace,
} from "vscode";
import fetch from 'node-fetch';
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../commandProcessExecution";
import { DBTInstallationFoundEvent } from "./dbtVersionEvent";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { provideSingleton } from "../utils";
import { DBTTerminal } from "./dbtTerminal";

interface OsmosisCompileResp {
  error?: string,
  result?: string
}

@provideSingleton(DBTClient)
export class DBTClient implements Disposable {
  private _onDBTInstallationFound =
    new EventEmitter<DBTInstallationFoundEvent>();
  public readonly onDBTInstallationFound = this._onDBTInstallationFound.event;
  public static readonly OSMOSIS_PROXY_PORT = 8581;
  private static readonly INSTALLED_VERSION =
    /installed.*:\s*(\d{1,2}\.\d{1,2}\.\d{1,2})/g;
  private static readonly LATEST_VERSION =
    /latest.*:\s*(\d{1,2}\.\d{1,2}\.\d{1,2})/g;
  private static readonly IS_INSTALLED = /installed/g;
  private pythonPath?: string;
  private dbtInstalled?: boolean;
  private disposables: Disposable[] = [
    this._onDBTInstallationFound,
  ];

  constructor(
    private pythonEnvironment: PythonEnvironment,
    private dbtCommandFactory: DBTCommandFactory,
    private queue: DBTCommandQueue,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private terminal: DBTTerminal
  ) { }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
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

  async executeSQL(projectUri: Uri, sql: string): Promise<any> {
    // WIP -- serverless execution
    try {
      const sqlCommandProcess = await this.executeCommand(
        this.dbtCommandFactory.createSqlCommand(projectUri, sql)
      );
      const output = await sqlCommandProcess.complete();
      sqlCommandProcess.dispose();
      const data = JSON.parse(output);
      return data;
    } catch (err) {
      console.log(`An error occured while executing query '${sql}'`, err);
      this.terminal.log(`An error occured while executing query '${sql}': ${err}`);
    }
  }

  async listModels(projectUri: Uri): Promise<void> {
    const listModelsDisabled = workspace
      .getConfiguration("dbt")
      .get<boolean>("listModelsDisabled", false);
    if (listModelsDisabled) {
      return;
    }
    this.addCommandToQueue(
      this.dbtCommandFactory.createListCommand()
    );
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

  private async executeCommand(
    command: DBTCommand,
    token?: CancellationToken
  ): Promise<CommandProcessExecution> {
    const { args, cwd } = command.processExecutionParams;
    const configText = await workspace.getConfiguration();
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

  async compileSql(sql: string): Promise<string> {
    let data: OsmosisCompileResp;
    const response = await fetch(`http://localhost:${DBTClient.OSMOSIS_PROXY_PORT}/compile`, {
      method: 'POST',
      headers: {
        'content-type': 'text/plain',
      },
      body: sql
    });
    data = await response.json();
    if (data.result !== undefined) {
      window.showInformationMessage(data.result);
      return data.result;
    } else {
      window.showErrorMessage("Failed compilation...");
      return "";
    }
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
    if (!upToDate && message) {
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

  private async handlePythonExtension(): Promise<void> {
    const pythonEnvironment = await this.pythonEnvironment.getEnvironment();
    this.pythonPath = pythonEnvironment.getPythonPath();
    await this.checkIfDBTIsInstalled();
  }
}
