import { PropsWithoutRef, ReactNode, useEffect, useRef, useState } from "react";
import { Popover, PopoverBody } from "reactstrap";
import styles from "./styles.module.scss";
import { withinInclusive } from "../../utils";

function BetterPopover({
  trigger,
  render,
}: PropsWithoutRef<{
  trigger: ReactNode;
  render: (args: { close: () => void }) => ReactNode;
}>) {
  // TODO: fix this hardcoded id, random uuid creating issue
  const ref = useRef<HTMLDivElement>(null);
  const id = "popover-id";
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!ref.current) return;
      const { x, y, width, height } = ref.current.getBoundingClientRect();
      setIsOpen(
        withinInclusive(x - 10, x + width + 10)(e.x) &&
          withinInclusive(y - 10, y + height + 10)(e.y)
      );
    };
    document.body.addEventListener("click", clickHandler);
    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, [isOpen]);

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
        <PopoverBody>
          <div ref={ref}>{render({ close: () => setIsOpen(false) })}</div>
        </PopoverBody>
      </Popover>
    </>
  );
}

export { BetterPopover };
