import RightSidePanel from "../panel/RightSidePanel";
import useCopilotContext from "./useCopilotContext";
const Copilot = () => {
  const {
    state: { isCopilotOpen },
  } = useCopilotContext();
  if (!isCopilotOpen) {
    return null;
  }
  return (
    <RightSidePanel title="">
      <div>test</div>
    </RightSidePanel>
  );
};

export default Copilot;
