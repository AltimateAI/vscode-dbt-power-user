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
  Range,
  SnippetString,
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
  // A bare identifier being typed: not inside quotes and not after a dot.
  private static readonly KEYWORD_PATTERN = /(^|[^\w.'"])[A-Za-z_]\w*$/;
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
      return this.getRefKeywordItems(document, position, linePrefix);
    }
    const modelMatch = linePrefix.match(
      ModelAutocompletionProvider.MODEL_PATTERN,
    );
    const packageMatch = linePrefix.match(
      ModelAutocompletionProvider.PACKAGE_PATTERN,
    );
    if (!modelMatch && !packageMatch) {
      return this.getRefKeywordItems(document, position, linePrefix);
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

  /**
   * The `ref` keyword item. It inserts `{{ ref('') }}`, or only `ref('')` when
   * the cursor is already inside a `{{ }}` or `{% %}` block, with the cursor
   * left empty between the quotes, and reopens suggestions so the model list
   * shows straight away. A placeholder there would become the completion
   * filter word and hide every model.
   */
  private getRefKeywordItems(
    document: TextDocument,
    position: Position,
    linePrefix: string,
  ): CompletionItem[] | undefined {
    if (!ModelAutocompletionProvider.KEYWORD_PATTERN.test(linePrefix)) {
      return undefined;
    }
    if (!this.getAutoCompleteItems(document.uri, false)) {
      return undefined;
    }
    const body = isInsideOpenJinjaBlock(document, position)
      ? "ref('$1')"
      : "{{ ref('$1') }}";
    return [
      {
        label: "ref",
        kind: CompletionItemKind.Snippet,
        detail: "Ref",
        insertText: new SnippetString(body),
        command: {
          command: "editor.action.triggerSuggest",
          title: "Suggest models",
        },
      },
    ];
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

  private getAutoCompleteItems = (
    currentFilePath: Uri,
    sendTelemetry = true,
  ) => {
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
    if (sendTelemetry) {
      this.telemetry.sendTelemetryEvent("provideModelAutocompletion");
    }
    return this.modelAutocompleteMap.get(projectRootpath.fsPath);
  };
}

// True when the last Jinja opener before the cursor (`{{` or `{%`) has not been
// closed yet (`}}` or `%}`).
const isInsideOpenJinjaBlock = (
  document: TextDocument,
  position: Position,
): boolean => {
  const before = document.getText(new Range(new Position(0, 0), position));
  const lastOpen = Math.max(before.lastIndexOf("{{"), before.lastIndexOf("{%"));
  const lastClose = Math.max(
    before.lastIndexOf("}}"),
    before.lastIndexOf("%}"),
  );
  return lastOpen > lastClose;
};
