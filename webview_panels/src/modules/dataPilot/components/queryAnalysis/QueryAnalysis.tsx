import { Alert, Card, CardBody, CardTitle, CodeBlock, Stack } from "@uicore";
import QueryAnalysisActionButton from "./QueryAnalysisActionButton";
import DatapilotChatFollowupComponent from "../common/DatapilotChatFollowup";
import useQueryAnalysisContext, {
  MAX_ALLOWED_FOLLOWUP_QUESTIONS,
} from "./provider/useQueryAnalysisContext";
import DatapilotHeader from "../common/Header";
import { DataPilotChatAction } from "@modules/dataPilot/types";
import { QueryAnalysisCommands } from "./commands";
import { AltimateIcon } from "@assets/icons";
import { QueryAnalysisType } from "./types";

const QUERY_HAPPY_LIMIT = 10;
const DefaultActions = [
  {
    title: "Query explanation",
    command: QueryAnalysisCommands.explain,
  },
  {
    title: "Query change",
    command: QueryAnalysisCommands.modify,
  },
] as DataPilotChatAction[];

const QueryAnalysis = (): JSX.Element | null => {
  const { chat, isMaxFollowupReached } = useQueryAnalysisContext();
  const followups = chat?.followups;

  if (!chat) {
    return null;
  }

  const actions = chat.actions?.length ? chat.actions : DefaultActions;
  const showLineLimitWarning =
    chat.query.split("\n").length > QUERY_HAPPY_LIMIT &&
    chat.analysisType === QueryAnalysisType.MODIFY;

  return (
    <Stack direction="column">
      <DatapilotHeader />

      <CodeBlock code={chat.query} language="sql" fileName={chat.fileName} />
      {showLineLimitWarning ? (
        <Card>
          <CardTitle>
            <AltimateIcon /> Datapilot
          </CardTitle>
          <CardBody>
            Warning: this functionality works better for small code blocks, as
            DataPilot may end up rewriting the entire code that is displayed
            above.
          </CardBody>
        </Card>
      ) : null}

      {/* show actions only if this is start of chat */}
      {followups?.length ? null : (
        <Stack style={{ flexWrap: "wrap" }}>
          {actions.map((action) => (
            <QueryAnalysisActionButton
              key={action.title?.toString()}
              action={action}
            />
          ))}
        </Stack>
      )}
      {followups?.map((result, i) => (
        <DatapilotChatFollowupComponent
          key={result.id}
          response={result}
          command={`queryAnalysis:${chat.analysisType ?? ""}`}
          // show followup and ask textbox for last result only
          showFollowup={i === followups.length - 1}
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
