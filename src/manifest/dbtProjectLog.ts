import { closeSync, openSync, readSync } from "fs";
import path = require("path");
import { FileSystemWatcher, OutputChannel, RelativePattern, Uri, window, workspace } from "vscode";
import { setupWatcherhHandler } from "../utils";

export class DBTProjectLog {
  private outputChannel?: OutputChannel;
  private logFileWatcher?: FileSystemWatcher;
  private logPosition: number = 0;
  private static LOG_PATH = "logs";
  private static LOG_FILE = "dbt.log";
  private projectRoot: Uri;
  private currentProjectName?: string;

  constructor(projectRoot: Uri) {
    this.projectRoot = projectRoot;
  }

  public setupDBTProjectLog(projectName: string): void {
    if (this.outputChannel === undefined) {
      this.outputChannel = window.createOutputChannel(
        `${projectName} dbt logs`
      );
      this.readLogFileFromLastPosition();

      this.logFileWatcher = workspace.createFileSystemWatcher(
        new RelativePattern(
          this.projectRoot.path,
          `${DBTProjectLog.LOG_PATH}/${DBTProjectLog.LOG_FILE}`
        )
      );
      setupWatcherhHandler(this.logFileWatcher, () => this.readLogFileFromLastPosition());
      this.currentProjectName = projectName;
    }
    if (this.currentProjectName !== projectName) {
      this.outputChannel.dispose();
      this.outputChannel = window.createOutputChannel(
        `${projectName} dbt logs`
      );
      this.logPosition = 0;
      this.readLogFileFromLastPosition();
      this.currentProjectName = projectName;
    }
  }

  private readLogFileFromLastPosition(): void {
    if (this.outputChannel) {
      let fileHandle;
      try {
        fileHandle = openSync(
          path.join(
            this.projectRoot.fsPath,
            DBTProjectLog.LOG_PATH,
            DBTProjectLog.LOG_FILE
          ),
          "r"
        );
        const chunkSize = 1024 * 1024;
        const buffer = Buffer.alloc(chunkSize);
        while (true) {
          const bytesRead = readSync(
            fileHandle,
            buffer,
            0,
            buffer.length,
            this.logPosition
          );
          if (!bytesRead) {
            break;
          }
          this.logPosition += bytesRead;
          this.outputChannel.appendLine(buffer.toString("utf8", 0, bytesRead));
          this.outputChannel.show(true);
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
}