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
import { RESOURCE_TYPE_ANALYSIS } from "../dbt_client/dbtIntegration";

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
      // if quotes then add end quote to match start quote
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
      // if quotes then add end quote to match start quote
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
      const models = added.nodeMetaMap.nodes();
      const autocompleteItems = Array.from(models)
        .filter((model) => model.resource_type !== RESOURCE_TYPE_ANALYSIS)
        .map((model) => ({
          projectName,
          packageName: model.package_name,
          // TODO: fix this autocomplete to support for model version
          modelName: model.name,
        }));

      const uniqueItems: Record<
        string,
        {
          projectName: string;
          packageName: string;
          modelName: string;
        }
      > = {};

      for (const item of autocompleteItems) {
        const key = `${item.projectName}|${item.packageName}|${item.modelName}`;
        if (!uniqueItems[key]) {
          uniqueItems[key] = item;
        }
      }

      this.modelAutocompleteMap.set(
        added.project.projectRoot.fsPath,
        Object.values(uniqueItems),
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
      const project = this.dbtProjectContainer.getFromWorkspaceState(
        "dbtPowerUser.projectSelected",
      );
      if (!project?.uri) {
        return;
      }

      return this.modelAutocompleteMap.get(project.uri.fsPath);
    }
    this.telemetry.sendTelemetryEvent("provideModelAutocompletion");
    return this.modelAutocompleteMap.get(projectRootpath.fsPath);
  };
}
