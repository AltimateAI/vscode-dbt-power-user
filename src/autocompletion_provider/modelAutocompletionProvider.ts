import { RESOURCE_TYPE_ANALYSIS } from "@altimateai/dbt-integration";
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
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../dbt_client/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { isEnclosedWithinCodeBlock } from "../utils";

// TODO autocomplete doesn't work when mistype, delete and retype
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
      models: { packageName: string; modelName: string }[];
    }
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
      const seen = new Set<string>();
      const uniqueModels: { packageName: string; modelName: string }[] = [];
      for (const model of models) {
        if (model.resource_type === RESOURCE_TYPE_ANALYSIS) {
          continue;
        }
        // TODO: fix this autocomplete to support for model version
        const key = `${model.package_name}|${model.name}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueModels.push({
            packageName: model.package_name,
            modelName: model.name,
          });
        }
      }

      this.modelAutocompleteMap.set(added.project.projectRoot.fsPath, {
        projectName,
        models: uniqueModels,
      });
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
      const entry = this.modelAutocompleteMap.get(project.uri.fsPath);
      if (!entry) {
        return;
      }
      return entry.models.map((m) => ({
        projectName: entry.projectName,
        ...m,
      }));
    }
    this.telemetry.sendTelemetryEvent("provideModelAutocompletion");

    // Aggregate models from all loaded projects to support cross-project refs.
    // Dedup on packageName|modelName so the same external model doesn't appear
    // twice (once from the producing project's map, once from a consumer's map).
    // projectName is set to the current project's name so the insertText logic
    // in provideCompletionItems can detect cross-project refs via
    // projectName !== packageName.
    const currentProjectName =
      this.modelAutocompleteMap.get(projectRootpath.fsPath)?.projectName ?? "";
    const seen = new Set<string>();
    const result: {
      projectName: string;
      packageName: string;
      modelName: string;
    }[] = [];
    for (const entry of this.modelAutocompleteMap.values()) {
      for (const model of entry.models) {
        const key = `${model.packageName}|${model.modelName}`;
        if (!seen.has(key)) {
          seen.add(key);
          result.push({ projectName: currentProjectName, ...model });
        }
      }
    }
    return result;
  };
}
