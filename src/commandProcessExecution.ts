import { ChildProcess, spawn } from "child_process";
import { provide } from "inversify-binding-decorators";
import { CancellationToken, Disposable } from "vscode";
import { DBTTerminal } from "./dbt_client/dbtTerminal";

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
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  async complete(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let stdoutBuffer = '';
      let stderrBuffer = '';
      this.commandProcess.stdout!.on("data", (chunk) =>
        stdoutBuffer += chunk.toString()
      );
      this.commandProcess.stderr!.on("data", (chunk) =>
        stderrBuffer += chunk.toString()
      );

      this.commandProcess.once("close", () => {
        if (!stdoutBuffer) {
          reject(`${stderrBuffer}`);
        }
        resolve(stdoutBuffer);
      });

      this.commandProcess.once("error", (error) => {
        reject(`${error}`);
      });
    });
  }

  async completeWithTerminalOutput(
    terminal: DBTTerminal
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.commandProcess.stdout!.on("data", (chunk) => {
        terminal.log(`${this.formatText(chunk.toString())}`);
      });
      this.commandProcess.stderr!.on("data", (chunk) => {
        terminal.log(`${this.formatText(chunk.toString())}`);
      });
      this.commandProcess.once("close", () => {
        terminal.log("");
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
