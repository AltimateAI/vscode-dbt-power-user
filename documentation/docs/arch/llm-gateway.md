# Altimate LLM Gateway

The Altimate LLM Gateway is a managed LLM service that gives you access to the best AI models without managing API keys, billing, or rate limits across multiple providers.

## How It Works

The gateway dynamically routes each request to the best model for the task across **Sonnet 4.6, Opus 4.6, GPT-5.4, GPT-5.3, and GPT-5.4-mini**. You pay a flat token price regardless of which model handles your request — no surprise bills from expensive model routing.

## BYOK vs. Gateway

| | BYOK (Bring Your Own Key) | Altimate LLM Gateway |
|---|---|---|
| **Cost** | Free and unlimited | Token-based pricing (10M tokens free) |
| **API Keys** | You manage your own keys | No keys needed |
| **Models** | Any model from your provider | Dynamic routing across best-in-class models |
| **Data Path** | Direct to your provider — Altimate never sees it | Through Altimate with zero data retention |
| **Best For** | Users with existing API keys or strict data residency requirements | Users who want simplicity and cost savings |

Both options are always available. You can use BYOK and the gateway side by side.

## Pricing

| Plan | Price | Tokens/mo | Overage |
|------|-------|-----------|---------|
| **Community** | $0/mo | 10M (one-time grant) | BYOK only |
| **Pro Tier 1** | $29/mo | 20M | $8.50 per 1M tokens |
| **Pro Tier 2** | $89/mo | 60M | $7.50 per 1M tokens |
| **Pro Tier 3** | $249/mo | 90M | $5.00 per 1M tokens |
| **Enterprise** | Custom | Custom | Negotiated |

Tokens are counted as input + output combined. All tiers get access to all models — the upgrade incentive is volume, not capability.

## What Would This Cost You Directly?

Buying 20M tokens directly from providers:

| Model | Direct Cost (20M tokens) | With Altimate Pro Tier 1 | Savings |
|-------|--------------------------|--------------------------|---------|
| Sonnet 4.6 | ~$84 | **$29** | ~65% |
| Opus 4.6 | ~$140 | **$29** | ~79% |
| GPT-5.4 (short context) | ~$75 | **$29** | ~61% |
| GPT-5.4 (long context) | ~$135 | **$29** | ~79% |

With Altimate, you pay $29 flat regardless of which model handles your task. Buying the same 20M tokens directly from providers would cost $75-140 depending on the model — and you'd have to manage API keys, billing, and rate limits across multiple providers yourself.

## Models Available

The gateway routes across the following models based on task complexity, context length, and quality requirements:

| Model | Provider | Strengths |
|-------|----------|-----------|
| **Claude Sonnet 4.6** | Anthropic | Excellent price/performance for most data engineering tasks |
| **Claude Opus 4.6** | Anthropic | Highest quality for complex reasoning and analysis |
| **GPT-5.4** | OpenAI | Strong general-purpose capabilities |
| **GPT-5.3** | OpenAI | Cost-effective for simpler tasks |
| **GPT-5.4-mini** | OpenAI | Fast, lightweight tasks |

You don't choose the model — the gateway selects the optimal one for each request automatically.

## Security

The Altimate LLM Gateway is designed with enterprise security requirements in mind:

### Zero Data Retention

- **Prompts and responses are never stored.** Your code, SQL, schemas, and conversations pass through the gateway and are immediately discarded after the response is delivered.
- **No training on your data.** Your data is not used to train, fine-tune, or improve any models — not by Altimate, not by subprocessors.

### Subprocessors

The gateway routes requests through:

- **Azure Foundry** — with Zero Data Retention (ZDR) policy
- **AWS Bedrock** — with Zero Data Retention (ZDR) policy

Both subprocessors are contractually bound to not retain any request or response data.

### Metadata Collection

The gateway does store minimal metadata for each request:

| Metadata | Purpose |
|----------|---------|
| Number of prompt tokens | Usage tracking and billing |
| Number of completion tokens | Usage tracking and billing |
| Latency | Performance monitoring |
| Model used | Routing optimization |

This metadata is used solely to improve model ranking and routing for various tasks. **No prompts, responses, code, SQL, credentials, or PII are stored.**

### Compliance

- **SOC 2 Type II** certified
- **TLS 1.3** encryption for all data in transit
- AWS infrastructure in private VPC with network isolation
- IAM-based RBAC with MFA enforcement for developer access

/// admonition | If you need us to do a security review with your IT/security teams, please [contact us](https://www.altimate.ai/support) via chat or Slack.
    type: tip
///

## Getting Started

1. Install the [Datamates extension](https://marketplace.visualstudio.com/items?itemName=altimateai.vscode-altimate-mcp-server) in your IDE
2. Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and select **Datamates: Open Altimate Code Chat**
3. The Community plan with 10M free tokens is available immediately — no credit card required

To upgrade or manage your plan, visit the [Altimate pricing page](https://www.altimate.ai/pricing).
