import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";
import { Accordion, ListGroup, ListGroupItem, Spinner, Stack } from "@uicore";
import classes from "./notebooklist.module.scss";
import { NotebookItem, NotebookSchema } from "./types";
import NotebookPrivacySettingButton from "./NotebookPrivacySettingButton";
import { format } from "date-fns";
import { NoNotebooks } from "./NoNotebooks";

interface NotebookListProps {
  type: "saved" | "preconfigured";
}

const NotebooksList = ({ type }: NotebookListProps): JSX.Element => {
  const [notebooks, setNotebooks] = useState<NotebookItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchNotebooks = () => {
    setIsLoading(true);
    executeRequestInSync(
      type === "saved" ? "getNotebooks" : "getPreConfiguredNotebooks",
      {},
    )
      .then((response) => {
        setNotebooks(response as NotebookItem[]);
        setIsLoading(false);
      })
      .catch((err) => panelLogger.info(err));
  };
  useEffect(() => {
    fetchNotebooks();
  }, []);

  const openNotebook = (name?: string, notebookSchema?: NotebookSchema) => {
    executeRequestInSync("openNewNotebook", {
      notebookId: name,
      notebookSchema: notebookSchema,
    })
      .then(() => panelLogger.info(`${type} Notebook opened`))
      .catch((err) => panelLogger.info(err));
  };

  return (
    <Accordion
      defaultOpen
      trigger={() => (
        <header className="d-flex align-items-center justify-content-between">
          <h4>
            {type === "saved" ? "Saved Notebooks" : "Pre-configured Notebooks"}
          </h4>
        </header>
      )}
    >
      {() => {
        if (isLoading) return <Spinner />;
        if (!notebooks || notebooks.length === 0) return <NoNotebooks />;
        if (!isLoading && notebooks)
          return (
            <div className={classes.notebookList}>
              <ListGroup>
                {notebooks.map((notebook, index) => (
                  <ListGroupItem key={index}>
                    <Stack
                      onClick={() =>
                        type === "saved"
                          ? openNotebook(notebook.name)
                          : openNotebook(undefined, notebook.data)
                      }
                    >
                      {notebook.name}
                    </Stack>
                    <br />
                    {type === "saved" && (
                      <>
                        <Stack>
                          {format(
                            new Date(notebook.created_on),
                            "hh:mm a dd MMM yyyy",
                          )}
                        </Stack>
                        <br />
                        <NotebookPrivacySettingButton
                          notebook={notebook}
                          refetchNotebook={fetchNotebooks}
                        />
                      </>
                    )}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          );
      }}
    </Accordion>
  );
};

export default NotebooksList;
