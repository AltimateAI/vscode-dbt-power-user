import { QueryBookmark } from "@modules/queryPanel/context/types";

interface Props {
  bookmark: QueryBookmark;
}
const QueryBookmarkRow = ({ bookmark }: Props): JSX.Element => {
  return <div>{bookmark.raw_sql}</div>;
};

export default QueryBookmarkRow;
