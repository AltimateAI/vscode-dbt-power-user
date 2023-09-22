import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  MiniMap,
  Background,
  Controls,
  Edge,
  Node,
  NodeTypes,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ColumnNode,
  SeeMoreNode,
  SelfConnectingEdge,
  TableNode,
} from "./CustomNodes";
import { COLUMNS_SIDEBAR, TABLES_SIDEBAR } from "./utils";
import { SidebarModal } from "./SidebarModal";
import { MoreTables, TMoreTables } from "./MoreTables";
import { Table, downstreamTables, upstreamTables } from "./service";
import { createNewNodesEdges, layoutElementsOnCanvas } from "./graph";
import { TableDetails } from "./TableDetails";
import { Button } from "reactstrap";

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
  vscode.postMessage({ command: "openFile", args: { url } });
};
export const openDocs = () => {
  vscode.postMessage({ command: "openDocs", args: {} });
};

const nodeTypes: NodeTypes = {
  table: TableNode,
  seeMore: SeeMoreNode,
  column: ColumnNode,
};
const edgeTypes = { selfConnecting: SelfConnectingEdge };

export const LineageContext = createContext<{
  showSidebar: boolean;
  setShowSidebar: Dispatch<boolean>;
  selectedTable: Omit<Table, "count"> | null;
  setSelectedTable: Dispatch<SetStateAction<Omit<Table, "count"> | null>>;
  moreTables: TMoreTables | null;
  setMoreTables: Dispatch<TMoreTables>;
  sidebarScreen: string;
  setSidebarScreen: Dispatch<string>;
  selectedColumn: { name: string; table: string };
  setSelectedColumn: Dispatch<SetStateAction<{ name: string; table: string }>>;
  collectColumns: Record<string, string[]>;
  setCollectColumns: Dispatch<SetStateAction<Record<string, string[]>>>;
}>({
  showSidebar: false,
  setShowSidebar: () => {},
  selectedTable: null,
  setSelectedTable: () => null,
  moreTables: null,
  setMoreTables: () => {},
  sidebarScreen: "",
  setSidebarScreen: () => {},
  selectedColumn: { name: "", table: "" },
  setSelectedColumn: () => "",
  collectColumns: {},
  setCollectColumns: () => {},
});

function App() {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();
  const [selectedTable, setSelectedTable] = useState<Omit<
    Table,
    "count"
  > | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [moreTables, setMoreTables] = useState<TMoreTables | null>(null);
  const [sidebarScreen, setSidebarScreen] = useState("");
  const [selectedColumn, setSelectedColumn] = useState({ name: "", table: "" });
  const [collectColumns, setCollectColumns] = useState({});

  useEffect(() => {
    const render = async (args: {
      node: {
        table: string;
        key: string;
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
      const existingNode = _flow.getNode(node.table);
      if (existingNode) {
        const { level, processed } = existingNode.data as {
          level: number;
          processed: [boolean, boolean];
        };
        let _nodes = _flow.getNodes();
        let _edges = _flow.getEdges();
        if (level > 0 && !processed[1]) {
          const { tables } = await upstreamTables(node.key);
          [_nodes, _edges] = createNewNodesEdges(
            _nodes,
            _edges,
            tables,
            node.table,
            true,
            level
          );
        } else if (level < 0 && !processed[0]) {
          const { tables } = await downstreamTables(node.key);
          [_nodes, _edges] = createNewNodesEdges(
            _nodes,
            _edges,
            tables,
            node.table,
            false,
            level
          );
        }
        layoutElementsOnCanvas(_nodes, _edges);
        _flow.setNodes(_nodes);
        _flow.setEdges(_edges);
        return;
      }
      let _nodes: Node[] = [
        {
          id: node.table,
          data: {
            table: node.table,
            key: node.key,
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
      if (node.upstreamCount > 0) {
        const { tables } = await upstreamTables(node.key);
        [_nodes, _edges] = createNewNodesEdges(
          _nodes,
          _edges,
          tables,
          node.table,
          true,
          0
        );
      }
      if (node.downstreamCount > 0) {
        const { tables } = await downstreamTables(node.key);
        [_nodes, _edges] = createNewNodesEdges(
          _nodes,
          _edges,
          tables,
          node.table,
          false,
          0
        );
      }
      layoutElementsOnCanvas(_nodes, _edges);
      _flow.setNodes(_nodes);
      _flow.setEdges(_edges);
    };
    const response = (args: {
      id: number;
      body: unknown;
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
    const commandMap = { render, response };
    window.addEventListener("message", (event) => {
      console.log("lineage:message -> ", event);
      const { command, args } = event.data;
      if ((command as string) in commandMap) {
        commandMap[command as keyof typeof commandMap](args);
      }
    });
    console.log("lineage:onload -> ");
    vscode.postMessage({ command: "init", args: {} });
  }, []);

  return (
    <div className="position-relative">
      <div className="top-right-container">
        <div className="panel-tabs-container">
          <div
            className="panel-tab"
            onClick={() => {
              vscode.postMessage({ command: "setLegacyLineageView" });
            }}
          >
            Legacy Panel
          </div>
          <div className="panel-tab-selected">New Panel(Beta)</div>
        </div>
        <Button
          color="link"
          onClick={(e) => {
            e.stopPropagation();
            openDocs();
          }}
        >
          Feedback
        </Button>
      </div>
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
          selectedColumn,
          setSelectedColumn,
          collectColumns,
          setCollectColumns,
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
              <MiniMap />
            </ReactFlow>
          </div>
          <SidebarModal
            isOpen={showSidebar}
            toggleModal={() => setShowSidebar((b) => !b)}
            width={446}
          >
            {sidebarScreen === TABLES_SIDEBAR && <MoreTables />}
            {sidebarScreen === COLUMNS_SIDEBAR && <TableDetails />}
          </SidebarModal>
        </ReactFlowProvider>
      </LineageContext.Provider>
    </div>
  );
}

export default App;
