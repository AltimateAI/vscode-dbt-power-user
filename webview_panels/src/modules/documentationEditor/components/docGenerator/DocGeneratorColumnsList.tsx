import { RefreshIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { panelLogger } from "@modules/logger";
import { Alert, Button, Stack } from "@uicore";
import DocGeneratorColumn from "./DocGeneratorColumn";
import classes from "../../styles.module.scss";
import BulkGenerateButton from "./BulkGenerateButton";

const DocGeneratorColumnsList = (): JSX.Element => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();

  const onSyncBtnClick = () => {
    executeRequestInSync("fetchMetadataFromDatabase", {}).catch((err) =>
      panelLogger.error("error while syncing with db", err),
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <Stack className={classes.columnHeader}>
          <h1>Columns</h1>
          <Button color="warning" onClick={onSyncBtnClick}>
            <RefreshIcon /> Sync with the Database
          </Button>
          <BulkGenerateButton />
        </Stack>
        <Alert color="warning">
          Note: If you need to override existing documentation, please
          (re)generate documentation at individual column level
        </Alert>
      </div>
      <Stack direction="column" style={{ gap: 24 }}>
        {currentDocsData?.columns.map((column) => (
          <DocGeneratorColumn key={column.name} column={column} />
        ))}
      </Stack>
    </div>
  );
};

export default DocGeneratorColumnsList;
