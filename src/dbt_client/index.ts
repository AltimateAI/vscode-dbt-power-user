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
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTTerminal } from "./dbtTerminal";
import { DBTInstallationVerificationEvent } from "./dbtVersionEvent";
import { TelemetryService } from "../telemetry";

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
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
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
    this.dbtInstalled = undefined;
    try {
      // check for dbt installed
      const checkDBTInstalledProcess = await this.executeCommand(
        this.dbtCommandFactory.createVerifyDbtInstalledCommand(),
      );
      await checkDBTInstalledProcess.complete();
      this.dbtInstalled = true;
    } catch (error) {
      this.telemetry.sendTelemetryError("dbtInstalledCheckError", error);
      this.dbtInstalled = false;
      this.raiseDBTNotInstalledEvent();
      return;
    }

    let output;
    try {
      // Don't block on version check
      const checkDBTVersionProcess = await this.executeCommand(
        this.dbtCommandFactory.createVersionCommand(),
      );
      const timeoutCmd = new Promise((resolve, _) => {
        setTimeout(resolve, 10000, "Could not connect");
      });
      output = (await Promise.race([
        checkDBTVersionProcess.complete(),
        timeoutCmd,
      ])) as string;
    } catch (error) {
      if (typeof error === "string" && error.match(DBTClient.IS_INSTALLED)) {
        output = error as string;
      } else {
        this.telemetry.sendTelemetryError("dbtVersionCheckError", error);
      }
    }
    if (output !== undefined) {
      const stripAnsi = require("strip-ansi");
      this.checkIfDBTIsUpToDate(
        stripAnsi(output.replace("Process returned an error:", "")),
      );
      return;
    }
    this.raiseDBTVersionCouldNotBeDeterminedEvent();
  }

  addCommandToQueue(command: DBTCommand) {
    if (!this.dbtInstalled) {
      if (command.focus) {
        window.showErrorMessage(
          "Please ensure dbt is installed in your selected Python environment.",
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
    token?: CancellationToken,
  ) {
    const completedProcess = await this.executeCommand(command, token);
    completedProcess.completeWithTerminalOutput(this.terminal);
  }

  public async executeCommand(
    command: DBTCommand,
    token?: CancellationToken,
  ): Promise<CommandProcessExecution> {
    if (command.commandAsString !== undefined) {
      this.terminal.log(`> Executing task: ${command.commandAsString}\n\r`);
      this.telemetry.sendTelemetryEvent("dbtCommand", {
        command: command.commandAsString,
      });
      if (command.focus) {
        this.terminal.show(true);
      }
    }

    const { args, cwd } = command.processExecutionParams!;
    if (
      !this.pythonEnvironment.pythonPath ||
      !this.pythonEnvironment.environmentVariables
    ) {
      throw Error(
        "Could not launch command as python environment is not available",
      );
    }

    return this.commandProcessExecutionFactory.createCommandProcessExecution(
      this.pythonEnvironment.pythonPath,
      args,
      cwd,
      token,
      this.pythonEnvironment.environmentVariables,
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
    message: string | undefined = undefined,
  ): void {
    this.dbtInstalled = dbtInstalled;
    const upToDate =
      installedVersion !== undefined &&
      latestVersion !== undefined &&
      (installedVersion === latestVersion || !message?.includes("ahead"));

    const versionCheck: string = workspace
      .getConfiguration("dbt")
      .get<string>("versionCheck", "both");

    if (
      !upToDate &&
      message &&
      (versionCheck === "both" || versionCheck === "error message")
    ) {
      window.showErrorMessage(extendErrorWithSupportLinks(message));
    }
    this.telemetry.sendTelemetryEvent("dbtVersionCheck", {
      installed: `${this.dbtInstalled}`,
      installedVersion: `${installedVersion}`,
      latestVersion: `${latestVersion}`,
      upToDate: `${upToDate}`,
    });
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
        `The Regex INSTALLED_VERSION ${DBTClient.INSTALLED_VERSION} is not working ...`,
      );
      this.raiseDBTVersionCouldNotBeDeterminedEvent();
      this.telemetry.sendTelemetryError("versionCannotBeDetermined", {
        message,
      });
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
        `The Regex IS_LATEST_VERSION ${DBTClient.LATEST_VERSION} is not working ...`,
      );
      this.telemetry.sendTelemetryError("latestVersionCannotBeDetermined", {
        message,
      });
    }
    const latestVersion =
      latestVersionMatch !== null ? latestVersionMatch[1] : undefined;
    this.raiseDBTVersionEvent(true, installedVersion, latestVersion, message);
  }
}
