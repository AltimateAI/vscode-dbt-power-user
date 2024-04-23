import { CodeBlock } from "@lib";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";

const QueryPanelError = (): JSX.Element => {
  const { queryResultsError } = useQueryPanelState();

  return (
    <div>
      <h3 className="error-title">{queryResultsError?.errorTitle}</h3>
      <h4>{queryResultsError?.errorMessage}</h4>
      <br />
      <details>
        <summary>View Detailed Error 🚨</summary>
        <CodeBlock
          code={queryResultsError?.errorDataMarkup ?? ""}
          language="sql"
        />
      </details>
    </div>
  );
};

export default QueryPanelError;
