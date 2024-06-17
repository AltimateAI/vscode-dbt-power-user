import { FunctionComponent, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ColumnNode,
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
import { DetailColumns, StaticLineageContext } from "./Lineage";
import { Modal, SidebarModal } from "./components/Modal";
import { StaticTableDetails } from "./TableDetails";

const nodeTypes = {
  table: StaticTableNode,
  seeMore: SeeMoreNode,
  column: ColumnNode,
};
const edgeTypes = {
  selfConnecting: SelfConnectingEdge,
};

type StaticLineageProps = {
  selectedColumn?: { table: string; name: string };
  collectColumns?: Record<string, CollectColumn[]>;
  columnEdges?: [string, string][];
  tableEdges: [string, string][];
  tables: { name: string; nodeType: string }[];
  detailColumns: DetailColumns;
};

const StaticLineage: FunctionComponent<StaticLineageProps> = ({
  selectedColumn,
  collectColumns = {},
  columnEdges = [],
  tableEdges,
  tables,
  detailColumns,
}) => {
  const flow = useRef<ReactFlowInstance<unknown, unknown>>();
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    setTimeout(async () => {
      let nodes = [
        createTableNode(
          {
            table: tables[0].name,
            upstreamCount: 0,
            downstreamCount: 0,
            label: tables[0].name,
            nodeType: tables[0].nodeType,
            isExternalProject: false,
            tests: [],
          },
          0,
          "",
        ),
      ];
      let edges: Edge[] = [];
      const bfs = (right: boolean) => {
        const queue = [tables[0].name];
        const visited: Record<string, boolean> = {};
        while (queue.length > 0) {
          const curr = queue.shift()!;
          if (visited[curr]) continue;
          visited[curr] = true;
          const connectedTables = right
            ? tableEdges.filter(([src]) => src === curr).map(([, dst]) => dst)
            : tableEdges.filter(([, dst]) => dst === curr).map(([src]) => src);
          const currLevel = nodes.find((n) => n.id === curr)?.data?.level || 0;
          createNewNodesEdges(
            nodes,
            edges,
            connectedTables.map((table) => ({
              table,
              label: table,
              upstreamCount: 0,
              downstreamCount: 0,
              nodeType:
                tables.find((t) => t.name === table)?.nodeType ||
                tables[0].nodeType,
              isExternalProject: false,
              tests: [],
            })),
            curr,
            right,
            currLevel,
            10000,
            true,
          );
          queue.push(...connectedTables);
        }
      };
      bfs(true);
      bfs(false);
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
            }),
          );
        nodes = _nodes;
        edges = _edges;
      }

      layoutElementsOnCanvas(nodes, edges, true);
      flow.current?.setNodes(nodes);
      flow.current?.setEdges(edges);
    }, 500);
  }, [collectColumns, columnEdges, flow, selectedColumn, tableEdges, tables]);

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
        detailColumns,
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