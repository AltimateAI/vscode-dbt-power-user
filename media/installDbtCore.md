# About installing dbt Core

You can install dbt Core on the command line by using one of these methods:

- [Use pip to install dbt](/docs/core/pip-install) (recommended)
- [Use Homebrew to install dbt](/docs/core/homebrew-install)
- [Use a Docker image to install dbt](/docs/core/docker-install)
- [Install dbt from source](/docs/core/source-install)

:::tip Pro tip: Using the --help flag

Most command-line tools, including dbt, have a `--help` flag that you can use to show available commands and arguments. For example, you can use the `--help` flag with dbt in two ways:<br /><br />
&mdash; `dbt --help`: Lists the commands available for dbt<br />
&mdash; `dbt run --help`: Lists the flags available for the `run` command

:::

## Upgrading dbt Core

dbt provides a number of resources for understanding [general best practices](/blog/upgrade-dbt-without-fear) while upgrading your dbt project as well as detailed [migration guides](/docs/dbt-versions/core-upgrade/upgrading-to-v1.4) highlighting the changes required for each minor and major release, and [core versions](/docs/dbt-versions/core)

- [Upgrade Homebrew](/docs/core/homebrew-install#upgrading-dbt-and-your-adapter)
- [Upgrade `pip`](/docs/core/pip-install#change-dbt-core-versions)

## About dbt data platforms and adapters

dbt works with a number of different data platforms (databases, query engines, and other SQL-speaking technologies). It does this by using a dedicated _adapter_ for each. When you install dbt Core, you'll also want to install the specific adapter for your database. For more details, see [Supported Data Platforms](/docs/supported-data-platforms).
