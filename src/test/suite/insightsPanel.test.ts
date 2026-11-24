import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { extensions, window } from "vscode";
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
      getPythonEnvironment: () => ({ pythonPath: "/usr/bin/python3" }),
      getProjects: () => [],
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

describe("InsightsPanel healthcheck gates", () => {
  let panel: InsightsPanel;
  let sendTelemetryEvent: jest.Mock;
  let postMessage: jest.Mock;
  let throwIfNotAuthenticated: jest.Mock;
  let checkIfAltimateDatapilotInstalled: jest.Mock<any>;
  let executeAltimateDatapilotHealthcheck: jest.Mock<any>;
  let logDBTHealthcheckStartScan: jest.Mock<any>;
  let pythonEnvironment: { pythonPath: string };
  let isFusionIntegration: jest.Mock<any>;

  const scan = () =>
    (panel as any).altimateScan("sync-7", {
      projectRoot: "/project",
      configType: "All",
    });

  const lastBody = () => {
    const calls = postMessage.mock.calls;
    return (calls[calls.length - 1]?.[0] as any)?.args?.body;
  };

  const expectHealthcheckNotStarted = () => {
    expect(throwIfNotAuthenticated).not.toHaveBeenCalled();
    expect(logDBTHealthcheckStartScan).not.toHaveBeenCalled();
    expect(checkIfAltimateDatapilotInstalled).not.toHaveBeenCalled();
    expect(executeAltimateDatapilotHealthcheck).not.toHaveBeenCalled();
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (extensions.getExtension as jest.Mock).mockReturnValue({
      id: "ms-python.python",
    });
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
    pythonEnvironment = { pythonPath: "/usr/bin/python3" };
    isFusionIntegration = jest.fn(() => false);

    panel = Object.create(InsightsPanel.prototype);
    (panel as any)._panel = { visible: true, webview: { postMessage } };
    (panel as any).validationProvider = { throwIfNotAuthenticated };
    (panel as any).altimateRequest = { logDBTHealthcheckStartScan };
    (panel as any).dbtProjectContainer = {
      checkIfAltimateDatapilotInstalled,
      executeAltimateDatapilotHealthcheck,
      getPythonEnvironment: () => pythonEnvironment,
      getProjects: () => [
        { projectRoot: { fsPath: "/project" }, isFusionIntegration },
      ],
    };
    (panel as any).telemetry = { sendTelemetryEvent };
    (panel as any).dbtTerminal = { error: jest.fn(), debug: jest.fn() };
  });

  afterEach(() => {
    (extensions.getExtension as jest.Mock).mockReset();
  });

  it("asks for an interpreter and does not start the healthcheck without one", async () => {
    pythonEnvironment.pythonPath = "";

    await scan();

    expect(lastBody()).toEqual({
      notice: {
        message:
          "The project healthcheck needs a Python interpreter. Select one to continue.",
      },
    });
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "The project healthcheck needs a Python interpreter. Select one to continue.",
      "Select Python interpreter",
      "Detect from terminal",
    );
    expect(sendTelemetryEvent).toHaveBeenCalledWith(
      "performDatapilotHealthcheck",
      { blockedBy: "noPythonInterpreter" },
    );
    expectHealthcheckNotStarted();
  });

  it("offers the Python extension when it is not installed", async () => {
    pythonEnvironment.pythonPath = "";
    (extensions.getExtension as jest.Mock).mockReturnValue(undefined);

    await scan();

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "The project healthcheck needs a Python interpreter. The Python extension, which selects one, is not installed.",
      "Install Python extension",
      "Open setting",
    );
    expect(sendTelemetryEvent).toHaveBeenCalledWith(
      "performDatapilotHealthcheck",
      { blockedBy: "noPythonExtension" },
    );
    expectHealthcheckNotStarted();
  });

  it("says datapilot cannot read dbt Fusion manifests and stops, with Python present", async () => {
    isFusionIntegration.mockReturnValue(true);

    await scan();

    expect(lastBody()).toEqual({
      notice: {
        message:
          "The project healthcheck isn't available in dbt Fusion mode yet: altimate-datapilot-cli can't read the manifests dbt Fusion writes in the versions we've tested.",
      },
    });
    expect(sendTelemetryEvent).toHaveBeenCalledWith(
      "performDatapilotHealthcheck",
      { blockedBy: "fusionManifest" },
    );
    expect(window.showErrorMessage).not.toHaveBeenCalled();
    expectHealthcheckNotStarted();
  });

  it("tells a dbt Fusion user first, without asking for Python", async () => {
    isFusionIntegration.mockReturnValue(true);
    pythonEnvironment.pythonPath = "";

    await scan();

    expect(lastBody().notice.message).toContain(
      "isn't available in dbt Fusion mode yet",
    );
    expect(window.showErrorMessage).not.toHaveBeenCalled();
    expect(sendTelemetryEvent).toHaveBeenCalledTimes(1);
    expect(sendTelemetryEvent).toHaveBeenCalledWith(
      "performDatapilotHealthcheck",
      { blockedBy: "fusionManifest" },
    );
    expectHealthcheckNotStarted();
  });

  it("still answers the panel when telemetry throws", async () => {
    isFusionIntegration.mockReturnValue(true);
    sendTelemetryEvent.mockImplementation(() => {
      throw new Error("telemetry down");
    });

    await expect(scan()).resolves.toBeUndefined();

    expect(postMessage).toHaveBeenCalledTimes(1);
    expect(lastBody().notice.message).toContain("dbt Fusion mode");
  });

  it("runs the healthcheck with an interpreter outside dbt Fusion", async () => {
    await scan();

    expect(throwIfNotAuthenticated).toHaveBeenCalled();
    expect(executeAltimateDatapilotHealthcheck).toHaveBeenCalledWith({
      projectRoot: "/project",
      configType: "All",
    });
    for (const call of sendTelemetryEvent.mock.calls) {
      expect(JSON.stringify(call)).not.toContain("blockedBy");
    }
    expect(lastBody()).toEqual({ projectHealthcheck: {} });
  });
});
