import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import {
  Accordion,
  IconButton,
  Input,
  ListGroup,
  ListGroupItem,
  Spinner,
  Stack,
  Tag,
} from "@uicore";
import classes from "./notebooklist.module.scss";
import { NotebookItem, NotebookSchema } from "./types";
import NotebookPrivacySettingButton from "./NotebookPrivacySettingButton";
import { format } from "date-fns";
import { NoNotebooks } from "./NoNotebooks";
import { ArrowDownIcon, ArrowRightIcon, EditIcon } from "@assets/icons";
import DeleteNotebookButton from "./DeleteNotebookButton";

interface NotebookListProps {
  type: "saved" | "preconfigured";
  privacy?: "public" | "private";
  refetchTime: number;
  refetchNotebook: () => void;
}

const NotebooksList = ({
  type,
  privacy,
  refetchTime,
  refetchNotebook,
}: NotebookListProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const [notebooks, setNotebooks] = useState<NotebookItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [editNotebook, setEditNotebook] = useState<NotebookItem | undefined>();
  const [newNotebookName, setNewNotebookName] = useState("");

  const fetchNotebooks = () => {
    setIsLoading(true);
    executeRequestInSync(
      type === "saved" ? "getNotebooks" : "getPreConfiguredNotebooks",
      type === "saved" ? { privacy: privacy } : {}
    )
      .then((response) => {
        setNotebooks(response as NotebookItem[]);
        setIsLoading(false);
      })
      .catch((err) => panelLogger.info(err));
  };
  useEffect(() => {
    fetchNotebooks();
  }, [refetchTime]);

  const openNotebook = (name?: string, notebookSchema?: NotebookSchema) => {
    executeRequestInSync("openNewNotebook", {
      notebookId: name,
      notebookSchema: notebookSchema,
    })
      .then(() => panelLogger.info(`${type} Notebook opened`))
      .catch((err) => panelLogger.info(err));
  };

  const handleSaveNotebookName = async () => {
    const result = (await executeRequestInSync("updateNotebook", {
      notebookId: editNotebook?.id,
      name: newNotebookName,
      data: {
        ...editNotebook?.data,
        metadata: {
          ...editNotebook?.data?.metadata,
          name: newNotebookName,
          isDraft: false,
        },
      },
    })) as { ok: boolean };
    if (result.ok) {
      setNotebooks(
        notebooks?.map((notebook) => {
          if (notebook.id === editNotebook?.id) {
            return {
              ...notebook,
              name: newNotebookName,
              data: {
                ...notebook?.data,
                metadata: {
                  ...notebook?.data?.metadata,
                  name: newNotebookName,
                  isDraft: false,
                },
              },
            };
          }
          return notebook;
        })
      );
      setEditNotebook(undefined);
      setNewNotebookName("");
    }
  };

  const onKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await handleSaveNotebookName();
    }
    if (event.key === "Escape") {
      setEditNotebook(undefined);
      setNewNotebookName("");
    }
  };
  const handleNotebookNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNotebookName((event.target as HTMLInputElement).value);
  };

  const afterDelete = (deletedNotebookId: number) => {
    setNotebooks(
      notebooks?.filter((notebook) => notebook.id !== deletedNotebookId)
    );
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
                      notebook.data.metadata?.displayInActions === true
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
                        <Stack className={classes.notebookName}>
                          <span>
                            {editNotebook?.id === notebook.id ? (
                              <Input
                                autoFocus
                                onKeyDown={onKeyPress}
                                onBlur={handleSaveNotebookName}
                                onChange={handleNotebookNameChange}
                                value={newNotebookName}
                                onClick={(e) => e.stopPropagation()}
                              />
                            ) : (
                              notebook.name
                            )}
                          </span>
                          {privacy === "private" && (
                            <IconButton
                              title="Edit notebook name"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditNotebook(notebook);
                                setNewNotebookName(notebook.name);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                        </Stack>
                      </Stack>
                      <br />
                      {type === "saved" && (
                        <>
                          <Stack>
                            {notebook.data.metadata?.isDraft ? (
                              <Tag>Draft</Tag>
                            ) : null}
                            {format(
                              new Date(notebook.created_on),
                              "hh:mm a dd MMM yyyy"
                            )}
                          </Stack>
                          <br />
                          {!notebook.data.metadata?.isDraft &&
                            privacy === "private" && (
                              <NotebookPrivacySettingButton
                                notebook={notebook}
                                refetchNotebook={refetchNotebook}
                              />
                            )}
                          {privacy === "private" ? (
                            <DeleteNotebookButton
                              notebookId={notebook.id}
                              afterDelete={afterDelete}
                            />
                          ) : null}
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
