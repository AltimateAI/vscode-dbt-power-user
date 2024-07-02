import QueryPanelDefaultView from "@modules/queryPanel/QueryPanelDefaultView";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryPanelLoader from "./QueryPanelLoader";
import PerspectiveViewer from "../perspective/PerspectiveViewer";
import QueryPanelError from "./QueryPanelError";
import { CodeBlock } from "@uicore";
import PreTag from "@modules/markdown/PreTag";
import { QueryPanelTitleTabState } from "./types";
import QueryPanelHistory from "../queryPanelQueryHistory/QueryPanelHistory";
import QueryPanelBookmarks from "../queryPanelBookmarks/QueryPanelBookmarks";

const QueryPanelContent = ({
  tabState,
}: {
  tabState: QueryPanelTitleTabState;
}): JSX.Element | null => {
  const { loading, hasError, queryResults, compiledCodeMarkup } =
    useQueryPanelState();

  if (QueryPanelTitleTabState.Bookmarks === tabState) {
    return <QueryPanelBookmarks />;
  }

  if (QueryPanelTitleTabState.QueryHistory === tabState) {
    return <QueryPanelHistory />;
  }

  if (QueryPanelTitleTabState.Sql === tabState && compiledCodeMarkup) {
    return (
      <div style={{ width: "fit-content" }}>
        <PreTag text={compiledCodeMarkup}>
          <CodeBlock code={compiledCodeMarkup} language="sql" />
        </PreTag>
      </div>
    );
  }

  if (loading) {
    return <QueryPanelLoader />;
  }

  if (queryResults) {
    return (
      <PerspectiveViewer
        data={queryResults.data}
        columnNames={queryResults.columnNames}
        columnTypes={queryResults.columnTypes}
      />
    );
  }

  if (hasError) {
    return <QueryPanelError />;
  }

  return <QueryPanelDefaultView />;
};

export default QueryPanelContent;
