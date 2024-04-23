import { FormGroup, Label, Input } from "@uicore";
import { ChangeEvent, useState } from "react";

const QueryLimit = (): JSX.Element => {
  const [limit, setLimit] = useState(500);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));
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
      />
    </FormGroup>
  );
};

export default QueryLimit;
