import TelemetryReporter from "@vscode/extension-telemetry";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { ExtensionContext } from "vscode";

const telemetryEnabled: string = vscode.workspace
  .getConfiguration("dbt")
  .get<string>("telemetryEnabled", "True");
class TelemetryService {
  private static instance: TelemetryService;
  private telemetryReporter?: TelemetryReporter;

  private constructor() {}

  static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService();
      TelemetryService.instance.initialize(
        "50598369-dd83-4f9a-9a65-ca1fa6f1785c",
      );
    }
    return TelemetryService.instance;
  }

  initialize(key: string): void {
    this.telemetryReporter = new TelemetryReporter(key);
  }

  sendTelemetryEvent(
    eventName: string,
    properties?: { [key: string]: string },
  ): void {
    if (this.telemetryReporter && telemetryEnabled !== "False") {
      this.telemetryReporter.sendTelemetryEvent(eventName, properties);
    }
  }

  withTelemetry(telemetryEventName: string) {
    const telemetryService = this; // Capture the TelemetryService instance
    return function (
      target: any,
      propertyName: string,
      descriptor: PropertyDescriptor,
    ) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        if (telemetryService) {
          telemetryService.sendTelemetryEvent(telemetryEventName);
        }
        return result;
      };

      return descriptor;
    };
  }

  dispose(): void {
    this.telemetryReporter?.dispose();
  }
}

export default TelemetryService;
