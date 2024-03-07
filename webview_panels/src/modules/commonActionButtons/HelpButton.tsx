import { HelpIcon } from "@assets/icons";
import RightSidePanel from "@modules/panel/RightSidePanel";
import { Button } from "@uicore";
import { ReactNode, useState } from "react";

const HelpButton = ({ children }: { children: ReactNode }): JSX.Element => {
  const [showHelpPanel, setShowHelpPanel] = useState(false);

  return (
    <>
      {showHelpPanel ? (
        <RightSidePanel title="Help" onClose={() => setShowHelpPanel(false)}>
          {children}
        </RightSidePanel>
      ) : null}
      <Button outline onClick={() => setShowHelpPanel(true)}>
        <HelpIcon /> Help
      </Button>
    </>
  );
};

export default HelpButton;
