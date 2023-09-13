import { useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  NodeTypes,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "./CustomNodes";

// declare var acquireVsCodeApi: () => { postMessage: (v: any) => void };

// const vscode = acquireVsCodeApi();

const nodeTypes: NodeTypes = { table: TableNode };

function App() {
  // @ts-ignore
  const flow = useRef<ReactFlowInstance<any, any>>();

  useEffect(() => {
    // @ts-ignore
    const render = ({ nodes, edges }) => {
      console.log("render -> ", nodes, edges);
      const _flow = flow.current;
      _flow?.addNodes(
        (nodes as { id: string }[]).map((n, i) => ({
          id: n.id,
          data: { id: n.id },
          position: { x: i * 200 + 100, y: 100 },
          type: "table",
        }))
      );
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
