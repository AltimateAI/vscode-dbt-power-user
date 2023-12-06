The extension supports environment variables in various ways

### Environment variables setup outside of Visual Code (.zshrc, .bashrc, ...)

These environment variables will be passed to all operations of the extension. Note that the environment variable should be valid for all your dbt projects. For example DBT_PROFILES_DIR can be set to ., that way dbt will lookup the profiles.yaml file inside the root of the dbt project.

### Environment variables through python.envFile

The extension also loads an environment variable definitions file identified by the python.envFile setting. The default value of this setting is `${workspaceFolder}/.env`.

This way supports all Visual Code variable substitution patterns and is a best practice. Read all about [environment variables](https://code.visualstudio.com/docs/python/environments#_environment-variables) supported by the Visual Code Python extension

### Environment variables setup for the terminal

The extension will read any VSCode configurations in .vscode/settings.json and pass them to all operations of the extension:

```
"terminal.integrated.env.[osx|windows|linux]": {
    "DBT_PROFILES_DIR": "."
}

```

Note: Visual Code variable substitution is not supported except the environment variable pattern ${env:*} and ${workspaceFolder}.
