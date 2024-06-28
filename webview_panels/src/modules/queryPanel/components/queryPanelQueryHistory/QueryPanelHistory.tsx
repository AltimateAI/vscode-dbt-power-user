import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryHistoryRow from "./QueryHistoryRow";
import { CodeBlock, IconButton, Label, ListGroup, Stack } from "@uicore";
import styles from "../../querypanel.module.scss";
import { useMemo, useState } from "react";
import { QueryHistory } from "@modules/queryPanel/context/types";
import Filters from "../filters/Filters";
import { ChevronRightIcon, NoBookmarksIcon } from "@assets/icons";

const QueryPanelHistory = (): JSX.Element => {
  const [filters, setFilters] = useState<{
    tags: string[];
    searchQuery?: string;
  }>({ tags: [] });

  const [activeHistory, setActiveHistory] = useState<QueryHistory | null>(null);
  const { queryHistory } = useQueryPanelState();

  const onFiltersChange = (data: { tags?: string[]; searchQuery?: string }) => {
    setFilters((prev) => ({ ...prev, ...data }));
  };

  const onSelect = (qh: QueryHistory) => {
    setActiveHistory(qh);
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

  const resetActiveHistory = () => {
    setActiveHistory(null);
  };

  return (
    <section className={styles.queryTwoCol}>
      <div className={`${styles.limitWidth} ${styles.queryHistoryList}`}>
        <header className="d-flex justify-content-between">
          <h4>History</h4>
          <Filters
            tags={[]}
            onFiltersChange={onFiltersChange}
            searchQuery={filters.searchQuery}
          />
        </header>
        {historyItems.length === 0 ? (
          <Stack className={styles.noBookmark} direction="column">
            <NoBookmarksIcon />
            <div>
              <h6>No history available.</h6>
              <p>
                This section will show queries exectuted in this session. You
                can bookmark your queries from query history.
              </p>
            </div>
          </Stack>
        ) : (
          <ListGroup>
            {historyItems.map((qh) => (
              <QueryHistoryRow
                queryHistory={qh}
                key={qh.timestamp}
                onSelect={onSelect}
              />
            ))}
          </ListGroup>
        )}
      </div>
      {activeHistory ? (
        <div className={styles.historyDetails}>
          <IconButton
            className={styles.closeBtn}
            color="primary"
            onClick={resetActiveHistory}
          >
            <ChevronRightIcon />
          </IconButton>
          <div>
            <Stack>
              <Label>Adapter</Label>
              {activeHistory.adapter}
            </Stack>
            <Stack>
              <Label>Project Name</Label>
              {activeHistory.projectName}
            </Stack>
            <Stack>
              <Label>Time taken</Label>
              {activeHistory.duration}ms
            </Stack>
          </div>
          <CodeBlock
            code={activeHistory.rawSql}
            language="sql"
            fileName="Raw sql"
          />
        </div>
      ) : null}
    </section>
  );
};

export default QueryPanelHistory;
