import classNames from "classnames";
import styles from "../styles.module.scss";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | ReactNode;
};
const ColumnRow = ({ title, value }: Props) => {
  return (
    <div className={classNames(styles.column_card, {})}>
      <div className="d-flex align-items-center gap-xs">
        <div className="lines-2">{title}</div>
        <div className="spacer" />
      </div>
      <div className="d-flex flex-column">
        <div className="font-normal fs-xxs text-grey">{value}</div>
      </div>
    </div>
  );
};

export default ColumnRow;
