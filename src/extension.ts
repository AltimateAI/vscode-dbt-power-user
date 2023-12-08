import "reflect-metadata";
import { ExtensionContext, commands } from "vscode";
import { DBTPowerUserExtension } from "./dbtPowerUserExtension";
import { container } from "./inversify.config";

const vscode = require("vscode");

export async function activate(context: ExtensionContext) {
  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);

  const disposable = vscode.commands.registerCommand(
    "extension.testUriHandler",
    function () {
      const testUri =
        "vscode:customevent/innoverio.vscode-dbt-power-user?key=sk-abcd&instance=mycompany"; // Replace with your actual URI
      vscode.env.openExternal(vscode.Uri.parse(testUri));
    },
  );

  context.subscriptions.push(dbtPowerUserExtension);

  await dbtPowerUserExtension.activate(context);
}

export function deactivate() {}
