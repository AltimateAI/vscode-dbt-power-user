import { DBTTerminal, EnvironmentVariables } from "@altimateai/dbt-integration";
import { execFile } from "child_process";
import { inject } from "inversify";
import {
  Disposable,
  Event,
  extensions,
  Terminal,
  Uri,
  window,
  workspace,
  WorkspaceFolder,
} from "vscode";

type EnvFrom = "process" | "integrated" | "dotenv";
interface EnvVarsResult {
  vars: EnvironmentVariables;
  sources: Record<string, EnvFrom>;
}
interface PythonExecutionDetails {
  getPythonPath: () => string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
  getEnvVars: (workspaceFolder?: WorkspaceFolder) => EnvVarsResult;
}

export class PythonEnvironment {
  private executionDetails?: PythonExecutionDetails;
  private disposables: Disposable[] = [];
  public allPythonPaths: { path: string; pathType: string }[] = [];
  public isPython3: boolean = true;
  private _pythonVersion?: string;

  constructor(
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
  ) {}

  async dispose(): Promise<void> {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  async printEnvVars(workspaceFolder?: WorkspaceFolder) {
    await this.dbtTerminal.show(true);
    if (!this.executionDetails) {
      throw new Error(
        "executionDetails is undefined, cannot retrieve environment variables",
      );
    }
    const { vars, sources } = this.executionDetails.getEnvVars(workspaceFolder);
    this.dbtTerminal.log("Printing environment variables...\r\n");
    for (const key in vars) {
      this.dbtTerminal.log(`${key}=${vars[key]}\t\tsource:${sources[key]}\r\n`);
    }
  }

  public get pythonPath() {
    return (
      this.getResolvedConfigValue("dbtPythonPathOverride") ||
      this.executionDetails!.getPythonPath()
    );
  }

  public get pythonVersion(): string | undefined {
    return this._pythonVersion;
  }

  /** Re-fetch the Python version from the Python extension (call after interpreter change) */
  public async refreshPythonVersion(): Promise<void> {
    try {
      const extension = extensions.getExtension("ms-python.python");
      if (!extension?.isActive) {
        return;
      }
      const api = extension.exports;
      const pythonPath = this.pythonPath;
      const envDetails =
        await api.environment.getEnvironmentDetails(pythonPath);
      this._pythonVersion = envDetails?.version?.join(".");
      this.isPython3 = envDetails?.version?.[0] === "3";
    } catch (e) {
      this.dbtTerminal.debug(
        "pythonEnvironment:refreshPythonVersion",
        "Failed to refresh Python version; keeping previous values",
        e,
      );
    }
  }

  public get environmentVariables(): EnvironmentVariables {
    return this.getEnvironmentVariables();
  }

  public getEnvironmentVariables(
    workspaceFolder?: WorkspaceFolder,
  ): EnvironmentVariables {
    if (!this.executionDetails) {
      throw new Error(
        "executionDetails is undefined, cannot retrieve environment variables",
      );
    }
    return this.executionDetails.getEnvVars(workspaceFolder).vars;
  }

  public get onPythonEnvironmentChanged() {
    return this.executionDetails!.onDidChangeExecutionDetails;
  }

  async initialize(): Promise<void> {
    if (this.executionDetails !== undefined) {
      return;
    }

    this.executionDetails = await this.activatePythonExtension();
  }

  getResolvedConfigValue(key: string, workspaceFolder?: WorkspaceFolder) {
    const value = workspace
      .getConfiguration("dbt", workspaceFolder?.uri)
      .get<string>(key, "");
    return this.substituteSettingsVariables(
      value,
      this.getEnvironmentVariables(workspaceFolder),
      workspaceFolder,
    );
  }

  private substituteSettingsVariables(
    value: any,
    vsCodeEnv: EnvironmentVariables,
    workspaceFolder?: WorkspaceFolder,
    sources?: Record<string, EnvFrom>,
  ): any {
    if (!value) {
      return value;
    }
    if (typeof value !== "string") {
      return value;
    }
    const regexVsCodeEnv = /\$\{env\:(.*?)\}/gm;
    let matchResult;
    while ((matchResult = regexVsCodeEnv.exec(value)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (matchResult.index === regexVsCodeEnv.lastIndex) {
        regexVsCodeEnv.lastIndex++;
      }
      if (vsCodeEnv[matchResult[1]] !== undefined) {
        value = value.replace(
          new RegExp(`\\\$\\\{env\\\:${matchResult[1]}\\\}`, "gm"),
          vsCodeEnv[matchResult[1]]!,
        );
        this.dbtTerminal.debug(
          "pythonEnvironment:substituteSettingsVariables",
          `Picking env var ${matchResult[1]} from ${sources?.[matchResult[1]]}`,
        );
      }
    }
    const resolvedFolder = workspaceFolder || workspace.workspaceFolders?.[0];
    if (resolvedFolder) {
      value = value.replace("${workspaceFolder}", resolvedFolder.uri.fsPath);
    }
    return value;
  }

  /**
   * Detect Python with dbt installed from the VS Code integrated terminal.
   * Uses shell integration API to execute a probe command in a real terminal
   * (which has the user's shell profile, venv activations, conda, etc.).
   * Falls back to spawning a login shell child process if shell integration
   * is not available.
   */
  public async detectPythonFromShell(): Promise<string | undefined> {
    const script =
      'import sys; exec("try:\\n    import dbt\\nexcept ImportError:\\n    sys.exit(1)"); print(sys.executable)';

    // Try the active terminal first, then any existing terminal with shell integration
    const existingTerminal = this.findTerminalWithShellIntegration();
    if (existingTerminal?.shellIntegration) {
      this.dbtTerminal.debug(
        "pythonEnvironment:detectPythonFromShell",
        `Using existing terminal: ${existingTerminal.name}`,
      );
      for (const pythonCmd of ["python3", "python"]) {
        const result = await this.executeInTerminal(
          existingTerminal,
          `${pythonCmd} -c "${script}"`,
        );
        if (result) {
          return result;
        }
      }
    }

    // If no existing terminal has shell integration, create one and wait for it
    this.dbtTerminal.debug(
      "pythonEnvironment:detectPythonFromShell",
      "No terminal with shell integration found, creating a new one",
    );
    const created = window.createTerminal({
      name: "dbt Python Detection",
      hideFromUser: true,
    });
    try {
      const shellIntegration = await this.waitForShellIntegration(created);
      if (shellIntegration) {
        for (const pythonCmd of ["python3", "python"]) {
          const result = await this.executeInTerminal(
            created,
            `${pythonCmd} -c "${script}"`,
          );
          if (result) {
            return result;
          }
        }
      } else {
        this.dbtTerminal.debug(
          "pythonEnvironment:detectPythonFromShell",
          "Shell integration not available, falling back to child process",
        );
        return this.detectPythonViaChildProcess(script);
      }
    } finally {
      created.dispose();
    }

    return undefined;
  }

  private findTerminalWithShellIntegration(): Terminal | undefined {
    // Prefer the active terminal if it has shell integration
    const active = window.activeTerminal;
    if (active?.shellIntegration) {
      return active;
    }
    // Otherwise find any terminal with shell integration
    return window.terminals.find((t) => t.shellIntegration !== undefined);
  }

  private waitForShellIntegration(
    terminal: Terminal,
  ): Promise<typeof terminal.shellIntegration> {
    if (terminal.shellIntegration) {
      return Promise.resolve(terminal.shellIntegration);
    }
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        listener.dispose();
        resolve(undefined);
      }, 5_000);
      const listener = window.onDidChangeTerminalShellIntegration((e) => {
        if (e.terminal === terminal) {
          clearTimeout(timeout);
          listener.dispose();
          resolve(e.shellIntegration);
        }
      });
    });
  }

  private async executeInTerminal(
    terminal: Terminal,
    commandLine: string,
  ): Promise<string | undefined> {
    if (!terminal.shellIntegration) {
      return undefined;
    }
    const execution = terminal.shellIntegration.executeCommand(commandLine);
    const stream = execution.read();
    let output = "";
    for await (const data of stream) {
      output += data;
    }
    // Strip ANSI escape codes and extract the Python path from output
    const cleaned = output.replace(
      // eslint-disable-next-line no-control-regex
      /\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g,
      "",
    );
    // The output contains the command echo and the result; find an absolute path
    const pathMatch = cleaned.match(/^\s*(\/[^\s]+python[^\s]*)\s*$/m);
    if (pathMatch) {
      const detectedPath = pathMatch[1];
      this.dbtTerminal.debug(
        "pythonEnvironment:executeInTerminal",
        `Detected Python with dbt at: ${detectedPath}`,
      );
      return detectedPath;
    }
    // Windows: look for a path like C:\... or C:/...
    const winMatch = cleaned.match(
      /^\s*([A-Za-z]:[/\\][^\s]+python[^\s]*)\s*$/m,
    );
    if (winMatch) {
      this.dbtTerminal.debug(
        "pythonEnvironment:executeInTerminal",
        `Detected Python with dbt at: ${winMatch[1]}`,
      );
      return winMatch[1];
    }
    return undefined;
  }

  /** Fallback: spawn a login shell child process to detect Python with dbt */
  private async detectPythonViaChildProcess(
    script: string,
  ): Promise<string | undefined> {
    const isWindows = process.platform === "win32";
    for (const pythonCmd of ["python3", "python"]) {
      const result = await this.probeChildProcess(pythonCmd, script, isWindows);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  private probeChildProcess(
    pythonCmd: string,
    script: string,
    isWindows: boolean,
  ): Promise<string | undefined> {
    return new Promise((resolve) => {
      let cmd: string;
      let args: string[];

      if (isWindows) {
        cmd = pythonCmd;
        args = ["-c", script];
      } else {
        const shell = process.env.SHELL || "/bin/bash";
        cmd = shell;
        args = [
          "-l",
          "-c",
          `${pythonCmd} -c '${script.replace(/'/g, "'\\''")}'`,
        ];
      }

      execFile(cmd, args, { timeout: 10_000 }, (error, stdout) => {
        if (error) {
          this.dbtTerminal.debug(
            "pythonEnvironment:probeChildProcess",
            `Probe failed for ${pythonCmd}: ${error.message}`,
          );
          resolve(undefined);
          return;
        }
        const detectedPath = stdout.trim();
        if (detectedPath) {
          this.dbtTerminal.debug(
            "pythonEnvironment:probeChildProcess",
            `Detected Python with dbt at: ${detectedPath}`,
          );
          resolve(detectedPath);
        } else {
          resolve(undefined);
        }
      });
    });
  }

  private async activatePythonExtension(): Promise<PythonExecutionDetails> {
    const extension = extensions.getExtension("ms-python.python")!;

    if (!extension.isActive) {
      await extension.activate();
    }
    await extension.exports.ready;

    const api = extension.exports;
    this.allPythonPaths = await api.environment.getEnvironmentPaths();
    const pythonPath = api.settings.getExecutionDetails(workspace.workspaceFile)
      .execCommand[0];
    const envDetails = await api.environment.getEnvironmentDetails(pythonPath);
    this.isPython3 = envDetails?.version?.[0] === "3";
    this._pythonVersion = envDetails?.version?.join(".");

    const dbtInstalledPythonPath: string[] = [];
    // TODO: support multiple workspacefolders for python detection
    // for (const workspaceFolder of workspace.workspaceFolders || []) {
    //   const candidatePythonPath = api.settings.getExecutionDetails(
    //     workspaceFolder.uri,
    //   ).execCommand[0];

    //   const dbtInstalledCommand =
    //     this.dbtCommandFactory.createVerifyDbtInstalledCommand();
    //   const checkDBTInstalledProcess =
    //     this.commandProcessExecutionFactory.createCommandProcessExecution({
    //       command: candidatePythonPath,
    //       args: dbtInstalledCommand.processExecutionParams.args,
    //     });

    //   try {
    //     await checkDBTInstalledProcess.complete();
    //   } catch {
    //     continue;
    //   }

    //   dbtInstalledPythonPath.push(candidatePythonPath);
    // }

    return (this.executionDetails = {
      getPythonPath: () => {
        if (dbtInstalledPythonPath.length > 0) {
          return dbtInstalledPythonPath[0];
        } else {
          return api.settings.getExecutionDetails(workspace.workspaceFile)
            .execCommand[0];
        }
      },
      onDidChangeExecutionDetails: api.settings.onDidChangeExecutionDetails,
      // There are 3 places from where we can get environments variables:
      // 1. process env    2. integrated terminal env    3. dot env file(we can get this from python extension)
      // Collecting env vars from all 3 places and merging them into one in the above order
      // While merging, also tagging the places from where the env var has come.
      getEnvVars: (workspaceFolder?: WorkspaceFolder) => {
        const envVars: EnvironmentVariables = {};
        const sources: Record<string, EnvFrom> = {};
        for (const key in process.env) {
          envVars[key] = process.env[key];
          sources[key] = "process";
        }
        try {
          const integratedEnv:
            | Record<string, Record<string, string>>
            | undefined = workspace
            .getConfiguration("terminal")
            .get("integrated.env");
          if (integratedEnv) {
            // parse vs code environment variables
            for (const prop in integratedEnv) {
              // Ignore any settings not supported by the terminal
              // We don't know which os is used in terminal unfortunately, so we just merge all of them.
              if (!["osx", "windows", "linux"].includes(prop)) {
                this.dbtTerminal.debug(
                  "pythonEnvironment:envVars",
                  "Loading env vars from config.terminal.integrated.env",
                  "Ignoring invalid property " + prop,
                );
                continue;
              }
              this.dbtTerminal.debug(
                "pythonEnvironment:envVars",
                "Loading env vars from config.terminal.integrated.env",
                "Merging from " + prop,
                Object.keys(integratedEnv[prop]),
              );
              for (const key in integratedEnv[prop]) {
                envVars[key] = this.substituteSettingsVariables(
                  integratedEnv[prop][key],
                  process.env,
                  workspaceFolder,
                  sources,
                );
                sources[key] = "integrated";
              }
            }
          }
          if (api.environments) {
            const workspacePath =
              workspaceFolder || workspace.workspaceFolders?.[0];
            if (workspacePath) {
              this.dbtTerminal.debug(
                "pythonEnvironment:envVars",
                `workspacePath:${workspacePath.uri.fsPath}`,
              );
              const workspaceEnv =
                api.environments.getEnvironmentVariables(workspacePath);
              this.dbtTerminal.debug(
                "pythonEnvironment:envVars",
                `workspaceEnv:${Object.keys(workspaceEnv)}`,
              );
              for (const key in workspaceEnv) {
                // env var from python extension also includes env var from process env
                // therefore only merging those env var, which are not present in process env
                // or whose value differ from process env
                if (!(key in envVars) || workspaceEnv[key] !== envVars[key]) {
                  envVars[key] = workspaceEnv[key];
                  sources[key] = "dotenv";
                }
              }
            }
          }
        } catch (e: any) {
          this.dbtTerminal.error(
            "getEnvVarsError",
            "Could not call environment api",
            e,
          );
        }

        return { vars: envVars, sources };
      },
    });
  }
}
