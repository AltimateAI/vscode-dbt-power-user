import TelemetryReporter from "@vscode/extension-telemetry";
import * as vscode from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(TelemetryService)
export class TelemetryService implements vscode.Disposable {
  private customAttributes: { [key: string]: string } = {};
  private telemetryReporter: TelemetryReporter = new TelemetryReporter(
    "50598369-dd83-4f9a-9a65-ca1fa6f1785c",
  );
  private eventMeasurements = new Map();

  setTelemetryCustomAttribute(key: string, value: string) {
    this.customAttributes[key] = value;
  }

  startTelemetryEvent(
    eventName: string,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    this.eventMeasurements.set(eventName, new Date().getTime());
    this.sendTelemetryEvent(eventName, properties, measurements);
  }

  // TODO: check if we have to identify python exception
  endTelemetryEvent(
    eventName: string,
    error?: unknown,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    const start = this.eventMeasurements.get(eventName);
    if (error) {
      this.sendTelemetryError(`${eventName}Error`, error, properties, {
        ...(measurements || {}),
        duration: new Date().getTime() - start,
      });
    }
  }

  private getFeatureName(eventName: string) {
    const [featureName, rest] = eventName.split("/");
    if (rest) {
      return { feature: featureName };
    }
    return {};
  }

  sendTelemetryEvent(
    eventName: string, // TODO: should be TelemetryEvents
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    this.telemetryReporter.sendTelemetryEvent(
      eventName,
      {
        ...this.getFeatureName(eventName),
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
    eventName: string, // TODO: should be TelemetryEvents
    error?: unknown,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    this.telemetryReporter.sendTelemetryErrorEvent(
      eventName,
      {
        ...this.getFeatureName(eventName),
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
        stack: this.removeGenericSecretsFromStackTrace(
          error !== undefined && error instanceof Error
            ? error.stack
            : JSON.stringify(error),
        ),
        ...this.customAttributes,
      },
      measurements,
    );
  }

  private removeGenericSecretsFromStackTrace(
    error: string | undefined,
  ): string {
    if (!error) {
      return "";
    }
    return error.replace(
      /(key|token|sig|secret|signature|password|passwd|pwd|android:value)/i,
      "****",
    );
  }

  dispose(): void {
    this.telemetryReporter?.dispose();
  }
}
