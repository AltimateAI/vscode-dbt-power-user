import DataPilotProvider from "@modules/dataPilot/DataPilotProvider";
import { DataPilotChat } from "@modules/dataPilot/types";
import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import appSlice, { initialState, updateIsComponentsApiInitialized } from "./appSlice";
import { executeRequestInAsync, executeRequestInSync } from "./requestExecutor";
import { ContextProps } from "./types";
import useListeners from "./useListeners";
import { ApiHelper } from "../../lib/altimate-components.js";
import { panelLogger } from "@modules/logger";

export const AppContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
  postMessageToDataPilot: (_data) => null,
  toggleDataPilot: (_open) => null,
});

const AppProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(
    appSlice.reducer,
    appSlice.getInitialState()
  );
  
  useEffect(() => {
    // This overrides the components library api methods
    ApiHelper.get = async (url: string, data?: Record<string, unknown>) =>
      {panelLogger.info("ApiHelper get");return executeRequestInSync("fetch", { endpoint: url, fetchArgs: {...data, method: "GET"} });}
    ApiHelper.post = async (url: string, data?: Record<string, unknown>) =>
      executeRequestInSync("fetch", { endpoint: url, fetchArgs: {...data, method: "POST"} });
      dispatch(updateIsComponentsApiInitialized(true))
    }, []);

  const postMessageToDataPilot = (
    data: Partial<DataPilotChat> & { id: DataPilotChat["id"] }
  ) => {
    executeRequestInAsync("datapilot:message", data);
  };

  const toggleDataPilot = (open: boolean) => {
    executeRequestInAsync("datapilot:toggle", { open });
  };

  useListeners(dispatch);

  const values = useMemo(
    () => ({
      state,
      dispatch,
      postMessageToDataPilot,
      toggleDataPilot,
    }),
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={values}>
      <DataPilotProvider>
        <div className="App">
          {children}
        </div>
      </DataPilotProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
