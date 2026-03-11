import { Button } from "@altimateai/lego";
import { HelpIcon } from "@assets/icons";
import { Drawer, DrawerRef } from "@uicore";
import { useRef } from "react";
import HelpContent from "./HelpContent";

const HelpButton = (): JSX.Element => {
  const drawerRef = useRef<DrawerRef>(null);

  return (
    <div className="al-tw-scope">
      <Button
        variant="default"
        size="xs"
        onClick={() => drawerRef.current?.open()}
      >
        <HelpIcon /> Help
      </Button>
      <Drawer ref={drawerRef} title="Help">
        <HelpContent />
      </Drawer>
    </div>
  );
};

export default HelpButton;
