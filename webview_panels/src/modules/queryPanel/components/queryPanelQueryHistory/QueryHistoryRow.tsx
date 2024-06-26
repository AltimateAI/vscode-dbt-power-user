import { DeleteIcon } from "@assets/icons";
import { QueryHistory } from "@modules/queryPanel/context/types";
import { IconButton, ListGroupItem } from "@uicore";
import BookmarkButton from "../queryPanelBookmarks/BookmarkButton";
import ExecuteQueryButton from "./ExecuteQueryButton";

interface Props {
  queryHistory: QueryHistory;
  onSelect: (queryHistory: QueryHistory) => void;
}
const QueryHistoryRow = ({ queryHistory, onSelect }: Props): JSX.Element => {
  const handleClick = () => {
    onSelect(queryHistory);
  };

  return (
    <ListGroupItem>
      <div onClick={handleClick}>{queryHistory.rawSql}</div>
      <div>
        <span>
          {new Date(queryHistory.timestamp).toLocaleString("default", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          {new Date(queryHistory.timestamp).toLocaleString("default", {
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </span>
        <ExecuteQueryButton
          query={queryHistory.rawSql}
          projectName={queryHistory.projectName}
        />
        <BookmarkButton queryHistory={queryHistory} />
        <IconButton title="Delete query from history">
          <DeleteIcon />
        </IconButton>
      </div>
    </ListGroupItem>
  );
};

export default QueryHistoryRow;
