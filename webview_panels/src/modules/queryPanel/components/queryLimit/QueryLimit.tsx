import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setLimit } from "@modules/queryPanel/context/queryPanelSlice";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Input, Stack } from "@uicore";
import { useState } from "react";
import styles from "./styles.module.scss";
import { PlayIcon } from "@assets/icons";

const QueryLimit = (): JSX.Element => {
  const { limit } = useQueryPanelState();
  const [value, setValue] = useState(limit);
  const dispatch = useQueryPanelDispatch();
  const handleChange = () => {
    dispatch(setLimit(value));
    executeRequestInAsync("updateConfig", { limit: value });
  };

  const handleSubmit = () => {
    // onSave?.(value);
    handleChange();
  };

  return (
    <div className={styles.container}>
      <Stack className={styles.limitContainer}>
        <span className={styles.label}>Limit</span>
        <Input
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={styles.input}
        />

        <div
          className={styles.playButton}
          onClick={() => {
            /* */
          }}
        >
          <PlayIcon />
        </div>
      </Stack>
      <Stack className={styles.saveContainer}>
        <div>Set as default</div>
        <div className={styles.saveButton} onClick={handleSubmit}>
          Save
        </div>
      </Stack>
    </div>
  );
};

export default QueryLimit;
