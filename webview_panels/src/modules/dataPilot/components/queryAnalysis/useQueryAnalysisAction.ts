import { executeStreamRequest } from "@modules/app/requestExecutor";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { useRef, useState } from "react";
import { QueryExplainResult, QueryExplainUpdate } from "./types";

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
    cb({ id: idRef.current, response: chunk });
  };

  const executeQueryAnalysis = async (
    action: DataPilotChatAction,
    onNewGeneration: (result: QueryExplainUpdate) => void,
  ) => {
    try {
      setIsLoading(true);

      idRef.current = crypto.randomUUID();

      onNewGeneration({
        id: idRef.current,
        user_prompt: "Query Explanation",
        datapilot_title: "Datapilot Response",
        state: RequestState.LOADING,
      });
      const result = (await executeStreamRequest(
        action.command,
        {},
        (chunk: string) => {
          onProgress(chunk, onNewGeneration);
        },
      )) as QueryExplainResult;

      panelLogger.info("result", result);
      onNewGeneration(result);
    } catch (err) {
      panelLogger.error("Error while fetching explanation", err);
      onNewGeneration({
        id: idRef.current,
        response: (err as Error).message,
        state: RequestState.ERROR,
      });
    }
    setIsLoading(false);
  };

  return { executeQueryAnalysis, isLoading };
};

export default useQueryAnalysisAction;
