import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setLimit } from "@modules/queryPanel/context/queryPanelSlice";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { FormGroup, Label, Input } from "@uicore";
import { ChangeEvent } from "react";

const QueryLimit = (): JSX.Element => {
  const { limit } = useQueryPanelState();
  const dispatch = useQueryPanelDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLimit(parseInt(e.target.value)));
    executeRequestInAsync("updateConfig", { limit: parseInt(e.target.value) });
  };
  return (
    <FormGroup>
      <Label for="query-limit">Query Limit</Label>
      <Input
        id="query-limit"
        name="query-limit"
        type="number"
        onChange={handleChange}
        value={limit}
        min={1}
      />
    </FormGroup>
  );
};

export default QueryLimit;
