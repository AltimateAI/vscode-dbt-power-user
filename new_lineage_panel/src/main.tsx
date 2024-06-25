import React from "react";
import ReactDOM from "react-dom/client";
import { Lineage } from "./Lineage.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { StaticLineageContainer } from "./StaticLineage.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isStaticLineage = window.lineageType === "static";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isStaticLineage ? <StaticLineageContainer /> : <Lineage />}
  </React.StrictMode>
);
