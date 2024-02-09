import { Alert, CodeBlock, Stack } from "@uicore";
import QueryAnalysisActionButton from "./QueryAnalysisActionButton";
import QueryExplainResultComponent from "./QueryAnalysisResult";
import useQueryAnalysisContext, {
  MAX_ALLOWED_FOLLOWUP_QUESTIONS,
} from "./provider/useQueryAnalysisContext";
import DatapilotHeader from "../common/Header";
import { DataPilotChatAction } from "@modules/dataPilot/types";

const DefaultActions = [
  {
    title: "Query explanation",
    command: "queryAnalysis:explain",
  },
] as DataPilotChatAction[];

const QueryAnalysis = (): JSX.Element | null => {
  const { chat, results, isMaxFollowupReached } = useQueryAnalysisContext();

  if (!chat) {
    return null;
  }

  const actions = chat.actions?.length ? chat.actions : DefaultActions;

  return (
    <Stack direction="column">
      <DatapilotHeader />

      <CodeBlock code={chat.query} language="sql" fileName={chat.fileName} />
      <Stack style={{ flexWrap: "wrap" }}>
        {actions.map((action) => (
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
      {isMaxFollowupReached ? (
        <Alert color="warning">
          Note: Maximum {MAX_ALLOWED_FOLLOWUP_QUESTIONS} followup operations are
          allowed. You have reached the limit, so there are no more followup
          options available.
        </Alert>
      ) : null}
    </Stack>
  );
};

export default QueryAnalysis;
