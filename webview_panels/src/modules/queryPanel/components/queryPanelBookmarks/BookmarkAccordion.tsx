import { Accordion, Button, ListGroup, Spinner, Stack } from "@uicore";
import styles from "../../querypanel.module.scss";
import Filters, { QueryFilters } from "../filters/Filters";
import { NoBookmarksIcon } from "@assets/icons";
import QueryBookmarkRow from "./QueryBookmarkRow";
import { useEffect, useMemo, useState } from "react";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import {
  QueryBookmark,
  QueryBookmarkResponse,
} from "@modules/queryPanel/context/types";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setQueryBookmarks } from "@modules/queryPanel/context/queryPanelSlice";

interface Props {
  privacy: "public" | "private";
  title: string;
  onSelect: (bookmark: QueryBookmark) => void;
  tags: string[];
  bookmarks: QueryBookmark[];
}
const BookmarkAccordion = ({
  privacy,
  title,
  onSelect,
  tags,
  bookmarks,
}: Props): JSX.Element => {
  const { refreshQueryBookmarksTimestamp } = useQueryPanelState();
  const dispatch = useQueryPanelDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<QueryFilters>({
    tags: [],
    searchQuery: "",
  });

  const hasFilters = useMemo(
    () => filters.tags.length > 0 || filters.searchQuery,
    [filters],
  );

  const clearFilters = () => {
    setFilters({ tags: [], searchQuery: "" });
  };

  const loadBookmarks = async (showLoading: boolean) => {
    if (showLoading) {
      setIsLoading(true);
    }
    try {
      const response = await executeRequestInSync("fetch", {
        endpoint: `query/bookmark?privacy=${privacy}&${filters.tags.map((t) => `tags_list=${t}`).join("&")}&search_query=${filters.searchQuery}`,
        fetchArgs: {
          method: "GET",
        },
      });
      dispatch(
        setQueryBookmarks({
          response: response as QueryBookmarkResponse,
          type: privacy,
        }),
      );
    } catch (error) {
      panelLogger.error("Failed to load bookmarks", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadBookmarks(true);
  }, [filters]);

  useEffect(() => {
    if (!refreshQueryBookmarksTimestamp) {
      return;
    }
    void loadBookmarks(false);
  }, [refreshQueryBookmarksTimestamp]);

  const onFiltersChange = (data: { tags?: string[]; searchQuery?: string }) => {
    setFilters((prev) => ({ ...prev, ...data }));
  };

  const getBookmarksContent = () => {
    if (isLoading) {
      return (
        <Stack
          direction="column"
          className="justify-content-center align-items-center p-4 m-4"
        >
          <Spinner />
          Loading...
        </Stack>
      );
    }
    if (bookmarks.length === 0) {
      return (
        <Stack className={styles.noBookmark} direction="column">
          <div className="no-results">
            <NoBookmarksIcon />
          </div>
          {hasFilters ? (
            <div>
              <h6>No results found.</h6>
              <p>
                <Button onClick={clearFilters}>Clear filters</Button>
              </p>
            </div>
          ) : (
            <div>
              <h6>You have not bookmarked any query.</h6>
              <div>
                <h6>Execute your queries and add to bookmark from history</h6>
                <p>Bookmarked queries can be shared with team.</p>
                <p>
                  <Button
                    onClick={() => executeRequestInAsync("runAdhocQuery", {})}
                  >
                    + New query
                  </Button>
                </p>
              </div>
            </div>
          )}
        </Stack>
      );
    }
    return (
      <ListGroup>
        {bookmarks.map((bookmark) => (
          <QueryBookmarkRow
            key={bookmark.id}
            bookmark={bookmark}
            onSelect={onSelect}
          />
        ))}
      </ListGroup>
    );
  };

  return (
    <div className={`mb-4 ${styles.queryHistoryList}`}>
      <Accordion
        defaultOpen
        trigger={() => (
          <header className="d-flex align-items-center justify-content-between">
            <h4>
              {title} ({bookmarks.length})
            </h4>
            <Filters
              tags={tags}
              onFiltersChange={onFiltersChange}
              filters={filters}
            />
          </header>
        )}
      >
        {() => getBookmarksContent()}
      </Accordion>
    </div>
  );
};

export default BookmarkAccordion;
