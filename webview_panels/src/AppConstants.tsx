import { lazy } from "react";
import Home from "./modules/home/Home";

const DocumentationEditor = lazy(
  () => import("./modules/documentationEditor/DocumentationEditor"),
);
const Insights = lazy(() => import("./modules/insights/Insights"));

export const AvailableRoutes = {
  "/": { component: <Home /> },
  "/insights": { component: <Insights /> },
  "/documentation-editor": { component: <DocumentationEditor /> },
};
