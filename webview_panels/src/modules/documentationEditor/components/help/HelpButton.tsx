import { HelpIcon } from "@assets/icons";
import { Pages } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Drawer } from "@uicore";
import DocumentationHelpContent from "./DocumentationHelpContent";
import TestsHelpContent from "./TestsHelpContent";

const HelpButton = (): JSX.Element => {
  const {
    state: { activePage },
  } = useDocumentationContext();

  return (
    <Drawer
      buttonProps={{ outline: true }}
      buttonText={
        <>
          <HelpIcon /> Help
        </>
      }
      title="Help"
    >
      {activePage === Pages.DOCUMENTATION ? (
        <DocumentationHelpContent />
      ) : (
        <TestsHelpContent />
      )}
    </Drawer>
  );
};

export default HelpButton;
