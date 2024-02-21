import { FunctionComponent, useState } from "react";
import { Tooltip } from "reactstrap";
import AlertCircleIcon from "../assets/icons/alert-circle.svg?react";
import styles from "../styles.module.scss";

const InfoIcon: FunctionComponent<{ id: string; message: string }> = ({
  id,
  message,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={styles.alert_icon}
      id={id}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AlertCircleIcon />
      <Tooltip target={id} isOpen={isOpen}>
        {message}
      </Tooltip>
    </div>
  );
};

export { InfoIcon };
