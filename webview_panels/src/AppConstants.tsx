import { lazy } from "react";

const DocumentationEditor = lazy(
  () => import("./modules/documentationEditor/DocumentationEditor"),
);
const Insights = lazy(() => import("./modules/insights/Insights"));

export const AvailableRoutes = {
  "/insights": { component: <Insights /> },
  "/documentation-editor": { component: <DocumentationEditor /> },
};
