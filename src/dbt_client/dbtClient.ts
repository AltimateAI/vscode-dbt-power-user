import {
  Disposable,
  OutputChannel,
  StatusBarAlignment,
  StatusBarItem,
  window,
} from "vscode";
import {
  OnSourceFileChanged,
  SourceFileChangedEvent,
} from "../manifest/event/sourceFileChangedEvent";
import { DBTCommandQueue } from "./dbtCommandQueue";
import { DBTCommand, DBTCommandFactory } from "./dbtCommandFactory";
import { CommandProcessExecution } from "./commandProcessExecution";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

export class DBTClient implements OnSourceFileChanged, Disposable {
  static readonly IS_INSTALLED_VERSION = /(?<=installed\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
  static readonly IS_LATEST_VERSION = /(?<=latest\sversion:\s)(\d+.\d+.\d+)(?=\D+)/g;
  static readonly IS_INSTALLED = /installed\sversion/g;
  private readonly pythonPath: string;
  private readonly outputChannel: OutputChannel;
  private readonly statusBar: StatusBarItem;
  private installedVersion?: string;
  private queue: DBTCommandQueue;

  constructor(pythonPath: string) {
    this.pythonPath = pythonPath;
    this.queue = new DBTCommandQueue(this);
    this.outputChannel = window.createOutputChannel("DBT");
    // TODO: status bar should be moved to the factory and being able to communicate with other components through events
    this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 10);
  }

  dispose() {
    this.statusBar.dispose();
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
      await checkDBTInstalledProcess.complete();
    } catch (err) {
      if (err.match(DBTClient.IS_INSTALLED)) {
        const DBTUpToDate = this.checkIfDBTIsUpToDate(err);
        if (DBTUpToDate === false) {
          await this.askForDBTUpdate();
          return;
        }
        return;
      }
      await this.askforDBTInstallation();
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

  showMessageInStatusBar(text: string) {
    this.statusBar.text = text;
    this.statusBar.show();
  }

  showVersionInStatusBar() {
    this.statusBar.text = `DBT version ${this.installedVersion}`;
    this.statusBar.show();
  }

  executeCommand(command: DBTCommand): CommandProcessExecution {
    const { args, cwd } = command.processExecutionParams;
    return new CommandProcessExecution(this.pythonPath, args, cwd);
  }

  private checkIfDBTIsUpToDate(message: string): boolean {
    const installedVersionMatch = message.match(DBTClient.IS_INSTALLED_VERSION);
    if (installedVersionMatch === null) {
      throw Error(
        `The Regex IS_INSTALLED_VERSION ${DBTClient.IS_INSTALLED_VERSION} is not working ...`
      );
    }
    const installedVersion = installedVersionMatch[0];
    this.installedVersion = installedVersion;
    this.showVersionInStatusBar();

    const latestVersionMatch = message.match(DBTClient.IS_LATEST_VERSION);
    if (latestVersionMatch === null) {
      throw Error(
        `The Regex IS_LATEST_VERSION ${DBTClient.IS_LATEST_VERSION} is not working ...`
      );
    }
    const latestVersion = latestVersionMatch[0];
    return installedVersion === latestVersion;
  }

  private async askforDBTInstallation(): Promise<void> {
    const answer = await window.showErrorMessage(
      `DBT not installed in this python environment (${this.pythonPath}). Do you want to install DBT?`,
      PromptAnswer.YES,
      PromptAnswer.NO
    );
    if (answer === PromptAnswer.YES) {
      await this.executeCommand(
        DBTCommandFactory.createInstallDBTCommand()
      ).completeWithOutputChannel(this.outputChannel);
    }
  }

  private async askForDBTUpdate(): Promise<void> {
    const answer = await window.showErrorMessage(
      "DBT is not up to date. Do you want to update DBT?",
      PromptAnswer.YES,
      PromptAnswer.NO
    );
    if (answer === PromptAnswer.YES) {
      await this.executeCommand(
        DBTCommandFactory.createUpdateDBTCommand()
      ).completeWithOutputChannel(this.outputChannel);
    }
  }
}
