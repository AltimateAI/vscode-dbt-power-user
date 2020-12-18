import { isEnclosedWithinCodeBlock } from "../utils";
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
import {
  ManifestCacheChangedEvent,
  OnManifestCacheChanged,
} from "../manifest/manifestCacheChangedEvent";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";

export class MacroAutocompletionProvider
  implements CompletionItemProvider, OnManifestCacheChanged {
  private macrosAutocompleteMap: Map<string, CompletionItem[]> = new Map();

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

  onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    this.macrosAutocompleteMap.set(
      event.projectRoot.fsPath,
      Array.from(event.macroMetaMap.keys()).map(
        (macro) => new CompletionItem(macro, CompletionItemKind.File)
      )
    );
  }

  private getAutoCompleteItems = (currentFilePath: Uri) => {
    const projectRootpath = dbtProjectContainer.getProjectRootpath(
      currentFilePath
    );
    if (projectRootpath === undefined) {
      return;
    }
    return this.macrosAutocompleteMap.get(projectRootpath.fsPath);
  };
}
