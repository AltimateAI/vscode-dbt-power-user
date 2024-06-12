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
import { Modal, PopoverContext, SidebarModal } from "./components/Modal";
import { MoreTables, TMoreTables } from "./MoreTables";
import {
  calculateMinLevel,
  calculateNodeCount,
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
  SETTINGS_SIDEBAR,
} from "./constants";
import ExposureDetails from "./ExposureDetails";
import { Feedback } from "./Feedback";
import { Help } from "./Help";
import { Demo } from "./Demo";
import {
  handleResponse,
  init,
  columnLineage,
  CllEvents,
} from "./service_utils";
import { ActionWidget } from "./ActionWidget";
import {
  CollectColumn,
  DEFAULT_MIN_ZOOM,
  LensTypes,
  createTableNode,
  toggleColumnEdges,
  toggleModelEdges,
} from "./utils";
import { Settings } from "./Settings";
import { Table, getLineageSettings } from "./service";
import { LineageLegend } from "./components";
import { LensCodeModal } from "./Modals";

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

export interface MissingLineageMessage {
  message: string;
  type: "warning" | "error";
}

type LensCodeModal = {
  table: string;
  lensType: LensTypes;
  lensCode: Record<string, string[]>;
};

const noop = () => {};

export type SelectedColumn = { name: string; table: string };

export const LineageContext = createContext<{
  selectedTable: string;
  setSelectedTable: Dispatch<SetStateAction<string>>;
  moreTables: TMoreTables;
  setMoreTables: Dispatch<SetStateAction<TMoreTables>>;
  sidebarScreen: string;
  setSidebarScreen: Dispatch<string>;
  selectedColumn: SelectedColumn;
  setSelectedColumn: Dispatch<SetStateAction<SelectedColumn>>;
  collectColumns: Record<string, CollectColumn[]>;
  setCollectColumns: Dispatch<SetStateAction<Record<string, CollectColumn[]>>>;
  rerender: () => void;
  confidence: Confidence;
  setConfidence: Dispatch<SetStateAction<Confidence>>;
  leftExpansion: number;
  setLeftExpansion: Dispatch<SetStateAction<number>>;
  rightExpansion: number;
  setRightExpansion: Dispatch<SetStateAction<number>>;
  minRange: [number, number];
  setMinRange: Dispatch<SetStateAction<[number, number]>>;
  nodeCount: number;
  setNodeCount: Dispatch<SetStateAction<number>>;
  selectCheck: boolean;
  setSelectCheck: Dispatch<boolean>;
  nonSelectCheck: boolean;
  setNonSelectCheck: Dispatch<boolean>;
  defaultExpansion: number;
  setDefaultExpansion: Dispatch<number>;
  lensCodeModal: LensCodeModal | null;
  setLensCodeModal: Dispatch<SetStateAction<LensCodeModal | null>>;
}>({
  selectedTable: "",
  setSelectedTable: noop,
  moreTables: {},
  setMoreTables: noop,
  sidebarScreen: "",
  setSidebarScreen: noop,
  selectedColumn: { name: "", table: "" },
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
  nodeCount: 0,
  setNodeCount: noop,
  selectCheck: false,
  setSelectCheck: noop,
  nonSelectCheck: false,
  setNonSelectCheck: noop,
  defaultExpansion: 0,
  setDefaultExpansion: noop,
  lensCodeModal: null,
  setLensCodeModal: noop,
});

