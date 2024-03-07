import { InfoCircleIcon } from "@assets/icons";
import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { Alert, Button, Stack } from "@uicore";
import { executeRequestInAsync } from "../app/requestExecutor";
import { FC, useEffect, useState } from "react";
import FeedbackButton from "./FeedbackButton";
import HelpButton from "./HelpButton";
import HelpContent from "@modules/documentationEditor/components/help/HelpContent";

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
      <InfoCircleIcon style={{ color: "var(--action-yellow)" }} />
      {showInfo && text}
    </Alert>
  );
};

const CommonActionButtons = (): JSX.Element => {
  const showOldUx = () => {
    executeRequestInAsync("enableNewDocsPanel", { enable: false });
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

      <HelpButton>
        <HelpContent />
      </HelpButton>
      <FeedbackButton url="https://docs.google.com/forms/d/e/1FAIpQLSeqFBZX_P4chScTTw8w-reRn2fr7NmeGdy8jISJOPdKEWfLaw/viewform" />
    </Stack>
  );
};

export default CommonActionButtons;
