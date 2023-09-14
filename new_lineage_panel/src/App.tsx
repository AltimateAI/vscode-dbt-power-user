import { useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  NodeTypes,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "./CustomNodes";
import { layoutElementsOnCanvas } from "./graph";
import { createForwardEdge } from "./utils";

declare const acquireVsCodeApi: () => { postMessage: (v: unknown) => void };

const vscode = acquireVsCodeApi();

let id = 0;
const requestMap: Record<number, any> = {};
export const requestExecutor = (url: string, params: unknown) => {
  return new Promise((resolve, reject) => {
    requestMap[id] = { resolve, reject };
    vscode.postMessage({ command: "request", args: { id, url, params } });
    id++;
  });
};

const nodeTypes: NodeTypes = { table: TableNode };

function App() {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();

  useEffect(() => {
    // @ts-ignore
    const render = ({ node: n }) => {
      const _nodes: Node[] = [
        {
          id: n.table,
          data: {
            table: n.table,
            url: n.url,
            level: 0,
            shouldExpand: [n.downstreamCount > 0, n.upstreamCount > 0],
            processed: [false, false],
          },
          position: { x: 100, y: 100 },
          type: "table",
        },
      ];
      flow.current?.setNodes(_nodes);
    };
    const response = (args: {
      id: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: any;
      status: boolean;
      error: string;
    }) => {
      const { resolve, reject } = requestMap[args.id];
      if (args.status) {
        resolve(args.body);
      } else {
        reject(args.error);
      }
      delete requestMap[args.id];
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const commandMap: Record<string, (a: any) => void> = { render, response };
    window.addEventListener("message", (event) => {
      const { command, args } = event.data;
      if ((command as string) in commandMap) {
        commandMap[command](args);
      }
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        defaultNodes={[]}
        defaultEdges={[]}
        onInit={(_flow) => (flow.current = _flow)}
        nodeTypes={nodeTypes}
        style={{ background: "#f5f5f7" }}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
