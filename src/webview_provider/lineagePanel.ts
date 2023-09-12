import { readFileSync } from "fs";
import * as path from "path";
import {
  CancellationToken,
  ColorThemeKind,
  commands,
  Disposable,
  ProgressLocation,
  TextEditor,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";

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

@provideSingleton(LineagePanel)
export class LineagePanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.LineageView";

  private _disposables: Disposable[] = [];
  private _panel: WebviewView | undefined;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
  ) {
    dbtProjectContainer.onManifestChanged((event) => {
      this.onManifestCacheChanged(event);
    });
    window.onDidChangeActiveColorTheme(
      async (e) => {
        if (this._panel) {
          //   this.updateGraphStyle();
        }
      },
      null,
      this._disposables,
    );
    window.onDidChangeActiveTextEditor((event: TextEditor | undefined) => {
      if (event === undefined) {
        return;
      }
      //   this.g6Data = this.parseGraphData();
      //   if (this._panel) {
      //     this.transmitData(this.g6Data);
      //     this.updateGraphStyle();
      //   }
    });
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    (async () => {
      if (this._panel) {
        await this._panel.webview.postMessage({
          command: "render",
          args: this.parseGraphData(),
        });
      }
    })();
  }

  resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    _token: CancellationToken,
  ): void | Thenable<void> {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
    this.setupWebviewHooks(context);
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
      this._disposables,
    );
    // const sendLineageViewEvent = () => {
    //   if (this._panel!.visible) {
    //     this.telemetry.sendTelemetryEvent("LineagePanelActive");
    //   }
    // };
    // sendLineageViewEvent();
    // this._panel!.onDidChangeVisibility(sendLineageViewEvent);
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
      ".sql",
    );
    return this.mapParentsAndChildren(graphMetaMap, fileName);
  };

  private mapParentsAndChildren = (graphMetaMap: any, fileName: string) => {
    const nodes: any[] = [];
    const edges: { source: string; target: string }[] = [];
    Object.entries(nodeConfigurations).forEach(([type, dependencyNodes]) => {
      Object.entries(dependencyNodes).forEach(([key, _node]) => {
        if (!key.endsWith(`.${fileName}`) || !key.startsWith("model.")) {
          return;
        }
        nodes.push({ id: key, label: key.split(".").pop() || "" });
        const node = _node as { nodes: any[] };
        if (!node?.nodes) {
          return;
        }
        node.nodes.forEach(
          (childrenNode: { key: "string"; label: "string"; url: "string" }) => {
            edges.push(
              type === "parents"
                ? { target: key, source: childrenNode.key }
                : { target: childrenNode.key, source: key },
            );
            nodes.push({ id: childrenNode.key, url: childrenNode.url });
          },
        );
      });
    });

    return { nodes, edges };
  };

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.title = "Lineage(Beta)";
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
  const indexPath = getUri(webview, extensionUri, [
    "new_lineage_panel2",
    "dist",
    "index.html",
  ]);
  const resourceDir = getUri(webview, extensionUri, [
    "new_lineage_panel2",
    "dist",
  ]);
  // const theme = [
  //   ColorThemeKind.Light,
  //   ColorThemeKind.HighContrastLight,
  // ].includes(window.activeColorTheme.kind)
  //   ? "light"
  //   : "dark";
  return (
    readFileSync(indexPath.fsPath)
      .toString()
      .replace(/\/__ROOT__/g, resourceDir.toString())
      .replace(/__ROOT__/g, resourceDir.toString())
      //   .replace(/__THEME__/g, theme)
      .replace(/__NONCE__/g, getNonce())
      .replace(/__CSPSOURCE__/g, webview.cspSource)
  );
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
