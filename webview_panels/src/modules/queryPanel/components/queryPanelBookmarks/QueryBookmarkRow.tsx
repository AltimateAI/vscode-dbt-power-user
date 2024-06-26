import { QueryBookmark } from "@modules/queryPanel/context/types";
import { ListGroupItem } from "@uicore";
import ExecuteQueryButton from "../queryPanelQueryHistory/ExecuteQueryButton";
import BookmarkPrivacySettingButton from "./BookmarkPrivacySettingButton";

interface Props {
  bookmark: QueryBookmark;
  onSelect: (bookmark: QueryBookmark) => void;
}
const QueryBookmarkRow = ({ bookmark, onSelect }: Props): JSX.Element => {
  return (
    <ListGroupItem>
      <div onClick={() => onSelect(bookmark)}>{bookmark.raw_sql}</div>
      <div>
        <span>
          {new Date(bookmark.created_on).toLocaleString("default", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          {new Date(bookmark.created_on).toLocaleString("default", {
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </span>
        <ExecuteQueryButton query={bookmark.raw_sql} projectName={""} />
        <BookmarkPrivacySettingButton bookmark={bookmark} />
      </div>
    </ListGroupItem>
  );
};

export default QueryBookmarkRow;
