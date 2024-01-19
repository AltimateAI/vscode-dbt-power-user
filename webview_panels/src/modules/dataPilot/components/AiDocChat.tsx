import { Button, Card, CardBody, Stack } from "@uicore";
import { DataPilotChat, RequestState } from "../types";

interface Props {
  chat: DataPilotChat;
}
const AiDocChat = ({ chat }: Props) => {
  return (
    <Stack direction="column">
      <h5>{chat.query}</h5>
      {chat.response ? (
        <Card>
          <CardBody>{chat.response}</CardBody>
        </Card>
      ) : null}
      {chat.state === RequestState.LOADING ? <div>Loading...</div> : null}
      <Stack>
        {chat.actions?.map((action) => (
          <Button key={action.title?.toString()}>{action.title}</Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default AiDocChat;
