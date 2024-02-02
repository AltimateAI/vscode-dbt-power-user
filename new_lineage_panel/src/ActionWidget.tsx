import {
  Dispatch,
  FC,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "reactflow/dist/style.css";
import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Popover,
  PopoverBody,
  Tooltip,
} from "reactstrap";
import AlertCircleIcon from "./assets/icons/alert-circle.svg?react";
import ResetIcon from "./assets/icons/reset.svg?react";
import HelpIcon from "./assets/icons/help.svg?react";
import FeedbackIcon from "./assets/icons/feedback.svg?react";
import ExpandIcon from "./assets/icons/expand.svg?react";
import ArrowLeftDoubleIcon from "./assets/icons/arrow-left-double.svg?react";
import ArrowRightDoubleIcon from "./assets/icons/arrow-right-double.svg?react";
import ArrowLeftIcon from "./assets/icons/arrow-left.svg?react";
import ArrowRightIcon from "./assets/icons/arrow-right.svg?react";
import styles from "./styles.module.scss";
import { HELP_SIDEBAR } from "./constants";
import { init, openURL, setLegacyLineageView, CLL } from "./service_utils";
import { LineageContext, aiEnabled } from "./App";
import { useReactFlow } from "reactflow";
import {
  expandTableLineageLevelWise,
  highlightTableConnections,
  layoutElementsOnCanvas,
} from "./graph";

const InfoIcon: FunctionComponent<{ id: string; message: string }> = ({
  id,
  message,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={styles.alert_icon}
      id={id}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AlertCircleIcon />
      <Tooltip target={id} isOpen={isOpen}>
        {message}
      </Tooltip>
    </div>
  );
};

const ActionButton = ({
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
      className="d-flex align-items-center gap-sm"
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
  } = useContext(LineageContext);
  const [nodeCount, setNodeCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState([0, 0]);

  useEffect(() => {
    setLeftExpansion(0);
    setRightExpansion(0);
    setNodeCount(0);
  }, [selectedTable, setLeftExpansion, setRightExpansion]);

  useEffect(() => {
    (async () => {
      if (!selectedTable) return;
      const selectedTableData = flow.getNode(selectedTable)?.data;
      if (!selectedTableData) return;
      const { level } = selectedTableData;
      const nodes = flow.getNodes();
      const edges = flow.getEdges();
      const startingNodesNum = nodes.length;
      const [newNodes] = await expandTableLineageLevelWise(
        nodes,
        edges,
        selectedTable,
        level - leftExpansion,
        level + rightExpansion
      );
      setNodeCount(newNodes.length - startingNodesNum);
    })();
  }, [flow, leftExpansion, rightExpansion, selectedTable]);

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
      setRange([level - minLevel, maxLevel - level]);
    })();
  }, [flow, selectedTable]);

  return (
    <>
      <Button
        size="sm"
        color="primary"
        className="d-flex gap-sm align-items-center"
        id="expand-btn"
        type="button"
      >
        <ExpandIcon />
        Expand
      </Button>
      <Popover
        placement="bottom"
        trigger="click"
        target="expand-btn"
        className={styles.expand_popover}
        isOpen={isOpen}
        toggle={() => setIsOpen((b) => !b)}
      >
        <PopoverBody>
          <div className="d-flex flex-column gap-xs">
            <div className="w-100 d-flex gap-xl justify-content-between align-items-center">
              <div className={styles.expand_nav_left}>
                <div className={styles.expand_nav_btn}>
                  <div
                    className={styles.icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLeftExpansion(range[0]);
                    }}
                  >
                    <ArrowLeftDoubleIcon />
                  </div>
                  <div className={styles.divider} />
                  <div
                    className={styles.icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLeftExpansion((i) => (i + 1 <= range[0] ? i + 1 : i));
                    }}
                  >
                    <ArrowLeftIcon />
                  </div>
                </div>
                <div className="text-blue px-2 py-1">{leftExpansion}</div>
              </div>
              <div className={styles.expand_nav_right}>
                <div className="text-blue px-2 py-1">{rightExpansion}</div>
                <div className={styles.expand_nav_btn}>
                  <div
                    className={styles.icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRightExpansion((i) => (i + 1 <= range[1] ? i + 1 : i));
                    }}
                  >
                    <ArrowRightIcon />
                  </div>
                  <div className={styles.divider} />
                  <div
                    className={styles.icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRightExpansion(range[1]);
                    }}
                  >
                    <ArrowRightDoubleIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex gap-xl justify-content-between align-items-center">
              <div className="normal-text">Expand parents</div>
              <div className="normal-text">Expand children</div>
            </div>
            <Button
              color="primary"
              size="sm"
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
                setIsOpen(false);
                setLeftExpansion(0);
                setRightExpansion(0);
              }}
            >
              Add {nodeCount} tables
            </Button>
          </div>
        </PopoverBody>
      </Popover>
    </>
  );
};

