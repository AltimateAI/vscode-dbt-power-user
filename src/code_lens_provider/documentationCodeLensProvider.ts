import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  Event,
  EventEmitter,
  ProviderResult,
  Range,
  TextDocument,
  window,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";
import { CST, LineCounter, Parser } from "yaml";
import path = require("path");

@provideSingleton(DocumentationCodeLensProvider)
export class DocumentationCodeLensProvider implements CodeLensProvider {
  private _onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>();
  public readonly onDidChangeCodeLenses: Event<void> =
    this._onDidChangeCodeLenses.event;

  provideCodeLenses(
    document: TextDocument,
    token: CancellationToken,
  ): ProviderResult<CodeLens[]> {
    const isNotebooksEnabled = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableNotebooks", false);
    const codeLenses: CodeLens[] = [];
    if (document.fileName.endsWith(".sql")) {
      codeLenses.push(
        new CodeLens(new Range(0, 0, 1, 1), {
          title: "Add documentation or tests",
          tooltip: "Add documentation or tests for this model",
          command: "dbtPowerUser.DocsEdit.focus",
          arguments: [],
        }),
      );
      if (isNotebooksEnabled) {
        codeLenses.push(
          new CodeLens(new Range(0, 0, 1, 1), {
            title: "Profile this query",
            tooltip: "Profile this query",
            command: "dbtPowerUser.createDatapilotNotebook",
            arguments: [
              {
                template: "Profile your query",
              },
            ],
          }),
        );
        codeLenses.push(
          new CodeLens(new Range(0, 0, 1, 1), {
            title: "Get test suggestions",
            tooltip: "Get test suggestions",
            command: "dbtPowerUser.createDatapilotNotebook",
            arguments: [
              {
                template: "Get test suggestions",
              },
            ],
          }),
        );
        codeLenses.push(
          new CodeLens(new Range(0, 0, 1, 1), {
            title: "Generate dbt base model sql",
            tooltip: "Generate dbt base model sql",
            command: "dbtPowerUser.createDatapilotNotebook",
            arguments: [
              {
                template: "Generate dbt base model sql",
              },
            ],
          }),
        );
        codeLenses.push(
          new CodeLens(new Range(0, 0, 1, 1), {
            title: "Generate dbt model yaml",
            tooltip: "Generate dbt model yaml",
            command: "dbtPowerUser.createDatapilotNotebook",
            arguments: [
              {
                template: "Generate dbt model yaml",
              },
            ],
          }),
        );
        codeLenses.push(
          new CodeLens(new Range(0, 0, 1, 1), {
            title: "Generate dbt model CTE",
            tooltip: "Generate dbt model CTE",
            command: "dbtPowerUser.createDatapilotNotebook",
            arguments: [
              {
                template: "Generate dbt model CTE",
              },
            ],
          }),
        );
      }
      return codeLenses;
    }
    const lineCounter = new LineCounter();
    for (const token of new Parser(lineCounter.addNewLine).parse(
      document.getText(),
    )) {
      if (!(token.type === "document" && CST.isCollection(token.value))) {
        continue;
      }
      for (const item of token.value.items) {
        if (
          !(
            CST.isScalar(item.key) &&
            item.key.source === "models" &&
            CST.isCollection(item.value)
          )
        ) {
          continue;
        }
        // inside models
        for (const modelItem of item.value.items) {
          if (!CST.isCollection(modelItem.value)) {
            continue;
          }
          for (const properties of modelItem.value.items) {
            if (
              CST.isScalar(properties.key) &&
              CST.isScalar(properties.value) &&
              properties.key.source === "name"
            ) {
              const position = lineCounter.linePos(properties.key.offset);
              codeLenses.push(
                new CodeLens(
                  new Range(
                    position.line - 1,
                    position.col,
                    position.line - 1,
                    position.col,
                  ),
                  {
                    title: "Add documentation or tests",
                    tooltip: "Add documentation or tests for this model",
                    command: "dbtPowerUser.showDocumentation",
                    arguments: [properties.value.source],
                  },
                ),
              );
            }
          }
        }
      }
    }
    return codeLenses;
  }
}
