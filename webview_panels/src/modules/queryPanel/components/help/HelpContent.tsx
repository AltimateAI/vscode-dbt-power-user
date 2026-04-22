import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { Button } from "@uicore";

const DOCS_URL = "https://docs.myaltimate.com/teammates/altimate-code/";

const HelpContent = (): JSX.Element => {
  const openChat = () => {
    executeRequestInAsync("openAltimateCodeChat", {});
  };

  const openDocs = () => {
    executeRequestInAsync("openUrl", { url: DOCS_URL });
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <p style={{ fontSize: 13, lineHeight: 1.55, marginBottom: "0.75rem" }}>
        We recently launched <strong>Altimate Code</strong> — chat with it right
        inside VS Code.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Button color="primary" onClick={openChat}>
          Open chat
        </Button>
        <Button color="secondary" onClick={openDocs}>
          Learn More
        </Button>
      </div>
      <p style={{ fontSize: 12, opacity: 0.75, margin: 0 }}>
        #1 on ADE-Bench · 10M free tokens across GPT-5.4, Opus 4.6 &amp; Sonnet
        4.6.
      </p>
    </div>
  );
};

export default HelpContent;
