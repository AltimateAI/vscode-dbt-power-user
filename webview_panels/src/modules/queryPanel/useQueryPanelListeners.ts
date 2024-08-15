import { IncomingMessageProps } from "@modules/app/types";
import { useCallback, useEffect, useRef } from "react";
import { useQueryPanelDispatch } from "./QueryPanelProvider";
import {
  resetData,
  setCompiledCodeMarkup,
  setHintIndex,
  setLimit,
  setLoading,
  setPerspectiveTheme,
  setQueryBookmarksEnabled,
  setQueryExecutionInfo,
  setQueryHistory,
  setQueryResults,
  setQueryResultsError,
  setViewType,
} from "./context/queryPanelSlice";
import useQueryPanelState from "./useQueryPanelState";
import { panelLogger } from "@modules/logger";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { HINTS } from "./constants";
import {
  QueryHistory,
  QueryPanelStateProps,
  QueryPanelViewType,
} from "./context/types";

const useQueryPanelListeners = (): { loading: boolean } => {
  const dispatch = useQueryPanelDispatch();
  const { loading, hintIndex } = useQueryPanelState();
  const hintInterval = useRef<NodeJS.Timeout>();
  const hintIndexRef = useRef<number>(hintIndex);
  const queryExecutionTimer = useRef<NodeJS.Timeout>();
  const queryStart = useRef(Date.now());

  useEffect(() => {
    hintIndexRef.current = hintIndex;
  }, [hintIndex]);

  const handleHintMessage = useCallback(() => {
    dispatch(setHintIndex(-1));
    HINTS.sort(() => Math.random() - 0.5);
    dispatch(setHintIndex((hintIndexRef.current + 1) % HINTS.length));

    hintInterval.current = setInterval(() => {
      dispatch(setHintIndex((hintIndexRef.current + 1) % HINTS.length));
    }, 3500);
  }, [dispatch, hintIndex]);

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
        raw_sql: args.raw_sql,
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

  const handleIncomingQueryHistory = (args: QueryHistory[]) => {
    dispatch(setQueryHistory(args));
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
          handleLoading();
          break;
        case "queryHistory":
          handleIncomingQueryHistory(args.args.body as QueryHistory[]);
          break;
        case "updateViewType":
          dispatch(
            setViewType(
              (args.args.body as { type: QueryPanelViewType })
                .type as QueryPanelViewType,
            ),
          );
          break;
        case "getContext":
          // @ts-expect-error valid type
          dispatch(setLimit(args.limit as number));
          // @ts-expect-error valid type
          dispatch(setPerspectiveTheme(args.perspectiveTheme as string));
          dispatch(
            // @ts-expect-error valid type
            setQueryBookmarksEnabled(args.queryBookmarksEnabled as boolean),
          );
          break;
        default:
          break;
      }
    },
    [handleLoading, dispatch],
  );

  useEffect(() => {
    void executeRequestInSync("getQueryPanelContext", {});

    void executeRequestInSync("getQueryHistory", {});
  }, []);

  useEffect(() => {
    window.addEventListener("message", onMesssage);

    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, [onMesssage]);

  useEffect(() => {
    void executeRequestInSync("getQueryTabData", {}).then((data) => {
      if (data) {
        const typedData = data as QueryPanelStateProps;
        handleQueryResults({
          rows: typedData?.queryResults?.data,
          columnNames: typedData?.queryResults?.columnNames,
          columnTypes: typedData?.queryResults?.columnTypes,
          compiled_sql: typedData.compiledCodeMarkup,
        });
        dispatch(
          setQueryExecutionInfo({
            elapsedTime: typedData.queryExecutionInfo!.elapsedTime,
          }),
        );
      }
    });
  }, []);

  return { loading };
};

export default useQueryPanelListeners;
