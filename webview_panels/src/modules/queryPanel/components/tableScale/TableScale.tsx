import { FormGroup, Label } from "@uicore";
import { ChangeEvent, useState } from "react";

const TableScale = (): JSX.Element => {
  const [scale, setScale] = useState(1);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseInt(e.target.value) / 10);
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
