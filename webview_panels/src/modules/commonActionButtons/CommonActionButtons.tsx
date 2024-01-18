import { FeedbackIcon, HelpIcon } from "@assets/icons";
import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { Button, Stack } from "@uicore";
import { executeRequestInAsync } from "../app/requestExecutor";

const CommonActionButtons = (): JSX.Element => {
  const showOldUx = () => {
    executeRequestInAsync("enableNewDocsPanel", { enable: false });
  };

  return (
    <Stack>
      <Button outline onClick={showOldUx}>
        Show legacy UX
      </Button>
      <DocGeneratorSettings />

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
