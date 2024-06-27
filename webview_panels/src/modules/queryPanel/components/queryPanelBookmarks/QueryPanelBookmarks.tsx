import styles from "../../querypanel.module.scss";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryBookmarkRow from "./QueryBookmarkRow";
import {
  Accordion,
  ListGroup,
  Stack,
  Drawer,
  DrawerRef,
  CodeBlock,
  Label,
} from "@uicore";
import { useMemo, useRef, useState } from "react";
import Filters from "../filters/Filters";
import { QueryBookmark } from "@modules/queryPanel/context/types";

const QueryPanelBookmarks = (): JSX.Element => {
  const [activeBookmark, setActiveBookmark] = useState<QueryBookmark | null>(
    null,
  );
  const [filters, setFilters] = useState<{
    tags: string[];
    searchQuery?: string;
  }>({ tags: [] });
  const { queryBookmarks } = useQueryPanelState();
  const drawerRef = useRef<DrawerRef | null>(null);

  const onFiltersChange = (data: { tags?: string[]; searchQuery?: string }) => {
    setFilters((prev) => ({ ...prev, ...data }));
  };

  const isMatchingTags = (bookmark: QueryBookmark) => {
    if (!filters.tags.length) {
      return true;
    }
    return filters.tags.every((tag) =>
      bookmark.tags.some((bookmarkTag) => bookmarkTag.tag === tag),
    );
  };

  const isMatchingSeachQuery = (bookmark: QueryBookmark) => {
    if (!filters.searchQuery) {
      return true;
    }
    return bookmark.raw_sql
      .toLowerCase()
      .includes(filters.searchQuery.toLowerCase());
  };

  const isMatchingFilters = (bookmark: QueryBookmark) => {
    return isMatchingTags(bookmark) && isMatchingSeachQuery(bookmark);
  };

  const myBookmarks = useMemo(() => {
    return queryBookmarks.filter(
      (bookmark) =>
        bookmark.privacy === "private" && isMatchingFilters(bookmark),
    );
  }, [queryBookmarks, filters]);

  const tagsInMyBookmarks = useMemo(() => {
    return myBookmarks.reduce<string[]>((acc, bookmark) => {
      return [...acc, ...bookmark.tags.map((tag) => tag.tag)];
    }, []);
  }, [myBookmarks]);

  const sharedBookmarks = useMemo(() => {
    return queryBookmarks.filter(
      (bookmark) =>
        bookmark.privacy === "public" && isMatchingFilters(bookmark),
    );
  }, [queryBookmarks]);

  const tagsInSharedBookmarks = useMemo(() => {
    return sharedBookmarks.reduce<string[]>((acc, bookmark) => {
      return [...acc, ...bookmark.tags.map((tag) => tag.tag)];
    }, []);
  }, [sharedBookmarks]);

  if (!queryBookmarks.length) {
    return <div>No query bookmarks</div>;
  }

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
    drawerRef.current?.open();
    setActiveBookmark(qh);
  };

  const handleClose = () => {
    drawerRef.current?.close();
    setActiveBookmark(null);
  };

  return (
    <div>
      {data.map((item) => (
        <Accordion
          key={item.title}
          defaultOpen={item.open}
          trigger={() => (
            <Stack className="align-items-center justify-content-between">
              <span>
                {item.title} ({item.bookmarks.length})
              </span>
              <Filters tags={item.tags} onFiltersChange={onFiltersChange} />
            </Stack>
          )}
        >
          {() => (
            <ListGroup className={styles.queryHistoryList}>
              {item.bookmarks.map((bookmark) => (
                <QueryBookmarkRow
                  bookmark={bookmark}
                  key={bookmark.created_on}
                  onSelect={onSelect}
                />
              ))}
            </ListGroup>
          )}
        </Accordion>
      ))}
      <Drawer ref={drawerRef} onClose={handleClose}>
        {activeBookmark ? (
          <div className={styles.historyDetails}>
            <h4>{activeBookmark.name}</h4>
            {activeBookmark.raw_sql ? (
              <CodeBlock
                code={activeBookmark.raw_sql}
                language="sql"
                fileName="Raw sql"
              />
            ) : null}
            {activeBookmark.compiled_sql ? (
              <CodeBlock
                code={activeBookmark.compiled_sql}
                language="sql"
                fileName="Raw sql"
              />
            ) : null}
            <div>
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
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default QueryPanelBookmarks;
