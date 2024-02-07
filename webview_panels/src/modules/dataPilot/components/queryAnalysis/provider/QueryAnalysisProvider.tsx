import { createContext, ReactNode, useMemo, useReducer, useState } from "react";
import { QueryAnalysisContextProps } from "./types";
import queryAnalysisSlice, { initialState } from "./queryAnalysisSlice";
import { QueryExplainResult, QueryExplainUpdate } from "../types";
import { panelLogger } from "@modules/logger";

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

  const values = useMemo(
    () => ({
      state,
      dispatch,
      onNewGeneration,
      results,
    }),
    [state, dispatch, results],
  );

  panelLogger.info(results);
  return (
    <QueryAnalysisContext.Provider value={values}>
      {children}
    </QueryAnalysisContext.Provider>
  );
};

export default QueryAnalysisProvider;
