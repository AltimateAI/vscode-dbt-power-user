import {
  CancellationToken,
  Disposable,
  TextEditor,
  Uri,
  WebviewOptions,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
} from "vscode";
import { GraphMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
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
  private childrenMap?: Map<string, GraphMetaMap["children"]> = new Map();
  private _disposables: Disposable[] = [];

  public constructor(private dbtProjectContainer: DBTProjectContainer) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event)
    );
    window.onDidChangeActiveColorTheme(
      async (e) => {
        if (this._panel) {
          this._panel.webview.html = this.getWebviewContent();
        }
      },
      null,
      this._disposables
    );
    window.onDidChangeActiveTextEditor((event: TextEditor | undefined) => {
      if (event === undefined) {
        return;
      }
      this.g6Data = this.mapToG6DataModel();
      this.g6Data = this.updateVisualizationDataModel(
        event.document.uri.fsPath
      );
      this._panel!.webview.html = this.getWebviewContent();
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
  }

  private updateVisualizationDataModel(path: string): G6DataModel {
    return {
      nodes: [],
      edges: [],
    };
  }

  private async renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    this.g6Data = this.mapToG6DataModel();
    this._panel!.webview.html = this.getWebviewContent();
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.title = "Lineage graph";
    this._panel!.description = "Preview project lineage";
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      if (!this.childrenMap) {
        this.childrenMap = new Map();
      }
      this.childrenMap.set(
        added.projectRoot.fsPath,
        added.graphMetaMap.children
      );
    });
    event.removed?.forEach((removed) => {
      if (!this.childrenMap) {
        this.childrenMap = new Map();
      }
      this.childrenMap.delete(removed.projectRoot.fsPath);
    });
  }

  private getWebviewContent(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Model Node View</title>
</head>
<body>
    <div id="container"></div>
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>
    <script>
    const vscode = acquireVsCodeApi();
    const width = document.getElementById('container').scrollWidth;
    const height = document.getElementById('container').scrollHeight || 500;
    const miniMap = new G6.Minimap({
      size: [200, 100],
      className: 'minimap',
    });
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      fitView: true,
      modes: {
        default: ['zoom-canvas', 'click-select', 'drag-canvas'],
      },
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        align: 'UL',
        controlPoints: true,
        nodesepFunc: () => 1,
        ranksepFunc: () => 1,
      },
      defaultNode: {
        size: [250, 40],
        type: 'modelRect',
        style: {
          lineWidth: 2,
          stroke: '#5B8FF9',
          fill: '#C6E5FF',
        },
        stateIcon: {
          show: false,
        }
      },
      defaultEdge: {
        type: 'polyline',
        size: 1,
        color: '#e2e2e2',
        style: {
          endArrow: true,
        }
      },
    });
    
    graph.addPlugin(miniMap);
    graph.data(${JSON.stringify(this.g6Data)});
    graph.render();
    graph.on('nodeselectchange', (e) => {
      const nodeName = e.target._cfg.model.id;
      vscode.postMessage({
        nodeName
      })
    });
    </script>
</body>
</html>`;
  }

  private mapToG6DataModel = () => {
    if (this.childrenMap === undefined) {
      return;
    }

    const mapToWebviewURI = (uri: string) => {
      return this._panel?.webview.asWebviewUri(Uri.file(uri));
    };

    const nodes: any[] = [];

    const firstMap = this.childrenMap.entries().next().value;

    if (firstMap === undefined) {
      return {
        nodes: [
          {
            id: "node1",
            label: "Circle1",
            x: 150,
            y: 150,
          },
          {
            id: "node2",
            label: "Circle2",
            x: 400,
            y: 150,
          },
        ],
        edges: [
          {
            source: "node1",
            target: "node2",
          },
        ],
      };
    }
    const firstProjectMap = firstMap[1];
    Array.from(firstProjectMap.keys()).forEach((key) => {
      const childNode = firstProjectMap!.get(key)!;
      const currentNode = childNode;
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
        label: currentNode.label,
        logoIcon: image,
        style: {
          fill: "#ffffff",
        },
      });
    });

    const edges: any[] = [];

    Array.from(firstProjectMap.keys()).forEach((key) => {
      const childrenNodes = firstProjectMap!.get(key);
      if (childrenNodes !== undefined) {
        childrenNodes.nodes.map((childrenNode: { key: "string" }) => {
          edges.push({ target: childrenNode.key, source: key });
        });
      }
    });

    return { nodes, edges };
  };
}
