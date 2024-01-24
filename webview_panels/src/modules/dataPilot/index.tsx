import { useMemo } from "react";
import { List } from "@uicore";
import useDataPilotContext from "./useDataPilotContext";
import { DataPilotChat, RequestTypes } from "./types";
import AiDocChat from "./components/AiDocChat";
import classes from "./datapilot.module.scss";
import DefaultDatapilotView from "./DefaultDatapilotView";

const DataPilotPanel = () => {
  const {
    state: { items },
  } = useDataPilotContext();

  const chats = useMemo(() => {
    return Object.values(items).sort((a, b) =>
      a.updatedAt && b.updatedAt && a.updatedAt > b.updatedAt ? 1 : -1,
    );
  }, [items]);

  const renderChat = (chat: DataPilotChat) => {
    switch (chat.requestType) {
      case RequestTypes.AI_DOC_GENERATION:
        return <AiDocChat chat={chat} />;
      default:
        break;
    }
    return null;
  };

  if (!chats.length) {
    return <DefaultDatapilotView />;
  }

  return (
    <List className={classes.chatList}>
      {chats.map((chat) => (
        <li key={chat.id}>{renderChat(chat)}</li>
      ))}
    </List>
  );
};

export default DataPilotPanel;
