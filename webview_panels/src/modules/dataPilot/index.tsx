import { useMemo } from "react";
import { List } from "@uicore";
import useDataPilotContext from "./useDataPilotContext";
import { DataPilotChat, RequestTypes } from "./types";
import AiDocChat from "./components/docGen/AiDocChat";
import classes from "./datapilot.module.scss";
import DefaultDatapilotView from "./DefaultDatapilotView";
import QueryAnalysis from "./components/queryAnalysis/QueryAnalysis";
import QueryAnalysisProvider from "./components/queryAnalysis/provider/QueryAnalysisProvider";
import DataPilotHelp from "./DataPilotHelp";

const DataPilotPanel = () => {
  const {
    state: { items, showHelp },
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
      case RequestTypes.QUERY_ANALYSIS:
        return (
          <QueryAnalysisProvider>
            <QueryAnalysis />
          </QueryAnalysisProvider>
        );
      default:
        break;
    }
    return null;
  };

  if (showHelp) {
    return <DataPilotHelp />;
  }

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
