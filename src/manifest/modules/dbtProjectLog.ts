import { closeSync, existsSync, openSync, readSync } from "fs";
import * as path from "path";
import {
  Disposable,
  Event,
  FileSystemWatcher,
  OutputChannel,
  RelativePattern,
  window,
  workspace,
} from "vscode";
import { provideSingleton, setupWatcherHandler, stripANSI } from "../../utils";
import { ProjectConfigChangedEvent } from "../event/projectConfigChangedEvent";

@provideSingleton(DBTProjectLogFactory)
export class DBTProjectLogFactory {
  createDBTProjectLog(
    onProjectConfigChanged: Event<ProjectConfigChangedEvent>,
  ) {
    return new DBTProjectLog(onProjectConfigChanged);
  }
}

export class DBTProjectLog implements Disposable {
  private outputChannel?: OutputChannel;
  private logFileWatcher?: FileSystemWatcher;
  private logPosition: number = 0;
  private static LOG_PATH = "logs";
  private static LOG_FILE = "dbt.log";
  private currentProjectName?: string;
  private disposables: Disposable[] = [];

  constructor(onProjectConfigChanged: Event<ProjectConfigChangedEvent>) {
    this.disposables.push(
      onProjectConfigChanged((event) => this.onProjectConfigChanged(event)),
    );
  }

  private onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const { projectName, projectRoot } = event;
    if (this.outputChannel === undefined) {
      this.outputChannel = window.createOutputChannel(
        `${projectName} dbt logs`,
      );
      this.readLogFileFromLastPosition(event);

      this.logFileWatcher = workspace.createFileSystemWatcher(
        new RelativePattern(
          projectRoot.path,
          `${DBTProjectLog.LOG_PATH}/${DBTProjectLog.LOG_FILE}`,
        ),
      );
      setupWatcherHandler(this.logFileWatcher, () =>
        this.readLogFileFromLastPosition(event),
      );
      this.currentProjectName = projectName;
    }
    if (this.currentProjectName !== projectName) {
      this.outputChannel.dispose();
      this.outputChannel = window.createOutputChannel(
        `${projectName} dbt logs`,
      );
      this.logPosition = 0;
      this.readLogFileFromLastPosition(event);
      this.currentProjectName = projectName;
    }
  }

  private readLogFileFromLastPosition(event: ProjectConfigChangedEvent): void {
    const { projectRoot } = event;
    const logPath = path.join(
      projectRoot.fsPath,
      DBTProjectLog.LOG_PATH,
      DBTProjectLog.LOG_FILE,
    );
    if (this.outputChannel && existsSync(logPath)) {
      let fileHandle;
      try {
        fileHandle = openSync(logPath, "r");
        const chunkSize = 1024 * 1024;
        const buffer = Buffer.alloc(chunkSize);
        while (true) {
          const bytesRead = readSync(
            fileHandle,
            buffer,
            0,
            buffer.length,
            this.logPosition,
          );
          if (!bytesRead) {
            break;
          }
          this.logPosition += bytesRead;
          this.outputChannel.appendLine(
            stripANSI(buffer.toString("utf8", 0, bytesRead)),
          );
        }
      } catch (error) {
        console.log("Could not read log file", error);
      } finally {
        if (fileHandle) {
          closeSync(fileHandle);
        }
      }
    }
  }

  public dispose() {
    if (this.outputChannel !== undefined) {
      this.outputChannel.dispose();
    }
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
