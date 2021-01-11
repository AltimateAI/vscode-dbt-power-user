import * as vscode from "vscode";
import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";
import { TreeviewProviderFactory } from "./treeview_provider/treeviewProviderFactory";
import { VSCodeCommandFactory } from "./commands/vscodeCommandFactory";
import { DefinitionProviderFactory } from "./definition_provider/definitionProviderFactory";
import { dbtProjectContainer } from "./manifest/dbtProjectContainer";
import { DBTStatusBar } from "./statusbar/dbtStatusBar";
import { RunResultStatusBar } from "./statusbar/runResultStatusBar";

export const DBT_MODE = { language: "jinja-sql", scheme: "file" };

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    ...DefinitionProviderFactory.createDefinitionProviders(),
    ...AutocompletionProviderFactory.createAutoCompletionProviders(),
    ...TreeviewProviderFactory.createModelTreeViews(),
    ...VSCodeCommandFactory.createCommands(),
    new RunResultStatusBar(),
    new DBTStatusBar(),
    dbtProjectContainer
  );

  await dbtProjectContainer.detectDBT();
  await dbtProjectContainer.initializeDBTProjects();
}

export function deactivate() {}
