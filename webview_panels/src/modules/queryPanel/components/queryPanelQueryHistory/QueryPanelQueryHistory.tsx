import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryHistoryRow from "./QueryHistoryRow";

const QueryPanelQueryHistory = (): JSX.Element => {
  const { queryHistory } = useQueryPanelState();
  if (!queryHistory.length) {
    return <div>No query history</div>;
  }
  return (
    <div>
      {queryHistory.map((qh) => (
        <QueryHistoryRow queryHistory={qh} key={qh.timestamp} />
      ))}
    </div>
  );
};

export default QueryPanelQueryHistory;
