import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button } from "@uicore";

const ClearResultsButton = (): JSX.Element | null => {
  const { queryResults } = useQueryPanelState();
  if (!queryResults) {
    return null;
  }
  return <Button outline>Clear results</Button>;
};

export default ClearResultsButton;
