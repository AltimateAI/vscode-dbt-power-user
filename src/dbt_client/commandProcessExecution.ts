import { ChildProcess, spawn } from "child_process";
import { EventEmitter } from "vscode";

export class CommandProcessExecution {
  private readonly commandProcess: ChildProcess;

  constructor(command: string, args?: string[], cwd?: string) {
    this.commandProcess = spawn(command, args, { cwd: cwd });
  }

  async complete(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const stdoutBuffer: Buffer[] = [];
      const stderrBuffer: Buffer[] = [];
      this.commandProcess.stdout!.on("data", (chunk) =>
        stdoutBuffer.push(chunk)
      );
      this.commandProcess.stderr!.on("data", (chunk) =>
        stderrBuffer.push(chunk)
      );

      this.commandProcess.once("close", () => {
        const stdout = stdoutBuffer.toString();
        const stderr = stderrBuffer.toString();
        if (!stdout) {
          reject(`Process returned an error:${stderr}`);
        }
        resolve(stdout);
      });

      this.commandProcess.once("error", (error) => {
        reject(`Error occurred during process execution: ${error}`);
      });
    });
  }

  async completeWithTerminalOutput(writeEmitter: EventEmitter<string>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.commandProcess.stdout!.on("data", (chunk) => {
        writeEmitter.fire(`\r${this.formatText(chunk.toString())}`);
      });
      this.commandProcess.stderr!.on("data", (chunk) => {
        writeEmitter.fire(`\r${this.formatText(chunk.toString())}`);
      });
      this.commandProcess.once("close", () => {
        writeEmitter.fire('\r\n\r\n');
        resolve();
      });

      this.commandProcess.once("error", (error) => {
        reject(`Error occurred during process execution: ${error}`);
      });
    });
  }

  private formatText(text: string) {
    return `\r${text.split(/(\r?\n)/g).join("\r")}\r`;
  }
}
