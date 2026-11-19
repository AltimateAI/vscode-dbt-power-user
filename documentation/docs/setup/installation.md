---
title: Install Power User for dbt — VS Code Extension
description: "Install Power User for dbt from the VS Code Marketplace or via the Altimate Workspaces extension. Step-by-step guide."
---

/// admonition | The [Altimate Workspaces extension](https://marketplace.visualstudio.com/items?itemName=altimateai.vscode-altimate-mcp-server) brings your workspace's integrations, knowledge, memory and skills to your editor's AI agent. [Learn more](https://help.altimate.ai/workspaces/).
///

There are a few different ways in which extension can be installed.
You can install it natively or in a dev container.

## Install the extension natively

You can install the extension from VSCode directly or from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=innoverio.vscode-dbt-power-user)

You can install the extension from Cursor or any other VSCode compatible editors directly or from the [Open VSX Registry](https://open-vsx.org/extension/innoverio/vscode-dbt-power-user)

/// admonition | Cursor IDE users: Installation may spin without progress
    type: warning

In Cursor versions before 3.11.13, installing a release before 0.70.0 from the Extensions view can spin with no progress or end with a "Failed to fetch" error. Update Cursor to 3.11.13 or later, install Power User 0.70.0 or later, or see [Cursor installation troubleshooting](cursor_installation_workaround.md) for other fixes.
///


/// details | Here's how to install the extension in VSCode

<interactive demo for installing the extension>

<div style="position: relative; padding-bottom: calc(57.25% + 44px); height: 0;"><iframe src=https://app.supademo.com/embed/clpbwiqry0jb7penezw0wwz31 frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

///

/// admonition | Need to setup environment variables? Refer to this [section](/setup/optConfig/#environment-variables-setup)
    type: warning
///

/// admonition | If you are seeing the message "Reload required", please reload the VSCode or restart the VSCode.
    type: info
///

## Install the extension in a dev container (or in codespaces)

You need to do the below steps only if you need to setup the extension in a devcontainer (or GitHub Codespaces)

Please add the following configuration in to your devcontainer.json file:

```
"customizations": {
        "vscode": {
                ...
                "files.associations": {
                    "*.yaml": "jinja-yaml",
                    "*.yml": "jinja-yaml",
                    "*.sql": "jinja-sql",
                    "*.md": "jinja-md"
                },
                ...
            },
            "extensions": [
                ...
                "innoverio.vscode-dbt-power-user",
                ...
            ]
        }
    }
```

/// admonition | Please do NOT forget to do required configuration based on your dbt setup: [dbt Core](reqdConfig.md), [dbt Cloud](reqdConfigCloud.md), or [dbt Fusion](reqdConfigFusion.md), and [optional configuration](optConfig.md)!!
    type: warning
///

## Watch the Video

<figure class="video-clip">
<div class="video-clip__frame"><iframe src="https://www.youtube.com/embed/1yWejM5YW1o?rel=0&amp;start=38" title="Power User multiple features demo" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
<figcaption>Video (44:55): Power User multiple features demo. It starts at 0:38, where this page's feature begins. <a href="https://www.youtube.com/watch?v=1yWejM5YW1o&amp;t=38s" target="_blank" rel="noopener">Watch on YouTube</a>.</figcaption>
</figure>
