import { CodeBlock } from "@uicore";
import PreTag from "@modules/markdown/PreTag";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";

const QueryPanelError = (): JSX.Element => {
  const { queryResultsError } = useQueryPanelState();

  return (
    <div>
      <h3 style={{ color: "var(--action-red" }}>
        {queryResultsError?.message?.split(/\r?\n/)[0] ?? "Error"}
      </h3>
      <h4>
        {queryResultsError?.message?.split(/\r?\n/).slice(1).join(" ") ?? ""}
      </h4>
      <br />
      <details>
        <summary>View Detailed Error 🚨</summary>
        <div style={{ width: "fit-content", maxWidth: "90%" }}>
          <PreTag text={JSON.stringify(queryResultsError, null, 2)}>
            <CodeBlock
              code={JSON.stringify(queryResultsError, null, 2)}
              language="javascript"
            />
          </PreTag>
        </div>
      </details>
    </div>
  );
};

export default QueryPanelError;
