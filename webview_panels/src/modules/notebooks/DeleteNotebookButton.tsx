import { DeleteIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { IconButton } from "@uicore";

const DeleteNotebookButton = ({
  notebookId,
  afterDelete,
}: {
  notebookId: number;
  afterDelete: (deletedNotebookId: number) => void;
}): JSX.Element => {
  const handleDelete = async () => {
    const result = await executeRequestInSync("showInformationMessage", {
      infoMessage: "Are you sure you want to delete this notebook?",
      items: ["Yes", "No"],
    });
    if (result === "Yes") {
      await executeRequestInSync("deleteNotebook", {
        notebookId,
      });
      afterDelete(notebookId);
    }
  };
  return (
    <IconButton onClick={handleDelete} title="Delete Notebook" style={{color: "inherit"}}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteNotebookButton;
