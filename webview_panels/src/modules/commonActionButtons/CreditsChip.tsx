import useAppContext from "@modules/app/useAppContext";
import { vscode } from "@modules/vscode";

// Thresholds for the balance-based color state.
const LOW = 10;
const MEDIUM = 25;

// Inline styles are used (instead of Tailwind) because this chip renders in the
// Documentation Editor, Query, Insights and Lineage panels, and the Tailwind
// globals are only imported by the Lineage view — so utility classes would not
// apply in the other panels.
const getColors = (
  credits: number,
): { color: string; background: string; border: string } => {
  if (credits < LOW) {
    // red
    return {
      color: "#f14c4c",
      background: "rgba(241, 76, 76, 0.12)",
      border: "rgba(241, 76, 76, 0.4)",
    };
  }
  if (credits < MEDIUM) {
    // yellow
    return {
      color: "#e2b93d",
      background: "rgba(226, 185, 61, 0.12)",
      border: "rgba(226, 185, 61, 0.4)",
    };
  }
  // green
  return {
    color: "#4ec971",
    background: "rgba(78, 201, 113, 0.12)",
    border: "rgba(78, 201, 113, 0.4)",
  };
};

const CreditsChip = (): JSX.Element | null => {
  const {
    state: { availableExecutions },
  } = useAppContext();

  if (availableExecutions === null) {
    return null;
  }

  const { color, background, border } = getColors(availableExecutions);

  // Out of credits (0 or overage-negative) => clicking opens the out-of-credits
  // popup. With credits remaining, the chip is just a status indicator and does
  // not nag the user with the "you're out of credits" popup.
  const isOut = availableExecutions <= 0;

  const tooltip = isOut
    ? "You're out of Altimate AI credits — click for options to get more"
    : `${availableExecutions} Altimate AI credits remaining. Credits are spent by AI features (e.g. SQL visualization, documentation and test generation).`;

  const handleClick = () => {
    if (!isOut) {
      return;
    }
    // Surface the central out-of-credits popup ("Need more credits?") only when
    // the user actually has no credits left.
    vscode.postMessage({ command: "showCreditsExhausted" });
  };

  return (
    <div
      title={tooltip}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        height: 30,
        boxSizing: "border-box",
        padding: "0 10px",
        borderRadius: 4,
        border: `1px solid ${border}`,
        background,
        color,
        fontSize: 11,
        lineHeight: "16px",
        fontWeight: 500,
        whiteSpace: "nowrap",
        userSelect: "none",
        cursor: isOut ? "pointer" : "default",
      }}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 8h4M8 6v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {availableExecutions} credit{availableExecutions === 1 ? "" : "s"}
    </div>
  );
};

export default CreditsChip;
