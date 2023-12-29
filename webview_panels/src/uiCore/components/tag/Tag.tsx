import { ReactNode } from "react";
import classes from "./tag.module.scss";

const Tag = ({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}): JSX.Element => {
  return <span className={`${classes.tag} ${color}`}>{children}</span>;
};

export default Tag;
