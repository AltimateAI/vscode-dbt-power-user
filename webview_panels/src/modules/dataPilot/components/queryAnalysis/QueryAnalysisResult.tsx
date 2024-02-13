import { AltimateIcon, AskIcon } from "@assets/icons";
import TextareaAutosize from "react-textarea-autosize";
import ResultFeedbackButtons from "@modules/feedback/ResultFeedbackButtons";
import { Button, Card, CardBody, CardTitle, IconButton, Stack } from "@uicore";
import { QueryAnalysisResult } from "./types";
import classes from "../../datapilot.module.scss";
import {
  Feedback,
  FeedbackRequest,
  FeedbackType,
} from "../../../feedback/types";
import { panelLogger } from "@modules/logger";
import UserQuery from "../common/UserQuery";
import QueryAnalysisActionButton from "./QueryAnalysisActionButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import useQueryAnalysisAction from "./useQueryAnalysisAction";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";
import useAiGenerationUtils from "../common/useAiGenerationUtils";
import MarkdownRenderer from "@modules/markdown/Renderer";

interface Props {
  response: QueryAnalysisResult;
  command: DataPilotChatAction["command"];
  showFollowup: boolean;
}
const QueryAnalysisResultComponent = ({
  response: {
    datapilot_title,
    response,
    user_prompt,
    actions,
    state,
    session_id,
  },
  command,
  showFollowup,
}: Props): JSX.Element => {
  const { chat, results, onNewGeneration, history, isMaxFollowupReached } =
    useQueryAnalysisContext();
  const { onAiGenerationRender } = useAiGenerationUtils();

  const [userRequest, setUserRequest] = useState("");

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
          if (session_id === r.session_id) {
            return { ...feedbackData, ...baseData };
          }
          return baseData;
        }),
      ],
    } as FeedbackRequest;
    return data;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    panelLogger.info("submitting user request", userRequest, history);

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

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserRequest(e.target.value);
  };

  return (
    <>
      <UserQuery query={user_prompt} />

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
            {state === RequestState.COMPLETED ? (
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
      {showFollowup && actions?.length ? (
        <Stack direction="column">
          <p className="p4 mb-0">Suggestions</p>
          <Stack className="flex-wrap">
            {actions.map((action) => (
              <QueryAnalysisActionButton key={action.command} action={action} />
            ))}
          </Stack>
        </Stack>
      ) : null}
      {showFollowup && state === RequestState.COMPLETED ? (
        <Stack className={classes.askInput}>
          <form onSubmit={handleSubmit}>
            <TextareaAutosize
              disabled={isLoading}
              placeholder="Ask a followup"
              value={userRequest}
              onChange={handleOnChange}
              rows={1}
              maxRows={3}
              className="form-control"
            />

            <IconButton
              type="submit"
              disabled={isLoading || isMaxFollowupReached}
            >
              <AskIcon />
            </IconButton>
          </form>
        </Stack>
      ) : null}
    </>
  );
};

export default QueryAnalysisResultComponent;
