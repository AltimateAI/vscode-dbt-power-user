import { executeRequestInSync } from "@modules/app/requestExecutor";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { Citation, DBTDocumentationColumn } from "@modules/documentationEditor/state/types";
import { panelLogger } from "@modules/logger";
import { Button } from "@uicore";
import { useState } from "react";
import { DataPilotChatAction } from "../../types";
import { DocGenFollowup } from "./types";

interface Props {
  action: DataPilotChatAction;
  onNewGeneration: (column: DocGenFollowup) => void;
}
const AiDocActionButton = ({ action, onNewGeneration }: Props): JSX.Element => {
  const {
    state: { items, currentSessionId },
  } = useDataPilotContext();
  const chat = currentSessionId ? items[currentSessionId] : undefined;
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

    const result = (await executeRequestInSync(action.command, {
      ...action.data,
      follow_up_instructions: { instruction: getFollowupInstruction() },
    })) as
      | { columns: Partial<DBTDocumentationColumn>[] }
      | { model_description: string, model_citations?: Citation[] };

    setIsLoading(false);

    let generatedResult = {
      userPrompt: getFollowupInstruction()?.toString(),
    } as DocGenFollowup;

    if ("columns" in result) {
      generatedResult = {
        ...generatedResult,
        ...result.columns[0],
      };
    }
    if ("model_description" in result) {
      generatedResult = {
        ...generatedResult,
        description: result.model_description,
        citations: result.model_citations,
        model: chat?.meta?.name as string,
      };
    }

    panelLogger.info("generated result", generatedResult);
    onNewGeneration(generatedResult);
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
