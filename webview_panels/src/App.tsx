import { Provider } from "react-redux";
import { Suspense } from "react";
import AppLayout from "./AppLayout";
import { AppRoutes } from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./modules/store";

const Loader = () => <div>Loading...</div>;
const App = (): JSX.Element => (
  <Provider store={store}>
    <AppLayout>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </AppLayout>
  </Provider>
);

export default App;
