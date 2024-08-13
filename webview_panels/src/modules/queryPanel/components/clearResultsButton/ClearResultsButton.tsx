import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { resetData } from "@modules/queryPanel/context/queryPanelSlice";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button } from "@uicore";
import { XClose } from "@assets/icons";

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
    <Button
      outline
      onClick={handleClear}
      buttontext="Clear results"
      icon={<XClose />}
    />
  );
};

export default ClearResultsButton;
