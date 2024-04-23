import { IncomingMessageProps } from "@modules/app/types";
import { useCallback, useEffect } from "react";
import { useQueryPanelDispatch } from "./QueryPanelProvider";
import { resetData, setLoading } from "./context/queryPanelSlice";
import useQueryPanelState from "./useQueryPanelState";
import { panelLogger } from "@modules/logger";

const useListeners = (): void => {
  const dispatch = useQueryPanelDispatch();
  const { loading } = useQueryPanelState();

  const handleLoading = () => {
    if (loading) {
      return;
    }
    dispatch(resetData());
    // this.focusPreviewPane();
    dispatch(setLoading(true));
    // this.timeExecution();
    // const now = Date.now();
    // this.showHint = false;
    // if (this.lastHintTimestamp + HINT_VISIBILITY_DELAY < now) {
    //   this.showHint = true;
    //   this.lastHintTimestamp = now;
    //   HINTS.sort(() => Math.random() - 0.5);
    //   executeCommand("setContext", {
    //     key: "lastHintTimestamp",
    //     value: now,
    //   });
    //   this.updateHintText();
    //   this.hintInterval = setInterval(() => {
    //     this.updateHintText();
    //   }, 3500);
    // }
  };

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      panelLogger.info("query panel onMesssage", command, args);
      switch (command) {
        case "renderLoading":
          handleLoading();
          break;
        default:
          break;
      }
    },
    [],
  );
  useEffect(() => {
    window.addEventListener("message", onMesssage);

    return () => {
      window.removeEventListener("message", onMesssage);
    };
  });
};

export default useListeners;
