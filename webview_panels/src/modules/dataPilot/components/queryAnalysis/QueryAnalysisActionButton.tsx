import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import { Button } from "@uicore";
import useQueryAnalysisAction from "./useQueryAnalysisAction";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";
import { panelLogger } from "@modules/logger";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { upsertItem } from "@modules/dataPilot/dataPilotSlice";
import { DatapilotQueryAnalysisChat, QueryAnalysisType } from "./types";
import { QueryAnalysisCommands } from "./commands";
import classes from "../../datapilot.module.scss";

interface Props {
  action: DataPilotChatAction;
}

const QueryAnalysisActionButton = ({ action }: Props): JSX.Element => {
  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();
  const { chat, onNewGeneration, isMaxFollowupReached, results } =
    useQueryAnalysisContext();
  const { dispatch } = useDataPilotContext();

  const isDefaultButton = results.length === 0;

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
    // If analysis type is not set for chat yet, set the current analysis type and state as completed to avoid multiple requests
    if (!chat?.analysisType) {
      const analysisType = getAnalysisType();
      dispatch(
        upsertItem({
          ...chat,
          analysisType,
          state: RequestState.COMPLETED,
        } as DatapilotQueryAnalysisChat),
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
        className={`${classes.actionButton} ${
          isDefaultButton ? classes.default : ""
        }`}
      >
        {action.title}
      </Button>
    </>
  );
};

export default QueryAnalysisActionButton;
