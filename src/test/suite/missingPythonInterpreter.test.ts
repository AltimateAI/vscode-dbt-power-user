import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { commands, window, workspace } from "vscode";
import { DBTClient } from "../../dbt_client";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";

/**
 * A selected interpreter that no longer exists (a deleted or moved virtual
 * environment) is named to the user once, with a way to pick another. The
 * project's own initialization and the dbt installation check both hit it, on
 * every dbt project in the workspace, so the prompt is shared and shown once
 * per interpreter.
 */
const MISSING = "/home/user/project/.venv/bin/python";

function setOverride(value: string) {
  (workspace.getConfiguration as jest.Mock).mockReturnValue({
    get: jest.fn((key: string, fallback?: unknown) =>
      key === "dbtPythonPathOverride" ? value : fallback,
    ),
    has: jest.fn(),
    update: jest.fn(),
  });
}

function makeEnvironment(): PythonEnvironment {
  const env = new PythonEnvironment({
    debug: jest.fn(),
    warn: jest.fn(),
  } as any);
  (env as any).executionDetails = {
    getPythonPath: () => MISSING,
    getEnvVars: () => ({ vars: {}, sources: {} }),
    onDidChangeExecutionDetails: jest.fn(),
  };
  return env;
}

describe("PythonEnvironment.showInterpreterNotFound", () => {
  beforeEach(() => setOverride(""));
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("names the interpreter and opens the Python extension's picker on Select", async () => {
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Select Python interpreter"),
    );

    await makeEnvironment().showInterpreterNotFound(MISSING);

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      `The selected Python interpreter ${MISSING} was not found. It may have been moved or deleted. Select another interpreter to use dbt.`,
      "Select Python interpreter",
      "Detect from terminal",
    );
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "python.setInterpreter",
    );
  });

  it("offers to detect the interpreter from the terminal", async () => {
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Detect from terminal"),
    );

    await makeEnvironment().showInterpreterNotFound(MISSING);

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "dbtPowerUser.detectPythonFromTerminal",
    );
  });

  it("prompts once per interpreter, however many projects fail on it", async () => {
    const env = makeEnvironment();

    await Promise.all([
      env.showInterpreterNotFound(MISSING),
      env.showInterpreterNotFound(MISSING),
    ]);
    await env.showInterpreterNotFound("/elsewhere/bin/python");

    expect(window.showErrorMessage).toHaveBeenCalledTimes(2);
  });

  it("points at the setting when dbtPythonPathOverride names the interpreter", async () => {
    setOverride("dbt-env");
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Open setting"),
    );

    await makeEnvironment().showInterpreterNotFound("dbt-env");

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "The Python interpreter dbt-env set in dbt.dbtPythonPathOverride was not found. Change the setting to an interpreter that exists.",
      "Open setting",
    );
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.action.openSettings",
      "dbt.dbtPythonPathOverride",
    );
    expect(commands.executeCommand).not.toHaveBeenCalledWith(
      "python.setInterpreter",
    );
  });
});

describe("DBTClient when the Python interpreter is missing", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function makeClient(pythonPath: string | undefined) {
    const pythonEnvironment = {
      pythonPath,
      isPython3: true,
      showInterpreterNotFound: jest.fn(() => Promise.resolve()),
    };
    const client = new DBTClient(pythonEnvironment as any, jest.fn() as any);
    (client as any)._pythonInstalled = false;
    (client as any)._dbtInstalled = false;
    return { client, pythonEnvironment };
  }

  it("names a selected interpreter path that no longer exists", async () => {
    const { client, pythonEnvironment } = makeClient(MISSING);

    await expect(client.showErrorIfDbtOrPythonNotInstalled()).resolves.toBe(
      false,
    );

    expect(pythonEnvironment.showInterpreterNotFound).toHaveBeenCalledWith(
      MISSING,
    );
    expect(window.showErrorMessage).not.toHaveBeenCalled();
  });

  it.each([["python"], [undefined]])(
    "keeps the general message for %p, which may be on the PATH or unset",
    async (pythonPath) => {
      const { client, pythonEnvironment } = makeClient(pythonPath);

      await client.showErrorIfDbtOrPythonNotInstalled();

      expect(pythonEnvironment.showInterpreterNotFound).not.toHaveBeenCalled();
      expect(window.showErrorMessage).toHaveBeenCalledWith(
        "No Python interpreter is selected or Python is not installed",
        "Select Python interpreter",
        "Detect from terminal",
      );
    },
  );
});
