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

    if (request.requestType !== RequestTypes.ADD_CUSTOM_TEST) {
      dispatch(upsertItem({ ...request, id }));
    } else {
      const column = request.meta?.column as string;
      const model = request.meta?.model as string;
      dispatch(
        upsertItem({
          ...request,
          id,
          followups: [
            {
              id: crypto.randomUUID(),
              datapilot_title: " Datapilot response",
              actions: [],
              state: RequestState.COMPLETED,
              user_prompt: `Add Custom Test for column: ${column}`,
              response: `Generate Tests for column “${column}” in model “${model}“ \n\r Please provide more information about which tests you need`,
            },
          ],
        }),
      );
    }
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
