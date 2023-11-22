import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import {
  CancellationToken,
  ColorThemeKind,
  ProgressLocation,
  TextEditor,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewResolveContext,
  window,
} from "vscode";
import { AltimateRequest, DBTColumnLineageResponse } from "../altimate";
import {
  ColumnMetaData,
  GraphMetaMap,
  NodeGraphMap,
  NodeMetaData,
  SourceMetaData,
} from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { LineagePanelView } from "./lineagePanel";
import { DBTProject } from "../manifest/dbtProject";
import { TelemetryService } from "../telemetry";
import { PythonException } from "python-bridge";
import { AbortError } from "node-fetch";

type Table = {
  key: string;
  table: string;
  url: string;
  downstreamCount: number;
  upstreamCount: number;
  nodeType: string;
  materialization?: string;
  tests: any[];
};

const CACHE_SIZE = 100;
const CACHE_VALID_TIME = 24 * 60 * 60 * 1000;

const CAN_COMPILE_SQL_NODE = [
  DBTProject.RESOURCE_TYPE_MODEL,
  DBTProject.RESOURCE_TYPE_SNAPSHOT,
];
const canCompileSQL = (nodeType: string) =>
  CAN_COMPILE_SQL_NODE.includes(nodeType);

@provideSingleton(NewLineagePanel)
export class NewLineagePanel implements LineagePanelView {
  private _panel: WebviewView | undefined;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private dbCache: Map<string, Record<string, string>[]> = new Map();
  private lruCache: Map<string, number> = new Map();
  private progressBarResolve?: () => void;

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimate: AltimateRequest,
    private telemetry: TelemetryService,
  ) {}

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
    this.init();
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
    console.log("lineage:init -> ", this._panel);
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

  resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    _token: CancellationToken,
  ): void | Thenable<void> {
    console.log("lineage:resolveWebviewView -> ");
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
  }

  async handleCommand(message: { command: string; args: any }): Promise<void> {
    const { command, args } = message;
    const { id, params } = args;

    if (command === "upstreamTables") {
      const body = await this.getUpstreamTables(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, body, status: true },
      });
      return;
    }

    if (command === "downstreamTables") {
      const body = await this.getDownstreamTables(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, body, status: true },
      });
      return;
    }

    if (command === "getColumns") {
      const body = await this.getColumns(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, body, status: true },
      });
      return;
    }

    if (command === "getConnectedColumns") {
      const body = await this.getConnectedColumns(params);
      this._panel?.webview.postMessage({
        command: "response",
        args: { id, body, status: !!body },
      });
      return;
    }

    if (command === "startProgressBar") {
      window.withProgress(
        {
          title: "Processing column level lineage",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async () => {
          await new Promise<void>((resolve) => {
            this.progressBarResolve = resolve;
          });
        },
      );
      return;
    }

    if (command === "endProgressBar") {
      this.progressBarResolve?.();
      return;
    }

    console.error("Unsupported mssage", message);
  }

  private async addColumnsFromDB(project: DBTProject, node: NodeMetaData) {
    const now = Date.now();
    if (
      !this.dbCache.has(node.name) ||
      (this.lruCache.get(node.name) || 0) < now - CACHE_VALID_TIME
    ) {
      const _columnsFromDB = await project.getColumnsInRelation(node.name);
      this.dbCache.set(node.name, _columnsFromDB);
      if (this.dbCache.size > CACHE_SIZE) {
        const arr = Array.from(this.lruCache.entries());
        arr.sort((a, b) => b[1] - a[1]);
        arr.slice(CACHE_SIZE).forEach(([k]) => {
          this.lruCache.delete(k);
          this.dbCache.delete(k);
        });
      }
    }
    this.lruCache.set(node.name, now);
    const columnsFromDB = this.dbCache.get(node.name)!;
    console.log("addColumnsFromDB: ", node.name, " -> ", columnsFromDB);
    if (!columnsFromDB || columnsFromDB.length === 0) {
      return false;
    }
    if (columnsFromDB.length > 100) {
      // Flagging events where more than 100 columns are fetched from db to get a sense of how many of these happen
      this.telemetry.sendTelemetryEvent(
        "columnLineageExcessiveColumnsFetchedFromDB",
      );
    }
    const columns: Record<string, ColumnMetaData> = {};
    Object.entries(node.columns).forEach(([k, v]) => {
      columns[k.toLowerCase()] = v;
    });

    columnsFromDB.forEach((c) => {
      const existing_column = columns[c.column.toLowerCase()];
      if (existing_column) {
        existing_column.data_type = existing_column.data_type || c.dtype;
        return;
      }
      node.columns[c.column] = {
        name: c.column,
        data_type: c.dtype,
        description: "",
      };
    });
    if (Object.keys(node.columns).length > columnsFromDB.length) {
      // Flagging events where columns fetched from db are less than the number of columns in the manifest
      this.telemetry.sendTelemetryEvent("columnLineagePossibleStaleSchema");
    }
    return true;
  }

  private async getColumns({
    tableKey,
    nodeType,
    refresh,
  }: {
    tableKey: string;
    nodeType: string;
    refresh: boolean;
  }) {
    const event = this.getEvent();
    if (!event) {
      return;
    }
    if (nodeType === DBTProject.RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = event;
      const splits = tableKey.split(".");
      const schema = splits[2];
      const tableName = splits[3];
      const _node = sourceMetaMap.get(schema);
      if (!_node) {
        return;
      }
      const table = _node.tables.find((t) => t.name === tableName);
      if (!table) {
        return;
      }
      return {
        id: tableKey,
        purpose: table.description,
        columns: Object.values(table.columns)
          .map((c) => ({
            name: c.name,
            table: tableKey,
            datatype: c.data_type || "",
            can_lineage_expand: false,
            description: c.description,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
    }
    const { nodeMetaMap } = event;
    const node = nodeMetaMap.get(tableKey);
    if (!node) {
      return;
    }
    const project = this.getProject();
    if (!project) {
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
          this.lruCache.delete(node.name);
          this.dbCache.delete(node.name);
          return await this.addColumnsFromDB(project, node);
        },
      );
      if (!ok) {
        window.showErrorMessage(
          "Unable to get columns from DB for model: " +
            node.name +
            " table: " +
            tableKey,
        );
        return;
      }
    }

    return {
      id: node.uniqueId,
      purpose: node.description,
      columns: Object.values(node.columns)
        .map((c) => ({
          name: c.name,
          table: tableKey,
          datatype: c.data_type || "",
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
  }: {
    targets: [string, string][];
    upstreamExpansion: boolean;
    currAnd1HopTables: string[];
    // select_column is used for pricing not business logic
    selectedColumn: { name: string; table: string };
  }) {
    const event = this.getEvent();
    if (!event) {
      return;
    }
    const { nodeMetaMap, graphMetaMap } = event;
    const project = this.getProject();
    if (!project) {
      return;
    }
    const visibleTables: Record<string, NodeMetaData> = {};
    currAnd1HopTables?.forEach((t: string) => {
      if (t in visibleTables) {
        return;
      }
      const node = nodeMetaMap.get(t);
      if (!node) {
        return;
      }
      visibleTables[t] = node;
    });

    const modelInfos: {
      compiled_sql: string | undefined;
      model_node: NodeMetaData;
    }[] = [];
    const relationsWithoutColumns: string[] = [];
    const selected_column: { model_node?: NodeMetaData; column: string } = {
      model_node: nodeMetaMap.get(selectedColumn.table),
      column: selectedColumn.name,
    };
    const parent_models: { model_node: NodeMetaData }[] = [];
    let auxiliaryTables: string[] = [];
    if (upstreamExpansion) {
      const currTables = targets.map((t) => t[0]);
      const dependencyNodes = graphMetaMap.parents;
      const parentSet = new Set<string>();
      currAnd1HopTables.forEach((t) => {
        if (currTables.includes(t)) {
          return;
        }
        // now we have 1Hop tables
        const node = nodeMetaMap.get(t);
        if (!node) {
          return;
        }
        const parent = dependencyNodes.get(node.uniqueId);
        if (!parent) {
          return;
        }
        parent.nodes.forEach((n) => parentSet.add(n.label));
      });
      auxiliaryTables = Array.from(parentSet);
    }
    let current_node = "";
    let current_node_type = "";
    try {
      await Promise.all([
        ...Object.values(visibleTables).map(async (node) => {
          let compiledSql: string | undefined;
          current_node = node.name;
          const nodeType = node.uniqueId.split(".")?.[0];
          current_node_type = nodeType;
          if (node.config.materialized === "ephemeral") {
            // TODO: add telemetry here
            // ideally should not be taking this code path
            // ephemeral nodes can be skipped. they dont have a schema
            // and their sql makes it into the compiled sql of the models
            // referring to it.
            return;
          }
          if (canCompileSQL(nodeType)) {
            compiledSql = await project.compileNode(node.name);
            if (!compiledSql) {
              return;
            }
          }
          const ok = await this.addColumnsFromDB(project, node);
          if (!ok) {
            relationsWithoutColumns.push(node.alias);
            return;
          }
          modelInfos.push({ compiled_sql: compiledSql, model_node: node });
        }),
        async () => {
          if (selected_column.model_node) {
            await this.addColumnsFromDB(project, selected_column.model_node);
          }
        },
        ...auxiliaryTables.map(async (t) => {
          const node = nodeMetaMap.get(t);
          if (!node) {
            return;
          }
          await this.addColumnsFromDB(project, node);
          parent_models.push({ model_node: node });
        }),
      ]);
    } catch (exc) {
      if (exc instanceof PythonException) {
        window.showErrorMessage(
          `An error occured while trying to compile your node: ${current_node}, type: ${current_node_type} ` +
            exc.exception.message +
            ".",
        );
        this.telemetry.sendTelemetryError(
          "columnLineageCompileNodePythonError",
          exc,
        );
        console.error(
          "Error encountered while compiling/retrieving schema for node: " +
            current_node +
            ", type: " +
            current_node_type,
        );
        console.error(
          "Exception: " +
            exc.exception.message +
            "\n\n" +
            "Detailed error information:\n" +
            exc,
        );
        return;
      }
      this.telemetry.sendTelemetryError(
        "columnLineageCompileNodeUnknownError",
        exc,
      );
      // Unknown error
      window.showErrorMessage(
        "Encountered an unknown issue: " +
          exc +
          " while compiling/retrieving schema for nodes.",
      );
      console.error("Last node: " + current_node + "\n\n" + exc);
      return;
    }

    if (relationsWithoutColumns.length !== 0) {
      window.showErrorMessage(
        "Failed to fetch columns for following tables: " +
          relationsWithoutColumns.join(", ") +
          ".",
      );
      // we still show the lineage for the rest of the models whose
      // schemas we could get so not returning here
    }

    const modelDialect = project.getAdapterType();
    try {
      const request = {
        model_dialect: modelDialect,
        model_info: modelInfos,
        upstream_expansion: upstreamExpansion,
        targets,
        selected_column,
        parent_models,
      };
      console.log("cll:request -> ", request);
      const result = await this.altimate.getColumnLevelLineage(request);
      console.log("cll:response -> ", result);
      if ((result as DBTColumnLineageResponse).column_lineage) {
        return result;
      }

      window.showErrorMessage(
        "An unexpected error occured while fetching column level lineage.",
      );
      this.telemetry.sendTelemetryEvent(
        "columnLevelLineageInvalidResponse",
        result as {},
      );
    } catch (error) {
      if (error instanceof AbortError) {
        window.showErrorMessage("Fetching column level lineage timed out.");
        this.telemetry.sendTelemetryError(
          "columnLevelLineageRequestTimeout",
          error,
        );
        return;
      }
      window.showErrorMessage(
        "An unexpected error occured while fetching column level lineage.",
      );
      this.telemetry.sendTelemetryError("ColumnLevelLineageError", error);
      return;
    }
  }

  private getConnectedTables(
    key: keyof GraphMetaMap,
    table: string,
  ): Table[] | undefined {
    const event = this.getEvent();
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
      if (!tables.has(_node.key)) {
        tables.set(_node.key, _node);
      }
    });
    return Array.from(tables.values()).sort((a, b) =>
      a.table.localeCompare(b.table),
    );
  }

  private createTable(
    event: ManifestCacheProjectAddedEvent,
    tableUrl: string,
    key: string,
  ): Table | undefined {
    const nodeType = key.split(".")[0];
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
      const splits = key.split(".");
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
        key,
        table: table,
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
          const testKey = n.label.split(".")[0];
          return { ...testMetaMap.get(testKey), key: testKey };
        }),
      };
    }
    const { nodeMetaMap } = event;

    const splits = key.split(".");
    const table = splits[2];
    const node = nodeMetaMap.get(table);
    if (!node) {
      return;
    }

    const materialization = node.config.materialized;
    return {
      key,
      table,
      url: tableUrl,
      upstreamCount,
      downstreamCount,
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

  private getEvent(): ManifestCacheProjectAddedEvent | undefined {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return;
    }

    const currentFilePath = window.activeTextEditor.document.uri;
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }

    const event = this.eventMap.get(projectRootpath.fsPath);
    if (event === undefined) {
      return;
    }
    return event;
  }

  private getConnectedNodeCount(g: NodeGraphMap, key: string) {
    return g.get(key)?.nodes.length || 0;
  }

  private getFilename() {
    return path.basename(window.activeTextEditor!.document.fileName, ".sql");
  }

  private getProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      return;
    }
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
  }

  private getStartingNode(): { node: Table; aiEnabled: boolean } | undefined {
    const event = this.getEvent();
    if (!event) {
      return;
    }
    const { nodeMetaMap, graphMetaMap, testMetaMap } = event;
    const tableName = this.getFilename();
    const _node = nodeMetaMap.get(tableName);
    if (!_node) {
      return;
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
      key,
      table: tableName,
      url: window.activeTextEditor!.document.uri.path,
      upstreamCount,
      downstreamCount,
      nodeType,
      materialization,
      tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
        const testKey = n.label.split(".")[0];
        return { ...testMetaMap.get(testKey), key: testKey };
      }),
    };
    return { node, aiEnabled: this.altimate.enabled() };
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.description =
      "Show table level and column level lineage SQL queries";
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  private renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
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
    .replace(/__CSPSOURCE__/g, webview.cspSource);
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
