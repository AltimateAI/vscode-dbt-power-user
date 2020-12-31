import * as vscode from "vscode";
import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";
import { TreeviewProviderFactory } from "./treeview_provider/treeviewProviderFactory";
import { StatusBarFactory } from "./statusbar/statusBarFactory";
import { CommandFactory } from "./commands/commandFactory";
import { DefinitionProviderFactory } from "./definition_provider/definitionProviderFactory";
import { dbtProjectContainer } from "./manifest/dbtProjectContainer";

export const DBT_MODE = { language: "jinja-sql", scheme: "file" };

export async function activate(context: vscode.ExtensionContext) {
  await dbtProjectContainer.detectDBT();

  context.subscriptions.push(
    ...DefinitionProviderFactory.createDefinitionProviders(),
    ...AutocompletionProviderFactory.createAutoCompletionProviders(),
    ...TreeviewProviderFactory.createModelTreeViews(),
    ...CommandFactory.createCommands(),
    StatusBarFactory.createRunResultStatusBar(),
    dbtProjectContainer
  );

  await dbtProjectContainer.initializeDBTProjects();
}

export function deactivate() {}
