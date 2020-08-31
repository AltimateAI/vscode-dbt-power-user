import * as vscode from "vscode";
import { DBTManifestInstance } from "./dbtManifest";
import { DefinitionProviderFactory } from "./definition_provider/definitionProviderFactory";
import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";
import { TreeviewProviderFactory } from "./treeview_provider/treeviewProviderFactory";
import navigateToSelectedNode from "./commands/navigateToSelectedNode";
import { runModelOnNodeTreeItem, runModelOnActiveWindow, RunModelType } from "./commands/runModel";

export const DBT_MODE = { language: "jinja-sql", scheme: "file" };

export function activate(context: vscode.ExtensionContext) {

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
    vscode.commands.registerCommand('treeview.selectNode', navigateToSelectedNode),
  );

  DBTManifestInstance.tryRefresh();
}

export function deactivate() {
  DBTManifestInstance.removeEventHandlers();
}
