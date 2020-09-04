import { WebviewPanel, ViewColumn, window, ExtensionContext } from "vscode";
import G6 from '@antv/g6';
import { DBTManifestCacheChangedEvent, ModelNodeMetaMap } from "../dbtManifest";

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

interface Edge {
  target: string;
  source: string;
}

export class ModelGraphView {
  private currentPanel: WebviewPanel | undefined = undefined;
  private g6Data?: G6DataModel;
  private context: ExtensionContext;

  constructor(context: ExtensionContext) {
    this.context = context;
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.g6Data = this.mapToG6DataModel(event.modelNodeMetaMap);
  }

  show(): void {
    if (this.currentPanel !== undefined) {
      this.currentPanel.reveal();
      return;
    }
    if (this.g6Data !== undefined) {
      this.currentPanel = window.createWebviewPanel(
        'modelNodeView',
        'Model Node View',
        ViewColumn.One,
        {
          enableScripts: true
        }
      );
      this.currentPanel.webview.html = this.getWebviewContent();
      this.currentPanel.onDidDispose(
        () => {
          this.currentPanel = undefined;
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
    const width = document.getElementById('container').scrollWidth;
    const height = document.getElementById('container').scrollHeight || 500;
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      fitView: true,
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
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
        size: [200, 20],
        type: 'rect',
        style: {
          lineWidth: 2,
          stroke: '#5B8FF9',
          fill: '#C6E5FF',
        },
      },
      defaultEdge: {
        type: 'polyline',
        size: 1,
        color: '#e2e2e2',
        style: {
          endArrow: {
            path: 'M 0,0 L 8,4 L 8,-4 Z',
            fill: '#e2e2e2',
          },
          radius: 20,
        },
      },
    });

    graph.data(${JSON.stringify(this.g6Data)});
    graph.render();
    </script>
</body>
</html>`;
  }

  private mapToG6DataModel = (modelNodeMetaMap: ModelNodeMetaMap) => {
    const modelNodes = Array.from(modelNodeMetaMap.values());

    const nodes = modelNodes.map((modelNode) => {
      return {
        id: modelNode.uniqueId,
        label: modelNode.name,
      };
    });

    const edges: any[] = [];

    modelNodes.forEach(modelNode => {
      if (modelNode.dependencies !== undefined) {
        modelNode.dependencies.forEach(dependency => {
          edges.push({ target: modelNode.uniqueId, source: dependency });
        });
      }
    });

    return {
      nodes,
      edges
    };
  };
}