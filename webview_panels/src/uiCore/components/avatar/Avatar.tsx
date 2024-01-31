import { ReactNode } from "react";
import classes from "./styles.module.scss";

interface Props {
  imgUrl?: string;
  children?: ReactNode;
  size?: number;
}
const Avatar = ({ imgUrl, children, size = 40 }: Props): JSX.Element => {
  return (
    <div
      className={classes.avatar}
      style={{ maxWidth: size, minWidth: size, height: size }}
    >
      {children}
      {imgUrl ? <img src={imgUrl} /> : null}
    </div>
  );
};

export default Avatar;
