import { executeRequestInSync } from "@modules/app/requestExecutor";
import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";
import { panelLogger } from "@modules/logger";
import { Button } from "@uicore";
import { useState } from "react";
import { DataPilotChatAction } from "../types";
import { GeneratedResult } from "./types";

interface Props {
  action: DataPilotChatAction;
  onNewGeneration: (column: GeneratedResult) => void;
}
const AiDocActionButton = ({ action, onNewGeneration }: Props): JSX.Element => {
  const getFollowupInstruction = () => {
    switch (action.title) {
      case "Regenerate":
        return "Regenerate the description";

      default:
        return action.title;
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleBtnClick = async () => {
    panelLogger.info(action, "chat", isLoading);
    setIsLoading(true);
    const result = (await executeRequestInSync("generateDocsForColumn", {
      ...action.data,
      follow_up_instructions: { instruction: getFollowupInstruction() },
    })) as { columns: Partial<DBTDocumentationColumn>[] };
    setIsLoading(false);
    onNewGeneration({
      ...result.columns[0],
      model: action.data.model as string,
      id: crypto.randomUUID(),
      prompt: getFollowupInstruction()?.toString(),
    });
  };
  return (
    <>
      <Button
        key={action.title?.toString()}
        onClick={handleBtnClick}
        disabled={isLoading}
      >
        {action.title}
      </Button>
    </>
  );
};

export default AiDocActionButton;
