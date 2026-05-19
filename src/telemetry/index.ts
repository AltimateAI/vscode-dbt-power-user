import TelemetryReporter from "@vscode/extension-telemetry";
import * as vscode from "vscode";

export class TelemetryService implements vscode.Disposable {
  private customAttributes: { [key: string]: string } = {};
  private telemetryReporter: TelemetryReporter = new TelemetryReporter(
    "InstrumentationKey=50598369-dd83-4f9a-9a65-ca1fa6f1785c;IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com/;LiveEndpoint=https://westus.livediagnostics.monitor.azure.com/;ApplicationId=429da6f5-e7b0-40e6-a602-adaa8dcde8b9",
  );
  private eventMeasurements = new Map();

  constructor() {
    this.customAttributes["ide"] = vscode.env.appName;
  }

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
      return;
    }

    this.sendTelemetryEvent(`${eventName}Success`, properties, {
      ...(measurements || {}),
      duration: new Date().getTime() - start,
    });
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
        ...this.extractErrorFields(error),
        ...this.customAttributes,
      },
      measurements,
    );
  }

  // Surfaces error.name / error.message / error.code as their own properties
  // so they survive VS Code's TelemetryLogger PII redaction (which can mask
  // an entire stack to "<REDACTED: URL>") and can be filtered/grouped in
  // App Insights independently of the stack trace.
  private extractErrorFields(error: unknown): { [key: string]: string } {
    if (!(error instanceof Error)) {
      return {};
    }
    const fields: { [key: string]: string } = {
      error_name: error.name,
      error_message: error.message,
    };
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string" || typeof code === "number") {
      fields.error_code = String(code);
    }
    return fields;
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
