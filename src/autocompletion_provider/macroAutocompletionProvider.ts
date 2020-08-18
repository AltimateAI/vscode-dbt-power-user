import { isEnclosedWithinCodeBlock } from "../utils";
import {
  CompletionItemProvider,
  CompletionItem,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  ProviderResult,
  CompletionList,
  CompletionItemKind,
} from "vscode";
import {
  OnDBTManifestCacheChanged,
  DBTManifestCacheChangedEvent,
} from "../dbtManifest";

export class MacroAutocompletionProvider
  implements CompletionItemProvider, OnDBTManifestCacheChanged {
  private macrosAutocompleteItems: CompletionItem[] = [];

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const range = document.getWordRangeAtPosition(position);
    if (range && isEnclosedWithinCodeBlock(document, range)) {
      return this.macrosAutocompleteItems;
    }
    return undefined;
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.macrosAutocompleteItems = Array.from(
      event.macroToLocationMap.keys()
    ).map((macro) => new CompletionItem(macro, CompletionItemKind.File));
  }
}
