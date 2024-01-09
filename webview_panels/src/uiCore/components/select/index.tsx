import Select, {
  StylesConfig,
  components,
  OptionProps,
  GroupBase,
} from "react-select";
import { FormGroup, Input, Label } from "../../index";

const { Option } = components;

interface OptionType {
  label: string;
  value: string;
}

const IconOption = (
  props: OptionProps<OptionType, boolean, GroupBase<OptionType>> & {
    selectName: string;
  },
) => {
  const {
    data: { label },
    isMulti,
    selectName,
    isSelected,
  } = props;

  return (
    <Option {...props}>
      <div className="flex items-center gap-2">
        <FormGroup check>
          <Label check={isMulti}>
            <Input
              checked={isSelected}
              type={isMulti ? "checkbox" : "radio"}
              name={selectName}
            />
            {label}
          </Label>
        </FormGroup>
      </div>
    </Option>
  );
};

const AltimateSelect = (props: Parameters<typeof Select>[0]): JSX.Element => {
  const colourStyles: StylesConfig<OptionType> = {
    menu: (styles) => ({ ...styles, margin: 0, borderRadius: "0 0 4px 4px" }),
  };
  const selectName = props.name ?? `select-${Math.random()}`;

  return (
    <Select<OptionType>
      {...props}
      styles={colourStyles}
      // @ts-expect-error TODO fix this type
      components={{
        ...props.components,
        Option: (optionProps) => (
          // @ts-expect-error TODO fix this type
          <IconOption {...optionProps} selectName={selectName} />
        ),
      }}
    />
  );
};

export default AltimateSelect;
