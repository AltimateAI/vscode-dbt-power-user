import { Dispatch, createContext, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  NodeTypes,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "./CustomNodes";

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
export const openFile = (url: string) => {
  console.log("openFile -> ", url);
  vscode.postMessage({ command: "openFile", url });
};

const nodeTypes: NodeTypes = { table: TableNode };

export const LineageContext = createContext<{
  selectedTable: any;
  setSelectedTable: Dispatch<any>;
}>({
  // showSidebar: false,
  // setShowSidebar: () => {},
  selectedTable: {},
  setSelectedTable: () => {},
  // moreTables: {},
  // setMoreTables: () => {},
  // sidebarScreen: "",
  // setSidebarScreen: () => {},
  // selectedColumn: {},
  // setSelectedColumn: () => {},
  // collectColumns: {},
  // setCollectColumns: () => {},
});

function App() {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();
  const [selectedTable, setSelectedTable] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    const render = (args: {
      node: {
        table: string;
        url: string;
        downstreamCount: number;
        upstreamCount: number;
      };
    }) => {
      if (!args) {
        return;
      }
      const { node } = args;
      const _nodes: Node[] = [
        {
          id: node.table,
          data: {
            table: node.table,
            url: node.url,
            level: 0,
            shouldExpand: [node.downstreamCount > 0, node.upstreamCount > 0],
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
    <LineageContext.Provider value={{ selectedTable, setSelectedTable }}>
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
    </LineageContext.Provider>
  );
}

export default App;
