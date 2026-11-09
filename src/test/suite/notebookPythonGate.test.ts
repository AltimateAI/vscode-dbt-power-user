import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as vscode from "vscode";
import { commands, extensions, window, workspace } from "vscode";
import { VSCodeCommands } from "../../commands";

const SELECT_MESSAGE =
  "Altimate notebooks need a Python interpreter. Select one to continue.";
const INSTALL_MESSAGE =
  "Altimate notebooks need a Python interpreter. The Python extension, which selects one, is not installed.";

// Any member access returns a disposable-returning mock, so the constructor
// can wire every command without the real services.
const stub = (): unknown =>
  new Proxy(
    {},
    {
      get: (_t, p) =>
        p === "then" ? undefined : jest.fn(() => ({ dispose: jest.fn() })),
    },
  );

// The constructor registers many providers the shared vscode mock lacks; fill
// any missing member with a disposable-returning mock for these tests only.
const NAMESPACES = ["commands", "window", "workspace", "languages"] as const;
const originals: Record<string, unknown> = {};
const fillMissingApis = () => {
  const api = vscode as unknown as Record<string, object>;
  for (const ns of NAMESPACES) {
    originals[ns] = api[ns];
    api[ns] = new Proxy(api[ns], {
      get: (target, p) =>
        p in target
          ? (target as Record<string | symbol, unknown>)[p]
          : jest.fn(() => ({ dispose: jest.fn() })),
    });
  }
};
const restoreApis = () => {
  const api = vscode as unknown as Record<string, unknown>;
  for (const ns of NAMESPACES) {
    api[ns] = originals[ns];
  }
};

describe("creating a notebook needs Python, in every dbt mode", () => {
  let createNotebook: jest.Mock;
  let sendTelemetryEvent: jest.Mock;
  let getConfiguration: jest.SpiedFunction<typeof workspace.getConfiguration>;

  // Builds the real command wiring and returns the create command.
  const wire = (pythonPath: string) => {
    const vscodeCommands = new (VSCodeCommands as unknown as new (
      ...args: unknown[]
    ) => VSCodeCommands)(...Array.from({ length: 25 }, stub));
    (vscodeCommands as any).notebookController = { createNotebook };
    (vscodeCommands as any).telemetry = { sendTelemetryEvent };
    (vscodeCommands as any).pythonEnvironment = { pythonPath };
    const registration = (
      commands.registerCommand as jest.Mock
    ).mock.calls.find(
      ([name]) => name === "dbtPowerUser.createAltimateNotebook",
    );
    return registration?.[1] as (args?: unknown) => Promise<void>;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    createNotebook = jest.fn();
    sendTelemetryEvent = jest.fn();
    (extensions.getExtension as jest.Mock).mockReturnValue({
      id: "ms-python.python",
    });
    getConfiguration = jest.spyOn(workspace, "getConfiguration");
    fillMissingApis();
  });

  afterEach(() => {
    restoreApis();
    getConfiguration.mockRestore();
    (extensions.getExtension as jest.Mock).mockReset();
  });

  it("asks for an interpreter instead of creating a notebook without one", async () => {
    const createCommand = wire("");

    await createCommand({ template: "Profile your query" });

    expect(createNotebook).not.toHaveBeenCalled();
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      SELECT_MESSAGE,
      "Select Python interpreter",
      "Detect from terminal",
    );
    expect(sendTelemetryEvent).toHaveBeenCalledWith("Notebook/Launch", {
      blockedBy: "noPythonInterpreter",
    });
  });

  it("offers the Python extension when it is not installed", async () => {
    (extensions.getExtension as jest.Mock).mockReturnValue(undefined);
    const createCommand = wire("");

    await createCommand(undefined);

    expect(createNotebook).not.toHaveBeenCalled();
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      INSTALL_MESSAGE,
      "Install Python extension",
      "Open setting",
    );
  });

  it("creates the notebook with Python, dbt Fusion mode included", async () => {
    getConfiguration.mockReturnValue({
      get: (key: string, fallback?: unknown) =>
        key === "dbtIntegration" ? "fusion" : fallback,
    } as any);
    const createCommand = wire("/venv/bin/python");
    const args = { template: "Get test suggestions" };

    await createCommand(args);

    expect(createNotebook).toHaveBeenCalledWith(args);
    expect(window.showErrorMessage).not.toHaveBeenCalled();
    expect(sendTelemetryEvent).not.toHaveBeenCalled();
  });
});

