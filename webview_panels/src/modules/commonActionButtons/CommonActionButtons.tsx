import { FeedbackIcon, HelpIcon, SettingsIcon } from "@assets/icons";
import { Button, Stack } from "@uicore";

const CommonActionButtons = (): JSX.Element => {
  return (
    <Stack>
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
