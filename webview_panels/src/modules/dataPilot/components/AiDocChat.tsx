import { Card, CardBody, Stack } from "@uicore";
import { useCallback, useState } from "react";
import { DataPilotChat, DataPilotChatAction, RequestState } from "../types";
import AiDocActionButton from "./AiDocActionButton";
import NewGenerationResults from "./NewGenerationResults";
import { EntityType, GeneratedResult } from "./types";

interface Props {
  chat: DataPilotChat;
}
const AiDocChat = ({ chat }: Props): JSX.Element => {
  const [generatedResults, setGeneratedResults] = useState<GeneratedResult[]>(
    [],
  );

  const onNewGeneration = (
    result: GeneratedResult,
    action: DataPilotChatAction,
  ) => {
    const entityType = chat.meta?.columnName
      ? EntityType.COLUMN
      : EntityType.MODEL;

    const entityName = chat.meta?.columnName ?? action.data.modelName;
    setGeneratedResults((prev) => [
      ...prev,
      {
        ...result,
        datapilot_title: action.datapilot_title,
        user_prompt: action.user_prompt
          .replace("{name}", entityName as string)
          .replace("{type}", entityType),
      },
    ]);
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
      <NewGenerationResults generatedResults={generatedResults} chat={chat} />
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
