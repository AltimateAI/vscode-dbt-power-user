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
import { CollectColumn, createTableNode } from "./utils";
import {
  createNewNodesEdges,
  layoutElementsOnCanvas,
  staticProcessColumnLineage,
} from "./graph";
import { Details, StaticLineageContext } from "./Lineage";
import { Modal, SidebarModal } from "./components/Modal";
import { StaticTableDetails } from "./TableDetails";
import { handleResponse } from "./service_utils";

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
};

type Range = { id: string; range: [number, number] };

function findOverlappingRanges(ranges: Range[]): Range | null {
  // Sort ranges by their start point, and if equal, by their end point
  ranges.sort((a, b) => {
    if (a.range[0] === b.range[0]) {
      return a.range[1] - b.range[1];
    }
    return a.range[0] - b.range[0];
  });

  let previousRange: Range = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const currentRange = ranges[i];

    // Check if there is an overlap
    if (currentRange.range[0] < previousRange.range[1]) {
      const currDiff = currentRange.range[1] - currentRange.range[0];
      const prevDiff = previousRange.range[1] - previousRange.range[0];
      if (currDiff > prevDiff) {
        return currentRange;
      } else {
        return previousRange;
      }
    }

    // Update the previous range to the current range
    if (currentRange.range[1] > previousRange.range[1]) {
      previousRange = currentRange;
    }
  }

  return null;
}

function findSources(edges: [string, string][]): string[] {
  const inDegree: Map<string, number> = new Map();
  const allVertices: Set<string> = new Set();

  // Initialize inDegree and allVertices sets
  for (const [from, to] of edges) {
    if (!inDegree.has(from)) {
      inDegree.set(from, 0);
    }
    if (!inDegree.has(to)) {
      inDegree.set(to, 0);
    }
    inDegree.set(to, inDegree.get(to)! + 1);
    allVertices.add(from);
    allVertices.add(to);
  }

  // Find vertices with in-degree of 0
  const sources: string[] = [];
  for (const [vertex, degree] of inDegree) {
    if (degree === 0) {
      sources.push(vertex);
    }
  }

  return sources;
}

const StaticLineage: FunctionComponent<StaticLineageProps> = ({
  selectedColumn,
  collectColumns = {},
  columnEdges = [],
  tableEdges,
  details,
}) => {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    setTimeout(async () => {
      const nodeSources = findSources(tableEdges);
      const startingNode = details[nodeSources[0]];
      console.log("thisisisis", startingNode, nodeSources, tableEdges);
      const _ns = nodeSources.map((item) =>
        createTableNode(
          {
            table: item,
            upstreamCount: 0,
            downstreamCount: 0,
            label: item,
            nodeType: details[item].nodeType!,
            isExternalProject: false,
            tests: [],
          },
          0,
          ""
        )
      );
      let nodes: Node[] = _ns;
      let edges: Edge[] = [];
      const queue = [...nodeSources];
      const visited: Record<string, boolean> = {};
      const getConnectedTables = (right: boolean, curr: string) => {
        const connectedTables = right
          ? tableEdges.filter(([src]) => src === curr).map(([, dst]) => dst)
          : tableEdges.filter(([, dst]) => dst === curr).map(([src]) => src);
        const currLevel = nodes.find((n) => n.id === curr)?.data?.level || 0;
        console.log(
          "thisisisis1",
          JSON.parse(JSON.stringify(queue)),
          curr,
          connectedTables
        );
        createNewNodesEdges(
          nodes,
          edges,
          connectedTables.map((table) => ({
            table,
            label: table,
            upstreamCount: 0,
            downstreamCount: 0,
            nodeType: details[table].nodeType || "cte",
            isExternalProject: false,
            tests: [],
          })),
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
          ...getConnectedTables(true, curr)
          // ...getConnectedTables(false, curr),
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
      console.log("thisisisis1", "before layout", nodes, edges);
      while (true as boolean) {
        const xAxisNodeMap: Record<number, string[]> = {};
        for (const n of nodes) {
          xAxisNodeMap[n.position.x] = xAxisNodeMap[n.position.x] || [];
          xAxisNodeMap[n.position.x].push(n.id);
        }
        let anyOverlaps = false;
        for (const x in xAxisNodeMap) {
          if (xAxisNodeMap[x].length < 2) continue;
          const xAxisEdges = edges.filter(
            (e) =>
              xAxisNodeMap[x].includes(e.source) &&
              xAxisNodeMap[x].includes(e.target)
          );
          const ranges = xAxisEdges.map(
            (e) =>
              ({
                id: e.id,
                range: [
                  nodes.find((n) => n.id === e.source)!.data.level,
                  nodes.find((n) => n.id === e.target)!.data.level,
                ],
              }) as Range
          );
          const overlappingRange = findOverlappingRanges(ranges);
          if (!overlappingRange) continue;
          anyOverlaps = true;
          const overlappingEdge = edges.find(
            (e) => e.id === overlappingRange.id
          )!;
          nodes.find((n) => n.id === overlappingEdge.source)!.position.x -= 240;
          nodes.find((n) => n.id === overlappingEdge.target)!.position.x -= 240;
          break;
        }
        if (!anyOverlaps) break;
      }
      flow.current?.setNodes(nodes);
      flow.current?.setEdges(edges);
    }, 500);
  }, [collectColumns, columnEdges, details, flow, selectedColumn, tableEdges]);

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
      rerender();
    };
    const commandMap = {
      render: setProps,
      setTheme,
      response: handleResponse,
    };

    window.addEventListener("message", (event) => {
      console.log("static-lineage:message -> ", event.data);
      const { command, args } = event.data;
      if ((command as string) in commandMap) {
        commandMap[command as keyof typeof commandMap](args);
      }
    });
  }, []);
  if (!props) return <div>Loading...</div>;
  return <StaticLineage {...props} />;
};
