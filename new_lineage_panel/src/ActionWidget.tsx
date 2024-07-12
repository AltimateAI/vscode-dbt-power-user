import { PropsWithChildren, useContext, useEffect, useState } from "react";
import "reactflow/dist/style.css";
import { Alert, Button, Card, CardBody } from "reactstrap";
import ResetIcon from "./assets/icons/reset.svg?react";
import HelpIcon from "./assets/icons/help.svg?react";
import FeedbackIcon from "./assets/icons/feedback.svg?react";
import ExpandIcon from "./assets/icons/expand.svg?react";
import ArrowLeftDoubleIcon from "./assets/icons/arrow-left-double.svg?react";
import ArrowRightDoubleIcon from "./assets/icons/arrow-right-double.svg?react";
import ArrowLeftIcon from "./assets/icons/arrow-left.svg?react";
import ArrowRightIcon from "./assets/icons/arrow-right.svg?react";
import GearIcon from "./assets/icons/gear.svg?react";
import styles from "./styles.module.scss";
import { HELP_SIDEBAR, SETTINGS_SIDEBAR } from "./constants";
import { init, openURL, setLegacyLineageView, CLL, requestExecutor } from "./service_utils";
import { LineageContext, MissingLineageMessage, aiEnabled } from "./Lineage";
import { useReactFlow } from "reactflow";
import {
  calculateMinLevel,
  calculateNodeCount,
  expandTableLineageLevelWise,
  highlightTableConnections,
  layoutElementsOnCanvas,
} from "./graph";
import classNames from "classnames";
import { BetterPopover } from "./components/Modal";
import { DEFAULT_MIN_ZOOM, calculateExpand } from "./utils";
import { InfoIcon } from "./components/InfoIcon";

export const ActionButton = ({
  onClick,
  children,
}: PropsWithChildren<{
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}>) => {
  return (
    <Button
      size="sm"
      outline
      color="secondary"
      onClick={onClick}
      className="d-flex align-items-center gap-xs theme-bg"
    >
      {children}
    </Button>
  );
};

const AutoExpansionPopover = () => {
  const flow = useReactFlow();
  const {
    selectedTable,
    leftExpansion,
    setLeftExpansion,
    rightExpansion,
    setRightExpansion,
    minRange,
    setMinRange,
    rerender,
    nodeCount,
    setNodeCount,
    defaultExpansion,
  } = useContext(LineageContext);
  const [maxRange, setMaxRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setLeftExpansion(
      calculateExpand(minRange[0], maxRange[0], defaultExpansion)
    );
    setRightExpansion(
      calculateExpand(minRange[1], maxRange[1], defaultExpansion)
    );
  }, [
    defaultExpansion,
    maxRange,
    minRange,
    setLeftExpansion,
    setRightExpansion,
  ]);

  useEffect(() => {
    (async () => {
      setNodeCount(
        await calculateNodeCount(
          flow.getNodes(),
          flow.getEdges(),
          selectedTable,
          leftExpansion,
          rightExpansion
        )
      );
    })();
  }, [flow, leftExpansion, rightExpansion, selectedTable, setNodeCount]);

  useEffect(() => {
    (async () => {
      if (!selectedTable) return;
      const selectedTableData = flow.getNode(selectedTable)?.data;
      if (!selectedTableData) return;
      const { level } = selectedTableData;
      const nodes = flow.getNodes();
      const edges = flow.getEdges();
      const [newNodes] = await expandTableLineageLevelWise(
        nodes,
        edges,
        selectedTable,
        -Infinity,
        Infinity
      );
      let minLevel = Infinity;
      let maxLevel = -Infinity;
      for (const n of newNodes) {
        minLevel = Math.min(minLevel, n.data.level);
        maxLevel = Math.max(maxLevel, n.data.level);
      }
      setMaxRange([level - minLevel, maxLevel - level]);
    })();
  }, [flow, selectedTable]);

  return (
    <BetterPopover
      trigger={
        <Button
          size="sm"
          color="primary"
          className="d-flex gap-sm align-items-center"
          type="button"
        >
          <ExpandIcon />
          Expand
        </Button>
      }
      render={({ close }) => (
        <div className="d-flex flex-column gap-xs">
          <div className="w-100 d-flex gap-xl justify-content-between align-items-center">
            <div
              className={classNames(styles.expand_nav, {
                [styles.disabled]: minRange[0] === -1,
              })}
            >
              <div className={styles.expand_nav_btn}>
                <div
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedTable) return;
                    setLeftExpansion(maxRange[0]);
                  }}
                >
                  <ArrowLeftDoubleIcon />
                </div>
                <div className={styles.divider} />
                <div
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedTable) return;
                    setLeftExpansion((i) => (i + 1 <= maxRange[0] ? i + 1 : i));
                  }}
                >
                  <ArrowLeftIcon />
                </div>
              </div>
              <div className="text-blue px-2 py-1">{leftExpansion}</div>
            </div>
            <div
              className={classNames(styles.expand_nav, {
                [styles.disabled]: minRange[1] === -1,
              })}
            >
              <div className="text-blue px-2 py-1">{rightExpansion}</div>
              <div className={styles.expand_nav_btn}>
                <div
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedTable) return;
                    setRightExpansion((i) =>
                      i + 1 <= maxRange[1] ? i + 1 : i
                    );
                  }}
                >
                  <ArrowRightIcon />
                </div>
                <div className={styles.divider} />
                <div
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedTable) return;
                    setRightExpansion(maxRange[1]);
                  }}
                >
                  <ArrowRightDoubleIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex gap-xl justify-content-between align-items-center">
            <div className="normal-text">Parents</div>
            <div className="normal-text">Children</div>
          </div>
          <Button
            color={nodeCount === 0 ? "secondary" : "primary"}
            size="sm"
            disabled={nodeCount === 0}
            onClick={async (e) => {
              e.stopPropagation();
              if (!selectedTable) return;
              const selectedTableData = flow.getNode(selectedTable)?.data;
              if (!selectedTableData) return;
              const [nodes, edges] = await expandTableLineageLevelWise(
                flow.getNodes(),
                flow.getEdges(),
                selectedTable,
                selectedTableData.level - leftExpansion,
                selectedTableData.level + rightExpansion
              );
              highlightTableConnections(nodes, edges, selectedTable);
              layoutElementsOnCanvas(nodes, edges);
              flow.setNodes(nodes);
              flow.setEdges(edges);
              flow.fitView({ minZoom: DEFAULT_MIN_ZOOM });
              setMinRange(calculateMinLevel(nodes, edges, selectedTable));
              setNodeCount(
                await calculateNodeCount(
                  nodes,
                  edges,
                  selectedTable,
                  leftExpansion,
                  rightExpansion
                )
              );
              rerender();
              close();
            }}
          >
            Add {nodeCount} tables
          </Button>
        </div>
      )}
    />
  );
};

