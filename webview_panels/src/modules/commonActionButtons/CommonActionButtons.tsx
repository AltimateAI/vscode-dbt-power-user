import DocGeneratorSettings from "@modules/documentationEditor/components/settings/DocGeneratorSettings";
import { Stack } from "@uicore";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Pages } from "@modules/documentationEditor/state/types";
import FeedbackButton from "./FeedbackButton";
import HelpButton from "./HelpButton";
import ShareDocumentationButton from "./ShareDocumentationButton";

const CommonActionButtons = (): JSX.Element => {
  const {
    state: { selectedPages },
  } = useDocumentationContext();

  return (
    <Stack className="align-items-center text-nowrap">
      {selectedPages.includes(Pages.DOCUMENTATION) ? (
        <DocGeneratorSettings />
      ) : null}
      <ShareDocumentationButton />
      <HelpButton />
      <FeedbackButton url="https://docs.google.com/forms/d/e/1FAIpQLSeqFBZX_P4chScTTw8w-reRn2fr7NmeGdy8jISJOPdKEWfLaw/viewform" />
    </Stack>
  );
};

export default CommonActionButtons;
