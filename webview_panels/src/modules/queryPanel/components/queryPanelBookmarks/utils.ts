import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { QueryFilters } from "../filters/Filters";
import { QueryBookmarkResponse } from "@modules/queryPanel/context/types";

export const loadBookmarks = async (
  setIsLoading: (loading: boolean) => void,
  privacy: "public" | "private",
  filters: Partial<QueryFilters>,
): Promise<
  { response: QueryBookmarkResponse; type: "public" | "private" } | undefined
> => {
  setIsLoading(true);
  try {
    panelLogger.info("[loadBookmarks] ", { filters, privacy });
    const response = await executeRequestInSync("fetch", {
      endpoint: `query/bookmark?privacy=${privacy}&${filters.tags?.map((t) => `tags_list=${t}`).join("&")}&search_query=${filters.searchQuery}`,
      fetchArgs: {
        method: "GET",
      },
    });
    return {
      response: response as QueryBookmarkResponse,
      type: privacy,
    };
  } catch (error) {
    panelLogger.error("Failed to load bookmarks", error);
  } finally {
    setIsLoading(false);
  }
};
