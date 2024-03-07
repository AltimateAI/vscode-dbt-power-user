import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import {
  DatapilotQueryAnalysisChat,
  QueryAnalysisHistory,
  QueryAnalysisHistoryType,
} from "../types";
import { useContext, useMemo } from "react";
import { QueryAnalysisContext } from "./QueryAnalysisProvider";
import { QueryAnalysisContextProps } from "./types";

export const MAX_ALLOWED_FOLLOWUP_QUESTIONS = 15;

const useQueryAnalysisContext = (): {
  chat?: DatapilotQueryAnalysisChat;
  history: QueryAnalysisHistory[];
  isMaxFollowupReached: boolean;
} & QueryAnalysisContextProps => {
  const {
    state: { items, currentSessionId },
  } = useDataPilotContext();

  const chat = currentSessionId
    ? (items[currentSessionId] as DatapilotQueryAnalysisChat | undefined)
    : undefined;
  const context = useContext(QueryAnalysisContext);

  const history = useMemo(() => {
    const intialMessage = [] as QueryAnalysisHistory[];
    if (!context.results.length) {
      return intialMessage;
    }

    return [
      ...intialMessage,
      ...context.results
        .map((result) => [
          { content: result.user_prompt, type: QueryAnalysisHistoryType.HUMAN },
          { content: result.response, type: QueryAnalysisHistoryType.SYSTEM },
        ])
        .flat()
        .filter((r) => !!r.content),
    ] as QueryAnalysisHistory[];
  }, [chat, context.results]);

  return {
    chat,
    ...context,
    history,
    isMaxFollowupReached:
      MAX_ALLOWED_FOLLOWUP_QUESTIONS <= context.results.length,
  };
};

export default useQueryAnalysisContext;
