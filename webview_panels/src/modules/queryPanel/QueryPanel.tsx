import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Stack } from "@uicore";
import HelpButton from "./components/help/HelpButton";
import ClearResultsButton from "./components/clearResultsButton/ClearResultsButton";
import useQueryPanelListeners from "./useQueryPanelListeners";
import QueryPanelTitle from "./components/QueryPanelContents/QueryPanelTitle";
import QueryPanelContent from "./components/QueryPanelContents/QueryPanelContent";
import { useState } from "react";
import classes from "./querypanel.module.scss";

const QueryPanel = (): JSX.Element => {
  const [showCompiledCode, setShowCompiledCode] = useState(false);
  useQueryPanelListeners();
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
          <ClearResultsButton />
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
