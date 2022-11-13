import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { MacroAutocompletionProvider } from "./macroAutocompletionProvider";
import { ModelAutocompletionProvider } from "./modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./sourceAutocompletionProvider";

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
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.macroAutocompletionProvider
      ),
      languages.registerCompletionItemProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.modelAutocompletionProvider,
        ".",
        "(",
        '"',
        "'"
      ),
      languages.registerCompletionItemProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.sourceAutocompletionProvider,
        ".",
        "(",
        '"',
        "'"
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
