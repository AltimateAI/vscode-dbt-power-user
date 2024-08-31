import { Stack } from "@uicore";
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
          <h2>Upcoming Feature Alert: Enhanced Support for dbt SQL Execution in Notebooks</h2>
          <p>We're excited to announce that soon, you'll be able to execute dbt SQL directly within notebooks. This new feature will empower you to create data-driven stories, streamline debugging processes, and optimize your workflows—all within VSCode. Stay tuned for more updates and <a href="https://app.myaltimate.com/contactus">contact us</a> if you would like an early access!</p>          
          <h2>Query History, Bookmarks, and More</h2>
          {/* TODO: get the actual text from Pradnesh */}
          <p>            
            <br />
            Execute any SQL query with the &quot;+ New Query&quot; button. Every
            query you run in the current VSCode session is stored in your query
            history, accessible for later use.
            <br />
            Bookmark your favorite or frequently used queries for easy access
            and share them with your team.
            <br />
            You can also rerun queries directly from your history or bookmarks.
            <br />
            For more information, check out the{" "}
            <a href="https://docs.myaltimate.com/govern/querybookmarks/">
              documentation
            </a>
          </p>
        </div>
        <HelpContent />
      </div>
    </Stack>
  );
};

export default QueryPanelDefaultView;
