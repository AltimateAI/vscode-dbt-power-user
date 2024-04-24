import { spawn } from "child_process";
import { provide } from "inversify-binding-decorators";
import { CancellationToken, Disposable } from "vscode";
import { DBTTerminal } from "./dbt_client/dbtTerminal";
import { EnvironmentVariables } from "./domain";

@provide(CommandProcessExecutionFactory)
export class CommandProcessExecutionFactory {
  constructor(private terminal: DBTTerminal) {}

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
      this.terminal,
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
  stdout: string;
  stderr: string;
  fullOutput: string;
}

export class CommandProcessExecution {
  private disposables: Disposable[] = [];

  constructor(
    private terminal: DBTTerminal,
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
      this.terminal.debug(
        "CommandProcessExecution",
        "Going to execute command : " + this.command,
        this.args,
      );
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

      commandProcess.once("close", () => {
        this.terminal.debug(
          "CommandProcessExecution",
          "Return value from command: " + this.command,
          this.args,
          fullOutput,
        );
        resolve({ stdout: stdoutBuffer, stderr: stderrBuffer, fullOutput });
      });

      commandProcess.once("error", (error) => {
        this.terminal.debug(
          "CommandProcessExecution",
          "Command errored: " + this.command,
          this.args,
          fullOutput,
          (error as Error).message,
        );
        reject(new Error(`${error}`));
      });

      if (this.stdin) {
        commandProcess.stdin.write(this.stdin);
        commandProcess.stdin.end();
      }
    });
  }

  async completeWithTerminalOutput(): Promise<CommandProcessResult> {
    return new Promise((resolve, reject) => {
      const commandProcess = this.spawn();
      let stdoutBuffer = "";
      let stderrBuffer = "";
      let fullOutput = "";
      commandProcess.stdout!.on("data", (chunk) => {
        const line = `${this.formatText(chunk.toString())}`;
        stdoutBuffer += line;
        this.terminal.log(line);
        fullOutput += line;
      });
      commandProcess.stderr!.on("data", (chunk) => {
        const line = `${this.formatText(chunk.toString())}`;
        stderrBuffer += line;
        this.terminal.log(line);
        fullOutput += line;
      });
      commandProcess.once("close", () => {
        resolve({ stdout: stdoutBuffer, stderr: stderrBuffer, fullOutput });
        this.terminal.log("");
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
