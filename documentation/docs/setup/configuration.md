# Configuration Settings

This page provides a comprehensive overview of all available configuration settings in the dbt Power User extension. The settings are organized by category for easy reference.

## Core Settings

### dbt Integration Settings

#### dbt.dbtIntegration

- **Type**: string
- **Default**: "core"
- **Options**: ["core", "cloud", "fusion", "corecommand"]
- **Description**: Choose how you want to integrate with dbt. Use "core" for local dbt installations with Python bridge, "cloud" for dbt Cloud integration, "fusion" for dbt Fusion CLI integration, or "corecommand" for command-line based dbt core integration. This setting determines how the extension interacts with your dbt environment.

#### dbt.dbtPythonPathOverride

- **Type**: string
- **Description**: Specify a custom path to your Python executable or entrypoint. This is useful when you need to use a specific Python environment different from the VS Code Python extension's default. Most users should leave this empty and configure their Python environment through the VS Code Python extension instead.

#### dbt.dbtCustomRunnerImport

- **Type**: string
- **Default**: "from dbt.cli.main import dbtRunner"
- **Description**: Customize the Python import statement used to import the dbt runner. This is only applicable when using dbt core integration. Useful when you have a custom dbt implementation or need to use a specific dbt runner class.

#### dbt.installDepsOnProjectInitialization

- **Type**: boolean
- **Default**: true
- **Description**: Controls whether the extension automatically runs dbt deps when initializing a project. When enabled, the extension will automatically install all package dependencies specified in your packages.yml file when you first open a dbt project.

## Project Configuration

#### dbt.allowListFolders

- **Type**: array of strings
- **Default**: []
- **Description**: Specify which folders in your workspace should be considered for dbt operations. This is particularly useful in monorepos or workspaces with multiple dbt projects. Paths should be relative to the workspace root.

#### dbt.deferConfigPerProject

- **Type**: object
- **Description**: Configure how the extension handles model dependencies across environments.
- **Properties**:
  - `deferToProduction`: boolean - When true, allows running models without rebuilding parent models
  - `manifestPathForDeferral`: string - Path to the manifest file containing parent model information
  - `favorState`: boolean - When true, uses the deferred state even if the model exists in both environments

## Command Settings

#### dbt.runModelCommandAdditionalParams

- **Type**: array of strings
- **Default**: []
- **Description**: Add extra command-line parameters to all dbt run commands. Each parameter must be a separate array entry.

#### dbt.buildModelCommandAdditionalParams

- **Type**: array of strings
- **Default**: []
- **Description**: Add extra command-line parameters to all dbt build commands. Similar to runModelCommandAdditionalParams, but specifically for build commands.

## Query Settings

#### dbt.queryLimit

- **Type**: integer
- **Default**: 500
- **Minimum**: 1
- **Description**: Controls the maximum number of rows returned when using the Preview SQL Query command.

#### dbt.queryTemplate

- **Type**: string
- **Default**: "select from ({query}\n) as query limit {limit}"
- **Description**: Customize how preview queries are constructed. The template must include {query} and {limit} placeholders.

## UI/Display Settings

#### dbt.perspectiveTheme

- **Type**: string
- **Default**: "Vintage"
- **Options**: ["Vintage", "Pro Light", "Pro Dark", "Vaporwave", "Solarized", "Solarized Dark", "Monokai"]
- **Description**: Choose the visual theme for the query results viewer.

## Model Generation Settings

#### dbt.fileNameTemplateGenerateModel

- **Type**: string
- **Default**: "{prefix}{sourceName}{tableName}"
- **Options**:
  - "{prefix}{sourceName}{tableName}"
  - "{prefix}{tableName}"
  - "{tableName}"
- **Description**: Define how new model filenames are generated when creating models from sources.

#### dbt.prefixGenerateModel

- **Type**: string
- **Default**: "base"
- **Description**: Set the default prefix used when generating new models from sources.

## SQL Formatting

#### dbt.sqlFmtPath

- **Type**: string
- **Description**: Specify the path to your SQL formatter executable (sqlfmt).

#### dbt.sqlFmtAdditionalParams

- **Type**: array of strings
- **Default**: []
- **Description**: Add extra parameters to the SQL formatting command.

## Altimate AI Integration

#### dbt.altimateAiKey

- **Type**: string
- **DisplayName**: "Altimate AI API Key"
- **Description**: Required for features that need backend support. Sign up for a free Altimate AI account at app.myaltimate.com/register.

#### dbt.altimateInstanceName

- **Type**: string
- **DisplayName**: "Altimate AI Instance Name"
- **Description**: The instance name for your Altimate AI account.

## Feature Toggles

#### dbt.enableNewLineagePanel

- **Type**: boolean
- **Description**: Enable or disable the new lineage panel in dbt.

#### dbt.enableCollaboration

- **Type**: boolean
- **Default**: true
- **Description**: Enable or disable the documentation collaboration features.

#### dbt.disableQueryHistory

- **Type**: boolean
- **Default**: false
- **Description**: Control whether the extension keeps track of your query history and bookmarks.

#### dbt.enableNotebooks

- **Type**: boolean
- **Default**: false
- **Description**: Enable or disable the Datapilot notebooks feature.

## Lineage Settings

#### dbt.lineage.showSelectEdges

- **Type**: boolean
- **Default**: true
- **Description**: Control the visibility of SELECT statement relationships in the lineage graph.

#### dbt.lineage.showNonSelectEdges

- **Type**: boolean
- **Default**: false
- **Description**: Control the visibility of non-SELECT relationships in the lineage graph.

#### dbt.lineage.defaultExpansion

- **Type**: number
- **Default**: 1
- **Description**: Set how many levels of relationships are automatically expanded when viewing the lineage graph.

## Other Settings

#### dbt.unquotedCaseInsensitiveIdentifierRegex

- **Type**: string
- **Description**: Define a regular expression pattern to identify unquoted identifiers in your SQL code.

#### dbt.conversationsPollingInterval

- **Type**: integer
- **Default**: 900
- **Minimum**: 30
- **Description**: Set how frequently (in seconds) the extension checks for new comments and conversations in documentation.
