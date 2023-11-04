import { ChildProcess, spawn } from "child_process";
import { provide } from "inversify-binding-decorators";
import { CancellationToken, Disposable } from "vscode";
import { DBTTerminal } from "./dbt_client/dbtTerminal";
import { EnvironmentVariables } from "./domain";

@provide(CommandProcessExecutionFactory)
export class CommandProcessExecutionFactory {
  createCommandProcessExecution({
    command,
    args,
    stdin,
    cwd,
    token,
    envVars,
  }: {
    command: string;
    args?: string[];
    stdin?: string;
    cwd?: string;
    token?: CancellationToken;
    envVars?: EnvironmentVariables;
  }) {
    return new CommandProcessExecution(
      command,
      args,
      stdin,
      cwd,
      token,
      envVars,
    );
  }
}

export class CommandProcessExecution {
  private disposables: Disposable[] = [];

  constructor(
    private command: string,
    private args?: string[],
    private stdin?: string,
    private cwd?: string,
    private token?: CancellationToken,
    private envVars?: EnvironmentVariables,
  ) {}

  private spawn() {
    const proc = spawn(this.command, this.args, {
      cwd: this.cwd,
      env: this.envVars,
    });
    if (this.token !== undefined) {
      this.disposables.push(
        this.token.onCancellationRequested(() => {
          proc.kill("SIGINT");
        }),
      );
    }
    return proc;
  }

  private dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  async complete(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const commandProcess = this.spawn();
      let stdoutBuffer = "";
      let stderrBuffer = "";
      commandProcess.stdout!.on(
        "data",
        (chunk) => (stdoutBuffer += chunk.toString()),
      );
      commandProcess.stderr!.on(
        "data",
        (chunk) => (stderrBuffer += chunk.toString()),
      );

      commandProcess.once("close", () => {
        if (!stdoutBuffer) {
          console.warn(stderrBuffer);
          reject(`${stderrBuffer}`);
        }
        resolve(stdoutBuffer);
      });

      commandProcess.once("error", (error) => {
        console.warn(error);
        reject(`${error}`);
      });

      if (this.stdin) {
        commandProcess.stdin.write(this.stdin);
        commandProcess.stdin.end();
      }
    });
  }

  async completeWithTerminalOutput(terminal: DBTTerminal): Promise<void> {
    return new Promise((resolve, reject) => {
      const commandProcess = this.spawn();
      commandProcess.stdout!.on("data", (chunk) => {
        terminal.log(`${this.formatText(chunk.toString())}`);
      });
      commandProcess.stderr!.on("data", (chunk) => {
        terminal.log(`${this.formatText(chunk.toString())}`);
      });
      commandProcess.once("close", () => {
        terminal.log("");
        resolve();
        this.dispose();
      });
      commandProcess.once("error", (error) => {
        reject(`Error occurred during process execution: ${error}`);
      });

      if (this.stdin) {
        commandProcess.stdin.write(this.stdin);
        commandProcess.stdin.end();
      }
    });
  }

  public formatText(text: string) {
    return `${text.split(/(\r?\n)+/g).join("\r")}`;
  }
}
