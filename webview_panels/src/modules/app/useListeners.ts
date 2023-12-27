import { useEffect } from "react";
import { handleIncomingResponse } from "./requestExecutor";

const useListeners = (): void => {
  const onMesssage = (event: MessageEvent) => {
    const commandMap = { response: handleIncomingResponse };
    const { command, args } = event.data;
    if ((command as string) in commandMap) {
      commandMap[command as keyof typeof commandMap](args);
    }
  };
  useEffect(() => {
    window.addEventListener("message", onMesssage);
    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, []);
};

export default useListeners;
