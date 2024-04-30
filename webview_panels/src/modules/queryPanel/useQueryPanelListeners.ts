import { IncomingMessageProps } from "@modules/app/types";
import { useCallback, useEffect, useRef } from "react";
import { useQueryPanelDispatch } from "./QueryPanelProvider";
import {
  resetData,
  setCompiledCodeMarkup,
  setHintIndex,
  setLastHintTimestamp,
  setLimit,
  setLoading,
  setQueryExecutionInfo,
  setQueryResults,
  setQueryResultsError,
} from "./context/queryPanelSlice";
import useQueryPanelState from "./useQueryPanelState";
import { panelLogger } from "@modules/logger";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { HINTS, HINT_VISIBILITY_DELAY } from "./constants";
import { QueryPanelStateProps } from "./context/types";

const useQueryPanelListeners = (): void => {
  const dispatch = useQueryPanelDispatch();
  const { loading, lastHintTimestamp, hintIndex } = useQueryPanelState();
  const lastHintTimestampRef = useRef(0);
  const hintInterval = useRef<NodeJS.Timeout>();
  const queryExecutionTimer = useRef<NodeJS.Timeout>();
  const queryStart = useRef(Date.now());

  useEffect(() => {
    lastHintTimestampRef.current = lastHintTimestamp;
  }, [lastHintTimestamp]);

  const handleHintMessage = useCallback(() => {
    const now = Date.now();
    dispatch(setHintIndex(-1));
    if (lastHintTimestampRef.current + HINT_VISIBILITY_DELAY < now) {
      dispatch(setLastHintTimestamp(now));
      HINTS.sort(() => Math.random() - 0.5);
      executeRequestInAsync("setContext", {
        key: "lastHintTimestamp",
        value: now,
      });
      dispatch(setHintIndex((hintIndex + 1) % HINTS.length));

      hintInterval.current = setInterval(() => {
        dispatch(setHintIndex((hintIndex + 1) % HINTS.length));
      }, 3500);
    }
  }, [dispatch, lastHintTimestampRef.current]);

  const clearData = () => {
    dispatch(resetData());
    queryStart.current = Date.now();
  };

  const endQueryExecutionTimer = () =>
    clearTimeout(queryExecutionTimer.current);

  const handleLoading = useCallback(() => {
    if (loading) {
      return;
    }
    clearData();
    dispatch(setLoading(true));
    queryExecutionTimer.current = setInterval(() => {
      const now = Date.now();
      const elapsedTime = Math.round((now - queryStart.current) / 100) / 10;
      const time = isNaN(elapsedTime) ? 0 : elapsedTime;
      dispatch(setQueryExecutionInfo({ elapsedTime: time }));
    }, 100);
    handleHintMessage();
  }, [loading, dispatch, handleHintMessage]);

  const clearHintInterval = () => {
    clearInterval(hintInterval.current);
    hintInterval.current = undefined;
  };

  const handleError = (args: Record<string, unknown>) => {
    dispatch(
      setQueryResultsError(
        args.error as QueryPanelStateProps["queryResultsError"],
      ),
    );
    dispatch(setCompiledCodeMarkup(args.compiled_sql as string));
    clearHintInterval();
    endQueryExecutionTimer();
  };

  const handleQueryResults = (args: Record<string, unknown>) => {
    dispatch(setLoading(false));
    dispatch(
      setQueryResults({
        data: args.rows,
        columnNames: args.columnNames,
        columnTypes: args.columnTypes,
      } as QueryPanelStateProps["queryResults"]),
    );
    dispatch(setCompiledCodeMarkup(args.compiled_sql as string));
    clearHintInterval();
    endQueryExecutionTimer();
  };

  const handleResetState = () => {
    clearData();
    clearHintInterval();
    endQueryExecutionTimer();
  };

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      panelLogger.info("query panel onMesssage", event.data);
      const { command, ...args } = event.data;
      switch (command) {
        case "renderError":
          handleError(args);
          break;
        case "resetState":
          handleResetState();
          break;
        case "renderQuery":
          handleQueryResults(args);
          break;
        case "renderLoading":
          panelLogger.info(lastHintTimestampRef.current);
          handleLoading();
          break;
        case "getContext":
          // @ts-expect-error valid type
          dispatch(setLastHintTimestamp(args.lastHintTimestamp as number));
          // @ts-expect-error valid type
          dispatch(setLimit(args.limit as number));
          break;
        default:
          break;
      }
    },
    [handleLoading, dispatch],
  );

  useEffect(() => {
    executeRequestInAsync("getQueryPanelContext", {});
  }, []);

  useEffect(() => {
    window.addEventListener("message", onMesssage);

    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, [onMesssage]);
};

export default useQueryPanelListeners;