// Opening a notebook from a file or a restored tab reaches the vendored
// library's `ClientMapper.initializeNotebookClient`, which builds the kernel
// client. These run the real library under the gate.
describe("PythonGatedClientMapper on the notebook library", () => {
  let PythonGatedClientMapper: any;
  let isolatedVscode: any;
  let createPythonBridge: jest.Mock<any>;
  let validateAndInstallNotebookDependencies: jest.Mock<any>;
  let sendTelemetryEvent: jest.Mock;
  const terminal = {
    debug: jest.fn(),
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };
  const notebookUri = { fsPath: "/project/analysis.notebook" };

  const mapperWith = (pythonPath: string) =>
    new PythonGatedClientMapper(
      { createPythonBridge },
      { validateAndInstallNotebookDependencies },
      terminal,
      { pythonPath },
      { sendTelemetryEvent },
    );

  // What the open promise has done once the kernel poll had time to run.
  const settle = async (promise: Promise<unknown>) => {
    const outcome = promise.then(
      () => "opened",
      (error: Error) => error.message,
    );
    await jest.advanceTimersByTimeAsync(5_000);
    return Promise.race([outcome, Promise.resolve("still waiting")]);
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.isolateModules(() => {
      isolatedVscode = require("vscode");
      isolatedVscode.NotebookCellKind = { Markup: 1, Code: 2 };
      jest.doMock("@lib", () => jest.requireActual("../../lib/index"));
      ({ PythonGatedClientMapper } = require("../../pythonGatedClientMapper"));
    });
    isolatedVscode.extensions.getExtension.mockReturnValue({
      id: "ms-python.python",
    });
    isolatedVscode.window.showErrorMessage.mockClear();
    createPythonBridge = jest.fn(() => ({
      ex: jest.fn(() => Promise.reject(new Error("no kernel in tests"))),
      lock: jest.fn(),
    }));
    validateAndInstallNotebookDependencies = jest.fn(() =>
      Promise.resolve(true),
    );
    sendTelemetryEvent = jest.fn();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("stops with the prompt, before any Python bridge, instead of waiting for a kernel", async () => {
    // Without an interpreter the library's dependency check fails (the
    // install is declined or cannot run), and its kernel never starts.
    validateAndInstallNotebookDependencies.mockResolvedValue(false);
    const mapper = mapperWith("");

    expect(await settle(mapper.initializeNotebookClient(notebookUri))).toBe(
      SELECT_MESSAGE,
    );
    expect(createPythonBridge).not.toHaveBeenCalled();
    expect(validateAndInstallNotebookDependencies).not.toHaveBeenCalled();
    expect(isolatedVscode.window.showErrorMessage).toHaveBeenCalledWith(
      SELECT_MESSAGE,
      "Select Python interpreter",
      "Detect from terminal",
    );
    expect(sendTelemetryEvent).toHaveBeenCalledWith("Notebook/Launch", {
      blockedBy: "noPythonInterpreter",
    });
  });

  it("starts the kernel client as before when Python is there", async () => {
    const mapper = mapperWith("/venv/bin/python");

    expect(await settle(mapper.initializeNotebookClient(notebookUri))).toBe(
      "opened",
    );
    expect(createPythonBridge).toHaveBeenCalledWith("/project");
    expect(validateAndInstallNotebookDependencies).toHaveBeenCalled();
    expect(sendTelemetryEvent).not.toHaveBeenCalled();
  });
});
