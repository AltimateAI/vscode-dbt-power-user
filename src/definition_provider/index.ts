import { Disposable, languages } from "vscode";
import { ModelDefinitionProvider } from "./modelDefinitionProvider";
import { MacroDefinitionProvider } from "./macroDefinitionProvider";
import { SourceDefinitionProvider } from "./sourceDefinitionProvider";
import { provideSingleton } from "../utils";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";

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
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
