import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryHistoryRow from "./QueryHistoryRow";
import { CodeBlock, Drawer, DrawerRef, Label, ListGroup, Stack } from "@uicore";
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
    <section className={styles.queryHistoryList}>
      <header className="d-flex justify-content-between">
        <h4>History</h4>
        <Filters
          tags={[]}
          onFiltersChange={onFiltersChange}
          searchQuery={filters.searchQuery}
        />
      </header>
      <ListGroup>
        {historyItems.map((qh) => (
          <QueryHistoryRow
            queryHistory={qh}
            key={qh.timestamp}
            onSelect={onSelect}
          />
        ))}
      </ListGroup>
      <Drawer ref={drawerRef} onClose={handleClose}>
        <div className={styles.historyDetails}>
          {activeHistory?.rawSql ? (
            <CodeBlock
              code={activeHistory.rawSql}
              language="sql"
              fileName="Raw sql"
            />
          ) : null}
          <div>
            <Stack>
              <Label>Adapter</Label>
              {activeHistory?.adapter}
            </Stack>
            <Stack>
              <Label>Project Name</Label>
              {activeHistory?.projectName}
            </Stack>
            <Stack>
              <Label>Time taken</Label>
              {activeHistory?.duration}ms
            </Stack>
          </div>
        </div>
      </Drawer>
    </section>
  );
};

export default QueryPanelHistory;
