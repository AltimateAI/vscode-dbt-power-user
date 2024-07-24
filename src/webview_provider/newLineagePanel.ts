import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import {
  CancellationToken,
  CancellationTokenSource,
  ColorThemeKind,
  commands,
  ProgressLocation,
  TextEditor,
  Uri,
  Webview,
  window,
  workspace,
  env,
  WebviewOptions,
} from "vscode";
import { AltimateRequest, ModelInfo } from "../altimate";
import {
  ExposureMetaData,
  GraphMetaMap,
  NodeGraphMap,
  NodeMetaData,
  SourceTable,
} from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { LineagePanelView } from "./lineagePanel";
import { DBTProject } from "../manifest/dbtProject";
import { TelemetryService } from "../telemetry";
import { AbortError } from "node-fetch";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { AltimateWebviewProvider } from "./altimateWebviewProvider";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";

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
};

enum CllEvents {
  START = "start",
  END = "end",
  CANCEL = "cancel",
}

const CAN_COMPILE_SQL_NODE = [
  DBTProject.RESOURCE_TYPE_MODEL,
  DBTProject.RESOURCE_TYPE_SNAPSHOT,
  DBTProject.RESOURCE_TYPE_ANALYSIS,
];
const canCompileSQL = (nodeType: string) =>
  CAN_COMPILE_SQL_NODE.includes(nodeType);

class DerivedCancellationTokenSource extends CancellationTokenSource {
  constructor(linkedToken: CancellationToken) {
    super();
    linkedToken.onCancellationRequested(() => {
      super.cancel();
    });
  }
}

