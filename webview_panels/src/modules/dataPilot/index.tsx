import { List } from "@uicore";
import useDataPilotContext from "./useDataPilotContext";
import { DataPilotChat, RequestTypes } from "./types";
import AiDocChat from "./components/docGen/AiDocChat";
import classes from "./datapilot.module.scss";
import DefaultDatapilotView from "./DefaultDatapilotView";
import QueryAnalysis from "./components/queryAnalysis/QueryAnalysis";
import QueryAnalysisProvider from "./components/queryAnalysis/provider/QueryAnalysisProvider";
import DataPilotHelp from "./DataPilotHelp";
import AddCustomTest from "./components/test/AddCustomTest";

const DataPilotPanel = (): JSX.Element => {
  const {
    state: { items, showHelp, currentSessionId },
  } = useDataPilotContext();

  const dpChat = currentSessionId ? items[currentSessionId] : undefined;

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
      case RequestTypes.ADD_CUSTOM_TEST:
        return (
          <QueryAnalysisProvider>
            <AddCustomTest />
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

  if (!dpChat) {
    return <DefaultDatapilotView />;
  }

  return (
    <List className={classes.chatList}>
      <li key={dpChat.id}>{renderChat(dpChat)}</li>
    </List>
  );
};

export default DataPilotPanel;
