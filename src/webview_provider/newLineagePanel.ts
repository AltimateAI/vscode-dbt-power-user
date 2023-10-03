import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import {
  CancellationToken,
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
import { AltimateRequest } from "../altimate";
import { ColumnMetaData, GraphMetaMap, NodeMetaData } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { LineagePanelView } from "./lineagePanel";
import { DBTProject } from "../manifest/dbtProject";

type Table = {
  key: string;
  table: string;
  url: string;
  downstreamCount: number;
  upstreamCount: number;
  nodeType: string;
};

@provideSingleton(NewLineagePanel)
export class NewLineagePanel implements LineagePanelView {
  private _panel: WebviewView | undefined;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimate: AltimateRequest,
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

  changedActiveColorTheme() {}

  init() {
    console.log("lineage:init -> ", this._panel);
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
      window.withProgress(
        {
          title: "Fetching Column Lineage",
          location: ProgressLocation.Notification,
          cancellable: false,
        },
        async () => {
          const body = await this.getConnectedColumns(params);
          this._panel?.webview.postMessage({
            command: "response",
            args: { id, body, status: true },
          });
        },
      );
      return;
    }

    console.error("Unsupported mssage", message);
  }

  private async addColumnsFromDB(
    project: DBTProject | undefined,
    node: NodeMetaData,
    table: string,
  ) {
    if (!project) {
      return false;
    }
    const columnsFromDB = await project.getColumnsInRelation(table);
    if (!columnsFromDB || columnsFromDB.length === 0) {
      return false;
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
    return true;
  }

  private async getColumns({ table }: { table: string }) {
    const nodeMetaMap = this.getEvent()?.nodeMetaMap;
    if (!nodeMetaMap) {
      return;
    }
    const _table = nodeMetaMap.get(table);
    if (!_table) {
      return;
    }
    this.addColumnsFromDB(this.getProject(), _table, table);

    return {
      id: _table.uniqueId,
      purpose: _table.description,
      columns: Object.values(_table.columns)
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
    table,
    column,
    edges,
  }: {
    table: string;
    column: string;
    edges: { src: string; dst: string }[];
  }) {
    const nodeMetaMap = this.getEvent()?.nodeMetaMap;
    if (!nodeMetaMap) {
      return;
    }
    const project = this.getProject();
    if (!project) {
      return;
    }
    const nonSourceNodes: Record<string, number> = {};
    edges.forEach((e) => {
      if (!(e.dst in nonSourceNodes)) {
        nonSourceNodes[e.dst] = 0;
      }
      nonSourceNodes[e.dst]++;
    });

    const visibleTables: Record<string, NodeMetaData> = {};
    Object.entries(nonSourceNodes).forEach(([t, v]) => {
      if (v === 0) {
        return;
      }
      if (t in visibleTables) {
        return;
      }
      const node = nodeMetaMap.get(t);
      if (!node) {
        return;
      }
      if (node.config.materialized === "seed") {
        return;
      }
      visibleTables[t] = node;
    });

    const modelInfos: {
      compiled_sql: string;
      model_node: NodeMetaData;
    }[] = [];
    const relationsWithoutColumns: string[] = [];
    await Promise.all(
      Object.values(visibleTables).map(async (node) => {
        const uri = Uri.file(node.path);
        const data = await workspace.fs.readFile(uri);
        const fileContent = Buffer.from(data).toString("utf8");
        const compiledSql = await project.compileQuery(fileContent);
        if (!compiledSql) {
          return;
        }
        const ok = await this.addColumnsFromDB(project, node, node.alias);
        if (!ok) {
          relationsWithoutColumns.push(node.alias);
          return;
        }
        modelInfos.push({ compiled_sql: compiledSql, model_node: node });
      }),
    );
    if (relationsWithoutColumns.length !== 0) {
      window.showErrorMessage(
        "Column lineage failed to fetch columns for following tables: " +
          relationsWithoutColumns.join(", ") +
          ". Please first materialize these models by executing dbt run.",
      );
      return;
    }

    const modelDialect = project.getAdapterType();
    const result = await this.altimate.getColumnLevelLineage({
      model_dialect: modelDialect,
      model_info: modelInfos,
    });
    // FIXME - err bounds needed here. results can be undefined if call fails
    //  This should be handled in altimate.ts and throw exceptions instead
    if (!Array.isArray(result)) {
      window.showErrorMessage(
        "An unexpected error occured while fetching column level lineage: " +
          result,
      );
      return;
    }
    const columnLineages = result!
      .flat()
      .filter((e) => !!e)
      .map((e) => ({
        src: e!.source.join("/"),
        dst: e!.target.join("/"),
      }));
    // collect_columns is a map from table to columns. This is to show columns in each table node
    const collectColumns: Record<string, string[]> = {};
    // highlightEdges contains edges of column lineage connection
    const highlightEdges: [string, string][] = [];

    // Performing BFS traversal only in ONE direction (upstream/downstream)
    // Because too many columns showing in the presence of a super popular column

    const bfsTraversal = (
      connectedColumns: (column: string) => string[],
      createEdge: (t1: string, t2: string) => [string, string],
    ) => {
      const queue: string[] = [table + "/" + column];
      const visited: Record<string, boolean> = {};
      let i = 0;
      const MAX_ITERATION_LIMIT = 1000; // Define your maximum iteration limit here

      while (queue.length > 0 && i < MAX_ITERATION_LIMIT) {
        i += 1;
        const curr = queue.shift()!;
        visited[curr] = true;
        const [table, column] = curr.split("/");
        collectColumns[table] = collectColumns[table] || [];
        collectColumns[table].push(column);
        for (const c of connectedColumns(curr)) {
          const [_t, _] = c.split("/");
          if (visited[c]) {
            continue;
          }
          queue.push(c);
          highlightEdges.push(createEdge(curr, c));
        }
      }
    };

    bfsTraversal(
      (c) => columnLineages.filter((x) => x.src === c).map((x) => x.dst),
      (t1, t2) => [t1, t2],
    );
    bfsTraversal(
      (c) => columnLineages.filter((x) => x.dst === c).map((x) => x.src),
      (t1, t2) => [t2, t1],
    );
    for (const t in collectColumns) {
      collectColumns[t] = [...new Set(collectColumns[t])];
    }

    console.log(
      "column lineage -> ",
      columnLineages,
      collectColumns,
      highlightEdges,
    );
    return { collectColumns, highlightEdges };
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
    const allowedNodeTypes = ["model.", "source.", "seed."];
    const addToTables = (key: string, value: Omit<Table, "key">) => {
      if (!tables.has(key) && allowedNodeTypes.some((t) => key.startsWith(t))) {
        tables.set(key, { ...value, key });
      }
    };
    node.nodes.forEach(({ key, url, label }) => {
      addToTables(key, {
        table: label,
        url,
        nodeType: key.split(".")?.[0] || "model",
        upstreamCount: graphMetaMap["children"].get(key)?.nodes.length || 0,
        downstreamCount: graphMetaMap["parents"].get(key)?.nodes.length || 0,
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
    const downstreamCount = graphMetaMap["parents"].get(key)?.nodes.length || 0;
    const upstreamCount = graphMetaMap["children"].get(key)?.nodes.length || 0;
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
