import { ModelDefinitionProvider } from "./modelDefinitionProvider";
import { MacroDefinitionProvider } from "./macroDefinitionProvider";
import { SourceDefinitionProvider } from "./sourceDefinitionProvider";
import { manifestContainer } from "../manifest/manifestContainer";

export class DefinitionProviderFactory {
  static createModelDefinitionProvider() {
    const modelDefinitionProvider = new ModelDefinitionProvider();
    manifestContainer.addEventHandler(modelDefinitionProvider);
    return modelDefinitionProvider;
  }

  static createMacroDefinitionProvider() {
    const macroDefinitionProvider = new MacroDefinitionProvider();
    manifestContainer.addEventHandler(macroDefinitionProvider);
    return macroDefinitionProvider;
  }

  static createSourceDefinitionProvider() {
    const sourceDefinitionProvider = new SourceDefinitionProvider();
    manifestContainer.addEventHandler(sourceDefinitionProvider);
    return sourceDefinitionProvider;
  }
}