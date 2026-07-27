import { SparkleIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import CreditsChip from "@modules/commonActionButtons/CreditsChip";
import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Button, Stack } from "@uicore";
import { useEffect } from "react";
import { useQueryPanelDispatch } from "./QueryPanelProvider";
import QueryPanelContent from "./components/QueryPanelContents/QueryPanelContent";
import QueryPanelTitle from "./components/QueryPanelContents/QueryPanelTitle";
import { QueryPanelTitleTabState } from "./components/QueryPanelContents/types";
import ClearResultsButton from "./components/clearResultsButton/ClearResultsButton";
import HelpButton from "./components/help/HelpButton";
import ShowInTabButton from "./components/openInTabButton/OpenInTabButton";
import OptimizeWarehouseButton from "./components/optimizeWarehouseButton/OptimizeWarehouseButton";
import QueryLimit from "./components/queryLimit/QueryLimit";
import NewNotebookButton from "./components/runAdhocQueryButton/NewNotebook";
import RunAdhocQueryButton from "./components/runAdhocQueryButton/RunAdhocQueryButton";
import { setTabState } from "./context/queryPanelSlice";
import { QueryPanelViewType } from "./context/types";
import classes from "./querypanel.module.scss";
import useQueryPanelListeners from "./useQueryPanelListeners";
import useQueryPanelState from "./useQueryPanelState";

const QueryPanel = (): JSX.Element => {
  const { tabState, viewType, hasData, compiledCodeMarkup, activeEditor } =
    useQueryPanelState();
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
        <Stack className={classes.toolbar}>
          {viewType === QueryPanelViewType.DEFAULT && (
            <>
              <QueryLimit />
              {hasData && (
                <Button
                  color="primary"
                  icon={<SparkleIcon />}
                  showTextAlways
                  onClick={() =>
                    executeRequestInAsync("profileQueryWithAltimate", {
                      compiledSql: compiledCodeMarkup ?? "",
                      rawSql: activeEditor?.query ?? "",
                      fileName: activeEditor?.filepath?.split(/[/\\]/).pop(),
                    })
                  }
                >
                  Profile Query
                </Button>
              )}
              <OptimizeWarehouseButton />
              <NewNotebookButton />
              <RunAdhocQueryButton />
              <ShowInTabButton />
              <ClearResultsButton />
            </>
          )}
          <CreditsChip />
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