export const ActionWidget: FC<{
  selectCheck: boolean;
  setSelectCheck: Dispatch<SetStateAction<boolean>>;
  nonSelectCheck: boolean;
  setNonSelectCheck: Dispatch<SetStateAction<boolean>>;
}> = ({ selectCheck, setSelectCheck, nonSelectCheck, setNonSelectCheck }) => {
  const {
    selectedColumn,
    confidence,
    setSidebarScreen,
    setShowSidebar,
    setSelectedColumn,
    setCollectColumns,
    setMoreTables,
    setLeftExpansion,
    setRightExpansion,
  } = useContext(LineageContext);
  const flow = useReactFlow();

  return (
    <div className="top-right-container">
      {aiEnabled && (
        <Card className={styles.menu_card_container}>
          <CardBody className={styles.menu_card}>
            <div className="d-flex gap-sm">
              <AutoExpansionPopover />
              {selectedColumn.name && (
                <>
                  <div className={styles.select_node_checkbox}>
                    <Input
                      type="checkbox"
                      id="select-check"
                      className="mt-0"
                      checked={selectCheck}
                      onChange={(e) => {
                        if (CLL.inProgress) {
                          CLL.showCllInProgressMsg();
                          return;
                        }
                        setSelectCheck(e.target.checked);
                      }}
                    />
                    <Label check for="select-check">
                      Select
                    </Label>
                    <InfoIcon
                      id="select_lineage"
                      message="Select linkages are shown if there is direct flow of data between columns through select statements."
                    />
                  </div>
                  <div className={styles.non_select_node_checkbox}>
                    <Input
                      type="checkbox"
                      id="non-select-check"
                      className="mt-0"
                      checked={nonSelectCheck}
                      onChange={(e) => {
                        if (CLL.inProgress) {
                          CLL.showCllInProgressMsg();
                          return;
                        }
                        setNonSelectCheck(e.target.checked);
                      }}
                    />
                    <Label check for="non-select-check">
                      Non-Select
                    </Label>
                    <InfoIcon
                      id="non_select_lineage"
                      message={
                        "Non-Select linkages are shown if columns appear " +
                        "in condition/clauses like where, join, having, etc."
                      }
                    />
                  </div>
                  {confidence.confidence === "low" && (
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
                </>
              )}
            </div>
          </CardBody>
        </Card>
      )}
      <Button
        size="sm"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          setLegacyLineageView();
          CLL.cancel();
        }}
      >
        Show Legacy UX
      </Button>
      <ActionButton
        onClick={(e) => {
          e.stopPropagation();
          setSidebarScreen(HELP_SIDEBAR);
          setShowSidebar(true);
        }}
      >
        <HelpIcon />
        <span>Help</span>
      </ActionButton>
      <ActionButton
        onClick={(e) => {
          e.stopPropagation();
          flow.setNodes([]);
          flow.setEdges([]);
          setSelectedColumn({ table: "", name: "", sessionId: "" });
          setCollectColumns({});
          setMoreTables({});
          setLeftExpansion(0);
          setRightExpansion(0);
          init();
          CLL.cancel();
        }}
        data-testid="reset-btn"
      >
        <ResetIcon />
        <span>Reset</span>
      </ActionButton>
      <ActionButton
        onClick={(e) => {
          e.stopPropagation();
          // setSidebarScreen(FEEDBACK_SIDEBAR);
          // setShowSidebar(true);
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
