import {
  CommandProcessExecutionFactory,
  DBTConfiguration,
  DBTTerminal,
} from "@altimateai/dbt-integration";
import { inject } from "inversify";
import { Uri, workspace } from "vscode";
import { PythonEnvironment } from "./pythonEnvironment";

export class AltimateDatapilot {
  private packageName = "altimate-datapilot-cli";
  constructor(
    @inject(PythonEnvironment)
    private pythonEnvironment: PythonEnvironment,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
    @inject("DBTConfiguration")
    private dbtConfiguration: DBTConfiguration,
  ) {}

  private getWorkspaceFolder() {
    const cwd = this.dbtConfiguration.getWorkingDirectory();
    return cwd ? workspace.getWorkspaceFolder(Uri.file(cwd)) : undefined;
  }

  async checkIfAltimateDatapilotInstalled(): Promise<string> {
    const process =
      this.commandProcessExecutionFactory.createCommandProcessExecution({
        command: this.pythonEnvironment.pythonPath,
        args: ["-c", "import datapilot;print(datapilot.__version__)"],
        cwd: this.dbtConfiguration.getWorkingDirectory(),
        envVars: this.pythonEnvironment.getEnvironmentVariables(
          this.getWorkspaceFolder(),
        ),
      });
    const { stdout, stderr } = await process.complete();
    if (stderr) {
      this.dbtTerminal.debug(
        "AltimateDatapilot:checkIfAltimateDatapilotInstalled",
        "Datapilot not installed",
        stderr,
      );
      return "";
    }
    return stdout.trim();
  }

  async installAltimateDatapilot(datapilotVersion: string) {
    const { stderr, stdout } = await this.commandProcessExecutionFactory
      .createCommandProcessExecution({
        command: this.pythonEnvironment.pythonPath,
        args: [
          "-m",
          "pip",
          "install",
          `${this.packageName}==${datapilotVersion}`,
        ],
        cwd: this.dbtConfiguration.getWorkingDirectory(),
        envVars: this.pythonEnvironment.getEnvironmentVariables(
          this.getWorkspaceFolder(),
        ),
      })
      .completeWithTerminalOutput();
    if (!stdout.includes("Successfully installed") && stderr) {
      throw new Error(stderr);
    }
  }
}
