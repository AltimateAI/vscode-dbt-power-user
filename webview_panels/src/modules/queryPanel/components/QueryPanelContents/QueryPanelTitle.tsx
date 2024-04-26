import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Nav, NavItem, NavLink } from "@uicore";

const QueryPanelTitle = ({
  setShowCompiledCode,
  showCompiledCode,
}: {
  setShowCompiledCode: (show: boolean) => void;
  showCompiledCode: boolean;
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
      <Nav>
        <NavItem>
          <NavLink
            active={!showCompiledCode}
            onClick={() => setShowCompiledCode(false)}
          >
            Preview{" "}
            <span>
              {queryResultsRowCount} rows in {queryExecutionInfo?.elapsedTime}s
            </span>
          </NavLink>
        </NavItem>
        {compiledCodeMarkup ? (
          <NavItem>
            <NavLink
              active={showCompiledCode}
              onClick={() => setShowCompiledCode(true)}
            >
              SQL
            </NavLink>
          </NavItem>
        ) : null}
      </Nav>
    );
  }

  return (
    <Nav>
      <NavItem>
        <NavLink active>Welcome 🚀</NavLink>
      </NavItem>
    </Nav>
  );
};

export default QueryPanelTitle;
