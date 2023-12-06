sqlfmt is SQL formatter that you can use with dbt-power-user VSCode extension so your dbt models are always correctly formatted.

### Install `sqlfmt`

Install sqlfmt through running `pip install 'shandy-sqlfmt[jinjafmt]'`. Find more about sqlfmt in their [docs](https://sqlfmt.com/).

### Configure `dbt.sqlFmtPath` or `dbt.sqlFmtAdditionalParams`

You can configure the path to sqlfmt through `dbt.sqlFmtPath` and you can configure additional parameters through `dbt.sqlFmtAdditionalParams`.

### Usage

Please select "dbt Power User" (extension id:`innoverio.vscode-dbt-power-user`) as the default formatter. You can do this either by using the context menu (right click on a open dbt model in the editor) and select "Format Document With...", or you can add the following to your settings:

```json
  "[jinja-sql]": {
    "editor.defaultFormatter": "innoverio.vscode-dbt-power-user"
  }

```

### Format on save

You can enable format on save for python by having the following values in your settings:

```json
  "[jinja-sql]": {
    "editor.defaultFormatter": "innoverio.vscode-dbt-power-user",
    "editor.formatOnSave": true
  }

```
