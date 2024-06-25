import { PlayCircleIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { IconButton } from "@uicore";

interface Props {
  query: string;
}
const ExecuteQueryButton = ({ query }: Props): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("executeQuery", { query });
  };
  return (
    <IconButton title="Execute query" onClick={handleClick}>
      <PlayCircleIcon />
    </IconButton>
  );
};

export default ExecuteQueryButton;
