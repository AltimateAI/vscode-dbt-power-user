---
title: Power User for dbt
description: "Power User for dbt is the best VS Code extension for dbt. Develop, test, document, and optimize dbt and SQL 3× faster."
hide:
  - toc
---

<div class="ak-eyebrow">Power User for dbt</div>

# Best dbt extension for VS Code / Cursor.

<p class="ak-sub">
Develop, test, document and optimize dbt and SQL <strong>3× faster</strong> with autocomplete, lineage, query preview, test and doc generation, and AI teammates.
</p>

<div class="ak-cta-row">
  <a class="ak-btn ak-btn-primary" href="/setup/installation/">Install the extension</a>
  <a class="ak-btn ak-btn-secondary" href="/setup/faq/">Read the FAQ</a>
</div>

## Datamates with AI Teammates

The Power User extension is part of the [Datamates Platform](/datamates/user-guide/home/). Datamates automates and accelerates data teams across platform engineering, data engineering, and analytics engineering through purpose-built AI teammates.

These teammates are available directly inside the extension, covering dbt model, doc, and test generation to SQL translation and explanation. They can be coached and personalized for your specific requirements. See [coaching AI teammates](./teammates/coach.md) to get started.

<div class="nt-cards nt-grid cols-3" markdown>

<div class="nt-card" markdown>
<div class="nt-card-content" markdown>
<div class="ak-card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
</div>

### [Setup](/setup/installation/)

Install the extension and configure dbt Core, Cloud or Fusion.

</div>
</div>

<div class="nt-card" markdown>
<div class="nt-card-content" markdown>
<div class="ak-card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
</div>

### [Develop](/develop/autocomplete/)

Autocomplete, compiled SQL, model generation, optimize and translate.

</div>
</div>

<div class="nt-card" markdown>
<div class="nt-card-content" markdown>
<div class="ak-card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
</div>

### [Test](/test/queryResults/)

Query results, CTEs, the SQL visualizer, tests and column lineage.

</div>
</div>

<div class="nt-card" markdown>
<div class="nt-card-content" markdown>
<div class="ak-card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
</div>

### [Document](/document/write/)

Write and generate documentation, with doc-block support.

</div>
</div>

<div class="nt-card" markdown>
<div class="nt-card-content" markdown>
<div class="ak-card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
</div>

### [Collaborate](/govern/governance/)

Governance, notebooks, multi-project and query bookmarks.

</div>
</div>

<div class="nt-card" markdown>
<div class="nt-card-content" markdown>
<div class="ak-card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
</div>

### [Discover](/discover/setupui/)

Browser-based docs and column lineage from the SaaS UI.

</div>
</div>

</div>

## Feature Comparison

The extension works great out of the box. Add a free [Altimate API key](setup/reqdConfig.md#enable-saas-features-by-adding-api-key) to unlock the AI-powered features.

| Power User for dbt Extension                             | With Altimate AI Key                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [SQL Visualizer](test/sqlvisualizer)                     | [Datamates Platform](/datamates/user-guide/home/)                                     |
| [Data Lineage: Model Level](test/lineage/#model-lineage) | [Data Lineage: Column Level](test/lineage/#column-lineage)                            |
| [Auto-gen dbt from source](develop/genmodelsource)       | [Query Explanation AI](develop/explanation)                                           |
| [Auto-complete code](develop/autocomplete)               | [Query Translation AI](develop/translateSQL)                                          |
| [Click to Run Models](develop/clicktorun)                | [Auto-gen dbt from SQL](develop/genmodelSQL)                                          |
| [Compiled SQL preview](develop/compiledCode)             | [Tests Generation AI](test/writetests)                                                |
| [Preview query results](test/queryResults)               | [Documentation Generation AI](document/generatedoc)                                   |
| [Defer to prod](test/defertoprod)                        | [Coach & Personalize AI Teammates](teammates/coach)                                   |
| [SQL validation without execution](test/sqlvalidation)   | [Code Collaboration](govern/collaboration#start-a-discussion)                         |
| —                                                        | [Documentation Collaboration](govern/collaboration#start-a-discussion_1)              |
| —                                                        | [Data Lineage Export](govern/collaboration#lineage-export-workflow)                   |
| —                                                        | [Data Lineage SaaS UI](govern/collaboration#view-lineage-in-saas)                     |
| —                                                        | [Project Governance: VS Code](govern/governance#configure-checks)                     |
| —                                                        | [Project Governance: CI/CD](govern/governance#available-via-extension-python-package) |
| —                                                        | [Project Governance: SaaS UI](govern/governance#saas-configuration-of-checks)         |
| —                                                        | [dbt Docs SaaS UI](discover/viewlineage)                                              |
| —                                                        | [Query History & Bookmarks](govern/querybookmarks)                                    |
| —                                                        | [Query Sharing](govern/querybookmarks)                                                |

## Other Altimate products

- [Altimate Code](/code/) — The open-source data engineering harness.
- [Altimate MCP](/datamates/) — A local-first MCP server for your data stack.
- [Altimate Lite for Snowflake](/snowflake-native-app/) — More out of your Snowflake compute, without your data leaving your account.
- [Altimate Platform](https://altimate.ai/platform?utm_source=help-docs&utm_medium=referral&utm_campaign=docs-inline-link) — Enterprise cost optimization for [Snowflake](https://altimate.ai/use-cases/altimate-for-snowflake?utm_source=help-docs&utm_medium=referral&utm_campaign=docs-inline-link) and [Databricks](https://altimate.ai/use-cases/altimate-for-databricks?utm_source=help-docs&utm_medium=referral&utm_campaign=docs-inline-link).

## Support

The extension and Datamates Platform are developed and maintained by [Altimate AI](https://www.altimate.ai?utm_source=help-docs&utm_medium=referral&utm_campaign=docs-inline-link). Join the dbt Community Slack channel [#tools-dbt-power-user](https://getdbt.slack.com/archives/C05KPDGRMDW) to connect with other users.

If you run into issues, [contact us](https://www.altimate.ai/support?utm_source=help-docs&utm_medium=referral&utm_campaign=docs-inline-link) via Slack or chat.
