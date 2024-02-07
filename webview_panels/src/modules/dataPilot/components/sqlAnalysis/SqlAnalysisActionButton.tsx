import { DataPilotChatAction } from "@modules/dataPilot/types";
import { Button } from "@uicore";
import { SqlAnalysisType, SqlExplainUpdate } from "./types";
import useSqlAnalysisAction from "./useSqlAnalysisAction";

interface Props {
  action: DataPilotChatAction;
  onNewGeneration: (result: SqlExplainUpdate) => void;
  analysisType?: SqlAnalysisType;
}

const SqlAnalysisActionButton = ({
  action,
  onNewGeneration,
  analysisType,
}: Props): JSX.Element => {
  const { executeSqlAnalysis, isLoading } = useSqlAnalysisAction();

  // useEffect(() => {
  //     if (!analysisType && isLoading){
  //       return;
  //     }
  //     executeSqlAnalysis(action, onNewGeneration).catch(err => panelLogger.error("error while executing analysis", err))
  // }, [analysisType, isLoading]);
  return (
    <>
      <Button
        key={action.title?.toString()}
        onClick={() => executeSqlAnalysis(action, onNewGeneration)}
        disabled={isLoading}
      >
        {action.title} {analysisType}
      </Button>
    </>
  );
};

export default SqlAnalysisActionButton;
