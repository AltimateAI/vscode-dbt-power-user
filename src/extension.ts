import "reflect-metadata";
import { ExtensionContext } from "vscode";
import { DBTPowerUserExtension } from "./dbtPowerUserExtension";
import { container } from "./inversify.config";
import {
  initializeTelemetry,
  disposeTelemetry,
  sendTelemetryEvent,
} from "./telemetry";

// Initialize telemetry

export async function activate(context: ExtensionContext) {
  initializeTelemetry("50598369-dd83-4f9a-9a65-ca1fa6f1785c");
  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);

  context.subscriptions.push(dbtPowerUserExtension);

  await dbtPowerUserExtension.activate(context);

  sendTelemetryEvent("extensionActivated");
}

export function deactivate() {
  disposeTelemetry();
}
