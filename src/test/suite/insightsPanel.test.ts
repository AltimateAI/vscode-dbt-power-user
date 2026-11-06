import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { window, workspace } from "vscode";
import { InsightsPanel } from "../../webview_provider/insightsPanel";

describe("InsightsPanel project governance telemetry", () => {
  let panel: InsightsPanel;
  let sendTelemetryEvent: jest.Mock;
  let terminalError: jest.Mock;
  let checkIfAltimateDatapilotInstalled: jest.Mock<any>;
  let executeAltimateDatapilotHealthcheck: jest.Mock<any>;
  let logDBTHealthcheckStartScan: jest.Mock<any>;

  const scan = () =>
    (panel as any).altimateScan("sync-1", {
      projectRoot: "/project",
      configType: "All",
    });

  beforeEach(() => {
    jest.clearAllMocks();
    sendTelemetryEvent = jest.fn();
    terminalError = jest.fn();
    checkIfAltimateDatapilotInstalled = jest.fn(() =>
      Promise.resolve({
        isInstalled: true,
        installedVersion: "0.3.8",
        requiredVersion: "0.3.8",
      }),
    );
    executeAltimateDatapilotHealthcheck = jest.fn(() => Promise.resolve({}));
    logDBTHealthcheckStartScan = jest.fn(() => Promise.resolve());

    // Bypass constructor DI; stub only what the governance flow uses
    panel = Object.create(InsightsPanel.prototype);
    (panel as any)._panel = {
      visible: true,
      webview: { postMessage: jest.fn() },
    };
    (panel as any).validationProvider = { throwIfNotAuthenticated: jest.fn() };
    (panel as any).altimateRequest = { logDBTHealthcheckStartScan };
    (panel as any).dbtProjectContainer = {
      checkIfAltimateDatapilotInstalled,
      executeAltimateDatapilotHealthcheck,
    };
    (panel as any).telemetry = { sendTelemetryEvent };
    (panel as any).dbtTerminal = {
      error: terminalError,
      debug: jest.fn(),
    };
  });

  it("should report a failure to start the scan", async () => {
    const error = new Error("No active subscription found");
    logDBTHealthcheckStartScan.mockRejectedValueOnce(error);

    await scan();

    expect(terminalError).toHaveBeenCalledWith(
      "atimateDatapilotStartScan",
      "Error while starting project governance scan",
      error,
    );
    expect(checkIfAltimateDatapilotInstalled).not.toHaveBeenCalled();
  });

  it("should report the install prompt with installed and required versions", async () => {
    checkIfAltimateDatapilotInstalled.mockResolvedValueOnce({
      isInstalled: false,
      installedVersion: "0.3.7",
      requiredVersion: "0.3.8",
    });
    (window.showInformationMessage as jest.Mock<any>).mockResolvedValueOnce(
      undefined,
    );

    await scan();

    expect(sendTelemetryEvent).toHaveBeenCalledWith(
      "atimateDatapilotInstallPrompt",
      {
        installedVersion: "0.3.7",
        requiredVersion: "0.3.8",
        accepted: "false",
      },
    );
    expect(executeAltimateDatapilotHealthcheck).not.toHaveBeenCalled();
  });

  it("should report a successful healthcheck", async () => {
    await scan();

    expect(sendTelemetryEvent).toHaveBeenCalledWith(
      "performDatapilotHealthcheckSuccess",
    );
    expect(terminalError).not.toHaveBeenCalled();
  });

  it("should report a failed healthcheck and not report success", async () => {
    const error = new Error("ModuleNotFoundError: sqlglot");
    executeAltimateDatapilotHealthcheck.mockRejectedValueOnce(error);

    await scan();

    expect(terminalError).toHaveBeenCalledWith(
      "atimateDatapilotGovernance",
      "Error while performing project governance checks",
      error,
    );
    expect(sendTelemetryEvent).not.toHaveBeenCalledWith(
      "performDatapilotHealthcheckSuccess",
    );
  });
});

