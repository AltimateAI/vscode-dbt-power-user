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
  workspace,
} from "vscode";
import { AltimateRequest, DBTColumnLineageRequest } from "../altimate";
import {
  ColumnMetaData,
  GraphMetaMap,
  NodeGraphMap,
  NodeMetaData,
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
};

const ALLOWED_NODE_TYPES = ["model.", "source.", "seed."];
const isAllowedNode = (key: string) =>
  ALLOWED_NODE_TYPES.some((t) => key.startsWith(t));

@provideSingleton(NewLineagePanel)
export class NewLineagePanel implements LineagePanelView {
  private _panel: WebviewView | undefined;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private dbCache: Map<string, Record<string, string>[]> = new Map();

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

    console.error("Unsupported mssage", message);
  }

  private async addColumnsFromDB(project: DBTProject, node: NodeMetaData) {
    if (!this.dbCache.has(node.name)) {
      const _columnsFromDB = await project.getColumnsInRelation(node.name);
      this.dbCache.set(node.name, _columnsFromDB);
    }
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
    table,
    refresh,
  }: {
    table: string;
    refresh: boolean;
  }) {
    const nodeMetaMap = this.getEvent()?.nodeMetaMap;
    if (!nodeMetaMap) {
      return;
    }
    const node = nodeMetaMap.get(table);
    if (!node) {
      return;
    }
    const project = this.getProject();
    if (!project) {
      return false;
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
        async () => await this.addColumnsFromDB(project, node),
      );
      if (!ok) {
        window.showErrorMessage(
          "Unable to get columns from DB for model: " +
            node.name +
            " table: " +
            table,
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
          table: table,
          datatype: c.data_type || "",
          can_lineage_expand: false,
          description: c.description,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  }

  private async getConnectedColumns({
    column,
    currAnd1HopTables,
  }: {
    column:
      | { name: string; table: string; downstreamTables: string[] }
      | undefined;
    currAnd1HopTables: string[];
  }) {
    const nodeMetaMap = this.getEvent()?.nodeMetaMap;
    if (!nodeMetaMap) {
      return;
    }
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
    try {
      await window.withProgress(
        {
          title: "Fetching metadata",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async () => {
          await Promise.all(
            Object.values(visibleTables).map(async (node) => {
              let compiledSql: string | undefined;
              if (node.config.materialized === "ephemeral") {
                // ephemeral nodes can be skipped. they dont have a schema
                // and their sql makes it into the compiled sql of the models
                // referring to it.
                return;
              }
              if (node.config.materialized !== "seed") {
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
          );
        },
      );
    } catch (exc) {
      if (exc instanceof PythonException) {
        window.showErrorMessage(
          "An error occured while trying to compile your node: " +
            exc.exception.message +
            ".",
        );
        this.telemetry.sendTelemetryError(
          "columnLineageCompileNodePythonError",
          exc,
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
        "Encountered an unknown issue: " + exc + " while compiling nodes.",
      );
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
    let result;
    try {
      result = await window.withProgress(
        {
          title: "Fetching column lineage",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async () => {
          const params: DBTColumnLineageRequest = {
            model_dialect: modelDialect,
            model_info: modelInfos,
          };
          if (column) {
            params.target_model = column.table;
            params.target_column = column.name;
            params.downstream_models = column.downstreamTables;
          }
          return await this.altimate.getColumnLevelLineage(params);
        },
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
    if (!Array.isArray(result)) {
      window.showErrorMessage(
        "An unexpected error occured while fetching column level lineage.",
      );
      this.telemetry.sendTelemetryEvent(
        "columnLevelLineageInvalidResponse",
        result,
      );
      return;
    }
    const columnLineage = result!.flat().filter((e) => !!e);
    console.log("cll -> ", columnLineage);
    return { columnLineage };
  }

  private getConnectedTables(
    key: keyof GraphMetaMap,
    table: string,
  ): Table[] | undefined {
    const graphMetaMap = this.getEvent()?.graphMetaMap;
    if (!graphMetaMap) {
      return;
    }
    const dependencyNodes = graphMetaMap[key];
    const node = dependencyNodes.get(table);
    if (!node) {
      return;
    }
    const tables: Map<string, Table> = new Map();
    const addToTables = (key: string, value: Omit<Table, "key">) => {
      if (!tables.has(key) && isAllowedNode(key)) {
        tables.set(key, { ...value, key });
      }
    };
    node.nodes.forEach(({ key, url, label }) => {
      addToTables(key, {
        table: label,
        url,
        nodeType: key.split(".")?.[0] || "model",
        upstreamCount: this.getConnectedNodeCount(
          graphMetaMap["children"],
          key,
        ),
        downstreamCount: this.getConnectedNodeCount(
          graphMetaMap["parents"],
          key,
        ),
      });
    });
    return Array.from(tables.values()).sort((a, b) =>
      a.table.localeCompare(b.table),
    );
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
    return g.get(key)?.nodes.filter((n) => isAllowedNode(n.key)).length || 0;
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
    const { graphMetaMap, nodeMetaMap } = event;
    const fileName = this.getFilename();
    const key = nodeMetaMap.get(fileName)?.uniqueId;
    if (!key) {
      return;
    }
    const downstreamCount = this.getConnectedNodeCount(
      graphMetaMap["parents"],
      key,
    );
    const upstreamCount = this.getConnectedNodeCount(
      graphMetaMap["children"],
      key,
    );
    return {
      node: {
        key,
        table: fileName,
        url: window.activeTextEditor!.document.uri.path,
        upstreamCount,
        downstreamCount,
        nodeType: key.split(".")?.[0] || "model",
      },
      aiEnabled: this.altimate.enabled(),
    };
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
