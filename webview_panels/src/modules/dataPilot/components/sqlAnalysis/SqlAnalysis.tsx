import { CodeBlock, Stack } from "@uicore";
import {
  DatapilotSqlAnalysisChat,
  SqlExplainResult,
  SqlExplainUpdate,
} from "./types";
import SqlAnalysisActionButton from "./SqlAnalysisActionButton";
import { panelLogger } from "@modules/logger";
import { DataPilotChatAction } from "@modules/dataPilot/types";
import { useState } from "react";
import SqlExplainResultComponent from "./SqlAnalysisResult";

interface Props {
  chat: DatapilotSqlAnalysisChat;
}

const SqlAnalysis = ({ chat }: Props): JSX.Element => {
  const [results, setResults] = useState<SqlExplainResult[]>([]);
  const onNewGeneration = (
    result: SqlExplainUpdate,
    action: DataPilotChatAction,
  ) => {
    panelLogger.info(result, action);
    setResults((prev) => {
      if (!prev.length) {
        return [result as SqlExplainResult];
      }
      const currentIndex = prev.findIndex((r) => r.id === result.id);
      const clone = [...prev];
      clone[currentIndex] = {
        ...clone[currentIndex],
        ...result,
      } as SqlExplainResult;
      return clone;
    });
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
            analysisType={chat.analysisType}
          />
        ))}
      </Stack>
      {results.map((result) => (
        <SqlExplainResultComponent key={result.id} response={result} />
      ))}
    </Stack>
  );
};

export default SqlAnalysis;
