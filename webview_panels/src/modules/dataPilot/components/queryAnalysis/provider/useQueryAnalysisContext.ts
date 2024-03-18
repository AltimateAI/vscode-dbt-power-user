import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import {
  DatapilotQueryAnalysisChat,
  QueryAnalysisHistory as DatapilotChatThreadHistory,
  QueryAnalysisHistoryType,
} from "../types";
import { useContext, useMemo } from "react";
import { QueryAnalysisContext } from "./QueryAnalysisProvider";
import { QueryAnalysisContextProps } from "./types";

export const MAX_ALLOWED_FOLLOWUP_QUESTIONS = 15;

const useQueryAnalysisContext = (): {
  chat?: DatapilotQueryAnalysisChat;
  history: DatapilotChatThreadHistory[];
  isMaxFollowupReached: boolean;
  packageVersions: Record<string, string>;
} & QueryAnalysisContextProps => {
  const {
    state: { items, currentSessionId, packageVersions },
  } = useDataPilotContext();

  const chat = currentSessionId
    ? (items[currentSessionId] as DatapilotQueryAnalysisChat | undefined)
    : undefined;
  const context = useContext(QueryAnalysisContext);
  const followups = chat?.followups;

  const history = useMemo(() => {
    const intialMessage = [] as DatapilotChatThreadHistory[];
    if (!followups?.length) {
      return intialMessage;
    }

    return [
      ...intialMessage,
      ...followups
        .map((result) => [
          { content: result.user_prompt, type: QueryAnalysisHistoryType.HUMAN },
          { content: result.response, type: QueryAnalysisHistoryType.SYSTEM },
        ])
        .flat()
        .filter((r) => !!r.content),
    ] as DatapilotChatThreadHistory[];
  }, [chat, followups]);

  return {
    chat,
    ...context,
    history,
    packageVersions,
    isMaxFollowupReached:
      MAX_ALLOWED_FOLLOWUP_QUESTIONS <= (followups?.length ?? 0),
  };
};

export default useQueryAnalysisContext;
