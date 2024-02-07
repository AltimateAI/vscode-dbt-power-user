import { DataPilotChatAction } from "@modules/dataPilot/types";
import { Button } from "@uicore";
import useQueryAnalysisAction from "./useQueryAnalysisAction";
import { panelLogger } from "@modules/logger";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";

interface Props {
  action: DataPilotChatAction;
}

const QueryAnalysisActionButton = ({ action }: Props): JSX.Element => {
  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();
  const {
    chat: { id: sessionId, analysisType },
    onNewGeneration,
  } = useQueryAnalysisContext();

  // useEffect(() => {
  //     if (!analysisType && isLoading){
  //       return;
  //     }
  //     executeQueryAnalysis(action, onNewGeneration).catch(err => panelLogger.error("error while executing analysis", err))
  // }, [analysisType, isLoading]);

  panelLogger.info(analysisType);

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
