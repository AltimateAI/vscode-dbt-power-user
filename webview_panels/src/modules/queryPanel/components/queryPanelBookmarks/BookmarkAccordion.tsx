import { Accordion, ListGroup, Spinner, Stack } from "@uicore";
import styles from "../../querypanel.module.scss";
import Filters, { QueryFilters } from "../filters/Filters";
import { NoBookmarksIcon } from "@assets/icons";
import QueryBookmarkRow from "./QueryBookmarkRow";
import { useEffect, useState } from "react";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import {
  QueryBookmark,
  QueryBookmarkResponse,
} from "@modules/queryPanel/context/types";

interface Props {
  privacy: "public" | "private";
  title: string;
  onSelect: (bookmark: QueryBookmark) => void;
  tags: string[];
}
const BookmarkAccordion = ({
  privacy,
  title,
  onSelect,
  tags,
}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarksResponse, setBookmarksResponse] =
    useState<QueryBookmarkResponse>({
      items: [],
      page: 0,
      pages: 0,
      size: 0,
      total: 0,
    });
  const [filters, setFilters] = useState<QueryFilters>({
    tags: [],
    searchQuery: "",
  });

  useEffect(() => {
    setIsLoading(true);
    executeRequestInSync("fetch", {
      endpoint: `query/bookmark?privacy=${privacy}${filters.tags.map((t) => `tags_list=${t}`).join("&")}&search_query=${filters.searchQuery}`,
      fetchArgs: {
        method: "GET",
      },
    })
      .then((response) => {
        setBookmarksResponse(response as QueryBookmarkResponse);
      })
      .catch((error) => {
        panelLogger.error("Error fetching bookmarks", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters]);

  const bookmarks = bookmarksResponse.items;

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
          <NoBookmarksIcon />
          <div>
            <h6>No bookmarks available.</h6>
            <p>
              This section will show your saved queries. You can bookmark your
              queries from query history.
            </p>
          </div>
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
