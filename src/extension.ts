import * as vscode from "vscode";
import { DBTManifestInstance } from "./dbtManifest";
import { DefinitionProviderFactory } from "./definition_provider/definitionProviderFactory";
import { AutocompletionProviderFactory } from "./autocompletion_provider/autocompletionProviderFactory";
import runCurrentModel from "./commands/runCurrentModel";

export const DBT_MODE = { language: "jinja-sql", scheme: "file" };

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(
    vscode.commands.registerCommand('run.dbt.currentModel', runCurrentModel),
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
      "("
    ),
    vscode.languages.registerCompletionItemProvider(
      DBT_MODE,
      AutocompletionProviderFactory.createSourceAutocompletionProvider(),
      "(", "'"
    )
  );

  DBTManifestInstance.tryRefresh();
}

export function deactivate() {
  DBTManifestInstance.removeEventHandlers();
}
