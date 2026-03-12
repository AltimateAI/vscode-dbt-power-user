import { useCallback, useEffect, useState } from "react";
import NotebooksList from "./NotebooksList";
import { IncomingMessageProps } from "@modules/app/types";
import { panelLogger } from "@modules/logger";
// import PreConfiguredNotebooksList from "./PreConfiguredNotebooksList";

const Notebooks = (): JSX.Element => {
  const [refetch, setRefetch] = useState(Date.now());

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command } = event.data;
      switch (command) {
        case "refetchNotebooks":
          setRefetch(Date.now());
          break;
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("message", onMesssage);

    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, [onMesssage]);

  const refetchNotebook = () => {
    setRefetch(Date.now());
  };

  panelLogger.info("Notebooks", "Refetching notebooks", refetch);

  return (
    <div>
      <NotebooksList type="preconfigured" refetchTime={refetch} refetchNotebook={refetchNotebook} />
      <NotebooksList type="saved" privacy="private" refetchTime={refetch} refetchNotebook={refetchNotebook} />
      <NotebooksList type="saved" privacy="public" refetchTime={refetch} refetchNotebook={refetchNotebook} />
    </div>
  );
};

export default Notebooks;
