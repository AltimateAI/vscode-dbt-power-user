import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { MacroDefinitionProvider } from "./macroDefinitionProvider";
import { ModelDefinitionProvider } from "./modelDefinitionProvider";
import { SourceDefinitionProvider } from "./sourceDefinitionProvider";

@provideSingleton(DefinitionProviders)
export class DefinitionProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private modelDefinitionProvider: ModelDefinitionProvider,
    private macroDefinitionProvider: MacroDefinitionProvider,
    private sourceDefinitionProvider: SourceDefinitionProvider
  ) {
    this.disposables.push(
      languages.registerDefinitionProvider(
        DBTPowerUserExtension.DBT_MODE,
        this.modelDefinitionProvider
      ),
      languages.registerDefinitionProvider(
        DBTPowerUserExtension.DBT_MODE,
        this.macroDefinitionProvider
      ),
      languages.registerDefinitionProvider(
        DBTPowerUserExtension.DBT_MODE,
        this.sourceDefinitionProvider
      )
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
