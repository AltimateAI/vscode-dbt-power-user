import { Disposable, Event, extensions, Uri, workspace } from "vscode";
import { EnvironmentVariables } from "../domain";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

type EnvFrom = "process" | "integrated" | "dotenv";
interface PythonExecutionDetails {
  getPythonPath: () => string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
  getEnvVars: () => EnvironmentVariables;
}

@provideSingleton(PythonEnvironment)
export class PythonEnvironment implements Disposable {
  private executionDetails?: PythonExecutionDetails;
  private disposables: Disposable[] = [];
  private environmentVariableSource: Record<string, EnvFrom> = {};
  constructor(
    private telemetry: TelemetryService,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private dbtTerminal: DBTTerminal,
  ) {}

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  printEnvVars() {
    const envVars = this.environmentVariables;
    this.dbtTerminal.log("Printing environment variables...\r\n");
    this.dbtTerminal.show(true);
    for (const key in envVars) {
      this.dbtTerminal.log(
        `${key}=${envVars[key]}\t\tsource:${this.environmentVariableSource[key]}\r\n`,
      );
    }
  }

  public get pythonPath() {
    return (
      this.getResolvedConfigValue("dbtPythonPathOverride") ||
      this.executionDetails!.getPythonPath()
    );
  }

  public get environmentVariables(): EnvironmentVariables {
    return this.executionDetails!.getEnvVars();
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

  getResolvedConfigValue(key: string) {
    const value = workspace.getConfiguration("dbt").get<string>(key, "");
    return this.substituteSettingsVariables(value, this.environmentVariables);
  }

  private substituteSettingsVariables(
    value: any,
    vsCodeEnv: EnvironmentVariables,
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
          `Picking env var ${matchResult[1]} from ${
            this.environmentVariableSource[matchResult[1]]
          }`,
        );
      }
    }
    value = value.replace(
      "${workspaceFolder}",
      workspace.workspaceFolders![0].uri.fsPath,
    );
    return value;
  }

  private async activatePythonExtension(): Promise<PythonExecutionDetails> {
    const extension = extensions.getExtension("ms-python.python")!;

    if (!extension.isActive) {
      await extension.activate();
    }
    await extension.exports.ready;

    const api = extension.exports;

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
      getEnvVars: () => {
        const envVars: EnvironmentVariables = {};
        for (const key in process.env) {
          envVars[key] = process.env[key];
          this.environmentVariableSource[key] = "process";
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
                );
                this.environmentVariableSource[key] = "integrated";
              }
            }
          }
          if (api.environment) {
            const workspacePath = workspace.workspaceFolders![0];
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
              if (!(key in envVars) || workspaceEnv[key] !== envVars[key]) {
                envVars[key] = workspaceEnv[key];
                this.environmentVariableSource[key] = "dotenv";
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

        return envVars;
      },
    });
  }
}
