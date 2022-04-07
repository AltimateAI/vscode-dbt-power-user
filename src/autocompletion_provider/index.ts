import { Disposable, languages } from "vscode";
import { MacroAutocompletionProvider } from "./macroAutocompletionProvider";
import { ModelAutocompletionProvider } from "./modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./sourceAutocompletionProvider";
import { provideSingleton } from "../utils";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";

@provideSingleton(AutocompletionProviders)
export class AutocompletionProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor(
    private macroAutocompletionProvider: MacroAutocompletionProvider,
    private modelAutocompletionProvider: ModelAutocompletionProvider,
    private sourceAutocompletionProvider: SourceAutocompletionProvider
  ) {
    this.disposables.push(
      languages.registerCompletionItemProvider(
        DBTPowerUserExtension.DBT_MODE,
        this.macroAutocompletionProvider
      ),
      languages.registerCompletionItemProvider(
        DBTPowerUserExtension.DBT_MODE,
        this.modelAutocompletionProvider,
        "'",
        '"'
      ),
      languages.registerCompletionItemProvider(
        DBTPowerUserExtension.DBT_MODE,
        this.sourceAutocompletionProvider,
        "'",
        '"'
      ),
    );
  }

  dispose() {
    this.disposables.forEach(disposable => disposable.dispose());
  }
}
