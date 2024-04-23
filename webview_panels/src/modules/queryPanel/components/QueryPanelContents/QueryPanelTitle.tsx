import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";

const QueryPanelTitle = ({
  setShowCompiledCode,
}: {
  setShowCompiledCode: (show: boolean) => void;
}): JSX.Element => {
  const {
    loading,
    hasData,
    hasError,
    queryExecutionInfo,
    compiledCodeMarkup,
    queryResultsRowCount,
  } = useQueryPanelState();

  if (loading || hasData || hasError) {
    return (
      <div>
        <span onClick={() => setShowCompiledCode(false)}>
          Preview{" "}
          <span>
            {queryResultsRowCount} rows in {queryExecutionInfo?.elapsedTime}s
          </span>
        </span>
        {compiledCodeMarkup ? (
          <span onClick={() => setShowCompiledCode(true)}>SQL</span>
        ) : null}
      </div>
    );
  }

  return <div>Welcome 🚀</div>;
};

export default QueryPanelTitle;
