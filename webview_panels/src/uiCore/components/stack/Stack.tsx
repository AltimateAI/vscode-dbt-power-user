import { HTMLAttributes, ReactNode } from "react";
import classes from "./stack.module.scss";

const Stack = ({
  children,
  direction = "row",
  ...rest
}: {
  children: ReactNode;
  direction?: "row" | "column";
} & HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    {...rest}
    className={`${rest.className} ${classes.stack} stack-${direction}`}
  >
    {children}
  </div>
);

export default Stack;
