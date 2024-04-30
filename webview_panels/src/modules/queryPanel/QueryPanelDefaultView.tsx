import { Stack } from "@uicore";
import HelpContent from "./components/help/HelpContent";
import QueryLimit from "./components/queryLimit/QueryLimit";

const QueryPanelDefaultView = (): JSX.Element => {
  return (
    <Stack style={{ gap: 30, paddingTop: "1rem" }}>
      <div>
        <QueryLimit />
      </div>
      <HelpContent />
    </Stack>
  );
};

export default QueryPanelDefaultView;
