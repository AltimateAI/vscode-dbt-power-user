import * as vscode from "vscode";
import { MacroAutocompletionProvider } from "./macroAutocompletionProvider";
import { ModelAutocompletionProvider } from "./modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./sourceAutocompletionProvider";
import { DBT_MODE } from "../extension";
import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";

@provide(AutocompletionProviderFactory)
export class AutocompletionProviderFactory {
  @inject(MacroAutocompletionProvider)
  macroAutocompletionProvider!: MacroAutocompletionProvider;
  @inject(ModelAutocompletionProvider)
  modelAutocompletionProvider!: ModelAutocompletionProvider;
  @inject(SourceAutocompletionProvider)
  sourceAutocompletionProvider!: SourceAutocompletionProvider;

  createAutoCompletionProviders(): { dispose(): any }[] {
    return [
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        this.macroAutocompletionProvider
      ),
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        this.modelAutocompletionProvider,
        "'",
        '"'
      ),
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        this.sourceAutocompletionProvider,
        "'",
        '"'
      ),
    ];
  }
}
