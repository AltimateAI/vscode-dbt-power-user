import { HelpIcon } from "@assets/icons";
import DocumentationHelpContent from "@modules/documentationEditor/components/help/DocumentationHelpContent";
import TestsHelpContent from "@modules/documentationEditor/components/help/TestsHelpContent";
import { sendTelemetryEvent } from "@modules/documentationEditor/components/telemetry";
import { Pages } from "@modules/documentationEditor/state/types";
import { Button, ButtonGroup, Drawer } from "@uicore";
import { useState } from "react";
import { TelemetryEvents } from "../../../../src/telemetry/events";

const HelpButton = (): JSX.Element => {
  const [selectedPage, setSelectedPage] = useState(Pages.DOCUMENTATION);
  const handleClick = (page: Pages) => {
    setSelectedPage(page);
  };
  const onOpen = () => {
    sendTelemetryEvent(TelemetryEvents["DocumentationEditor/HelpOpen"]);
  };

  const openTest = () => {
    handleClick(Pages.TESTS);
    sendTelemetryEvent(TelemetryEvents["DocumentationEditor/HelpTestsOpen"]);
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
      onOpen={onOpen}
    >
      <ButtonGroup className="mb-2">
        <Button
          color={selectedPage === Pages.DOCUMENTATION ? "primary" : "secondary"}
          onClick={() => handleClick(Pages.DOCUMENTATION)}
        >
          Documentation
        </Button>
        <Button
          color={selectedPage === Pages.TESTS ? "primary" : "secondary"}
          onClick={openTest}
        >
          Tests
        </Button>
      </ButtonGroup>
      {selectedPage === Pages.DOCUMENTATION ? (
        <DocumentationHelpContent />
      ) : null}
      {selectedPage === Pages.TESTS ? <TestsHelpContent /> : null}
    </Drawer>
  );
};

export default HelpButton;
