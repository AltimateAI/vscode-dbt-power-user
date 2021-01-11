import * as vscode from "vscode";
import { MacroAutocompletionProvider } from "./macroAutocompletionProvider";
import { ModelAutocompletionProvider } from "./modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./sourceAutocompletionProvider";
import { DBT_MODE } from "../extension";

const triggeredCharactersArray = [
  '"',
  "'",
  "_",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "é",
  "è",
  "ç",
  "à",
  "ù",
];

export class AutocompletionProviderFactory {
  static createAutoCompletionProviders(): { dispose(): any }[] {
    return [
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        new MacroAutocompletionProvider(),
        ...triggeredCharactersArray
      ),
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        new ModelAutocompletionProvider(),
        ...triggeredCharactersArray
      ),
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        new SourceAutocompletionProvider(),
        ...triggeredCharactersArray
      ),
    ];
  }
}
