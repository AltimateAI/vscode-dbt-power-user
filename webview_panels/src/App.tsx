import { Suspense } from "react";
import { AppRoutes } from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import AppProvider from "./modules/app/AppProvider";

const Loader = () => <div>Loading...</div>;
const App = (): JSX.Element => (
  <AppProvider>
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  </AppProvider>
);

export default App;
