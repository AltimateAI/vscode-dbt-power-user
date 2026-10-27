import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import {
  commands,
  ConfigurationTarget,
  ViewColumn,
  window,
  workspace,
} from "vscode";
import { OnboardingPanel } from "../../webview_provider/onboardingPanel";

type AnyMock = jest.Mock<any>;

const PROJECT_ROOT = "/repo/jaffle_shop";

const model = (name: string, path: string, packageName = "jaffle_shop") => ({
  name,
  path,
  package_name: packageName,
  resource_type: "model",
});

/**
 * Builds the panel without its constructor, with fakes for the collaborators
 * the Get Started handlers use, and records what it sends to the webview.
 */
const harness = (nodes: unknown[] = []) => {
  const postMessage: AnyMock = jest.fn();
  const dispose: AnyMock = jest.fn();
  const globalState = new Map<string, unknown>();
  const openAltimateCode: AnyMock = jest.fn(async () => undefined);
  const editor = { document: { uri: "doc" } };

  (window as any).showTextDocument = jest.fn(async () => editor);
  (window as any).tabGroups = { all: [{}, {}] };
  (ViewColumn as any).One = 1;

  const panel = Object.create(OnboardingPanel.prototype) as OnboardingPanel;
  Object.assign(panel, {
    _panel: { webview: { postMessage }, dispose },
    dbtProjectContainer: {
      getFromGlobalState: (key: string) => globalState.get(key),
      setToGlobalState: (key: string, value: unknown) =>
        globalState.set(key, value),
    },
    queryManifestService: {
      getEventByDocument: () => ({
        project: { getProjectName: () => "jaffle_shop" },
        nodeMetaMap: { nodes: () => nodes },
      }),
    },
    altimateConnectService: { openAltimateCode },
    dbtTerminal: { debug: jest.fn(), error: jest.fn() },
  });

  const handle = (command: string, extra: Record<string, unknown> = {}) =>
    panel.handleCommand({ command, syncRequestId: "req", ...extra } as never);
  const lastBody = () => {
    const calls = postMessage.mock.calls;
    return (calls[calls.length - 1][0] as { args: { body: unknown } }).args
      .body;
  };

  return {
    handle,
    lastBody,
    globalState,
    dispose,
    openAltimateCode,
    editor,
  };
};

describe("OnboardingPanel Get Started", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("offers the project's customers model first", async () => {
    const h = harness([
      model("orders", `${PROJECT_ROOT}/models/orders.sql`),
      model("customers", `${PROJECT_ROOT}/models/customers.sql`),
    ]);

    await h.handle("getFirstModel", { projectRoot: PROJECT_ROOT });

    expect(h.lastBody()).toEqual({ fileName: "customers.sql" });
  });

  it("otherwise offers the project's first SQL model by path", async () => {
    const h = harness([
      model("stg_orders", `${PROJECT_ROOT}/models/stg_orders.sql`),
      model("dim_users", `${PROJECT_ROOT}/models/dim_users.sql`),
      model("forecast", `${PROJECT_ROOT}/models/a_forecast.py`),
      model("customers", "/pkgs/other/customers.sql", "other_package"),
    ]);

    await h.handle("getFirstModel", { projectRoot: PROJECT_ROOT });

    expect(h.lastBody()).toEqual({ fileName: "dim_users.sql" });
  });

  it("opens the model with Altimate Code beside it and finishes", async () => {
    const h = harness([
      model("customers", `${PROJECT_ROOT}/models/customers.sql`),
    ]);

    await h.handle("openFirstModel", {
      projectRoot: PROJECT_ROOT,
      action: "chat",
    });

    expect(window.showTextDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        fsPath: `${PROJECT_ROOT}/models/customers.sql`,
      }),
      { viewColumn: 1 },
    );
    expect(h.openAltimateCode).toHaveBeenCalledWith(PROJECT_ROOT, {
      beside: true,
    });
    expect(commands.executeCommand).not.toHaveBeenCalledWith(
      "workbench.action.moveEditorToRightGroup",
    );
    expect(h.globalState.get("onboarding.state")).toEqual({
      finished: true,
      resume: false,
    });
    expect(h.globalState.get("showSetupWalkthrough")).toBe(false);
    expect(h.dispose).toHaveBeenCalled();
  });

  it("splits the chat out when it opened in the model's group", async () => {
    const h = harness([
      model("customers", `${PROJECT_ROOT}/models/customers.sql`),
    ]);
    (window as any).tabGroups = { all: [{}] };

    await h.handle("openFirstModel", {
      projectRoot: PROJECT_ROOT,
      action: "chat",
    });

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.action.moveEditorToRightGroup",
    );
    expect(window.showTextDocument).toHaveBeenLastCalledWith(
      h.editor.document,
      { viewColumn: 1, preserveFocus: true },
    );
  });

  it("runs lineage on the model instead of opening chat", async () => {
    const h = harness([
      model("customers", `${PROJECT_ROOT}/models/customers.sql`),
    ]);

    await h.handle("openFirstModel", {
      projectRoot: PROJECT_ROOT,
      action: "lineage",
    });

    expect(commands.executeCommand).toHaveBeenCalledWith(
      "dbtPowerUser.sqlLineage",
    );
    expect(h.openAltimateCode).not.toHaveBeenCalled();
  });

  it("stays open when the project has no model to open", async () => {
    const h = harness([]);

    await h.handle("openFirstModel", {
      projectRoot: PROJECT_ROOT,
      action: "chat",
    });

    expect(h.dispose).not.toHaveBeenCalled();
    expect(h.globalState.get("onboarding.state")).toBeUndefined();
  });

  it("merges saved progress into what is already kept", async () => {
    const h = harness();
    h.globalState.set("onboarding.state", { resume: true });

    await h.handle("saveOnboardingState", {
      state: { screen: "workspace", projectRoot: PROJECT_ROOT },
    });
    await h.handle("getOnboardingState");

    expect(h.lastBody()).toEqual({
      resume: true,
      screen: "workspace",
      projectRoot: PROJECT_ROOT,
    });
  });

  it("reopens after the reload a new integration type causes", async () => {
    const h = harness();
    const update: AnyMock = jest.fn(async () => undefined);
    (workspace.getConfiguration as AnyMock).mockReturnValue({
      get: jest.fn(() => "core"),
      update,
    });
    h.globalState.set("onboarding.state", {
      screen: "connect",
      validation: { models: 5, seeds: 3, tests: 20 },
    });

    await h.handle("setDbtIntegration", { integrationType: "fusion" });

    expect(h.globalState.get("onboarding.state")).toEqual({
      screen: "connect",
      validation: null,
      resume: true,
    });
    expect(update).toHaveBeenCalledWith(
      "dbtIntegration",
      "fusion",
      ConfigurationTarget.Workspace,
    );
  });
});