@provideSingleton(NewLineagePanel)
export class NewLineagePanel
  extends AltimateWebviewProvider
  implements LineagePanelView
{
  protected viewPath = "/lineage";
  protected panelDescription = "Lineage panel";
  // since lineage can be cancelled from 2 places: progress bar and panel actions
  private cancellationTokenSource: DerivedCancellationTokenSource | undefined;
  private cllProgressResolve: () => void = () => {};

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    private altimate: AltimateRequest,
    protected telemetry: TelemetryService,
    private terminal: DBTTerminal,
    private eventEmitterService: SharedStateService,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
  ) {
    super(
      dbtProjectContainer,
      altimate,
      telemetry,
      eventEmitterService,
      terminal,
      queryManifestService,
      usersService,
    );

    this._disposables.push(
      workspace.onDidChangeConfiguration(
        (e) => {
          if (!e.affectsConfiguration("dbt.enableLineagePanelV2")) {
            return;
          }
          if (this._panel) {
            this.renderWebviewView(this._panel.webview);
          }
        },
        this,
        this._disposables,
      ),
    );
  }

  public changedActiveTextEditor(event: TextEditor | undefined) {
    if (event === undefined) {
      return;
    }
    if (!this._panel) {
      return;
    }
    this.renderStartingNode();
  }

  eventMapChanged(eventMap: Map<string, ManifestCacheProjectAddedEvent>): void {
    this.eventMap = eventMap;
  }

  changedActiveColorTheme() {
    if (!this._panel) {
      return;
    }
    const theme = [
      ColorThemeKind.Light,
      ColorThemeKind.HighContrastLight,
    ].includes(window.activeColorTheme.kind)
      ? "light"
      : "dark";
    this._panel.webview.postMessage({
      command: "setTheme",
      args: { theme },
    });
  }

  init() {
    this.terminal.debug("newLineagePanel:init", "init", this._panel);
    this.changedActiveColorTheme();
    this.renderStartingNode();
  }

  private renderStartingNode() {
    if (!this._panel) {
      return;
    }
    this._panel.webview.postMessage({
      command: "render",
      args: this.getStartingNode(),
    });
  }

  async handleCommand(message: {
    command: string;
    args: any;
    syncRequestId?: string;
  }): Promise<void> {
    const { command, args = {}, syncRequestId } = message;
    const { id = syncRequestId, params } = args;

    if (command === "openProblemsTab") {
      commands.executeCommand("workbench.action.problems.focus");
      return;
    }
    if (command === "upstreamTables") {
      const body = await this.getUpstreamTables(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "downstreamTables") {
      const body = await this.getDownstreamTables(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "getColumns") {
      const body = await this.getColumns(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "getExposureDetails") {
      const body = await this.getExposureDetails(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: true },
      });
      return;
    }

    if (command === "getConnectedColumns") {
      const body = await this.getConnectedColumns(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, syncRequestId, body, status: !!body },
      });
      return;
    }

    if (command === "sendFeedback") {
      try {
        await this.altimate.sendFeedback({
          feedback_src: "dbtpu-extension",
          feedback_text: params.feedback_text,
          feedback_value: params.feedback_value,
          data: {},
        });
        this._panel?.webview.postMessage({
          command: "response",
          args: { id, syncRequestId, status: true },
        });
      } catch (error) {
        this._panel?.webview.postMessage({
          command: "response",
          args: { id, syncRequestId, status: false },
        });
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Could not send feedback: " + (error as Error).message,
          ),
        );
        this.telemetry.sendTelemetryError(
          "altimateLineageSendFeedbackError",
          error,
        );
      }
      return;
    }

    if (command === "columnLineage") {
      this.handleColumnLineage(args);
      return;
    }

    if (command === "telemetryEvents") {
      this.telemetry.sendTelemetryEvent(id, params);
      return;
    }

    if (command === "previewFeature") {
      this.altimate.handlePreviewFeatures();
      return;
    }

    if (command === "showInfoNotification") {
      window.showInformationMessage(args.message);
      return;
    }

    if (command === "getLineageSettings") {
      const config = workspace.getConfiguration("dbt.lineage");
      this._panel?.webview.postMessage({
        command: "response",
        args: {
          id,
          syncRequestId,
          status: true,
          body: {
            showSelectEdges: config.get("showSelectEdges", true),
            showNonSelectEdges: config.get("showNonSelectEdges", false),
            defaultExpansion: config.get("defaultExpansion", 1),
          },
        },
      });
      return;
    }

    if (command === "persistLineageSettings") {
      const config = workspace.getConfiguration("dbt.lineage");
      for (const k in params) {
        await config.update(k, params[k]);
      }
      this._panel?.webview.postMessage({
        command: "response",
        args: {
          id,
          syncRequestId,
          status: true,
          body: { ok: true },
        },
      });
      return;
    }

    this.terminal.debug(
      "newLineagePanel:handleCommand",
      "Unsupported command",
      message,
    );
    super.handleCommand(message);
  }

  private async handleColumnLineage({ event }: { event: CllEvents }) {
    if (event === CllEvents.START) {
      window.withProgress(
        {
          title: "Retrieving column level lineage",
          location: ProgressLocation.Notification,
          cancellable: true,
        },
        async (_, token) => {
          await new Promise<void>((resolve) => {
            this.cancellationTokenSource = new DerivedCancellationTokenSource(
              token,
            );
            this.cllProgressResolve = resolve;
            token.onCancellationRequested(() => {
              this._panel?.webview.postMessage({
                command: "columnLineage",
                args: { event: CllEvents.CANCEL },
              });
            });
          });
        },
      );
      return;
    }
    this.cancellationTokenSource?.token.onCancellationRequested((e) => {
      console.log(e);
    });
    if (event === CllEvents.END) {
      this.cllProgressResolve();
      this.cancellationTokenSource?.dispose();
      return;
    }
    if (event === CllEvents.CANCEL) {
      this.cllProgressResolve();
      this.cancellationTokenSource?.cancel();
      return;
    }
  }

  private async addModelColumnsFromDB(project: DBTProject, node: NodeMetaData) {
    const columnsFromDB = await project.getColumnsOfModel(node.name);
    console.log("addColumnsFromDB: ", node.name, " -> ", columnsFromDB);
    return project.mergeColumnsFromDB(node, columnsFromDB);
  }

  private async addSourceColumnsFromDB(
    project: DBTProject,
    nodeName: string,
    table: SourceTable,
  ) {
    const columnsFromDB = await project.getColumnsOfSource(
      nodeName,
      table.name,
    );
    console.log("addColumnsFromDB: ", nodeName, " -> ", columnsFromDB);
    return project.mergeColumnsFromDB(table, columnsFromDB);
  }

  private async getExposureDetails({
    name,
  }: {
    name: string;
  }): Promise<ExposureMetaData | undefined> {
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }

    const { exposureMetaMap } = event.event;

    return exposureMetaMap.get(name);
  }

  private async getColumns({
    table,
    refresh,
  }: {
    table: string;
    refresh: boolean;
  }): Promise<
    | {
        id: string;
        purpose: string;
        columns: {
          table: string;
          name: string;
          datatype: string;
          can_lineage_expand: boolean;
          description: string;
        }[];
      }
    | undefined
  > {
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }
    const splits = table.split(".");
    const nodeType = splits[0];
    if (nodeType === DBTProject.RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = event.event;
      const sourceName = splits[2];
      const tableName = splits[3];
      const node = sourceMetaMap.get(sourceName);
      if (!node) {
        return;
      }
      const _table = node.tables.find((t) => t.name === tableName);
      if (!_table) {
        return;
      }
      if (refresh) {
        const ok = await window.withProgress(
          {
            title: "Fetching metadata",
            location: ProgressLocation.Notification,
            cancellable: false,
          },
          async () => {
            return await this.addSourceColumnsFromDB(
              project,
              node.name,
              _table,
            );
          },
        );
        if (!ok) {
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Unable to get columns from DB for model: " +
                node.name +
                " table: " +
                _table.name +
                ".",
            ),
          );
          return;
        }
      }
      return {
        id: table,
        purpose: _table.description,
        columns: Object.values(_table.columns)
          .map((c) => ({
            table,
            name: c.name,
            datatype: c.data_type?.toLowerCase() || "",
            can_lineage_expand: false,
            description: c.description,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
    }
    const tableName = splits[2];
    const { nodeMetaMap } = event.event;
    const node = nodeMetaMap.get(tableName);
    if (!node) {
      return;
    }
    if (refresh) {
      if (node.config.materialized === "ephemeral") {
        window.showInformationMessage(
          "Cannot fetch columns for ephemeral models.",
        );
        return;
      }
      const ok = await window.withProgress(
        {
          title: "Fetching metadata",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async () => {
          return await this.addModelColumnsFromDB(project, node);
        },
      );
      if (!ok) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "Unable to get columns from DB for model: " +
              node.name +
              " table: " +
              table +
              ".",
          ),
        );
        return;
      }
    }

    return {
      id: table,
      purpose: node.description,
      columns: Object.values(node.columns)
        .map((c) => ({
          table,
          name: c.name,
          datatype: c.data_type?.toLowerCase() || "",
          can_lineage_expand: false,
          description: c.description,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  }

  private async getConnectedColumns({
    targets,
    upstreamExpansion,
    currAnd1HopTables,
    selectedColumn,
    showIndirectEdges,
  }: {
    targets: [string, string][];
    upstreamExpansion: boolean;
    currAnd1HopTables: string[];
    // select_column is used for pricing not business logic
    selectedColumn: { name: string; table: string };
    showIndirectEdges: boolean;
  }) {
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }

    const modelInfos: ModelInfo[] = [];
    let upstream_models: string[] = [];
    let auxiliaryTables: string[] = []; // these are used for better sqlglot parsing
    let sqlTables: string[] = []; // these are used which models should be compiled sql
    currAnd1HopTables = Array.from(new Set(currAnd1HopTables));
    const currTables = new Set(targets.map((t) => t[0]));
    if (upstreamExpansion) {
      const hop1Tables = currAnd1HopTables.filter((t) => !currTables.has(t));
      upstream_models = [...hop1Tables];
      sqlTables = [...hop1Tables];
      auxiliaryTables = DBTProject.getNonEphemeralParents(
        event.event,
        hop1Tables,
      );
    } else {
      auxiliaryTables = DBTProject.getNonEphemeralParents(
        event.event,
        Array.from(currTables),
      );
      sqlTables = Array.from(currTables);
    }
    currAnd1HopTables = Array.from(new Set(currAnd1HopTables));
    const modelsToFetch = Array.from(
      new Set([...currAnd1HopTables, ...auxiliaryTables, selectedColumn.table]),
    );
    const { mappedNode, relationsWithoutColumns, mappedCompiledSql } =
      await project.getNodesWithDBColumns(
        event.event,
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
            this.terminal.warn(
              "readRawSql",
              `Unable to read raw sql file ${node.path}`,
            );
          }
        }
        modelInfos.push({
          model_node: node,
          compiled_sql: mappedCompiledSql[key],
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
        upstreamExpansion,
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
        upstream_expansion: upstreamExpansion,
        targets: targets.map((t) => ({ uniqueId: t[0], column_name: t[1] })),
        selected_column: selected_column!,
        upstream_models,
        session_id: sessionId,
        show_indirect_edges: showIndirectEdges,
      };
      this.terminal.debug(
        "newLineagePanel:getConnectedColumns",
        "request",
        request,
      );
      const startTime = Date.now();
      const result = await this.altimate.getColumnLevelLineage(request);
      const apiTime = Date.now() - startTime;
      this.terminal.debug(
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

  private getConnectedTables(
    key: keyof GraphMetaMap,
    table: string,
  ): Table[] | undefined {
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return;
    }
    const { graphMetaMap } = event.event;
    const dependencyNodes = graphMetaMap[key];
    const node = dependencyNodes.get(table);
    if (!node) {
      return;
    }
    const tables: Map<string, Table> = new Map();
    node.nodes.forEach(({ url, key }) => {
      const _node = this.createTable(event.event!, url, key);
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
    const upstreamCount = this.getConnectedNodeCount(
      graphMetaMap["children"],
      key,
    );
    const downstreamCount = this.getConnectedNodeCount(
      graphMetaMap["parents"],
      key,
    );
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
        isExternalProject: false,
      };
    }

    const node = nodeMetaMap.get(table);
    if (!node) {
      return;
    }

    const materialization = node.config.materialized;
    return {
      table: key,
      label: table,
      url: tableUrl,
      upstreamCount,
      downstreamCount,
      isExternalProject: node.is_external_project,
      nodeType,
      materialization,
      tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
        const testKey = n.label.split(".")[0];
        return { ...testMetaMap.get(testKey), key: testKey };
      }),
    };
  }

  private getUpstreamTables({ table }: { table: string }) {
    return { tables: this.getConnectedTables("children", table) };
  }

  private getDownstreamTables({ table }: { table: string }) {
    return { tables: this.getConnectedTables("parents", table) };
  }

  private getConnectedNodeCount(g: NodeGraphMap, key: string) {
    return g.get(key)?.nodes.length || 0;
  }

  private getFilename() {
    return path.basename(window.activeTextEditor!.document.fileName, ".sql");
  }

  private getMissingLineageMessage() {
    const message =
      "A valid dbt file (model, seed etc.) needs to be open and active in the editor area above to view lineage";
    try {
      this.queryManifestService
        .getProject()
        ?.throwDiagnosticsErrorIfAvailable();
    } catch (err) {
      return { message: (err as Error).message, type: "error" };
    }

    return { message, type: "warning" };
  }

  private getStartingNode():
    | {
        node?: Table;
        aiEnabled: boolean;
        missingLineageMessage?: { message: string; type: string };
      }
    | undefined {
    const aiEnabled = this.altimate.enabled();
    const event = this.queryManifestService.getEventByCurrentProject();
    if (!event?.event) {
      return {
        aiEnabled,
        missingLineageMessage: this.getMissingLineageMessage(),
      };
    }
    const { nodeMetaMap, graphMetaMap, testMetaMap } = event.event;
    const tableName = this.getFilename();
    const _node = nodeMetaMap.get(tableName);
    if (!_node) {
      return {
        aiEnabled,
        missingLineageMessage: this.getMissingLineageMessage(),
      };
    }
    const key = _node.uniqueId;
    const nodeType = key.split(".")[0];
    const downstreamCount = this.getConnectedNodeCount(
      graphMetaMap["parents"],
      key,
    );
    const upstreamCount = this.getConnectedNodeCount(
      graphMetaMap["children"],
      key,
    );
    const materialization = _node.config.materialized;
    const node = {
      table: key,
      label: tableName,
      url: window.activeTextEditor!.document.uri.path,
      upstreamCount,
      downstreamCount,
      nodeType,
      materialization,
      isExternalProject: _node.is_external_project,
      tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
        const testKey = n.label.split(".")[0];
        return { ...testMetaMap.get(testKey), key: testKey };
      }),
    };
    return { node, aiEnabled };
  }

  private isV2Enabled = () =>
    workspace
      .getConfiguration("dbt")
      .get<boolean>("enableLineagePanelV2", false);

  protected renderWebviewView(webview: Webview) {
    if (this.isV2Enabled()) {
      this._panel!.webview.html = super.getHtml(
        webview,
        this.dbtProjectContainer.extensionUri,
      );
      return;
    }
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
    this._panel!.webview.html = getHtml(
      webview,
      this.dbtProjectContainer.extensionUri,
    );
  }
}

