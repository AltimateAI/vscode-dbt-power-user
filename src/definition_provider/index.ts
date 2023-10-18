import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { DocDefinitionProvider } from "./docDefinitionProvider";
import { MacroDefinitionProvider } from "./macroDefinitionProvider";
import { ModelDefinitionProvider } from "./modelDefinitionProvider";
import { SourceDefinitionProvider } from "./sourceDefinitionProvider";

@provideSingleton(DefinitionProviders)
export class DefinitionProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private modelDefinitionProvider: ModelDefinitionProvider,
    private macroDefinitionProvider: MacroDefinitionProvider,
    private sourceDefinitionProvider: SourceDefinitionProvider,
    private docDefinitionsProvider: DocDefinitionProvider,
  ) {
    this.disposables.push(
      languages.registerDefinitionProvider(
        DBTPowerUserExtension.DBT_YAML_SQL_SELECTOR,
        this.modelDefinitionProvider,
      ),
      languages.registerDefinitionProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.macroDefinitionProvider,
      ),
      languages.registerDefinitionProvider(
        DBTPowerUserExtension.DBT_YAML_SQL_SELECTOR,
        this.sourceDefinitionProvider,
      ),
      languages.registerDefinitionProvider(
        DBTPowerUserExtension.DBT_YAML_SQL_SELECTOR,
        this.docDefinitionsProvider,
      ),
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
