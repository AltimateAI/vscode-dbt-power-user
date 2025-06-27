import { spawn } from "child_process";

import { EnvironmentVariables } from "./domain";
import { DBTTerminal } from "./terminal";

export class CommandProcessExecutionFactory {
  constructor(private terminal: DBTTerminal) {}

  createCommandProcessExecution({
    command,
    args,
    stdin,
    cwd,
    signal,
    envVars,
  }: {
    command: string;
    args?: string[];
    stdin?: string;
    cwd?: string;
    signal?: AbortSignal;
    envVars?: EnvironmentVariables;
  }) {
    return new CommandProcessExecution(
      this.terminal,
      command,
      args,
      stdin,
      cwd,
      signal,
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
  constructor(
    private terminal: DBTTerminal,
    private command: string,
    private args?: string[],
    private stdin?: string,
    private cwd?: string,
    private signal?: AbortSignal,
    private envVars?: EnvironmentVariables,
  ) {}

  private spawn() {
    const proc = spawn(this.command, this.args, {
      cwd: this.cwd,
      env: this.envVars,
    });

    if (this.signal) {
      const abortHandler = () => {
        proc.kill("SIGTERM");
      };

      if (this.signal.aborted) {
        abortHandler();
      } else {
        this.signal.addEventListener("abort", abortHandler);
      }
    }

    return proc;
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
        this.terminal.error(
          "CommandProcessExecutionError",
          "Command errored: " + this.command,
          error,
          true,
          this.command,
          this.args,
          error,
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
