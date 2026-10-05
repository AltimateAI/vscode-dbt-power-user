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

  private async getInstalledDbtCoreVersion(): Promise<string | undefined> {
    const { stdout } = await this.commandProcessExecutionFactory
      .createCommandProcessExecution({
        command: this.pythonEnvironment.pythonPath,
        args: [
          "-c",
          "import importlib.metadata as m;print(m.version('dbt-core'))",
        ],
        cwd: this.dbtConfiguration.getWorkingDirectory(),
        envVars: this.pythonEnvironment.getEnvironmentVariables(
          this.getWorkspaceFolder(),
        ),
      })
      .complete();
    const version = stdout.trim();
    return /^\d+\.\d+\S*$/.test(version) ? version : undefined;
  }

  async installAltimateDatapilot(datapilotVersion: string) {
    // Pinning the installed dbt-core makes pip re-resolve its requirements too,
    // repairing deps an older datapilot downgraded (e.g. click) without moving dbt-core
    const dbtCoreVersion = await this.getInstalledDbtCoreVersion();
    const { stderr, stdout } = await this.commandProcessExecutionFactory
      .createCommandProcessExecution({
        command: this.pythonEnvironment.pythonPath,
        args: [
          "-m",
          "pip",
          "install",
          `${this.packageName}==${datapilotVersion}`,
          ...(dbtCoreVersion ? [`dbt-core==${dbtCoreVersion}`] : []),
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
