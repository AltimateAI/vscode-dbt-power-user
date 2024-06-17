import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

const Tooltip = ({
  children,
  tooltipLabel,
}: PropsWithChildren<{ tooltipLabel: string }>) => {
  return (
    <div className={styles.tooltip_container}>
      {children}
      <div className={styles.tooltip_text}>{tooltipLabel}</div>
    </div>
  );
};

export default Tooltip;
