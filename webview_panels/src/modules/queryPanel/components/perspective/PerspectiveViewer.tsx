import perspective, { TableData } from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import {
  HTMLPerspectiveViewerElement,
  PerspectiveViewerConfig,
} from "@finos/perspective-viewer";
import "@finos/perspective-viewer/dist/css/pro.css";
import { useEffect, useRef, useState } from "react";
import { panelLogger } from "@modules/logger";
import useAppContext from "@modules/app/useAppContext";
import { Themes } from "@modules/app/types";
import classes from "./perspective.module.scss";
import perspectiveStyles from "./perspective.scss?inline";

interface Props {
  data: TableData;
}
const PerspectiveViewer = ({ data }: Props): JSX.Element => {
  const {
    state: { theme },
  } = useAppContext();
  const [tableRendered, setTableRendered] = useState(false);
  const perspectiveViewerRef = useRef<HTMLPerspectiveViewerElement>(null);

  const config: PerspectiveViewerConfig = {
    theme: theme === Themes.Dark ? "Pro Dark" : "Pro Light",
    title: "query result",
  };

  const loadPerspectiveData = async () => {
    if (!perspectiveViewerRef.current) {
      return;
    }

    const styles = {
      types: {
        integer: {
          format: {
            useGrouping: false,
          },
        },
        float: {
          format: {
            maximumFractionDigits: 20,
            minimumFractionDigits: 0,
            useGrouping: false,
          },
        },
      },
    };
    // @ts-expect-error valid parameter
    const table = await perspective.worker(styles).table(data);

    await perspectiveViewerRef.current.load(table);
    await perspectiveViewerRef.current.resetThemes(["Pro Light"]);
    await perspectiveViewerRef.current.restore(config);

    const shadowRoot = perspectiveViewerRef.current?.querySelector(
      "perspective-viewer-datagrid",
    )?.shadowRoot;
    if (!shadowRoot) {
      return;
    }
    const style = document.createElement("style");
    style.textContent = perspectiveStyles;
    shadowRoot.appendChild(style);
    shadowRoot.querySelector("regular-table")?.setAttribute("theme", theme);
    setTableRendered(true);
  };

  useEffect(() => {
    loadPerspectiveData().catch((err) => panelLogger.error(err));
  }, []);

  useEffect(() => {
    if (!tableRendered || !config.theme || !perspectiveViewerRef.current) {
      return;
    }

    perspectiveViewerRef.current
      ?.querySelector("perspective-viewer-datagrid")
      ?.shadowRoot?.querySelector("regular-table")
      ?.setAttribute("theme", theme);
    perspectiveViewerRef.current
      .restore(config)
      .catch((err) =>
        panelLogger.error("error while restoring perspective", err),
      );
  }, [theme, tableRendered]);

  return (
    <perspective-viewer
      class={classes.altimatePerspectiveViewer}
      ref={perspectiveViewerRef}
    ></perspective-viewer>
  );
};

export default PerspectiveViewer;
