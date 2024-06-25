import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryBookmarkRow from "./QueryBookmarkRow";

const QueryPanelBookmarks = (): JSX.Element => {
  const { queryBookmarks } = useQueryPanelState();
  if (!queryBookmarks.length) {
    return <div>No query bookmarks</div>;
  }
  return (
    <div>
      {queryBookmarks.map((bookmark) => (
        <QueryBookmarkRow bookmark={bookmark} key={bookmark.created_on} />
      ))}
    </div>
  );
};

export default QueryPanelBookmarks;
