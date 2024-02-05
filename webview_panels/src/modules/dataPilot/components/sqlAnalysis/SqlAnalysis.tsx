import { CodeBlock, Stack } from "@uicore";
import { DatapilotSqlAnalysisChat } from "./types";
import SqlAnalysisActionButton from "./SqlAnalysisActionButton";
import { panelLogger } from "@modules/logger";
import { DataPilotChatAction } from "@modules/dataPilot/types";

interface Props {
  chat: DatapilotSqlAnalysisChat;
}

const SqlAnalysis = ({ chat }: Props): JSX.Element => {
  const onNewGeneration = (result: unknown, action: DataPilotChatAction) => {
    panelLogger.info(result, action);
  };
  return (
    <Stack direction="column">
      <CodeBlock code={chat.code} language="sql" fileName={chat.fileName} />
      <Stack style={{ flexWrap: "wrap" }}>
        {chat.actions?.map((action) => (
          <SqlAnalysisActionButton
            onNewGeneration={(result) => onNewGeneration(result, action)}
            key={action.title?.toString()}
            action={action}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default SqlAnalysis;
