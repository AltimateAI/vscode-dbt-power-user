import { PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

export const Tooltip = ({
  children,
  tooltipLabel,
}: PropsWithChildren<{ tooltipLabel: string | ReactNode }>) => {
  return (
    <div className={styles.tooltip_container}>
      {children}
      <div
        className={classNames(
          styles.tooltip,
          typeof tooltipLabel === "string" ? styles.tooltip_text : ""
        )}
      >
        {tooltipLabel}
      </div>
    </div>
  );
};
