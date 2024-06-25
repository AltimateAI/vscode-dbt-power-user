import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryHistoryRow from "./QueryHistoryRow";
import { CodeBlock, Drawer, DrawerRef, ListGroup } from "@uicore";
import styles from "../../querypanel.module.scss";
import { useRef, useState } from "react";
import { QueryHistory } from "@modules/queryPanel/context/types";

const QueryPanelQueryHistory = (): JSX.Element => {
  const [activeHistory, setActiveHistory] = useState<QueryHistory | null>(null);
  const { queryHistory } = useQueryPanelState();
  const drawerRef = useRef<DrawerRef | null>(null);

  const onSelect = (qh: QueryHistory) => {
    drawerRef.current?.open();
    setActiveHistory(qh);
  };

  const handleClose = () => {
    drawerRef.current?.close();
    setActiveHistory(null);
  };

  if (!queryHistory.length) {
    return <div>No query history</div>;
  }
  return (
    <>
      <ListGroup className={styles.queryHistoryList}>
        {queryHistory.map((qh) => (
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
    </>
  );
};

export default QueryPanelQueryHistory;
