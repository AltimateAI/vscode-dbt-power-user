import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setLimit } from "@modules/queryPanel/context/queryPanelSlice";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Input, Stack } from "@uicore";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { PlayIcon } from "@assets/icons";

const QueryLimit = (): JSX.Element => {
  const { limit, queryResults } = useQueryPanelState();
  const [value, setValue] = useState(limit?.toString() ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useQueryPanelDispatch();
  const saveLimit = () => {
    if (!value) {
      return;
    }
    dispatch(setLimit(parseInt(value)));
    executeRequestInAsync("updateConfig", { limit: parseInt(value) });
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
            onChange={(e) => setValue(e.target.value)}
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
      <Stack className={styles.saveContainer}>
        <div>Set as default</div>
        <div className={styles.saveButton} onClick={saveLimit}>
          Save
        </div>
      </Stack>
    </div>
  );
};

export default QueryLimit;
