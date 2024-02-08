import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { QueryAnalysisContextProps } from "./types";
import queryAnalysisSlice, { initialState } from "./queryAnalysisSlice";
import { QueryExplainResult, QueryExplainUpdate } from "../types";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import useQueryAnalysisAction from "../useQueryAnalysisAction";
import { panelLogger } from "@modules/logger";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { upsertItem } from "@modules/dataPilot/dataPilotSlice";

export const QueryAnalysisContext = createContext<QueryAnalysisContextProps>({
  state: initialState,
  dispatch: () => null,
  onNewGeneration: (_result: QueryExplainUpdate) => null,
  results: [],
});

interface Props {
  children: ReactNode;
}

const QueryAnalysisProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(
    queryAnalysisSlice.reducer,
    queryAnalysisSlice.getInitialState(),
  );

  const {
    state: { items },
    dispatch: datapilotDispatch,
  } = useDataPilotContext();
  const chat = Object.values(items)[0];

  const { executeQueryAnalysis } = useQueryAnalysisAction();
  const [results, setResults] = useState<QueryExplainResult[]>([]);

  const onNewGeneration = (result: QueryExplainUpdate) => {
    setResults((prev) => {
      if (!prev.length) {
        return [result as QueryExplainResult];
      }
      const currentIndex = prev.findIndex(
        (r) => r.session_id === result.session_id,
      );
      const clone = [...prev];
      clone[currentIndex] = {
        ...clone[currentIndex],
        ...result,
      } as QueryExplainResult;
      return clone;
    });
  };

  const handleQueryExplainOnload = () => {
    panelLogger.info("handleQueryExplainOnload");
    datapilotDispatch(upsertItem({ ...chat, state: RequestState.LOADING }));
    executeQueryAnalysis({
      sessionId: chat.id,
      command: "queryAnalysis:explain",
      onNewGeneration,
    }).catch((err) =>
      panelLogger.error("error while executing analysis onload", err),
    );
  };

  useEffect(() => {
    if (
      chat.requestType !== RequestTypes.QUERY_ANALYSIS ||
      chat.state !== RequestState.UNINITIALIZED
    ) {
      return;
    }

    // Api request not sent for this chat yet
    handleQueryExplainOnload();
  }, [chat.state, chat.requestType]);

  const values = useMemo(
    () => ({
      state,
      dispatch,
      onNewGeneration,
      results,
    }),
    [state, dispatch, results],
  );

  return (
    <QueryAnalysisContext.Provider value={values}>
      {children}
    </QueryAnalysisContext.Provider>
  );
};

export default QueryAnalysisProvider;
