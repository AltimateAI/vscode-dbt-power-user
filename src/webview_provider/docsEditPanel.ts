import { readFileSync } from "fs";
import {
  CancellationToken,
  ColorThemeKind,
  Disposable,
  ProgressLocation,
  TextEditor,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import path = require("path");
import { PythonException } from "python-bridge";
import { TelemetryService } from "../telemetry";
import { AltimateRequest } from "../altimate";

enum Source {
  YAML = "YAML",
  DATABASE = "DATABASE",
}

interface DBTDocumentationColumn {
  name: string;
  type?: string;
  description?: string;
  generated: boolean;
  source: Source;
}

interface DBTDocumentation {
  compiledSql: string;
  name: string;
  description: string;
  columns: DBTDocumentationColumn[];
  generated: boolean;
}

@provideSingleton(DocsEditViewPanel)
export class DocsEditViewPanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.DocsEdit";
  private _panel: WebviewView | undefined = undefined;
  private documentation?: DBTDocumentation;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private _disposables: Disposable[] = [];

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimateRequest: AltimateRequest,
    private telemetry: TelemetryService,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );
    window.onDidChangeActiveColorTheme(
      async (e) => {
        if (this._panel) {
          this.updateGraphStyle();
        }
      },
      null,
      this._disposables,
    );
    window.onDidChangeActiveTextEditor(
      async (event: TextEditor | undefined) => {
        if (event === undefined) {
          return;
        }
        this.documentation = await this.getDocumentation();
        if (this._panel) {
          this.transmitData();
          this.updateGraphStyle();
        }
      },
    );
  }

  private async getDocumentation(): Promise<DBTDocumentation | undefined> {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return undefined;
    }

    const currentFilePath = window.activeTextEditor.document.uri;
    const project = this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (project === undefined) {
      return undefined;
    }
    const event = this.eventMap.get(project.projectRoot.fsPath);
    if (event === undefined) {
      return undefined;
    }
    const modelName = path.basename(currentFilePath.fsPath, ".sql");
    const currentNode = event.nodeMetaMap.get(modelName);
    if (currentNode === undefined) {
      return undefined;
    }
    const docColumns = currentNode.columns;
    // merge metadata and manifest
    const compiledSql = await project.compileQuery(
      window.activeTextEditor.document.getText(),
    );
    if (compiledSql === undefined) {
      window.showErrorMessage("Could not compile query, aborting generation");
      return;
    }
    return {
      name: modelName,
      description: currentNode.description,
      compiledSql: compiledSql,
      generated: false,
      columns: Object.values(docColumns).map((column) => {
        return {
          name: column.name,
          description: column.description,
          generated: false,
          source: Source.YAML,
        };
      }),
    } as DBTDocumentation;
  }

  private async transmitError() {
    await this._panel!.webview.postMessage({
      command: "renderError",
    });
  }

  private async transmitData() {
    await this._panel!.webview.postMessage({
      command: "renderDocumentation",
      docs: this.documentation,
    });
  }

  private async updateGraphStyle() {
    const theme = [
      ColorThemeKind.Light,
      ColorThemeKind.HighContrastLight,
    ].includes(window.activeColorTheme.kind)
      ? "light"
      : "dark";
    await this._panel!.webview.postMessage({
      command: "setStylesByTheme",
      theme: theme,
    });
  }

  public async resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken,
  ) {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
    this.setupWebviewHooks(context);
    this.documentation = await this.getDocumentation();
    this.transmitData();
    this.updateGraphStyle();
  }

  private renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    webview.html = getHtml(webview, this.dbtProjectContainer.extensionUri);
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.title = "";
    this._panel!.description = "Edit model documentation";
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  private setupWebviewHooks(context: WebviewViewResolveContext) {
    this._panel!.webview.onDidReceiveMessage(
      async (message) => {
        console.log(message);
        switch (message.command) {
          case "fetchMetadataFromDatabase":
            if (
              window.activeTextEditor === undefined ||
              this.eventMap === undefined
            ) {
              return undefined;
            }
            const currentFilePath = window.activeTextEditor.document.uri;
            const project =
              this.dbtProjectContainer.findDBTProject(currentFilePath);
            if (project === undefined) {
              return undefined;
            }

            const modelName = path.basename(currentFilePath.fsPath, ".sql");
            try {
              const columnsInRelation =
                await project.getColumnsInRelation(modelName);
              this.documentation!.columns = columnsInRelation.map((column) => {
                const existingColumn = this.documentation?.columns.find(
                  (existingColumn) => column.column === existingColumn.name,
                );
                return {
                  name: column.column,
                  type: column.dtype,
                  description: existingColumn?.description || "",
                  generated: existingColumn?.generated || false,
                  source:
                    existingColumn !== undefined
                      ? Source.YAML
                      : Source.DATABASE,
                };
              });
              this.transmitData();
              this.telemetry.sendTelemetryEvent(
                "syncColumnsFromDatabaseForDocs",
              );
            } catch (exc) {
              this.transmitError();
              if (exc instanceof PythonException) {
                window.showErrorMessage(
                  `An error occured while fetching metadata for ${modelName} from the database: ` +
                    exc.exception.message,
                );
                return;
              }
              window.showErrorMessage(
                `An error occured while fetching metadata for ${modelName} from the database: ` +
                  exc,
              );
              this.telemetry.sendTelemetryError("docsEditPanelLoadError", exc);
            }
            break;
          case "generateDocsForModel":
            this.telemetry.sendTelemetryEvent("generateDocsForModel");
            window.withProgress(
              {
                title: "Generating model documentation",
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                if (this.documentation === undefined) {
                  return;
                }
                try {
                  const generateDocsForModel =
                    await this.altimateRequest.generateModelDocs({
                      columns: [],
                      dbt_model: {
                        model_name: this.documentation?.name,
                        model_description: this.documentation?.description,
                        compiled_sql: this.documentation?.compiledSql,
                        columns: this.documentation?.columns.map((column) => ({
                          column_name: column.name,
                          description: column.description,
                          data_type: column.type,
                          modelName: this.documentation?.name,
                        })),
                      },
                      gen_model_description: true,
                    });

                  if (
                    !generateDocsForModel ||
                    !generateDocsForModel.model_description
                  ) {
                    // nothing to do if nothing happened
                    return;
                  }
                  this.documentation = {
                    ...this.documentation!,
                    description: generateDocsForModel.model_description,
                    generated: true,
                  };
                  this.transmitData();
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    "An unexpected error occurred while generating documentation: " +
                      error,
                  );
                  this.telemetry.sendTelemetryError(
                    "generateDocsForModelError",
                    error,
                  );
                }
              },
            );
            break;
          case "generateDocsForColumn":
            this.telemetry.sendTelemetryEvent("generateDocsForColumn");
            window.withProgress(
              {
                title: "Generating column documentation",
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                if (this.documentation === undefined) {
                  return;
                }
                try {
                  const generateDocsForColumn =
                    await this.altimateRequest.generateModelDocs({
                      columns: [message.columnName],
                      dbt_model: {
                        model_name: this.documentation.name,
                        model_description: this.documentation?.description,
                        compiled_sql: this.documentation?.compiledSql,
                        columns: this.documentation?.columns.map((column) => ({
                          column_name: column.name,
                          description: column.description,
                          data_type: column.type,
                        })),
                      },
                      gen_model_description: false,
                    });

                  if (
                    !generateDocsForColumn ||
                    !generateDocsForColumn.column_descriptions
                  ) {
                    // nothing to do if nothing happened
                    return;
                  }
                  //doing this so we dont have to loop over the dict every time
                  const generatedColumns = Object.fromEntries(
                    generateDocsForColumn.column_descriptions!.map((d) => [
                      d.column_name,
                      d.column_description,
                    ]),
                  );

                  const columns: DBTDocumentationColumn[] =
                    this.documentation!.columns.reduce((agg, current) => {
                      agg.push({
                        ...current,
                        description:
                          generatedColumns[current.name] || current.description,
                        generated: generatedColumns[current.name] !== undefined,
                      });
                      return agg;
                    }, [] as DBTDocumentationColumn[]);

                  this.documentation = {
                    ...this.documentation!,
                    columns: columns,
                  };
                  this.transmitData();
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    "An unexpected error occurred while generating documentation: " +
                      error,
                  );
                  this.telemetry.sendTelemetryError(
                    "generateDocsForColumnError",
                    error,
                  );
                }
              },
            );
            break;
          case "sendFeedback":
            window.withProgress(
              {
                title: "Sending feedback",
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                try {
                  await this.altimateRequest.sendFeedback({
                    data: message.data,
                    feedback_src: "extension",
                    feedback_text: message.comment,
                    feedback_value: message.rating,
                  });
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    "An unexpected error occurred while sending feedback: " +
                      error,
                  );
                  this.telemetry.sendTelemetryError(
                    "generateDocsSendFeedbackError",
                    error,
                  );
                }
              },
            );
        }
      },
      null,
      this._disposables,
    );
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    this.documentation = await this.getDocumentation();
    if (this._panel) {
      this.transmitData();
      this.updateGraphStyle();
    }
  }
}

function getHtml(webview: Webview, extensionUri: Uri) {
  const indexPath = getUri(webview, extensionUri, [
    "docs_edit_panel",
    "index.html",
  ]);
  const resourceDir = getUri(webview, extensionUri, ["docs_edit_panel"]);
  const theme = [
    ColorThemeKind.Light,
    ColorThemeKind.HighContrastLight,
  ].includes(window.activeColorTheme.kind)
    ? "light"
    : "dark";
  return readFileSync(indexPath.fsPath)
    .toString()
    .replace(/__ROOT__/g, resourceDir.toString())
    .replace(/__THEME__/g, theme)
    .replace(/__NONCE__/g, getNonce())
    .replace(/__CSPSOURCE__/g, webview.cspSource);
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}
