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

interface DBTDocumentationColumn {
  name: string;
  type: string;
  description: string;
}

interface DBTDocumentation {
  compiledSql: string;
  modelName: string;
  modelDocumentation: string;
  columns: DBTDocumentationColumn[];
}

interface AltimateDocsGenerateResponse {
  column_descriptions: {
    column_name: string;
    column_description: string;
  }[];
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

  private async getDocumentation() {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return undefined;
    }

    const currentFilePath = window.activeTextEditor.document.uri;
    const project = this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (project === undefined) {
      return undefined;
    }
    const modelName = path.basename(currentFilePath.fsPath, ".sql");
    // get metadata from db
    try {
      const columnsInRelation = await project.getColumnsInRelation(modelName);
      // get documentation from manifest
      const event = this.eventMap.get(project.projectRoot.fsPath);
      if (event === undefined) {
        return undefined;
      }
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
        modelName,
        modelDocumentation: currentNode.description,
        compiledSql: compiledSql,
        columns: columnsInRelation.map((column) => {
          return {
            name: column.column,
            type: column.dtype,
            description: docColumns.hasOwnProperty(column.column)
              ? docColumns[column.column]?.description
              : "",
          };
        }),
      };
    } catch (exc) {
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
          case "generateDocsForModel":
            window.withProgress(
              {
                title: message,
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                await new Promise((timer) => setTimeout(timer, 3000));
              },
            );
            break;
          case "generateDocsForColumn":
            window.withProgress(
              {
                title: message,
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                try {
                  const generateDocsForColumn =
                    await this.altimateRequest.fetch<AltimateDocsGenerateResponse>(
                      "dbt/v1",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          columns: [message.columnName],
                          dbt_model: {
                            model_name: this.documentation?.modelName,
                            model_description:
                              this.documentation?.modelDocumentation,
                            compiled_sql: this.documentation?.compiledSql,
                            schedule: null,
                            columns: this.documentation?.columns.map(
                              (column) => ({
                                column_name: column.name,
                                description: column.description,
                                data_type: column.type,
                                modelName: this.documentation?.modelName,
                              }),
                            ),
                            dependencies: [],
                          },
                          gen_model_description: false,
                        }),
                      },
                      120000, // TODO: this should be a more realistic timeout
                    );

                  const columns: DBTDocumentationColumn[] =
                    this.documentation!.columns.reduce((agg, current) => {
                      const match =
                        generateDocsForColumn!.column_descriptions.find(
                          (col) => col.column_name === current.name,
                        );
                      if (match === undefined) {
                        throw Error("TODO");
                      }
                      agg.push({
                        ...current,
                        description: match?.column_description,
                      });
                      return agg;
                    }, [] as DBTDocumentationColumn[]);

                  this.documentation = {
                    ...this.documentation!,
                    columns: columns,
                  };
                  this.transmitData();
                } catch (error) {
                  window.showErrorMessage(
                    "An unexpected error occurred while generating documentation: " +
                      error,
                  );
                }
              },
            );

            break;
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
