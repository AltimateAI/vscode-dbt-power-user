---
title: "About dbt debug command"
sidebar_label: "debug"
id: "debug"
---

`dbt debug` is a utility function to test the database connection and display information for debugging purposes, such as the validity of your project file and your installation of any requisite dependencies (like `git` when you run `dbt deps`).

\*Note: Not to be confused with [debug-level logging](/reference/global-configs/about-global-configs#debug-level-logging) via the `--debug` option which increases verbosity.

### Example usage

Show the configured location for the `profiles.yml` file and exit:

```text
$ dbt debug --config-dir
To view your profiles.yml file, run:

open /Users/alice/.dbt
```
