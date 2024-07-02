import { useContext } from "react";
import { QueryPanelContext, useQueryPanelDispatch } from "./QueryPanelProvider";
import { QueryPanelStateProps } from "./context/types";
import { panelLogger } from "@modules/logger";
import { loadBookmarks } from "./components/queryPanelBookmarks/utils";
import { setQueryBookmarks } from "./context/queryPanelSlice";

const useQueryPanelState = (): QueryPanelStateProps & {
  hasData: boolean;
  hasError: boolean;
  hasCode: boolean;
  queryResultsRowCount: number;
  refetchBookmarks: () => void;
} => {
  const { state } = useContext(QueryPanelContext);
  const dispatch = useQueryPanelDispatch();

  const hasData = Boolean(state.queryResults);
  const hasError = Boolean(state.queryResultsError?.data);
  const hasCode = Boolean(state.compiledCodeMarkup);
  const data = state.queryResults?.data;

  const getBookmarks = async (privacy: "public" | "private") => {
    panelLogger.info("Loading bookmarks");
    const response = await loadBookmarks(
      (_isLoading: boolean) => null,
      privacy,
      { tags: [], searchQuery: "" },
    );

    if (response) {
      dispatch(setQueryBookmarks(response));
    }
  };

  const refetchBookmarks = () => {
    void getBookmarks("private");
    void getBookmarks("public");
  };

  return {
    ...state,
    hasData,
    hasError,
    hasCode,
    queryResultsRowCount: (data as [] | undefined)?.length ?? 0,
    refetchBookmarks,
  };
};

export default useQueryPanelState;
