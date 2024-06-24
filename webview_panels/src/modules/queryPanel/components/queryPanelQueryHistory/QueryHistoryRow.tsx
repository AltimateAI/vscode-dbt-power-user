import { QueryHistory } from "@modules/queryPanel/context/types";

interface Props {
  queryHistory: QueryHistory;
}
const QueryHistoryRow = ({ queryHistory }: Props): JSX.Element => {
  return <div>{queryHistory.query}</div>;
};

export default QueryHistoryRow;
