import { useLayoutEffect, useRef, useState } from "react";
import styles from "./staleGraphChip.module.scss";

// Whether dbt's message has more lines than the capped block shows. It's
// measured from the text's own height against the cap's lines, not against the
// box, so the cut (which changes the box's padding) can't change the answer.
const overflowsCap = (pre: HTMLPreElement): boolean => {
  const style = (pre.ownerDocument.defaultView ?? window).getComputedStyle(pre);
  const lines = parseFloat(style.getPropertyValue("--dbt-message-lines"));
  const lineHeight = parseFloat(style.lineHeight);
  if (!(lines > 0) || !(lineHeight > 0)) {
    return pre.scrollHeight > pre.clientHeight + 1;
  }
  const textHeight =
    pre.scrollHeight -
    parseFloat(style.paddingTop) -
    parseFloat(style.paddingBottom);
  return textHeight > lines * lineHeight + 1;
};

// dbt's own message, verbatim, in a monospace block that wraps. Long messages
// are capped at about six lines with "Show more". `collapsed` starts the block
// hidden behind a "Show dbt's message" toggle.
const DbtMessageBlock = ({
  message,
  collapsed = false,
}: {
  message: string;
  collapsed?: boolean;
}): JSX.Element => {
  const [open, setOpen] = useState(!collapsed);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  useLayoutEffect(() => {
    const pre = preRef.current;
    if (!pre || expanded) {
      return;
    }
    const measure = () => setOverflows(overflowsCap(pre));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(pre);
    return () => observer.disconnect();
  }, [message, open, expanded]);

  if (!open) {
    return (
      <button
        type="button"
        className={styles.linkButton}
        onClick={() => setOpen(true)}
      >
        <i className="codicon codicon-chevron-right" />
        Show dbt&apos;s message
      </button>
    );
  }

  return (
    <div className={styles.dbtMessage}>
      <pre
        ref={preRef}
        className={
          expanded
            ? undefined
            : `${styles.dbtMessageCapped} ${overflows ? styles.dbtMessageCut : ""}`
        }
      >
        {message}
      </pre>
      {overflows || expanded ? (
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      ) : null}
    </div>
  );
};

export default DbtMessageBlock;
