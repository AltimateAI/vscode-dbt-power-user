import useAppContext from "@modules/app/useAppContext";
import { vscode } from "@modules/vscode";

const BILLING_URL = "https://app.myaltimate.com/settings/credits?tab=plans";

const CreditsChip = (): JSX.Element | null => {
  const {
    state: { availableExecutions },
  } = useAppContext();

  if (availableExecutions === null) {
    return null;
  }

  const handleClick = () => {
    vscode.postMessage({ command: "openURL", url: BILLING_URL });
  };

  return (
    <div
      title="Manage credits"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        fontSize: "11px",
        opacity: 0.7,
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {availableExecutions} credits left
    </div>
  );
};

export default CreditsChip;
