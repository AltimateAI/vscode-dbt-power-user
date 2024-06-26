import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryBookmarkRow from "./QueryBookmarkRow";
import { Accordion, ListGroup, Stack } from "@uicore";
import { useMemo } from "react";

const QueryPanelBookmarks = (): JSX.Element => {
  const { queryBookmarks } = useQueryPanelState();

  const myBookmarks = useMemo(() => {
    return queryBookmarks.filter((bookmark) => bookmark.privacy === "private");
  }, [queryBookmarks]);

  const sharedBookmarks = useMemo(() => {
    return queryBookmarks.filter((bookmark) => bookmark.privacy === "public");
  }, [queryBookmarks]);

  if (!queryBookmarks.length) {
    return <div>No query bookmarks</div>;
  }

  const data = [
    { title: "My Bookmarks", bookmarks: myBookmarks, open: true },
    { title: "Shared Bookmarks", bookmarks: sharedBookmarks, open: false },
  ];
  return (
    <div>
      {data.map((item) => (
        <Accordion
          key={item.title}
          defaultOpen={item.open}
          trigger={() => (
            <Stack className="align-items-center">
              <div className="lines-1">
                {item.title} ({myBookmarks.length})
              </div>
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
