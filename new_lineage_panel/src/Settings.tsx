import { FunctionComponent, useContext, useState } from "react";
import "reactflow/dist/style.css";
import { Input, Label, Tooltip } from "reactstrap";
import AlertCircleIcon from "./assets/icons/alert-circle.svg?react";
import styles from "./styles.module.scss";
import { CLL } from "./service_utils";
import { LineageContext, aiEnabled } from "./App";

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

function Settings() {
  const {
    selectedColumn,
    confidence,
    selectCheck,
    setSelectCheck,
    nonSelectCheck,
    setNonSelectCheck,
  } = useContext(LineageContext);
  return (
    <div className="p-2 h-100 d-flex flex-column">
      <div className="mb-2 fw-semibold fs-5">Settings</div>
      {aiEnabled && selectedColumn.name && (
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
  );
}

export { Settings };
