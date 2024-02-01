import Select, {
  StylesConfig,
  components,
  OptionProps,
  GroupBase,
} from "react-select";
import { Label } from "../../index";
import { CheckBlueIcon, UncheckIcon } from "@assets/icons";
import "./select.module.scss"

const { Option } = components;

export interface OptionType {
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
    isSelected,
  } = props;

  return (
    <Option {...props}>
      <div className="flex items-center gap-2">
        <Label check={isMulti}>
          <span style={{ marginRight: 10 }}>
            {isSelected ? <CheckBlueIcon /> : <UncheckIcon />}
          </span>
          {label}
        </Label>
      </div>
    </Option>
  );
};

const AltimateSelect = (props: Parameters<typeof Select>[0]): JSX.Element => {
  const colourStyles: StylesConfig<OptionType> = {
    menu: (styles) => ({
      ...styles,
      margin: 0,
      borderRadius: "0 0 4px 4px",
      backgroundColor: "var(--stroke--disable)",
    }),
    option: (styles, {isFocused, isSelected}) => ({...styles, 
      backgroundColor: isFocused || isSelected ? "var(--background--base)" : "transparent",
    }),
    indicatorSeparator: (styles) => ({...styles, display: "none"}),
    singleValue: (styles) => ({
      ...styles,
      color: "var(--text-color--paragraph)",
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: "var(--background--base)",
      borderColor: "var(--stroke--disable)",
      color: "var(--text-color--paragraph)",
    }),
  };
  const selectName = props.name ?? `select-${Math.random()}`;

  return (
    <Select<OptionType>
      {...props}
      styles={colourStyles}
      className={`${props.className} altimate-select`}
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
