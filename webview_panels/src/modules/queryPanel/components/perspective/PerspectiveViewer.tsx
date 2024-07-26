import perspective, { TableData } from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import {
  HTMLPerspectiveViewerElement,
  PerspectiveViewerConfig,
} from "@finos/perspective-viewer";
import "./themes.css";
import "@finos/perspective-viewer/dist/css/pro.css";
import "@finos/perspective-viewer/dist/css/pro-dark.css";
import "@finos/perspective-viewer/dist/css/vaporwave.css";
import "@finos/perspective-viewer/dist/css/solarized.css";
import "@finos/perspective-viewer/dist/css/solarized-dark.css";
import "@finos/perspective-viewer/dist/css/monokai.css";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { panelLogger } from "@modules/logger";
import useAppContext from "@modules/app/useAppContext";
import classes from "./perspective.module.scss";
import perspectiveStyles from "./perspective.scss?inline";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { useQueryPanelDispatch } from "@modules/queryPanel/QueryPanelProvider";
import { setPerspectiveTheme } from "@modules/queryPanel/context/queryPanelSlice";

interface Props {
  data: TableData;
  columnNames: string[];
  columnTypes: string[];
  styles?: CSSProperties ;
}
const PerspectiveViewer = ({
  columnNames,
  columnTypes,
  data,
  styles
}: Props): JSX.Element => {
  const {
    state: { theme },
  } = useAppContext();
  const { perspectiveTheme } = useQueryPanelState();
  const dispatch = useQueryPanelDispatch();
  const [tableRendered, setTableRendered] = useState(false);
  const perspectiveViewerRef = useRef<HTMLPerspectiveViewerElement>(null);

  const config: PerspectiveViewerConfig = {
    theme: perspectiveTheme,
    title: "query result",
    columns: [], // reset columns
    settings: false,
    plugin_config: { editable: false },
  };

  const mapType = (agateType: string) => {
    switch (agateType) {
      case "Text":
        return "string";
      case "Integer":
        return "float";
      case "Number":
        return "float";
      default:
        // treat any unknown types as string
        return "string";
    }
  };

  // Converts the provided data to CSV format.
  const dataToCsv = (columns: string[], rows: TableData) => {
    if (!Array.isArray(rows)) {
      return;
    }

    if (!rows || rows.length === 0) {
      panelLogger.error("No data available to convert to CSV");
      return "";
    }
    const replacer = (_key: string, value: unknown) =>
      value === null ? "" : value;
    const csv = [
      columns.join(","),
      ...rows.map((row) =>
        columns
          .map((fieldName) => {
            const fieldData = row[fieldName];
            if (fieldData && typeof fieldData === "string") {
              return `"${(fieldData as string).replace(/"/g, '""')}"`; // escape double quotes and Wrap in double quotes
            }
            return JSON.stringify(fieldData, replacer);
          })
          .join(","),
      ),
    ].join("\r\n");
    return csv;
  };

  const downloadAsCSV = () => {
    try {
      if (!data || !Array.isArray(data) || data.length === 0) {
        panelLogger.error("No data available for downloading.");
        return;
      }
      const csvContent = dataToCsv(columnNames, data);
      if (!csvContent) {
        panelLogger.info("empty csv content", columnNames, data);
        return;
      }
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `power_user_data_${new Date().toISOString()}.csv`; // Filename with a timestamp
      a.click();
    } catch (error) {
      // Log error for debugging
      panelLogger.error("Failed to download CSV:", error);
      executeRequestInAsync("error", {
        text: "Unable to download data as CSV. " + (error as Error).message,
      });
    }
  };

  const updateCustomStyles = (currentTheme: string) => {
    const shadowRoot = perspectiveViewerRef.current?.querySelector(
      "perspective-viewer-datagrid",
    )?.shadowRoot;
    if (!shadowRoot) {
      return;
    }
    const id = "altimate-styles";
    shadowRoot.getElementById(id)?.remove();

    const style = document.createElement("style");
    style.textContent = perspectiveStyles;
    style.id = id;
    shadowRoot.appendChild(style);
    shadowRoot.querySelector("regular-table")?.setAttribute("theme", theme);
    shadowRoot
      .querySelector("regular-table")
      ?.setAttribute("perspective-theme", currentTheme);
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

    const schema: Record<string, string> = {};
    for (let i = 0; i < columnNames.length; i++) {
      schema[columnNames[i]] = mapType(columnTypes[i]);
    }

    // @ts-expect-error valid parameter
    const worker = perspective.worker(styles);
    const table = await worker.table(schema);
    await table.replace(data);

    await perspectiveViewerRef.current.load(table);
    await perspectiveViewerRef.current.resetThemes([
      "Vintage",
      "Pro Light",
      "Pro Dark",
      "Vaporwave",
      "Solarized",
      "Solarized Dark",
      "Monokai",
    ]);
    await perspectiveViewerRef.current.restore(config);
    const datagridShadowRoot = perspectiveViewerRef.current?.shadowRoot;
    if (datagridShadowRoot) {
      const exportButton = datagridShadowRoot.getElementById("export");
      if (!exportButton) {
        return;
      }
      exportButton.removeEventListener("click", downloadAsCSV);
      exportButton.addEventListener("click", downloadAsCSV);
    }
    updateCustomStyles(perspectiveTheme);
    perspectiveViewerRef.current.addEventListener(
      "perspective-config-update",
      (event) => {
        const ev = event as CustomEvent<PerspectiveViewerConfig>;
        panelLogger.log("perspective-config-update", ev.detail);
        if (ev.detail.theme) {
          updateCustomStyles(ev.detail.theme);
          executeRequestInAsync("updateConfig", {
            perspectiveTheme: ev.detail.theme,
          });
          dispatch(setPerspectiveTheme(ev.detail.theme));
        }
      },
    );
    setTableRendered(true);
  };

  useEffect(() => {
    loadPerspectiveData().catch((err) => panelLogger.error(err));

    return () => {
      perspectiveViewerRef.current
        ?.getTable()
        .then((table) => table.delete())
        .catch((err) =>
          panelLogger.error("error while deleting perspective table", err),
        );
      perspectiveViewerRef.current
        ?.delete()
        .catch((err) =>
          panelLogger.error("error while deleting perspective viewer", err),
        );
    };
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
      style={styles}
    ></perspective-viewer>
  );
};

export default PerspectiveViewer;
