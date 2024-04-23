import { LoadingSpinner } from "@assets/icons";
import { HINTS } from "@modules/queryPanel/constants";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button } from "@uicore";

const QueryPanelLoader = (): JSX.Element => {
  const { hintIndex } = useQueryPanelState();
  const hint = HINTS[hintIndex];
  return (
    <div>
      <LoadingSpinner />
      {hint ? (
        <div>
          {hint.message} <a href={hint.link}>Docs</a>
        </div>
      ) : null}
      <Button>Cancel query</Button>
    </div>
  );
};

export default QueryPanelLoader;
