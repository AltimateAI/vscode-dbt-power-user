import { Stack } from "@uicore";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { useEffect } from "react";
import { RequestState } from "@modules/dataPilot/types";
import DatapilotChatFollowupComponent from "../common/DatapilotChatFollowup";
import { upsertFollowup } from "@modules/dataPilot/dataPilotSlice";

const AddCustomTest = (): JSX.Element | null => {
  const {
    state: { items, currentSessionId },
    dispatch,
  } = useDataPilotContext();

  const chat = currentSessionId ? items[currentSessionId] : undefined;
  const results = chat?.followups ?? [];

  useEffect(() => {
    if (!chat?.id || results.length) {
      return;
    }

    const { meta } = chat;
    dispatch(
      upsertFollowup({
        sessionId: chat?.id,
        followup: {
          id: crypto.randomUUID(),
          datapilot_title: " Datapilot response",
          actions: [],
          state: RequestState.COMPLETED,
          user_prompt: `Add Custom Test for column: ${meta?.column as string}`,
          response: `Generate Tests for column “${
            meta?.column as string
          }” in model “${
            meta?.model as string
          }“ \n\r Please provide more information about which tests you need`,
        },
      }),
    );
  }, [chat?.id, results.length]);

  if (!chat) {
    return null;
  }

  return (
    <Stack direction="column">
      {results.map((result, i) => (
        <DatapilotChatFollowupComponent
          key={result.id}
          response={result}
          command="dbttest:create"
          // show followup and ask textbox for last result only
          showFollowup={i === results.length - 1}
          hideFeedback
        />
      ))}
    </Stack>
  );
};

export default AddCustomTest;
