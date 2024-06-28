import styles from "../../querypanel.module.scss";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryBookmarkRow from "./QueryBookmarkRow";
import {
  Accordion,
  ListGroup,
  Stack,
  CodeBlock,
  Label,
  IconButton,
} from "@uicore";
import { useEffect, useMemo, useState } from "react";
import Filters from "../filters/Filters";
import { QueryBookmark } from "@modules/queryPanel/context/types";
import { ChevronRightIcon, NoBookmarksIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";

const QueryPanelBookmarks = (): JSX.Element => {
  const [activeBookmark, setActiveBookmark] = useState<QueryBookmark | null>(
    null,
  );
  const [filters, setFilters] = useState<{
    tags: string[];
    searchQuery?: string;
  }>({ tags: [] });
  const [filteredBookmarks, setFilteredBookmarks] = useState<QueryBookmark[]>(
    [],
  );
  const { queryBookmarks = [] } = useQueryPanelState();

  const onFiltersChange = (data: { tags?: string[]; searchQuery?: string }) => {
    setFilters((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    if (!filters.tags.length && !filters.searchQuery) {
      setFilteredBookmarks([]);
      return;
    }

    executeRequestInSync("fetch", {
      endpoint: `query/bookmark/list?${filters.tags.map((t) => `tags_list=${t}`).join("&")}&search_query=${filters.searchQuery}`,
      fetchArgs: {
        method: "GET",
      },
    })
      .then((response) => {
        setFilteredBookmarks(response as QueryBookmark[]);
      })
      .catch((error) => {
        panelLogger.error("Error fetching bookmarks", error);
      });
  }, [filters]);

  const myBookmarks = useMemo(() => {
    return (
      filteredBookmarks.length ? filteredBookmarks : queryBookmarks
    ).filter((bookmark) => bookmark.privacy === "private");
  }, [queryBookmarks, filteredBookmarks]);

  const tagsInMyBookmarks = useMemo(() => {
    return myBookmarks.reduce<string[]>((acc, bookmark) => {
      return [...acc, ...bookmark.tags.map((tag) => tag.tag)];
    }, []);
  }, [myBookmarks]);

  const sharedBookmarks = useMemo(() => {
    return (
      filteredBookmarks.length ? filteredBookmarks : queryBookmarks
    ).filter((bookmark) => bookmark.privacy === "public");
  }, [queryBookmarks, filteredBookmarks]);

  const tagsInSharedBookmarks = useMemo(() => {
    return sharedBookmarks.reduce<string[]>((acc, bookmark) => {
      return [...acc, ...bookmark.tags.map((tag) => tag.tag)];
    }, []);
  }, [sharedBookmarks]);

  const data = [
    {
      title: "My Bookmarks",
      bookmarks: myBookmarks,
      open: true,
      tags: tagsInMyBookmarks,
    },
    {
      title: "Shared Bookmarks",
      bookmarks: sharedBookmarks,
      open: false,
      tags: tagsInSharedBookmarks,
    },
  ];

  const onSelect = (qh: QueryBookmark) => {
    setActiveBookmark(qh);
  };

  const resetActiveBookmark = () => {
    setActiveBookmark(null);
  };

  return (
    <section className={styles.queryTwoCol}>
      <Stack direction="column" className={styles.limitWidth}>
        {data.map((item) => (
          <div key={item.title} className={`mb-4 ${styles.queryHistoryList}`}>
            <Accordion
              defaultOpen
              trigger={() => (
                <header className="d-flex align-items-center justify-content-between">
                  <h4>
                    {item.title} ({item.bookmarks.length})
                  </h4>
                  <Filters
                    tags={item.tags}
                    onFiltersChange={onFiltersChange}
                    searchQuery={filters.searchQuery}
                  />
                </header>
              )}
            >
              {() =>
                item.bookmarks.length === 0 ? (
                  <Stack className={styles.noBookmark} direction="column">
                    <NoBookmarksIcon />
                    <h6>No Bookmarks available</h6>
                  </Stack>
                ) : (
                  <ListGroup>
                    {item.bookmarks.map((bookmark) => (
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
        ))}
      </Stack>

      {activeBookmark ? (
        <div className={styles.historyDetails}>
          <IconButton
            className={styles.closeBtn}
            color="primary"
            onClick={resetActiveBookmark}
          >
            <ChevronRightIcon />
          </IconButton>
          <h4>{activeBookmark.name}</h4>
          <div>
            <Stack>
              <Label>Description</Label>
              <span>{activeBookmark.description}</span>
            </Stack>
            <Stack>
              <Label>Tags</Label>
              {activeBookmark.tags.map((t) => t.tag).join(",")}
            </Stack>
            <Stack>
              <Label>Adapter</Label>
              {activeBookmark.adapter_type}
            </Stack>
            <Stack>
              <Label>Privacy</Label>
              {activeBookmark.privacy}ms
            </Stack>
          </div>

          {activeBookmark.raw_sql ? (
            <CodeBlock
              code={activeBookmark.raw_sql}
              language="sql"
              fileName="Raw sql"
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default QueryPanelBookmarks;
