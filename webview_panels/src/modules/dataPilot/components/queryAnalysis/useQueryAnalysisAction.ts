import {
  executeRequestInSync,
  executeStreamRequest,
} from "@modules/app/requestExecutor";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { useState } from "react";
import { QueryAnalysisHistory, QueryExplainUpdate } from "./types";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";
import { QueryAnalysisCommands } from "./commands";

interface QueryAnalysisRequest {
  command: DataPilotChatAction["command"];
  onNewGeneration: (result: QueryExplainUpdate) => void;
  sessionId?: string;
  user_request?: string;
  history?: QueryAnalysisHistory[];
  skipFollowupQuestions?: boolean;
  request?: Record<string, unknown>;
}
const useQueryAnalysisAction = (): {
  isLoading: boolean;
  executeQueryAnalysis: (
    args: QueryAnalysisRequest,
  ) => Promise<string | undefined>;
} => {
  const { chat, isMaxFollowupReached, packageVersions } =
    useQueryAnalysisContext();
  const [isLoading, setIsLoading] = useState(false);

  // No need for followup questions for query modify
  // const skipFollowupQuestions = chat?.analysisType === QueryAnalysisType.MODIFY;

  const onProgress = (
    id: string,
    chunk: string,
    cb: (result: QueryExplainUpdate) => void,
  ) => {
    cb({ id, response: chunk });
  };

  const getRequestText = (command: string) => {
    switch (command) {
      case QueryAnalysisCommands.modify:
        return "Query change";

      case QueryAnalysisCommands.explain:
        return "Query explanation";
      default:
        break;
    }
  };
  const executeQueryAnalysis = async ({
    command,
    onNewGeneration,
    history,
    sessionId,
    user_request,
    skipFollowupQuestions,
    request,
  }: QueryAnalysisRequest) => {
    if (isMaxFollowupReached) {
      return;
    }
    const id = crypto.randomUUID();
    try {
      panelLogger.info(
        "executeQueryAnalysis",
        command,
        sessionId,
        id,
        chat?.meta,
      );
      setIsLoading(true);

      onNewGeneration({
        id,

        userPrompt: user_request ?? getRequestText(command),
        datapilotTitle: "Datapilot Response",
        state: RequestState.LOADING,
      });
      const [result, followupQuestions] = await Promise.all([
        executeStreamRequest(
          command,
          // use the original chat session id to track the whole conversation
          {
            session_id: sessionId,
            history,
            user_request,
            dbt_expectations: Boolean(packageVersions.dbt_expectations),
            dbt_utils: Boolean(packageVersions.dbt_utils),
            ...chat?.meta,
            ...request,
          },
          (chunk: string) => {
            onProgress(id, chunk, onNewGeneration);
          },
        ) as Promise<{ response: string }>,
        skipFollowupQuestions
          ? undefined
          : (executeRequestInSync("queryanalysis:followup", {
              user_request,
              query: chat?.query,
            }) as Promise<string[] | null>),
      ]);

      panelLogger.info(
        "executeQueryAnalysis result",
        result,
        followupQuestions,
      );
      onNewGeneration({
        id,
        response: result?.response,
        state: RequestState.COMPLETED,
        actions: Array.isArray(followupQuestions)
          ? followupQuestions.map((question) => ({
              title: question,
              data: {},
              command,
              userPrompt: question,
              datapilotTitle: question,
            }))
          : [],
      });
      return result?.response;
    } catch (err) {
      panelLogger.error("Error while fetching explanation", err);
      onNewGeneration({
        id,
        response: (err as Error).message,
        state: RequestState.ERROR,
      });
    }
    setIsLoading(false);
    return;
  };

  return { executeQueryAnalysis, isLoading };
};

export default useQueryAnalysisAction;
