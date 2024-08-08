import { Button } from "@uicore";
import { RefreshIcon } from "@assets/icons";
import classes from "../../styles.module.scss";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";

const SyncWithDatabase = (): JSX.Element => {
  const onSyncBtnClick = () => {
    executeRequestInSync("fetchMetadataFromDatabase", {}).catch((err) =>
      panelLogger.error("error while syncing with db", err),
    );
  };

  return (
    <Button
      color="warning"
      onClick={onSyncBtnClick}
      className={classes.syncBtn}
      icon={<RefreshIcon />}
      buttontext="Sync with the Database"
    />
  );
};

export default SyncWithDatabase;
