import { LoadingSpinner } from "@assets/icons";
import { HINTS } from "@modules/queryPanel/constants";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button, Stack } from "@uicore";
import classes from "../../querypanel.module.scss";
import { executeRequestInAsync } from "@modules/app/requestExecutor";

const QueryPanelLoader = (): JSX.Element => {
  const { hintIndex } = useQueryPanelState();
  const hint = HINTS[hintIndex];
  const handleCancelQuery = () => {
    executeRequestInAsync("cancelQuery", {});
  };

  return (
    <Stack
      direction="column"
      className={classes.loader}
      title="Query results loader"
    >
      <LoadingSpinner />
      {hint ? (
        <div>
          {hint.message} <a href={hint.link}>Docs</a>
        </div>
      ) : null}
      <Button
        color="primary"
        onClick={handleCancelQuery}
        buttonText="Cancel query"
      />
    </Stack>
  );
};

export default QueryPanelLoader;
