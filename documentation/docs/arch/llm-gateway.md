---
status: new
---

# Altimate LLM Gateway

The Altimate LLM Gateway is a managed LLM service that gives you access to the best AI models — **60-80% cheaper** than buying tokens directly from providers. No API keys to manage, no billing across multiple providers, no rate limits to worry about.

## How It Works

The gateway dynamically routes each request to the best model for the task across **Sonnet 4.6, Opus 4.6, GPT-5.4, GPT-5.3, and GPT-5.4-mini**. You pay a flat token price regardless of which model handles your request — no surprise bills from expensive model routing.

## Pricing

| Plan | Price | Tokens/mo | $/M tokens | Overage (per 1M tokens) |
|------|-------|-----------|------------|------------------------|
| **Community** | $0/mo | 10M (one-time) | Free | BYOK only |
| **Pro Tier 1** | $29/mo | 20M | $1.45 | $5/M tokens |
| **Pro Tier 2** | $89/mo | 70M | $1.27 | $3/M tokens |
| **Enterprise** | Custom | Custom | Custom | Negotiated |

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

## BYOK vs. Gateway

| | BYOK (Bring Your Own Key) | Altimate LLM Gateway |
|---|---|---|
| **Cost** | Free and unlimited | Token-based pricing (10M tokens free) |
| **API Keys** | You manage your own keys | No keys needed |
| **Models** | Any model from your provider | Dynamic routing across best-in-class models |
| **Data Path** | Direct to your provider — Altimate never sees it | Through Altimate — see [Security FAQ](faq.md#llm-ai-security) for data handling details |
| **Best For** | Users with existing API keys or strict data residency requirements | Users who want simplicity and cost savings |

Both options are always available. You can use BYOK and the gateway side by side.

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

### Data Handling

- **Your data is not used to train, fine-tune, or improve any models.**
- The gateway stores limited metadata (token counts, latency, model used) for billing and routing.
- A small number of prompts are sampled for anonymous categorization to improve routing. See [Security FAQ](faq.md#llm-ai-security) for full details.

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
