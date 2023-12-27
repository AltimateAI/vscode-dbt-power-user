import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

declare global {
  interface Window {
    viewPath: string;
  }
}

const availableRouteEntries = [`/`, "/insights", "/documentation-editor"];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MemoryRouter
      initialIndex={availableRouteEntries.indexOf(window.viewPath)}
      initialEntries={availableRouteEntries}
    >
      <App />
    </MemoryRouter>
  </React.StrictMode>
);
