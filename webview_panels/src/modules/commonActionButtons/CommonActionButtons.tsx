import { FeedbackIcon, HelpIcon, SettingsIcon } from "@assets/icons";
import { Button, Stack } from "@uicore";
import { executeRequestInAsync } from "../app/requestExecutor";

const CommonActionButtons = (): JSX.Element => {
  const showOldUx = () => {
    executeRequestInAsync("enableNewDocsPanel", { enable: false });
  };

  return (
    <Stack>
      <Button outline onClick={showOldUx}>
        Show old UX
      </Button>
      <Button outline>
        <SettingsIcon /> Settings
      </Button>
      <Button outline>
        <HelpIcon /> Help
      </Button>
      <Button outline>
        <FeedbackIcon /> Feedback
      </Button>
    </Stack>
  );
};

export default CommonActionButtons;
