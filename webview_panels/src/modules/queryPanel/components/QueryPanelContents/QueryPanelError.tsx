import { executeRequestInAsync } from "@modules/app/requestExecutor";
import PreTag from "@modules/markdown/PreTag";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button, CodeBlock } from "@uicore";

const QueryPanelError = (): JSX.Element => {
  const { queryResultsError, compiledCodeMarkup, activeEditor } =
    useQueryPanelState();

  const handleFixWithAltimate = () => {
    const errorText =
      queryResultsError?.message ??
      (queryResultsError
        ? JSON.stringify(queryResultsError, null, 2)
        : "Unknown error");
    const sql = compiledCodeMarkup ?? activeEditor?.query ?? "";
    const fileRef = activeEditor?.filepath
      ? `\`@${activeEditor.filepath}\``
      : "the query I just ran";
    const initialMessage = `My dbt query failed.\n\nError:\n\`\`\`\n${errorText}\n\`\`\`\n\nCompiled SQL from ${fileRef}:\n\`\`\`sql\n${sql}\n\`\`\`\n\nDiagnose the cause and suggest a fix I can apply.`;
    executeRequestInAsync("openAltimateChat", {
      initialMessage,
      title: "Fix query error",
    });
  };

  return (
    <div>
      <h3 style={{ color: "var(--action-red" }}>
        {queryResultsError?.message?.split(/\r?\n/)[0] ?? "Error"}
      </h3>
      <h4>
        {queryResultsError?.message?.split(/\r?\n/).slice(1).join(" ") ?? ""}
      </h4>
      <div style={{ margin: "8px 0" }}>
        <Button
          color="primary"
          onClick={handleFixWithAltimate}
          data-testid="query-error-fix-with-altimate"
        >
          Fix with Altimate
        </Button>
      </div>
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
