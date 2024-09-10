import { NotebookCellKind } from "vscode";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "@uicore";
import classes from "./notebooklist.module.scss";

export declare interface NotebookCellSchema {
  source: string[];
  cell_type: NotebookCellKind;
  languageId: string;
  metadata?: Record<string, unknown>;
}
interface NotebookSchema {
  cells: NotebookCellSchema[];
  metadata?: Record<string, unknown>;
}
interface NotebookItem {
  id: number;
  name: string;
  data: NotebookSchema;
  description: string;
  created_on: string;
  updated_on: string;
  tags: {
    id: number;
    tag: string;
  }[];
  privacy: boolean;
}

const NotebooksList = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const [notebooks, setNotebooks] = useState<NotebookItem[]>();
  useEffect(() => {
    executeRequestInSync("getNotebooks", {})
      .then((response) => setNotebooks(response as NotebookItem[]))
      .catch((err) => panelLogger.info(err));
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
            <ListGroupItem
              key={index}
              onClick={() => openNotebook(notebook.name)}
            >
              <div>{notebook.name}</div>
              <div>{notebook.tags.map((tag) => tag.tag).join(", ")}</div>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default NotebooksList;