/** Gets webview HTML */
function getHtml(webview: Webview, extensionUri: Uri) {
  const indexJs = getUri(webview, extensionUri, [
    "new_lineage_panel",
    "dist",
    "assets",
    "index.js",
  ]);
  const resourceDir = getUri(webview, extensionUri, [
    "new_lineage_panel",
    "dist",
  ]).toString();
  replaceInFile(indexJs, "/__ROOT__/", resourceDir + "/");
  const indexPath = getUri(webview, extensionUri, [
    "new_lineage_panel",
    "dist",
    "index.html",
  ]);
  return readFileSync(indexPath.fsPath)
    .toString()
    .replace(/\/__ROOT__/g, resourceDir)
    .replace(/__ROOT__/g, resourceDir)
    .replace(/__NONCE__/g, getNonce())
    .replace(/__CSPSOURCE__/g, webview.cspSource)
    .replace(/__LINEAGE_TYPE__/g, "dynamic");
}

/** Used to enforce a secure CSP */
function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/** Utility method for generating webview Uris for resources */
function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}

async function replaceInFile(
  filename: Uri,
  searchString: string,
  replacementString: string,
) {
  const contents = readFileSync(filename.fsPath, "utf8");
  const replacedContents = contents.replace(searchString, replacementString);
  writeFileSync(filename.fsPath, replacedContents, "utf8");
}
