import { Disposable, OutputChannel, window } from "vscode";
import {
  OnSourceFileChanged,
  SourceFileChangedEvent,
} from "../manifest/event/sourceFileChangedEvent";
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import { CommandProcessExecution } from "./commandProcessExecution";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";

export class DBTClient implements OnSourceFileChanged, Disposable {
  static readonly INSTALLED_VERSION = /(?<=installed\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
  static readonly LATEST_VERSION = /(?<=latest\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
  static readonly IS_INSTALLED = /installed\sversion/g;
  private readonly pythonPath: string;
  private readonly outputChannel: OutputChannel = window.createOutputChannel(
    "DBT"
  );
  private readonly queue: DBTCommandQueue = new DBTCommandQueue();
  private dbtInstalled?: boolean;
  private notYetShownErrorMessage = true;

  constructor(pythonPath: string) {
    this.pythonPath = pythonPath;
  }

  dispose() {
    this.outputChannel.dispose();
  }

  async onSourceFileChanged(event: SourceFileChangedEvent): Promise<void> {
    this.addCommandToQueue(
      DBTCommandFactory.createListCommand(event.projectRoot)
    );
  }

  async checkIfDBTIsInstalled(): Promise<void> {
    const checkDBTInstalledProcess = this.executeCommand(
      DBTCommandFactory.createVersionCommand()
    );
    try {
      this.raiseDBTInstallationCheckEvent();
      await checkDBTInstalledProcess.complete();
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
      this.notYetShownErrorMessage && window.showErrorMessage(
        "Please ensure DBT is installed in your selected Python environment."
      );
      this.notYetShownErrorMessage = false;
      return;
    }
    this.queue.addToQueue({
      command: () =>
        this.executeCommand(command).completeWithOutputChannel(
          this.outputChannel
        ),
      statusMessage: command.statusMessage,
    });
  }

  executeCommand(command: DBTCommand): CommandProcessExecution {
    const { args, cwd } = command.processExecutionParams;
    if (command.focus) {
      this.outputChannel.show(true);
    }
    return new CommandProcessExecution(this.pythonPath, args, cwd);
  }

  private raiseDBTInstallationCheckEvent() {
    this.dbtInstalled = undefined;
    dbtProjectContainer.raiseDBTVersionEvent({});
  }

  private raiseDBTNotInstalledEvent() {
    this.dbtInstalled = false;
    dbtProjectContainer.raiseDBTVersionEvent({
      installed: false,
    });
  }

  private raiseDBTVersionEvent(
    installedVersion: string,
    latestVersion: string
  ) {
    this.dbtInstalled = true;
    dbtProjectContainer.raiseDBTVersionEvent({
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
}
