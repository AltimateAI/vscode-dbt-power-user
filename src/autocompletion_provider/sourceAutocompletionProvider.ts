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
  workspace
} from "vscode";
import { getProjectRootpath, isEnclosedWithinCodeBlock } from "../utils";
import {
  OnDBTManifestCacheChanged,
  DBTManifestCacheChangedEvent,
} from "../dbtManifest";

export class SourceAutocompletionProvider
  implements CompletionItemProvider, OnDBTManifestCacheChanged {
  private static readonly GET_SOURCE_NAME = /(?!['"])(\w+)(?=['"])/;
  private static readonly ENDS_WTTH_SOURCE = /source\(['|"]$/;
  private sourceAutocompleteNameItemsMap: Map<string, CompletionItem[]> = new Map();
  private sourceAutocompleteTableMap: Map<string, Map<string, CompletionItem[]>> = new Map();

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const linePrefix = document
      .lineAt(position)
      .text.substr(0, position.character);
    if (!isEnclosedWithinCodeBlock(document, position)) {
      return undefined;
    }

    const workspaceFolders = workspace.workspaceFolders;
    if (workspaceFolders === undefined) {
      return;
    }
    const projectRootpath = getProjectRootpath(workspaceFolders, document.uri.path);
    if (projectRootpath === undefined) {
      return;
    }

    if (linePrefix.match(SourceAutocompletionProvider.ENDS_WTTH_SOURCE)) {
      return this.showSourceNameAutocompletionItems(projectRootpath);
    }

    if (linePrefix.match(SourceAutocompletionProvider.GET_SOURCE_NAME) &&
      linePrefix.includes('source')) {
      return this.showTableNameAutocompletionItems(linePrefix, projectRootpath);
    }
    return undefined;
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent, rootpath: string): void {
    this.sourceAutocompleteNameItemsMap.set(rootpath, Array.from(event.sourceMetaMap.keys()).map(
      (source) => new CompletionItem(source, CompletionItemKind.File)
    ));
    const sourceTableMap: Map<string, CompletionItem[]> = new Map();
    event.sourceMetaMap.forEach((value, key) => {
      const autocompleteItems = value.tables.map(item => {
        return new CompletionItem(item.name, CompletionItemKind.File);
      });
      sourceTableMap.set(key, autocompleteItems);
    });
    this.sourceAutocompleteTableMap.set(rootpath, sourceTableMap);
  }

  private showSourceNameAutocompletionItems(projectRootpath: string) {
    return this.sourceAutocompleteNameItemsMap.get(projectRootpath);
  }

  private showTableNameAutocompletionItems(linePrefix: string, projectRootpath: string) {
    const sourceNameMatch = linePrefix.match(SourceAutocompletionProvider.GET_SOURCE_NAME);
    if (sourceNameMatch !== null) {
      const sourceTableMap = this.sourceAutocompleteTableMap.get(projectRootpath);
      if (sourceTableMap === undefined) {
        return;
      }
      return sourceTableMap.get(sourceNameMatch[0]);
    }
  }
}