import {
  executeRequestInSync,
  executeStreamRequest,
} from "@modules/app/requestExecutor";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { useState } from "react";
import { QueryAnalysisHistory, QueryExplainUpdate } from "./types";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";

interface QueryAnalysisRequest {
  command: DataPilotChatAction["command"];
  onNewGeneration: (result: QueryExplainUpdate) => void;
  sessionId?: string;
  user_request?: string;
  history?: QueryAnalysisHistory[];
}
const useQueryAnalysisAction = (): {
  isLoading: boolean;
  executeQueryAnalysis: (args: QueryAnalysisRequest) => Promise<void>;
} => {
  const { chat } = useQueryAnalysisContext();
  const [isLoading, setIsLoading] = useState(false);

  const onProgress = (
    id: string,
    chunk: string,
    cb: (result: QueryExplainUpdate) => void
  ) => {
    cb({ session_id: id, response: chunk });
  };

  const executeQueryAnalysis = async ({
    command,
    onNewGeneration,
    history,
    sessionId,
    user_request,
  }: QueryAnalysisRequest) => {
    const id = crypto.randomUUID();
    try {
      panelLogger.info("executeQueryAnalysis", sessionId, id);
      setIsLoading(true);

      onNewGeneration({
        session_id: id,
        user_prompt: "Query Explanation",
        datapilot_title: "Datapilot Response",
        state: RequestState.LOADING,
      });
      const [result, followupQuestions] = await Promise.all([
        executeStreamRequest(
          command,
          // use the original chat session id to track the whole conversation
          { session_id: sessionId, history, user_request },
          (chunk: string) => {
            onProgress(id, chunk, onNewGeneration);
          }
        ) as Promise<{ response: string }>,
        executeRequestInSync("queryanalysis:followup", {
          user_request,
          query: chat?.query,
        }) as Promise<string[] | null>,
      ]);

      panelLogger.info(
        "executeQueryAnalysis result",
        result,
        followupQuestions
      );
      onNewGeneration({
        session_id: id,
        response: result.response,
        state: RequestState.COMPLETED,
        actions: followupQuestions?.map((question) => ({
          title: question,
          data: {},
          command,
          user_prompt: question,
          datapilot_title: question,
        })),
      });
    } catch (err) {
      panelLogger.error("Error while fetching explanation", err);
      onNewGeneration({
        session_id: id,
        response: (err as Error).message,
        state: RequestState.ERROR,
      });
    }
    setIsLoading(false);
  };

  return { executeQueryAnalysis, isLoading };
};

export default useQueryAnalysisAction;
