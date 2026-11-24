---
title: Setup dbt Docs & Lineage UI — Power User for dbt
description: "Configure the SaaS UI to visualize dbt documentation and lineage graphs for your project in Power User for dbt. Pick dbt Core or dbt Cloud."
---

Power User for dbt supports both **dbt Core** and **dbt Cloud**. Pick the integration that matches your dbt setup:

- [Setup dbt Core](/discover/setupui-dbt-core/) — ship `manifest.json` and `catalog.json` from your dbt Core project to the SaaS UI using the DataPilot CLI.
- [Setup dbt Cloud](/discover/setupui-dbt-cloud/) — connect dbt Cloud to Altimate with a service token for automatic artifact syncing.

Both flows power the same downstream experience in the SaaS UI: dbt documentation and column-level lineage.

/// admonition | Please note that this lineage and documentation in UI functionality is not yet supported with dbt 1.8
    type: info
///
