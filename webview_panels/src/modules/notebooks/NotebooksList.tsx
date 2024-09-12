import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { useEffect, useState } from "react";
import { Accordion, ListGroup, ListGroupItem, Spinner, Stack } from "@uicore";
import classes from "./notebooklist.module.scss";
import { NotebookItem, NotebookSchema } from "./types";
import NotebookPrivacySettingButton from "./NotebookPrivacySettingButton";
import { format } from "date-fns";
import { NoNotebooks } from "./NoNotebooks";
import { ArrowDownIcon, ArrowRightIcon } from "@assets/icons";

interface NotebookListProps {
  type: "saved" | "preconfigured";
  privacy?: "public" | "private";
}

const NotebooksList = ({ type, privacy }: NotebookListProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const [notebooks, setNotebooks] = useState<NotebookItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchNotebooks = () => {
    setIsLoading(true);
    executeRequestInSync(
      type === "saved" ? "getNotebooks" : "getPreConfiguredNotebooks",
      type === "saved" ? { privacy: privacy } : {},
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
        <header
          className="d-flex align-items-start justify-content-between mt-4"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <h4>
            {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}{" "}
            {type === "saved"
              ? privacy === "private"
                ? "Saved Notebooks"
                : "Public Notebooks"
              : "Pre-configured Notebooks"}
          </h4>
        </header>
      )}
    >
      {() => {
        if (isLoading) return <Spinner />;
        if (!notebooks || notebooks.length === 0)
          return (
            <div className={classes.noNotebooksContainer}>
              <NoNotebooks />
            </div>
          );
        if (!isLoading && notebooks)
          return (
            <div className={classes.notebookList}>
              <ListGroup>
                {notebooks
                  .filter(
                    (notebook) =>
                      type === "saved" ||
                      notebook.data.metadata?.displayInActions === true,
                  )
                  .map((notebook, index) => (
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
                          {privacy === "private" && (
                            <NotebookPrivacySettingButton
                              notebook={notebook}
                              refetchNotebook={fetchNotebooks}
                            />
                          )}
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
