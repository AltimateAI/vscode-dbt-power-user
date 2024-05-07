import { ReactNode } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  title?: string;
  actionsFooter?: ReactNode;
}
const AlertModal = ({
  isOpen,
  children,
  title,
  actionsFooter,
}: Props): JSX.Element => {
  return (
    <Modal isOpen={isOpen}>
      {title ? <ModalHeader>{title}</ModalHeader> : null}
      <ModalBody>{children}</ModalBody>
      {actionsFooter ? <ModalFooter>{actionsFooter}</ModalFooter> : null}
    </Modal>
  );
};

export default AlertModal;
