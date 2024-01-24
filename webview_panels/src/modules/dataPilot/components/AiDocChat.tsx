import { Card, CardBody, Stack } from "@uicore";
import { useState } from "react";
import { DataPilotChat, RequestState } from "../types";
import AiDocActionButton from "./AiDocActionButton";
import NewGenerationResults from "./NewGenerationResults";
import { GeneratedResult } from "./types";

interface Props {
  chat: DataPilotChat;
}
const AiDocChat = ({ chat }: Props): JSX.Element => {
  const [generatedResults, setGeneratedResults] = useState<GeneratedResult[]>(
    [],
  );

  const onNewGeneration = (result: GeneratedResult) => {
    setGeneratedResults((prev) => [...prev, result]);
  };

  return (
    <Stack direction="column">
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
            onNewGeneration={onNewGeneration}
            key={action.title?.toString()}
            action={action}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default AiDocChat;
