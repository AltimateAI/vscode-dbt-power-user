import { FeedbackIcon, InfoCircleIcon } from "@assets/icons";
import HelpButton from "@modules/documentationEditor/components/help/HelpButton";
import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { vscode } from "@modules/vscode";
import { Alert, Button, Stack } from "@uicore";
import { executeRequestInAsync } from "../app/requestExecutor";
import { FC, useEffect, useState } from "react";

const AutoCollapsingNotif: FC<{ text: string; delay: number }> = ({
  text,
  delay,
}) => {
  const [showInfo, setShowInfo] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowInfo(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Alert
      color="warning"
      onClick={() => setShowInfo((prevSetinfo) => !prevSetinfo)}
      className="d-flex align-items-center cursor-pointer gap-sm m-0 p-2"
    >
      <InfoCircleIcon />
      {showInfo && text}
    </Alert>
  );
};

const CommonActionButtons = (): JSX.Element => {
  const showOldUx = () => {
    executeRequestInAsync("enableNewDocsPanel", { enable: false });
  };

  const handleFeedbackClick = () => {
    vscode.postMessage({
      command: "openURL",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSeqFBZX_P4chScTTw8w-reRn2fr7NmeGdy8jISJOPdKEWfLaw/viewform",
    });
  };

  return (
    <Stack className="align-items-center text-nowrap">
      <AutoCollapsingNotif
        text="New language support added! (Check Settings)"
        delay={10000}
      />
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
