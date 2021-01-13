import * as vscode from "vscode";
import { ModelDefinitionProvider } from "./modelDefinitionProvider";
import { MacroDefinitionProvider } from "./macroDefinitionProvider";
import { SourceDefinitionProvider } from "./sourceDefinitionProvider";
import { DBT_MODE } from "../extension";
import { provideSingleton } from "../utils";

@provideSingleton(DefinitionProviderFactory)
export class DefinitionProviderFactory {
  constructor(
    private modelDefinitionProvider: ModelDefinitionProvider,
    private macroDefinitionProvider: MacroDefinitionProvider,
    private sourceDefinitionProvider: SourceDefinitionProvider
  ) {}
  createDefinitionProviders(): { dispose(): any }[] {
    return [
      vscode.languages.registerDefinitionProvider(
        DBT_MODE,
        this.modelDefinitionProvider
      ),
      vscode.languages.registerDefinitionProvider(
        DBT_MODE,
        this.macroDefinitionProvider
      ),
      vscode.languages.registerDefinitionProvider(
        DBT_MODE,
        this.sourceDefinitionProvider
      ),
    ];
  }
}
