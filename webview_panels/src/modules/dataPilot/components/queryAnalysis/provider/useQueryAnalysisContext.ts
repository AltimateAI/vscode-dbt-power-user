import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { DatapilotQueryAnalysisChat } from "../types";
import { useContext } from "react";
import { QueryAnalysisContext } from "./QueryAnalysisProvider";
import { QueryAnalysisContextProps } from "./types";

const useQueryAnalysisContext = (): {
  chat: DatapilotQueryAnalysisChat;
} & QueryAnalysisContextProps => {
  const {
    state: { items },
  } = useDataPilotContext();

  const context = useContext(QueryAnalysisContext);

  return {
    chat: Object.values(items)[0] as DatapilotQueryAnalysisChat,
    ...context,
  };
};

export default useQueryAnalysisContext;
