import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Stack } from "@uicore";
import HelpButton from "./components/help/HelpButton";
import ClearResultsButton from "./components/clearResultsButton/ClearResultsButton";
import useQueryPanelListeners from "./useQueryPanelListeners";
import QueryPanelTitle from "./components/QueryPanelContents/QueryPanelTitle";
import QueryPanelContent from "./components/QueryPanelContents/QueryPanelContent";
import { useEffect, useState } from "react";
import classes from "./querypanel.module.scss";
import ShowOldUxButton from "./components/showOldUxButton/ShowOldUxButton";
import ShowInTabButton from "./components/openInTabButton/OpenInTabButton";

const QueryPanel = (): JSX.Element => {
  const [showCompiledCode, setShowCompiledCode] = useState(false);

  const { loading, isPanel } = useQueryPanelListeners();

  useEffect(() => {
    if (loading) {
      setShowCompiledCode(false);
    }
  }, [loading]);

  return (
    <div className={classes.queryPanel}>
      <Stack className="mb-2 justify-content-between">
        <Stack direction="column" style={{ flex: 1 }}>
          <QueryPanelTitle
            setShowCompiledCode={setShowCompiledCode}
            showCompiledCode={showCompiledCode}
          />
        </Stack>
        <Stack>
          {isPanel && (
            <>
              <ShowOldUxButton />
              <ClearResultsButton />
              <ShowInTabButton />
            </>
          )}
          <HelpButton />
          <FeedbackButton url="https://docs.google.com/forms/d/19wX5b5_xXL6J_Q_GpuWzYddIXbvLxuarv09Y3VRk_EU/viewform" />
        </Stack>
      </Stack>
      <div style={{ flex: 1 }}>
        <QueryPanelContent showCompiledCode={showCompiledCode} />
      </div>
    </div>
  );
};

export default QueryPanel;
