import { Suspense } from "react";
import AppLayout from "./AppLayout";
import { AppRoutes } from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

const Loader = () => <div>Loading...</div>;
const App = (): JSX.Element => (
  <AppLayout>
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  </AppLayout>
);

export default App;
