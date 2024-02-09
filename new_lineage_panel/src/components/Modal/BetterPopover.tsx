import { PropsWithoutRef, ReactNode, useEffect, useState } from "react";
import { Popover, PopoverBody } from "reactstrap";
import styles from "./styles.module.scss";

function BetterPopover({
  trigger,
  render,
}: PropsWithoutRef<{
  trigger: ReactNode;
  render: (args: { close: () => void }) => ReactNode;
}>) {
  // TODO: fix this hardcoded id, random uuid creating issue
  const id = "popover-id";
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const clickHandler = () => setIsOpen(false);
    document.getElementById("root")?.addEventListener("click", clickHandler);
    return () => {
      document
        .getElementById("root")
        ?.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <>
      <div
        id={id}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((b) => !b);
        }}
      >
        {trigger}
      </div>
      <Popover
        placement="bottom"
        target={id}
        className={styles.popover}
        isOpen={isOpen}
        toggle={() => setIsOpen((b) => !b)}
      >
        <PopoverBody onClick={(e) => e.stopPropagation()}>
          {render({ close: () => setIsOpen(false) })}
        </PopoverBody>
      </Popover>
    </>
  );
}

export { BetterPopover };
