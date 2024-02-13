import { Alert, CodeBlock, Stack } from "@uicore";
import QueryAnalysisActionButton from "./QueryAnalysisActionButton";
import QueryAnalysisResultComponent from "./QueryAnalysisResult";
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
  {
    title: "Query change",
    command: "queryAnalysis:modify",
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
      {/* show actions only if this is start of chat */}
      {results.length > 0 ? null : (
        <Stack style={{ flexWrap: "wrap" }}>
          {actions.map((action) => (
            <QueryAnalysisActionButton
              key={action.title?.toString()}
              action={action}
            />
          ))}
        </Stack>
      )}
      {results.map((result, i) => (
        <QueryAnalysisResultComponent
          key={result.session_id}
          response={result}
          command={`queryAnalysis:${chat.analysisType ?? ""}`}
          // show followup and ask textbox for last result only
          showFollowup={i === results.length - 1}
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
