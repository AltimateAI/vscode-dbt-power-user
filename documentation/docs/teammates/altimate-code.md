# Altimate Code in IDE

## What is Altimate Code?

[Altimate Code](https://docs.altimate.sh) is the open-source data engineering harness with 100+ deterministic tools for building, validating, optimizing, and shipping data products. It brings AI-powered data engineering directly into your IDE through the Datamates extension, or can be used standalone via CLI and TUI.

## Getting Started in Your IDE

### Install the Datamates Extension

- **VS Code** — [Microsoft Marketplace](https://marketplace.visualstudio.com/items?itemName=altimateai.vscode-altimate-mcp-server)
- **Cursor / other VS Code-compatible editors** — [Open VSX Registry](https://open-vsx.org/extension/altimateai/vscode-altimate-mcp-server)

### Open Altimate Code Chat

1. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux) to open the command palette
2. Type `Datamates`
3. Select **Datamates: Open Altimate Code Chat**

This opens the Altimate Code chat panel where you can interact with agents and run data engineering tools.

## Features

### Agent Modes

Altimate Code provides three agent modes to match your workflow:

| Mode | Access Level | Use Case |
|------|-------------|----------|
| **Builder** | Full read/write | Scaffolding dbt projects, writing models, generating tests and docs |
| **Analyst** | Read-only | Exploring schemas, running queries, analyzing lineage |
| **Plan** | Minimal access | Planning changes, reviewing impact before execution |

### 100+ Data Engineering Tools

- **SQL Tools** — Validation without execution, query optimization, anti-pattern detection, dialect translation, PII scanning
- **dbt Tools** — Model generation, test generation, documentation generation, project scaffolding, troubleshooting
- **Lineage Tools** — Column-level lineage, impact analysis, downstream dependency tracking
- **Schema Tools** — Schema exploration, table/column discovery, metadata indexing
- **FinOps Tools** — Cost analysis, warehouse spend reports, optimization recommendations
- **Warehouse Tools** — Direct query execution, result preview, connection management

## LLM Access

Two options for powering the AI chat:

- **BYOK (Bring Your Own Key)** — Free and unlimited. Use any of 35+ supported providers (Anthropic, OpenAI, AWS Bedrock, Azure OpenAI, Google, Ollama, and more)
- **[Altimate LLM Gateway](../arch/llm-gateway.md)** — Managed LLM access with dynamic routing across Sonnet 4.6, Opus 4.6, GPT-5.4, GPT-5.3, and more. 10M tokens free to get started — no API keys to manage

## Standalone Usage

Altimate Code can also be used outside the IDE:

| Interface | Description |
|-----------|-------------|
| **TUI** | Interactive terminal UI — `altimate` |
| **CLI** | Command-line for scripting — `altimate run` |
| **Web UI** | Browser-based interface — `altimate web` |
| **CI/CD** | Headless mode for pipelines — `altimate check` |
| **GitHub/GitLab** | Automated PR review and issue triage |

Install standalone:

```bash
npm install -g altimate-code
```

## Full Documentation

- **Altimate Code docs** — [docs.altimate.sh](https://docs.altimate.sh)
- **Datamates docs** — [datamates-docs.myaltimate.com](https://datamates-docs.myaltimate.com/)
