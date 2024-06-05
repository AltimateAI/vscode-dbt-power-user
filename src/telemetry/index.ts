import TelemetryReporter from "@vscode/extension-telemetry";
import * as vscode from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(TelemetryService)
export class TelemetryService implements vscode.Disposable {
  private customAttributes: { [key: string]: string } = {};
  private telemetryReporter: TelemetryReporter = new TelemetryReporter(
    "50598369-dd83-4f9a-9a65-ca1fa6f1785c",
  );

  setTelemetryCustomAttribute(key: string, value: string) {
    this.customAttributes[key] = value;
  }

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
        localMode: vscode.workspace
          .getConfiguration("dbt")
          .get<boolean>("isLocalMode", false)
          ? "true"
          : "false",
        ...this.customAttributes,
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
        localMode: vscode.workspace
          .getConfiguration("dbt")
          .get<boolean>("isLocalMode", false)
          ? "true"
          : "false",
        stack:
          error !== undefined && error instanceof Error
            ? error.stack
            : JSON.stringify(error),
        ...this.customAttributes,
      },
      measurements,
    );
  }

  dispose(): void {
    this.telemetryReporter?.dispose();
  }
}
