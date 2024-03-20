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

interface PythonExecutionDetails {
  getPythonPath: () => string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
  getEnvVars: () => EnvironmentVariables;
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

  public get environmentVariables() {
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
        const configText = workspace.getConfiguration();
        const config = JSON.parse(JSON.stringify(configText));
        let envVars = {};
        if (
          config.terminal !== undefined &&
          config.terminal.integrated !== undefined &&
          config.terminal.integrated.env !== undefined
        ) {
          const env = config.terminal.integrated.env;
          // parse vs code environment variables
          for (const prop in env) {
            // Ignore any settings not supported by the terminal
            // We don't know which os is used in terminal unfortunately, so we just merge all of them.
            if (!["osx", "windows", "linux"].includes(prop)) {
              this.dbtTerminal.debug(
                "pythonEnvironment",
                "Loading env vars from config.terminal.integrated.env",
                "Ignoring invalid property  " + prop,
              );
              continue;
            }
            const vsCodeEnv = env[prop];
            const newEnvVars = parseEnvVarsFromUserSettings(vsCodeEnv);
            this.dbtTerminal.debug(
              "pythonEnvironment:envVars",
              "Loading env vars from config.terminal.integrated.env",
              "Merging from " + prop,
              newEnvVars,
            );
            envVars = {
              ...process.env,
              ...envVars,
              ...newEnvVars,
            };
          }
        }
        try {
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
              `workspaceEnv:${JSON.stringify(workspaceEnv, null, 2)}`,
            );
            envVars = { ...envVars, ...workspaceEnv };
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
