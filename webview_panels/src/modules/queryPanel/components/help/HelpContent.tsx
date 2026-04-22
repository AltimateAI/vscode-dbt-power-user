import altimateCodeBannerFallback from "@assets/altimate-code-banner-sml.png";

declare global {
  interface Window {
    altimateCodeBannerUrl?: string;
  }
}

const HelpContent = (): JSX.Element => {
  const bannerUrl = window.altimateCodeBannerUrl ?? altimateCodeBannerFallback;
  return (
    <div style={{ maxWidth: 720 }}>
      <a
        href="https://docs.myaltimate.com/teammates/altimate-code/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={bannerUrl}
          alt="Altimate Code"
          style={{
            width: "100%",
            maxWidth: 480,
            height: "auto",
            display: "block",
            marginBottom: "1rem",
          }}
        />
      </a>
      <p style={{ fontSize: 13, lineHeight: 1.55, marginBottom: "0.75rem" }}>
        The open-source data engineering harness — 100+ deterministic tools for
        SQL, dbt, column-level lineage, FinOps, and warehouse connectivity,
        available in your IDE, terminal, and CI.
      </p>
      <ul
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          paddingLeft: "1.1rem",
          marginBottom: "0.75rem",
        }}
      >
        <li>
          <strong>#1 on ADE-Bench</strong> (74.4% pass rate) —{" "}
          <a
            href="https://www.altimate.sh/benchmarks"
            target="_blank"
            rel="noopener noreferrer"
          >
            see the benchmarks
          </a>
        </li>
        <li>
          <strong>10M free tokens</strong> across the best models via the
          Altimate LLM Gateway — GPT-5.4, Claude Opus 4.6, Claude Sonnet 4.6 (no
          API keys required)
        </li>
        <li>
          Or <strong>bring your own key</strong> — 35+ providers including
          Anthropic, OpenAI, Bedrock, Azure, Google, and Ollama
        </li>
      </ul>
      <p style={{ fontSize: 13 }}>
        <a
          href="https://app.myaltimate.com/register"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign up free
        </a>{" "}
        ·{" "}
        <a
          href="https://docs.myaltimate.com/teammates/altimate-code/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the docs
        </a>
      </p>
    </div>
  );
};

export default HelpContent;
