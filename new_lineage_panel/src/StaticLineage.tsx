import { FunctionComponent, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ColumnNode,
  OpNode,
  SeeMoreNode,
  SelfConnectingEdge,
  StaticTableNode,
} from "./CustomNodes";
import {
  CollectColumn,
  createOpNode,
  createTableEdge,
  createTableNode,
} from "./utils";
import {
  createNewNodesEdges,
  layoutElementsOnCanvas,
  staticProcessColumnLineage,
} from "./graph";
import { Details, StaticLineageContext, setDarkMode } from "./Lineage";
import { Modal, SidebarModal } from "./components/Modal";
import { StaticTableDetails } from "./TableDetails";
import { handleResponse, openURL } from "./service_utils";
import { ActionButton } from "./ActionWidget";
import FeedbackIcon from "./assets/icons/feedback.svg?react";

const nodeTypes = {
  table: StaticTableNode,
  seeMore: SeeMoreNode,
  column: ColumnNode,
  operator: OpNode,
};
const edgeTypes = {
  selfConnecting: SelfConnectingEdge,
};

type StaticLineageProps = {
  selectedColumn?: { table: string; name: string };
  collectColumns?: Record<string, CollectColumn[]>;
  columnEdges?: [string, string][];
  tableEdges: [string, string][];
  details: Details;
  nodePositions: Record<string, [number, number]>;
};

function findSources(edges: [string, string][]) {
  const inDegree: Map<string, number> = new Map();
  const outDegree: Map<string, number> = new Map();

  for (const [from, to] of edges) {
    if (!inDegree.has(from)) inDegree.set(from, 0);
    if (!inDegree.has(to)) inDegree.set(to, 0);
    inDegree.set(to, inDegree.get(to)! + 1);

    if (!outDegree.has(from)) outDegree.set(from, 0);
    if (!outDegree.has(to)) outDegree.set(to, 0);
    outDegree.set(from, outDegree.get(from)! + 1);
  }

  // Find vertices with in-degree of 0
  const sources: string[] = [];
  const sinks: string[] = [];
  for (const [vertex, degree] of inDegree) {
    if (degree === 0) sources.push(vertex);
  }

  for (const [vertex, degree] of outDegree) {
    if (degree === 0) sinks.push(vertex);
  }

  return { sources, sinks };
}

const StaticLineage: FunctionComponent<StaticLineageProps> = ({
  selectedColumn,
  collectColumns = {},
  columnEdges = [],
  tableEdges,
  details,
  nodePositions,
}) => {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    const _createTable = (table: string) => ({
      table,
      label: table,
      upstreamCount: 0,
      downstreamCount: 0,
      nodeType: details[table].nodeType || "cte",
      isExternalProject: false,
      tests: [],
    });
    setTimeout(async () => {
      if (nodePositions) {
        const nodes: Node[] = Object.keys(nodePositions).map((n) => {
          const opType = details[n].type;
          if (["cte", "table", "final"].includes(opType)) {
            return createTableNode(_createTable(n), 0, "");
          }
          return createOpNode(n, 0, "", details[n]);
        });
        const edges = tableEdges.map(([src, dst]) =>
          createTableEdge(
            nodePositions[src][1],
            nodePositions[dst][1],
            src,
            dst,
            true,
            true
          )
        );

        for (const n of nodes) {
          if (!nodePositions[n.id]) continue;
          const [x, y] = nodePositions[n.id];
          n.position = { x, y };
        }
        flow.current?.setNodes(nodes);
        flow.current?.setEdges(edges);
        return;
      }
      const { sinks } = findSources(tableEdges);
      let nodes: Node[] = sinks.map((n) =>
        createTableNode(_createTable(n), 0, "")
      );
      let edges: Edge[] = [];
      const queue = [...sinks];
      const visited: Record<string, boolean> = {};
      const getConnectedTables = (right: boolean, curr: string) => {
        const connectedTables = right
          ? tableEdges.filter(([src]) => src === curr).map(([, dst]) => dst)
          : tableEdges.filter(([, dst]) => dst === curr).map(([src]) => src);
        const currLevel = nodes.find((n) => n.id === curr)?.data?.level || 0;
        createNewNodesEdges(
          nodes,
          edges,
          connectedTables.map(_createTable),
          curr,
          right,
          currLevel,
          10000,
          true,
          details
        );
        return connectedTables;
      };
      while (queue.length > 0) {
        const curr = queue.pop()!;
        if (visited[curr]) continue;
        visited[curr] = true;
        queue.push(
          // ...getConnectedTables(true, curr)
          ...getConnectedTables(false, curr)
        );
      }

      if (selectedColumn) {
        const columnRK = `${selectedColumn.table}/${selectedColumn.name}`;
        const { nodes: _nodes, edges: _edges } =
          await staticProcessColumnLineage(
            nodes,
            edges,
            columnRK,
            async () => ({
              collect_columns: collectColumns,
              highlight_edges: columnEdges,
            })
          );
        nodes = _nodes;
        edges = _edges;
      }

      layoutElementsOnCanvas(nodes, edges, true);
      flow.current?.setNodes(nodes);
      flow.current?.setEdges(edges);
    }, 500);
  }, [
    collectColumns,
    columnEdges,
    details,
    flow,
    nodePositions,
    selectedColumn,
    tableEdges,
  ]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      flow.current?.fitView({ duration: 500 });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <StaticLineageContext.Provider
      value={{
        collectColumns,
        selectedColumn,
        details,
        selectedTable,
        setSelectedTable,
      }}
    >
      <div className="top-right-container">
        <ActionButton
          onClick={() => {
            openURL("https://app.myaltimate.com/contactus");
          }}
        >
          <FeedbackIcon />
          <span>Feedback</span>
        </ActionButton>
      </div>
      <ReactFlowProvider>
        <div style={{ width: "100%", height: "100vh" }}>
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
      </ReactFlowProvider>
      <SidebarModal
        isOpen={Boolean(selectedTable)}
        closeModal={() => setSelectedTable("")}
        width={446}
      >
        {Boolean(selectedTable) && <StaticTableDetails />}
      </SidebarModal>
      <Modal isOpen={false} close={() => {}} />
    </StaticLineageContext.Provider>
  );
};

export const StaticLineageContainer = () => {
  const [props, setProps] = useState<StaticLineageProps | null>(null);
  const [, _rerender] = useState(0);
  const rerender = () => _rerender((x) => (x + 1) % 100);

  useEffect(() => {
    const setTheme = ({ theme }: { theme: string }) => {
      document.documentElement.setAttribute("data-theme", theme);
      setDarkMode(theme === "dark");
      rerender();
    };

    window.addEventListener("message", (event) => {
      console.log("static-lineage:message -> ", event.data);
      const { command, args } = event.data;
      if (command === "render") setProps(args);
      if (command === "setTheme") setTheme(args);
      if (command === "response") handleResponse(args);
    });
  }, []);
  if (!props) return <div>Loading...</div>;
  return <StaticLineage {...props} />;
};
