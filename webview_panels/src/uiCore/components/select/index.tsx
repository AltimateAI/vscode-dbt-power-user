import Select, {
  StylesConfig,
  components,
  OptionProps,
  GroupBase,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { Label } from "../../index";
import { CheckBlueIcon, UncheckIcon } from "@assets/icons";
import "./select.module.scss";

const { Option } = components;

export interface OptionType {
  label: string;
  value: string;
}

const IconOption = (
  props: OptionProps<OptionType, boolean, GroupBase<OptionType>> & {
    selectName: string;
    hideOptionIcon?: boolean;
  },
) => {
  const {
    data: { label },
    isMulti,
    isSelected,
    hideOptionIcon,
  } = props;

  return (
    <Option {...props}>
      <div className="flex items-center gap-2">
        <Label check={isMulti}>
          <span style={{ marginRight: 10 }}>
            {hideOptionIcon ? null : isSelected ? (
              <CheckBlueIcon />
            ) : (
              <UncheckIcon />
            )}
          </span>
          {label}
        </Label>
      </div>
    </Option>
  );
};

type Props = Parameters<typeof Select>[0] & {
  isCreatable?: boolean;
  hideOptionIcon?: boolean;
};
const AltimateSelect = (props: Props): JSX.Element => {
  const colourStyles: StylesConfig<OptionType> = {
    menu: (styles) => ({
      ...styles,
      margin: 0,
      borderRadius: "0 0 4px 4px",
      backgroundColor: "var(--stroke--disable)",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor:
        isFocused || isSelected ? "var(--background--base)" : "transparent",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    input: (styles) => ({
      ...styles,
      color: "var(--text-color--title)",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "var(--text-color--paragraph)",
    }),
    multiValue: (styles) => ({
      ...styles,
      color: "var(--text-color--title)",
      backgroundColor: "var(--background--04)",
      borderRadius: 26,
      padding: "0 6px",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "inherit",
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: "var(--background--base)",
      borderColor: "var(--stroke--disable)",
      color: "var(--text-color--paragraph)",
    }),
  };
  const selectName = props.name ?? `select-${Math.random()}`;

  if (props.isCreatable) {
    return (
      <CreatableSelect<OptionType>
        {...props}
        styles={colourStyles}
        className={`${props.className} altimate-select`}
        // @ts-expect-error TODO fix this type
        components={{
          ...props.components,
          Option: (optionProps) => (
            // @ts-expect-error TODO fix this type
            <IconOption
              {...optionProps}
              hideOptionIcon={props.hideOptionIcon}
              selectName={selectName}
            />
          ),
        }}
      />
    );
  }
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
          <IconOption
            {...optionProps}
            hideOptionIcon={props.hideOptionIcon}
            selectName={selectName}
          />
        ),
      }}
    />
  );
};

export default AltimateSelect;
