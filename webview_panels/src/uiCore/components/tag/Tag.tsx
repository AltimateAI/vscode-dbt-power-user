import { HTMLAttributes, ReactNode } from "react";
import classes from "./tag.module.scss";

const Tag = ({
  children,
  color,
  className,
  ...rest
}: {
  children: ReactNode;
  color?: string;
} & HTMLAttributes<HTMLSpanElement>): JSX.Element => {
  return (
    <span className={`${className ?? ""} ${classes.tag} ${color}`} {...rest}>
      {children}
    </span>
  );
};

export default Tag;
