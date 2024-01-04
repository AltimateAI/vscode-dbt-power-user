import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";
import classes from "./stack.module.scss";

const Stack = forwardRef(function stack(
  {
    children,
    direction = "row",
    ...rest
  }: {
    children: ReactNode;
    direction?: "row" | "column";
  } & HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  return (
    <div
      {...rest}
      className={`${rest.className} ${classes.stack} stack-${direction}`}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default Stack;
