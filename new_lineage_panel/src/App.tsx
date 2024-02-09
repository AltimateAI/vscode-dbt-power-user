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
import {
  ColumnNode,
  SeeMoreNode,
  SelfConnectingEdge,
  TableNode,
} from "./CustomNodes";
import { Modal, SidebarModal } from "./components/Modal";
import { MoreTables, TMoreTables } from "./MoreTables";
import {
  calculateMinLevel,
  expandTableLineage,
  highlightTableConnections,
  layoutElementsOnCanvas,
} from "./graph";
import { TableDetails } from "./TableDetails";
import { Button } from "reactstrap";
import PlayCircleIcon from "./assets/icons/play-circle.svg?react";
import {
  TABLES_SIDEBAR,
  COLUMNS_SIDEBAR,
  EXPOSURE_SIDEBAR,
  FEEDBACK_SIDEBAR,
  HELP_SIDEBAR,
} from "./constants";
import ExposureDetails from "./ExposureDetails";
import { Feedback } from "./Feedback";
import { Help } from "./Help";
import { Demo } from "./Demo";
import { handleResponse, init, columnLineage } from "./service_utils";
import { ActionWidget } from "./ActionWidget";
import { createTableNode } from "./utils";

export let aiEnabled = false;
export let isDarkMode = false;

const nodeTypes: NodeTypes = {
  table: TableNode,
  seeMore: SeeMoreNode,
  column: ColumnNode,
};
const edgeTypes = { selfConnecting: SelfConnectingEdge };

type Confidence = {
  confidence: string;
  operator_list?: string[];
};

const noop = () => {};

export const LineageContext = createContext<{
  showSidebar: boolean;
  setShowSidebar: Dispatch<boolean>;
  selectedTable: string;
  setSelectedTable: Dispatch<SetStateAction<string>>;
  moreTables: TMoreTables;
  setMoreTables: Dispatch<SetStateAction<TMoreTables>>;
  sidebarScreen: string;
  setSidebarScreen: Dispatch<string>;
  selectedColumn: { name: string; table: string; sessionId: string };
  setSelectedColumn: Dispatch<
    SetStateAction<{ name: string; table: string; sessionId: string }>
  >;
  collectColumns: Record<string, string[]>;
  setCollectColumns: Dispatch<SetStateAction<Record<string, string[]>>>;
  rerender: () => void;
  confidence: Confidence;
  setConfidence: Dispatch<SetStateAction<Confidence>>;
  leftExpansion: number;
  setLeftExpansion: Dispatch<SetStateAction<number>>;
  rightExpansion: number;
  setRightExpansion: Dispatch<SetStateAction<number>>;
  minRange: [number, number];
  setMinRange: Dispatch<SetStateAction<[number, number]>>;
}>({
  showSidebar: false,
  setShowSidebar: noop,
  selectedTable: "",
  setSelectedTable: noop,
  moreTables: {},
  setMoreTables: noop,
  sidebarScreen: "",
  setSidebarScreen: noop,
  selectedColumn: { name: "", table: "", sessionId: "" },
  setSelectedColumn: () => "",
  collectColumns: {},
  setCollectColumns: noop,
  rerender: noop,
  confidence: { confidence: "high" },
  setConfidence: noop,
  leftExpansion: 0,
  setLeftExpansion: noop,
  rightExpansion: 0,
  setRightExpansion: noop,
  minRange: [0, 0],
  setMinRange: noop,
});

