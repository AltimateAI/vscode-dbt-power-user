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

export class SourceAutocompletionProvider
  implements CompletionItemProvider, OnDBTManifestCacheChanged {
  private static readonly GET_SOURCE_NAME = /(?!['"])(\w+)(?=['"])/;
  private sourceAutocompleteNameItems: CompletionItem[] = [];
  private sourceAutocompleteTableMap: Map<string, CompletionItem[]> = new Map();

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const linePrefix = document
      .lineAt(position)
      .text.substr(0, position.character);
    if (!isEnclosedWithinCodeBlock(document, position))
      return undefined;

    if (linePrefix.endsWith("source("))
      return this.showSourceNameAutocompletionItems();

    if (linePrefix.match(SourceAutocompletionProvider.GET_SOURCE_NAME) &&
      linePrefix.includes('source'))
      return this.showTableNameAutocompletionItems(linePrefix);
    return undefined;
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.sourceAutocompleteNameItems = Array.from(event.sourceMetaMap.keys()).map(
      (source) => new CompletionItem(`'${source}'`, CompletionItemKind.File)
    );
    event.sourceMetaMap.forEach((value, key) => {
      const autocompleteItems = value.tables.map(item => {
        return new CompletionItem(item.name, CompletionItemKind.File)
      });
      this.sourceAutocompleteTableMap.set(key, autocompleteItems);
    })
  }

  private showSourceNameAutocompletionItems() {
    return this.sourceAutocompleteNameItems;
  }

  private showTableNameAutocompletionItems(linePrefix: string) {
    const sourceNameMatch = linePrefix.match(SourceAutocompletionProvider.GET_SOURCE_NAME);
    if (sourceNameMatch !== null) {
      return this.sourceAutocompleteTableMap.get(sourceNameMatch[0]);
    }
  }
}