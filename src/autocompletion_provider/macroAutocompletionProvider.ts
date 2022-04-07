import { isEnclosedWithinCodeBlock, provideSingleton } from "../utils";
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
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";

@provideSingleton(MacroAutocompletionProvider) // TODO autocomplete doesn't work when mistype, delete and retype
export class MacroAutocompletionProvider
  implements CompletionItemProvider, Disposable {
  private macrosAutocompleteMap: Map<string, CompletionItem[]> = new Map();
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
    const range = document.getWordRangeAtPosition(position);
    if (range && isEnclosedWithinCodeBlock(document, range)) {
      return this.getAutoCompleteItems(document.uri);
    }
    return undefined;
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.macrosAutocompleteMap.set(
        added.projectRoot.fsPath,
        Array.from(added.macroMetaMap.keys()).map(
          (macro) => new CompletionItem(macro, CompletionItemKind.File)
        )
      );
    });
    event.removed?.forEach((removed) => {
      this.macrosAutocompleteMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getAutoCompleteItems = (currentFilePath: Uri) => {
    const projectRootpath = this.dbtProjectContainer.getProjectRootpath(
      currentFilePath
    );
    if (projectRootpath === undefined) {
      return;
    }
    return this.macrosAutocompleteMap.get(projectRootpath.fsPath);
  };
}
