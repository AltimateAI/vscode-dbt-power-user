import * as vscode from "vscode";
import { MacroAutocompletionProvider } from "./macroAutocompletionProvider";
import { ModelAutocompletionProvider } from "./modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./sourceAutocompletionProvider";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";
import { DBT_MODE } from "../extension";

export class AutocompletionProviderFactory {
  static createAutoCompletionProviders(): { dispose(): any }[] {
    return [
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        AutocompletionProviderFactory.createMacroAutocompletionProvider()
      ),
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        AutocompletionProviderFactory.createModelAutocompletionProvider(),
        '"', "'"
      ),
      vscode.languages.registerCompletionItemProvider(
        DBT_MODE,
        AutocompletionProviderFactory.createSourceAutocompletionProvider(),
        '"', "'"
      ),
    ];
  }
  
  static createMacroAutocompletionProvider(): vscode.CompletionItemProvider {
    const macroAutocompletionProvider = new MacroAutocompletionProvider();
    dbtProjectContainer.addProvider(macroAutocompletionProvider);
    return macroAutocompletionProvider;
  }

  static createModelAutocompletionProvider(): vscode.CompletionItemProvider {
    const modelAutocompletionProvider = new ModelAutocompletionProvider();
    dbtProjectContainer.addProvider(modelAutocompletionProvider);
    return modelAutocompletionProvider;
  }

  static createSourceAutocompletionProvider(): vscode.CompletionItemProvider {
    const sourceAutocompletionProvider = new SourceAutocompletionProvider();
    dbtProjectContainer.addProvider(sourceAutocompletionProvider);
    return sourceAutocompletionProvider;
  }
}