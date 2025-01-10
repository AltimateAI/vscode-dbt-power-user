import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Button, PopoverWithButton, Stack } from "@uicore";
import HelpButton from "./components/help/HelpButton";
import ClearResultsButton from "./components/clearResultsButton/ClearResultsButton";
import useQueryPanelListeners from "./useQueryPanelListeners";
import QueryPanelTitle from "./components/QueryPanelContents/QueryPanelTitle";
import QueryPanelContent from "./components/QueryPanelContents/QueryPanelContent";
import { useEffect, useState } from "react";
import classes from "./querypanel.module.scss";
import { QueryPanelTitleTabState } from "./components/QueryPanelContents/types";
import useQueryPanelState from "./useQueryPanelState";
import { useQueryPanelDispatch } from "./QueryPanelProvider";
import { setTabState } from "./context/queryPanelSlice";
import ShowInTabButton from "./components/openInTabButton/OpenInTabButton";
import RunAdhocQueryButton from "./components/runAdhocQueryButton/RunAdhocQueryButton";
import { QueryPanelViewType } from "./context/types";
import NewNotebookButton from "./components/runAdhocQueryButton/NewNotebook";
import { HelpIcon, MoreIcon } from "@assets/icons";

const QueryPanel = (): JSX.Element => {
  const { tabState, viewType } = useQueryPanelState();
  const [showHelpPanel, setShowHelpPanel] = useState(false);
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
              <NewNotebookButton />
              <ClearResultsButton />
              <PopoverWithButton
                width="auto"
                button={<Button outline icon={<MoreIcon />} />}
                popoverProps={{
                  placement: "bottom",
                  hideArrow: true,
                }}
              >
                {({ close }) => (
                  <Stack direction="column">
                    <RunAdhocQueryButton onClose={close} />
                    <ShowInTabButton onClose={close} />
                    <Button
                      outline
                      className="w-100 text-start"
                      onClick={() => {
                        close();
                        setShowHelpPanel(true);
                      }}
                    >
                      <HelpIcon style={{ height: 16 }} /> Help
                    </Button>
                    <FeedbackButton
                      buttonProps={{ showTextAlways: true, className: "w-100" }}
                      onClose={close}
                      url="https://docs.google.com/forms/d/19wX5b5_xXL6J_Q_GpuWzYddIXbvLxuarv09Y3VRk_EU/viewform"
                    />
                  </Stack>
                )}
              </PopoverWithButton>
            </>
          )}
        </Stack>
      </Stack>
      <div style={{ flex: 1, maxHeight: "calc(100% - 40px)" }}>
        <QueryPanelContent tabState={tabState} />
      </div>
      {showHelpPanel && <HelpButton onClose={() => setShowHelpPanel(false)} />}
    </div>
  );
};

export default QueryPanel;