export const ActionWidget = ({missingLineageMessage}: {missingLineageMessage?: MissingLineageMessage}) => {
  const {
    selectedColumn,
    confidence,
    setSidebarScreen,
    setSelectedColumn,
    setCollectColumns,
    setMoreTables,
  } = useContext(LineageContext);
  const flow = useReactFlow();

  const openProblemsTab = () => {
    return requestExecutor("openProblemsTab", { });
  }

  return (
    <div className="top-right-container">
      {missingLineageMessage ? (
        <Alert color="warning" className="p-2 mb-0">
          {missingLineageMessage.message}
          {missingLineageMessage.type === "error" ? (
            <>
              <Button
                color="link"
                className={"pt-0 pb-0"}
                style={{ marginTop: -5 }}
                onClick={openProblemsTab}
              >
                Click here
              </Button>{" "}
              to view Problems tab
            </>
          ) : (
            ""
          )}
        </Alert>
      ) : null}
      <Card className={styles.menu_card_container}>
        <CardBody className={styles.menu_card}>
          <div className="d-flex gap-sm">
            <AutoExpansionPopover />
            {aiEnabled &&
              selectedColumn.name &&
              confidence.confidence === "low" && (
                <>
                  <div className={styles.verticle_divider} />
                  <div className="d-flex gap-xxs align-items-center">
                    <div>Confidence</div>
                    <InfoIcon
                      id="confidence"
                      message={
                        "Depending on the SQL dialect and complexity of queries, " +
                        "there may be situations where we are not completely " +
                        "confident about the lineage shown in this view"
                      }
                    />
                    <div className={styles.low_confidence}>Low</div>
                  </div>
                </>
              )}
          </div>
        </CardBody>
      </Card>
      <ActionButton onClick={() => setSidebarScreen(SETTINGS_SIDEBAR)}>
        <GearIcon />
        Settings
      </ActionButton>
      <ActionButton
        onClick={() => {
          setLegacyLineageView();
          CLL.cancel();
        }}
      >
        Show Legacy UX
      </ActionButton>
      <ActionButton onClick={() => setSidebarScreen(HELP_SIDEBAR)}>
        <HelpIcon />
        <span>Help</span>
      </ActionButton>
      <ActionButton
        onClick={() => {
          flow.setNodes([]);
          flow.setEdges([]);
          setSelectedColumn({ table: "", name: "" });
          setCollectColumns({});
          setMoreTables({});
          init();
          CLL.cancel();
        }}
        data-testid="reset-btn"
      >
        <ResetIcon />
        <span>Reset</span>
      </ActionButton>
      <ActionButton
        onClick={() => {
          // setSidebarScreen(FEEDBACK_SIDEBAR);
          // TODO: going to be deprecated
          openURL(
            aiEnabled
              ? "https://docs.google.com/forms/d/e/1FAIpQLScsvmEdZ56F1GAFZq_SW7ejYe0dwpHe-N69qiQBz4ekN4gPNQ/viewform"
              : "https://docs.google.com/forms/d/10_YT2XDwpbkDXio-7TEYPQXsJfCBFqYUa7t0ImzyZvE/viewform"
          );
        }}
      >
        <FeedbackIcon />
        <span>Feedback</span>
      </ActionButton>
    </div>
  );
};
