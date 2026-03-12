import { PlayCircleIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { IconButton } from "@uicore";

interface Props {
  query: string;
  projectName: string;
  editorName: string;
}
const ExecuteQueryButton = ({
  query,
  projectName,
  editorName,
}: Props): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("executeQuery", { query, projectName, editorName });
  };
  return (
    <IconButton title="Execute query" onClick={handleClick}>
      <PlayCircleIcon />
    </IconButton>
  );
};

export default ExecuteQueryButton;
