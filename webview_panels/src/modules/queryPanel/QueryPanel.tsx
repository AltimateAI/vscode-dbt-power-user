import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Stack } from "@uicore";
import HelpButton from "./components/help/HelpButton";
import ClearResultsButton from "./components/clearResultsButton/ClearResultsButton";

const QueryPanel = (): JSX.Element => {
  return (
    <div>
      <Stack className="mb-2 justify-content-between">
        <Stack>Query panel</Stack>
        <Stack>
          <ClearResultsButton />
          <HelpButton />
          <FeedbackButton url="https://docs.google.com/forms/d/19wX5b5_xXL6J_Q_GpuWzYddIXbvLxuarv09Y3VRk_EU/viewform" />
        </Stack>
      </Stack>
    </div>
  );
};

export default QueryPanel;
