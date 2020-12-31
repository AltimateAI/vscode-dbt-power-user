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
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";
import {
  OnManifestCacheChanged,
  ManifestCacheChangedEvent,
} from "../manifest/event/manifestCacheChangedEvent";

export class ModelAutocompletionProvider // TODO autocomplete doesn't work when mistype, delete and retype
  implements CompletionItemProvider, OnManifestCacheChanged {
  private static readonly ENDS_WTTH_REF = /ref\(['|"]$/;
  private modelAutocompleteMap: Map<string, CompletionItem[]> = new Map();

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
      return this.getAutoCompleteItems(document.uri);
    }
    return undefined;
  }

  onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
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
    const projectRootpath = dbtProjectContainer.getProjectRootpath(
      currentFilePath
    );
    if (projectRootpath === undefined) {
      return;
    }
    return this.modelAutocompleteMap.get(projectRootpath.fsPath);
  };
}
