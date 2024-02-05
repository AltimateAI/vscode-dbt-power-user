import { DataPilotChatAction } from "@modules/dataPilot/types";
import { useState } from "react";
import { Button } from "@uicore";

interface Props {
  action: DataPilotChatAction;
  onNewGeneration: (column: unknown) => void;
}

const SqlAnalysisActionButton = ({
  action,
  onNewGeneration,
}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const handleBtnClick = () => {
    setIsLoading(true);
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
