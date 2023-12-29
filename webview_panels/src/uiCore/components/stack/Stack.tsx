import { ReactNode } from "react";
import classes from "./stack.module.scss";

const Stack = ({
  children,
  direction,
}: {
  children: ReactNode;
  direction?: "row" | "column";
}): JSX.Element => (
  <div className={`${classes.stack} ${direction}`}>{children}</div>
);

export default Stack;
