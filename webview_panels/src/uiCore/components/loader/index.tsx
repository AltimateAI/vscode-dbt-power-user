import { LoaderIcon } from "@assets/icons";
import { FC } from "react";
import styles from "./styles.module.scss";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const styleSizeMap = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

const Loader: FC<LoaderProps> = ({ size = "medium", className = "" }) => {
  return (
    <div className={`${styles.loader} ${styleSizeMap[size]} ${className}`}>
      <LoaderIcon />
    </div>
  );
};

export default Loader;
