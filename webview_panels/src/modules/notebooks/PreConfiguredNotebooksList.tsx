import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "@uicore";
import classes from "./notebooklist.module.scss";
import { PreconfiguredNotebookItem } from "./types";
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

  const openNotebook = () => {
    executeRequestInSync("openNewNotebook", {})
      .then(() => panelLogger.info("Pre configured Notebook opened"))
      .catch((err) => panelLogger.info(err));
  };
  // eslint-disable-next-line no-console
  console.log("VIPSY: ", notebooks);

  return (
    <div className={classes.notebookList}>
      {notebooks && (
        <ListGroup>
          {notebooks.map((notebook, index) => (
            <ListGroupItem key={index}>
              <div onClick={() => openNotebook()}>{notebook.name}</div>
              <br />
              <div>
                {format(new Date(notebook.created_at), "HH:mm dd MMM yyyy")}
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
