import { useContext } from "react";
import "reactflow/dist/style.css";
import { Input, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { CLL } from "./service_utils";
import { LineageContext, aiEnabled } from "./App";
import { CustomInput } from "./components/Form";

function Settings() {
  const {
    selectedColumn,
    selectCheck,
    setSelectCheck,
    nonSelectCheck,
    setNonSelectCheck,
    defaultExpansion,
    setDefaultExpansion,
  } = useContext(LineageContext);
  return (
    <div className="p-2 h-100 d-flex flex-column">
      <div className="mb-2 fw-semibold fs-5">Settings</div>
      <div className="d-flex flex-column gap-sm">
        <div>
          <Label check for="default-expansion" className="fs-6 mb-1">
            Default Expansion
          </Label>
          <CustomInput
            id="default-expansion"
            value={defaultExpansion}
            type="number"
            onChange={(e) =>
              setDefaultExpansion(Math.max(parseInt(e.target.value), 0))
            }
          />
        </div>
        {aiEnabled && selectedColumn.name && (
          <>
            <div className="fs-6">Edges visibility</div>
            <div className={styles.select_node_checkbox}>
              <Input
                type="checkbox"
                id="select-check"
                className="mt-2"
                checked={selectCheck}
                onChange={(e) => {
                  if (CLL.inProgress) {
                    CLL.showCllInProgressMsg();
                    return;
                  }
                  setSelectCheck(e.target.checked);
                }}
              />
              <div className="d-flex flex-column">
                <Label check for="select-check" className="fs-6">
                  Select
                </Label>
                <div className="text-grey">
                  Select linkages are shown if there is direct flow of data
                  between columns through select statements.
                </div>
              </div>
            </div>
            <div className={styles.non_select_node_checkbox}>
              <Input
                type="checkbox"
                id="non-select-check"
                className="mt-2"
                checked={nonSelectCheck}
                onChange={(e) => {
                  if (CLL.inProgress) {
                    CLL.showCllInProgressMsg();
                    return;
                  }
                  setNonSelectCheck(e.target.checked);
                }}
              />
              <div className="d-flex flex-column">
                <Label check for="non-select-check" className="fs-6">
                  Non-Select
                </Label>
                <div className="text-grey">
                  Non-Select linkages are shown if columns appear in
                  condition/clauses like where, join, having, etc.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { Settings };
