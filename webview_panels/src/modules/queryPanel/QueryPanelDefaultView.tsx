import { Alert, Stack } from "@uicore";
import HelpContent from "./components/help/HelpContent";
import QueryLimit from "./components/queryLimit/QueryLimit";

const QueryPanelDefaultView = (): JSX.Element => {
  return (
    <Stack style={{ gap: 30, paddingTop: "1rem" }}>
      <div>
        <QueryLimit />
      </div>
      <div>
        <div>
          <h2>New Features: Query History, Bookmarks, and More</h2>
          <p>
            Execute any SQL query with the &quot;+ New Query&quot; button. Every
            query you run in the current VSCode session is stored in your query
            history, accessible for later use.
            <br />
            Bookmark your favorite or frequently used queries for easy access
            and share them with your team.
            <br />
            You can also rerun queries directly from your history or bookmarks.
          </p>
          <p>
            <Alert color="warning">
              This feature is in private beta. If you are interested, please{" "}
              <a href="https://app.myaltimate.com/contactus">contact us</a> to
              try it out!
            </Alert>
          </p>
        </div>
        <HelpContent />
      </div>
    </Stack>
  );
};

export default QueryPanelDefaultView;
