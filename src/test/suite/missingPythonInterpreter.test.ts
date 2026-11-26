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

function makeEnvironment(pythonExtensionAvailable = true): PythonEnvironment {
  const env = new PythonEnvironment({
    debug: jest.fn(),
    warn: jest.fn(),
  } as any);
  (env as any)._pythonExtensionAvailable = pythonExtensionAvailable;
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

describe("PythonEnvironment.showInterpreterNotFound without the Python extension", () => {
  beforeEach(() => setOverride(""));
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Both callers end here: DBTClient's installation check and
  // DBTProject.initialize's PythonInterpreterNotFound handler.
  it("offers the Python extension, never its interpreter picker", async () => {
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Install Python extension"),
    );
    (window.showInformationMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve(undefined),
    );
    await makeEnvironment(false).showInterpreterNotFound(MISSING);
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining(
        "Python extension, which selects interpreters, is not installed",
      ),
      "Install Python extension",
      "Open setting",
    );
    expect(window.showErrorMessage).not.toHaveBeenCalledWith(
      expect.anything(),
      "Select Python interpreter",
      expect.anything(),
    );
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.extensions.installExtension",
      "ms-python.python",
    );
    expect(commands.executeCommand).not.toHaveBeenCalledWith(
      "python.setInterpreter",
    );
  });

  it("opens the override setting on Open setting", async () => {
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Open setting"),
    );
    await makeEnvironment(false).showInterpreterNotFound(MISSING);
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.action.openSettings",
      "dbt.dbtPythonPathOverride",
    );
    expect(commands.executeCommand).not.toHaveBeenCalledWith(
      "python.setInterpreter",
    );
  });
});

/**
 * In a window held in dbt Core mode with a dbt Fusion binary found, the
 * interpreter's own guidance stays, and dbt Fusion is offered next to it: it
 * runs without Python.
 */
describe("PythonEnvironment.showInterpreterNotFound with dbt Fusion offered", () => {
  const offer = () => ({
    fusion: "dbt Fusion 2.0.12 (/home/user/.local/bin/dbt)",
    answered: jest.fn(() => Promise.resolve()),
  });
  const orFusion =
    ", or use dbt Fusion 2.0.12 (/home/user/.local/bin/dbt), which is on your path and runs without Python.";

  beforeEach(() => setOverride(""));
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("adds it to a selected interpreter that was moved or deleted", async () => {
    const fusion = offer();
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Use dbt Fusion"),
    );

    await makeEnvironment().showInterpreterNotFound(MISSING, fusion);

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      `The selected Python interpreter ${MISSING} was not found. It may have been moved or deleted. Select another interpreter to use dbt${orFusion}`,
      "Select Python interpreter",
      "Detect from terminal",
      "Use dbt Fusion",
    );
    expect(fusion.answered).toHaveBeenCalledWith("useFusion");
    expect(commands.executeCommand).not.toHaveBeenCalled();
  });

  it("adds it to an override that names a missing interpreter", async () => {
    setOverride("/gone/venv/bin/python");
    const fusion = offer();
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Open setting"),
    );

    await makeEnvironment().showInterpreterNotFound(
      "/gone/venv/bin/python",
      fusion,
    );

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      `The Python interpreter /gone/venv/bin/python set in dbt.dbtPythonPathOverride was not found. Change the setting to an interpreter that exists${orFusion}`,
      "Open setting",
      "Use dbt Fusion",
    );
    expect(fusion.answered).toHaveBeenCalledWith("fixPython");
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.action.openSettings",
      "dbt.dbtPythonPathOverride",
    );
  });

  it("adds it without the Python extension, next to installing it", async () => {
    const fusion = offer();

    await makeEnvironment(false).showInterpreterNotFound(MISSING, fusion);

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      `The Python interpreter ${MISSING} was not found, and the Python extension, which selects interpreters, is not installed. Install it, or set dbt.dbtPythonPathOverride to an interpreter that exists${orFusion}`,
      "Install Python extension",
      "Open setting",
      "Use dbt Fusion",
    );
    expect(fusion.answered).toHaveBeenCalledWith("dismissed");
  });
});

/**
 * Where dbt Fusion would fail on the window as well, the hold's reason
 * follows the interpreter's guidance, without Use dbt Fusion.
 */
describe("PythonEnvironment.showInterpreterNotFound with a hold's reason", () => {
  const PROFILE =
    "Power User didn't switch shop to dbt Fusion 2.0.12 (/home/user/.local/bin/dbt): no profiles.yml found (looked in /home/user/.dbt and /work/shop). dbt Fusion and dbt Core both need it: add the profile, then reload the window.";

  beforeEach(() => setOverride(""));
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("adds it to a selected interpreter that was moved or deleted", async () => {
    const held = {
      reason: PROFILE,
      answered: jest.fn(() => Promise.resolve()),
    };

    await makeEnvironment().showInterpreterNotFound(MISSING, held);

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      `The selected Python interpreter ${MISSING} was not found. It may have been moved or deleted. Select another interpreter to use dbt. ${PROFILE}`,
      "Select Python interpreter",
      "Detect from terminal",
    );
    expect(held.answered).toHaveBeenCalledWith("dismissed");
  });

  it("adds it to an override that names a missing interpreter", async () => {
    setOverride("/gone/venv/bin/python");
    const held = {
      reason: PROFILE,
      answered: jest.fn(() => Promise.resolve()),
    };

    await makeEnvironment().showInterpreterNotFound(
      "/gone/venv/bin/python",
      held,
    );

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      `The Python interpreter /gone/venv/bin/python set in dbt.dbtPythonPathOverride was not found. Change the setting to an interpreter that exists. ${PROFILE}`,
      "Open setting",
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
      // The Python extension is installed; only the interpreter is missing.
      pythonExtensionAvailable: true,
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

    // No window held for dbt Fusion: nothing else to offer.
    expect(pythonEnvironment.showInterpreterNotFound).toHaveBeenCalledWith(
      MISSING,
      undefined,
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
