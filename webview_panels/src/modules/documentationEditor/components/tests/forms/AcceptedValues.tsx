import { OptionType, Select } from "@uicore";
import { Control, Controller } from "react-hook-form";
import { SaveRequest } from "../types";

interface Props {
  control: Control<SaveRequest, unknown>;
  values?: string[];
}
const AcceptedValues = ({ control, values }: Props): JSX.Element => {
  return (
    <div>
      <Controller
        control={control}
        name="accepted_values"
        render={({ field: { onChange, ref } }) => (
          <Select
            components={{
              DropdownIndicator: null,
              Menu: () => null,
            }}
            ref={ref}
            hideOptionIcon
            isCreatable
            defaultValue={values?.map((v) => ({ label: v, value: v }) ?? [])}
            isMulti
            onChange={(updates: unknown) => {
              return onChange(
                ((updates ?? []) as OptionType[])?.map((val) => val.value),
              );
            }}
            placeholder="Type a value and press enter to add"
          />
        )}
      />
    </div>
  );
};

export default AcceptedValues;