function App() {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();
  const [selectedTable, setSelectedTable] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [moreTables, setMoreTables] = useState<TMoreTables>({});
  const [sidebarScreen, setSidebarScreen] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showDemoButton, setShowDemoButton] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState({
    name: "",
    table: "",
    sessionId: "",
  });
  const [leftExpansion, setLeftExpansion] = useState(0);
  const [rightExpansion, setRightExpansion] = useState(0);
  const [collectColumns, setCollectColumns] = useState<
    Record<string, string[]>
  >({});
  const [confidence, setConfidence] = useState<Confidence>({
    confidence: "high",
  });
  const [, _rerender] = useState(0);
  const rerender = () => _rerender((x) => (x + 1) % 100);

  const [selectCheck, setSelectCheck] = useState(true);
  const [nonSelectCheck, setNonSelectCheck] = useState(true);

  const [minRange, setMinRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const render = async (args: {
      node: {
        table: string;
        label: string;
        url: string;
        nodeType: string;
        materialization?: string;
        downstreamCount: number;
        upstreamCount: number;
        tests: { key: string; path: string }[];
      };
      aiEnabled: boolean;
    }) => {
      setShowSidebar(false);
      if (!args) return;
      aiEnabled = args.aiEnabled;
      const { node } = args;
      const _flow = flow.current;
      if (!_flow) return;
      const existingNode = _flow.getNode(node.table);
      if (existingNode) {
        setSelectedTable(node.table);
        const [nodes, edges] = highlightTableConnections(
          _flow.getNodes(),
          _flow.getEdges(),
          node.table
        );
        _flow.setNodes(nodes);
        _flow.setEdges(edges);
        setMinRange(calculateMinLevel(nodes, edges, node.table));
        return;
      }
      let nodes: Node[] = [];
      let edges: Edge[] = [];
      const addNodesEdges = async (table: string, right: boolean) => {
        [nodes, edges] = await expandTableLineage(nodes, edges, table, right);
      };
      nodes = [createTableNode(node, 0, "")];
      if (node.upstreamCount > 0) await addNodesEdges(node.table, true);
      if (node.downstreamCount > 0) await addNodesEdges(node.table, false);
      setSelectedTable(node.table);
      setSelectedColumn({ table: "", name: "", sessionId: "" });
      setCollectColumns({});
      setMoreTables({});
      [nodes, edges] = highlightTableConnections(nodes, edges, node.table);
      layoutElementsOnCanvas(nodes, edges);
      _flow.setNodes(nodes);
      _flow.setEdges(edges);
      setMinRange(calculateMinLevel(nodes, edges, node.table));
      rerender();
    };

    const setTheme = ({ theme }: { theme: string }) => {
      isDarkMode = theme === "dark";
      document.documentElement.setAttribute("data-theme", theme);
      rerender();
    };
    const commandMap = {
      render,
      response: handleResponse,
      setTheme,
      columnLineage,
    };
    window.addEventListener("message", (event) => {
      console.log("lineage:message -> ", event.data);
      const { command, args } = event.data;
      if ((command as string) in commandMap) {
        commandMap[command as keyof typeof commandMap](args);
      }
    });
    console.log("lineage:onload");
    init();

    // hide demo button after 10s
    setTimeout(() => {
      setShowDemoButton(false);
    }, 10000);
  }, []);

  useEffect(() => {
    const _flow = flow.current;
    if (!_flow) return;
    const _edges = _flow.getEdges();
    if ((selectCheck && nonSelectCheck) || (!selectCheck && !nonSelectCheck)) {
      for (const e of _edges) e.hidden = false;
      _flow.setEdges(_edges);
      return;
    }
    for (const e of _edges) {
      e.hidden = false;
      const _type = (e.data as { type: string })?.type;
      if (!_type) continue;
      if (_type === "direct") e.hidden = !selectCheck;
      if (_type === "indirect") e.hidden = !nonSelectCheck;
    }
    _flow.setEdges(_edges);
  }, [selectCheck, nonSelectCheck]);

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
        selectedColumn,
        setSelectedColumn,
        collectColumns,
        setCollectColumns,
        rerender,
        confidence,
        setConfidence,
        leftExpansion,
        setLeftExpansion,
        rightExpansion,
        setRightExpansion,
        minRange,
        setMinRange,
      }}
    >
      <ReactFlowProvider>
        <div className="position-relative">
          <ActionWidget
            selectCheck={selectCheck}
            setSelectCheck={setSelectCheck}
            nonSelectCheck={nonSelectCheck}
            setNonSelectCheck={setNonSelectCheck}
          />
          <div className="bottom-right-container">
            {showDemoButton && (
              <Button
                color="primary"
                className="d-flex gap-sm align-items-center"
                onClick={() => setShowDemoModal((b) => !b)}
              >
                Quick demo of Column Lineage
                <PlayCircleIcon />
              </Button>
            )}
          </div>
          <div style={{ height: "100vh", width: "100vw" }}>
            <ReactFlow
              defaultNodes={[]}
              defaultEdges={[]}
              onInit={(_flow) => (flow.current = _flow)}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              style={{ background: "var(--bg-color)" }}
              proOptions={{ hideAttribution: true }}
              minZoom={0.05}
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
            {sidebarScreen === COLUMNS_SIDEBAR && <TableDetails />}
            {sidebarScreen === EXPOSURE_SIDEBAR && <ExposureDetails />}
            {sidebarScreen === FEEDBACK_SIDEBAR && (
              <Feedback
                close={() => {
                  setSidebarScreen("");
                  setShowSidebar(false);
                }}
              />
            )}
            {sidebarScreen === HELP_SIDEBAR && <Help />}
          </SidebarModal>
          <Modal isOpen={showDemoModal} close={() => setShowDemoModal(false)}>
            <Demo />
          </Modal>
        </div>
      </ReactFlowProvider>
    </LineageContext.Provider>
  );
}

export default App;
