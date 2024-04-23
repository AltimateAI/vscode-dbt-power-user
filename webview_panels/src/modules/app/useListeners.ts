import { Dispatch, useCallback, useEffect } from "react";
import {
  executeRequestInAsync,
  executeRequestInSync,
  handleIncomingResponse,
} from "./requestExecutor";
import { IncomingMessageProps, IncomingSyncResponse, Themes, User } from "./types";
import { panelLogger } from "@modules/logger";
import { UnknownAction } from "@reduxjs/toolkit";
import { setCurrentUser, setUsers, updateTheme } from "./appSlice";

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

  const loadUsersDetails = () => {
    executeRequestInSync("getUsers", {})
      .then((data) => {
        panelLogger.log("getUsers", data);
        dispatch(setUsers(data as User[]));
      })
      .catch((err) => panelLogger.error("error while fetching users list", err));
  }

  const loadCurrentUser = () => {
    executeRequestInSync("getCurrentUser", {})
      .then((data) => {
        panelLogger.log("getCurrentUser", data);
        dispatch(setCurrentUser(data as User));

      })
      .catch((err) => panelLogger.error("error while fetching current user", err));
  }

  useEffect(() => {
    window.addEventListener("message", onMesssage);

    executeRequestInAsync("webview:ready", {});
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mu) => {
        panelLogger.debug("body classname modified!", mu);
        setTheme(mu.target as HTMLElement);
      });
    });

    loadUsersDetails();
    loadCurrentUser();

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
