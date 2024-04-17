import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { Stack } from "@uicore";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Pages } from "@modules/documentationEditor/state/types";
import FeedbackButton from "./FeedbackButton";
import HelpButton from "./HelpButton";
import ShowConversationsButton from "@modules/documentationEditor/components/conversation/ShowConversationsButton";

const CommonActionButtons = (): JSX.Element => {
  const {
    state: { selectedPages },
  } = useDocumentationContext();

  return (
    <Stack className="align-items-center text-nowrap">
      <ShowConversationsButton />
      {selectedPages.includes(Pages.DOCUMENTATION) ? (
        <DocGeneratorSettings />
      ) : null}
      <HelpButton />
      <FeedbackButton url="https://docs.google.com/forms/d/e/1FAIpQLSeqFBZX_P4chScTTw8w-reRn2fr7NmeGdy8jISJOPdKEWfLaw/viewform" />
    </Stack>
  );
};

export default CommonActionButtons;
