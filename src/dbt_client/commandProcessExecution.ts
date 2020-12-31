import { ChildProcess, spawn } from "child_process";
import { OutputChannel } from "vscode";

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

  async completeWithOutputChannel(outputChannel: OutputChannel): Promise<void> {
    return new Promise((resolve, reject) => {
      this.commandProcess.stdout!.on("data", (chunk) => {
        outputChannel.append(chunk.toString());
      });
      this.commandProcess.stderr!.on("data", (chunk) => {
        outputChannel.append(chunk.toString());
      });
      this.commandProcess.once("close", () => {
        resolve();
      });

      this.commandProcess.once("error", (error) => {
        reject(`Error occurred during process execution: ${error}`);
      });
    });
  }
}
