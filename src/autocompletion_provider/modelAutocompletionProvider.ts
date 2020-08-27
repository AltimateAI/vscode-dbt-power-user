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
import { isEnclosedWithinCodeBlock } from "../utils";
import {
  OnDBTManifestCacheChanged,
  DBTManifestCacheChangedEvent,
} from "../dbtManifest";

export class ModelAutocompletionProvider
  implements CompletionItemProvider, OnDBTManifestCacheChanged {
  private modelAutocompleteItems: CompletionItem[] = [];

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const linePrefix = document
      .lineAt(position)
      .text.substr(0, position.character);
    if (
      linePrefix.endsWith("ref(") &&
      isEnclosedWithinCodeBlock(document, position)
    ) {
      return this.modelAutocompleteItems;
    }
    return undefined;
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.modelAutocompleteItems = Array.from(event.modelMetaMap.keys()).map(
      (model) => new CompletionItem(`'${model}'`, CompletionItemKind.File)
    );
  }
}
