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
import { TABLES_SIDEBAR } from "./utils";
import { SidebarModal } from "./SidebarModal";
import { MoreTables, TMoreTables } from "./MoreTables";
import { downstreamTables, upstreamTables } from "./service";
import { createNewNodesEdges, layoutElementsOnCanvas } from "./graph";
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
  rerender: () => void;
}>({
  showSidebar: false,
  setShowSidebar: () => {},
  selectedTable: "",
  setSelectedTable: () => "",
  moreTables: null,
  setMoreTables: () => {},
  sidebarScreen: "",
  setSidebarScreen: () => {},
  rerender: () => {},
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
  const [, _rerender] = useState(0);
  const rerender = () => _rerender((x) => x + 1);

  useEffect(() => {
    const render = async (args: {
      node: {
        table: string;
        url: string;
        downstreamCount: number;
        upstreamCount: number;
      };
    }) => {
      setShowSidebar(false);
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
        if (!processed[1]) {
          const { tables } = await upstreamTables(node.table);
          [_nodes, _edges] = createNewNodesEdges(
            _nodes,
            _edges,
            tables,
            node.table,
            true,
            level
          );
        }
        if (!processed[0]) {
          const { tables } = await downstreamTables(node.table);
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
            url: node.url,
            level: 0,
            shouldExpand: [node.downstreamCount > 0, node.upstreamCount > 0],
            processed: [node.downstreamCount > 0, node.upstreamCount > 0],
            upstreamCount: node.upstreamCount,
            downstreamCount: node.downstreamCount,
          },
          position: { x: 100, y: 100 },
          type: "table",
        },
      ];
      let _edges: Edge[] = [];
      if (node.upstreamCount > 0) {
        const { tables } = await upstreamTables(node.table);
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
        const { tables } = await downstreamTables(node.table);
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
      console.log("lineage:message -> ", event);
      const { command, args } = event.data;
      if ((command as string) in commandMap) {
        commandMap[command](args);
      }
    });
    console.log("lineage:onload -> ");
    vscode.postMessage({ command: "init", args: {} });
  }, []);

  return (
    <div className="position-relative">
      <div className="top-right-container">
        <Button
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            flow.current?.setNodes([]);
            flow.current?.setEdges([]);
            vscode.postMessage({ command: "init" });
          }}
        >
          Reset
        </Button>
        <Button
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            vscode.postMessage({ command: "setLegacyLineageView" });
          }}
        >
          Show Legacy UX
        </Button>
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
          rerender,
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
    </div>
  );
}

export default App;
