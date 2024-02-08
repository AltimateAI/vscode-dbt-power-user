import { DataPilotChatAction } from "@modules/dataPilot/types";
import { Button } from "@uicore";
import useQueryAnalysisAction from "./useQueryAnalysisAction";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";

interface Props {
  action: DataPilotChatAction;
}

const QueryAnalysisActionButton = ({ action }: Props): JSX.Element => {
  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();
  const {
    chat: { id: sessionId },
    onNewGeneration,
  } = useQueryAnalysisContext();

  return (
    <>
      <Button
        key={action.title?.toString()}
        onClick={() =>
          executeQueryAnalysis({
            command: action.command,
            onNewGeneration,
            sessionId,
          })
        }
        disabled={isLoading}
      >
        {action.title}
      </Button>
    </>
  );
};

export default QueryAnalysisActionButton;
