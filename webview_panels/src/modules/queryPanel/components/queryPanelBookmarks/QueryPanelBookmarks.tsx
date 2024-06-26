import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryBookmarkRow from "./QueryBookmarkRow";
import { Accordion, ListGroup, Stack } from "@uicore";
import { useMemo, useState } from "react";
import Filters from "../filters/Filters";
import { QueryBookmark } from "@modules/queryPanel/context/types";

const QueryPanelBookmarks = (): JSX.Element => {
  const [filters, setFilters] = useState<{
    tags: string[];
    searchQuery?: string;
  }>({ tags: [] });
  const { queryBookmarks } = useQueryPanelState();

  const onFiltersChange = (data: { tags?: string[]; searchQuery?: string }) => {
    setFilters((prev) => ({ ...prev, ...data }));
  };

  const isMatchingTags = (bookmark: QueryBookmark) => {
    if (!filters.tags.length) {
      return true;
    }
    return filters.tags.every((tag) =>
      bookmark.tags.some((bookmarkTag) => bookmarkTag.tag_name === tag),
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
      return [...acc, ...bookmark.tags.map((tag) => tag.tag_name)];
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
      return [...acc, ...bookmark.tags.map((tag) => tag.tag_name)];
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
  return (
    <div>
      {data.map((item) => (
        <Accordion
          key={item.title}
          defaultOpen={item.open}
          trigger={() => (
            <Stack className="align-items-center justify-content-between">
              <span>
                {item.title} ({myBookmarks.length})
              </span>
              <Filters tags={item.tags} onFiltersChange={onFiltersChange} />
            </Stack>
          )}
        >
          {() => (
            <ListGroup>
              {item.bookmarks.map((bookmark) => (
                <QueryBookmarkRow
                  bookmark={bookmark}
                  key={bookmark.created_on}
                />
              ))}
            </ListGroup>
          )}
        </Accordion>
      ))}
    </div>
  );
};

export default QueryPanelBookmarks;
