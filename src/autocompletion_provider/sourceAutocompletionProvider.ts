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
  Uri,
} from "vscode";
import { isEnclosedWithinCodeBlock } from "../utils";
import {
  ManifestCacheChangedEvent,
  OnManifestCacheChanged,
} from "../manifest/manifestCacheChangedEvent";
import { manifestContainer } from "../manifest/dbtProjectContainer";

export class SourceAutocompletionProvider
  implements CompletionItemProvider, OnManifestCacheChanged {
  private static readonly GET_SOURCE_NAME = /(?!['"])(\w+)(?=['"])/;
  private static readonly ENDS_WTTH_SOURCE = /source\(['|"]$/;
  private sourceAutocompleteNameItemsMap: Map<
    string,
    CompletionItem[]
  > = new Map();
  private sourceAutocompleteTableMap: Map<
    string,
    Map<string, CompletionItem[]>
  > = new Map();

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
    const projectRootpath = manifestContainer.getProjectRootpath(document.uri);
    if (projectRootpath === undefined) {
      return;
    }

    if (linePrefix.match(SourceAutocompletionProvider.ENDS_WTTH_SOURCE)) {
      return this.showSourceNameAutocompletionItems(projectRootpath);
    }

    if (
      linePrefix.match(SourceAutocompletionProvider.GET_SOURCE_NAME) &&
      linePrefix.includes("source")
    ) {
      return this.showTableNameAutocompletionItems(linePrefix, projectRootpath);
    }
    return undefined;
  }

  onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    this.sourceAutocompleteNameItemsMap.set(
      event.projectRoot.fsPath,
      Array.from(event.sourceMetaMap.keys()).map(
        (source) => new CompletionItem(source, CompletionItemKind.File)
      )
    );
    const sourceTableMap: Map<string, CompletionItem[]> = new Map();
    event.sourceMetaMap.forEach((value, key) => {
      const autocompleteItems = value.tables.map((item) => {
        return new CompletionItem(item.name, CompletionItemKind.File);
      });
      sourceTableMap.set(key, autocompleteItems);
    });
    this.sourceAutocompleteTableMap.set(
      event.projectRoot.fsPath,
      sourceTableMap
    );
  }

  private showSourceNameAutocompletionItems(projectRootpath: Uri) {
    return this.sourceAutocompleteNameItemsMap.get(projectRootpath.fsPath);
  }

  private showTableNameAutocompletionItems(
    linePrefix: string,
    projectRootpath: Uri
  ) {
    const sourceNameMatch = linePrefix.match(
      SourceAutocompletionProvider.GET_SOURCE_NAME
    );
    if (sourceNameMatch !== null) {
      const sourceTableMap = this.sourceAutocompleteTableMap.get(
        projectRootpath.fsPath
      );
      if (sourceTableMap === undefined) {
        return;
      }
      return sourceTableMap.get(sourceNameMatch[0]);
    }
  }
}
