import DocumentationHelpContent from "@modules/documentationEditor/components/help/DocumentationHelpContent";
import TestsHelpContent from "@modules/documentationEditor/components/help/TestsHelpContent";
import { sendTelemetryEvent } from "@modules/documentationEditor/components/telemetry";
import { Button, ButtonGroup, Drawer, DrawerRef } from "@uicore";
import { useEffect, useRef, useState } from "react";
import { TelemetryEvents } from "@telemetryEvents";

enum Pages {
  DOCUMENTATION,
  TESTS,
}

const HelpButton = (): JSX.Element => {
  const [selectedPage, setSelectedPage] = useState(Pages.DOCUMENTATION);
  const drawerRef = useRef<DrawerRef | null>(null);

  useEffect(() => {
    drawerRef.current?.open();
  }, []);

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
    <Drawer title="Help" onOpen={onOpen} ref={drawerRef}>
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
