import { useEffect, useRef } from "react";
import ReactFlow, { Background, Controls, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";

// declare var acquireVsCodeApi: () => { postMessage: (v: any) => void };

// const vscode = acquireVsCodeApi();
function App() {
  // @ts-ignore
  const flow = useRef<ReactFlowInstance<any, any>>();

  useEffect(() => {
    // @ts-ignore
    const render = ({ nodes, edges }) => {
      console.log("render -> ", nodes, edges);
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
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
