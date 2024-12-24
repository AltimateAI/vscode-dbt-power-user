import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { Stack } from "@uicore";
import FeedbackButton from "./FeedbackButton";
import HelpButton from "./HelpButton";
import ShowConversationsButton from "@modules/documentationEditor/components/conversation/ShowConversationsButton";

const CommonActionButtons = (): JSX.Element => {
  return (
    <Stack className="align-items-center text-nowrap">
      <ShowConversationsButton />
      <DocGeneratorSettings />
      <HelpButton />
      <FeedbackButton url="https://docs.google.com/forms/d/e/1FAIpQLSeqFBZX_P4chScTTw8w-reRn2fr7NmeGdy8jISJOPdKEWfLaw/viewform" />
    </Stack>
  );
};

export default CommonActionButtons;
