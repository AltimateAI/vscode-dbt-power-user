import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { resetData } from "@modules/queryPanel/context/queryPanelSlice";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button } from "@uicore";

const ClearResultsButton = (): JSX.Element | null => {
  const { queryResults } = useQueryPanelState();
  const dispatch = useQueryPanelDispatch();
  const handleClear = () => {
    dispatch(resetData());
  };
  if (!queryResults) {
    return null;
  }
  return (
    <Button outline onClick={handleClear}>
      Clear results
    </Button>
  );
};

export default ClearResultsButton;
