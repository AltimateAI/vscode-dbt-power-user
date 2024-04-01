import { getFirstWorkspacePath, provideSingleton } from "../utils";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { DBTTerminal } from "./dbtTerminal";

@provideSingleton(AltimateDatapilot)
export class AltimateDatapilot {
  private packageName = "altimate-datapilot";
  constructor(
    private pythonEnvironment: PythonEnvironment,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private dbtTerminal: DBTTerminal,
  ) {}

  async checkIfAltimateDatapilotInstalled() {
    const process =
      this.commandProcessExecutionFactory.createCommandProcessExecution({
        command: this.pythonEnvironment.pythonPath,
        args: ["-c", "import datapilot"],
        cwd: getFirstWorkspacePath(),
        envVars: this.pythonEnvironment.environmentVariables,
      });
    const { stderr } = await process.complete();
    if (stderr) {
      this.dbtTerminal.debug(
        "AltimateDatapilot:checkIfAltimateDatapilotInstalled",
        "Datapilot not installed",
        stderr,
      );
      return false;
    }
    return true;
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
        cwd: getFirstWorkspacePath(),
        envVars: this.pythonEnvironment.environmentVariables,
      })
      .completeWithTerminalOutput(this.dbtTerminal);
    if (!stdout.includes("Successfully installed") && stderr) {
      throw new Error(stderr);
    }
  }
}
