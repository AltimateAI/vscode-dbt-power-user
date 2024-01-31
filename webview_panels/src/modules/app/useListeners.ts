import { useCallback, useEffect } from "react";
import {
  executeRequestInAsync,
  handleIncomingResponse,
} from "./requestExecutor";
import { IncomingMessageProps, IncomingSyncResponse } from "./types";

const useListeners = (): void => {
  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "response":
          handleIncomingResponse(args as unknown as IncomingSyncResponse);
          break;
        default:
          break;
      }
    },
    [],
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
