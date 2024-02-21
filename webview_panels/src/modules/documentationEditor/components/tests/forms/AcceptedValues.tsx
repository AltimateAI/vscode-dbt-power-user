import { Stack, Label, Input } from "@uicore";
import { Control, Controller } from "react-hook-form";
import { SaveRequest } from "../types";

interface Props {
  control: Control<SaveRequest, unknown>;
  value?: string;
}
const AcceptedValues = ({ control, value }: Props): JSX.Element => {
  return (
    <Stack direction="column">
      <Label>Add comma separated list of values</Label>
      <Controller
        control={control}
        name="accepted_values"
        render={({ field: { onChange } }) => (
          <Input
            defaultValue={value}
            onChange={onChange}
            placeholder="Entire home/apt,Private room,Shared room"
          />
        )}
      />
    </Stack>
  );
};

export default AcceptedValues;
