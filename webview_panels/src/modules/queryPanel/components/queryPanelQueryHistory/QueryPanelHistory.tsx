import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryHistoryRow from "./QueryHistoryRow";
import {
  CodeBlock,
  IconButton,
  Label,
  ListGroup,
  Stack,
  Button,
} from "@uicore";
import styles from "../../querypanel.module.scss";
import { useEffect, useMemo, useState } from "react";
import { QueryHistory } from "@modules/queryPanel/context/types";
import Filters, { QueryFilters } from "../filters/Filters";
import { ChevronRightIcon, NoHistoryIcon, OpenNewIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import useQueryPanelCommonActions from "@modules/queryPanel/useQueryPanelCommonActions";
import AutoCollapsingNotification from "@modules/AutoCollapsingNotification/AutoCollapsingNotification";

const QueryPanelHistory = (): JSX.Element => {
  const [filters, setFilters] = useState<QueryFilters>({ tags: [] });

  const [activeHistory, setActiveHistory] = useState<QueryHistory | null>(null);
  const { queryHistory, queryBookmarksTagsFromDB } = useQueryPanelState();
  const { refetchBookmarkTags } = useQueryPanelCommonActions();

  useEffect(() => {
    if (queryBookmarksTagsFromDB) {
      return;
    }

    refetchBookmarkTags();
  }, [queryBookmarksTagsFromDB]);

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

  const handleViewResultSet = () => {
    executeRequestInAsync("viewResultSet", {
      queryHistory: activeHistory,
    });
  };

  const handleOpenNewClick = () => {
    executeRequestInAsync("openCodeInEditor", { code: activeHistory?.rawSql });
  };

  return (
    <section className={styles.queryTwoCol}>
      <div className={`${styles.limitWidth} ${styles.queryHistoryList}`}>
        <header className="d-flex justify-content-between">
          <h4 className="d-flex gap-2">
            History
            <span className="p4 font-weight-normal">
              <AutoCollapsingNotification
                delay={10000}
                text="History is maintained solely for the duration of the current session and will be purged upon reloading or restarting VSCode."
              />
            </span>
          </h4>
          <Filters
            tags={[]}
            onFiltersChange={onFiltersChange}
            filters={filters}
          />
        </header>
        {historyItems.length === 0 ? (
          <Stack className={styles.noBookmark} direction="column">
            <div className="no-results">
              <NoHistoryIcon />
            </div>
            <div>
              <h6>Execute your queries to view in history</h6>
              <p>Queries can be bookmarked for sharing with team.</p>
              <p>
                <Button
                  onClick={() => executeRequestInAsync("runAdhocQuery", {})}
                  buttontext="+ New query"
                />
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
            <Stack className="justify-content-end mb-2">
              <Button
                color="primary"
                onClick={handleViewResultSet}
                buttontext="Show results"
              />
            </Stack>
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
            fileName="Code"
            showLineNumbers
            titleActions={
              <span>
                <IconButton title="Open in editor" onClick={handleOpenNewClick}>
                  <OpenNewIcon />
                </IconButton>
              </span>
            }
          />
        </div>
      ) : null}
    </section>
  );
};

export default QueryPanelHistory;
