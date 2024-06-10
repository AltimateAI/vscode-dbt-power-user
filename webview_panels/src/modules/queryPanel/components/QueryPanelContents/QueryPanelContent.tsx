import QueryPanelDefaultView from "@modules/queryPanel/QueryPanelDefaultView";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryPanelLoader from "./QueryPanelLoader";
import PerspectiveViewer from "../perspective/PerspectiveViewer";
import QueryPanelError from "./QueryPanelError";
import { CodeBlock } from "@uicore";
import PreTag from "@modules/markdown/PreTag";

const QueryPanelContent = ({
  showCompiledCode,
}: {
  showCompiledCode: boolean;
}): JSX.Element => {
  const { loading, hasError, queryResults, compiledCodeMarkup } =
    useQueryPanelState();

  if (showCompiledCode && compiledCodeMarkup) {
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
