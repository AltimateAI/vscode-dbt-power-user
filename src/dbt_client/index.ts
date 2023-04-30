import {
  CancellationToken,
  Disposable,
  EventEmitter,
  window,
  workspace,
} from "vscode";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../commandProcessExecution";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { provideSingleton } from "../utils";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTTerminal } from "./dbtTerminal";
import { DBTInstallationVerificationEvent } from "./dbtVersionEvent";

@provideSingleton(DBTClient)
export class DBTClient implements Disposable {
  private _onDBTInstallationVerificationEvent =
    new EventEmitter<DBTInstallationVerificationEvent>();
  public readonly onDBTInstallationVerification =
    this._onDBTInstallationVerificationEvent.event;

  private static readonly INSTALLED_VERSION =
    /installed.*:\s*(\d{1,2}\.\d{1,2}\.\d{1,2})/g;
  private static readonly LATEST_VERSION =
    /latest.*:\s*(\d{1,2}\.\d{1,2}\.\d{1,2})/g;
  private static readonly IS_INSTALLED = /installed/g;
  private dbtInstalled?: boolean;
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
    await this.pythonEnvironment.initialize();
    this.disposables.push(
      this.pythonEnvironment.onPythonEnvironmentChanged(() => {
        this.checkAllInstalled();
      })
    );
    await this.checkAllInstalled();
  }

  private async checkAllInstalled(): Promise<void> {
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: true,
    });
    this.dbtInstalled = undefined;

    // check for dbt installed
    const checkDBTInstalledProcess = await this.executeCommand(
      this.dbtCommandFactory.createVerifyDbtInstalledCommand()
    );

    try {
      await checkDBTInstalledProcess.complete();
      this.dbtInstalled = true;
    } catch (error) {
      this.dbtInstalled = false;
      this.raiseDBTNotInstalledEvent();
      return;
    }

    // Don't block on version check
    const checkDBTVersionProcess = await this.executeCommand(
      this.dbtCommandFactory.createVersionCommand()
    );
    const timeoutCmd = new Promise((resolve, _) => {
      setTimeout(resolve, 10000, "Could not connect");
    });
    let output;
    try {
      output = (await Promise.race([
        checkDBTVersionProcess.complete(),
        timeoutCmd,
      ])) as string;
    } catch (err) {
      if (typeof err === "string" && err.match(DBTClient.IS_INSTALLED)) {
        output = err as string;
      }
    } finally {
      checkDBTVersionProcess.dispose();
    }
    if (output !== undefined) {
      const stripAnsi = require("strip-ansi");
      this.checkIfDBTIsUpToDate(
        stripAnsi(output.replace("Process returned an error:", ""))
      );
      return;
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

  private async executeCommandImmediately(
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
    if (command.commandAsString !== undefined) {
      this.terminal.log(`> Executing task: ${command.commandAsString}\n\r`);

      if (command.focus) {
        this.terminal.show(true);
      }
    }

    const { args, cwd } = command.processExecutionParams!;
    if (
      !this.pythonEnvironment.pythonPath ||
      !this.pythonEnvironment.environmentVariables
    ) {
      console.error(
        "Could not launch command as python environment is not available"
      );
      return Promise.reject();
    }

    return this.commandProcessExecutionFactory.createCommandProcessExecution(
      this.pythonEnvironment.pythonPath,
      args,
      cwd,
      token,
      this.pythonEnvironment.environmentVariables
    );
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
    const upToDate =
      installedVersion !== undefined &&
      latestVersion !== undefined &&
      installedVersion === latestVersion;

    const versionCheck: string = workspace
      .getConfiguration("dbt")
      .get<string>("versionCheck", "both");

    if (
      !upToDate &&
      message &&
      (versionCheck === "both" || versionCheck === "error message")
    ) {
      window.showErrorMessage(message);
    }
    this._onDBTInstallationVerificationEvent.fire({
      inProgress: false,
      dbtInstallationFound: {
        installed: this.dbtInstalled,
        installedVersion,
        latestVersion,
        upToDate,
      },
    });
  }

  private checkIfDBTIsUpToDate(message: string): void {
    const installedVersionMatch = DBTClient.INSTALLED_VERSION.exec(message);
    if (installedVersionMatch === null || installedVersionMatch.length !== 2) {
      console.warn(
        `The Regex INSTALLED_VERSION ${DBTClient.INSTALLED_VERSION} is not working ...`
      );
      this.raiseDBTVersionCouldNotBeDeterminedEvent();
      return;
    }
    const installedVersion = installedVersionMatch[1];
    if (installedVersion === "unknown") {
      this.raiseDBTVersionCouldNotBeDeterminedEvent();
      return;
    }
    const latestVersionMatch = DBTClient.LATEST_VERSION.exec(message);
    if (latestVersionMatch === null || latestVersionMatch.length !== 2) {
      console.warn(
        `The Regex IS_LATEST_VERSION ${DBTClient.LATEST_VERSION} is not working ...`
      );
    }
    const latestVersion =
      latestVersionMatch !== null ? latestVersionMatch[1] : undefined;
    this.raiseDBTVersionEvent(true, installedVersion, latestVersion, message);
  }
}
