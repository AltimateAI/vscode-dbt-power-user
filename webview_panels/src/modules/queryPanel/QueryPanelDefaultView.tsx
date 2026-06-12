import { Stack } from "@uicore";
import HelpContent from "./components/help/HelpContent";

const QueryPanelDefaultView = (): JSX.Element => {
  return (
    <Stack style={{ gap: 30, paddingTop: "1rem" }}>
      <HelpContent />
    </Stack>
  );
};

export default QueryPanelDefaultView;
