import { HelpIcon } from "@assets/icons";
import DocumentationHelpContent from "@modules/documentationEditor/components/help/DocumentationHelpContent";
import TestsHelpContent from "@modules/documentationEditor/components/help/TestsHelpContent";
import { Pages } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Button, ButtonGroup, Drawer } from "@uicore";
import { useState } from "react";

const HelpButton = (): JSX.Element => {
  const {
    state: { testsEnabled },
  } = useDocumentationContext();

  const [selectedPage, setSelectedPage] = useState(Pages.DOCUMENTATION);
  const handleClick = (page: Pages) => {
    setSelectedPage(page);
  };
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
      {testsEnabled ? (
        <ButtonGroup className="mb-2">
          <Button
            color={
              selectedPage === Pages.DOCUMENTATION ? "primary" : "secondary"
            }
            onClick={() => handleClick(Pages.DOCUMENTATION)}
          >
            Documentation
          </Button>
          <Button
            color={selectedPage === Pages.TESTS ? "primary" : "secondary"}
            onClick={() => handleClick(Pages.TESTS)}
          >
            Tests
          </Button>
        </ButtonGroup>
      ) : null}
      {selectedPage === Pages.DOCUMENTATION ? (
        <DocumentationHelpContent />
      ) : null}
      {selectedPage === Pages.TESTS ? <TestsHelpContent /> : null}
    </Drawer>
  );
};

export default HelpButton;
