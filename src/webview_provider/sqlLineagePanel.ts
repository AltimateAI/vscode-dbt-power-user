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
} from "vscode";
import { AltimateRequest, Details, ModelNode } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import * as crypto from "crypto";

type SQLLineage = {
  tableEdges: [string, string][];
  details: Details;
  errorMessage?: undefined;
};

@provideSingleton(SQLLineagePanel)
export class SQLLineagePanel implements Disposable {
  public static readonly viewType = "dbtPowerUser.SQLLineage";
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private disposables: Disposable[] = [];
  private _panel?: WebviewPanel;

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimate: AltimateRequest,
    private telemetry: TelemetryService,
    private terminal: DBTTerminal,
  ) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
    );
    window.onDidChangeActiveColorTheme(
      async (e) => {
        this.changedActiveColorTheme();
      },
      null,
      this.disposables,
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
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

  getFilename() {
    return path.basename(window.activeTextEditor!.document.fileName, ".sql");
  }

  private getProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      return;
    }
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
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

  async getSQLLineage(
    token: CancellationToken,
  ): Promise<{ errorMessage: string } | SQLLineage> {
    const event = this.getEvent();
    if (!event) {
      return {
        errorMessage: this.getMissingLineageMessage(),
      };
    }
    const { graphMetaMap, nodeMetaMap, sourceMetaMap } = event;
    const project = this.getProject();
    if (!project) {
      return { errorMessage: "Unable to find the project" };
    }
    const modelName = this.getFilename();
    const currentFile = window.activeTextEditor?.document.uri;
    if (!currentFile) {
      return { errorMessage: "Unable to get current file" };
    }
    const fileContentBytes = await workspace.fs.readFile(currentFile);
    const compiledSQL = await project.unsafeCompileQuery(
      fileContentBytes.toString(),
      modelName,
    );
    if (!compiledSQL) {
      return { errorMessage: "Unable to compile sql" };
    }
    const currNode = nodeMetaMap.get(modelName);
    if (!currNode) {
      return { errorMessage: "Unable to find model" };
    }
    let model_info: { model_node: ModelNode }[] = [];
    const config = workspace.getConfiguration("dbt.lineage");
    const modelId = currNode.uniqueId;
    const parentModels = graphMetaMap.parents.get(modelId)?.nodes || [];
    const modelsToFetch = parentModels.map((n) => n.key);
    if (config.get("useSchemaForQueryVisualizer", false)) {
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
    const { details } = response;

    const nodeTypeMapping: Record<string, string> = {};
    for (const modelId of modelsToFetch) {
      const splits = modelId.split(".");
      if (splits[0] === "source") {
        const _source = sourceMetaMap.get(splits[splits.length - 2]);
        const _table = splits[splits.length - 1].toLowerCase();
        if (_source) {
          for (const key in details) {
            if (details[key].type === "table" && key.toLowerCase() === _table) {
              nodeTypeMapping[key] = "source";
              break;
            }
          }
          continue;
        }
      }
      const _node = nodeMetaMap.get(splits[splits.length - 1]);
      if (_node) {
        for (const key in details) {
          if (
            details[key].type === "table" &&
            key.toLowerCase() === _node.alias.toLowerCase()
          ) {
            nodeTypeMapping[key] = _node.resource_type;
            break;
          }
        }
        continue;
      }
    }
    nodeTypeMapping[modelName] = currNode.resource_type;
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
      details[k]["nodeType"] = nodeTypeMapping[k];
      if (k === modelName) {
        details[k]["name"] = modelName;
      }
    }
    return { tableEdges, details };
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
    this._panel.webview.postMessage({
      command: "render",
      args: lineage,
    });
    this._panel.webview.onDidReceiveMessage(
      this.handleWebviewMessage,
      null,
      [],
    );
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

    if (command === "getLineageSettings") {
      const config = workspace.getConfiguration("dbt.lineage");
      this._panel?.webview.postMessage({
        command: "response",
        args: {
          id,
          status: true,
          body: {
            showSelectEdges: config.get("showSelectEdges", true),
            showNonSelectEdges: config.get("showNonSelectEdges", true),
            defaultExpansion: config.get("defaultExpansion", 1),
            useSchemaForQueryVisualizer: config.get(
              "useSchemaForQueryVisualizer",
              false,
            ),
          },
        },
      });
      return;
    }
  };

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
