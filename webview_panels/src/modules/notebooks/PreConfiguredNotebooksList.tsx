import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "@uicore";
import classes from "./notebooklist.module.scss";
import { NotebookSchema, PreconfiguredNotebookItem } from "./types";
import { format } from "date-fns";

const PreConfiguredNotebooksList = (): JSX.Element => {
  const [notebooks, setNotebooks] = useState<PreconfiguredNotebookItem[]>();
  const fetchNotebooks = () => {
    executeRequestInSync("getPreConfiguredNotebooks", {})
      .then((response) => setNotebooks(response as PreconfiguredNotebookItem[]))
      .catch((err) => panelLogger.info(err));
  };
  useEffect(() => {
    fetchNotebooks();
  }, []);

  const openNotebook = (notebookSchema: NotebookSchema) => {
    executeRequestInSync("openNewNotebook", { notebookSchema: notebookSchema })
      .then(() => panelLogger.info("Pre configured Notebook opened"))
      .catch((err) => panelLogger.info(err));
  };

  return (
    <div className={classes.notebookList}>
      {notebooks && (
        <ListGroup>
          {notebooks
            .filter(
              (notebook) => notebook.data.metadata?.displayInActions === true
            )
            .map((notebook, index) => (
              <ListGroupItem key={index}>
                <div onClick={() => openNotebook(notebook.data)}>
                  {notebook.name}
                </div>
                <br />
                <div>
                  {format(new Date(notebook.created_on), "HH:mm dd MMM yyyy")}
                </div>
                <br />
                <div>{notebook.tags.join(", ")}</div>
              </ListGroupItem>
            ))}
        </ListGroup>
      )}
    </div>
  );
};

export default PreConfiguredNotebooksList;
