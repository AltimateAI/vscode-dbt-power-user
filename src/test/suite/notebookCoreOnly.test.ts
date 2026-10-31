import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as vscode from "vscode";
import { commands, env, Uri, window, workspace } from "vscode";
import { VSCodeCommands } from "../../commands";

const NOTEBOOK_MESSAGE =
  "Altimate notebooks need dbt Core mode with Python dbt-core, so they are not available in dbt Fusion mode.";
const DOCS_URL =
  "https://docs.myaltimate.com/setup/reqdConfig/?utm_source=dbt-power-user&utm_medium=extension";

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

describe("notebook entry points in dbt Fusion mode", () => {
  let createNotebook: jest.Mock;
  let sendTelemetryEvent: jest.Mock;
  let openExternal: jest.Mock<any>;
  let getConfiguration: jest.SpiedFunction<typeof workspace.getConfiguration>;
  let onDidOpenNotebookDocument: jest.Mock;

  const setMode = (mode: string) =>
    getConfiguration.mockReturnValue({
      get: (key: string, fallback?: unknown) =>
        key === "dbtIntegration" ? mode : fallback,
    } as any);

  // Builds the real command wiring and returns the registered handlers.
  const wire = () => {
    const vscodeCommands = new (VSCodeCommands as unknown as new (
      ...args: unknown[]
    ) => VSCodeCommands)(...Array.from({ length: 25 }, stub));
    (vscodeCommands as any).notebookController = { createNotebook };
    (vscodeCommands as any).telemetry = { sendTelemetryEvent };
    const registration = (
      commands.registerCommand as jest.Mock
    ).mock.calls.find(
      ([name]) => name === "dbtPowerUser.createAltimateNotebook",
    );
    const createCommand = registration?.[1] as (args?: unknown) => unknown;
    const openListener = onDidOpenNotebookDocument.mock.calls[0]?.[0] as
      | ((notebook: unknown) => void)
      | undefined;
    return { createCommand, openListener };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    createNotebook = jest.fn();
    sendTelemetryEvent = jest.fn();
    openExternal = jest.fn(() => Promise.resolve(true));
    (env as any).openExternal = openExternal;
    onDidOpenNotebookDocument = jest.fn(() => ({ dispose: jest.fn() }));
    (workspace as any).onDidOpenNotebookDocument = onDidOpenNotebookDocument;
    (Uri.parse as jest.Mock).mockImplementation((value: unknown) => ({
      toString: () => value,
    }));
    getConfiguration = jest.spyOn(workspace, "getConfiguration");
    fillMissingApis();
  });

  afterEach(() => {
    restoreApis();
    getConfiguration.mockRestore();
    delete (env as any).openExternal;
    delete (workspace as any).onDidOpenNotebookDocument;
  });

  it("shows the core-only message instead of launching a notebook", async () => {
    setMode("fusion");
    const { createCommand } = wire();

    await createCommand({ template: "Profile your query" });

    expect(createNotebook).not.toHaveBeenCalled();
    expect(window.showWarningMessage).toHaveBeenCalledWith(
      NOTEBOOK_MESSAGE,
      "Learn more",
    );
    expect(window.showErrorMessage).not.toHaveBeenCalled();
  });

  it("stamps the blocked attempt on the notebook launch event", async () => {
    setMode("fusion");
    const { createCommand } = wire();

    await createCommand(undefined);

    expect(sendTelemetryEvent).toHaveBeenCalledTimes(1);
    expect(sendTelemetryEvent).toHaveBeenCalledWith("Notebook/Launch", {
      blockedByMode: "fusion",
    });
  });

  it("opens the dbt Core setup docs from Learn more", async () => {
    setMode("fusion");
    (window.showWarningMessage as jest.Mock<any>).mockResolvedValueOnce(
      "Learn more",
    );
    const { createCommand } = wire();

    await createCommand(undefined);

    expect(Uri.parse).toHaveBeenCalledWith(DOCS_URL);
    expect(openExternal).toHaveBeenCalledTimes(1);
    expect(String(openExternal.mock.calls[0][0])).toBe(DOCS_URL);
  });

  it("still shows the message when telemetry throws", async () => {
    setMode("fusion");
    sendTelemetryEvent.mockImplementation(() => {
      throw new Error("telemetry down");
    });
    const { createCommand } = wire();

    await expect(
      Promise.resolve(createCommand(undefined)),
    ).resolves.toBeUndefined();

    expect(window.showWarningMessage).toHaveBeenCalledWith(
      NOTEBOOK_MESSAGE,
      "Learn more",
    );
    expect(createNotebook).not.toHaveBeenCalled();
  });

  it.each(["core", "corecommand", "cloud"])(
    "launches the notebook unchanged in %s mode",
    async (mode) => {
      setMode(mode);
      const { createCommand } = wire();
      const args = { template: "Get test suggestions" };

      await createCommand(args);

      expect(createNotebook).toHaveBeenCalledWith(args);
      expect(window.showWarningMessage).not.toHaveBeenCalled();
      expect(sendTelemetryEvent).not.toHaveBeenCalled();
    },
  );

  it("tells the user when a notebook is opened another way", () => {
    setMode("fusion");
    const { openListener } = wire();

    expect(openListener).toBeDefined();
    openListener!({ notebookType: "datapilot-notebook" });

    expect(window.showWarningMessage).toHaveBeenCalledWith(
      NOTEBOOK_MESSAGE,
      "Learn more",
    );
    expect(sendTelemetryEvent).toHaveBeenCalledWith("Notebook/Launch", {
      blockedByMode: "fusion",
    });
  });

  it("ignores other notebooks, and any notebook outside Fusion mode", () => {
    setMode("fusion");
    const { openListener } = wire();
    expect(openListener).toBeDefined();
    openListener!({ notebookType: "jupyter-notebook" });

    setMode("core");
    openListener!({ notebookType: "datapilot-notebook" });

    expect(window.showWarningMessage).not.toHaveBeenCalled();
    expect(sendTelemetryEvent).not.toHaveBeenCalled();
  });
});
