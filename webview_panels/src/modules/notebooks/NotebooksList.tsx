import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "@uicore";
import classes from "./notebooklist.module.scss";

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
    <div className={classes.notebookList}>
      {notebooks && (
        <ListGroup>
          {Object.entries(notebooks).map(([key]) => (
            <ListGroupItem key={key} onClick={() => openNotebook(key)}>
              <div>{key}</div>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default NotebooksList;
