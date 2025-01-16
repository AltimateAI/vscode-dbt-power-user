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
  const { limit, activeEditor } = useQueryPanelState();
  const limitStr = limit?.toString() ?? "500";
  const [value, setValue] = useState(limitStr);
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
    setValue(limitStr);
  }, [limitStr, activeEditor?.filepath]);

  useEffect(() => {
    if (value && value !== limitStr) {
      setLimitSaveState(LimitSaveState.Dirty);
    } else if (limitSaveState !== LimitSaveState.Saved) {
      setLimitSaveState(LimitSaveState.Default);
    }
  }, [value, limitStr]);

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
              const newValue = e.target.value.replace(/[^\d]/g, "");
              setValue(newValue);
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
            className={[
              styles.playButton,
              value && activeEditor?.filepath?.endsWith(".sql")
                ? styles.active
                : styles.inactive,
            ].join(" ")}
            onClick={() => {
              if (value && activeEditor?.filepath?.endsWith(".sql")) {
                executeRequestInAsync("executeQueryFromActiveWindow", {
                  limit: parseInt(value),
                });
              }
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
