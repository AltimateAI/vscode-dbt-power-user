import { HelpIcon } from "@assets/icons";
import { Drawer } from "@uicore";
import DocumentationHelpContent from "./DocumentationHelpContent";
import TestsHelpContent from "./TestsHelpContent";

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
