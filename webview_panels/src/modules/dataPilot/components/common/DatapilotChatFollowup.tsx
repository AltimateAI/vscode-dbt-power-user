import { AltimateIcon } from "@assets/icons";
import ResultFeedbackButtons from "@modules/feedback/ResultFeedbackButtons";
import { Button, Card, CardBody, CardTitle, Stack } from "@uicore";
import { QueryAnalysisFollowup } from "../queryAnalysis/types";
import classes from "../../datapilot.module.scss";
import {
  Feedback,
  FeedbackRequest,
  FeedbackType,
} from "../../../feedback/types";
import { panelLogger } from "@modules/logger";
import UserQuery from "./UserQuery";
import QueryAnalysisActionButton from "../queryAnalysis/QueryAnalysisActionButton";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import useQueryAnalysisAction from "../queryAnalysis/useQueryAnalysisAction";
import useQueryAnalysisContext from "../queryAnalysis/provider/useQueryAnalysisContext";
import useAiGenerationUtils from "./useAiGenerationUtils";
import MarkdownRenderer from "@modules/markdown/Renderer";
import AskDatapilotInput from "./AskDatapilotInput";

interface Props {
  response: QueryAnalysisFollowup;
  command: DataPilotChatAction["command"];
  showFollowup: boolean;
  hideFeedback?: boolean;
}
const DatapilotChatFollowupComponent = ({
  response: { datapilot_title, response, user_prompt, actions, state, id },
  command,
  showFollowup,
  hideFeedback,
}: Props): JSX.Element => {
  const { chat, onNewGeneration, history, isMaxFollowupReached } =
    useQueryAnalysisContext();
  const results = chat?.followups ?? [];
  const { onAiGenerationRender } = useAiGenerationUtils();

  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();

  const onFeedbackSubmit = (feedbackData: Feedback) => {
    if (!chat) {
      return null;
    }

    const data = {
      requestDetails: chat.meta,
      messageSequence: [
        {
          query: chat.query,
          response: chat.response,
          type: FeedbackType.USER_REQUEST,
        },
        ...results.map((r) => {
          const baseData = {
            response: r.response,
            type: FeedbackType.RESPONSE,
          };
          if (id === r.id) {
            return { ...feedbackData, ...baseData };
          }
          return baseData;
        }),
      ],
    } as FeedbackRequest;
    return data;
  };

  const handleSubmit = (userRequest: string) => {
    executeQueryAnalysis({
      command,
      onNewGeneration,
      sessionId: chat?.id,
      history,
      user_request: userRequest,
    }).catch((err) =>
      panelLogger.error("error while querying by user input", err),
    );
  };

  return (
    <>
      <UserQuery query={user_prompt} />

      {state === RequestState.COMPLETED && !response ? null : (
        <li ref={onAiGenerationRender}>
          <Card>
            <CardTitle>
              {" "}
              <AltimateIcon /> {datapilot_title}
            </CardTitle>
            <CardBody>
              {response ? (
                <div className={classes.response}>
                  <MarkdownRenderer response={response} />
                </div>
              ) : null}
              {state === RequestState.LOADING ? (
                <Stack>
                  <Button color="warning">Loading...</Button>
                </Stack>
              ) : null}
              {!hideFeedback && state === RequestState.COMPLETED ? (
                <Stack className={classes.actionButtons}>
                  <Stack>&nbsp;</Stack>
                  <ResultFeedbackButtons
                    getFeedbackData={(data) => onFeedbackSubmit(data)}
                  />
                </Stack>
              ) : null}
            </CardBody>
          </Card>
        </li>
      )}
      {showFollowup && actions?.length ? (
        <Stack direction="column">
          <p className="p4 mb-0">Followup Suggestions</p>
          <Stack className="flex-wrap">
            {actions.map((action) => (
              <QueryAnalysisActionButton key={action.command} action={action} />
            ))}
          </Stack>
        </Stack>
      ) : null}
      {showFollowup && state === RequestState.COMPLETED ? (
        <AskDatapilotInput
          handleSubmit={handleSubmit}
          disabled={isLoading || isMaxFollowupReached}
          loading={isLoading}
        />
      ) : null}
    </>
  );
};

export default DatapilotChatFollowupComponent;
