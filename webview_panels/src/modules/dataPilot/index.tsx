import { IncomingMessageProps } from "@modules/app/types";
import { useCallback, useEffect, useState } from "react";

const DataPilotPanel = () => {
  const [message, setMessage] = useState({});
  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "datapilot:message":
          setMessage(args);
          break;
        default:
          break;
      }
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("message", onMesssage);
    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, []);
  return <div>DataPilotLeftPanel3 {JSON.stringify(message)}</div>;
};

export default DataPilotPanel;
