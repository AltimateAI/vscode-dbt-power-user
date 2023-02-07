import {
  WebviewPanel,
  ViewColumn,
  window,
  ExtensionContext,
  Uri,
} from "vscode";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { GraphMetaMap } from "../domain";
import navigateToFile from "../commands/navigateToFile";
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
@provideSingleton(ModelGraphView)
export class ModelGraphView {
  private currentPanel: WebviewPanel | undefined = undefined;
  private g6Data?: G6DataModel;
  private context: ExtensionContext;
  private childrenMap?: GraphMetaMap["children"];

  constructor(context: ExtensionContext) {
    this.context = context;
  }

  onDBTManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    // interesa el graph meta map que es el que tiene los children
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
    if (this.currentPanel !== undefined) {
      this.show();
    }
  }

  show(): void {
    if (this.childrenMap !== undefined) {
      this.currentPanel = window.createWebviewPanel(
        "modelGraphView",
        "Model Graph View",
        ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            Uri.joinPath(this.context.extensionUri, "media"),
          ],
        }
      );

      this.g6Data = this.mapToG6DataModel();

      this.currentPanel.webview.html = this.getWebviewContent();
      this.currentPanel.onDidDispose(
        () => {
          this.currentPanel = undefined;
        },
        null,
        this.context.subscriptions
      );
      this.currentPanel.webview.onDidReceiveMessage(
        (message) => {
          //   if (this.childrenMap === undefined) {
          //     return;
          //   }
          //   const nodeInfo = this.childrenMap.get(message.nodeName);
          //   if (nodeInfo === undefined) {
          //     return;
          //   }
          //   navigateToFile(nodeInfo.currentNode.url);
        },
        null,
        this.context.subscriptions
      );
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
      return this.currentPanel?.webview.asWebviewUri(Uri.file(uri));
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
