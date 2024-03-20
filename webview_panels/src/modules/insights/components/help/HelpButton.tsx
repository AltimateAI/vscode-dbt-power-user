import { HelpIcon } from "@assets/icons";
import { Drawer } from "@uicore";
import HelpContent from "./HelpContent";

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
      <HelpContent />
    </Drawer>
  );
};

export default HelpButton;
