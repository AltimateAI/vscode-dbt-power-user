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
