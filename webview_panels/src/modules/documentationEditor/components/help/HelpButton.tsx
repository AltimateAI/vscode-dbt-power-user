import { HelpIcon } from "@assets/icons";
import RightSidePanel from "@modules/panel/RightSidePanel";
import { Button } from "@uicore";
import { useState } from "react";
import HelpContent from "./HelpContent";

const HelpButton = (): JSX.Element => {
  const [showHelpPanel, setShowHelpPanel] = useState(false);

  return (
    <>
      {showHelpPanel ? (
        <RightSidePanel title="Help" onClose={() => setShowHelpPanel(false)}>
          <HelpContent />
        </RightSidePanel>
      ) : null}
      <Button outline onClick={() => setShowHelpPanel(true)}>
        <HelpIcon /> Help
      </Button>
    </>
  );
};

export default HelpButton;
