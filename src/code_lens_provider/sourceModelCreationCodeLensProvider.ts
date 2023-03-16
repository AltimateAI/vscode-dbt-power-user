import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  Event,
  EventEmitter,
  Range,
  TextDocument,
  Uri,
} from "vscode";
import { CST, LineCounter, Parser } from "yaml";
import { provideSingleton } from "../utils";

interface Position {
  line: number;
  col: number;
}
export interface GenerateModelFromSourceParams {
  currentDoc: Uri;
  sourceName: string;
  database: string;
  schema: string;
  tableName: string;
  tableIdentifier?: string;
}

@provideSingleton(SourceModelCreationCodeLensProvider)
export class SourceModelCreationCodeLensProvider implements CodeLensProvider {
  private codeLenses: CodeLens[] = [];
  private _onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>();
  public readonly onDidChangeCodeLenses: Event<void> =
    this._onDidChangeCodeLenses.event;

  public provideCodeLenses(
    document: TextDocument,
    token: CancellationToken
  ): CodeLens[] | Thenable<CodeLens[]> {
    this.codeLenses = [];
    const lineCounter = new LineCounter();
    let currentSource: string | undefined = undefined;
    let currentDatabase: string | undefined = undefined;
    let currentSchema: string | undefined = undefined;
    let currentTables: {
      tableName: string;
      tableIdentifier?: string;
      pos: Position;
    }[];

    for (const token of new Parser(lineCounter.addNewLine).parse(
      document.getText()
    )) {
      if (token.type === "document" && CST.isCollection(token.value)) {
        for (const i in token.value.items) {
          const item = token.value.items[i];
          if (
            CST.isScalar(item.key) &&
            item.key.source === "sources" &&
            CST.isCollection(item.value)
          ) {
            // inside sources
            for (const j in item.value.items) {
              // inside a source
              currentTables = [];
              const source = item.value.items[j];
              if (CST.isCollection(source.value)) {
                //
                for (const k in source.value.items) {
                  const sourceProperty = source.value.items[k];
                  if (
                    CST.isScalar(sourceProperty.key) &&
                    CST.isScalar(sourceProperty.value)
                  ) {
                    if (sourceProperty.key.source === "name") {
                      currentSource = sourceProperty.value.source;
                    }
                    if (sourceProperty.key.source === "database") {
                      currentDatabase = sourceProperty.value.source;
                    }
                    if (sourceProperty.key.source === "schema") {
                      currentSchema = sourceProperty.value.source;
                    }
                  }
                  if (
                    CST.isScalar(sourceProperty.key) &&
                    CST.isCollection(sourceProperty.value) &&
                    sourceProperty.key.source === "tables"
                  ) {
                    // inside tables
                    let tableName: string | undefined = undefined;
                    let tableIdentifier: string | undefined = undefined;
                    let position: Position | undefined = undefined;
                    for (const l in sourceProperty.value.items) {
                      const table = sourceProperty.value.items[l];
                      if (CST.isCollection(table.value)) {
                        for (const m in table.value.items) {
                          position = lineCounter.linePos(table.value.offset);
                          const tableProperty = table.value.items[m];
                          if (
                            CST.isScalar(tableProperty.value) &&
                            CST.isScalar(tableProperty.key)
                          ) {
                            if (tableProperty.key.source === "name") {
                              tableName = tableProperty.value.source;
                            }
                            if (tableProperty.key.source === "identifier") {
                              tableIdentifier = tableProperty.value.source;
                            }
                          }
                        }
                      }
                      if (tableName !== undefined && position !== undefined) {
                        currentTables.push({
                          tableName: tableName,
                          tableIdentifier: tableIdentifier,
                          pos: position,
                        });
                        tableName = undefined;
                        tableIdentifier = undefined;
                        position = undefined;
                      }
                    }
                  }
                }
              }

              // add all tables
              for (const i in currentTables) {
                const table = currentTables[i];
                const params: GenerateModelFromSourceParams = {
                  currentDoc: document.uri,
                  sourceName: currentSource!,
                  database: currentDatabase!,
                  schema: currentSchema!,
                  tableName: table.tableName,
                  tableIdentifier: table.tableIdentifier,
                };
                this.codeLenses.push(
                  new CodeLens(
                    new Range(
                      table.pos.line - 1,
                      table.pos.col,
                      table.pos.line - 1,
                      table.pos.col
                    ),
                    {
                      title: "Generate model",
                      tooltip: "Generate model based on source configuration",
                      command: "dbtPowerUser.createModelBasedonSourceConfig",
                      arguments: [params],
                    }
                  )
                );
              }
              currentDatabase = undefined;
              currentSchema = undefined;
              currentSource = undefined;
            }
          }
        }
      }
    }
    return this.codeLenses;
  }
}
