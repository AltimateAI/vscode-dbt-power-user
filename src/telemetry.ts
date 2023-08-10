import TelemetryReporter from "@vscode/extension-telemetry";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { ExtensionContext } from "vscode";

export let telemetryReporter: TelemetryReporter | undefined;

export function initializeTelemetry(key: string): TelemetryReporter {
  telemetryReporter = new TelemetryReporter(key);
  return telemetryReporter;
}

export function withTelemetry(telemetryEventName: string) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      if (telemetryReporter) {
        telemetryReporter.sendTelemetryEvent(telemetryEventName);
      }
      return result;
    };

    return descriptor;
  };
}

export function sendTelemetryEvent(
  eventName: string,
  properties?: { [key: string]: string },
): void {
  if (
    telemetryReporter &&
    vscode.workspace
      .getConfiguration()
      .get<boolean>("telemetry.enableTelemetry") !== false
  ) {
    telemetryReporter.sendTelemetryEvent(eventName, properties);
  }
}

export function getExtensionDetails(context: ExtensionContext) {
  const extensionId = `${context.extension.id}`; // Extension ID
  const packageJSONPath = path.join(context.extensionPath, "package.json");
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, "utf8"));
  const extensionVersion = packageJSON.version; // Extension Version

  return { extensionId, extensionVersion };
}

export function disposeTelemetry(): void {
  if (telemetryReporter) {
    telemetryReporter.dispose();
  }
}
