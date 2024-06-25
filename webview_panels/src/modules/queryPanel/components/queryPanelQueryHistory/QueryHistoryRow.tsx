import {
  BookmarkIcon,
  DeleteIcon,
  PlayCircleIcon,
  ShareIcon,
} from "@assets/icons";
import { QueryHistory } from "@modules/queryPanel/context/types";
import { IconButton, ListGroupItem } from "@uicore";

interface Props {
  queryHistory: QueryHistory;
  onSelect: (queryHistory: QueryHistory) => void;
}
const QueryHistoryRow = ({ queryHistory, onSelect }: Props): JSX.Element => {
  const handleClick = () => {
    onSelect(queryHistory);
  };

  return (
    <ListGroupItem onClick={handleClick}>
      <div>{queryHistory.rawSql}</div>
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
        <IconButton title="Execute query">
          <PlayCircleIcon />
        </IconButton>
        <IconButton title="Bookmark query">
          <BookmarkIcon />
        </IconButton>
        <IconButton title="Privacy settings">
          <ShareIcon />
        </IconButton>
        <IconButton title="Delete query from history">
          <DeleteIcon />
        </IconButton>
      </div>
    </ListGroupItem>
  );
};

export default QueryHistoryRow;
