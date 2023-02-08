import {
  window,
  Uri,
  WebviewViewProvider,
  WebviewView,
  Disposable,
  CancellationToken,
  WebviewViewResolveContext,
  WebviewOptions,
} from "vscode";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { GraphMetaMap } from "../domain";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";

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
  private childrenMap?: GraphMetaMap["children"];
  private _disposables: Disposable[] = [];

  public constructor(private dbtProjectContainer: DBTProjectContainer) {
    window.onDidChangeActiveColorTheme(
      async (e) => {
        if (this._panel) {
          this._panel.webview.html = this.getWebviewContent();
        }
      },
      null,
      this._disposables
    );
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

  private async renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    this._panel!.webview.html = this.getWebviewContent();
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.title = "Lineage graph";
    this._panel!.description = "Preview project lineage";
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  onDBTManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    // this.childrenMap = event.GraphMetaMap.added;
    // cambiar por algo mas parecido a esto:
    // event.added?.forEach((added) => {
    //     this.docAutocompleteNameItemsMap.set(
    //       added.projectRoot.fsPath,
    //       Array.from(added.docMetaMap.keys()).map(
    //         (docName) => new CompletionItem(docName, CompletionItemKind.File)
    //       )
    //     );
    //   });
    //   event.removed?.forEach((removed) => {
    //     this.docAutocompleteNameItemsMap.delete(removed.projectRoot.fsPath);
    //   });
    if (this._panel !== undefined) {
      // this.show();
    }
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

    Array.from(this.childrenMap.keys()).forEach((key) => {
      //   const childNode = this.childrenMap!.get(key)!;
      //   const currentNode = childNode;
      //   const image =
      //     currentNode.iconPath !== undefined
      //       ? {
      //           show: true,
      //           img: mapToWebviewURI(currentNode.iconPath.dark)!.toString(),
      //         }
      //       : {
      //           show: false,
      //         };
      //   nodes.push({
      //     id: key,
      //     label: currentNode.label,
      //     logoIcon: image,
      //     style: {
      //       fill: "#ffffff",
      //     },
      //   });
    });

    const edges: any[] = [];

    Array.from(this.childrenMap.keys()).forEach((key) => {
      const childrenNodes = this.childrenMap!.get(key);
      if (childrenNodes !== undefined) {
        childrenNodes.nodes.map((childrenNode) => {
          edges.push({ target: childrenNode.key, source: key });
        });
      }
    });

    return {
      nodes,
      edges,
    };
  };
}
