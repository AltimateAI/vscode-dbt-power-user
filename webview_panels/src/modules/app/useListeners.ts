import { useCallback, useEffect } from "react";
import { updateTheme } from "./appSlice";
import { handleIncomingResponse } from "./requestExecutor";
import { ContextProps } from "./types";

type InjectConfigProps = { reducer: string; state: Record<string, unknown> }[];

const useListeners = (dispatch: ContextProps["dispatch"]): void => {
  const setTheme = useCallback(
    ({ theme }: { theme: string }) => {
      dispatch(updateTheme(theme));
    },
    [dispatch],
  );

  const handleInjectConfig = useCallback(
    (args: InjectConfigProps) => {
      args.forEach(
        (arg: { reducer: string; state: Record<string, unknown> }) => {
          const { reducer, state } = arg;
          // @ts-expect-error TODO fix this type
          const myReducer = getReducerByName(reducer);
          if (myReducer) {
            dispatch(myReducer.actions.updateState(state));
          }
        },
      );
    },
    [dispatch],
  );

  const onMesssage = useCallback(
    (event: MessageEvent) => {
      const { command, args } = event.data;
      switch (command) {
        case "injectConfig":
          handleInjectConfig(args);
          break;
        case "response":
          handleIncomingResponse(args);
          break;
        case "setTheme":
          setTheme(args);
          break;
        default:
          break;
      }
    },
    [handleInjectConfig, setTheme],
  );

  useEffect(() => {
    window.addEventListener("message", onMesssage);
    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, [onMesssage]);
};

export default useListeners;
