import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import DbtMessageBlock from "./DbtMessageBlock";
import lineageStyles from "./lineage.module.scss";
import styles from "./staleGraphChip.module.scss";
import {
  LineageBannerAction,
  LineageBanner as LineageBannerState,
} from "./types";

// The toolbar's inset from the panel's edges, and the gap between the chip,
// the toolbar and the popover, in px.
const EDGE = 16;
const GAP = 8;
const POPOVER_GAP = 6;
const POPOVER_WIDTH = 440;
// Below this much room left of the toolbar, the chip moves under it. The icon,
// "Out of date", the chevron and the padding take about 145px.
const MIN_ROW_WIDTH = 160;

interface Placement {
  // The chip's top and widest size, relative to the panel.
  top: number;
  maxWidth: number;
  popoverWidth: number;
  popoverMaxHeight: number;
}

// The chip sits in the toolbar's row, left of the toolbar, when there's room
// for it there. On a panel too narrow for that it floats under the toolbar's
// row instead. Either way it floats over the graph like the toolbar does, so
// the graph keeps the whole panel.
const placeChip = (
  panel: { width: number; height: number },
  toolbar: { left: number; top: number; height: number },
  chipHeight: number,
): Placement => {
  const room = toolbar.left - EDGE - GAP;
  const inRow = room >= MIN_ROW_WIDTH;
  const top = inRow
    ? toolbar.top + Math.max(0, (toolbar.height - chipHeight) / 2)
    : toolbar.top + toolbar.height + GAP;
  return {
    top,
    maxWidth: inRow ? room : panel.width - 2 * EDGE,
    popoverWidth: Math.min(POPOVER_WIDTH, panel.width - 2 * EDGE),
    popoverMaxHeight: panel.height - top - chipHeight - POPOVER_GAP - EDGE,
  };
};

// Measures the toolbar and the panel, and places the chip again whenever
// either changes size. The toolbar is anchored right and its buttons mount
// after it, so its left edge moves with both.
const useChipPlacement = (
  chipRef: React.RefObject<HTMLElement>,
): Placement | undefined => {
  const [placement, setPlacement] = useState<Placement>();
  useLayoutEffect(() => {
    const chip = chipRef.current;
    const panel = chip?.closest<HTMLElement>(`.${lineageStyles.lineageView}`);
    const toolbar = panel?.querySelector<HTMLElement>(
      `.${lineageStyles.actionWidget}`,
    );
    if (!chip || !panel || !toolbar) {
      return;
    }
    const measure = () =>
      setPlacement(
        placeChip(
          { width: panel.clientWidth, height: panel.clientHeight },
          {
            left: toolbar.offsetLeft,
            top: toolbar.offsetTop,
            height: toolbar.offsetHeight,
          },
          chip.offsetHeight,
        ),
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, []);
  return placement;
};

const runAction = (action: LineageBannerAction) =>
  executeRequestInAsync("lineageBannerAction", {
    args: { action: action.id, params: action.args },
  });

// Says the drawn graph is out of date with a small chip beside the toolbar:
// "Out of date · last parse 2 hours ago". The chip opens a popover with why:
// the error's one line, dbt's message behind a toggle, and the buttons.
const StaleGraphChip = ({
  banner,
}: {
  banner: LineageBannerState;
}): JSX.Element => {
  const rootRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLButtonElement>(null);
  const placement = useChipPlacement(chipRef);
  const [open, setOpen] = useState(false);
  const popoverId = useId();
  const titleId = useId();

  // Escape or a click anywhere else closes the popover.
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        chipRef.current?.focus();
      }
    };
    // Capture phase: the graph's pane handles its own pointer events.
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles[banner.severity]}`}
      style={
        placement
          ? { top: placement.top }
          : // Hidden for the first layout pass, before it's measured.
            { top: EDGE, visibility: "hidden" }
      }
      data-testid="lineage-stale-graph"
    >
      <div role="status">
        <button
          ref={chipRef}
          type="button"
          className={styles.chip}
          style={placement ? { maxWidth: placement.maxWidth } : undefined}
          aria-expanded={open}
          aria-controls={open ? popoverId : undefined}
          title={banner.title}
          onClick={() => setOpen(!open)}
          data-testid="lineage-stale-graph-chip"
        >
          <i className={`codicon codicon-history ${styles.icon}`} />
          <span className={styles.chipLabel}>Out of date</span>
          {banner.age ? (
            <span className={styles.chipAge}>· {banner.age}</span>
          ) : null}
          <i
            className={`codicon codicon-chevron-${open ? "up" : "down"} ${styles.chevron}`}
          />
        </button>
      </div>
      {open ? (
        <section
          id={popoverId}
          role="dialog"
          aria-labelledby={titleId}
          className={styles.popover}
          style={
            placement
              ? {
                  width: placement.popoverWidth,
                  maxHeight: placement.popoverMaxHeight,
                }
              : undefined
          }
          data-testid="lineage-stale-graph-popover"
        >
          <p id={titleId} className={styles.title}>
            {banner.title}
          </p>
          <p className={styles.detail}>{banner.detail}</p>
          <DbtMessageBlock message={banner.dbtMessage} collapsed />
          <div className={styles.actions}>
            {banner.actions.map((action, index) => (
              <button
                key={action.id}
                type="button"
                className={
                  index === 0 ? styles.primaryButton : styles.secondaryButton
                }
                onClick={() => {
                  setOpen(false);
                  runAction(action);
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default StaleGraphChip;
