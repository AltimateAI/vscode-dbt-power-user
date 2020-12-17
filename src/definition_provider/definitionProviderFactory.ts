import * as vscode from "vscode";
import { ModelDefinitionProvider } from "./modelDefinitionProvider";
import { MacroDefinitionProvider } from "./macroDefinitionProvider";
import { SourceDefinitionProvider } from "./sourceDefinitionProvider";
import { manifestContainer } from "../manifest/dbtProjectContainer";
import { DBT_MODE } from "../extension";

export class DefinitionProviderFactory {
  static createDefinitionProviders(): { dispose(): any }[] {
    return [
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
    ];
  }

  static createModelDefinitionProvider() {
    const modelDefinitionProvider = new ModelDefinitionProvider();
    manifestContainer.addProvider(modelDefinitionProvider);
    return modelDefinitionProvider;
  }

  static createMacroDefinitionProvider() {
    const macroDefinitionProvider = new MacroDefinitionProvider();
    manifestContainer.addProvider(macroDefinitionProvider);
    return macroDefinitionProvider;
  }

  static createSourceDefinitionProvider() {
    const sourceDefinitionProvider = new SourceDefinitionProvider();
    manifestContainer.addProvider(sourceDefinitionProvider);
    return sourceDefinitionProvider;
  }

}