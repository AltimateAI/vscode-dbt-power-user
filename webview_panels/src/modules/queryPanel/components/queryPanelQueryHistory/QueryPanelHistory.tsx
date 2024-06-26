import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryHistoryRow from "./QueryHistoryRow";
import { CodeBlock, Drawer, DrawerRef, ListGroup } from "@uicore";
import styles from "../../querypanel.module.scss";
import { useMemo, useRef, useState } from "react";
import { QueryHistory } from "@modules/queryPanel/context/types";
import Filters from "../filters/Filters";

const QueryPanelHistory = (): JSX.Element => {
  const [filters, setFilters] = useState<{
    tags: string[];
    searchQuery?: string;
  }>({ tags: [] });

  const [activeHistory, setActiveHistory] = useState<QueryHistory | null>(null);
  const { queryHistory } = useQueryPanelState();
  const drawerRef = useRef<DrawerRef | null>(null);

  const onFiltersChange = (data: { tags?: string[]; searchQuery?: string }) => {
    setFilters((prev) => ({ ...prev, ...data }));
  };

  const onSelect = (qh: QueryHistory) => {
    drawerRef.current?.open();
    setActiveHistory(qh);
  };

  const handleClose = () => {
    drawerRef.current?.close();
    setActiveHistory(null);
  };

  const historyItems = useMemo(() => {
    return queryHistory.filter((qh) => {
      if (filters.searchQuery) {
        return qh.rawSql
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());
      }
      return true;
    });
  }, [queryHistory, filters]);

  if (!queryHistory.length) {
    return <div>No query history</div>;
  }
  return (
    <section>
      <header className="d-flex justify-content-between">
        <h4>History</h4>
        <Filters tags={[]} onFiltersChange={onFiltersChange} />
      </header>
      <ListGroup className={styles.queryHistoryList}>
        {historyItems.map((qh) => (
          <QueryHistoryRow
            queryHistory={qh}
            key={qh.timestamp}
            onSelect={onSelect}
          />
        ))}
      </ListGroup>
      <Drawer ref={drawerRef} onClose={handleClose}>
        {activeHistory?.rawSql ? (
          <CodeBlock
            code={activeHistory.rawSql}
            language="sql"
            fileName="Raw sql"
          />
        ) : null}
        {activeHistory?.compiledSql ? (
          <CodeBlock
            code={activeHistory.compiledSql}
            language="sql"
            fileName="Compiled sql"
          />
        ) : null}
        <div>Adapter: {activeHistory?.adapter}</div>
        <div>Project Name: {activeHistory?.projectName}</div>
        <div>Time taken: {activeHistory?.duration}ms</div>
      </Drawer>
    </section>
  );
};

export default QueryPanelHistory;
