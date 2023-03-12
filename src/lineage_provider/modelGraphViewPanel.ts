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
          const webview = this._panel!.webview!;
          this._panel.webview.html = getHtml(
            webview,
            this.dbtProjectContainer.extensionUri
          );
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
    });
  }

  private async transmitData(graphInfo: G6DataModel | undefined) {
    await this._panel!.webview.postMessage({
      command: "renderGraph",
      graph: graphInfo,
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
    const mapToWebviewURI = (uri: string) => {
      return this._panel?.webview.asWebviewUri(Uri.file(uri));
    };
    const nodeConfigurations: Record<string, any> = {
      children: { style: { fill: "#EFB27B", stroke: "#000" } },
      parents: { style: { fill: "#8DAAE8", stroke: "#000" } },
      tests: { style: { fill: "#8DE88E", stroke: "#000" } },
    };

    const calculateLabelWidth = (label: string): number => {
      const defaultLength = 250;
      const bigLabelLength = 750;
      if (label.length > 35) {
        return bigLabelLength;
      }
      return defaultLength;
    };

    const nodes: any[] = [];
    const edges: any[] = [];
    Object.keys(nodeConfigurations).forEach((type) => {
      const dependencyNodes = graphMetaMap[type];
      Array.from(dependencyNodes.keys()).forEach((key: any) => {
        if (key.endsWith(`.${fileName}`) && key.startsWith("model.")) {
          const node = dependencyNodes!.get(key)!;
          const currentNode = node;
          const image =
            currentNode?.iconPath !== undefined
              ? {
                  show: true,
                  img: mapToWebviewURI(currentNode.iconPath.dark)!.toString(),
                }
              : {
                  show: false,
                };
          nodes.push({
            id: key,
            size: [calculateLabelWidth(key), 40],
            label: key,
            x: 150,
            y: 150,
            logoIcon: image,
            style: {
              fill: "#88447D",
              stroke: "black",
            },
            labelCfg: { style: { fill: "#FFFFFF" } },
          });
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
                  size: [calculateLabelWidth(childrenNode.label), 40],
                  label: childrenNode.label,
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
}

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
