import { HelpIcon } from "@assets/icons";
import RightSidePanel from "@modules/panel/RightSidePanel";
import { Button, Stack } from "@uicore";
import { useState } from "react";

const HelpButton = (): JSX.Element => {
  const [showHelpPanel, setShowHelpPanel] = useState(false);

  return (
    <>
      {showHelpPanel ? (
        <RightSidePanel title="Help" onClose={() => setShowHelpPanel(false)}>
          <Stack direction="column">
            <h3>Help popup</h3>
          </Stack>
        </RightSidePanel>
      ) : null}
      <Button outline onClick={() => setShowHelpPanel(true)}>
        <HelpIcon /> Help
      </Button>
    </>
  );
};

export default HelpButton;
