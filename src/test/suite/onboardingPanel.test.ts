import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { commands, env, Uri, ViewColumn, window, workspace } from "vscode";
import { OnboardingPanel } from "../../webview_provider/onboardingPanel";

type AnyMock = jest.Mock<any>;

describe("OnboardingPanel", () => {
  let panel: OnboardingPanel;
  let postMessage: AnyMock;
  let dispose: AnyMock;
  let getProjects: AnyMock;
  let getFromGlobalState: AnyMock;
  let setToGlobalState: AnyMock;
  let terminalShow: AnyMock;
  let findFiles: AnyMock;
  let showTextDocument: AnyMock;

  const project = (root: string, modelPaths?: string[]) => ({
    projectRoot: { fsPath: root },
    getModelPaths: () => modelPaths,
    getProjectName: () => "jaffle_shop",
  });

  const lastResponse = () => {
    const calls = postMessage.mock.calls;
    return calls[calls.length - 1][0] as {
      command: string;
      args: {
        syncRequestId: string;
        body: unknown;
        status: boolean;
        error?: string;
      };
    };
  };

  const handle = (command: string, extra: Record<string, unknown> = {}) =>
    panel.handleCommand({ command, syncRequestId: "req-1", ...extra } as any);

  beforeEach(() => {
    jest.clearAllMocks();
    postMessage = jest.fn();
    dispose = jest.fn();
    getProjects = jest.fn(() => []);
    getFromGlobalState = jest.fn(() => undefined);
    setToGlobalState = jest.fn();
    terminalShow = jest.fn(() => Promise.resolve());
    findFiles = jest.fn(() => Promise.resolve([]));
    showTextDocument = jest.fn(() => Promise.resolve());

    (workspace as any).findFiles = findFiles;
    (workspace as any).openTextDocument = jest.fn((uri: unknown) =>
      Promise.resolve({ uri }),
    );
    (window as any).showTextDocument = showTextDocument;
    (window as any).tabGroups = { all: [{}] };
    (env as any).openExternal = jest.fn(() => Promise.resolve(true));
    (ViewColumn as any).One = 1;
    (workspace.getConfiguration as AnyMock).mockReturnValue({
      get: jest.fn(() => ""),
      update: jest.fn(() => Promise.resolve()),
    });

    panel = Object.create(OnboardingPanel.prototype);
    (panel as any)._panel = { webview: { postMessage }, dispose };
    (panel as any).dbtProjectContainer = {
      getProjects,
      getFromGlobalState,
      setToGlobalState,
    };
    (panel as any).dbtTerminal = {
      debug: jest.fn(),
      error: jest.fn(),
      show: terminalShow,
    };
  });

  describe("getFirstModel", () => {
    it("prefers customers.sql when the project has one", async () => {
      getProjects.mockReturnValue([project("/p", ["/p/models"])]);
      findFiles.mockResolvedValue([
        { fsPath: "/p/models/orders.sql" },
        { fsPath: "/p/models/customers.sql" },
      ]);

      await handle("getFirstModel", { projectRoot: "/p" });

      expect(lastResponse().args.body).toEqual({
        name: "customers",
        fileName: "customers.sql",
      });
    });

    it("falls back to the first model alphabetically", async () => {
      getProjects.mockReturnValue([project("/p", ["/p/models"])]);
      findFiles.mockResolvedValue([
        { fsPath: "/p/models/stg_orders.sql" },
        { fsPath: "/p/models/dim_customers.sql" },
      ]);

      await handle("getFirstModel", { projectRoot: "/p" });

      expect(lastResponse().args.body).toEqual({
        name: "dim_customers",
        fileName: "dim_customers.sql",
      });
    });

    it("uses the chosen project when the workspace has several", async () => {
      getProjects.mockReturnValue([
        project("/a", ["/a/models"]),
        project("/b", ["/b/models"]),
      ]);
      findFiles.mockResolvedValue([{ fsPath: "/b/models/fct_pipeline.sql" }]);

      await handle("getFirstModel", { projectRoot: "/b" });

      expect(findFiles).toHaveBeenCalledTimes(1);
      expect(lastResponse().args.body).toEqual({
        name: "fct_pipeline",
        fileName: "fct_pipeline.sql",
      });
    });

    it("returns null when no project is open", async () => {
      await handle("getFirstModel", { projectRoot: "" });

      expect(lastResponse().args.body).toBeNull();
      expect(findFiles).not.toHaveBeenCalled();
    });
  });

  describe("openFirstModel", () => {
    beforeEach(() => {
      getProjects.mockReturnValue([project("/p", ["/p/models"])]);
      findFiles.mockResolvedValue([{ fsPath: "/p/models/customers.sql" }]);
    });

    it("opens the model with the chat beside it and forces a split when there is one editor group", async () => {
      (window as any).tabGroups = { all: [{}] };

      await handle("openFirstModel", { projectRoot: "/p", action: "explain" });

      expect(showTextDocument).toHaveBeenCalledWith(
        expect.objectContaining({ uri: { fsPath: "/p/models/customers.sql" } }),
        { viewColumn: ViewColumn.One },
      );
      expect(commands.executeCommand).toHaveBeenCalledWith(
        "altimate.openChat",
        expect.objectContaining({ beside: true }),
      );
      expect(commands.executeCommand).toHaveBeenCalledWith(
        "workbench.action.moveEditorToRightGroup",
      );
      expect(lastResponse().args.body).toEqual({ opened: true });
    });

    it("does not move the chat when a second editor group already exists", async () => {
      (window as any).tabGroups = { all: [{}, {}] };

      await handle("openFirstModel", { projectRoot: "/p", action: "explain" });

      expect(commands.executeCommand).not.toHaveBeenCalledWith(
        "workbench.action.moveEditorToRightGroup",
      );
    });

    it("runs lineage or preview for the other actions", async () => {
      await handle("openFirstModel", { projectRoot: "/p", action: "lineage" });
      expect(commands.executeCommand).toHaveBeenCalledWith(
        "dbtPowerUser.sqlLineage",
      );

      await handle("openFirstModel", { projectRoot: "/p", action: "preview" });
      expect(commands.executeCommand).toHaveBeenCalledWith(
        "dbtPowerUser.executeSQL",
      );
    });

    it("marks onboarding finished and closes the page after an activation action", async () => {
      getFromGlobalState.mockReturnValue({ step: 4, validated: true });

      await handle("openFirstModel", { projectRoot: "/p", action: "explain" });

      expect(setToGlobalState).toHaveBeenCalledWith("onboarding.state", {
        step: 4,
        validated: true,
        finished: true,
      });
      expect(setToGlobalState).toHaveBeenCalledWith(
        "showSetupWalkthrough",
        false,
      );
      expect(dispose).toHaveBeenCalled();
    });

    it("reports opened: false and keeps the page when no model is found", async () => {
      findFiles.mockResolvedValue([]);

      await handle("openFirstModel", { projectRoot: "/p", action: "explain" });

      expect(lastResponse().args.body).toEqual({ opened: false });
      expect(dispose).not.toHaveBeenCalled();
    });
  });

  describe("finishOnboarding", () => {
    it("persists finished state, suppresses the first-run toast and closes the page", async () => {
      getFromGlobalState.mockReturnValue({ step: 3 });

      await handle("finishOnboarding");

      expect(lastResponse().args.body).toEqual({ success: true });
      expect(setToGlobalState).toHaveBeenCalledWith("onboarding.state", {
        step: 3,
        finished: true,
      });
      expect(setToGlobalState).toHaveBeenCalledWith(
        "showSetupWalkthrough",
        false,
      );
      expect(dispose).toHaveBeenCalled();
    });
  });

  describe("showOutput", () => {
    it("reveals the dbt output channel", async () => {
      await handle("showOutput");

      expect(terminalShow).toHaveBeenCalledWith(true);
      expect(lastResponse().args.body).toEqual({ success: true });
    });
  });

  describe("account", () => {
    it("reports not connected when either setting is missing", async () => {
      (workspace.getConfiguration as AnyMock).mockReturnValue({
        get: jest.fn((key: string) =>
          key === "altimateAiKey" ? "abcd1234efgh5678" : "",
        ),
      });

      await handle("getAccountStatus");

      expect(lastResponse().args.body).toEqual({
        connected: false,
        instanceName: undefined,
        maskedKey: undefined,
      });
    });

    it("masks the key when connected", async () => {
      (workspace.getConfiguration as AnyMock).mockReturnValue({
        get: jest.fn((key: string) =>
          key === "altimateAiKey" ? "abcd1234efgh5678" : "acme",
        ),
      });

      await handle("getAccountStatus");

      expect(lastResponse().args.body).toEqual({
        connected: true,
        instanceName: "acme",
        maskedKey: "abcd••••5678",
      });
    });

    it("opens sign-up in connect mode with a stored state nonce", async () => {
      (workspace as any).onDidChangeConfiguration = jest.fn(() => ({
        dispose: jest.fn(),
      }));
      (Uri.parse as AnyMock).mockImplementation((s: string) => ({
        toString: () => s,
      }));

      await handle("startAccountSetup");
      (panel as any).stopAccountPolling();

      const opened = (env as any).openExternal.mock.calls[0][0].toString();
      const url = new URL(opened);
      expect(url.origin + url.pathname).toBe(
        "https://app.myaltimate.com/register",
      );
      expect(url.searchParams.get("source")).toBe("extension");
      expect(url.searchParams.get("client")).toBe("vscode-dbt-power-user");
      expect(url.searchParams.get("redirect")).toBe(
        "vscode://innoverio.vscode-dbt-power-user/auth-callback",
      );
      const state = url.searchParams.get("state");
      expect(state).toMatch(/^[0-9a-f]{32}$/);
      expect(setToGlobalState).toHaveBeenCalledWith(
        "onboarding.connectState",
        state,
      );
      expect(lastResponse().args.body).toEqual({ started: true });
    });
  });
});
