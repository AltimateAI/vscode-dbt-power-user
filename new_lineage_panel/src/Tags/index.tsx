import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const COLOR_MAP = {
  blue: styles.level_blue,
  orange: styles.level_orange,
  red: styles.level_red,
  green: styles.level_green,
  dark_green: styles.level_dark_green,
  yellow: styles.level_yellow,
  purple: styles.level_purple,
};

export const ColorTag: FunctionComponent<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <div
    className={classNames(
      styles.level_tag,
      COLOR_MAP[color as keyof typeof COLOR_MAP] || color
    )}
  >
    {label}
  </div>
);
