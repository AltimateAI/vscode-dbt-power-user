import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import {
  CancellationToken,
  ColorThemeKind,
  Uri,
  Webview,
  WebviewOptions,
  window,
  Disposable,
  WebviewPanel,
  env,
  workspace,
  commands,
  ProgressLocation,
  TextEditor,
} from "vscode";
import { AltimateRequest, Details, ModelNode } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import * as crypto from "crypto";
import { DBTProject } from "../manifest/dbtProject";
import { NodeMetaData, SourceTable } from "../domain";
import { QueryManifestService } from "../services/queryManifestService";

type SQLLineage = {
  tableEdges: [string, string][];
  details: Details;
  nodePositions?: Record<string, [number, number]>;
  errorMessage?: undefined;
};

@provideSingleton(SQLLineagePanel)
export class SQLLineagePanel implements Disposable {
  public static readonly viewType = "dbtPowerUser.sqlLineage";
  private disposables: Disposable[] = [];
  private _panel?: WebviewPanel;
  private activeTextEditor?: TextEditor;

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimate: AltimateRequest,
    private telemetry: TelemetryService,
    private terminal: DBTTerminal,
    private queryManifestService: QueryManifestService,
  ) {
    window.onDidChangeActiveColorTheme(
      async () => {
        this.changedActiveColorTheme();
      },
      null,
      this.disposables,
    );
    this.activeTextEditor = window.activeTextEditor;
    window.onDidChangeActiveTextEditor((event: TextEditor | undefined) => {
      if (event) {
        this.activeTextEditor = event;
      }
    });
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
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

  private getEvent(): ManifestCacheProjectAddedEvent | undefined {
    const currentFilePath = this.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      return;
    }
    return this.queryManifestService.getEventByDocument(currentFilePath);
  }

  getActiveEditorFilename() {
    return path.basename(this.activeTextEditor!.document.fileName, ".sql");
  }

  private getProject() {
    const currentFilePath = this.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      return;
    }
    return this.queryManifestService.getProjectByUri(currentFilePath);
  }

  private getMissingLineageMessage() {
    const message =
      "A valid dbt file (model, seed etc.) needs to be open and active in the editor area above to view lineage";
    try {
      this.getProject()?.throwDiagnosticsErrorIfAvailable();
    } catch (err) {
      return (err as Error).message;
    }

    return message;
  }

  async getSQLLineage(token: CancellationToken): Promise<SQLLineage> {
    const event = this.getEvent();
    if (!event) {
      throw new Error(this.getMissingLineageMessage());
    }
    const { nodeMetaMap, sourceMetaMap } = event;
    const project = this.getProject();
    if (!project) {
      throw new Error("Unable to find the project");
    }
    const modelName = this.getActiveEditorFilename();
    const currentFile = this.activeTextEditor?.document.uri;
    if (!currentFile) {
      throw new Error("Unable to get current file");
    }
    const fileContentBytes = await workspace.fs.readFile(currentFile);
    const compiledSQL = await project.unsafeCompileQuery(
      fileContentBytes.toString(),
      modelName,
    );
    if (!compiledSQL) {
      throw new Error(`Unable to compile sql for model ${modelName}`);
    }
    const currNode = nodeMetaMap.lookupByBaseName(modelName);
    if (!currNode) {
      throw new Error(`Unable to find model for model ${modelName}`);
    }
    let model_info: { model_node: ModelNode }[] = [];
    const config = workspace.getConfiguration("dbt.lineage");
    const modelId = currNode.uniqueId;
    const modelsToFetch = DBTProject.getNonEphemeralParents(event, [modelId]);
    let shouldFetchSchema = false;
    if (currNode.path) {
      const sql = (
        await workspace.fs.readFile(Uri.file(currNode.path))
      ).toString();
      shouldFetchSchema = !(await project.validateWhetherSqlHasColumns(sql));
    }

    if (config.get("useSchemaForQueryVisualizer", false) || shouldFetchSchema) {
      const { mappedNode } = await project.getNodesWithDBColumns(
        event,
        modelsToFetch,
        token,
      );
      model_info = modelsToFetch.map((n) => ({ model_node: mappedNode[n] }));
    }
    const hash = crypto.createHash("md5").update(compiledSQL).digest("hex");
    const sessionId = `${env.sessionId}-${hash}`;
    const response = await this.altimate.sqlLineage({
      compiled_sql: compiledSQL,
      model_info,
      model_dialect: project.getAdapterType(),
      session_id: sessionId,
    });
    const { details, nodePositions } = response;

    const nodeMapping: Record<string, { nodeType: string; nodeId: string }> =
      {};
    for (const modelId of modelsToFetch) {
      const splits = modelId.split(".");
      if (splits[0] === "source") {
        const _source = sourceMetaMap.get(splits[splits.length - 2]);
        const _table = splits[splits.length - 1].toLowerCase();
        if (_source) {
          for (const key in details) {
            if (details[key].type === "table" && key.toLowerCase() === _table) {
              nodeMapping[key] = { nodeType: "source", nodeId: modelId };
              break;
            }
          }
          continue;
        }
      }
      const _node = nodeMetaMap.lookupByUniqueId(modelId);
      if (_node) {
        for (const key in details) {
          if (
            details[key].type === "table" &&
            key.toLowerCase() === _node.alias.toLowerCase()
          ) {
            nodeMapping[key] = {
              nodeType: _node.resource_type,
              nodeId: modelId,
            };
            break;
          }
        }
        continue;
      }
    }
    nodeMapping[modelName] = {
      nodeType: currNode.resource_type,
      nodeId: currNode.uniqueId,
    };
    const FINAL_SELECT = "__final_select__";
    const tableEdges = response.tableEdges.map(
      (edge) =>
        edge.map((item) => (item === FINAL_SELECT ? modelName : item)) as [
          string,
          string,
        ],
    );
    details[modelName] = details[FINAL_SELECT];
    delete details[FINAL_SELECT];
    for (const k in details) {
      details[k] = { ...details[k], ...nodeMapping[k] };
      if (k === modelName) {
        details[k]["name"] = modelName;
      }
    }
    if (nodePositions) {
      nodePositions[modelName] = nodePositions[FINAL_SELECT];
      delete nodePositions[FINAL_SELECT];
    }
    return { tableEdges, details, nodePositions };
  }

  resolveWebviewView(
    panel: WebviewPanel,
    lineage: SQLLineage,
  ): void | Thenable<void> {
    this._panel = panel;
    this.terminal.debug(
      "sqlLineagePanel:resolveWebviewView",
      "onResolveWebviewView",
    );
    this.setupWebviewOptions();
    this.renderWebviewView();
    this.changedActiveColorTheme();
    this._panel.webview.onDidReceiveMessage(
      this.handleWebviewMessage,
      null,
      [],
    );
    this._panel.webview.postMessage({
      command: "render",
      args: lineage,
    });
  }

  private handleWebviewMessage = async (message: {
    command: string;
    args: any;
  }) => {
    this.terminal.debug(
      "sqlLineagePanel:handleWebviewMessage",
      "message",
      message,
    );
    const { command, args } = message;
    const { id, params } = args;
    if (command === "openURL") {
      if (!args.url) {
        return;
      }
      env.openExternal(Uri.parse(args.url));
      return;
    }
    // common commands
    if (command === "openFile") {
      const { url } = args;
      if (!url) {
        return;
      }
      await commands.executeCommand("vscode.open", Uri.file(url), {
        preview: false,
        preserveFocus: true,
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
  };

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
    const event = this.getEvent();
    if (!event) {
      return;
    }
    const project = this.getProject();
    if (!project) {
      return;
    }
    const splits = table.split(".");
    const nodeType = splits[0];
    if (nodeType === DBTProject.RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = event;
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
    const { nodeMetaMap } = event;
    const node = nodeMetaMap.lookupByUniqueId(table);
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

  private setupWebviewOptions() {
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  private renderWebviewView() {
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
    .replace(/__CSPSOURCE__/g, webview.cspSource)
    .replace(/__LINEAGE_TYPE__/g, "static");
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
