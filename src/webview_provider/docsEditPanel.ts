import { existsSync, readFileSync, writeFileSync } from "fs";
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
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import path = require("path");
import { PythonException } from "python-bridge";
import { TelemetryService } from "../telemetry";
import { AltimateRequest } from "../altimate";
import { stringify, parse } from "yaml";
import { NewDocsGenPanel } from "./newDocsGenPanel";
import { DBTProject } from "../manifest/dbtProject";
import { DocGenService } from "../services/docGenService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import {
  CustomPythonException,
  CustomUnknownException,
} from "../dbt_client/exception";
import { TestMetaData } from "../domain";

export enum Source {
  YAML = "YAML",
  DATABASE = "DATABASE",
}

interface MetadataColumn {
  name: string;
  type?: string;
}

interface DBTDocumentationColumn extends MetadataColumn {
  description?: string;
  generated: boolean;
  source: Source;
}

export interface DBTDocumentation {
  name: string;
  description: string;
  columns: DBTDocumentationColumn[];
  generated: boolean;
  aiEnabled: boolean;
  patchPath?: string;
}

export interface AIColumnDescription {
  name: string;
  description: string;
}

export interface DocsGenPanelView extends WebviewViewProvider {
  handleCommand(message: { command: string; args: any }): Promise<void> | void;
  resolveWebview(
    panel: WebviewView,
    context: WebviewViewResolveContext,
    token: CancellationToken,
  ): void;
}

