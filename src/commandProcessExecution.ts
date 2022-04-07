import { ChildProcess, spawn } from "child_process";
import { provide } from "inversify-binding-decorators";
import { CancellationToken, Disposable, EventEmitter } from "vscode";

export interface EnvVars {
  [key: string]: string | undefined;
}

@provide(CommandProcessExecutionFactory)
export class CommandProcessExecutionFactory {
  createCommandProcessExecution(
    command: string,
    args?: string[],
    cwd?: string,
    token?: CancellationToken,
    envVars?: EnvVars
  ) {
    return new CommandProcessExecution(command, args, cwd, token, envVars);
  }
}

export class CommandProcessExecution implements Disposable {
  private readonly commandProcess: ChildProcess;
  private disposables: Disposable[] = [];

  constructor(
    command: string,
    args?: string[],
    cwd?: string,
    token?: CancellationToken,
    envVars?: EnvVars
  ) {
    this.commandProcess = spawn(command, args, { cwd: cwd, env: envVars });
    if (token !== undefined) {
      this.disposables.push(
        token.onCancellationRequested(() => {
          this.commandProcess.kill("SIGINT");
        })
      );
    }
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
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

  async completeWithTerminalOutput(
    writeEmitter: EventEmitter<string>
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.commandProcess.stdout!.on("data", (chunk) => {
        writeEmitter.fire(`\r${this.formatText(chunk.toString())}`);
      });
      this.commandProcess.stderr!.on("data", (chunk) => {
        writeEmitter.fire(`\r${this.formatText(chunk.toString())}`);
      });
      this.commandProcess.once("close", () => {
        writeEmitter.fire("\r\n\r\n");
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
