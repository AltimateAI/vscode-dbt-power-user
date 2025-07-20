import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { loadBookmarks } from "./components/queryPanelBookmarks/utils";
import {
  setQueryBookmarks,
  setQueryBookmarksTagsFromDB,
} from "./context/queryPanelSlice";
import { QueryBookmark } from "./context/types";
import { useQueryPanelDispatch } from "./QueryPanelProvider";

const useQueryPanelCommonActions = (): {
  refetchBookmarks: () => void;
  refetchBookmarkTags: () => void;
} => {
  const dispatch = useQueryPanelDispatch();
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
    refetchBookmarks,
    refetchBookmarkTags,
  };
};

export default useQueryPanelCommonActions;
