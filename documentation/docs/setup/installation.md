/// admonition | The Power User extension is also available on Cursor! [click here](https://www.cursor.com/how-to-install-extension) for info on how to install the [Power User extension](https://marketplace.visualstudio.com/items?itemName=innoverio.vscode-dbt-power-user) for Cursor.
type: info
///

There are a few different ways in which extension can be installed.
You can install it natively or in a dev container.

## Install the extension natively

You can install the extension from VSCode directly or from the [marketplace](https://marketplace.visualstudio.com/items?itemName=innoverio.vscode-dbt-power-user)

/// details | Here's how to install the extension in VSCode

<interactive demo for installing the extension>

<div style="position: relative; padding-bottom: calc(57.25% + 44px); height: 0;"><iframe src=https://app.supademo.com/embed/clpbwiqry0jb7penezw0wwz31 frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

///

/// admonition | Need to setup environment variables? Refer to this [section](https://docs.myaltimate.com/setup/optConfig/#environment-variables-setup)
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
