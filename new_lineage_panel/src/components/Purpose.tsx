import { FunctionComponent } from "react";
import styles from "../styles.module.scss";
import classNames from "classnames";

const PurposeSection: FunctionComponent<{
    purpose: string;
  }> = ({ purpose }) => {
    return (
      <div className={classNames(styles.card, "purpose-section")}>
        <div className="d-flex flex-column gap-sm">
          <div className="d-flex gap-xs flex-column">
            <div className="fs-5 fw-semibold">Description</div>
            <div className={classNames(styles.column_card)}>
              <div className="font-normal fs-xxs">{purpose}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PurposeSection