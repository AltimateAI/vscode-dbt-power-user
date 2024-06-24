import { QueryBookmark } from "@modules/queryPanel/context/types";

interface Props {
  bookmark: QueryBookmark;
}
const QueryBookmarkRow = ({ bookmark }: Props): JSX.Element => {
  return <div>{bookmark.query}</div>;
};

export default QueryBookmarkRow;
