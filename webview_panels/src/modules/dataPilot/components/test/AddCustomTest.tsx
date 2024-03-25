import { Stack } from "@uicore";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { useEffect } from "react";
import { RequestState } from "@modules/dataPilot/types";
import DatapilotChatFollowupComponent from "../common/DatapilotChatFollowup";
import {
  updatePackageVersions,
  upsertFollowup,
} from "@modules/dataPilot/dataPilotSlice";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";

const DependentPackages = ["dbt_expectations", "dbt_utils"];

const AddCustomTest = (): JSX.Element | null => {
  const {
    state: { items, currentSessionId },
    dispatch,
  } = useDataPilotContext();

  const chat = currentSessionId ? items[currentSessionId] : undefined;
  const results = chat?.followups ?? [];

  const loadDependentPackageVersions = () => {
    Promise.all(
      DependentPackages.map((packageName) =>
        executeRequestInSync("findPackageVersion", { packageName }),
      ),
    )
      .then(([dbt_expectations_version, dbt_utils_version]) =>
        dispatch(
          updatePackageVersions({
            dbt_utils: dbt_utils_version as string,
            dbt_expectations: dbt_expectations_version as string,
          }),
        ),
      )
      .catch((err) =>
        panelLogger.error("error while loading package version", err),
      );
  };

  useEffect(() => {
    loadDependentPackageVersions();
  }, []);

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
          hideFeedback: true,
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
          hideFeedback={result.hideFeedback}
          skipFollowupQuestions
        />
      ))}
    </Stack>
  );
};

export default AddCustomTest;