describe("InsightsPanel healthcheck in dbt Fusion mode", () => {
  let panel: InsightsPanel;
  let sendTelemetryEvent: jest.Mock;
  let postMessage: jest.Mock;
  let throwIfNotAuthenticated: jest.Mock;
  let checkIfAltimateDatapilotInstalled: jest.Mock<any>;
  let executeAltimateDatapilotHealthcheck: jest.Mock<any>;
  let logDBTHealthcheckStartScan: jest.Mock<any>;
  let getConfiguration: jest.SpiedFunction<typeof workspace.getConfiguration>;

  const setMode = (mode: string) =>
    getConfiguration.mockReturnValue({
      get: (key: string, fallback?: unknown) =>
        key === "dbtIntegration" ? mode : fallback,
    } as any);

  const scan = () =>
    (panel as any).altimateScan("sync-7", {
      projectRoot: "/project",
      configType: "All",
    });

  beforeEach(() => {
    jest.clearAllMocks();
    getConfiguration = jest.spyOn(workspace, "getConfiguration");
    sendTelemetryEvent = jest.fn();
    postMessage = jest.fn();
    throwIfNotAuthenticated = jest.fn();
    checkIfAltimateDatapilotInstalled = jest.fn(() =>
      Promise.resolve({
        isInstalled: true,
        installedVersion: "0.3.8",
        requiredVersion: "0.3.8",
      }),
    );
    executeAltimateDatapilotHealthcheck = jest.fn(() => Promise.resolve({}));
    logDBTHealthcheckStartScan = jest.fn(() => Promise.resolve());

    panel = Object.create(InsightsPanel.prototype);
    (panel as any)._panel = { visible: true, webview: { postMessage } };
    (panel as any).validationProvider = { throwIfNotAuthenticated };
    (panel as any).altimateRequest = { logDBTHealthcheckStartScan };
    (panel as any).dbtProjectContainer = {
      checkIfAltimateDatapilotInstalled,
      executeAltimateDatapilotHealthcheck,
    };
    (panel as any).telemetry = { sendTelemetryEvent };
    (panel as any).dbtTerminal = { error: jest.fn(), debug: jest.fn() };
  });

  afterEach(() => {
    getConfiguration.mockRestore();
  });

  it("answers the panel with the core-only notice and never starts the Python healthcheck", async () => {
    setMode("fusion");

    await scan();

    expect(postMessage).toHaveBeenCalledWith({
      command: "response",
      args: {
        syncRequestId: "sync-7",
        body: {
          coreOnly: {
            message:
              "The project healthcheck needs dbt Core mode with Python dbt-core, so it is not available in dbt Fusion mode.",
            learnMoreUrl:
              "https://docs.myaltimate.com/setup/reqdConfig/?utm_source=dbt-power-user&utm_medium=extension",
          },
        },
        status: true,
      },
    });
    expect(throwIfNotAuthenticated).not.toHaveBeenCalled();
    expect(logDBTHealthcheckStartScan).not.toHaveBeenCalled();
    expect(checkIfAltimateDatapilotInstalled).not.toHaveBeenCalled();
    expect(executeAltimateDatapilotHealthcheck).not.toHaveBeenCalled();
    expect(window.showErrorMessage).not.toHaveBeenCalled();
  });

  it("stamps the blocked attempt on the healthcheck event", async () => {
    setMode("fusion");

    await scan();

    expect(sendTelemetryEvent).toHaveBeenCalledTimes(1);
    expect(sendTelemetryEvent).toHaveBeenCalledWith(
      "performDatapilotHealthcheck",
      { blockedByMode: "fusion" },
    );
  });

  it("still shows the notice when telemetry throws", async () => {
    setMode("fusion");
    sendTelemetryEvent.mockImplementation(() => {
      throw new Error("telemetry down");
    });

    await expect(scan()).resolves.toBeUndefined();

    expect(postMessage).toHaveBeenCalledTimes(1);
    expect(
      (postMessage.mock.calls[0][0] as any).args.body.coreOnly.message,
    ).toContain("needs dbt Core mode");
    expect(executeAltimateDatapilotHealthcheck).not.toHaveBeenCalled();
  });

  it.each(["core", "corecommand", "cloud"])(
    "runs the Python healthcheck unchanged in %s mode",
    async (mode) => {
      setMode(mode);

      await scan();

      expect(throwIfNotAuthenticated).toHaveBeenCalled();
      expect(executeAltimateDatapilotHealthcheck).toHaveBeenCalledWith({
        projectRoot: "/project",
        configType: "All",
      });
      expect(sendTelemetryEvent).toHaveBeenCalledWith(
        "performDatapilotHealthcheck",
        {
          args: JSON.stringify({ projectRoot: "/project", configType: "All" }),
        },
      );
      for (const call of sendTelemetryEvent.mock.calls) {
        expect(JSON.stringify(call)).not.toContain("blockedByMode");
      }
      const calls = postMessage.mock.calls;
      const body = (calls[calls.length - 1]?.[0] as any)?.args?.body;
      expect(body).toEqual({ projectHealthcheck: {} });
    },
  );
});
