import { CodeBlock, Stack } from "@uicore";
import {
  DatapilotQueryAnalysisChat,
  QueryExplainResult,
  QueryExplainUpdate,
} from "./types";
import QueryAnalysisActionButton from "./QueryAnalysisActionButton";
import { panelLogger } from "@modules/logger";
import { DataPilotChatAction } from "@modules/dataPilot/types";
import { useState } from "react";
import QueryExplainResultComponent from "./QueryAnalysisResult";

interface Props {
  chat: DatapilotQueryAnalysisChat;
}

const QueryAnalysis = ({ chat }: Props): JSX.Element => {
  const [results, setResults] = useState<QueryExplainResult[]>([]);
  const onNewGeneration = (
    result: QueryExplainUpdate,
    action: DataPilotChatAction,
  ) => {
    panelLogger.info(result, action);
    setResults((prev) => {
      if (!prev.length) {
        return [result as QueryExplainResult];
      }
      const currentIndex = prev.findIndex((r) => r.id === result.id);
      const clone = [...prev];
      clone[currentIndex] = {
        ...clone[currentIndex],
        ...result,
      } as QueryExplainResult;
      return clone;
    });
  };

  return (
    <Stack direction="column">
      <CodeBlock code={chat.code} language="sql" fileName={chat.fileName} />
      <Stack style={{ flexWrap: "wrap" }}>
        {chat.actions?.map((action) => (
          <QueryAnalysisActionButton
            onNewGeneration={(result) => onNewGeneration(result, action)}
            key={action.title?.toString()}
            action={action}
            analysisType={chat.analysisType}
          />
        ))}
      </Stack>
      {results.map((result) => (
        <QueryExplainResultComponent key={result.id} response={result} />
      ))}
    </Stack>
  );
};

export default QueryAnalysis;
