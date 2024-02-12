import { IncomingMessageProps } from "@modules/app/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import dataPilotSlice, {
  initialState,
  reset,
  setCurrentSessionId,
  setShowHelp,
  upsertItem,
} from "./dataPilotSlice";
import {
  ContextProps,
  DataPilotChat,
  RequestState,
  RequestTypes,
} from "./types";
import { panelLogger } from "@modules/logger";
import {
  DatapilotQueryAnalysisChat,
  QueryAnalysisType,
} from "./components/queryAnalysis/types";

export const DataPilotContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const DataPilotProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(
    dataPilotSlice.reducer,
    dataPilotSlice.getInitialState(),
  );

  // Since query analysis provider is not loaded yet, have to insert the item into context in datapilot provider
  const handleQueryAnalysisOnload = (
    request: Partial<DatapilotQueryAnalysisChat>,
    triggerOnLoad: boolean,
  ) => {
    panelLogger.info("query explain onload", request);
    const data = {
      id: crypto.randomUUID(),
      requestType: RequestTypes.QUERY_ANALYSIS,
      state: RequestState.UNINITIALIZED,
      query: request.query,
      fileName: request.fileName,
      //If analysis type is undefined, dont trigger api call
      analysisType: triggerOnLoad ? QueryAnalysisType.EXPLAIN : undefined,
    } as DatapilotQueryAnalysisChat;

    dispatch(upsertItem(data));
    dispatch(setCurrentSessionId(data.id));
  };

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "datapilot:message":
          dispatch(
            upsertItem(
              args as Partial<DataPilotChat> & { id: DataPilotChat["id"] },
            ),
          );
          break;
        case "queryAnalysis:load:explain":
          handleQueryAnalysisOnload(args, true);
          break;
        case "queryAnalysis:load":
          handleQueryAnalysisOnload(args, false);
          break;
        case "datapilot:reset":
          dispatch(reset());
          break;
        case "datapilot:showHelp":
          dispatch(setShowHelp(true));
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
  }, []);

  const values = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <DataPilotContext.Provider value={values}>
      {children}
    </DataPilotContext.Provider>
  );
};

export default DataPilotProvider;
