import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { Button, PopoverWithButton, Stack } from "@uicore";
import FeedbackButton from "./FeedbackButton";
import HelpButton from "./HelpButton";
import ShowConversationsButton from "@modules/documentationEditor/components/conversation/ShowConversationsButton";
import { HelpIcon, MoreIcon, SettingsIcon } from "@assets/icons";
import { useState } from "react";

enum SelectedAction {
  SETTINGS,
  HELP,
}
const CommonActionButtons = (): JSX.Element => {
  const [action, setAction] = useState<SelectedAction | undefined>();

  return (
    <Stack className="align-items-center text-nowrap">
      <PopoverWithButton
        width="auto"
        button={<Button outline title="More actions" icon={<MoreIcon />} />}
        popoverProps={{
          placement: "bottom",
          hideArrow: true,
        }}
      >
        {({ close }) => (
          <Stack direction="column">
            <ShowConversationsButton onClose={close} />
            <Button
              outline
              onClick={() => {
                close();
                setAction(SelectedAction.SETTINGS);
              }}
              className="w-100 text-start"
            >
              <SettingsIcon style={{ height: 16 }} /> Settings
            </Button>
            <Button
              outline
              className="w-100 text-start"
              onClick={() => {
                close();
                setAction(SelectedAction.HELP);
              }}
            >
              <HelpIcon style={{ height: 16 }} /> Help
            </Button>
            <FeedbackButton
              onClose={close}
              url="https://form.jotform.com/251106030591141"
              buttonProps={{
                outline: true,
                className: "w-100 text-start",
                showTextAlways: true,
              }}
            />
          </Stack>
        )}
      </PopoverWithButton>

      {action === SelectedAction.SETTINGS ? <DocGeneratorSettings /> : null}
      {action === SelectedAction.HELP ? <HelpButton /> : null}
    </Stack>
  );
};

export default CommonActionButtons;
