import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AvailableRoutes } from "./AppConstants";
import "./main.css";

declare global {
  interface Window {
    viewPath: string;
  }
}

const availableRoutes = Object.keys(AvailableRoutes);

/**
 * This method selects the route to be loaded
 * if triggered from extension, it will use the viewPath set from extension
 * if triggered from web page, it will use the viewPath set as query param
 */
const getInitialIndex = (): number => {
  const viewPath =
    window.viewPath ?? // This will be set from extension
    new URL(window.location.href).searchParams.get("viewPath") ?? // this will be set as query param in web page
    "/";
  const index = availableRoutes.indexOf(viewPath);
  if (index === -1) {
    return 0;
  }
  return index;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MemoryRouter
      initialIndex={getInitialIndex()}
      initialEntries={availableRoutes}
    >
      <App />
    </MemoryRouter>
  </React.StrictMode>,
);
