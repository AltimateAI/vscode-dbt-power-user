import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import {
  DatapilotQueryAnalysisChat,
  QueryAnalysisHistory,
  QueryAnalysisHistoryType,
} from "../types";
import { useContext, useMemo } from "react";
import { QueryAnalysisContext } from "./QueryAnalysisProvider";
import { QueryAnalysisContextProps } from "./types";

const useQueryAnalysisContext = (): {
  chat: DatapilotQueryAnalysisChat;
  history: QueryAnalysisHistory[];
} & QueryAnalysisContextProps => {
  const {
    state: { items },
  } = useDataPilotContext();

  const chat = Object.values(items)[0] as DatapilotQueryAnalysisChat;
  const context = useContext(QueryAnalysisContext);

  const history = useMemo(() => {
    // const intialMessage = [
    //   { content: chat.query, type: QueryAnalysisHistoryType.HUMAN },
    //   { content: chat.response, type: QueryAnalysisHistoryType.SYSTEM },
    // ].filter(r => !!r.content) as QueryAnalysisHistory[];
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
  };
};

export default useQueryAnalysisContext;
