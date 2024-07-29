import { Accordion, Button, ListGroup, Spinner, Stack } from "@uicore";
import styles from "../../querypanel.module.scss";
import Filters, { QueryFilters } from "../filters/Filters";
import { NoBookmarksIcon } from "@assets/icons";
import QueryBookmarkRow from "./QueryBookmarkRow";
import { useEffect, useMemo, useState } from "react";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { QueryBookmark } from "@modules/queryPanel/context/types";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setQueryBookmarks } from "@modules/queryPanel/context/queryPanelSlice";
import { loadBookmarks } from "./utils";

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
  const { queryBookmarks } = useQueryPanelState();
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
    onFiltersChange({ tags: [], searchQuery: "" });
  };

  const getBookmarks = async (
    showLoading: boolean,
    newFilters?: Partial<QueryFilters>,
  ) => {
    panelLogger.info("[BookmarkAccordion] Loading bookmarks", {
      newFilters,
      filters,
    });
    const response = await loadBookmarks(
      (loading: boolean) => {
        if (showLoading) {
          setIsLoading(loading);
        }
      },
      privacy,
      newFilters ?? filters,
    );

    if (response) {
      dispatch(setQueryBookmarks(response));
    }
  };

  useEffect(() => {
    if (queryBookmarks[privacy]) {
      return;
    }
    void getBookmarks(true);
  }, [queryBookmarks[privacy]]);

  const onFiltersChange = (data: { tags?: string[]; searchQuery?: string }) => {
    setFilters((prev) => ({ ...prev, ...data }));
    setTimeout(() => {
      void getBookmarks(true, data);
    }, 10);
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
                <Button onClick={clearFilters} buttonText="Clear filters" />
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
                    buttonText="+ New query"
                  />
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
            isSharedView={privacy === "public"}
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
