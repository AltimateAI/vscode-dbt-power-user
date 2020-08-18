import { MacroAutocompletionProvider } from "./macroAutocompletionProvider";
import { DBTManifestInstance } from "../dbtManifest";
import { ModelAutocompletionProvider } from "./modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./sourceAutocompletionProvider";

export class AutocompletionProviderFactory {
  static createMacroAutocompletionProvider() {
    const macroAutocompletionProvider = new MacroAutocompletionProvider();
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => macroAutocompletionProvider.onDBTManifestCacheChanged(event)
    );
    return macroAutocompletionProvider;
  }

  static createModelAutocompletionProvider() {
    const modelAutocompletionProvider = new ModelAutocompletionProvider();
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => modelAutocompletionProvider.onDBTManifestCacheChanged(event)
    );
    return modelAutocompletionProvider;
  }

  static createSourceAutocompletionProvider() {
    const sourceAutocompletionProvider = new SourceAutocompletionProvider();
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => sourceAutocompletionProvider.onDBTManifestCacheChanged(event)
    );
    return sourceAutocompletionProvider;
  }
}