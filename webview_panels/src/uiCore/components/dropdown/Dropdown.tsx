import { List, Popover, PopoverBody, Stack } from "@uicore";
import { useRef, useState } from "react";
import classes from "./dropdown.module.scss";
import { ArrowDownIcon } from "@assets/icons";

interface Props {
  label: string;
  options: { label: string; value: string }[];
  onOptionSelect: (k: string) => void;
}

const Dropdown = ({ label, options, onOptionSelect }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const onToggleClick = () => {
    setOpenPopover((prev) => !prev);
  };
  return (
    <div>
      <Stack ref={ref} onClick={onToggleClick} className={classes.dropdown}>
        {label}
        <ArrowDownIcon />
      </Stack>
      <Popover
        isOpen={openPopover}
        target={ref}
        placement="bottom"
        hideArrow
        className={classes.popover}
      >
        <PopoverBody>
          <List>
            {options.map((option) => (
              <li
                key={option.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopover(false);
                  onOptionSelect(option.value);
                }}
              >
                {option.label}
              </li>
            ))}
          </List>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default Dropdown;
