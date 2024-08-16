import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";

interface Notebook {
  data: string;
}

const NotebooksList = (): JSX.Element => {
  const [notebooks, setNotebooks] = useState<
    Record<string, Notebook> | undefined
  >();
  useEffect(() => {
    executeRequestInSync("getNotebooks", {})
      .then((response) => {
        setNotebooks(response as Record<string, Notebook> | undefined);
      })
      .catch((err) => panelLogger.info(err));
  }, []);

  const openNotebook = (key: string) => {
    executeRequestInSync("openNewNotebook", { notebookId: key })
      .then(() => panelLogger.info("Notebook opened"))
      .catch((err) => panelLogger.info(err));
  };

  return (
    <div>
      {notebooks &&
        Object.entries(notebooks).map(([key, value]) => (
          <div key={key} onClick={() => openNotebook(key)}>
            <h3>{key}</h3>
            <pre>{value.data}</pre>
          </div>
        ))}
    </div>
  );
};

export default NotebooksList;
