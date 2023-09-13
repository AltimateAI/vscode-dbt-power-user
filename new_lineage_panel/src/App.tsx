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

const nodeTypes: NodeTypes = { table: TableNode };

function App() {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();

  useEffect(() => {
    // @ts-ignore
    const render = ({ nodes, edges }) => {
      const _nodes: Node[] = (
        nodes as { id: string; url: string; level: string }[]
      ).map((n) => ({
        id: n.id,
        data: n,
        position: { x: 100, y: 100 },
        type: "table",
      }));
      const _edges: Edge[] = edges.map(
        (e: { source: string; target: string }) =>
          createForwardEdge(e.source, e.target, true)
      );
      layoutElementsOnCanvas(_nodes, _edges);
      flow.current?.setNodes(_nodes);
      flow.current?.setEdges(_edges);
    };
    const commandMap = { render };
    window.addEventListener("message", (event) => {
      const { command, args } = event.data;
      commandMap[command as "render"](args);
      vscode.postMessage({ command: "thisistest", args: { id: 1 } });
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
