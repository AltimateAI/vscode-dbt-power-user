import QueryPanelDefaultView from "@modules/queryPanel/QueryPanelDefaultView";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import QueryPanelLoader from "./QueryPanelLoader";
import PerspectiveViewer from "../perspective/PerspectiveViewer";
import QueryPanelError from "./QueryPanelError";
import { CodeBlock } from "@lib";

const QueryPanelContent = ({
  showCompiledCode,
}: {
  showCompiledCode: boolean;
}): JSX.Element => {
  const { loading, hasError, queryResults, compiledCodeMarkup } =
    useQueryPanelState();

  if (showCompiledCode && compiledCodeMarkup) {
    return <CodeBlock code={compiledCodeMarkup} language="sql" />;
  }

  if (loading) {
    return <QueryPanelLoader />;
  }

  if (queryResults) {
    return <PerspectiveViewer data={queryResults} />;
  }

  if (hasError) {
    return <QueryPanelError />;
  }

  return <QueryPanelDefaultView />;
};

export default QueryPanelContent;
