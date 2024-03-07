import { Disposable, Event, extensions, Uri, workspace } from "vscode";
import { EnvironmentVariables } from "../domain";
import { provideSingleton, substituteSettingsVariables } from "../utils";
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
      this.getPythonPathFromConfig() || this.executionDetails!.getPythonPath()
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

  private getPythonPathFromConfig(): string | undefined {
    const value = workspace
      .getConfiguration("dbt")
      .get<string>("dbtPythonPathOverride");
    return value ? substituteSettingsVariables(value) : undefined;
  }

  private parseEnvVarsFromUserSettings = (vsCodeEnv: {
    [k: string]: string;
  }) => {
    // TODO: add any other relevant variables, maybe workspacefolder?
    return Object.keys(vsCodeEnv).reduce(
      (prev: { [k: string]: string }, key: string) => {
        prev[key] = substituteSettingsVariables(vsCodeEnv[key]);
        return prev;
      },
      vsCodeEnv,
    );
  };

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
            const newEnvVars = this.parseEnvVarsFromUserSettings(vsCodeEnv);
            this.dbtTerminal.debug(
              "pythonEnvironment",
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
            envVars = {
              ...envVars,
              ...api.environments.getEnvironmentVariables(
                workspace.workspaceFolders![0],
              ),
            };
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
