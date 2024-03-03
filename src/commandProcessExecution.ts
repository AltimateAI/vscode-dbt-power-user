import { spawn } from "child_process";
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
    tokens,
    envVars,
  }: {
    command: string;
    args?: string[];
    stdin?: string;
    cwd?: string;
    tokens?: CancellationToken[];
    envVars?: EnvironmentVariables;
  }) {
    return new CommandProcessExecution(
      command,
      args,
      stdin,
      cwd,
      tokens,
      envVars,
    );
  }
}

export interface CommandProcessResult {
  code: number;
  stdout: string;
  stderr: string;
  fullOutput: string;
}

export class CommandProcessExecution {
  private disposables: Disposable[] = [];

  constructor(
    private command: string,
    private args?: string[],
    private stdin?: string,
    private cwd?: string,
    private tokens?: CancellationToken[],
    private envVars?: EnvironmentVariables,
  ) {}

  private spawn() {
    const proc = spawn(this.command, this.args, {
      cwd: this.cwd,
      env: this.envVars,
    });
    if (this.tokens !== undefined) {
      this.tokens.forEach((token) =>
        this.disposables.push(
          token.onCancellationRequested(() => {
            proc.kill("SIGTERM");
          }),
        ),
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

  async complete(): Promise<CommandProcessResult> {
    return new Promise<CommandProcessResult>((resolve, reject) => {
      const commandProcess = this.spawn();
      let stdoutBuffer = "";
      let stderrBuffer = "";
      let fullOutput = "";
      commandProcess.stdout!.on("data", (chunk) => {
        chunk = chunk.toString();
        stdoutBuffer += chunk;
        fullOutput += chunk;
      });
      commandProcess.stderr!.on("data", (chunk) => {
        chunk = chunk.toString();
        stderrBuffer += chunk;
        fullOutput += chunk;
      });

      commandProcess.once("close", (code) => {
        resolve({
          code: code!,
          stdout: stdoutBuffer,
          stderr: stderrBuffer,
          fullOutput,
        });
      });

      commandProcess.once("error", (error) => {
        console.warn(error);
        reject(new Error(`${error}`));
      });

      if (this.stdin) {
        commandProcess.stdin.write(this.stdin);
        commandProcess.stdin.end();
      }
    });
  }

  async completeWithTerminalOutput(
    terminal: DBTTerminal,
  ): Promise<CommandProcessResult> {
    return new Promise((resolve, reject) => {
      const commandProcess = this.spawn();
      let stdoutBuffer = "";
      let stderrBuffer = "";
      let fullOutput = "";
      commandProcess.stdout!.on("data", (chunk) => {
        const line = `${this.formatText(chunk.toString())}`;
        stdoutBuffer += line;
        terminal.log(line);
        fullOutput += line;
      });
      commandProcess.stderr!.on("data", (chunk) => {
        const line = `${this.formatText(chunk.toString())}`;
        stderrBuffer += line;
        terminal.log(line);
        fullOutput += line;
      });
      commandProcess.once("close", (code) => {
        resolve({
          code: code!,
          stdout: stdoutBuffer,
          stderr: stderrBuffer,
          fullOutput,
        });
        terminal.log("");
        this.dispose();
      });
      commandProcess.once("error", (error) => {
        reject(new Error(`Error occurred during process execution: ${error}`));
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