function App() {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [moreTables, setMoreTables] = useState<TMoreTables>({});
  const [sidebarScreen, setSidebarScreen] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showDemoButton, setShowDemoButton] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState({ name: "", table: "" });
  const [leftExpansion, setLeftExpansion] = useState(0);
  const [rightExpansion, setRightExpansion] = useState(0);
  const [collectColumns, setCollectColumns] = useState<
    Record<string, CollectColumn[]>
  >({});
  const [confidence, setConfidence] = useState<Confidence>({
    confidence: "high",
  });
  const [, _rerender] = useState(0);
  const rerender = () => _rerender((x) => (x + 1) % 100);

  const [missingLineageMessage, setMissingLineageMessage] = useState<
    MissingLineageMessage | undefined
  >();
  const [selectCheck, setSelectCheck] = useState(true);
  const [nonSelectCheck, setNonSelectCheck] = useState(true);
  const [defaultExpansion, setDefaultExpansion] = useState(5);
  const [nodeCount, setNodeCount] = useState(0);
  const [minRange, setMinRange] = useState<[number, number]>([0, 0]);
  const [lensCodeModal, setLensCodeModal] = useState<LensCodeModal | null>(
    null
  );

  useEffect(() => {
    const render = async (args: {
      node?: Table;
      aiEnabled: boolean;
      missingLineageMessage?: MissingLineageMessage;
    }) => {
      setIsOpen(false);
      setSidebarScreen("");
      if (!args) return;
      aiEnabled = args.aiEnabled;
      setMissingLineageMessage(args.missingLineageMessage);
      const { node } = args;
      const _flow = flow.current;
      if (!_flow || !node) return;
      const existingNode = _flow.getNode(node.table);
      if (existingNode) {
        setSelectedTable(node.table);
        let nodes = _flow.getNodes();
        let edges = _flow.getEdges();
        if (!selectedColumn.name) {
          [nodes, edges] = highlightTableConnections(nodes, edges, node.table);
          _flow.setNodes(nodes);
          _flow.setEdges(edges);
        }
        setMinRange(calculateMinLevel(nodes, edges, node.table));
        setNodeCount(
          await calculateNodeCount(
            nodes,
            edges,
            node.table,
            leftExpansion,
            rightExpansion
          )
        );
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
      setSelectedColumn({ table: "", name: "" });
      setCollectColumns({});
      setMoreTables({});
      [nodes, edges] = highlightTableConnections(nodes, edges, node.table);
      layoutElementsOnCanvas(nodes, edges);
      _flow.setNodes(nodes);
      _flow.setEdges(edges);
      _flow.fitView({ minZoom: DEFAULT_MIN_ZOOM, duration: 500 });
      setMinRange(calculateMinLevel(nodes, edges, node.table));
      setNodeCount(
        await calculateNodeCount(
          nodes,
          edges,
          node.table,
          leftExpansion,
          rightExpansion
        )
      );
      rerender();
    };

    const setTheme = ({ theme }: { theme: string }) => {
      isDarkMode = theme === "dark";
      document.documentElement.setAttribute("data-theme", theme);
      rerender();
    };

    const applySettings = async () => {
      const settings = await getLineageSettings();
      setSelectCheck(settings.showSelectEdges);
      setNonSelectCheck(settings.showNonSelectEdges);
      setDefaultExpansion(settings.defaultExpansion);
    };

    const commandMap = {
      render,
      response: handleResponse,
      setTheme,
      columnLineage: (data: { event: CllEvents }) => {
        if (data.event === CllEvents.CANCEL) {
          if (flow.current) {
            const edges = flow.current.getEdges();
            toggleModelEdges(edges, true);
            toggleColumnEdges(edges, false);
            flow.current.setEdges(edges);
          }
        }
        columnLineage(data);
      },
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
    applySettings();

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
        nodeCount,
        setNodeCount,
        selectCheck,
        setSelectCheck,
        nonSelectCheck,
        setNonSelectCheck,
        defaultExpansion,
        setDefaultExpansion,
        lensCodeModal,
        setLensCodeModal,
      }}
    >
      <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
        <ReactFlowProvider>
          <div className="position-relative">
            <ActionWidget missingLineageMessage={missingLineageMessage} />
            <div className="bottom-right-container">
              {showDemoButton && (
                <Button
                  color="primary"
                  className="d-flex gap-sm align-items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDemoModal((b) => !b);
                  }}
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
                minZoom={DEFAULT_MIN_ZOOM}
              >
                <Background />
                <Controls />
              </ReactFlow>
              <LineageLegend />
            </div>
            <SidebarModal
              isOpen={sidebarScreen !== ""}
              closeModal={() => setSidebarScreen("")}
              width={446}
            >
              {sidebarScreen === TABLES_SIDEBAR && <MoreTables />}
              {sidebarScreen === COLUMNS_SIDEBAR && <TableDetails />}
              {sidebarScreen === EXPOSURE_SIDEBAR && <ExposureDetails />}
              {sidebarScreen === FEEDBACK_SIDEBAR && (
                <Feedback close={() => setSidebarScreen("")} />
              )}
              {sidebarScreen === HELP_SIDEBAR && <Help />}
              {sidebarScreen === SETTINGS_SIDEBAR && <Settings />}
            </SidebarModal>
            <Modal isOpen={showDemoModal} close={() => setShowDemoModal(false)}>
              <Demo />
            </Modal>
            <LensCodeModal />
          </div>
        </ReactFlowProvider>
      </PopoverContext.Provider>
    </LineageContext.Provider>
  );
}

export default App;
