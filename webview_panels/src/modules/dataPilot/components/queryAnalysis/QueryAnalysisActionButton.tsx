import { DataPilotChatAction } from "@modules/dataPilot/types";
import { Button } from "@uicore";
import useQueryAnalysisAction from "./useQueryAnalysisAction";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";
import { panelLogger } from "@modules/logger";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { upsertItem } from "@modules/dataPilot/dataPilotSlice";
import { DatapilotQueryAnalysisChat, QueryAnalysisType } from "./types";
import { QueryAnalysisCommands } from "./commands";

interface Props {
  action: DataPilotChatAction;
}

const QueryAnalysisActionButton = ({ action }: Props): JSX.Element => {
  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();
  const { chat, onNewGeneration, isMaxFollowupReached } =
    useQueryAnalysisContext();
  const { dispatch } = useDataPilotContext();

  const getAnalysisType = () => {
    switch (action.command) {
      case QueryAnalysisCommands.explain:
        return QueryAnalysisType.EXPLAIN;
      case QueryAnalysisCommands.modify:
        return QueryAnalysisType.MODIFY;
      default:
        break;
    }
  };

  const handleClick = () => {
    if (!chat?.analysisType) {
      const analysisType = getAnalysisType();
      dispatch(
        upsertItem({ ...chat, analysisType } as DatapilotQueryAnalysisChat),
      );
    }
    executeQueryAnalysis({
      command: action.command,
      onNewGeneration,
      sessionId: chat?.id,
      user_request: action.title,
    }).catch((err) =>
      panelLogger.error("error handle action button click", err),
    );
  };

  return (
    <>
      <Button
        key={action.title?.toString()}
        onClick={handleClick}
        disabled={isLoading || isMaxFollowupReached}
        className="text-nowrap"
      >
        {action.title}
      </Button>
    </>
  );
};

export default QueryAnalysisActionButton;
