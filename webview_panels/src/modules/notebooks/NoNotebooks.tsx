import { NoNotebooksIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { Button } from "@uicore";
import classes from "./notebooklist.module.scss";

export const NoNotebooks = ({
  privacy,
}: {
  privacy?: "public" | "private";
}): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("openNewNotebook", {});
  };
  return (
    <div className={classes.noNotebooks}>
      <div className={classes.icon}>
        <NoNotebooksIcon />
      </div>
      <div>
        <div>
          No Notebooks Have Been {privacy === "private" ? "Saved" : "Shared"}!
        </div>
        <div>Explaining content text for how to use notebooks</div>
      </div>
      <div className={classes.button}>
        <Button className={classes.createNotebookButton} onClick={handleClick}>
          Create Notebook
        </Button>
      </div>
    </div>
  );
};
