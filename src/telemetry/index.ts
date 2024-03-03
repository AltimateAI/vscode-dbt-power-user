import TelemetryReporter from "@vscode/extension-telemetry";
import * as vscode from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(TelemetryService)
export class TelemetryService implements vscode.Disposable {
  private telemetryReporter: TelemetryReporter = new TelemetryReporter(
    "50598369-dd83-4f9a-9a65-ca1fa6f1785c",
  );

  sendTelemetryEvent(
    eventName: string,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    this.telemetryReporter.sendTelemetryEvent(
      eventName,
      {
        ...properties,
        instanceName: vscode.workspace
          .getConfiguration("dbt")
          .get<string>("altimateInstanceName"),
        dbtIntegrationMode: vscode.workspace
          .getConfiguration("dbt")
          .get<string>("dbtIntegration", "core"),
      },
      measurements,
    );
  }

  sendTelemetryError(
    eventName: string,
    error?: unknown,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    this.telemetryReporter.sendTelemetryErrorEvent(
      eventName,
      {
        ...properties,
        instanceName: vscode.workspace
          .getConfiguration("dbt")
          .get<string>("altimateInstanceName"),
        dbtIntegrationMode: vscode.workspace
          .getConfiguration("dbt")
          .get<string>("dbtIntegration", "core"),
        stack:
          error !== undefined && error instanceof Error
            ? error.stack
            : JSON.stringify(error),
      },
      measurements,
    );
  }

  dispose(): void {
    this.telemetryReporter?.dispose();
  }
}
