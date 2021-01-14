import * as vscode from "vscode";
import { MacroAutocompletionProvider } from "./macroAutocompletionProvider";
import { ModelAutocompletionProvider } from "./modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./sourceAutocompletionProvider";
import { DBT_MODE } from "../extension";
import { provideSingleton } from "../utils";
@provideSingleton(AutocompletionProviderFactory)
export class AutocompletionProviderFactory {
  constructor(
    private macroAutocompletionProvider: MacroAutocompletionProvider,
    private modelAutocompletionProvider: ModelAutocompletionProvider,
    private sourceAutocompletionProvider: SourceAutocompletionProvider
  ) {}

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
