import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setScale } from "@modules/queryPanel/context/queryPanelSlice";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { FormGroup, Label } from "@uicore";
import { ChangeEvent } from "react";

const TableScale = (): JSX.Element => {
  const { scale } = useQueryPanelState();
  const dispatch = useQueryPanelDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setScale(parseInt(e.target.value) / 10));
    executeRequestInAsync("updateConfig", {
      scale: parseInt(e.target.value) / 10,
    });
  };
  return (
    <FormGroup>
      <Label for="table-scale">Table Scale: {scale}</Label>
      <div>
        <input
          type="range"
          id="vol"
          name="vol"
          step="0.1"
          min="1"
          max="20"
          onChange={handleChange}
          value={scale * 10}
        />
      </div>
    </FormGroup>
  );
};

export default TableScale;
