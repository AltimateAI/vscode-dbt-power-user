import { Disposable, Event, extensions, Uri, workspace } from "vscode";
import { EnvironmentVariables } from "../domain";
import {
  getResolvedConfigValue,
  parseEnvVarsFromUserSettings,
  provideSingleton,
} from "../utils";
import { TelemetryService } from "../telemetry";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

type EnvFrom = "process" | "integrated" | "dotenv";
type EnvVarsDebug = Record<
  string,
  { value: string | undefined; from: EnvFrom }
>;
interface PythonExecutionDetails {
  getPythonPath: () => string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
  getEnvVars: () => EnvVarsDebug;
}

@provideSingleton(PythonEnvironment)
export class PythonEnvironment implements Disposable {
  private executionDetails?: PythonExecutionDetails;
  private disposables: Disposable[] = [];
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

  public get pythonPath() {
    return (
      getResolvedConfigValue(
        "dbtPythonPathOverride",
        this.environmentVariables,
      ) || this.executionDetails!.getPythonPath()
    );
  }

  public get environmentVariables(): EnvironmentVariables {
    const envVarsDebug = this.executionDetails!.getEnvVars();
    const envVars: EnvironmentVariables = {};
    for (const key in envVarsDebug) {
      envVars[key] = envVarsDebug[key].value;
    }
    return envVars;
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
        const envVars: EnvVarsDebug = {};
        const setEnvVars = (
          _envVars: Record<string, string | undefined>,
          from: EnvFrom,
        ) => {
          for (const key in _envVars) {
            if (envVars[key]) {
              this.dbtTerminal.debug(
                "pythonEnvironment:envVars",
                `Overriding env ${key} from ${envVars[key].from} to ${from}`,
              );
            }
            envVars[key] = { value: _envVars[key], from: from };
          }
        };
        setEnvVars(process.env, "process");
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
                  "Ignoring invalid property  " + prop,
                );
                continue;
              }
              const newEnvVars = parseEnvVarsFromUserSettings(
                integratedEnv[prop],
              );
              this.dbtTerminal.debug(
                "pythonEnvironment:envVars",
                "Loading env vars from config.terminal.integrated.env",
                "Merging from " + prop,
                Object.keys(newEnvVars),
              );
              setEnvVars(newEnvVars, "integrated");
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
            setEnvVars(workspaceEnv, "dotenv");
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