@provideSingleton(DocsEditViewPanel)
export class DocsEditViewPanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.DocsEdit";
  private panel: WebviewView | undefined;
  private context: WebviewViewResolveContext<unknown> | undefined;
  private token: CancellationToken | undefined;
  private _panel: WebviewView | undefined = undefined;
  private documentation?: DBTDocumentation;
  private loadedFromManifest = false;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private _disposables: Disposable[] = [];
  private legacyDocsPanel = this;
  private onMessageDisposable: Disposable | undefined;

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimateRequest: AltimateRequest,
    private telemetry: TelemetryService,
    private newDocsPanel: NewDocsGenPanel,
    private docGenService: DocGenService,
    private terminal: DBTTerminal,
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
        this.documentation = undefined;
        if (event === undefined) {
          return;
        }
        this.documentation = await this.docGenService.getDocumentation(
          this.eventMap,
        );
        if (this._panel) {
          this.transmitData();
          this.updateGraphStyle();
        }
      },
    );

    this._disposables.push(
      workspace.onDidChangeConfiguration(
        (e) => {
          if (!e.affectsConfiguration("dbt.enableNewDocsPanel")) {
            return;
          }
          if (this._panel && this.context && this.token) {
            this.getPanel().resolveWebview(
              this._panel,
              this.context,
              this.token,
            );
          }
        },
        this,
        this._disposables,
      ),
    );
  }

  private getPanel() {
    const enableNewDocsPanel = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableNewDocsPanel", false);
    return enableNewDocsPanel ? this.newDocsPanel : this.legacyDocsPanel;
  }

  private getProject(): DBTProject | undefined {
    if (!window.activeTextEditor) {
      return undefined;
    }
    const currentFilePath = window.activeTextEditor.document.uri;
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
  }

  private async transmitError() {
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: "renderError",
      });
    }
  }

  private async transmitData() {
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: "renderDocumentation",
        docs: this.documentation,
        project: this.getProject()?.getProjectName(),
        testsEnabled: workspace
          .getConfiguration("dbt")
          .get<boolean>("enableTests", false),
      });
    }
  }

  private async transmitColumns(columns: MetadataColumn[]) {
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: "renderColumnsFromMetadataFetch",
        columns,
      });
    }
  }

  private async transmitConfig() {
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: "updateConfig",
        config: { aiEnabled: this.altimateRequest.enabled() },
      });
    }
  }

  private async updateGraphStyle() {
    const theme = [
      ColorThemeKind.Light,
      ColorThemeKind.HighContrastLight,
    ].includes(window.activeColorTheme.kind)
      ? "light"
      : "dark";

    if (this._panel) {
      await this._panel.webview.postMessage({
        command: "setStylesByTheme",
        theme: theme,
      });
    }
  }
  public async resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext,
    token: CancellationToken,
  ) {
    this.panel = panel;
    this.context = context;
    this.token = token;
    this._panel = panel;
    this.getPanel().resolveWebview(panel, context, token);
    this.setupWebviewHooks(context);
    this.transmitConfig();
    this.documentation = await this.docGenService.getDocumentation(
      this.eventMap,
    );
    this.transmitData();
  }

  public async resolveWebview(
    panel: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken,
  ) {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
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

  private init = async () => {
    await this.resolveWebviewView(this.panel!, this.context!, this.token!);
  };

  private getTestDataByColumn(message: any, columnName: string) {
    const tests = message.tests as undefined | TestMetaData[];

    if (!tests?.length) {
      this.terminal.debug("No test data passed");
      return;
    }

    const columnTests = tests.filter((test) => test.column_name === columnName);

    const filteredTests = columnTests
      .map((test, i) => {
        // If relationships test, set field and to
        if (
          test.test_metadata?.name === "relationships" &&
          test.test_metadata.kwargs.field &&
          test.test_metadata.kwargs.to
        ) {
          const { to, field } = test.test_metadata.kwargs;
          return {
            relationships: {
              field,
              to,
            },
          };
        }

        // set values if test is accepted_values
        if (test.test_metadata?.name === "accepted_values") {
          return {
            accepted_values: { values: test.test_metadata.kwargs.values },
          };
        }
        return test.test_metadata?.name;
      })
      // Filter duplicate values
      .reduce((acc: Record<string, any>, test) => {
        if (!test) {
          return acc;
        }
        if (typeof test === "string") {
          acc[test] = test;
          return acc;
        }

        if (test.accepted_values) {
          acc["accepted_values"] = { accepted_values: test.accepted_values };
          return acc;
        }

        if (test.relationships) {
          acc["relationships"] = { relationships: test.relationships };
          return acc;
        }
        return acc;
      }, {});

    const data = Object.values(filteredTests);
    this.terminal.info("tests", "test data", false, data, columnName);

    if (!data.length) {
      return;
    }
    return {
      tests: data,
    };
  }

  private setupWebviewHooks(context: WebviewViewResolveContext) {
    // Clear this listener before subscribing again
    if (this.onMessageDisposable) {
      this.onMessageDisposable.dispose();
      this.onMessageDisposable = undefined;
    }
    this.onMessageDisposable = this._panel!.webview.onDidReceiveMessage(
      async (message) => {
        this.terminal.debug(
          "docsEditPanel:setupWebviewHooks",
          "onDidReceiveMessage",
          message,
        );
        if (
          window.activeTextEditor === undefined ||
          this.eventMap === undefined
        ) {
          return undefined;
        }
        const queryText = window.activeTextEditor.document.getText();
        const currentFilePath = window.activeTextEditor.document.uri;
        const project = this.getProject();
        if (project === undefined) {
          return undefined;
        }

        const { command, syncRequestId, args } = message;
        switch (command) {
          case "enableNewDocsPanel":
            await workspace
              .getConfiguration("dbt")
              .update("enableNewDocsPanel", message.enable);
            this.init();
            this.telemetry.sendTelemetryEvent(
              message.enable ? "NewDocsPanelEnabled" : "NewDocsPanelDisabled",
            );
            break;
          case "fetchMetadataFromDatabase":
            this.telemetry.sendTelemetryEvent("syncColumnsFromDatabaseForDocs");
            window.withProgress(
              {
                title: "Syncing columns with metadata from database",
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                const modelName = path.basename(currentFilePath.fsPath, ".sql");
                try {
                  const columnsInRelation =
                    await project.getColumnsOfModel(modelName);
                  const columns = columnsInRelation.map((column) => {
                    return {
                      name: column.column,
                      type: column.dtype,
                    };
                  });
                  this.transmitColumns(columns);
                  if (syncRequestId) {
                    this._panel!.webview.postMessage({
                      command: "response",
                      args: {
                        syncRequestId,
                        body: {
                          columns,
                        },
                        status: true,
                      },
                    });
                  }
                } catch (exc) {
                  this.transmitError();
                  if (exc instanceof PythonException) {
                    window.showErrorMessage(
                      `An error occured while fetching metadata for ${modelName} from the database: ` +
                        exc.exception.message,
                    );
                    this.terminal.error(
                      "docsEditPanelLoadPythonError",
                      `An error occured while fetching metadata for ${modelName} from the database`,
                      exc,
                    );
                    return;
                  }
                  window.showErrorMessage(
                    `An error occured while fetching metadata for ${modelName} from the database: ` +
                      exc,
                  );
                  this.terminal.error(
                    "docsEditPanelLoadError",
                    `An error occured while fetching metadata for ${modelName} from the database`,
                    exc,
                  );
                  if (syncRequestId) {
                    this._panel!.webview.postMessage({
                      command: "response",
                      args: {
                        syncRequestId,
                        body: {},
                        status: false,
                      },
                    });
                  }
                }
              },
            );

            break;
          case "generateDocsForModel":
            this.docGenService.generateDocsForModel({
              queryText,
              documentation: this.documentation,
              message,
              panel: this._panel,
              project,
            });
            break;
          case "generateDocsForColumn":
            await this.docGenService.generateDocsForColumns({
              documentation: this.documentation,
              panel: this._panel,
              message,
              project,
            });
            break;
          case "sendFeedback":
            this.docGenService.sendFeedback({
              queryText,
              message,
              eventMap: this.eventMap,
              panel: this._panel,
            });
            break;
          case "saveDocumentation":
            this.telemetry.sendTelemetryEvent("saveDocumentation");
            let patchPath = message.patchPath;
            window.withProgress(
              {
                title: "Saving documentation",
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                try {
                  if (!patchPath) {
                    switch (message.dialogType) {
                      case "Existing file":
                        const openDialog = await window.showOpenDialog({
                          filters: { Yaml: ["yml"] },
                          canSelectMany: false,
                        });
                        if (
                          openDialog === undefined ||
                          openDialog.length === 0
                        ) {
                          return;
                        }
                        patchPath = openDialog[0].fsPath;
                        break;
                      case "New file":
                        const saveDialog = await window.showSaveDialog({
                          filters: { Yaml: ["yml"] },
                        });
                        if (!saveDialog) {
                          return;
                        }
                        patchPath = saveDialog.fsPath;
                        break;
                    }
                  } else {
                    // the location comes from the manifest, parse it
                    patchPath = path.join(
                      project.projectRoot.fsPath,
                      patchPath.split("://")[1],
                    );
                  }
                  // check if file exists, if not create an empty file
                  if (!existsSync(patchPath)) {
                    writeFileSync(patchPath, "");
                  }

                  const docFile: string =
                    readFileSync(patchPath).toString("utf8");
                  const parsedDocFile =
                    parse(docFile, {
                      strict: false,
                      uniqueKeys: false,
                      maxAliasCount: -1,
                    }) || {};
                  if (parsedDocFile.models === undefined) {
                    // this is a fresh file or one without models, so init the models
                    parsedDocFile.models = [];
                  }
                  if (
                    parsedDocFile.models.find(
                      (model: any) => model.name === message.name,
                    ) === undefined
                  ) {
                    // there is a models section but the model does not exist yet.
                    parsedDocFile.models.push({
                      name: message.name,
                      description: message.description,
                      columns: message.columns.map((column: any) => ({
                        name: column.name,
                        description: column.description,
                        ...(column?.type ? { data_type: column.type } : {}),
                        ...this.getTestDataByColumn(message, column.name),
                      })),
                    });
                  } else {
                    // The model already exists
                    parsedDocFile.models = parsedDocFile.models.map(
                      (model: any) => {
                        if (model.name === message.name) {
                          model.description = message.description;
                          model.columns = message.columns.map((column: any) => {
                            const existingColumn =
                              model.columns &&
                              model.columns.find(
                                (yamlColumn: any) =>
                                  yamlColumn.name === column.name,
                              );
                            if (existingColumn !== undefined) {
                              return {
                                ...existingColumn,
                                ...(column?.type && !existingColumn?.data_type
                                  ? { data_type: column.type }
                                  : {}),
                                description: column.description,
                                ...this.getTestDataByColumn(
                                  message,
                                  column.name,
                                ),
                              };
                            } else {
                              return {
                                name: column.name,
                                description: column.description,
                                ...(column?.type
                                  ? { data_type: column.type }
                                  : {}),
                                ...this.getTestDataByColumn(
                                  message,
                                  column.name,
                                ),
                              };
                            }
                          });
                        }
                        return model;
                      },
                    );
                  }
                  // Force reload from manifest after manifest refresh
                  this.loadedFromManifest = false;
                  writeFileSync(patchPath, stringify(parsedDocFile));
                  this.documentation =
                    await this.docGenService.getDocumentation(this.eventMap);
                  const tests =
                    await this.docGenService.getTestsForCurrentModel(
                      this.eventMap,
                    );
                  if (syncRequestId) {
                    this._panel!.webview.postMessage({
                      command: "response",
                      args: {
                        syncRequestId,
                        body: {
                          saved: true,
                          tests,
                        },
                        status: true,
                      },
                    });
                  }
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    `Could not save documentation to ${patchPath}: ${error}`,
                  );
                  this.terminal.error(
                    "saveDocumentationError",
                    `Could not save documentation to ${patchPath}`,
                    error,
                  );
                  if (syncRequestId) {
                    this._panel!.webview.postMessage({
                      command: "response",
                      args: {
                        syncRequestId,
                        body: {
                          saved: false,
                        },
                        status: true,
                      },
                    });
                  }
                }
              },
            );
            break;
        }
      },
      null,
      this._disposables,
    );
    const sendDocPanelViewEvent = () => {
      if (this._panel!.visible) {
        this.telemetry.sendTelemetryEvent("DocsPanelActive");
      }
    };
    sendDocPanelViewEvent();
    this._panel!.onDidChangeVisibility(sendDocPanelViewEvent);
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    if (this.documentation !== undefined && this.loadedFromManifest) {
      // don't reload doc panel if documentation is already set, otherwise the
      //  documentation will be overwritten by the one coming from the manifest
      return;
    }
    this.documentation = await this.docGenService.getDocumentation(
      this.eventMap,
    );
    this.loadedFromManifest = true;
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
