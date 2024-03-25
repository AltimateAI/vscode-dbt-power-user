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
import { ContextProps, DataPilotChat } from "./types";
import { panelLogger } from "@modules/logger";

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

  const handleIncomingDatapilotMessage = (request: Partial<DataPilotChat>) => {
    panelLogger.info("datapilot incoming message", request);
    const id = request.id ?? crypto.randomUUID();

    dispatch(upsertItem({ ...request, id }));
    dispatch(setCurrentSessionId(id));
  };

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "datapilot:message":
          handleIncomingDatapilotMessage(args as Partial<DataPilotChat>);

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
