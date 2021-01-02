import {
  Disposable,
  OutputChannel,
  window,
} from "vscode";
import {
  OnSourceFileChanged,
  SourceFileChangedEvent,
} from "../manifest/event/sourceFileChangedEvent";
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import { CommandProcessExecution } from "./commandProcessExecution";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";

export class DBTClient implements OnSourceFileChanged, Disposable {
  static readonly IS_INSTALLED_VERSION = /(?<=installed\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
  static readonly IS_LATEST_VERSION = /(?<=latest\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
  static readonly IS_INSTALLED = /installed\sversion/g;
  private readonly pythonPath: string;
  private readonly outputChannel: OutputChannel = window.createOutputChannel("DBT");
  private readonly queue: DBTCommandQueue = new DBTCommandQueue();

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
    this.queue.addToQueue(
      () =>
        this.executeCommand(command).completeWithOutputChannel(
          this.outputChannel
        ),
      command.statusMessage
    );
  }

  executeCommand(command: DBTCommand): CommandProcessExecution {
    const { args, cwd } = command.processExecutionParams;
    if (command.focus) {
      this.outputChannel.show(true);
    }
    return new CommandProcessExecution(this.pythonPath, args, cwd);
  }

  private raiseDBTInstallationCheckEvent() {
    dbtProjectContainer.raiseDBTVersionEvent({});
  }

  private raiseDBTNotInstalledEvent() {
    dbtProjectContainer.raiseDBTVersionEvent({
      installed: false,
    });
  }

  private raiseDBTVersionEvent(installedVersion: string, latestVersion: string) {
    dbtProjectContainer.raiseDBTVersionEvent({
      installed: installedVersion !== undefined,
      installedVersion,
      latestVersion,
      upToDate: installedVersion === latestVersion,
    });
  }

  private checkIfDBTIsUpToDate(message: string): void {
    const installedVersionMatch = message.match(DBTClient.IS_INSTALLED_VERSION);
    if (installedVersionMatch === null) {
      throw Error(
        `The Regex IS_INSTALLED_VERSION ${DBTClient.IS_INSTALLED_VERSION} is not working ...`
      );
    }
    const installedVersion = installedVersionMatch[0];
    const latestVersionMatch = message.match(DBTClient.IS_LATEST_VERSION);
    if (latestVersionMatch === null) {
      throw Error(
        `The Regex IS_LATEST_VERSION ${DBTClient.IS_LATEST_VERSION} is not working ...`
      );
    }
    const latestVersion = latestVersionMatch[0];
    this.raiseDBTVersionEvent(installedVersion, latestVersion);
  }
}
