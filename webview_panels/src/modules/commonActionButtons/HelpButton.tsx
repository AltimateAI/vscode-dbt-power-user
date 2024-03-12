import { HelpIcon } from "@assets/icons";
import DocumentationHelpContent from "@modules/documentationEditor/components/help/DocumentationHelpContent";
import TestsHelpContent from "@modules/documentationEditor/components/help/TestsHelpContent";
import { Drawer } from "@uicore";

const HelpButton = (): JSX.Element => {
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
      <DocumentationHelpContent />
      <TestsHelpContent />
    </Drawer>
  );
};

export default HelpButton;
