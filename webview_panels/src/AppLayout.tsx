import { ReactNode, useEffect } from "react";
import { selectAppTheme } from "./modules/app/appSelectors";
import useListeners from "./modules/app/useListeners";
import { useAppSelector } from "./modules/store/hooks";

const AppLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  const appTheme = useAppSelector(selectAppTheme);
  useListeners();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", appTheme);
  }, [appTheme]);

  return <div className="App">{children}</div>;
};

export default AppLayout;
