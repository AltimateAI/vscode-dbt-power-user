import { executeStreamRequest } from "@modules/app/requestExecutor";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { useRef, useState } from "react";
import { QueryExplainUpdate } from "./types";

const useQueryAnalysisAction = (): {
  isLoading: boolean;
  executeQueryAnalysis: (
    action: DataPilotChatAction,
    onNewGeneration: (result: QueryExplainUpdate) => void,
  ) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const idRef = useRef("");

  const onProgress = (
    chunk: string,
    cb: (result: QueryExplainUpdate) => void,
  ) => {
    panelLogger.log("chunk", chunk);
    cb({ session_id: idRef.current, response: chunk });
  };

  const executeQueryAnalysis = async (
    action: DataPilotChatAction,
    onNewGeneration: (result: QueryExplainUpdate) => void,
  ) => {
    try {
      setIsLoading(true);

      idRef.current = crypto.randomUUID();

      onNewGeneration({
        session_id: idRef.current,
        user_prompt: "Query Explanation",
        datapilot_title: "Datapilot Response",
        state: RequestState.LOADING,
      });
      const result = (await executeStreamRequest(
        action.command,
        { session_id: idRef.current },
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
