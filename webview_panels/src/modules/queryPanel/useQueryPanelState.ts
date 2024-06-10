import { useContext } from "react";
import { QueryPanelContext } from "./QueryPanelProvider";
import { QueryPanelStateProps } from "./context/types";

const useQueryPanelState = (): QueryPanelStateProps & {
  hasData: boolean;
  hasError: boolean;
  hasCode: boolean;
  queryResultsRowCount: number;
} => {
  const { state } = useContext(QueryPanelContext);

  const hasData = Boolean(state.queryResults);
  const hasError = Boolean(state.queryResultsError?.data);
  const hasCode = Boolean(state.compiledCodeMarkup);
  const data = state.queryResults?.data;
  return {
    ...state,
    hasData,
    hasError,
    hasCode,
    queryResultsRowCount: (data as [] | undefined)?.length ?? 0,
  };
};

export default useQueryPanelState;
