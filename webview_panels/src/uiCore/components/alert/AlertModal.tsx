import { ReactNode } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import IconButton from "../iconButton/IconButton";
import { CloseIcon } from "@assets/icons";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  title?: string;
  actionsFooter?: ReactNode;
  onClose?: () => void;
}
const AlertModal = ({
  isOpen,
  children,
  title,
  actionsFooter,
  onClose,
}: Props): JSX.Element => {
  return (
    <Modal isOpen={isOpen} centered>
      {title ? (
        <ModalHeader>
          {title}{" "}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
      ) : null}
      <ModalBody>{children}</ModalBody>
      {actionsFooter ? <ModalFooter>{actionsFooter}</ModalFooter> : null}
    </Modal>
  );
};

export default AlertModal;
