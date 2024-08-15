import { HelpIcon } from "@assets/icons";
import { Drawer } from "@uicore";
import HelpContent from "./HelpContent";

const HelpButton = (): JSX.Element => {
  return (
    <Drawer
      buttonProps={{ outline: true }}
      buttonText="Help"
      icon={<HelpIcon />}
      title="Help"
    >
      <HelpContent />
    </Drawer>
  );
};

export default HelpButton;
