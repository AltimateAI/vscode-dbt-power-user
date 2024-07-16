import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Lineage } from "./Lineage.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { StaticLineageContainer } from "./StaticLineage.tsx";
import { ModalArgs, ModalContext } from "./Modals.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isStaticLineage = window.lineageType === "static";

const App = () => {
  const [modalArgs, setModalArgs] = useState<ModalArgs>({ type: "none" });
  return (
    <ModalContext.Provider value={{ modalArgs, setModalArgs }}>
      {isStaticLineage ? <StaticLineageContainer /> : <Lineage />}
    </ModalContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
