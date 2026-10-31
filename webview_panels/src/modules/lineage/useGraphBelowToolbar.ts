import { useEffect, useRef, useState } from "react";
import styles from "./lineage.module.scss";

const GAP = 8;

// While the banner shows, the graph starts below the floating toolbar, so the
// toolbar can't cover a node of the older graph. The toolbar wraps on narrow
// panels, so its height is measured, not assumed. `fitGraph` fits the graph
// to its pane. Returns the toolbar's bottom edge plus a gap in px, or
// undefined when the graph keeps the whole area.
export const useGraphBelowToolbar = (
  active: boolean,
  fitGraph: () => void,
): number | undefined => {
  const [offset, setOffset] = useState<number>();

  useEffect(() => {
    if (!active) {
      setOffset(undefined);
      return;
    }
    const toolbar = document.querySelector<HTMLElement>(
      `.${styles.actionWidget}`,
    );
    if (!toolbar) {
      return;
    }
    const measure = () =>
      setOffset(toolbar.offsetTop + toolbar.offsetHeight + GAP);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, [active]);

  // While the banner shows, refit whenever the graph's pane changes size: it
  // moves down under the banner and toolbar, and the banner wraps with width.
  // When the banner clears, refit once into the whole area. Panels without a
  // banner keep the user's pan and zoom on resize, as before.
  const shown = offset !== undefined;
  const wasShown = useRef(false);
  useEffect(() => {
    const pane = document.querySelector<HTMLElement>(`.${styles.lineageWrap}`);
    if (!pane) {
      return;
    }
    let timer: number | undefined;
    // ReactFlow picks up the new pane size on its own resize callback first.
    const refit = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(fitGraph, 200);
    };
    if (!shown) {
      if (wasShown.current) {
        wasShown.current = false;
        refit();
      }
      return () => window.clearTimeout(timer);
    }
    wasShown.current = true;
    const observer = new ResizeObserver(refit);
    observer.observe(pane);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
    // An earlier fitGraph is as good as the latest: it reads the lineage ref.
  }, [shown]);

  return offset;
};
