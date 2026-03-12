import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Stack } from "@uicore";
import HelpButton from "./components/help/HelpButton";
import ClearResultsButton from "./components/clearResultsButton/ClearResultsButton";
import useQueryPanelListeners from "./useQueryPanelListeners";
import QueryPanelTitle from "./components/QueryPanelContents/QueryPanelTitle";
import QueryPanelContent from "./components/QueryPanelContents/QueryPanelContent";
import { useEffect } from "react";
import classes from "./querypanel.module.scss";
import { QueryPanelTitleTabState } from "./components/QueryPanelContents/types";
import useQueryPanelState from "./useQueryPanelState";
import { useQueryPanelDispatch } from "./QueryPanelProvider";
import { setTabState } from "./context/queryPanelSlice";
import ShowInTabButton from "./components/openInTabButton/OpenInTabButton";
import RunAdhocQueryButton from "./components/runAdhocQueryButton/RunAdhocQueryButton";
import { QueryPanelViewType } from "./context/types";
import NewNotebookButton from "./components/runAdhocQueryButton/NewNotebook";
import QueryLimit from "./components/queryLimit/QueryLimit";

const QueryPanel = (): JSX.Element => {
  const { tabState, viewType } = useQueryPanelState();
  const dispatch = useQueryPanelDispatch();
  const { loading } = useQueryPanelListeners();

  useEffect(() => {
    if (loading) {
      dispatch(setTabState(QueryPanelTitleTabState.Preview));
    }
  }, [loading]);

  const changeTabState = (state: QueryPanelTitleTabState) => {
    dispatch(setTabState(state));
  };

  return (
    <div className={classes.queryPanel}>
      <Stack className="mb-2 justify-content-between">
        <Stack direction="column" style={{ flex: 1 }}>
          <QueryPanelTitle tabState={tabState} setTabState={changeTabState} />
        </Stack>
        <Stack>
          {viewType === QueryPanelViewType.DEFAULT && (
            <>
              <QueryLimit />
              <NewNotebookButton />
              <RunAdhocQueryButton />
              <ClearResultsButton />
              <ShowInTabButton />
            </>
          )}
          <HelpButton />
          <FeedbackButton url="https://form.jotform.com/251106305895153" />
        </Stack>
      </Stack>
      <div style={{ flex: 1, maxHeight: "calc(100% - 40px)" }}>
        <QueryPanelContent tabState={tabState} />
      </div>
    </div>
  );
};

export default QueryPanel;
