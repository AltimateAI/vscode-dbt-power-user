import { AltimateIcon, AskIcon, RefreshIcon } from "@assets/icons";
import ResultFeedbackButtons from "@modules/documentationEditor/components/result/ResultFeedbackButtons";
import { Button, Card, CardBody, CardTitle, Input, Stack } from "@uicore";
import { QueryExplainResult } from "./types";
import classes from "../../datapilot.module.scss";
import { Feedback } from "../docGen/types";
import { panelLogger } from "@modules/logger";
import UserQuery from "../common/UserQuery";
import QueryAnalysisActionButton from "./QueryAnalysisActionButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { DataPilotChatAction, RequestState } from "@modules/dataPilot/types";
import useQueryAnalysisAction from "./useQueryAnalysisAction";
import useQueryAnalysisContext from "./provider/useQueryAnalysisContext";

interface Props {
  response: QueryExplainResult;
  command: DataPilotChatAction["command"];
}
const QueryExplainResultComponent = ({
  response: { datapilot_title, response, user_prompt, actions, state },
  command,
}: Props): JSX.Element => {
  const {
    chat: { id: sessionId },
    onNewGeneration,
    history,
  } = useQueryAnalysisContext();

  const [userRequest, setUserRequest] = useState("");

  const { executeQueryAnalysis, isLoading } = useQueryAnalysisAction();

  const onFeedbackSubmit = (data: Feedback) => {
    panelLogger.info(data);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    panelLogger.info("submitting user request", userRequest, history);

    executeQueryAnalysis({
      command,
      onNewGeneration,
      sessionId,
      history,
      user_request: userRequest,
    });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserRequest(e.target.value);
  };

  return (
    <>
      <UserQuery query={user_prompt} />

      <Card>
        <CardTitle>
          {" "}
          <AltimateIcon /> {datapilot_title}
        </CardTitle>
        <CardBody>
          {response}
          {state === RequestState.LOADING ? (
            <Stack>
              <Button color="warning">Loading...</Button>
            </Stack>
          ) : null}
          {state === RequestState.COMPLETED ? (
            <Stack className={classes.actionButtons}>
              <Stack>
                <Button color="primary" outline>
                  <RefreshIcon />
                </Button>
              </Stack>
              <ResultFeedbackButtons
                onFeedbackSubmit={(data) => onFeedbackSubmit(data)}
              />
            </Stack>
          ) : null}
        </CardBody>
      </Card>
      {actions?.length ? (
        <Stack direction="column">
          <h6>Suggestions</h6>
          <Stack>
            {actions.map((action) => (
              <QueryAnalysisActionButton key={action.command} action={action} />
            ))}
          </Stack>
        </Stack>
      ) : null}
      {state === RequestState.COMPLETED ? (
        <Stack className={classes.askInput}>
          <form onSubmit={handleSubmit}>
            <Input
              disabled={isLoading}
              type="textarea"
              placeholder="Ask a followup"
              value={userRequest}
              onChange={handleOnChange}
            />
            <Button type="submit" disabled={isLoading}>
              <AskIcon />
            </Button>
          </form>
        </Stack>
      ) : null}
    </>
  );
};

export default QueryExplainResultComponent;
