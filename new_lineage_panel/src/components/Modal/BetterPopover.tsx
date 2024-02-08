import {
  PropsWithoutRef,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Popover, PopoverBody } from "reactstrap";
import styles from "./styles.module.scss";

function BetterPopover({
  trigger,
  render,
}: PropsWithoutRef<{
  trigger: ReactNode;
  render: (args: { close: () => void }) => ReactNode;
}>) {
  const id = useMemo(() => window.crypto.randomUUID(), []);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const clickHandler = () => setIsOpen(false);
    document.body.addEventListener("click", clickHandler);
    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <>
      <div id={id}>{trigger}</div>
      <Popover
        placement="bottom"
        trigger="click"
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
