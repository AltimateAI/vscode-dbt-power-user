import { commands, extensions, window } from "vscode";
import {
  PythonEnvironment,
  PythonInterpreterPromptAnswer,
} from "./dbt_client/pythonEnvironment";
import { TelemetryService } from "./telemetry";

// Some features run Python code of their own (a Jupyter kernel, the datapilot
// package) in every dbt integration mode, dbt Fusion included. Without an
// interpreter they say so up front instead of failing partway through.

const PYTHON_EXTENSION_ID = "ms-python.python";

export type MissingPython = "noPythonExtension" | "noPythonInterpreter";

/**
 * What stops a Python feature from running, or undefined when an interpreter
 * is there. An interpreter set in `dbt.dbtPythonPathOverride` counts without
 * the Python extension.
 */
export const findMissingPython = (
  pythonEnvironment: PythonEnvironment,
): MissingPython | undefined => {
  let pythonPath: string | undefined;
  try {
    pythonPath = pythonEnvironment.pythonPath;
  } catch {
    // No execution details yet, or no interpreter selected.
  }
  if (pythonPath) {
    return undefined;
  }
  return extensions.getExtension(PYTHON_EXTENSION_ID) === undefined
    ? "noPythonExtension"
    : "noPythonInterpreter";
};

/** `<subject> a Python interpreter.` names the feature, e.g. "The project healthcheck needs". */
export const missingPythonMessage = (
  subject: string,
  missing: MissingPython,
): string =>
  missing === "noPythonExtension"
    ? `${subject} a Python interpreter. The Python extension, which selects one, is not installed.`
    : `${subject} a Python interpreter. Select one to continue.`;

/** Shows the missing-Python message with the actions that fix it. */
export const promptForPython = async (
  subject: string,
  missing: MissingPython,
): Promise<void> => {
  const message = missingPythonMessage(subject, missing);
  if (missing === "noPythonExtension") {
    const answer = await window.showErrorMessage(
      message,
      PythonInterpreterPromptAnswer.INSTALL,
      PythonInterpreterPromptAnswer.OPEN_SETTING,
    );
    if (answer === PythonInterpreterPromptAnswer.INSTALL) {
      try {
        await commands.executeCommand(
          "workbench.extensions.installExtension",
          PYTHON_EXTENSION_ID,
        );
      } catch (error) {
        window.showErrorMessage(
          `The Python extension could not be installed: ${(error as Error).message}`,
        );
        return;
      }
      const reload = await window.showInformationMessage(
        "The Python extension is installed. Reload the window to select an interpreter.",
        PythonInterpreterPromptAnswer.RELOAD,
      );
      if (reload === PythonInterpreterPromptAnswer.RELOAD) {
        commands.executeCommand("workbench.action.reloadWindow");
      }
    } else if (answer === PythonInterpreterPromptAnswer.OPEN_SETTING) {
      commands.executeCommand(
        "workbench.action.openSettings",
        "dbt.dbtPythonPathOverride",
      );
    }
    return;
  }
  const answer = await window.showErrorMessage(
    message,
    PythonInterpreterPromptAnswer.SELECT,
    PythonInterpreterPromptAnswer.DETECT,
  );
  if (answer === PythonInterpreterPromptAnswer.SELECT) {
    commands.executeCommand("python.setInterpreter");
  } else if (answer === PythonInterpreterPromptAnswer.DETECT) {
    commands.executeCommand("dbtPowerUser.detectPythonFromTerminal");
  }
};

// Records a blocked attempt on the feature's own event, so attempts are
// countable by cause. Telemetry must never stop the message from showing.
export const stampBlocked = (
  telemetry: TelemetryService,
  eventName: string,
  blockedBy: MissingPython | "fusionManifest",
): void => {
  try {
    telemetry.sendTelemetryEvent(eventName, { blockedBy });
  } catch {
    // fail-safe: the user still gets the message
  }
};
