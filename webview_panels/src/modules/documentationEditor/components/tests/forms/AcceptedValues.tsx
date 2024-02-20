import { Stack, Label, Input } from "@uicore";
import { Control, Controller } from "react-hook-form";
import { SaveRequest } from "./TestForm";

interface Props {
  control: Control<SaveRequest, unknown>;
}
const AcceptedValues = ({ control }: Props): JSX.Element => {
  return (
    <Stack direction="column">
      <Label>Add comma separated list of values</Label>
      <Controller
        control={control}
        name="accepted_values"
        render={({ field: { onChange } }) => (
          <Input
            onChange={onChange}
            placeholder="Entire home/apt,Private room,Shared room"
          />
        )}
      />
    </Stack>
  );
};

export default AcceptedValues;
