import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { window } from "vscode";
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
