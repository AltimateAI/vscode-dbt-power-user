import { DBTTerminal, EnvironmentVariables } from "@altimateai/dbt-integration";
import { existsSync } from "fs";
import { inject } from "inversify";
import { isAbsolute } from "path";
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
   * Returns undefined if no terminal with shell integration is available.
   */
  public async detectPythonFromShell(): Promise<string | undefined> {
    // Unique markers to reliably extract the path from noisy terminal output.
    const startMarker = "__DBT_DETECT_START__";
    const endMarker = "__DBT_DETECT_END__";
    // Emit each marker as two string literals joined at runtime by Python, so the
    // *contiguous* marker token never appears in the command text itself. Shell
    // integration echoes the command line into the same stream we read back; if a
    // literal marker were in the source, the marker search in executeInTerminal
    // would match the echo and extract a fragment of the probe code instead of the
    // real interpreter path. (That produced an invalid dbtPythonPathOverride like
    // `"); print(sys.executable); print("`.) The joined token only ever appears in
    // stdout.
    const asSplitLiteral = (marker: string, quote: string): string => {
      const mid = Math.ceil(marker.length / 2);
      return `${quote}${marker.slice(0, mid)}${quote} + ${quote}${marker.slice(
        mid,
      )}${quote}`;
    };
    // Build a platform-appropriate command string.
    // POSIX shells: outer single quotes, inner double quotes in Python code.
    // Windows/PowerShell: outer double quotes, inner single quotes in Python code.
    const isWindows = process.platform === "win32";
    const pyCode = (quote: string) =>
      `import sys; __import__(${quote}dbt${quote}); ` +
      `print(${asSplitLiteral(startMarker, quote)}); print(sys.executable); ` +
      `print(${asSplitLiteral(endMarker, quote)})`;
    const pyCodePosix = pyCode('"');
    const pyCodeWin = pyCode("'");
    const buildCmd = (pythonCmd: string) =>
      isWindows
        ? `${pythonCmd} -c "${pyCodeWin}"`
        : `${pythonCmd} -c '${pyCodePosix}'`;

    const terminal = this.findTerminalWithShellIntegration();
    if (!terminal?.shellIntegration) {
      this.dbtTerminal.debug(
        "pythonEnvironment:detectPythonFromShell",
        "No terminal with shell integration found",
      );
      return undefined;
    }

    this.dbtTerminal.debug(
      "pythonEnvironment:detectPythonFromShell",
      `Using terminal: ${terminal.name}`,
    );
    for (const pythonCmd of ["python3", "python"]) {
      const result = await this.executeInTerminal(
        terminal,
        buildCmd(pythonCmd),
        startMarker,
        endMarker,
      );
      if (result) {
        return result;
      }
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

  private async executeInTerminal(
    terminal: Terminal,
    commandLine: string,
    startMarker: string,
    endMarker: string,
  ): Promise<string | undefined> {
    if (!terminal.shellIntegration) {
      return undefined;
    }
    const execution = terminal.shellIntegration.executeCommand(commandLine);
    // Race the stream read against a 10s timeout to avoid hanging indefinitely.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const output = await Promise.race([
      (async () => {
        let collected = "";
        for await (const data of execution.read()) {
          collected += data;
        }
        return collected;
      })(),
      new Promise<undefined>((resolve) => {
        timer = setTimeout(() => resolve(undefined), 10_000);
      }),
    ]).finally(() => {
      // Clear the timer when the read wins so it doesn't keep the event loop alive.
      if (timer) {
        clearTimeout(timer);
      }
    });
    if (output === undefined) {
      this.dbtTerminal.debug(
        "pythonEnvironment:executeInTerminal",
        `Timed out executing: ${commandLine}`,
      );
      return undefined;
    }
    // Strip ANSI/OSC escape codes and control characters
    const cleaned = output.replace(
      // eslint-disable-next-line no-control-regex
      /\x1B(?:\][^\x07\x1B]*(?:\x07|\x1B\\)|[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g,
      "",
    );
    this.dbtTerminal.debug(
      "pythonEnvironment:executeInTerminal",
      `Terminal output (cleaned): ${cleaned.slice(0, 500)}`,
    );
    // Extract the path between our unique markers
    const startIdx = cleaned.indexOf(startMarker);
    const endIdx = cleaned.indexOf(endMarker);
    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
      return undefined;
    }
    const between = cleaned.slice(startIdx + startMarker.length, endIdx).trim();
    if (between) {
      // Defense-in-depth: only accept an absolute path to an existing file, so
      // shell noise or a leaked command echo can never be persisted as the
      // interpreter (dbt.dbtPythonPathOverride).
      if (!isAbsolute(between) || !existsSync(between)) {
        this.dbtTerminal.debug(
          "pythonEnvironment:executeInTerminal",
          `Ignoring detected value that is not a valid interpreter path: ${between}`,
        );
        return undefined;
      }
      this.dbtTerminal.debug(
        "pythonEnvironment:executeInTerminal",
        `Detected Python with dbt at: ${between}`,
      );
      return between;
    }
    return undefined;
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
