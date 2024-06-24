import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Nav, NavItem, NavLink } from "@uicore";
import { QueryPanelTitleTabState } from "./types";

const QueryPanelTitle = ({
  setTabState,
  tabState,
}: {
  setTabState: (show: QueryPanelTitleTabState) => void;
  tabState: QueryPanelTitleTabState;
}): JSX.Element => {
  const {
    loading,
    hasData,
    hasError,
    queryExecutionInfo,
    compiledCodeMarkup,
    queryResultsRowCount,
  } = useQueryPanelState();

  const toggleTabState = (state: QueryPanelTitleTabState) => {
    setTabState(state);
  };

  const commonTabs = (
    <>
      <NavItem>
        <NavLink
          active={QueryPanelTitleTabState.QueryHistory === tabState}
          onClick={() => toggleTabState(QueryPanelTitleTabState.QueryHistory)}
        >
          Query history
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          active={QueryPanelTitleTabState.Bookmarks === tabState}
          onClick={() => toggleTabState(QueryPanelTitleTabState.Bookmarks)}
        >
          Bookmarks
        </NavLink>
      </NavItem>
    </>
  );

  if (loading || hasData || hasError) {
    return (
      <Nav>
        <NavItem>
          <NavLink
            active={QueryPanelTitleTabState.Preview === tabState}
            onClick={() => toggleTabState(QueryPanelTitleTabState.Preview)}
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
              active={QueryPanelTitleTabState.Sql === tabState}
              onClick={() => toggleTabState(QueryPanelTitleTabState.Sql)}
            >
              SQL
            </NavLink>
          </NavItem>
        ) : null}
        {commonTabs}
      </Nav>
    );
  }

  return (
    <Nav>
      <NavItem>
        <NavLink
          active={QueryPanelTitleTabState.Preview === tabState}
          onClick={() => toggleTabState(QueryPanelTitleTabState.Preview)}
        >
          Welcome 🚀
        </NavLink>
      </NavItem>
      {commonTabs}
    </Nav>
  );
};

export default QueryPanelTitle;
