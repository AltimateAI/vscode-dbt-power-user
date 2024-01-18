import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "@uicore";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}
const RightSidePanel = ({ title, children }: Props): JSX.Element => {
  return (
    <Offcanvas isOpen direction="end">
      <OffcanvasHeader>
        <h2>{title}</h2>
      </OffcanvasHeader>
      <OffcanvasBody>{children}</OffcanvasBody>
    </Offcanvas>
  );
};

export default RightSidePanel;
