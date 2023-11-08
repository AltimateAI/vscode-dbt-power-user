# About dbt debug command

`dbt debug` is a utility function to test the database connection and display information for debugging purposes, such as the validity of your project file and your installation of any requisite dependencies (like `git` when you run `dbt deps`).

### Example usage

Show the configured location for the `profiles.yml` file and exit:

```
$ dbt debug --config-dir
To view your profiles.yml file, run:

open /Users/alice/.dbt
```

When you press the "Validate Project" button, the console window should display an output similar to the one illustrated below.

```
19:08:24  Running with dbt=1.6.5
19:08:24  dbt version: 1.6.5
19:08:24  python version: 3.9.4
19:08:24  python path: /Users/power-user/.pyenv/versions/3.9.4/bin/python
19:08:24  os info: macOS-14.0-arm64-arm-64bit
19:08:25  Using profiles dir at /Users/power-user/.dbt
19:08:25  Using profiles.yml file at /Users/power-user/.dbt/profiles.yml
19:08:25  Using dbt_project.yml file at /Users/power-user/codebase/all_dbt_projects/dbt_project_sample/dbt_project.yml
19:08:25  adapter type: snowflake
19:08:25  adapter version: 1.6.4
19:08:25  Configuration:
19:08:25    profiles.yml file [OK found and valid]
19:08:25    dbt_project.yml file [OK found and valid]
19:08:25  Required dependencies:
19:08:25   - git [OK found]
19:08:25  Connection:
19:08:25    account: test-account
19:08:25    user: poweruser
19:08:25    database: analytics
19:08:25    warehouse: COMPUTE_WH
19:08:25    role: ACCOUNTADMIN
19:08:25    schema: sampledata
19:08:25    retry_on_database_errors: False
19:08:25    retry_all: False
19:08:25    insecure_mode: False
19:08:25    reuse_connections: None
19:08:25  Registered adapter: snowflake=1.6.4
19:08:26    Connection test: [OK connection ok]
19:08:26  All checks passed!

```
