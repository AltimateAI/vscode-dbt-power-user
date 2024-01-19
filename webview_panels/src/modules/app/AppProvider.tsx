import CopilotProvider from "@modules/copilot/CopilotProvider";
import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
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

  const postMessageToDataPilot = (data: Record<string, unknown>) => {
    executeRequestInAsync("datapilot:message", data);
  };

  const toggleDataPilot = (open: boolean) => {
    executeRequestInAsync("datapilot:toggle", { open });
  };

  useListeners(dispatch);

  useEffect(() => {
    if (!state.theme) {
      return;
    }
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

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
      <CopilotProvider>
        <div className="App">{children}</div>
      </CopilotProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
