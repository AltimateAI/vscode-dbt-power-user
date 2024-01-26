import { useCallback, useEffect } from "react";
import { updateTheme } from "./appSlice";
import {
  executeRequestInAsync,
  handleIncomingResponse,
} from "./requestExecutor";
import {
  ContextProps,
  IncomingMessageProps,
  IncomingSyncResponse,
} from "./types";

const useListeners = (dispatch: ContextProps["dispatch"]): void => {
  const setTheme = useCallback(
    ({ theme }: { theme: string }) => {
      dispatch(updateTheme(theme));
    },
    [dispatch],
  );

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "response":
          handleIncomingResponse(args as unknown as IncomingSyncResponse);
          break;
        case "setTheme":
          setTheme(args as unknown as { theme: string });
          break;
        default:
          break;
      }
    },
    [setTheme],
  );

  useEffect(() => {
    window.addEventListener("message", onMesssage);

    executeRequestInAsync("webview:ready", {});

    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, [onMesssage]);
};

export default useListeners;
