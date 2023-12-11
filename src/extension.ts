import "reflect-metadata";
import { ExtensionContext } from "vscode";
import { DBTPowerUserExtension } from "./dbtPowerUserExtension";
import { container } from "./inversify.config";
import { DBTWorkspaceFolder } from "./manifest/dbtWorkspaceFolder";
import { DBTProjectContainer } from "./manifest/dbtProjectContainer";

export async function activate(context: ExtensionContext) {
  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);
  context.subscriptions.push(dbtPowerUserExtension);

  await dbtPowerUserExtension.activate(context);

  const dbtProjectContainer = container.get(DBTProjectContainer);

  console.log("dbtWorkspaceFolder", dbtProjectContainer);
  return container;
}

export function deactivate() {}
