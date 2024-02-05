import { DataPilotChatAction } from "@modules/dataPilot/types";
import { useState } from "react";
import { Button } from "@uicore";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";

interface Props {
  action: DataPilotChatAction;
  onNewGeneration: (column: unknown) => void;
}

const SqlAnalysisActionButton = ({
  action,
  onNewGeneration,
}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const handleBtnClick = async () => {
    setIsLoading(true);
    const result = await executeRequestInSync(action.command, {});
    panelLogger.log(result);
    onNewGeneration({});
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
