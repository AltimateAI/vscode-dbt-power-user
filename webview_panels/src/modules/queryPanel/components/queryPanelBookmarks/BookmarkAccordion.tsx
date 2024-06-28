import { Accordion, ListGroup, Stack } from "@uicore";
import styles from "../../querypanel.module.scss";
import Filters from "../filters/Filters";
import { NoBookmarksIcon } from "@assets/icons";
import QueryBookmarkRow from "./QueryBookmarkRow";
import { useEffect, useMemo, useState } from "react";
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
}
const BookmarkAccordion = ({ privacy, title, onSelect }: Props) => {
  const [bookmarksResponse, setBookmarksResponse] =
    useState<QueryBookmarkResponse>({
      items: [],
      page: 0,
      pages: 0,
      size: 0,
      total: 0,
    });
  const [filters, setFilters] = useState<{
    tags: string[];
    searchQuery?: string;
  }>({ tags: [], searchQuery: "" });

  useEffect(() => {
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
      });
  }, []);

  const bookmarks = bookmarksResponse.items;
  // TODO: use api to get all tags
  const tags = useMemo(() => {
    return bookmarks.reduce<string[]>((acc, bookmark) => {
      return [...acc, ...bookmark.tags.map((tag) => tag.tag)];
    }, []);
  }, [bookmarks]);

  const onFiltersChange = (data: { tags?: string[]; searchQuery?: string }) => {
    setFilters((prev) => ({ ...prev, ...data }));
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
              searchQuery={filters.searchQuery}
            />
          </header>
        )}
      >
        {() =>
          bookmarks.length === 0 ? (
            <Stack className={styles.noBookmark} direction="column">
              <NoBookmarksIcon />
              <h6>No Bookmarks available</h6>
            </Stack>
          ) : (
            <ListGroup>
              {bookmarks.map((bookmark) => (
                <QueryBookmarkRow
                  bookmark={bookmark}
                  key={bookmark.created_on}
                  onSelect={onSelect}
                />
              ))}
            </ListGroup>
          )
        }
      </Accordion>
    </div>
  );
};

export default BookmarkAccordion;
