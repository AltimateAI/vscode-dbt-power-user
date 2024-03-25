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
}
const useQueryAnalysisAction = (): {
  isLoading: boolean;
  executeQueryAnalysis: (args: QueryAnalysisRequest) => Promise<void>;
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
  }: QueryAnalysisRequest) => {
    if (isMaxFollowupReached) {
      return;
    }
    const id = crypto.randomUUID();
    try {
      panelLogger.info("executeQueryAnalysis", sessionId, id, chat?.meta);
      setIsLoading(true);

      onNewGeneration({
        id,

        user_prompt: user_request ?? getRequestText(command),
        datapilot_title: "Datapilot Response",
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
            filePath: chat?.filePath,
            ...chat?.meta,
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
              user_prompt: question,
              datapilot_title: question,
            }))
          : [],
      });
    } catch (err) {
      panelLogger.error("Error while fetching explanation", err);
      onNewGeneration({
        id,
        response: (err as Error).message,
        state: RequestState.ERROR,
      });
    }
    setIsLoading(false);
  };

  return { executeQueryAnalysis, isLoading };
};

export default useQueryAnalysisAction;
