import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { Button, Popover, PopoverBody, Stack } from "@uicore";
import FeedbackButton from "./FeedbackButton";
import HelpButton from "./HelpButton";
import ShowConversationsButton from "@modules/documentationEditor/components/conversation/ShowConversationsButton";
import { HelpIcon, MoreIcon, SettingsIcon } from "@assets/icons";
import classes from "../documentationEditor/styles.module.scss";
import { useEffect, useRef, useState } from "react";

enum SelectedAction {
  SETTINGS,
  HELP,
}
const CommonActionButtons = (): JSX.Element => {
  const [action, setAction] = useState<SelectedAction | undefined>();
  const [openPopover, setOpenPopover] = useState(false);

  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenPopover(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setOpenPopover((prev) => !prev);
  };

  return (
    <Stack className="align-items-center text-nowrap">
      <Button
        outline
        onClick={handleClick}
        icon={<MoreIcon />}
        innerRef={ref}
      />

      <Popover
        isOpen={openPopover}
        target={ref}
        placement="bottom"
        hideArrow
        className={classes.popover}
      >
        <PopoverBody>
          <Stack direction="column" className="gap-0">
            <ShowConversationsButton />
            <Button
              color="default"
              onClick={() => setAction(SelectedAction.SETTINGS)}
            >
              <SettingsIcon style={{ height: 16 }} /> Settings
            </Button>
            <Button
              color="default"
              onClick={() => setAction(SelectedAction.HELP)}
            >
              <HelpIcon style={{ height: 16 }} /> Help
            </Button>
            <FeedbackButton url="https://docs.google.com/forms/d/e/1FAIpQLSeqFBZX_P4chScTTw8w-reRn2fr7NmeGdy8jISJOPdKEWfLaw/viewform" />
          </Stack>
        </PopoverBody>
      </Popover>
      {action === SelectedAction.SETTINGS ? <DocGeneratorSettings /> : null}
      {action === SelectedAction.HELP ? <HelpButton /> : null}
    </Stack>
  );
};

export default CommonActionButtons;
