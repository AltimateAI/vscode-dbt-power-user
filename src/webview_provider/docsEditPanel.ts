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

enum Source {
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

interface DBTDocumentation {
  name: string;
  description: string;
  columns: DBTDocumentationColumn[];
  generated: boolean;
  aiEnabled: boolean;
  patchPath?: string;
}

interface AIColumnDescription {
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

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimateRequest: AltimateRequest,
    private telemetry: TelemetryService,
    private newDocsPanel: NewDocsGenPanel,
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
        this.documentation = await this.getDocumentation();
        if (this._panel) {
          this.transmitData();
          this.updateGraphStyle();
        }
      },
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
  private async getDocumentation(): Promise<DBTDocumentation | undefined> {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return undefined;
    }

    const currentFilePath = window.activeTextEditor.document.uri;
    const project = this.getProject();
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
    return {
      aiEnabled: this.altimateRequest.enabled(),
      name: modelName,
      patchPath: currentNode.patch_path,
      description: currentNode.description,
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

  private async transmitAIGeneratedModelDocs(
    description: string,
    syncRequestId?: string,
  ) {
    if (this._panel) {
      const result = syncRequestId
        ? {
            command: "response",
            args: { body: { description }, syncRequestId, status: true },
          }
        : {
            command: "renderAIGeneratedModelDocs",
            description,
          };
      await this._panel.webview.postMessage(result);
    }
  }

  private async transmitAIGeneratedColumnDocs(
    generatedColumnDescriptions: AIColumnDescription[],
    syncRequestId?: string,
  ) {
    if (this._panel) {
      const result = syncRequestId
        ? {
            command: "response",
            args: {
              body: { columns: generatedColumnDescriptions },
              syncRequestId,
              status: true,
            },
          }
        : {
            command: "renderAIGeneratedColumnDocs",
            columns: generatedColumnDescriptions,
          };
      await this._panel.webview.postMessage(result);
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
    this.documentation = await this.getDocumentation();
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

  private async generateDocsForColumn(
    compiledSql: string | undefined,
    adapter: string,
    message: any,
  ) {
    if (!this.documentation) {
      return null;
    }
    const enableNewDocsPanel = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableNewDocsPanel", false);

    const columns = message.columnName
      ? [message.columnName]
      : message.columnNames;

    const baseRequest = {
      columns,
      dbt_model: {
        model_name: this.documentation.name,
        model_description: message.description,
        compiled_sql: compiledSql,
        columns: message.columns.map((column: any) => ({
          column_name: column.name,
          description: column.description,
          data_type: column.type,
        })),
        adapter,
      },
      gen_model_description: false,
    } as unknown as Parameters<
      typeof this.altimateRequest.generateModelDocs
    >["0"];

    const result = enableNewDocsPanel
      ? await this.altimateRequest.generateModelDocsV2({
          ...baseRequest,
          user_instructions: {
            ...message.user_instructions,
            prompt_hint: message.user_instructions.prompt_hint || "generate",
          },
        })
      : await this.altimateRequest.generateModelDocs(baseRequest);

    return result;
  }
  private async generateDocsForModel(
    compiledSql: string | undefined,
    adapter: string,
    message: any,
  ) {
    const enableNewDocsPanel = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableNewDocsPanel", false);

    const baseRequest = {
      columns: [],
      dbt_model: {
        model_name: this.documentation?.name,
        model_description: message.description,
        compiled_sql: compiledSql,
        columns: message.columns.map((column: any) => ({
          column_name: column.name,
          description: column.description,
          data_type: column.type,
          modelName: this.documentation?.name,
        })),
        adapter,
      },
      prompt_hint: message.promptHint || "generate",
      gen_model_description: true,
    } as unknown as Parameters<
      typeof this.altimateRequest.generateModelDocs
    >["0"];
    const generateDocsForModel = enableNewDocsPanel
      ? await this.altimateRequest.generateModelDocsV2({
          ...baseRequest,
          user_instructions: {
            ...message.user_instructions,
            prompt_hint: message.user_instructions.prompt_hint || "generate",
          },
        })
      : await this.altimateRequest.generateModelDocs(baseRequest);

    return generateDocsForModel;
  }
  private setupWebviewHooks(context: WebviewViewResolveContext) {
    this._panel!.webview.onDidReceiveMessage(
      async (message) => {
        console.log(message);
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

        const { command, args } = message;
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
                } catch (exc) {
                  this.transmitError();
                  if (exc instanceof PythonException) {
                    window.showErrorMessage(
                      `An error occured while fetching metadata for ${modelName} from the database: ` +
                        exc.exception.message,
                    );
                    this.telemetry.sendTelemetryError(
                      "docsEditPanelLoadPythonError",
                      exc,
                    );
                    return;
                  }
                  window.showErrorMessage(
                    `An error occured while fetching metadata for ${modelName} from the database: ` +
                      exc,
                  );
                  this.telemetry.sendTelemetryError(
                    "docsEditPanelLoadError",
                    exc,
                  );
                }
              },
            );

            break;
          case "generateDocsForModel":
            if (!this.altimateRequest.handlePreviewFeatures()) {
              return;
            }
            this.telemetry.sendTelemetryEvent("altimateGenerateDocsForModel");
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
                  const compiledSql =
                    await project.unsafeCompileQuery(queryText);
                  const generateDocsForModel = await this.generateDocsForModel(
                    compiledSql,
                    project.getAdapterType(),
                    message,
                  );

                  if (
                    !generateDocsForModel ||
                    !generateDocsForModel.model_description
                  ) {
                    // nothing to do if nothing happened
                    return;
                  }
                  this.transmitAIGeneratedModelDocs(
                    generateDocsForModel.model_description,
                    message.syncRequestId,
                  );
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    extendErrorWithSupportLinks(
                      "An unexpected error occurred while generating documentation: " +
                        error,
                    ),
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
            this.telemetry.sendTelemetryEvent("altimateGenerateDocsForColumn");
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
                  const compiledSql =
                    await project.unsafeCompileQuery(queryText);
                  const generatedDocsForColumn =
                    await this.generateDocsForColumn(
                      compiledSql,
                      project.getAdapterType(),
                      message,
                    );

                  if (
                    !generatedDocsForColumn ||
                    !generatedDocsForColumn.column_descriptions
                  ) {
                    // nothing to do if nothing happened
                    return;
                  }
                  this.transmitAIGeneratedColumnDocs(
                    generatedDocsForColumn.column_descriptions.map((entry) => ({
                      name: entry.column_name,
                      description: entry.column_description,
                    })),
                    message.syncRequestId,
                  );
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    extendErrorWithSupportLinks(
                      "An unexpected error occurred while generating documentation: " +
                        error,
                    ),
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
            this.telemetry.sendTelemetryEvent(
              "altimateGenerateDocsSendFeedback",
            );
            window.withProgress(
              {
                title: "Sending feedback",
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                try {
                  const compiledSql =
                    await project.unsafeCompileQuery(queryText);
                  const request = message.data;
                  request["feedback_text"] = message.comment;
                  request["additional_prompt_inputs"] = {
                    model_name: this.documentation?.name,
                    model_description: this.documentation?.description,
                    compiled_sql: compiledSql,
                    columns: this.documentation?.columns.map((column) => ({
                      column_name: column.name,
                      description: column.description,
                      data_type: column.type,
                    })),
                  };
                  await this.altimateRequest.sendFeedback({
                    data: request,
                    feedback_src: "dbtpu-extension",
                    feedback_text: message.comment,
                    feedback_value: message.rating,
                  });
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    extendErrorWithSupportLinks(
                      "An unexpected error occurred while sending feedback: " +
                        error,
                    ),
                  );
                  this.telemetry.sendTelemetryError(
                    "altimateGenerateDocsSendFeedbackError",
                    error,
                  );
                }
              },
            );
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
                                description: column.description,
                              };
                            } else {
                              return {
                                name: column.name,
                                description: column.description,
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
                  this.documentation = await this.getDocumentation();
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    `Could not save documentation to ${patchPath}: ${error}`,
                  );
                  this.telemetry.sendTelemetryError(
                    "saveDocumentationError",
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
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    if (this.documentation !== undefined && this.loadedFromManifest) {
      // don't reload doc panel if documentation is already set, otherwise the
      //  documentation will be overwritten by the one coming from the manifest
      return;
    }
    this.documentation = await this.getDocumentation();
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
