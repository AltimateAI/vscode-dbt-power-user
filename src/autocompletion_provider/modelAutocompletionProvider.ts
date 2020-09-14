import {
  CompletionItemProvider,
  CompletionItem,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  ProviderResult,
  CompletionList,
  CompletionItemKind
} from "vscode";
import { isEnclosedWithinCodeBlock } from "../utils";
import {
  OnDBTManifestCacheChanged,
  DBTManifestCacheChangedEvent,
} from "../dbtManifest";
import { manifestContainer } from "../manifestContainer";

export class ModelAutocompletionProvider
  implements CompletionItemProvider, OnDBTManifestCacheChanged {

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
      return this.getAutoCompleteItems(document.uri.path);
    }
    return undefined;
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent, rootpath: string): void {
    const models = event.nodeMetaMap.keys();
    this.modelAutocompleteMap.set(rootpath, Array.from(models).map(
      (model) => new CompletionItem(model, CompletionItemKind.File)
    ));
  }

  private getAutoCompleteItems = (currentFilePath: string) => {
    const projectRootpath = manifestContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    return this.modelAutocompleteMap.get(projectRootpath);
  };
}
