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
  const hasError = Boolean(state.queryResultsError?.errorTitle);
  const hasCode = Boolean(state.compiledCodeMarkup);
  return {
    ...state,
    hasData,
    hasError,
    hasCode,
    queryResultsRowCount: (state.queryResults as [] | undefined)?.length ?? 0,
  };
};

export default useQueryPanelState;
