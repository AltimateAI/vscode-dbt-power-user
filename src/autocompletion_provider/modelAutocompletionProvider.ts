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
import { TelemetryService } from "../telemetry";
import { DBTProject } from "../manifest/dbtProject";

@provideSingleton(ModelAutocompletionProvider) // TODO autocomplete doesn't work when mistype, delete and retype
export class ModelAutocompletionProvider
  implements CompletionItemProvider, Disposable
{
  private static readonly MODEL_PATTERN = /ref\s*\(\s*(['"])?\s*\w*$/;
  private static readonly PACKAGE_PATTERN =
    /ref\s*\(\s*('[^)']*'|"[^)"]*")\s*,\s*('|")\s*\w*$/;
  private modelAutocompleteMap: Map<string, CompletionItem[]> = new Map();
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
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
    context: CompletionContext,
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const line = document.lineAt(position).text;
    const linePrefix = line.substring(0, position.character);
    if (!isEnclosedWithinCodeBlock(document, position)) {
      return undefined;
    }
    const modelMatch = linePrefix.match(
      ModelAutocompletionProvider.MODEL_PATTERN,
    );
    const packageMatch = linePrefix.match(
      ModelAutocompletionProvider.PACKAGE_PATTERN,
    );
    if (modelMatch) {
      if (!modelMatch[1]) {
        return this.getAutoCompleteItems(document.uri)?.map(
          (completionItem) => ({
            ...completionItem,
            insertText: `"${completionItem.insertText}"`,
          }),
        );
      }
      return this.getAutoCompleteItems(document.uri)?.map((completionItem) => ({
        ...completionItem,
        insertText: `${completionItem.insertText}${
          line[position.character] === modelMatch[1] ? "" : modelMatch[1]
        }`,
      }));
    }
    if (packageMatch) {
      let quoteFound = false;
      let quote = "";
      if (linePrefix.endsWith("'")) {
        quoteFound = true;
        quote = "'";
      } else if (linePrefix.endsWith('"')) {
        quoteFound = true;
        quote = '"';
      }
      const autoCompleteItems = this.getAutoCompleteItems(document.uri)?.map(
        (completionItem) => ({
          ...completionItem,
          insertText: this.encloseWithQuotes(
            completionItem.insertText as string,
            quoteFound,
            quote,
          ),
        }),
      );
      return autoCompleteItems;
    }

    return undefined;
  }

  private encloseWithQuotes(
    insertText: string,
    quoteFound: boolean,
    quote: string,
  ) {
    const enclosing = quoteFound ? "" : '"';
    return `${enclosing}${insertText.replace('"', quote)}${enclosing}`;
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      const project = added.project;
      const projectName = project.getProjectName();
      const models = added.nodeMetaMap.entries();
      this.modelAutocompleteMap.set(
        added.project.projectRoot.fsPath,
        Array.from(models)
          .filter(
            ([key, model]) =>
              model.resource_type !== DBTProject.RESOURCE_TYPE_ANALYSIS,
          )
          .map(([key, model]) => ({
            label: `(${model.package_name}) ${key}`,
            insertText:
              model.package_name === projectName
                ? key
                : `${model.package_name}, ${key}`,
            kind: CompletionItemKind.Value,
            detail: "Model",
          })),
      );
    });
    event.removed?.forEach((removed) => {
      this.modelAutocompleteMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getAutoCompleteItems = (currentFilePath: Uri) => {
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }
    this.telemetry.sendTelemetryEvent("provideModelAutocompletion");
    return this.modelAutocompleteMap.get(projectRootpath.fsPath);
  };
}
