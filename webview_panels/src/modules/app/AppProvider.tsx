import DataPilotProvider from "@modules/dataPilot/DataPilotProvider";
import { DataPilotChat } from "@modules/dataPilot/types";
import { createContext, ReactNode, useMemo, useReducer } from "react";
import appSlice, { initialState } from "./appSlice";
import { executeRequestInAsync } from "./requestExecutor";
import { ContextProps } from "./types";
import useListeners from "./useListeners";

export const AppContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
  postMessageToDataPilot: (_data) => null,
  toggleDataPilot: (_open) => null,
});

const AppProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(
    appSlice.reducer,
    appSlice.getInitialState(),
  );

  const postMessageToDataPilot = (
    data: Partial<DataPilotChat> & { id: DataPilotChat["id"] },
  ) => {
    executeRequestInAsync("datapilot:message", data);
  };

  const toggleDataPilot = (open: boolean) => {
    executeRequestInAsync("datapilot:toggle", { open });
  };

  useListeners();

  const values = useMemo(
    () => ({
      state,
      dispatch,
      postMessageToDataPilot,
      toggleDataPilot,
    }),
    [state, dispatch],
  );

  return (
    <AppContext.Provider value={values}>
      <DataPilotProvider>
        <div className="App">{children}</div>
      </DataPilotProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
