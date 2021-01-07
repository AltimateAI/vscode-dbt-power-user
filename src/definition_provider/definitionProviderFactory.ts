import * as vscode from "vscode";
import { ModelDefinitionProvider } from "./modelDefinitionProvider";
import { MacroDefinitionProvider } from "./macroDefinitionProvider";
import { SourceDefinitionProvider } from "./sourceDefinitionProvider";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";
import { DBT_MODE } from "../extension";

export class DefinitionProviderFactory {
  static createDefinitionProviders(): { dispose(): any; }[] {
    return [
      vscode.languages.registerDefinitionProvider(
        DBT_MODE,
        new ModelDefinitionProvider()
      ),
      vscode.languages.registerDefinitionProvider(
        DBT_MODE,
        new MacroDefinitionProvider()
      ),
      vscode.languages.registerDefinitionProvider(
        DBT_MODE,
        new SourceDefinitionProvider()
      ),
    ];
  }
}
