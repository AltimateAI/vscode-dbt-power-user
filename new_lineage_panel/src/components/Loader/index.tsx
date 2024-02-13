import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
// import Lottie from "react-lottie";
// import * as animationData from "../assets/animation/Loader.json";

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

export const ComponentLoader: FunctionComponent<{
  top?: number;
  left?: number;
  label?: string;
}> = ({ top = 50, left = 50, label }) => {
  return (
    <div
      className={styles.component}
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      {/* <Lottie options={defaultOptions} width={200} height={200} /> */}
      <div style={{ marginTop: "-70px" }}>{label}</div>
    </div>
  );
};
