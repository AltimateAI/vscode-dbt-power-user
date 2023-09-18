import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  NodeTypes,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { SeeMoreNode, SelfConnectingEdge, TableNode } from "./CustomNodes";
import { TABLES_SIDEBAR, destructTable } from "./utils";
import { SidebarModal } from "./SidebarModal";
import { MoreTables, TMoreTables } from "./MoreTables";
import { Tables, downstreamTables, upstreamTables } from "./service";
import { createNewNodesEdges, layoutElementsOnCanvas } from "./graph";

declare const acquireVsCodeApi: () => { postMessage: (v: unknown) => void };

const vscode = acquireVsCodeApi();

let id = 0;
const requestMap: Record<
  number,
  { resolve: (k: unknown) => void; reject: (reason?: string) => void }
> = {};
export const requestExecutor = (url: string, params: unknown) => {
  return new Promise((resolve, reject) => {
    requestMap[id] = { resolve, reject };
    vscode.postMessage({ command: "request", args: { id, url, params } });
    id++;
  });
};
export const openFile = (url: string) => {
  vscode.postMessage({ command: "openFile", url });
};

const nodeTypes: NodeTypes = { table: TableNode, seeMore: SeeMoreNode };
const edgeTypes = { selfConnecting: SelfConnectingEdge };

export const LineageContext = createContext<{
  showSidebar: boolean;
  setShowSidebar: Dispatch<boolean>;
  selectedTable: string;
  setSelectedTable: Dispatch<SetStateAction<string>>;
  moreTables: TMoreTables | null;
  setMoreTables: Dispatch<TMoreTables>;
  sidebarScreen: string;
  setSidebarScreen: Dispatch<string>;
}>({
  showSidebar: false,
  setShowSidebar: () => {},
  selectedTable: "",
  setSelectedTable: () => "",
  moreTables: null,
  setMoreTables: () => {},
  sidebarScreen: "",
  setSidebarScreen: () => {},
  // selectedColumn: {},
  // setSelectedColumn: () => {},
  // collectColumns: {},
  // setCollectColumns: () => {},
});

function App() {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();
  const [selectedTable, setSelectedTable] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [moreTables, setMoreTables] = useState<TMoreTables | null>(null);
  const [sidebarScreen, setSidebarScreen] = useState("");

  useEffect(() => {
    const render = async (args: {
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
      const _flow = flow.current;
      if (!_flow) {
        return;
      }
      const { node } = args;
      if (_flow.getNode(node.table)) {
        return;
      }
      let _nodes: Node[] = [
        {
          id: node.table,
          data: {
            table: node.table,
            url: node.url,
            level: 0,
            shouldExpand: [node.downstreamCount > 0, node.upstreamCount > 0],
            processed: [node.downstreamCount > 0, node.upstreamCount > 0],
          },
          position: { x: 100, y: 100 },
          type: "table",
        },
      ];
      let _edges: Edge[] = [];
      const expand = (t: string, tables: Tables, right: boolean) => {
        tables.sort((a, b) => {
          const [tableA] = destructTable(a.table);
          const [tableB] = destructTable(b.table);
          return tableA.localeCompare(tableB);
        });
        const [nodes, edges] = createNewNodesEdges(
          _nodes,
          _edges,
          tables,
          t,
          right,
          0
        );
        _nodes = nodes;
        _edges = edges;
      };
      if (node.upstreamCount > 0) {
        const { tables } = await upstreamTables(node.table);
        expand(node.table, tables, true);
      }
      if (node.downstreamCount > 0) {
        const { tables } = await downstreamTables(node.table);
        expand(node.table, tables, false);
      }
      layoutElementsOnCanvas(_nodes, _edges);
      _flow.setNodes(_nodes);
      _flow.setEdges(_edges);
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
    <LineageContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        selectedTable,
        setSelectedTable,
        moreTables,
        setMoreTables,
        sidebarScreen,
        setSidebarScreen,
      }}
    >
      <ReactFlowProvider>
        <div style={{ height: "100vh", width: "100vw" }}>
          <ReactFlow
            defaultNodes={[]}
            defaultEdges={[]}
            onInit={(_flow) => (flow.current = _flow)}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            style={{ background: "#f5f5f7" }}
            proOptions={{ hideAttribution: true }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <SidebarModal
          isOpen={showSidebar}
          toggleModal={() => setShowSidebar((b) => !b)}
          width={446}
        >
          {sidebarScreen === TABLES_SIDEBAR && <MoreTables />}
        </SidebarModal>
      </ReactFlowProvider>
    </LineageContext.Provider>
  );
}

export default App;
