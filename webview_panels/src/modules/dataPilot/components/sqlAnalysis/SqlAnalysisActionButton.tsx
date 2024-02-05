import { DataPilotChatAction } from "@modules/dataPilot/types";
import { useState } from "react";
import { Button } from "@uicore";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { SqlExplainResult } from "./types";

interface Props {
  action: DataPilotChatAction;
  onNewGeneration: (result: SqlExplainResult) => void;
}

const SqlAnalysisActionButton = ({
  action,
  onNewGeneration,
}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const handleBtnClick = async () => {
    setIsLoading(true);
    const result = (await executeRequestInSync(
      action.command,
      {},
    )) as SqlExplainResult;
    panelLogger.log(result);
    onNewGeneration(result);
    setIsLoading(false);
  };
  return (
    <>
      <Button
        key={action.title?.toString()}
        onClick={handleBtnClick}
        disabled={isLoading}
      >
        {action.title}
      </Button>
    </>
  );
};

export default SqlAnalysisActionButton;
