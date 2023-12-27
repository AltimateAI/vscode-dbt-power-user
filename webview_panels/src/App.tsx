import { Suspense } from "react";
import AppLayout from "./AppLayout";
import { AppRoutes } from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import useListeners from "./modules/app/useListeners";

const Loader = () => <div>Loading...</div>;
const App = (): JSX.Element => {
  useListeners();
  return (
    <AppLayout>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </AppLayout>
  );
};

export default App;
