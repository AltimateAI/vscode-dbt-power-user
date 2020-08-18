import { ModelDefinitionProvider } from "./modelDefinitionProvider";
import { DBTManifestInstance } from "../dbtManifest";
import { MacroDefinitionProvider } from "./macroDefinitionProvider";
import { SourceDefinitionProvider } from "./sourceDefinitionProvider";

export class DefinitionProviderFactory {
  static createModelDefinitionProvider() {
    const modelDefinitionProvider = new ModelDefinitionProvider();
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => modelDefinitionProvider.onDBTManifestCacheChanged(event)
    );
    return modelDefinitionProvider;
  }

  static createMacroDefinitionProvider() {
    const macroDefinitionProvider = new MacroDefinitionProvider();
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => macroDefinitionProvider.onDBTManifestCacheChanged(event)
    );
    return macroDefinitionProvider;
  }

  static createSourceDefinitionProvider() {
    const sourceDefinitionProvider = new SourceDefinitionProvider();
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => sourceDefinitionProvider.onDBTManifestCacheChanged(event)
    );
    return sourceDefinitionProvider;
  }
}