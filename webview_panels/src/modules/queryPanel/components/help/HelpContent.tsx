const HelpContent = (): JSX.Element => {
  return (
    <div>
      <h2>Previewing Query</h2>
      <p>
        Press Cmd+Enter (Mac) or Control+Enter (Windows/Linux) to run a query.
        Highlight part of a query to preview only selection
      </p>
      <h2>Default Query Limit</h2>
      <p>
        Query preview is limited to 500 rows by default, this can be configured
        in Settings -&gt; dbt Power User or via changing the input to the left
        which is synchronized with the VS Code setting
      </p>
      <h2>Dispatched SQL</h2>
      <p>
        This tab displays the compiled query sent to the database. You can copy
        to run directly in your database.
      </p>
    </div>
  );
};

export default HelpContent;
