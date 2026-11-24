---
title: Click to Run dbt Models — Power User for dbt
description: "Run dbt models, tests, and commands with a single click from the editor toolbar in Power User for dbt."
---

There are two methods to do it. You can either do it from the top right corner toolbar or from the extension side pane

### Method 1: Build and run models from the toolbar

The toolbar action to build models is present on the top right corner of the VSCode as shown in the image below:

![buildRunModels](images/buildRunModels.png)

### Method 2: Run models from the side panel

![extensionPanel](images/extensionPanel.gif)

/// admonition | You cannot build models from the side panel
    type: info

///

## When a build fails

When `dbt build`, `dbt run`, or `dbt test` fails, the extension surfaces a **Fix with Altimate Code** button so you can jump straight into AI-assisted debugging without copying error text by hand.

There are three places the button appears:

| Failure point | Where you see it | Prompt sent to Altimate Code |
|---|---|---|
| Model fails at runtime (`run_results.json` contains an error) | Notification: *dbt: `my_model` failed* | Run command + failed resource names/types + error messages |
| dbt exits **before** generating `run_results.json` (broken `ref()`, missing node, config error) | Notification: *dbt command failed: `dbt run --select my_model`* | Exact dbt CLI command (machine paths stripped) + full stderr |
| Failed model / seed / snapshot in the **Run History** panel | Inline 💡 **Fix with Altimate Code** action on the failed row | Run command first, error in a fenced code block |


![Failure toast on a dbt run with the "Fix with Altimate Code" button](images/fixWithAltimateRunFailure.png)

![Run History panel — failed model row with the inline 💡 "Fix with Altimate Code" action](images/fixWithAltimateRunHistory.png)

![Failed test row in Run History showing the inline ✨ "Explain why this test failed" action](images/fixWithAltimateRunTestFailure.png)

## Watch the Video

<figure class="video-clip">
<div class="video-clip__frame"><iframe src="https://www.youtube.com/embed/1yWejM5YW1o?rel=0&amp;start=112" title="Power User multiple features demo" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
<figcaption>Video (44:55): Power User multiple features demo. It starts at 1:52, where this page's feature begins. <a href="https://www.youtube.com/watch?v=1yWejM5YW1o&amp;t=112s" target="_blank" rel="noopener">Watch on YouTube</a>.</figcaption>
</figure>
