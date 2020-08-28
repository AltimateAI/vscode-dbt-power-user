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
  
  private static readonly ENDS_WTTH_REF = /ref\(['|"]$/;
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
      linePrefix.match(ModelAutocompletionProvider.ENDS_WTTH_REF) &&
      isEnclosedWithinCodeBlock(document, position)
    ) {
      return this.modelAutocompleteItems;
    }
    return undefined;
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    const models = event.nodeMetaMap.keys();
    this.modelAutocompleteItems = Array.from(models).map(
      (model) => new CompletionItem(model, CompletionItemKind.File)
    );
  }
}
