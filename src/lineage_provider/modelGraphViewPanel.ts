import { readFileSync } from "fs";
import * as path from "path";
import {
  CancellationToken,
  ColorThemeKind,
  commands,
  Disposable,
  TextEditor,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";

interface G6DataModel {
  nodes: {
    id: string;
    label: string;
  }[];
  edges: {
    source: string;
    target: string;
  }[];
}

const labelMaxWidth = 280;
const fontSize = 14;

const colors = {
  orange: "#EFB27B",
  blue: "#8DAAE8",
  green: "#8DE88E",
  black: "#000",
  purple: "#88447D",
  white: "#FFFFFF",
  softBlack: "#232b2b",
};

const nodeConfigurations: Record<string, any> = {
  children: {
    style: {
      lineWidth: 2,
      fill: colors.orange,
      stroke: colors.black,
      radius: 6,
    },
  },
  parents: {
    style: { lineWidth: 2, fill: colors.blue, stroke: colors.black, radius: 6 },
  },
  tests: {
    style: {
      lineWidth: 2,
      fill: colors.green,
      stroke: colors.black,
      radius: 6,
    },
  },
};

@provideSingleton(ModelGraphViewPanel)
export class ModelGraphViewPanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.ModelViewGraph";
  private _panel: WebviewView | undefined = undefined;
  private g6Data?: G6DataModel;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private _disposables: Disposable[] = [];

  public constructor(private dbtProjectContainer: DBTProjectContainer) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event)
    );
    window.onDidChangeActiveColorTheme(
      async (e) => {
        if (this._panel) {
          this.updateGraphStyle();
        }
      },
      null,
      this._disposables
    );
    window.onDidChangeActiveTextEditor((event: TextEditor | undefined) => {
      if (event === undefined) {
        return;
      }
      this.g6Data = this.parseGraphData();
      this.transmitData(this.g6Data);
      this.updateGraphStyle();
    });
  }

  private async transmitData(graphInfo: G6DataModel | undefined) {
    await this._panel!.webview.postMessage({
      command: "renderGraph",
      graph: graphInfo,
    });
  }

  private async updateGraphStyle() {
    const theme = [
      ColorThemeKind.Light,
      ColorThemeKind.HighContrastLight,
    ].includes(window.activeColorTheme.kind)
      ? "light"
      : "dark";
    await this._panel!.webview.postMessage({
      command: "setStylesByTheme",
      theme: theme,
    });
  }

  public async resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken
  ) {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
    this.setupWebviewHooks(context);
  }

  private async renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    this.g6Data = this.parseGraphData();
    webview.html = getHtml(webview, this.dbtProjectContainer.extensionUri);
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.title = "";
    this._panel!.description = "View dbt graph";
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  private setupWebviewHooks(context: WebviewViewResolveContext) {
    this._panel!.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "openFile":
            const { url } = message;
            if (!url) {
              return;
            }
            await commands.executeCommand("vscode.open", Uri.file(url), {
              preview: false,
              preserveFocus: true,
            });
        }
      },
      null,
      this._disposables
    );
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    this.g6Data = this.parseGraphData();
    this.transmitData(this.g6Data);
    this.updateGraphStyle();
  }

  private parseGraphData = () => {
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

    const { graphMetaMap } = event;
    const fileName = path.basename(
      window.activeTextEditor!.document.fileName,
      ".sql"
    );
    return this.mapParentsAndChildren(graphMetaMap, fileName);
  };

  private mapParentsAndChildren = (graphMetaMap: any, fileName: string) => {
    let nodes: any[] = [];
    const edges: any[] = [];
    Object.keys(nodeConfigurations).forEach((type) => {
      const dependencyNodes = graphMetaMap[type];
      Array.from(dependencyNodes.keys()).forEach((key: any) => {
        if (key.endsWith(`.${fileName}`) && key.startsWith("model.")) {
          const node = dependencyNodes!.get(key)!;
          const currentNode = node;
          nodes = this.addCurrentNode(key, nodes);
          if (currentNode !== undefined) {
            currentNode.nodes.map(
              (childrenNode: {
                key: "string";
                label: "string";
                url: "string";
              }) => {
                let edge = { target: childrenNode.key, source: key };
                if (type === "parents") {
                  edge = { target: key, source: childrenNode.key };
                }
                edges.push(edge);
                nodes.push({
                  id: childrenNode.key,
                  label: fitLabelToNodeWidth(
                    childrenNode.label,
                    labelMaxWidth,
                    fontSize
                  ),
                  style: nodeConfigurations[type].style,
                  url: childrenNode.url,
                });
              }
            );
          }
        }
      });
    });
    return { nodes, edges };
  };

  private addCurrentNode(nodeKey: string, nodes: any[]) {
    const nodeLabel: string = nodeKey.split(".").pop() || "";
    return [
      ...nodes,
      {
        id: nodeKey,
        label: fitLabelToNodeWidth(nodeLabel, labelMaxWidth, fontSize),
        labelCfg: { style: { fill: colors.white } },
        style: {
          fill: colors.purple,
          stroke: "black",
          radius: 6,
          lineWidth: 2,
        },
      },
    ];
  }
}

const calcStrLen = (label: string) => {
  let len = 0;
  for (let i = 0; i < label.length; i++) {
    if (label.charCodeAt(i) > 0 && label.charCodeAt(i) < 128) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
};

const fitLabelToNodeWidth = (
  label: string,
  maxWidth: number,
  fontSize: number
) => {
  const fontWidth = fontSize * 1.3;
  maxWidth = maxWidth * 2;
  const width = calcStrLen(label) * fontWidth;
  const ellipsis = "…";
  if (width > maxWidth) {
    const actualLen = Math.floor((maxWidth - 10) / fontWidth);
    const result = label.substring(0, actualLen) + ellipsis;
    return result;
  }
  return label;
};

function getHtml(webview: Webview, extensionUri: Uri) {
  const indexPath = getUri(webview, extensionUri, [
    "lineage_panel",
    "index.html",
  ]);
  const resourceDir = getUri(webview, extensionUri, ["lineage_panel"]);
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
