import "reflect-metadata";
import { ExtensionContext } from "vscode";
import { DBTPowerUserExtension } from "./dbtPowerUserExtension";
import { container } from "./inversify.config";
import TelemetryService from "./telemetry";

// Initialize telemetry

export async function activate(context: ExtensionContext) {
  const telemetryService = TelemetryService.getInstance();

  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);

  context.subscriptions.push(dbtPowerUserExtension);

  await dbtPowerUserExtension.activate(context);

  telemetryService.sendTelemetryEvent("extensionActivated");
}

export function deactivate() {
  const telemetryService = TelemetryService.getInstance();
  telemetryService.dispose();
}
