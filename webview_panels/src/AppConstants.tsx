import { lazy } from "react";
import Home from "./modules/home/Home";

// Using lazy loading for routes to load only necessary files for each panel
const DocumentationEditor = lazy(
  () => import("./modules/documentationEditor/DocumentationEditor"),
);
const Insights = lazy(() => import("./modules/insights/Insights"));

// This is the list of routes that are available in the webview
// The key should be used as viewPath value in providers ex: src/webview_provider/insightsPanel.ts
export const AvailableRoutes = {
  "/": { component: <Home /> },
  "/insights": { component: <Insights /> },
  "/documentation-editor": { component: <DocumentationEditor /> },
};
