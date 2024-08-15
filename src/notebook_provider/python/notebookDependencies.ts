import { CommandProcessExecutionFactory } from "../../commandProcessExecution";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { TelemetryService } from "../../telemetry";
import { TelemetryEvents } from "../../telemetry/events";
import {
  extendErrorWithSupportLinks,
  getFirstWorkspacePath,
  provideSingleton,
} from "../../utils";
import { commands, ProgressLocation, window } from "vscode";

@provideSingleton(NotebookDependencies)
export class NotebookDependencies {
  constructor(
    private readonly dbtTerminal: DBTTerminal,
    private readonly telemetry: TelemetryService,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private pythonEnvironment: PythonEnvironment,
  ) {}

  public async getDependenciesVersion() {
    const args = ["-m", "jupyter", "--version"];
    const { stdout, stderr } = await this.commandProcessExecutionFactory
      .createCommandProcessExecution({
        command: this.pythonEnvironment.pythonPath,
        args,
        // TODO: should this be first workspace path or projectroot of notebook?
        cwd: getFirstWorkspacePath(),
        envVars: this.pythonEnvironment.environmentVariables,
      })
      .completeWithTerminalOutput();
    if (
      !stdout.includes("Successfully installed") &&
      !stdout.includes("Requirement already satisfied") &&
      stderr
    ) {
      throw new Error(stderr);
    }
    const lines = stdout.split("\n");
    const jsonObject: Record<string, string> = {};

    lines.forEach((line) => {
      const [packageName, version] = line.split(":").map((part) => part.trim());
      if (packageName && version) {
        jsonObject[packageName] = version;
      }
    });

    return jsonObject;
  }

  public async validateAndInstallNotebookDependencies() {
    try {
      if (await this.notebookDependenciesAreInstalled()) {
        this.dbtTerminal.log("Notebook dependencies are already installed.");
        return true;
      }

      const selected = await window.showInformationMessage(
        "You need [ipykernel](https://pypi.org/project/ipykernel/) and [jupyter_client](https://github.com/jupyter/jupyter_client) to use the notebook",
        "Install",
        "Cancel",
      );
      if (selected !== "Install") {
        this.telemetry.sendTelemetryEvent(
          TelemetryEvents["Notebook/DependenciesInstallCancelled"],
        );
        return false;
      }
      await window.withProgress(
        {
          title: `Installing required dependencies...`,
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async () => {
          try {
            const args = [
              "-m",
              "pip",
              "install",
              "ipykernel",
              "jupyter_client",
              "jupyter_contrib_nbextensions",
              "ipywidgets",
            ];
            const { stdout, stderr } = await this.commandProcessExecutionFactory
              .createCommandProcessExecution({
                command: this.pythonEnvironment.pythonPath,
                args,
                // TODO: should this be first workspace path or projectroot of notebook?
                cwd: getFirstWorkspacePath(),
                envVars: this.pythonEnvironment.environmentVariables,
              })
              .completeWithTerminalOutput();
            if (
              !stdout.includes("Successfully installed") &&
              !stdout.includes("Requirement already satisfied") &&
              stderr
            ) {
              throw new Error(stderr);
            }
            this.dbtTerminal.log(
              "Notebook dependencies have been installed successfully.",
            );
            this.telemetry.sendTelemetryEvent(
              TelemetryEvents["Notebook/DependenciesInstalled"],
            );
            const result = await window.showInformationMessage(
              "Notebook dependencies installed. Please reload the window to use the notebook.",
              "Reload Window",
            );
            if (result === "Reload Window") {
              commands.executeCommand("workbench.action.reloadWindow");
            }
            return true;
          } catch (err) {
            this.telemetry.sendTelemetryError(
              TelemetryEvents["Notebook/DependenciesInstallError"],
              err,
            );
            window.showErrorMessage(
              extendErrorWithSupportLinks((err as Error).message),
            );
            return false;
          }
        },
      );
    } catch (exc) {
      this.dbtTerminal.error(
        TelemetryEvents["Notebook/DependenciesInstallError"],
        (exc as Error).message,
        exc,
      );
      throw exc;
    }
  }

  private async notebookDependenciesAreInstalled() {
    try {
      const dependencyCheckerProcess =
        this.commandProcessExecutionFactory.createCommandProcessExecution({
          command: this.pythonEnvironment.pythonPath,
          args: ["-c", "import jupyter_client"],
          cwd: getFirstWorkspacePath(),
          envVars: this.pythonEnvironment.environmentVariables,
        });
      const { stderr } = await dependencyCheckerProcess.complete();
      if (stderr) {
        throw new Error(stderr);
      }
      return true;
    } catch (exc) {
      return false;
    }
  }
}
