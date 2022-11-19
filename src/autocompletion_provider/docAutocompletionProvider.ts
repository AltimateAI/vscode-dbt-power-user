import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  Disposable,
  Position,
  ProviderResult,
  TextDocument,
  Uri,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { isEnclosedWithinCodeBlock, provideSingleton } from "../utils";

@provideSingleton(DocAutocompletionProvider)
export class DocAutocompletionProvider
  implements CompletionItemProvider, Disposable
{
  private static readonly ENDS_WITH_DOC = /doc\(['|"]$/;
  private docAutocompleteNameItemsMap: Map<string, CompletionItem[]> =
    new Map();
  private disposables: Disposable[] = [];

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event)
      )
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
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

    if (linePrefix.match(DocAutocompletionProvider.ENDS_WITH_DOC)) {
      return this.showDocNameAutocompletionItems(projectRootpath);
    }
    return undefined;
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.docAutocompleteNameItemsMap.set(
        added.projectRoot.fsPath,
        Array.from(added.docMetaMap.keys()).map(
          (docName) => new CompletionItem(docName, CompletionItemKind.File)
        )
      );
    });
    event.removed?.forEach((removed) => {
      this.docAutocompleteNameItemsMap.delete(removed.projectRoot.fsPath);
    });
  }

  private showDocNameAutocompletionItems(projectRootpath: Uri) {
    return this.docAutocompleteNameItemsMap.get(projectRootpath.fsPath);
  }
}
