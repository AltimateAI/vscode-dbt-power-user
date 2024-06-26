import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryBookmarkRow from "./QueryBookmarkRow";
import { ListGroup } from "@uicore";

const QueryPanelBookmarks = (): JSX.Element => {
  const { queryBookmarks } = useQueryPanelState();
  if (!queryBookmarks.length) {
    return <div>No query bookmarks</div>;
  }
  return (
    <ListGroup>
      {queryBookmarks.map((bookmark) => (
        <QueryBookmarkRow bookmark={bookmark} key={bookmark.created_on} />
      ))}
    </ListGroup>
  );
};

export default QueryPanelBookmarks;
