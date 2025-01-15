import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setLimit } from "@modules/queryPanel/context/queryPanelSlice";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Input, Stack } from "@uicore";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { PlayIcon } from "@assets/icons";

enum LimitSaveState {
  Default = 1,
  Dirty,
  Saved,
}

const QueryLimit = (): JSX.Element => {
  const { limit, queryResults } = useQueryPanelState();
  const [value, setValue] = useState(limit?.toString() ?? "");
  const [limitSaveState, setLimitSaveState] = useState(LimitSaveState.Default);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useQueryPanelDispatch();
  const saveLimit = () => {
    if (!value) {
      return;
    }
    dispatch(setLimit(parseInt(value)));
    executeRequestInAsync("updateConfig", { limit: parseInt(value) });
    setLimitSaveState(LimitSaveState.Saved);
    setTimeout(() => {
      setLimitSaveState(LimitSaveState.Default);
    }, 2000);
  };

  useEffect(() => {
    setValue(limit?.toString() ?? "");
  }, [limit]);

  return (
    <div className={styles.container}>
      <Stack className={styles.limitContainer}>
        <span className={styles.label}>Limit</span>
        <div
          className={[
            styles.content,
            isFocused ? styles.active : styles.inactive,
          ].join(" ")}
        >
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setLimitSaveState(
                e.target.value !== (limit?.toString() ?? "")
                  ? LimitSaveState.Dirty
                  : LimitSaveState.Default,
              );
            }}
            className={styles.input}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />

          <div
            className={styles.playButton}
            onClick={() => {
              executeRequestInAsync("executeQuery", {
                query: queryResults?.raw_sql,
                projectName: "",
                editorName: "",
                limit: parseInt(value),
              });
            }}
          >
            <PlayIcon />
          </div>
        </div>
      </Stack>
      {limitSaveState !== LimitSaveState.Default && (
        <Stack className={styles.saveContainer}>
          <div>Set as default</div>
          {limitSaveState === LimitSaveState.Dirty ? (
            <div className={styles.saveButton} onClick={saveLimit}>
              Save
            </div>
          ) : (
            <div className={styles.saveButton}>Saved</div>
          )}
        </Stack>
      )}
    </div>
  );
};

export default QueryLimit;
