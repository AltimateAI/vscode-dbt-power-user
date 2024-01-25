import { FeedbackIcon } from "@assets/icons";
import HelpButton from "@modules/documentationEditor/components/help/HelpButton";
import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { vscode } from "@modules/vscode";
import { Button, Stack } from "@uicore";
import { executeRequestInAsync } from "../app/requestExecutor";

const CommonActionButtons = (): JSX.Element => {
  const showOldUx = () => {
    executeRequestInAsync("enableNewDocsPanel", { enable: false });
  };

  const handleFeedbackClick = () => {
    vscode.postMessage({
      command: "openURL",
      url: "https://app.myaltimate.com/contactus",
    });
  };

  return (
    <Stack>
      <Button outline onClick={showOldUx}>
        Show legacy UX
      </Button>
      <DocGeneratorSettings />

      <HelpButton />
      <Button outline onClick={handleFeedbackClick}>
        <FeedbackIcon /> Feedback
      </Button>
    </Stack>
  );
};

export default CommonActionButtons;
