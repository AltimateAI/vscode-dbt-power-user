import perspective, { TableData } from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import {
  HTMLPerspectiveViewerElement,
  PerspectiveViewerConfig,
} from "@finos/perspective-viewer";
import "@finos/perspective-viewer/dist/css/solarized.css";
import { useEffect, useRef } from "react";
import { panelLogger } from "@modules/logger";

interface Props {
  data: TableData;
}
const PerspectiveViewer = ({ data }: Props): JSX.Element => {
  const loadPerspectiveData = async () => {
    const config: PerspectiveViewerConfig = {
      theme: "Solarized",
    };
    const table = await perspective.worker().table(data);
    await perspectiveViewerRef.current?.load(table);
    await perspectiveViewerRef.current?.restore(config);
  };
  useEffect(() => {
    loadPerspectiveData().catch((err) => panelLogger.error(err));
  }, []);
  const perspectiveViewerRef = useRef<HTMLPerspectiveViewerElement>(null);

  return (
    <perspective-viewer
      style={{ minHeight: 100 }}
      ref={perspectiveViewerRef}
    ></perspective-viewer>
  );
};

export default PerspectiveViewer;
