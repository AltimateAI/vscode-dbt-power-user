import { CodeBlock, Stack } from "@uicore";
import QueryAnalysisActionButton from "./QueryAnalysisActionButton";
import QueryExplainResultComponent from "./QueryAnalysisResult";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";

const QueryAnalysis = (): JSX.Element => {
  const { chat, results } = useQueryAnalysisContext();

  return (
    <Stack direction="column">
      <CodeBlock code={chat.query} language="sql" fileName={chat.fileName} />
      <Stack style={{ flexWrap: "wrap" }}>
        {chat.actions?.map((action) => (
          <QueryAnalysisActionButton
            key={action.title?.toString()}
            action={action}
          />
        ))}
      </Stack>
      {results.map((result) => (
        <QueryExplainResultComponent
          key={result.session_id}
          response={result}
          command={`queryAnalysis:${chat.analysisType ?? ""}`}
        />
      ))}
    </Stack>
  );
};

export default QueryAnalysis;
