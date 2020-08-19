# vscode-dbt-power-user

![Last updated](https://img.shields.io/visual-studio-marketplace/last-updated/innoverio.vscode-dbt-power-user) ![Version](https://img.shields.io/visual-studio-marketplace/v/innoverio.vscode-dbt-power-user) ![Installs](https://img.shields.io/visual-studio-marketplace/i/innoverio.vscode-dbt-power-user) ![Build passing](https://github.com/innoverio/vscode-dbt-power-user/workflows/.github/workflows/ci.yml/badge.svg) 

This extension makes vscode seamlessly work with [dbt](https://www.getdbt.com/).

Main features:
- Go to the definition of any models, macro's and sources.
- Autocompletion of models, macros and sources
- Ability to run a model through the play button of the document

Please let us know about any bugs or feature requests through the github issues.

## Features at work

### Go to definition

![Go to model definition](./media/definition-model.gif)

![Go to macro definition](./media/definition-macro.gif)

![Go to source definition](./media/definition-source.gif)

### Autocompletion

![Autocomplete model](./media/autocomplete-model.gif)

![Autocomplete macro](./media/autocomplete-macro.gif)

![Autocomplete source](./media/autocomplete-source.gif)


## How to use the extension

You should associate your .sql files with the jinja-sql language by configuring in Preferences > Settings

![Associations](./media/associations.png)

or add the following in settings.json:

```
    "files.associations": {
        "*.sql": "jinja-sql"
    },
```
