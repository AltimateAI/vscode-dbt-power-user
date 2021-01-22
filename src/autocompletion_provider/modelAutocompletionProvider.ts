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

@provideSingleton(ModelAutocompletionProvider) // TODO autocomplete doesn't work when mistype, delete and retype
export class ModelAutocompletionProvider
  implements CompletionItemProvider, Disposable {
  private static readonly ENDS_WITH_REF = /ref\(['|"]$/;
  private modelAutocompleteMap: Map<string, CompletionItem[]> = new Map();
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
    if (
      linePrefix.match(ModelAutocompletionProvider.ENDS_WITH_REF) &&
      isEnclosedWithinCodeBlock(document, position)
    ) {
      return this.getAutoCompleteItems(document.uri);
    }

    return undefined;
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      const models = added.nodeMetaMap.keys();
      this.modelAutocompleteMap.set(
        added.projectRoot.fsPath,
        Array.from(models).map(
          (model) => new CompletionItem(model, CompletionItemKind.File)
        )
      );
    });
    event.removed?.forEach((removed) => {
      this.modelAutocompleteMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getAutoCompleteItems = (currentFilePath: Uri) => {
    const projectRootpath = this.dbtProjectContainer.getProjectRootpath(
      currentFilePath
    );
    if (projectRootpath === undefined) {
      return;
    }
    return this.modelAutocompleteMap.get(projectRootpath.fsPath);
  };
}
