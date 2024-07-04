import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Nav, NavItem, NavLink } from "@uicore";
import { QueryPanelTitleTabState } from "./types";
import { useMemo } from "react";
import { QueryPanelViewType } from "@modules/queryPanel/context/types";
import NewFeatureIndicator from "@modules/newFeature/NewFeatureIndicator";

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
    queryBookmarksEnabled,
    viewType,
  } = useQueryPanelState();

  const toggleTabState = (state: QueryPanelTitleTabState) => {
    setTabState(state);
  };

  const commonTabs = useMemo(
    () =>
      queryBookmarksEnabled && viewType === QueryPanelViewType.DEFAULT ? (
        <>
          <NavItem>
            <NewFeatureIndicator featureKey="query-results-history-clicked">
              <NavLink
                active={QueryPanelTitleTabState.QueryHistory === tabState}
                onClick={() =>
                  toggleTabState(QueryPanelTitleTabState.QueryHistory)
                }
              >
                History
              </NavLink>
            </NewFeatureIndicator>
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
      ) : null,
    [queryBookmarksEnabled, tabState, viewType],
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
