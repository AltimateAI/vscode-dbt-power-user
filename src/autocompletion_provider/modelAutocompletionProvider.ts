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
    /ref\s*\(\s*('[^)']*'|"[^)"]*")\s*,\s*(['"])?\s*\w*$/;
  private modelAutocompleteMap: Map<
    string,
    {
      projectName: string;
      packageName: string;
      modelName: string;
    }[]
  > = new Map();
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
    if (!modelMatch && !packageMatch) {
      return undefined;
    }
    let autoCompleteItems = this.getAutoCompleteItems(document.uri);
    if (!autoCompleteItems) {
      return undefined;
    }
    if (modelMatch) {
      // capture group for first quote after parenthesis
      // can be one of [`'`, `"`, undefined]
      if (!modelMatch[1]) {
        // if no quotes surround insertText by "
        return autoCompleteItems.map((completionItem) => ({
          label: `(${completionItem.packageName}) ${completionItem.modelName}`,
          kind: CompletionItemKind.Value,
          detail: "Model",
          insertText:
            completionItem.projectName === completionItem.packageName
              ? `"${completionItem.modelName}"`
              : `"${completionItem.packageName}", "${completionItem.modelName}"`,
        }));
      }
      // if quotes match insertText ending quote
      const endQuote =
        line[position.character] === modelMatch[1] ? "" : modelMatch[1];
      return autoCompleteItems.map((completionItem) => ({
        label: `(${completionItem.packageName}) ${completionItem.modelName}`,
        kind: CompletionItemKind.Value,
        detail: "Model",
        insertText:
          completionItem.projectName === completionItem.packageName
            ? `${completionItem.modelName}${endQuote}`
            : `${completionItem.packageName}${modelMatch[1]}, ${modelMatch[1]}${completionItem.modelName}${endQuote}`,
      }));
    }
    if (packageMatch) {
      const packageName = packageMatch[1].replace(/['"]/g, "");
      autoCompleteItems = autoCompleteItems.filter(
        (completionItem) => completionItem.packageName === packageName,
      );
      // capture group for second quote after parenthesis
      // can be one of [`'`, `"`, undefined]
      if (!packageMatch[2]) {
        return autoCompleteItems.map((completionItem) => ({
          label: completionItem.modelName,
          kind: CompletionItemKind.Value,
          detail: "Model",
          insertText: `"${completionItem.modelName}"`,
        }));
      }
      // if quotes match insertText ending quote
      const endQuote =
        line[position.character] === packageMatch[2] ? "" : packageMatch[2];
      return autoCompleteItems.map((completionItem) => ({
        label: completionItem.modelName,
        kind: CompletionItemKind.Value,
        detail: "Model",
        insertText: `${completionItem.modelName}${endQuote}`,
      }));
    }

    return undefined;
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
            projectName,
            packageName: model.package_name,
            modelName: key,
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
