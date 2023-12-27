import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="App">{children}</div>
);

export default AppLayout;
