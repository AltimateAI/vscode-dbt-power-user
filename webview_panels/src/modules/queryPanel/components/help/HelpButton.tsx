import { Drawer, DrawerRef } from "@uicore";
import HelpContent from "./HelpContent";
import { useEffect, useRef } from "react";

const HelpButton = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const drawerRef = useRef<DrawerRef | null>(null);
  useEffect(() => {
    drawerRef.current?.open();
  }, []);

  return (
    <Drawer title="Help" onClose={onClose} ref={drawerRef}>
      <HelpContent />
    </Drawer>
  );
};

export default HelpButton;
