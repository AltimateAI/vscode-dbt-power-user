import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { IconButton } from "@uicore";

interface Props {
  query: string;
  label: string;
  mode?: "modify" | "translate";
}

const ModifyWithAltimateButton = ({
  query,
  label,
  mode = "modify",
}: Props): JSX.Element => {
  const handleClick = () => {
    const verb = mode === "translate" ? "Translate" : "Modify";
    const instruction =
      mode === "translate"
        ? "Translate this SQL to a different dialect I'll specify, preserving semantics."
        : "Help me modify this SQL — ask what I want to change, then rewrite it.";
    const initialMessage = `${instruction}\n\nOriginal query (${label}):\n\`\`\`sql\n${query}\n\`\`\``;
    executeRequestInAsync("openAltimateChat", {
      initialMessage,
      title: `${verb}: ${label}`,
    });
  };
  return (
    <IconButton
      title={
        mode === "translate"
          ? "Translate with Altimate"
          : "Modify with Altimate"
      }
      onClick={handleClick}
      data-testid={`query-row-${mode}-with-altimate`}
    >
      <span style={{ fontSize: 11, fontWeight: 600 }}>
        {mode === "translate" ? "Tr" : "AI"}
      </span>
    </IconButton>
  );
};

export default ModifyWithAltimateButton;
