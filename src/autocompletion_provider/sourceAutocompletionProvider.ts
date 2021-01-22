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
  Disposable,
} from "vscode";
import { isEnclosedWithinCodeBlock, provideSingleton } from "../utils";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";

@provideSingleton(SourceAutocompletionProvider) // TODO autocomplete doesn't work when mistype, delete and retype
export class SourceAutocompletionProvider
  implements CompletionItemProvider, Disposable {
  private static readonly GET_SOURCE_NAME = /(?!['"])(\w+)(?=['"])/;
  private static readonly ENDS_WITH_SOURCE = /source\(['|"]$/;
  private sourceAutocompleteNameItemsMap: Map<
    string,
    CompletionItem[]
  > = new Map();
  private sourceAutocompleteTableMap: Map<
    string,
    Map<string, CompletionItem[]>
  > = new Map();
  private disposables: Disposable[] = [];

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event)
      )
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

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
    const projectRootpath = this.dbtProjectContainer.getProjectRootpath(
      document.uri
    );
    if (projectRootpath === undefined) {
      return;
    }

    if (linePrefix.match(SourceAutocompletionProvider.ENDS_WITH_SOURCE)) {
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

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.sourceAutocompleteNameItemsMap.set(
        added.projectRoot.fsPath,
        Array.from(added.sourceMetaMap.keys()).map(
          (source) => new CompletionItem(source, CompletionItemKind.File)
        )
      );
      const sourceTableMap: Map<string, CompletionItem[]> = new Map();
      added.sourceMetaMap.forEach((value, key) => {
        const autocompleteItems = value.tables.map((item) => {
          return new CompletionItem(item.name, CompletionItemKind.File);
        });
        sourceTableMap.set(key, autocompleteItems);
      });
      this.sourceAutocompleteTableMap.set(
        added.projectRoot.fsPath,
        sourceTableMap
      );
    });
    event.removed?.forEach((removed) => {
      this.sourceAutocompleteNameItemsMap.delete(removed.projectRoot.fsPath);
      this.sourceAutocompleteTableMap.delete(removed.projectRoot.fsPath);
    });
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
