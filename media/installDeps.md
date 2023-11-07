# About dbt deps command

`dbt deps` pulls the most recent version of the dependencies listed in your `packages.yml` from git. See [Package-Management](/docs/build/packages) for more information.

Where relevant, dbt will display up to date and/or latest versions of packages that are listed on dbt Hub. Example below.

> This does NOT apply to packages that are installed via git/local

```yaml
packages:
  - package: dbt-labs/dbt_utils
    version: 0.7.1
  - package: brooklyn-data/dbt_artifacts
    version: 1.2.0
    install-prerelease: true
  - package: calogica/dbt_expectations
    version: 0.4.1
  - git: https://github.com/dbt-labs/dbt-audit-helper.git
    revision: 0.4.0
  - git: "https://github.com/dbt-labs/dbt-labs-experimental-features" # git URL
    subdirectory: "materialized-views" # name of subdirectory containing `dbt_project.yml`
    revision: 0.0.1
  - package: dbt-labs/snowplow
    version: 0.13.0
```

When you press the "Run dbt deps" button, the console window should display an output similar to the one illustrated below.

```
Installing dbt-labs/dbt_utils@0.7.1
  Installed from version 0.7.1
  Up to date!
Installing calogica/dbt_expectations@0.4.1
  Installed from version 0.4.1
  Up to date!
Installing https://github.com/dbt-labs/dbt-audit-helper.git@0.4.0
  Installed from revision 0.4.0
Installing https://github.com/dbt-labs/dbt-labs-experimental-features@0.0.1
  Installed from revision 0.0.1
   and subdirectory materialized-views
Installing dbt-labs/snowplow@0.13.0
  Installed from version 0.13.0
  Updated version available: 0.13.1
Installing calogica/dbt_date@0.4.0
  Installed from version 0.4.0
  Up to date!

Updates available for packages: ['tailsdotcom/dbt_artifacts', 'dbt-labs/snowplow']
Update your versions in packages.yml, then run dbt deps
```
