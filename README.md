# vscode-dbt-power-user

![Last updated](https://img.shields.io/visual-studio-marketplace/last-updated/innoverio.vscode-dbt-power-user) ![Version](https://img.shields.io/visual-studio-marketplace/v/innoverio.vscode-dbt-power-user) ![Installs](https://img.shields.io/visual-studio-marketplace/i/innoverio.vscode-dbt-power-user) ![Build passing](https://github.com/innoverio/vscode-dbt-power-user/workflows/.github/workflows/ci.yml/badge.svg) 

This extension makes vscode seamlessly work with [dbt](https://www.getdbt.com/).

Main features:
- Go to the definition of any models, macro's and sources.
- Autocompletion of models, macros and sources
- Ability to run a model through the play button of the document
- dbt update notifications
- dbt logs viewer (force tailing)

This extension is using the Python extension to detect Python interpreters that are installed in standard locations. See [Python Environments](https://code.visualstudio.com/docs/languages/python#_environments).

This extension is fully compatible with the remote extension. See [Visual Studio Code Remote - Containers](https://code.visualstudio.com/docs/remote/containers) and [Visual Studio Code Remote - WSL](https://code.visualstudio.com/docs/remote/wsl).

Please let us know about any bugs or feature requests through the github issues.

This extension is sponsored by [innover.io](https://innover.io/).

## Features at work
### See the model graph

![See the graph and execute parent or children models](./media/images/graph.gif)

### Go to definition

![Go to model definition](./media/images/definition-model.gif)

![Go to macro definition](./media/images/definition-macro.gif)

![Go to source definition](./media/images/definition-source.gif)

### Autocompletion

![Autocomplete model](./media/images/autocomplete-model.gif)

![Autocomplete macro](./media/images/autocomplete-macro.gif)

![Autocomplete source](./media/images/autocomplete-source.gif)

### dbt logs force tailing

![dbt logs](./media/images/dbt-log.gif)



## How to use the extension

You should associate your .sql files with the jinja-sql language by configuring in Preferences > Settings

![Associations](./media/images/associations.png)

or add the following in settings.json:

```
    "files.associations": {
        "*.sql": "jinja-sql"
    },
```
