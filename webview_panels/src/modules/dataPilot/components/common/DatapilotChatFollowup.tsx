import { parse } from "yaml";
import { AltimateIcon } from "@assets/icons";
import ResultFeedbackButtons from "@modules/feedback/ResultFeedbackButtons";
import { Button, Card, CardBody, CardTitle, Stack } from "@uicore";
import classes from "../../datapilot.module.scss";
import {
  Feedback,
  FeedbackRequest,
  FeedbackType,
} from "../../../feedback/types";
import { panelLogger } from "@modules/logger";
import UserQuery from "./UserQuery";
import QueryAnalysisActionButton from "../queryAnalysis/QueryAnalysisActionButton";
import {
  DataPilotChatAction,
  DataPilotChatFollowup,
  RequestState,
  RequestTypes,
} from "@modules/dataPilot/types";
import useQueryAnalysisAction from "../queryAnalysis/useQueryAnalysisAction";
import useQueryAnalysisContext from "../queryAnalysis/provider/useQueryAnalysisContext";
import useAiGenerationUtils from "./useAiGenerationUtils";
import MarkdownRenderer from "@modules/markdown/Renderer";
import AskDatapilotInput from "./AskDatapilotInput";
import { useCallback, useMemo } from "react";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { DatapilotResponseComponents } from "@modules/dataPilot/constants";

interface Props {
  response: DataPilotChatFollowup;
  command: DataPilotChatAction["command"];
  showFollowup: boolean;
  hideFeedback?: boolean;
  skipFollowupQuestions?: boolean;
}
const DatapilotChatFollowupComponent = ({
  response: followup,
  command,
  showFollowup,
  hideFeedback,
  skipFollowupQuestions,
}: Props): JSX.Element => {
  const {
    datapilotTitle,
    response,
    userPrompt,
    actions,
    state,
    id,
    component,
    codeBlockActions,
  } = followup;
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
      skipFollowupQuestions,
    }).catch((err) =>
      panelLogger.error("error while querying by user input", err),
    );
  };

  const getCodeblock = useCallback(() => {
    const regex = /```(.*?)```/gs;
    const matches = response?.match(regex);
    const match = matches?.[0];
    if (!match) {
      return;
    }
    const [type, ...rest] = match.replace(/`/g, "").split("\n");
    return { type, code: rest.join("\n") };
  }, [response]);

  const handleCodeblockAction = async () => {
    const codeblock = getCodeblock();
    if (!codeblock) {
      return;
    }

    if (codeblock.type === "yaml") {
      try {
        const modelData = parse(codeblock.code) as {
          models: [
            { name: string; columns: [{ name: string; tests: unknown[] }] },
          ];
        };

        if (!modelData.models) {
          panelLogger.info("Unable to find right model", codeblock);
          return;
        }
        const tests = modelData.models.find(
          (m) => m.name === chat?.meta?.model,
        );
        panelLogger.log("sending tests data to test panel", tests, chat?.meta);
        executeRequestInAsync("testgen:insert", { tests, ...chat?.meta });

        return;
      } catch (err) {
        panelLogger.error("error while sending test yaml", err);
      }
    }
    await navigator.clipboard.writeText(codeblock.code);
  };

  const codeActions = useMemo(() => {
    if (chat?.requestType === RequestTypes.ADD_CUSTOM_TEST) {
      const codeblockResponse = getCodeblock();
      if (!codeblockResponse) {
        return [];
      }
      return [
        {
          title: codeblockResponse.type === "yaml" ? "Insert" : "Copy",
          onClick: handleCodeblockAction,
        },
      ];
    }
    return codeBlockActions ?? [];
  }, [getCodeblock, chat?.requestType, codeBlockActions]);

  return (
    <>
      <UserQuery query={userPrompt} />

      {state === RequestState.COMPLETED && !response && !component ? null : (
        <li ref={onAiGenerationRender}>
          <Card>
            <CardTitle>
              {" "}
              <AltimateIcon /> {datapilotTitle}
            </CardTitle>
            <CardBody>
              <div className={classes.response}>
                {response ? <MarkdownRenderer response={response} /> : null}
                {component ? (
                  <>{DatapilotResponseComponents[component]}</>
                ) : null}
              </div>
              {state === RequestState.LOADING ? (
                <Stack>
                  <Button color="warning">Loading...</Button>
                </Stack>
              ) : null}
              {!hideFeedback && state === RequestState.COMPLETED ? (
                <Stack className={classes.actionButtons}>
                  <Stack>
                    {codeActions.map((button) => (
                      <Button
                        color="primary"
                        key={button.title}
                        onClick={() => button.onClick(followup, button.title)}
                      >
                        {button.title}
                      </Button>
                    ))}
                  </Stack>
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
