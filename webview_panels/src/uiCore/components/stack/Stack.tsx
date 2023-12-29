import { HTMLAttributes, ReactNode } from "react";
import classes from "./stack.module.scss";

const Stack = ({
  children,
  direction,
  ...rest
}: {
  children: ReactNode;
  direction?: "row" | "column";
} & HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div {...rest} className={`${classes.stack} ${direction}`}>
    {children}
  </div>
);

export default Stack;
