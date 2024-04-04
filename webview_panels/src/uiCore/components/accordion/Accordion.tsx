import { ReactNode, useState } from "react";
import classes from "./accordion.module.scss";

const Accordion = ({
  trigger,
  children,
  defaultOpen = false,
}: {
  trigger: (b: boolean) => ReactNode;
  children: (args: { close: () => void }) => ReactNode;
  defaultOpen?: boolean;
}): JSX.Element => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((b) => !b);
        }}
      >
        {trigger(open)}
      </div>
      <div className={`${classes.accordion} ${open ? classes.open : ""}`}>
        {children({ close: () => setOpen(false) })}
      </div>
    </div>
  );
};

export default Accordion;
