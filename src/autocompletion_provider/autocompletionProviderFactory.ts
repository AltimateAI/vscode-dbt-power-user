import * as vscode from "vscode";
import { MacroAutocompletionProvider } from "./macroAutocompletionProvider";
import { ModelAutocompletionProvider } from "./modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./sourceAutocompletionProvider";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";
import { DBT_MODE } from "../extension";

export class AutocompletionProviderFactory {
  static createAutoCompletionProviders(): { dispose(): any; }[] {
    return [
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        new MacroAutocompletionProvider()
      ),
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        new ModelAutocompletionProvider(),
        '"',
        "'"
      ),
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        new SourceAutocompletionProvider(),
        '"',
        "'"
      ),
    ];
  }
}
