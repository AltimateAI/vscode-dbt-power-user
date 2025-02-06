import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@uicore/theme.scss";
import { AppRoutes } from "./AppRoutes";
import AppProvider from "./modules/app/AppProvider";
import { TeamMateProvider } from "@altimate/ui-components";

const Loader = () => <div>Loading...</div>;
const App = (): JSX.Element => (
  <AppProvider>
    <TeamMateProvider>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </TeamMateProvider>
  </AppProvider>
);

export default App;
