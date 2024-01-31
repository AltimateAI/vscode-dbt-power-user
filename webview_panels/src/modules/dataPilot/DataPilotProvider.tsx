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
  upsertItem,
} from "./dataPilotSlice";
import { ContextProps, DataPilotChat } from "./types";

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
        case "datapilot:reset":
          dispatch(reset());
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
