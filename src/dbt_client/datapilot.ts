import { getFirstWorkspacePath, provideSingleton } from "../utils";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { DBTTerminal } from "./dbtTerminal";

@provideSingleton(AltimateDatapilot)
export class AltimateDatapilot {
  private packageName = "altimate-datapilot-cli";
  constructor(
    private pythonEnvironment: PythonEnvironment,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private dbtTerminal: DBTTerminal,
  ) {}

  async checkIfAltimateDatapilotInstalled(): Promise<string> {
    const process =
      this.commandProcessExecutionFactory.createCommandProcessExecution({
        command: this.pythonEnvironment.pythonPath,
        args: ["-c", "import datapilot;print(datapilot.__version__)"],
        cwd: getFirstWorkspacePath(),
        envVars: this.pythonEnvironment.environmentVariables,
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
        cwd: getFirstWorkspacePath(),
        envVars: this.pythonEnvironment.environmentVariables,
      })
      .completeWithTerminalOutput(this.dbtTerminal);
    if (!stdout.includes("Successfully installed") && stderr) {
      throw new Error(stderr);
    }
  }
}
