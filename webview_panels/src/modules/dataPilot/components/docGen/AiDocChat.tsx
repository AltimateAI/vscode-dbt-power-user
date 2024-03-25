import { upsertFollowup } from "@modules/dataPilot/dataPilotSlice";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { Card, CardBody, Stack } from "@uicore";
import { useCallback } from "react";
import { DataPilotChat, DataPilotChatAction, RequestState } from "../../types";
import AiDocActionButton from "./AiDocActionButton";
import NewGenerationResults from "./NewGenerationResults";
import { EntityType, DocGenFollowup } from "./types";

interface Props {
  chat: DataPilotChat;
}
const AiDocChat = ({ chat }: Props): JSX.Element => {
  const { dispatch } = useDataPilotContext();
  const generatedResults = chat.followups;

  const onNewGeneration = (
    result: DocGenFollowup,
    action: DataPilotChatAction,
  ) => {
    const entityType = chat.meta?.columnName
      ? EntityType.COLUMN
      : EntityType.MODEL;

    const entityName = chat.meta?.columnName ?? action.data.modelName;
    dispatch(
      upsertFollowup({
        sessionId: chat.id,
        followup: {
          ...result,
          datapilot_title: action.datapilot_title,
          user_prompt: action.user_prompt
            .replace("{name}", entityName as string)
            .replace("{type}", entityType),
        },
      }),
    );
  };

  const onAiChatRender = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <Stack direction="column" ref={onAiChatRender}>
      <h5>{chat.query}</h5>
      {chat.response ? (
        <Card>
          <CardBody>{chat.response}</CardBody>
        </Card>
      ) : null}
      {chat.state === RequestState.LOADING ? <div>Loading...</div> : null}
      {generatedResults?.length ? (
        <NewGenerationResults generatedResults={generatedResults} chat={chat} />
      ) : null}
      <Stack style={{ flexWrap: "wrap" }}>
        {chat.actions?.map((action) => (
          <AiDocActionButton
            onNewGeneration={(result) => onNewGeneration(result, action)}
            key={action.title?.toString()}
            action={action}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default AiDocChat;
