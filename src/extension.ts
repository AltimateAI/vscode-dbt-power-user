import "reflect-metadata";
import { ExtensionContext } from "vscode";
import { DBTPowerUserExtension } from "./dbtPowerUserExtension";
import { container } from "./inversify.config";

let extension: DBTPowerUserExtension | undefined;

export async function activate(context: ExtensionContext) {
  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);
  extension = dbtPowerUserExtension;

  context.subscriptions.push(dbtPowerUserExtension);

  await dbtPowerUserExtension.activate(context);
}

export function deactivate(): Promise<void> | undefined {
  return extension?.deactivate();
}
