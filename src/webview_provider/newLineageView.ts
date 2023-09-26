import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import {
  CancellationToken,
  TextEditor,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewResolveContext,
  window,
} from "vscode";
import { TelemetryService } from "../telemetry";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { GraphMetaMap } from "../domain";
import { LineagePanelView } from "./lineagePanel";

type Table = {
  table: string;
  url: string;
  label: string;
  downstreamCount: number;
  upstreamCount: number;
};

export class NewLineagePanel implements LineagePanelView {
  private _panel: WebviewView | undefined;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    console.log("lineage:constructor -> ", this._panel);
    window.onDidChangeActiveTextEditor((event: TextEditor | undefined) => {
      if (event === undefined) {
        return;
      }
      if (!this._panel) {
        return;
      }
      this.renderStartingNode();
    });
  }

  onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    console.log("lineage:onManifestCacheChanged -> ", this._panel);
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    this.init();
  }

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

  handleRequest(args: { url: string; id: number; params: unknown }) {
    let body;
    if (args.url === "upstreamTables") {
      body = {
        tables: this.getUpstreamTables(args.params as { table: string }),
      };
    }
    if (args.url === "downstreamTables") {
      body = {
        tables: this.getDownstreamTables(args.params as { table: string }),
      };
    }
    this._panel?.webview.postMessage({
      command: "response",
      args: {
        id: args.id,
        body,
        status: true,
      },
    });
  }

  private getConnectedTables(
    key: keyof GraphMetaMap,
    table: string,
  ): Table[] | undefined {
    const graphMetaMap = this.getGraphMetaMap();
    if (!graphMetaMap) {
      return;
    }
    const dependencyNodes = graphMetaMap[key];
    const node = dependencyNodes.get(table);
    if (!node) {
      return;
    }
    const tables: Map<string, Table> = new Map();
    const addToTables = (key: string, value: Omit<Table, "table">) => {
      if (!tables.has(key)) {
        tables.set(key, { ...value, table: key });
      }
    };
    node.nodes.forEach(({ key, url, label }) => {
      addToTables(key, {
        url,
        label,
        upstreamCount: graphMetaMap["children"].get(key)?.nodes.length || 0,
        downstreamCount: graphMetaMap["parents"].get(key)?.nodes.length || 0,
      });
    });
    return Array.from(tables.values()).sort((a, b) =>
      a.label.localeCompare(b.label),
    );
  }

  private getUpstreamTables({ table }: { table: string }) {
    return this.getConnectedTables("children", table);
  }

  private getDownstreamTables({ table }: { table: string }) {
    return this.getConnectedTables("parents", table);
  }

  private getGraphMetaMap(): GraphMetaMap | undefined {
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

    return event.graphMetaMap;
  }

  private getStartingNode() {
    const graphMetaMap = this.getGraphMetaMap();
    if (!graphMetaMap) {
      return;
    }
    const fileName = path.basename(
      window.activeTextEditor!.document.fileName,
      ".sql",
    );
    const dependencyNodes = graphMetaMap["parents"];
    const key = Array.from(dependencyNodes.keys()).find(
      (k) => k.endsWith(`.${fileName}`) && k.startsWith("model."),
    );
    if (!key) {
      return;
    }
    const downstreamCount = dependencyNodes.get(key)?.nodes.length || 0;
    const upstreamCount = graphMetaMap["children"].get(key)?.nodes.length || 0;
    return {
      node: {
        table: key,
        url: window.activeTextEditor!.document.uri.path,
        upstreamCount,
        downstreamCount,
      },
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
