import { executeStreamRequest } from "@modules/app/requestExecutor";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { useRef, useState } from "react";
import { SqlExplainResult, SqlExplainUpdate } from "./types";

const useSqlAnalysisAction = (): {
  isLoading: boolean;
  executeSqlAnalysis: (
    action: DataPilotChatAction,
    onNewGeneration: (result: SqlExplainUpdate) => void,
  ) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const idRef = useRef("");

  const onProgress = (
    chunk: string,
    cb: (result: SqlExplainUpdate) => void,
  ) => {
    panelLogger.log("chunk", chunk);
    cb({ id: idRef.current, response: chunk });
  };

  const executeSqlAnalysis = async (
    action: DataPilotChatAction,
    onNewGeneration: (result: SqlExplainUpdate) => void,
  ) => {
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
    )) as SqlExplainResult;

    panelLogger.log("result", result);
    onNewGeneration(result);
    setIsLoading(false);
  };

  return { executeSqlAnalysis, isLoading };
};

export default useSqlAnalysisAction;
