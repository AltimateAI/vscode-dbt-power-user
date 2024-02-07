import { executeStreamRequest } from "@modules/app/requestExecutor";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { useRef, useState } from "react";
import { QueryAnalysisHistory, QueryExplainUpdate } from "./types";

interface QueryAnalysisRequest {
  command: DataPilotChatAction["command"];
  onNewGeneration: (result: QueryExplainUpdate) => void;
  sessionId?: string;
  user_request?: string;
  history?: QueryAnalysisHistory[];
}
const useQueryAnalysisAction = (): {
  isLoading: boolean;
  executeQueryAnalysis: (args: QueryAnalysisRequest) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const idRef = useRef("");

  const onProgress = (
    chunk: string,
    cb: (result: QueryExplainUpdate) => void,
  ) => {
    cb({ session_id: idRef.current, response: chunk });
  };

  const executeQueryAnalysis = async ({
    command,
    onNewGeneration,
    history,
    sessionId,
    user_request,
  }: QueryAnalysisRequest) => {
    try {
      setIsLoading(true);

      idRef.current = sessionId ?? crypto.randomUUID();

      onNewGeneration({
        session_id: idRef.current,
        user_prompt: "Query Explanation",
        datapilot_title: "Datapilot Response",
        state: RequestState.LOADING,
      });
      const result = (await executeStreamRequest(
        command,
        { session_id: idRef.current, history, user_request },
        (chunk: string) => {
          onProgress(chunk, onNewGeneration);
        },
      )) as { response: string };

      panelLogger.info("result", result);
      onNewGeneration({
        session_id: idRef.current,
        response: result.response,
        state: RequestState.COMPLETED,
      });
    } catch (err) {
      panelLogger.error("Error while fetching explanation", err);
      onNewGeneration({
        session_id: idRef.current,
        response: (err as Error).message,
        state: RequestState.ERROR,
      });
    }
    setIsLoading(false);
  };

  return { executeQueryAnalysis, isLoading };
};

export default useQueryAnalysisAction;
