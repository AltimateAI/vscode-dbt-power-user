# vscode-dbt-power-user

![Last updated](https://img.shields.io/visual-studio-marketplace/last-updated/innoverio.vscode-dbt-power-user) ![Version](https://img.shields.io/visual-studio-marketplace/v/innoverio.vscode-dbt-power-user) ![Installs](https://img.shields.io/visual-studio-marketplace/i/innoverio.vscode-dbt-power-user) ![Build passing](https://github.com/innoverio/vscode-dbt-power-user/workflows/.github/workflows/ci.yml/badge.svg) 

This extension makes vscode seamlessly work with [dbt](https://www.getdbt.com/).

Main features:
- Query result set visualization
- Execute all or individual model tests
- Go to the definition of any models, macro's and sources.
- Autocompletion of models, macros and sources
- Ability to run a model through the play button of the document
- dbt update notifications
- dbt logs viewer (force tailing)

This extension is using the Python extension to detect Python interpreters that are installed in standard locations. See [Python Environments](https://code.visualstudio.com/docs/languages/python#_environments).

This extension is fully compatible with the remote extension. See [Visual Studio Code Remote - Containers](https://code.visualstudio.com/docs/remote/containers) and [Visual Studio Code Remote - WSL](https://code.visualstudio.com/docs/remote/wsl).

Please let us know about any bugs or feature requests through the github issues.

This extension is sponsored by [innover.io](https://innover.io/).

Query visualization and compilation is powered by [dbt-osmosis](https://pypi.org/project/dbt-osmosis/).

## Features at work

### Visualize the result set of your model (new)

![Use ctrl+enter or cmd+enter to retrieve the result set of your model](./media/images/visualize-result-set.gif)

### See the compiled query of your model (new)

![Use ctrl+' or cmd+' to see the compiled sql of your model](./media/images/compile.gif)

### Execute model tests (new)

![Test your model](./media/images/tests.gif)

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
