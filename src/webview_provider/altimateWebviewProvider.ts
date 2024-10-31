import {
  CancellationToken,
  CancellationTokenSource,
  commands,
  Disposable,
  env,
  ProgressLocation,
  Uri,
  Webview,
  WebviewOptions,
  WebviewPanel,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import path = require("path");
import {
  ManifestCacheProjectAddedEvent,
  ManifestCacheChangedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { AltimateRequest, ModelInfo, UserInputError } from "../altimate";
import { SharedStateService } from "../services/sharedStateService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { QueryManifestService } from "../services/queryManifestService";
import { PythonException } from "python-bridge";
import { UsersService } from "../services/usersService";
import { NotebookSchema } from "@lib";
import { DBTProject } from "@extension";
import { AbortError } from "node-fetch";
import { ColumnMetaData, GraphMetaMap } from "../domain";

const CAN_COMPILE_SQL_NODE = [
  DBTProject.RESOURCE_TYPE_MODEL,
  DBTProject.RESOURCE_TYPE_SNAPSHOT,
  DBTProject.RESOURCE_TYPE_ANALYSIS,
];
const canCompileSQL = (nodeType: string) =>
  CAN_COMPILE_SQL_NODE.includes(nodeType);

type Table = {
  label: string;
  table: string;
  url: string | undefined;
  downstreamCount: number;
  upstreamCount: number;
  nodeType: string;
  materialization?: string;
  tests: any[];
  isExternalProject: boolean;
  columns: { [columnName: string]: ColumnMetaData };
};

class DerivedCancellationTokenSource extends CancellationTokenSource {
  constructor(linkedToken: CancellationToken) {
    super();
    linkedToken.onCancellationRequested(() => {
      super.cancel();
    });
  }
}

export type UpdateConfigProps = {
  key: string;
  value: string | boolean | number;
  isPreviewFeature?: boolean;
};

export interface HandleCommandProps extends Record<string, unknown> {
  command: string;
  syncRequestId?: string;
}

export interface SharedStateEventEmitterProps {
  command: string;
  payload: Record<string, unknown>;
}

export interface SendMessageProps extends Record<string, unknown> {
  command: string;
  syncRequestId?: string;
  error?: string;
  data?: unknown;
}

/**
 * This class is responsible for rendering the webview
 * Each panel needs to have its own provider which extends this class with correct viewPath and description
 */
@provideSingleton(AltimateWebviewProvider)
export class AltimateWebviewProvider implements WebviewViewProvider {
  public viewType = "dbtPowerUser.Default";
  protected viewPath = "/"; // webview route path from AppRoutes.tsx
  protected panelDescription = "Altimate default webview";

  protected _panel: WebviewView | WebviewPanel | undefined = undefined;
  protected _webview: Webview | undefined = undefined;
  protected _disposables: Disposable[] = [];
  protected eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  // Flag to know if panel's webview is rendered and ready to receive message
  protected isWebviewReady = false;

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
  ) {
    this._disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
    );

    const t = this;
    this._disposables.push(
      emitterService.eventEmitter.event((d) =>
        t.onEvent(d as SharedStateEventEmitterProps),
      ),
    );

    workspace.onDidChangeConfiguration(
      (e) => {
        if (e.affectsConfiguration("dbt.enableTeammates")) {
          const isEnabled = workspace
            .getConfiguration("dbt")
            .get<boolean>("enableTeammates", false);
          const event = isEnabled ? "TeammatesEnabled" : "TeammatesDisabled";
          this.telemetry.sendTelemetryEvent(event);
          if (this._panel) {
            this.sendResponseToWebview({
              command: "teammatesUpdated",
              data: isEnabled,
            });
          }
        }
      },
      this,
      this._disposables,
    );
  }

  public isWebviewView(
    panel: WebviewPanel | WebviewView,
  ): panel is WebviewView {
    return (<WebviewView>panel).show !== undefined;
  }

  protected sendResponseToWebview({
    command,
    data,
    error,
    syncRequestId,
    ...rest
  }: SendMessageProps) {
    this._panel?.webview?.postMessage({
      command,
      args: {
        syncRequestId,
        body: data,
        status: !error,
        error,
      },
      ...rest,
    });
  }

  /**
   * common method to trigger the command and handle errors and send response to webview
   * @param syncRequestId
   * @param callback
   * @param command
   */
  protected async handleSyncRequestFromWebview(
    syncRequestId: string | undefined,
    callback: () => any,
    command: string,
    showErrorNotification?: boolean,
  ) {
    try {
      const response = await callback();

      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        data: response,
      });
    } catch (error) {
      const message =
        error instanceof PythonException
          ? error.exception.message
          : (error as Error).message;
      if (error instanceof UserInputError) {
        this.dbtTerminal.debug(command, message, error);
      } else {
        this.dbtTerminal.error(command, message, error);
      }
      if (showErrorNotification) {
        window.showErrorMessage(extendErrorWithSupportLinks(message));
      }
      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        error: message,
      });
    }
  }

  protected onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "stream:chunk":
        this.sendResponseToWebview({
          command: "response",
          syncRequestId: payload.syncRequestId as string | undefined,
          data: payload.body,
        });
        break;

      default:
        break;
    }
  }

  protected renderWebviewView(webview: Webview) {
    this._webview = webview;
    this._panel!.webview.onDidReceiveMessage(this.handleCommand, this, []);

    webview.html = this.getHtml(webview, this.dbtProjectContainer.extensionUri);
  }

  // typegaurd to UpdateConfigProps
  private isUpdateConfigProps(
    data: UpdateConfigProps | Record<string, unknown>,
  ): data is UpdateConfigProps {
    return (data as UpdateConfigProps).key !== undefined;
  }

  protected onWebviewReady() {
    this.isWebviewReady = true;
  }

  private async handleWarningMessage(
    params: {
      infoMessage: string;
      items: any[];
    },
    syncRequestId?: string,
  ) {
    const { infoMessage, items } = params;
    const result = await window.showWarningMessage(infoMessage, ...items);
    if (syncRequestId) {
      this.sendResponseToWebview({
        command: "response",
        data: result,
        syncRequestId,
      });
    }
  }

  protected async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    try {
      switch (command) {
        case "getTeammatesStatus": {
          const isEnabled = workspace
            .getConfiguration("dbt")
            .get<boolean>("enableTeammates", false);
          this.sendResponseToWebview({
            command: "teammatesUpdated",
            data: isEnabled,
          });
          break;
        }
        case "configEnabled":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return workspace
                .getConfiguration(params.section as string)
                .get(params.config as string);
            },
            command,
            true,
          );
          break;
        case "deleteNotebook":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.altimateRequest.deleteNotebook(
                params.notebookId as number,
              );
            },
            command,
            true,
          );
          break;
        case "updateNotebook":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            async () => {
              const { notebookId, name, data } = params as {
                notebookId: number;
                name: string;
                data?: NotebookSchema;
              };
              return await this.altimateRequest.updateNotebook(notebookId, {
                name,
                data,
              });
            },
            command,
            true,
          );
          break;
        case "openNewNotebook":
          commands.executeCommand(
            "dbtPowerUser.createDatapilotNotebook",
            params,
          );
          break;
        case "setToWorkspaceState":
          this.dbtProjectContainer.setToWorkspaceState(
            params.key as string,
            params.value,
          );
          break;
        case "openProblemsTab":
          commands.executeCommand("workbench.action.problems.focus");

          break;
        case "dbtdocsview:render":
          this.emitterService.fire({
            command: "dbtdocsview:render",
            payload: params,
          });
          break;
        case "getUsers":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.usersService.users;
            },
            command,
            true,
          );
          break;
        case "getCurrentUser":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.usersService.user;
            },
            command,
            true,
          );
          break;
        case "fetch":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.altimateRequest.fetch(
                params.endpoint as string,
                params.fetchArgs as Record<string, unknown>,
              );
            },
            command,
            true,
          );
          break;
        case "getProjectAdapterType":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.queryManifestService.getProject()?.getAdapterType();
            },
            command,
          );
          break;
        case "openFile":
          workspace.openTextDocument(params.path as string).then((doc) => {
            window.showTextDocument(doc);
          });
          break;
        case "webview:ready":
          this.onWebviewReady();
          break;
        case "openURL":
          if (!params.url) {
            return;
          }
          env.openExternal(Uri.parse(params.url as string));
          break;
        case "datapilot:toggle":
          if (params.open) {
            this.emitterService.eventEmitter.fire({
              command: "datapilot:toggle",
              payload: params,
            });
          }
          break;
        case "datapilot:message":
          this.emitterService.eventEmitter.fire({
            command: "datapilot:message",
            payload: message,
          });
          break;
        case "validateCredentials":
          const isValid = await this.altimateRequest.handlePreviewFeatures();
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              isValid,
            },
          });
          break;
        case "sendTelemetryEvent":
          this.telemetry.sendTelemetryEvent(
            params.eventName as string,
            params.properties as { [key: string]: string },
            params.measurements as { [key: string]: number },
          );
          break;
        case "sendTelemetryError":
          this.telemetry.sendTelemetryError(
            params.eventName as string,
            params.error,
            params.properties as { [key: string]: string },
          );
          break;
        case "setContext":
          this.dbtProjectContainer.setToGlobalState(
            params.key as string,
            params.value,
          );
          break;
        case "getFromContext":
          this.sendResponseToWebview({
            command: "response",
            data: this.dbtProjectContainer.getFromGlobalState(
              params.key as string,
            ),
            syncRequestId,
          });
          break;
        case "updateConfig":
          if (!this.isUpdateConfigProps(params)) {
            return;
          }
          this.dbtTerminal.debug(
            "altimateWebviewProvider:handleCommand",
            "Updating config",
            params,
          );
          // If config is for preview feature, then check keys
          const shouldUpdate =
            !params.isPreviewFeature ||
            this.altimateRequest.handlePreviewFeatures();
          if (shouldUpdate) {
            await workspace
              .getConfiguration("dbt")
              .update(params.key, params.value);
          }
          if (syncRequestId) {
            this.sendResponseToWebview({
              command: "response",
              syncRequestId,
              data: {
                updated: shouldUpdate,
              },
            });
          }
          break;
        case "showInformationMessage":
          const { infoMessage, items } = params as {
            infoMessage: string;
            items: any[];
          };
          const result = await window.showInformationMessage(
            infoMessage,
            ...items,
          );
          if (syncRequestId) {
            this.sendResponseToWebview({
              command: "response",
              data: result,
              syncRequestId,
            });
          }
          break;
        case "showErrorMessage":
          const args = params as {
            infoMessage: string;
            items: any[];
          };
          window.showErrorMessage(args.infoMessage, ...(args.items || []));
          break;
        case "showWarningMessage":
          this.handleWarningMessage(
            params as Parameters<typeof this.handleWarningMessage>["0"],
            syncRequestId,
          );
          break;
        case "findPackageVersion":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              try {
                return this.queryManifestService
                  .getProject()
                  ?.findPackageVersion(params.packageName as string);
              } catch (err) {
                this.dbtTerminal.debug(
                  "findPackageVersion",
                  (err as Error).message,
                );
              }
              return undefined;
            },
            command,
            false,
          );

          break;
        case "queryResultTab:render":
          this.emitterService.fire({
            command: "queryResultTab:render",
            payload: params,
          });
          break;
        case "getDownstreamColumns": {
          const model = params.model as string;
          const column = params.column as string;
          const _tables = this.getConnectedTables("parents", model);
          if (!_tables) {
            return;
          }
          const tables = _tables.map((t) => t.table);
          const selectedColumn = { table: model, name: column };
          const currAnd1HopTables = [...tables, model];
          const targets = [[model, column] as [string, string]];
          console.log("thisisit", tables);
          let tempPromise: any;
          window.withProgress(
            {
              title: "Retrieving column level lineage",
              location: ProgressLocation.Notification,
              cancellable: true,
            },
            async (_, token) => {
              await new Promise<void>((resolve) => {
                this.cancellationTokenSource =
                  new DerivedCancellationTokenSource(token);
                // this.cllProgressResolve = resolve;
                // resolve();
                tempPromise = resolve;
                token.onCancellationRequested(() => {
                  console.log("thisiiiiiii");
                });
              });
            },
          );
          const columns = await this.getConnectedColumns({
            targets,
            currAnd1HopTables,
            selectedColumn,
          });
          console.log("thisisit", columns);
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return { ...columns, tables: _tables };
            },
            command,
          );
          tempPromise();
          break;
        }
        default:
          break;
      }
    } catch (err) {
      this.dbtTerminal.error(
        "altimateWebviewProvider:handleCommand",
        "error while handling command",
        err,
      );
    }
  }

  private getConnectedTables(
    key: keyof GraphMetaMap,
    table: string,
  ): Table[] | undefined {
    const _event = this.queryManifestService.getEventByCurrentProject();
    if (!_event) {
      return;
    }
    const { event } = _event;
    if (!event) {
      return;
    }
    const { graphMetaMap } = event;
    const dependencyNodes = graphMetaMap[key];
    const node = dependencyNodes.get(table);
    if (!node) {
      return;
    }
    const tables: Map<string, Table> = new Map();
    node.nodes.forEach(({ url, key }) => {
      const _node = this.createTable(event, url, key);
      if (!_node) {
        return;
      }
      if (!tables.has(_node.table)) {
        tables.set(_node.table, _node);
      }
    });
    return Array.from(tables.values()).sort((a, b) =>
      a.table.localeCompare(b.table),
    );
  }

  private createTable(
    event: ManifestCacheProjectAddedEvent,
    tableUrl: string | undefined,
    key: string,
  ): Table | undefined {
    const splits = key.split(".");
    const nodeType = splits[0];
    const { graphMetaMap, testMetaMap } = event;
    const upstreamCount = 0;
    const downstreamCount = 0;
    if (nodeType === DBTProject.RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = event;
      const schema = splits[2];
      const table = splits[3];
      const _node = sourceMetaMap.get(schema);
      if (!_node) {
        return;
      }
      const _table = _node.tables.find((t) => t.name === table);
      if (!_table) {
        return;
      }
      return {
        table: key,
        label: table,
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        isExternalProject: _node.is_external_project,
        tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
          const testKey = n.label.split(".")[0];
          return { ...testMetaMap.get(testKey), key: testKey };
        }),
        columns: _table.columns,
      };
    }
    if (nodeType === DBTProject.RESOURCE_TYPE_METRIC) {
      return {
        table: key,
        label: splits[2],
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        materialization: undefined,
        tests: [],
        columns: {},
        isExternalProject: false,
      };
    }
    const { nodeMetaMap } = event;

    const table = splits[2];
    if (nodeType === DBTProject.RESOURCE_TYPE_EXPOSURE) {
      return {
        table: key,
        label: table,
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        materialization: undefined,
        tests: [],
        columns: {},
        isExternalProject: false,
      };
    }

    const node = nodeMetaMap.lookupByUniqueId(key);
    if (!node) {
      return;
    }

    const materialization = node.config.materialized;
    return {
      table: key,
      label: node.alias,
      url: tableUrl,
      upstreamCount,
      downstreamCount,
      isExternalProject: node.is_external_project,
      nodeType,
      materialization,
      columns: node.columns,
      tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
        const testKey = n.label.split(".")[0];
        return { ...testMetaMap.get(testKey), key: testKey };
      }),
    };
  }

  private cancellationTokenSource: CancellationTokenSource | undefined;
  private async getConnectedColumns({
    targets,
    currAnd1HopTables,
    selectedColumn,
  }: {
    targets: [string, string][];
    currAnd1HopTables: string[];
    // select_column is used for pricing not business logic
    selectedColumn: { name: string; table: string };
  }) {
    const _event = this.queryManifestService.getEventByCurrentProject();
    if (!_event) {
      return;
    }
    const { event } = _event;
    if (!event) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }

    const modelInfos: ModelInfo[] = [];
    let auxiliaryTables: string[] = []; // these are used for better sqlglot parsing
    let sqlTables: string[] = []; // these are used which models should be compiled sql
    currAnd1HopTables = Array.from(new Set(currAnd1HopTables));
    const currTables = new Set(targets.map((t) => t[0]));
    auxiliaryTables = DBTProject.getNonEphemeralParents(
      event,
      Array.from(currTables),
    );
    sqlTables = Array.from(currTables);
    currAnd1HopTables = Array.from(new Set(currAnd1HopTables));
    const modelsToFetch = Array.from(
      new Set([...currAnd1HopTables, ...auxiliaryTables, selectedColumn.table]),
    );
    // using artifacts(mappedCompiledSql) from getNodesWithDBColumns as optimization
    const { mappedNode, relationsWithoutColumns, mappedCompiledSql } =
      await project.getNodesWithDBColumns(
        event,
        modelsToFetch,
        this.cancellationTokenSource!.token,
      );

    const selected_column = {
      model_node: mappedNode[selectedColumn.table],
      column: selectedColumn.name,
    };

    if (this.cancellationTokenSource?.token.isCancellationRequested) {
      return { column_lineage: [] };
    }

    const modelsToCompile = modelsToFetch.filter((key) => {
      if (!sqlTables.includes(key)) {
        return false;
      }
      const nodeType = key.split(".")[0];
      if (!canCompileSQL(nodeType)) {
        return false;
      }
      return true;
    });
    const bulkCompiledSql = await project.getBulkCompiledSql(
      event,
      modelsToCompile.filter((m) => !mappedCompiledSql[m]),
    );
    for (const key of modelsToFetch) {
      const node = mappedNode[key];
      if (!node) {
        continue;
      }
      if (modelsToCompile.includes(key)) {
        // rawSql only for debuging propose in backend
        let rawSql: string = "";
        if (node.path) {
          try {
            rawSql = (
              await workspace.fs.readFile(Uri.file(node.path))
            ).toString();
          } catch (e) {
            this.dbtTerminal.warn(
              "readRawSql",
              `Unable to read raw sql file ${node.path}`,
            );
          }
        }
        modelInfos.push({
          model_node: node,
          compiled_sql: mappedCompiledSql[key] || bulkCompiledSql[key],
          raw_sql: rawSql,
        });
      } else {
        modelInfos.push({ model_node: node });
      }
    }

    if (relationsWithoutColumns.length !== 0) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Failed to fetch columns for " +
            relationsWithoutColumns.join(", ") +
            ". Probably the dbt models are not yet materialized.",
        ),
      );
      // we still show the lineage for the rest of the models whose
      // schemas we could get so not returning here
    }

    const targetTables = Array.from(new Set(targets.map((t) => t[0])));
    // targets should not empty
    if (targets.length === 0 || modelInfos.length < targetTables.length) {
      this.telemetry.sendTelemetryError("columnLineageLogicError", {
        targets,
        modelInfos,
        currAnd1HopTables,
        selectedColumn,
      });
      return { column_lineage: [] };
    }

    // the case where upstream/downstream only has ephemeral models
    if (modelInfos.length === targetTables.length) {
      return { column_lineage: [] };
    }
    const models = modelInfos.map((m) => m.model_node.uniqueId);
    const hasAllModels = targets.every((t) => models.includes(t[0]));
    if (!hasAllModels) {
      // most probably error message is already shown in above checks
      return { column_lineage: [] };
    }

    const modelDialect = project.getAdapterType();
    try {
      if (this.cancellationTokenSource?.token.isCancellationRequested) {
        return { column_lineage: [] };
      }
      const sessionId = `${env.sessionId}-${selectedColumn.table}-${selectedColumn.name}`;
      const request = {
        model_dialect: modelDialect,
        model_info: modelInfos,
        upstream_expansion: false,
        upstream_models: [],
        targets: targets.map((t) => ({ uniqueId: t[0], column_name: t[1] })),
        selected_column: selected_column!,
        session_id: sessionId,
        show_indirect_edges: false,
      };
      this.dbtTerminal.debug(
        "newLineagePanel:getConnectedColumns",
        "request",
        request,
      );
      const startTime = Date.now();
      const result = await this.altimateRequest.getColumnLevelLineage(request);
      const apiTime = Date.now() - startTime;
      this.dbtTerminal.debug(
        "newLineagePanel:getConnectedColumns",
        "response",
        result,
      );
      this.telemetry.sendTelemetryEvent("columnLineageTimes", {
        apiTime: apiTime.toString(),
        modelInfosLength: modelInfos.length.toString(),
      });
      console.log("lineageTimings:", {
        apiTime: apiTime.toString(),
        modelInfosLength: modelInfos.length.toString(),
      });
      if (!result.errors_dict && result.errors && result.errors.length > 0) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(result.errors.join("\n")),
        );
        this.telemetry.sendTelemetryError("columnLineageApiError", {
          errors: result.errors,
        });
      }
      const column_lineage =
        result.column_lineage.map((c) => ({
          source: [c.source.uniqueId, c.source.column_name],
          target: [c.target.uniqueId, c.target.column_name],
          type: c.type,
          viewsType: c.views_type,
          viewsCode: c.views_code,
        })) || [];
      return {
        column_lineage,
        confindence: result.confidence,
        errors: result.errors_dict,
      };
    } catch (error) {
      if (error instanceof AbortError) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Fetching column level lineage timed out.",
          ),
        );
        this.telemetry.sendTelemetryError(
          "columnLevelLineageRequestTimeout",
          error,
        );
        return;
      }
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not generate column level lineage: " +
            (error as Error).message,
        ),
      );
      this.telemetry.sendTelemetryError("ColumnLevelLineageError", error);
      return;
    }
  }

  resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    _token: CancellationToken,
  ): void | Thenable<void> {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(this._panel!.webview);
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    if (this._panel && "description" in this._panel) {
      this._panel.description = this.panelDescription;
    }
    this._panel!.webview.options = <WebviewOptions>{
      enableScripts: true,
      localResourceRoots: [
        Uri.file(
          path.join(
            this.dbtProjectContainer.extensionUri.fsPath,
            "webview_panels",
            "dist",
            "assets",
          ),
        ),
      ],
    };
  }

  protected getHtml(webview: Webview, extensionUri: Uri) {
    const indexJs = webview.asWebviewUri(
      Uri.file(
        path.join(
          extensionUri.fsPath,
          "webview_panels",
          "dist",
          "assets",
          "main.js",
        ),
      ),
    );
    const indexCss = webview.asWebviewUri(
      Uri.file(
        path.join(
          extensionUri.fsPath,
          "webview_panels",
          "dist",
          "assets",
          "main.css",
        ),
      ),
    );
    const SpinnerUrl = webview.asWebviewUri(
      Uri.file(
        path.join(
          extensionUri.fsPath,
          "webview_panels",
          "dist",
          "assets",
          "spinner.gif",
        ),
      ),
    );
    const codiconsUri = webview.asWebviewUri(
      Uri.joinPath(
        extensionUri,
        "webview_panels",
        "dist",
        "assets",
        "codicons",
        "codicon.css",
      ),
    );

    const nonce = getNonce();
    return `
        <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--
              Use a content security policy to only allow loading images from https or from our extension directory,
              and only allow scripts that have a specific nonce.
              Added unsafe-inline for css due to csp issue: https://github.com/JedWatson/react-select/issues/4631
              -->
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; worker-src blob:; font-src ${webview.cspSource}; style-src 'unsafe-inline' ${webview.cspSource}; img-src ${webview.cspSource} https: data:; script-src 'unsafe-eval' 'nonce-${nonce}' https://*.vscode-resource.vscode-cdn.net; connect-src https://*.s3.amazonaws.com">
            <title>VSCode DBT Power user extension</title>
            <link rel="stylesheet" type="text/css" href="${indexCss}">
            <link rel="stylesheet" type="text/css" href="${codiconsUri}">
          </head>
      
          <body>
            <div id="root"></div>
            <div id="sidebar"></div>
            <script nonce="${nonce}" >
              window.viewPath = "${this.viewPath}";
              var spinnerUrl = "${SpinnerUrl}"
            </script>
            
            <script nonce="${nonce}" type="module" src="${indexJs}"></script>
          </body>
        </html>
      `;
  }

  dispose() {
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
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
