import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Stack } from "@uicore";
import HelpButton from "./components/help/HelpButton";
import ClearResultsButton from "./components/clearResultsButton/ClearResultsButton";
import useQueryPanelListeners from "./useQueryPanelListeners";
import QueryPanelTitle from "./components/QueryPanelContents/QueryPanelTitle";
import QueryPanelContent from "./components/QueryPanelContents/QueryPanelContent";
import { useEffect } from "react";
import classes from "./querypanel.module.scss";
import ShowOldUxButton from "./components/showOldUxButton/ShowOldUxButton";
import { QueryPanelTitleTabState } from "./components/QueryPanelContents/types";
import useQueryPanelState from "./useQueryPanelState";
import { useQueryPanelDispatch } from "./QueryPanelProvider";
import { setTabState } from "./context/queryPanelSlice";

const QueryPanel = (): JSX.Element => {
  const { tabState } = useQueryPanelState();
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
          <ShowOldUxButton />
          <ClearResultsButton />
          <HelpButton />
          <FeedbackButton url="https://docs.google.com/forms/d/19wX5b5_xXL6J_Q_GpuWzYddIXbvLxuarv09Y3VRk_EU/viewform" />
        </Stack>
      </Stack>
      <div style={{ flex: 1 }}>
        <QueryPanelContent tabState={tabState} />
      </div>
    </div>
  );
};

export default QueryPanel;
