import { useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  NodeTypes,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "./CustomNodes";
import { layoutElementsOnCanvas } from "./graph";

// declare var acquireVsCodeApi: () => { postMessage: (v: any) => void };

// const vscode = acquireVsCodeApi();

const nodeTypes: NodeTypes = { table: TableNode };

function App() {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();

  useEffect(() => {
    // @ts-ignore
    const render = ({ nodes, edges }) => {
      console.log("render -> ", nodes, edges);
      const _nodes = (
        nodes as { id: string; url: string; level: string }[]
      ).map((n, i) => ({
        id: n.id,
        data: n,
        position: { x: i * 200 + 100, y: 100 },
        type: "table",
      }));
      const _edges: Edge[] = edges.map(
        (e: { source: string; target: string }) => ({
          id: `${e.source}-${e.target}`,
          source: e.source,
          target: e.target,
          sourceHandle: "right",
          targetHandle: "left",
        })
      );
      layoutElementsOnCanvas(_nodes, _edges);
      flow.current?.setNodes(_nodes);
      flow.current?.setEdges(_edges);
    };
    const commandMap = { render };
    window.addEventListener("message", (event) => {
      const { command, args } = event.data;
      commandMap[command as "render"](args);
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
