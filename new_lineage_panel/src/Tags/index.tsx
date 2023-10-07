import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

export const ColorTag: FunctionComponent<{ label: string }> = ({ label }) => (
  <div className={classNames(styles.level_tag)}>{label}</div>
);
