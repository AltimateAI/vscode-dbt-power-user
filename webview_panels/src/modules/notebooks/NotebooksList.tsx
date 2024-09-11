import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "@uicore";
import classes from "./notebooklist.module.scss";
import { NotebookItem } from "./types";
import NotebookPrivacySettingButton from "./NotebookPrivacySettingButton";
import { format } from "date-fns";

const NotebooksList = (): JSX.Element => {
  const [notebooks, setNotebooks] = useState<NotebookItem[]>();
  const fetchNotebooks = () => {
    executeRequestInSync("getNotebooks", {})
      .then((response) => setNotebooks(response as NotebookItem[]))
      .catch((err) => panelLogger.info(err));
  };
  useEffect(() => {
    fetchNotebooks();
  }, []);

  const openNotebook = (name: string) => {
    executeRequestInSync("openNewNotebook", { notebookId: name })
      .then(() => panelLogger.info("Notebook opened"))
      .catch((err) => panelLogger.info(err));
  };

  return (
    <div className={classes.notebookList}>
      {notebooks && (
        <ListGroup>
          {notebooks.map((notebook, index) => (
            <ListGroupItem key={index}>
              <div onClick={() => openNotebook(notebook.name)}>
                {notebook.name}
              </div>
              <br />
              <div>
                {format(new Date(notebook.created_on), "HH:mm dd MMM yyyy")}
              </div>
              <br />
              <div>{notebook.tags.map((tag) => tag.tag).join(", ")}</div>
              <br />
              <NotebookPrivacySettingButton
                notebook={notebook}
                refetchNotebook={fetchNotebooks}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default NotebooksList;
