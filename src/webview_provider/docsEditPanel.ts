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
import {
  getColumnNameByCase,
  getColumnTestConfigFromYml,
  isAcceptedValues,
  isColumnNameEqual,
  isQuotedIdentifier,
  isRelationship,
  provideSingleton,
} from "../utils";
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
  TestMetaData,
  TestMetadataAcceptedValues,
  TestMetadataRelationships,
} from "../domain";
import { DbtTestService } from "../services/dbtTestService";
import { gte } from "semver";
import { TelemetryEvents } from "../telemetry/events";

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
    private dbtTestService: DbtTestService,
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
        if (this._panel) {
          this.transmitData();
          this.updateGraphStyle();
        }
      },
    );
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
    const { documentation, message } =
      await this.docGenService.getDocumentationForCurrentActiveFile();
    this.documentation = documentation;
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: "renderDocumentation",
        docs: this.documentation,
        missingDocumentationMessage: message,
        tests: await this.dbtTestService.getTestsForCurrentModel(),
        project: this.getProject()?.getProjectName(),
        collaborationEnabled: workspace
          .getConfiguration("dbt")
          .get<boolean>("enableCollaboration", false),
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
    this.newDocsPanel.resolveWebview(panel, context, token);
    this.setupWebviewHooks(context);
    this.transmitConfig();
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

  private getTestDataByModel(message: any, modelName: string) {
    const tests = message.updatedTests as undefined | TestMetaData[];

    if (!tests?.length) {
      this.terminal.debug(
        "docsEditViewPanel:getTestDataByModel",
        "No test data passed",
      );
      return;
    }

    const updatedTests = tests.filter((test) => {
      const modelNameInTest = test.test_metadata?.kwargs.model;
      if (test.column_name || !modelNameInTest) {
        return false;
      }
      if (modelNameInTest === modelName) {
        return true;
      }
      // model name could be {{ get_where_subquery(ref('dim_hosts_cleansed')) }}
      if (modelNameInTest.match(/'([^']+)'/)?.[1] === modelName) {
        return true;
      }
      return false;
    });

    const finalTests = updatedTests
      .map((test) => {
        if (!test?.test_metadata) {
          return null;
        }
        const { name, namespace, kwargs } = test.test_metadata;
        const fullName: string = namespace ? `${namespace}.${name}` : name;
        // Add extra config from external packages or test macros
        const testMetaKwargs = this.getTestMetadataKwArgs(kwargs, fullName);
        return testMetaKwargs || fullName;
      })
      .filter((t) => Boolean(t));
    return finalTests.length ? finalTests : undefined;
  }

  private getTestMetadataKwArgs(
    kwargs: TestMetadataAcceptedValues | TestMetadataRelationships,
    fullName: string,
  ) {
    if (kwargs) {
      const rest = Object.entries(kwargs).reduce(
        (acc: Record<string, unknown>, [key, value]) => {
          // Ignore these fields as it will be added by default
          if (key === "column_name" || key === "model") {
            return acc;
          }

          acc[key] = value;
          return acc;
        },
        {},
      );
      if (Object.keys(rest)?.length) {
        return {
          [fullName]: rest,
        };
      }
    }
  }
  private getTestDataByColumn(
    message: any,
    columnNameFromWebview: string,
    project: DBTProject,
    existingColumn?: any,
  ) {
    const tests = message.updatedTests as undefined | TestMetaData[];

    if (!tests?.length) {
      this.terminal.debug(
        "docsEditViewPanel:getTestDataByColumn",
        "No test data passed",
      );
      return;
    }

    const columnTests = tests.filter((test) =>
      isColumnNameEqual(test.column_name, columnNameFromWebview),
    );

    // No tests for this column - may be all deleted
    if (!columnTests.length) {
      return;
    }

    const data = columnTests.map((test) => {
      if (!test.test_metadata) {
        return null;
      }
      const { name, namespace, kwargs } = test.test_metadata;
      const testFullName: string = namespace ? `${namespace}.${name}` : name;

      const columnTestConfigFromYml = getColumnTestConfigFromYml(
        existingColumn?.tests,
        kwargs,
        testFullName,
      );
      // If relationships test, set field and to
      if (isRelationship(kwargs)) {
        const { to, field } = kwargs;
        return {
          relationships: {
            ...columnTestConfigFromYml,
            field,
            to,
          },
        };
      }

      // set values if test is accepted_values
      if (isAcceptedValues(kwargs)) {
        return {
          accepted_values: {
            ...columnTestConfigFromYml,
            values: kwargs.values,
          },
        };
      }

      if (columnTestConfigFromYml) {
        return columnTestConfigFromYml;
      }

      // Add extra config from external packages or test macros
      const testMetaKwargs = this.getTestMetadataKwArgs(kwargs, testFullName);
      return testMetaKwargs || testFullName;
    });

    this.terminal.debug(
      "docsEditViewPanel:getTestDataByColumn",
      "test data",
      false,
      data,
      columnNameFromWebview,
    );

    if (!data.length) {
      return;
    }
    const dbtVersion = project.getDBTVersion();
    if (
      dbtVersion &&
      gte(dbtVersion.join("."), "1.8.0") && // Compare versions
      existingColumn?.name === columnNameFromWebview &&
      existingColumn?.tests === undefined
    ) {
      return {
        data_tests: data,
      };
    }

    return {
      tests: data,
    };
  }

  private modifyColumnNames = (
    columns: { name: string }[],
    existingColumnNames: string[],
  ) => {
    return columns.map((c) => {
      // find a column from schema.yml with same name ignoring case
      const existingColumn = existingColumnNames.find(
        (name) => name.toLowerCase() === c.name.toLowerCase(),
      );
      // column exists with matching name, so use name from schema.yml
      if (existingColumn) {
        return { ...c, name: existingColumn };
      }

      // new column, save the name by checking the config
      return {
        ...c,
        name: c.name,
      };
    });
  };

  private convertColumnNamesByCaseConfig(
    columns: { name: string }[],
    modelName: string,
    project: DBTProject,
  ) {
    if (!columns.length) {
      return [];
    }

    const patchPath = this.documentation?.patchPath;
    // if new project, and no schema.yml
    if (!patchPath) {
      return columns;
    }

    const docFile: string = readFileSync(
      path.join(project.projectRoot.fsPath, patchPath.split("://")[1]),
    ).toString("utf8");
    const parsedDocFile =
      parse(docFile, {
        strict: false,
        uniqueKeys: false,
        maxAliasCount: -1,
      }) || {};

    const model = parsedDocFile.models?.find(
      (model: any) => model.name === modelName,
    );

    // new model and does not exist in schema.yml
    if (!model) {
      return columns;
    }

    const existingColumnNames =
      (model.columns as { name: string }[])?.map((c) => c.name) || [];

    return this.modifyColumnNames(columns, existingColumnNames);
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
          case "fetchMetadataFromDatabase":
            this.telemetry.startTelemetryEvent(
              TelemetryEvents["DocumentationEditor/SyncWithDBClick"],
            );
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
                  const columns = this.convertColumnNamesByCaseConfig(
                    columnsInRelation.map((column) => {
                      return {
                        name: column.column,
                        type: column.dtype.toLowerCase(),
                      };
                    }),
                    modelName,
                    project,
                  );
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
                  this.telemetry.endTelemetryEvent(
                    TelemetryEvents["DocumentationEditor/SyncWithDBClick"],
                  );
                } catch (exc) {
                  this.transmitError();
                  this.telemetry.endTelemetryEvent(
                    TelemetryEvents["DocumentationEditor/SyncWithDBClick"],
                    exc,
                  );
                  if (exc instanceof PythonException) {
                    window.showErrorMessage(
                      `An error occured while fetching metadata for ${modelName} from the database: ` +
                        exc.exception.message,
                    );
                    this.terminal.error(
                      "docsEditPanelLoadPythonError",
                      `An error occured while fetching metadata for ${modelName} from the database`,
                      exc,
                      false,
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
                    false,
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
              columnIndexCount: undefined,
              isBulkGen: false,
            });
            break;
          case "generateDocsForColumn":
            await this.docGenService.generateDocsForColumns({
              documentation: this.documentation,
              panel: this._panel,
              message,
              project,
              isBulkGen: message.isBulkGen, // TODO: check this with vipul/surya
            });
            break;
          case "sendFeedback":
            this.docGenService.sendFeedback({
              queryText,
              message,
              panel: this._panel,
            });
            break;
          case "saveDocumentation":
            this.telemetry.sendTelemetryEvent(
              TelemetryEvents["DocumentationEditor/SaveClick"],
            );
            let patchPath = message.patchPath;
            window.withProgress(
              {
                title: "Saving documentation",
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                try {
                  const projectByFilePath =
                    this.dbtProjectContainer.findDBTProject(
                      Uri.file(message.filePath),
                    );
                  if (!projectByFilePath) {
                    throw new Error(
                      "Unable to find project for saving documentation",
                    );
                  }

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
                        this.telemetry.sendTelemetryEvent(
                          TelemetryEvents[
                            "DocumentationEditor/SaveNewFilePathSelect"
                          ],
                        );
                        patchPath = saveDialog.fsPath;
                        break;
                    }
                  } else {
                    // the location comes from the manifest, parse it
                    patchPath = path.join(
                      projectByFilePath.projectRoot.fsPath,
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
                      description: message.description || undefined,
                      columns: message.columns.map((column: any) => {
                        const name = getColumnNameByCase(
                          column.name,
                          projectByFilePath.getAdapterType(),
                        );
                        return {
                          name,
                          description: column.description || undefined,
                          data_type: column.type?.toLowerCase(),
                          ...this.getTestDataByColumn(
                            message,
                            column.name,
                            project,
                          ),
                          ...(isQuotedIdentifier(
                            column.name,
                            projectByFilePath.getAdapterType(),
                          )
                            ? { quote: true }
                            : undefined),
                        };
                      }),
                    });
                  } else {
                    // The model already exists
                    parsedDocFile.models = parsedDocFile.models.map(
                      (model: any) => {
                        if (model.name === message.name) {
                          model.description = message.description || undefined;
                          model.tests = this.getTestDataByModel(
                            message,
                            model.name,
                          );
                          model.columns = message.columns.map((column: any) => {
                            const existingColumn =
                              model.columns &&
                              model.columns.find((yamlColumn: any) =>
                                isColumnNameEqual(yamlColumn.name, column.name),
                              );
                            if (existingColumn !== undefined) {
                              // ignore tests, data_tests from existing column, as it will be recreated in `getTestDataByColumn`
                              const { tests, data_tests, ...rest } =
                                existingColumn;
                              return {
                                ...rest,
                                name: existingColumn.name,
                                data_type: (
                                  rest.data_type || column.type
                                )?.toLowerCase(),
                                description: column.description || undefined,
                                ...this.getTestDataByColumn(
                                  message,
                                  column.name,
                                  project,
                                  existingColumn,
                                ),
                              };
                            } else {
                              const name = getColumnNameByCase(
                                column.name,
                                projectByFilePath.getAdapterType(),
                              );
                              return {
                                name,
                                description: column.description || undefined,
                                data_type: column.type?.toLowerCase(),
                                ...this.getTestDataByColumn(
                                  message,
                                  column.name,
                                  project,
                                ),
                                ...(isQuotedIdentifier(
                                  column.name,
                                  projectByFilePath.getAdapterType(),
                                )
                                  ? { quote: true }
                                  : undefined),
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
                  this.documentation = (
                    await this.docGenService.getDocumentationForCurrentActiveFile()
                  ).documentation;
                  const tests =
                    await this.dbtTestService.getTestsForCurrentModel();
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
                  this.telemetry.sendTelemetryError(
                    TelemetryEvents["DocumentationEditor/SaveError"],
                    error,
                  );
                  window.showErrorMessage(
                    `Could not save documentation to ${patchPath}: ${error}`,
                  );
                  this.terminal.error(
                    "saveDocumentationError",
                    `Could not save documentation to ${patchPath}`,
                    error,
                    false,
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
