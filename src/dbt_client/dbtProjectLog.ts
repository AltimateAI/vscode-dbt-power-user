import { promises as fs } from "fs";
import * as path from "path";
import { StringDecoder } from "string_decoder";
import {
  Disposable,
  Event,
  FileSystemWatcher,
  OutputChannel,
  RelativePattern,
  window,
  workspace,
} from "vscode";
import { setupWatcherHandler, stripANSI } from "../utils";
import { ProjectConfigChangedEvent } from "./event/projectConfigChangedEvent";

export class DBTProjectLog implements Disposable {
  private outputChannel?: OutputChannel;
  private logFileWatcher?: FileSystemWatcher;
  private logPath?: string;
  private logPosition: number = 0;
  private logFileId?: number;
  private decoder = new StringDecoder("utf8");
  private readChain: Promise<void> = Promise.resolve();
  private readQueued = false;
  private static LOG_PATH = "logs";
  private static LOG_FILE = "dbt.log";
  // Most unread output shown at once; anything older is skipped with a notice.
  private static MAX_UNREAD_BYTES = 2 * 1024 * 1024;
  private static CHUNK_BYTES = 256 * 1024;
  private currentProjectName?: string;
  private disposables: Disposable[] = [];

  constructor(onProjectConfigChanged: Event<ProjectConfigChangedEvent>) {
    this.disposables.push(
      onProjectConfigChanged((event) => this.onProjectConfigChanged(event)),
    );
  }

  private onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const projectRoot = event.project.projectRoot;
    const projectName = event.project.getProjectName();
    if (this.outputChannel === undefined) {
      this.outputChannel = window.createOutputChannel(
        `${projectName} dbt logs`,
      );
      this.logPath = this.logPathOf(event);
      this.scheduleRead();

      this.logFileWatcher = workspace.createFileSystemWatcher(
        new RelativePattern(
          projectRoot.path,
          `${DBTProjectLog.LOG_PATH}/${DBTProjectLog.LOG_FILE}`,
        ),
      );
      setupWatcherHandler(this.logFileWatcher, () => this.scheduleRead());
      this.currentProjectName = projectName;
    }
    if (this.currentProjectName !== projectName) {
      this.outputChannel.dispose();
      this.outputChannel = window.createOutputChannel(
        `${projectName} dbt logs`,
      );
      this.logPath = this.logPathOf(event);
      this.restartFrom(0);
      this.scheduleRead();
      this.currentProjectName = projectName;
    }
  }

  private logPathOf(event: ProjectConfigChangedEvent): string {
    return path.join(
      event.project.projectRoot.fsPath,
      DBTProjectLog.LOG_PATH,
      DBTProjectLog.LOG_FILE,
    );
  }

  private restartFrom(position: number) {
    this.logPosition = position;
    this.decoder = new StringDecoder("utf8");
  }

  /**
   * Queues one read of the log's unread bytes behind any read in progress. Requests made while a
   * read is already queued share it, so a burst of watcher events costs at most one extra read.
   */
  private scheduleRead(): Promise<void> {
    if (!this.readQueued) {
      this.readQueued = true;
      this.readChain = this.readChain.then(() => {
        this.readQueued = false;
        return this.readUnreadOutput();
      });
    }
    return this.readChain;
  }

  /**
   * Appends the bytes written since the last read, in bounded async chunks. When more than
   * MAX_UNREAD_BYTES are unread (a large log on open, or a burst of output), only the last
   * MAX_UNREAD_BYTES are shown, starting at a line boundary. A log that shrank or was replaced
   * (rotation, truncation) is read from its start.
   */
  private async readUnreadOutput(): Promise<void> {
    const channel = this.outputChannel;
    const logPath = this.logPath;
    if (channel === undefined || logPath === undefined) {
      return;
    }
    let handle: fs.FileHandle | undefined;
    try {
      handle = await DBTProjectLog.openIfExists(logPath);
      if (handle === undefined) {
        return;
      }
      const { size, ino } = await handle.stat();
      if (channel !== this.outputChannel) {
        return;
      }
      // Where skipped output began, until the first shown line is found.
      let skippedFrom = this.seekToUnread(size, ino);
      let position = this.logPosition;
      const buffer = Buffer.alloc(
        Math.min(DBTProjectLog.CHUNK_BYTES, size - position),
      );
      while (position < size) {
        const { bytesRead } = await handle.read(
          buffer,
          0,
          Math.min(buffer.length, size - position),
          position,
        );
        if (channel !== this.outputChannel || bytesRead === 0) {
          return;
        }
        const chunkStart = position;
        position += bytesRead;
        this.logPosition = position;
        let from = 0;
        if (skippedFrom !== undefined) {
          // A newline byte never occurs inside a multi-byte UTF-8 character.
          from = buffer.subarray(0, bytesRead).indexOf(0x0a) + 1;
          if (from === 0) {
            continue;
          }
          channel.appendLine(
            DBTProjectLog.skipNotice(chunkStart + from - skippedFrom, logPath),
          );
          skippedFrom = undefined;
        }
        const text = this.decoder.write(buffer.subarray(from, bytesRead));
        if (text) {
          channel.append(stripANSI(text));
        }
      }
    } catch (error) {
      console.log("Could not read log file", error);
    } finally {
      await handle?.close().catch(() => undefined);
    }
  }

  private static async openIfExists(
    logPath: string,
  ): Promise<fs.FileHandle | undefined> {
    try {
      return await fs.open(logPath, "r");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return undefined;
      }
      throw error;
    }
  }

  /**
   * Moves the read position to the first byte to read from a log of `size` bytes. When more than
   * MAX_UNREAD_BYTES are unread, returns the position older output is skipped from and moves to
   * one byte before the last MAX_UNREAD_BYTES; the caller then shows output from the first
   * newline on, so it starts on a whole line.
   */
  private seekToUnread(size: number, ino: number): number | undefined {
    if (size < this.logPosition || ino !== this.logFileId) {
      this.restartFrom(0);
    }
    this.logFileId = ino;
    const skippedFrom = this.logPosition;
    if (size - skippedFrom <= DBTProjectLog.MAX_UNREAD_BYTES) {
      return undefined;
    }
    this.restartFrom(size - DBTProjectLog.MAX_UNREAD_BYTES - 1);
    return skippedFrom;
  }

  private static skipNotice(skippedBytes: number, logPath: string): string {
    return `Skipped ${(skippedBytes / (1024 * 1024)).toFixed(1)} MB of earlier output, showing the most recent part. The full log is at ${logPath}`;
  }

  public dispose() {
    if (this.outputChannel !== undefined) {
      this.outputChannel.dispose();
      this.outputChannel = undefined;
    }
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
