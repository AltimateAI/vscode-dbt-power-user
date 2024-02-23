import { Routes, Route } from "react-router-dom";
import { AvailableRoutes } from "./AppConstants";
import NoMatch from "./NoMatch";

export const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path="/">
      {Object.entries(AvailableRoutes).map(([routeEntry, { component }]) => (
        <Route path={routeEntry} element={component} key={routeEntry} />
      ))}

      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);
