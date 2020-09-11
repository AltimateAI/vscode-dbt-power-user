import { getProjectRootpath, isEnclosedWithinCodeBlock } from "../utils";
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
import {
  OnDBTManifestCacheChanged,
  DBTManifestCacheChangedEvent,
} from "../dbtManifest";

export class MacroAutocompletionProvider
  implements CompletionItemProvider, OnDBTManifestCacheChanged {
  private macrosAutocompleteMap: Map<string, CompletionItem[]> = new Map();

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const range = document.getWordRangeAtPosition(position);
    if (range && isEnclosedWithinCodeBlock(document, range)) {
      return this.getAutoCompleteItems(document.uri.path);
    }
    return undefined;
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent, rootpath: string): void {
    this.macrosAutocompleteMap.set(rootpath, Array.from(
      event.macroMetaMap.keys()
    ).map((macro) => new CompletionItem(macro, CompletionItemKind.File)));
  }

  private getAutoCompleteItems = (currentFilePath: string) => {
    const workspaceFolders = workspace.workspaceFolders;
    if (workspaceFolders === undefined) {
      return;
    }
    const projectRootpath = getProjectRootpath(workspaceFolders, currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    return this.macrosAutocompleteMap.get(projectRootpath);
  };
}
