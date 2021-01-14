import "reflect-metadata";
import * as vscode from "vscode";
import { DBTStatusBar } from "./statusbar/dbtStatusBar";
import { RunResultStatusBar } from "./statusbar/runResultStatusBar";
import { DBTPowerUserExtension } from "./DBTPowerUserExtension";
import { DbtProjectContainer } from "./manifest/dbtProjectContainer";
import { container } from "./inversify.config";

export const DBT_MODE = { language: "jinja-sql", scheme: "file" };

export async function activate(context: vscode.ExtensionContext) {
  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);
  const dbtProjectContainer = container.get(DbtProjectContainer);
  const runResultStatusBar = container.get(RunResultStatusBar);
  const dbtStatusBar = container.get(DBTStatusBar);

  context.subscriptions.push(
    ...dbtPowerUserExtension.createDefinitionProviders(),
    ...dbtPowerUserExtension.createAutoCompletionProviders(),
    ...dbtPowerUserExtension.createModelTreeViews(),
    ...dbtPowerUserExtension.createCommands(),
    runResultStatusBar,
    dbtStatusBar,
    dbtProjectContainer
  );

  await dbtProjectContainer.detectDBT();
  await dbtProjectContainer.initializeDBTProjects();
}

export function deactivate() {}
