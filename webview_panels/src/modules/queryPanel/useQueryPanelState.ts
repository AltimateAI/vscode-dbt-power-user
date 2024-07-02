import { useContext } from "react";
import { QueryPanelContext, useQueryPanelDispatch } from "./QueryPanelProvider";
import { QueryBookmark, QueryPanelStateProps } from "./context/types";
import { panelLogger } from "@modules/logger";
import { loadBookmarks } from "./components/queryPanelBookmarks/utils";
import {
  setQueryBookmarks,
  setQueryBookmarksTagsFromDB,
} from "./context/queryPanelSlice";
import { executeRequestInSync } from "@modules/app/requestExecutor";

const useQueryPanelState = (): QueryPanelStateProps & {
  hasData: boolean;
  hasError: boolean;
  hasCode: boolean;
  queryResultsRowCount: number;
  refetchBookmarks: () => void;
  refetchBookmarkTags: () => void;
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

  const refetchBookmarkTags = () => {
    executeRequestInSync("fetch", {
      endpoint: `query/bookmark/tags`,
      fetchArgs: {
        method: "GET",
      },
    })
      .then((response) => {
        dispatch(
          setQueryBookmarksTagsFromDB(response as QueryBookmark["tags"]),
        );
      })
      .catch((error) => {
        panelLogger.error("Error fetching tags", error);
      });
  };

  return {
    ...state,
    hasData,
    hasError,
    hasCode,
    queryResultsRowCount: (data as [] | undefined)?.length ?? 0,
    refetchBookmarks,
    refetchBookmarkTags,
  };
};

export default useQueryPanelState;
