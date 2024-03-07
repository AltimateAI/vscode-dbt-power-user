import { Dispatch, useCallback, useEffect } from "react";
import {
  executeRequestInAsync,
  handleIncomingResponse,
} from "./requestExecutor";
import { IncomingMessageProps, IncomingSyncResponse, Themes } from "./types";
import { panelLogger } from "@modules/logger";
import { UnknownAction } from "@reduxjs/toolkit";
import { updateTheme } from "./appSlice";

const useListeners = (dispatch: Dispatch<UnknownAction>): void => {
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

  const setTheme = (element: HTMLElement) => {
    const isDark = element.classList.contains("vscode-dark");
    dispatch(updateTheme(isDark ? Themes.Dark : Themes.Light));
  };

  useEffect(() => {
    window.addEventListener("message", onMesssage);

    executeRequestInAsync("webview:ready", {});
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mu) => {
        panelLogger.debug("body classname modified!", mu);
        setTheme(mu.target as HTMLElement);
      });
    });

    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    setTheme(document.body);

    return () => {
      window.removeEventListener("message", onMesssage);
      themeObserver.disconnect();
    };
  }, [onMesssage]);
};

export default useListeners;
