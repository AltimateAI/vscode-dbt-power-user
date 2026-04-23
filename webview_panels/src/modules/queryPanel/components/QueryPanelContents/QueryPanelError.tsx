import { SparkleIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import PreTag from "@modules/markdown/PreTag";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button, CodeBlock, Stack } from "@uicore";

const QueryPanelError = (): JSX.Element => {
  const { queryResultsError, compiledCodeMarkup, activeEditor } =
    useQueryPanelState();

  const handleTroubleshoot = () => {
    executeRequestInAsync("troubleshootWithAltimate", {
      compiledSql: compiledCodeMarkup ?? "",
      rawSql: activeEditor?.query ?? "",
      errorMessage: queryResultsError?.message ?? "",
      fileName: activeEditor?.filepath?.split(/[\\/]/).pop(),
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
      <Stack className="mt-2 mb-2">
        <Button
          outline
          onClick={handleTroubleshoot}
          icon={<SparkleIcon />}
          showTextAlways
        >
          Troubleshoot with Altimate
        </Button>
      </Stack>
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
