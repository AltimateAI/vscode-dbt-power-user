# vscode-dbt-power-user

![Last updated](https://img.shields.io/visual-studio-marketplace/last-updated/innoverio.vscode-dbt-power-user) ![Version](https://img.shields.io/visual-studio-marketplace/v/innoverio.vscode-dbt-power-user) ![Installs](https://img.shields.io/visual-studio-marketplace/i/innoverio.vscode-dbt-power-user) ![Build passing](https://github.com/innoverio/vscode-dbt-power-user/workflows/.github/workflows/ci.yml/badge.svg)

This extension makes vscode seamlessly work with [dbt](https://www.getdbt.com/).

Main features:

- Generate models from your source definitions
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

If you want to contribute to the extension, let us know and we will help set you up.

## How to setup the extension

### Associate your .sql files the jinja-sql language

You should associate your .sql files with the jinja-sql language by configuring in Preferences > Settings

![Associations](./media/images/associations.png)

or add the following in settings.json:

```
    "files.associations": {
        "*.sql": "jinja-sql"
    },
```

### Select the Python interpreter that has dbt installed

Ensure that the Python interpreter selection is always visible for ease of use:

![Enable python interpreter selection](./media/images/enable-python-interpreter-visibility.gif)

Make sure that you select the interpreter that has dbt installed. In my case it is virtual environment in the project itself.

![Select the right python interpreter](./media/images/select-python-interpreter.gif)

Avoid using the setting `dbt.dbtPythonPathOverride` unless using Meltano, the extension depends on the Python interpreter for visual code compatible environment variable parsing.

When you set the Python interpreter, the extension will try to detect dbt and you should be able to make use of the features listed below.

### Query results visualization

Your database may not support standard SQL LIMIT statements like `SELECT * from table LIMIT 10`.

You can override this default behaviour through `dbt.queryTemplate`.

Please make a PR if you find that you need to change `dbt.queryTemplate` for your favourite adapter and help the community.

#### `dbt.queryTemplate` for Oracle

Change to `select * from ({query}) where ROWNUM <= {limit}`

## Features at work

### Generate a model from your source definition (new)

![Generate a model from your source definition](./media/images/generate-model-from-source.gif)

### Visualize the result set of your model (Use CMD+ENTER (mac) or CTRL+ENTER (win))

![Use ctrl+enter or cmd+enter to retrieve the result set of your model](./media/images/visualize-result-set.gif)

### See the compiled query of your model (Use CMD+' (mac) or CTRL+' (win))

![Use ctrl+' or cmd+' to see the compiled sql of your model](./media/images/compile.gif)

### Execute model tests

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
