# About dbt debug command

`dbt environment show` is a utility function to test the database connection and display information for debugging purposes, such as the validity of your cloud project configuration.

### Example usage

```
$ dbt environment show
```

When you press the "Validate Project" button, the console window should display an output similar to the one illustrated below.

```
Local Configuration:
  Active account ID              225
  Active project ID              125
  Active host name               emea.dbt.com
  dbt_cloud.yml file path        /Users/.../.dbt/dbt_cloud.yml
  dbt_project.yml file path      /Users/.../src/personal/jaffle_shop_original/dbt_project.yml
  dbt Cloud CLI version          0.36.7
  OS info                        darwin arm64
Cloud Configuration:
  Account ID                     317
  Project ID                     3805
  Project name                   Analytics
  Environment ID                 7253
  Environment name               Development
  Defer environment ID           [N/A]
  dbt version                    1.7.0-latest
  Target name                    default
  Connection type                snowflake
Snowflake Connection Details:
  Account                        myacount
  Warehouse                      COMPUTE_WH
  Database                       analytics
  Schema                         jaffle_shop
  Role                           DEV
  User                           myuser
  Client session keep alive      false
```
