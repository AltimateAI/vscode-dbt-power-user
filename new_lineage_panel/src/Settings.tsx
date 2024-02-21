import { useContext } from "react";
import "reactflow/dist/style.css";
import { Input, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { CLL } from "./service_utils";
import { LineageContext, aiEnabled } from "./App";

function Settings() {
  const {
    selectedColumn,
    selectCheck,
    setSelectCheck,
    nonSelectCheck,
    setNonSelectCheck,
  } = useContext(LineageContext);
  return (
    <div className="p-2 h-100 d-flex flex-column">
      <div className="mb-2 fw-semibold fs-5">Settings</div>
      <div className="flex flex-column gap-sm">
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
              <div>
                Select linkages are shown if there is direct flow of data
                between columns through select statements.
              </div>
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
              <div>
                Non-Select linkages are shown if columns appear in
                condition/clauses like where, join, having, etc.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { Settings };
