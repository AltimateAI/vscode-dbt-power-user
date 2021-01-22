import "reflect-metadata";
import { ExtensionContext } from "vscode";
import { DBTPowerUserExtension } from "./dbtPowerUserExtension";
import { container } from "./inversify.config";

export async function activate(context: ExtensionContext) {
  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);
  
  context.subscriptions.push(
    dbtPowerUserExtension,
  );

  await dbtPowerUserExtension.activate();
}

export function deactivate() {}
