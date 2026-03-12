import { HTMLAttributes, ReactNode } from "react";
import classes from "./tag.module.scss";

const Tag = ({
  children,
  color = "default",
  className,
  type = "default",
  ...rest
}: {
  children: ReactNode;
  color?: "primary" | "orange" | "default";
  type?: "rounded" | "default";
} & HTMLAttributes<HTMLSpanElement>): JSX.Element => {
  return (
    <span
      className={`${className ?? ""} ${classes.tag} ${color === "default" ? "" : color} ${type === "rounded" ? classes.rounded : ""}`}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Tag;
