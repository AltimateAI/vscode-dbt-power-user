import * as vscode from "vscode";
import { DefinitionProviderFactory } from "./definition_provider/definitionProviderFactory";
import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";
import { TreeviewProviderFactory } from "./treeview_provider/treeviewProviderFactory";
import navigateToFile from "./commands/navigateToFile";
import { runModelOnNodeTreeItem, runModelOnActiveWindow, RunModelType } from "./commands/runModel";
import { StatusBarFactory } from "./statusbar/statusBarFactory";
import navigateToFileWithErrorMessage from "./commands/navigateToFileWithErrorMessage";
import { manifestContainer } from "./manifest/manifestContainer";

export const DBT_MODE = { language: "jinja-sql", scheme: "file" };

export async function activate(context: vscode.ExtensionContext) {
  await manifestContainer.createManifests();

  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      DBT_MODE,
      DefinitionProviderFactory.createModelDefinitionProvider()
    ),
    vscode.languages.registerDefinitionProvider(
      DBT_MODE,
      DefinitionProviderFactory.createMacroDefinitionProvider()
    ),
    vscode.languages.registerDefinitionProvider(
      DBT_MODE,
      DefinitionProviderFactory.createSourceDefinitionProvider()
    ),
    vscode.languages.registerCompletionItemProvider(
      DBT_MODE,
      AutocompletionProviderFactory.createMacroAutocompletionProvider()
    ),
    vscode.languages.registerCompletionItemProvider(
      DBT_MODE,
      AutocompletionProviderFactory.createModelAutocompletionProvider(),
      '"', "'"
    ),
    vscode.languages.registerCompletionItemProvider(
      DBT_MODE,
      AutocompletionProviderFactory.createSourceAutocompletionProvider(),
      '"', "'"
    ),
    vscode.window.registerTreeDataProvider('parent_model_treeview',
      TreeviewProviderFactory.createModelTreeview("parents")),
    vscode.window.registerTreeDataProvider('children_model_treeview',
      TreeviewProviderFactory.createModelTreeview("children")),
    vscode.commands.registerCommand('run.dbt.currentModel', runModelOnActiveWindow),
    vscode.commands.registerCommand('run.dbt.childrenModels', runModelOnNodeTreeItem(RunModelType.CHILDREN)),
    vscode.commands.registerCommand('run.dbt.parentModels', runModelOnNodeTreeItem(RunModelType.PARENTS)),
    vscode.commands.registerCommand('navigateToFile', navigateToFile),
    vscode.commands.registerCommand('navigateToFileWithErrorMessage', navigateToFileWithErrorMessage),
    StatusBarFactory.createRunResultStatusBar(),
  );

  manifestContainer.tryRefreshAll();
}

export function deactivate() {
  manifestContainer.removeEventHandlers();
}
