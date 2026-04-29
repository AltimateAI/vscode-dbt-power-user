import { ApiHelper } from "@lib";
import { panelLogger } from "@modules/logger";
import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import appSlice, {
  initialState,
  updateIsComponentsApiInitialized,
} from "./appSlice";
import { executeRequestInAsync, executeRequestInSync } from "./requestExecutor";
import { ContextProps } from "./types";
import useListeners from "./useListeners";

export const AppContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(
    appSlice.reducer,
    appSlice.getInitialState(),
  );

  useEffect(() => {
    panelLogger.info("updating components api helper");
    // This overrides the components library api methods
    // @ts-expect-error TODO: add type generic for executeRequestInSync
    ApiHelper.get = async (
      url: string,
      data?: Record<string, unknown>,
      request?: RequestInit,
    ) => {
      if (data?.telemetry) {
        executeRequestInAsync("sendTelemetryEvent", {
          ...data.telemetry,
        });
      }
      return executeRequestInSync("fetch", {
        endpoint: url,
        fetchArgs: { ...data, ...request, method: "GET" },
      });
    };
    // @ts-expect-error TODO: add type generic for executeRequestInSync
    ApiHelper.post = async (
      url: string,
      data?: Record<string, unknown>,
      request?: RequestInit,
    ) => {
      if (data?.telemetry) {
        executeRequestInAsync("sendTelemetryEvent", {
          ...data.telemetry,
        });
      }

      return executeRequestInSync("fetch", {
        endpoint: url,
        fetchArgs: {
          ...request,
          body: JSON.stringify(data ?? {}),
          method: "POST",
        },
      });
    };
    dispatch(updateIsComponentsApiInitialized(true));
  }, []);

  useListeners(dispatch);

  const values = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <AppContext.Provider value={values}>
      <div className="App">{children}</div>
    </AppContext.Provider>
  );
};

export default AppProvider;
