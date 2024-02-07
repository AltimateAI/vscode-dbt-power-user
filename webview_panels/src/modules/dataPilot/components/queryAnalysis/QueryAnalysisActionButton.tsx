import { DataPilotChatAction } from "@modules/dataPilot/types";
import { Button } from "@uicore";
import { QueryAnalysisType, QueryExplainUpdate } from "./types";
import useQueryAnalysisAction from "./useQueryAnalysisAction";

interface Props {
  action: DataPilotChatAction;
  onNewGeneration: (result: QueryExplainUpdate) => void;
  analysisType?: QueryAnalysisType;
}

const QueryAnalysisActionButton = ({
  action,
  onNewGeneration,
  analysisType,
}: Props): JSX.Element => {
  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();

  // useEffect(() => {
  //     if (!analysisType && isLoading){
  //       return;
  //     }
  //     executeQueryAnalysis(action, onNewGeneration).catch(err => panelLogger.error("error while executing analysis", err))
  // }, [analysisType, isLoading]);
  return (
    <>
      <Button
        key={action.title?.toString()}
        onClick={() => executeQueryAnalysis(action, onNewGeneration)}
        disabled={isLoading}
      >
        {action.title} {analysisType}
      </Button>
    </>
  );
};

export default QueryAnalysisActionButton;
