// import { lazy } from "react";
import DocumentationEditor from "./modules/documentationEditor/DocumentationEditor";
import Insights from "./modules/insights/Insights";
import Home from "./modules/home/Home";
import DocumentationProvider from "@modules/documentationEditor/DocumentationProvider";
import DataPilotPanel from "@modules/dataPilot";

// TODO: lazy loading breaks loading dynamic webviews when having css because of vite dynamic loading
// research on how to fix that and then use lazy loading
// Using lazy loading for routes to load only necessary files for each panel
// const DocumentationEditor = lazy(
//   () => import("./modules/documentationEditor/DocumentationEditor"),
// );
// const Insights = lazy(() => import("./modules/insights/Insights"));

// This is the list of routes that are available in the webview
// The key should be used as viewPath value in providers ex: src/webview_provider/insightsPanel.ts
export const AvailableRoutes = {
  "/": { component: <Home /> },
  "/insights": { component: <Insights /> },
  "/datapilot": { component: <DataPilotPanel /> },
  "/docs-generator": {
    component: (
      <DocumentationProvider>
        <DocumentationEditor />
      </DocumentationProvider>
    ),
  },
};
