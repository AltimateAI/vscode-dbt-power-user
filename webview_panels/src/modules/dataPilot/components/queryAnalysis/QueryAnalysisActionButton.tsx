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
  const { chat, onNewGeneration, isMaxFollowupReached } =
    useQueryAnalysisContext();
  const { dispatch } = useDataPilotContext();
  const results = chat?.followups;

  const isDefaultButton = results?.length === 0;

  const getAnalysisType = () => {
    switch (action.command) {
      case QueryAnalysisCommands.explain:
        return QueryAnalysisType.EXPLAIN;
      case QueryAnalysisCommands.modify:
        return QueryAnalysisType.MODIFY;
      case QueryAnalysisCommands.translate:
        return QueryAnalysisType.TRANSLATE;
      default:
        break;
    }
  };

  const handleClick = () => {
    const analysisType = getAnalysisType();
    // If analysis type is not set for chat yet, set the current analysis type and state as completed to avoid multiple requests
    if (!chat?.analysisType) {
      dispatch(
        upsertItem({
          ...chat,
          analysisType,
          state: RequestState.COMPLETED,
        } as DatapilotQueryAnalysisChat),
      );
    }

    if (analysisType === QueryAnalysisType.MODIFY) {
      onNewGeneration({
        state: RequestState.COMPLETED,
      });
      return;
    }

    if (analysisType === QueryAnalysisType.TRANSLATE) {
      onNewGeneration({
        datapilotTitle: "Datapilot Response",
        hideFeedback: true,
        response: "",
        component: "queryTranslate",
        state: RequestState.COMPLETED,
        hideFollowup: true,
      });
      return;
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
        buttonText={action.title}
      />
    </>
  );
};

export default QueryAnalysisActionButton;
