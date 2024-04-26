import { Stack } from "@uicore";
import HelpContent from "./components/help/HelpContent";
import QueryLimit from "./components/queryLimit/QueryLimit";
import TableScale from "./components/tableScale/TableScale";

const QueryPanelDefaultView = (): JSX.Element => {
  return (
    <Stack style={{ gap: 30, paddingTop: "1rem" }}>
      <div>
        <QueryLimit />
        <TableScale />
      </div>
      <HelpContent />
    </Stack>
  );
};

export default QueryPanelDefaultView;
