/// admonition | Only use the following steps for "dbt Fusion" environments. If you have a dbt Core environment, use the [required config instructions for "dbt Core" environments](./reqdConfig.md). If you have a dbt Cloud environment, use the [required config instructions for "dbt Cloud" environments](./reqdConfigCloud.md).
type: warning
///

/// admonition | dbt Fusion integration provides enhanced performance and features
type: tip
///

## What is dbt Fusion?

dbt Fusion is a command-line interface that provides enhanced dbt functionality with improved performance and additional features. Unlike standard dbt Core, dbt Fusion is a standalone executable that doesn't require a Python environment, making it easier to install and manage.

### Key Benefits of dbt Fusion Integration:

- **Standalone Installation**: No Python environment required
- **Enhanced Performance**: Optimized execution compared to standard dbt
- **Cross-Platform Support**: Available for macOS, Linux, and Windows
- **Simple Setup**: Single executable installation
- **Full VSCode Integration**: Complete feature support in the extension

## Use the setup wizard for configuration (recommended)

/// admonition | Need to setup environment variables? Refer to this [section](https://docs.myaltimate.com/setup/optConfig/#environment-variables-setup)
type: warning
///

This method will save a bunch of time for you, and you can also validate your configuration. The setup wizard will help you in associating SQL files with jinja-sql, installing dbt Fusion if needed, and validating your project configuration.

You can start the setup wizard by clicking on the dbt status icon in the bottom status bar, and perform the following necessary steps:

**Here are the steps covered in the setup wizard**

**Select dbt Integration Type**

In the setup wizard, choose "dbt Fusion" as your integration type. This will configure the extension to use the dbt Fusion CLI for all dbt operations.

**Install dbt Fusion**

If dbt Fusion is not installed in your system (the dbt status icon on the bottom status bar will show it), click on "Install dbt Fusion" button. The setup wizard will automatically install the latest version of dbt Fusion using the appropriate method for your operating system:

- **macOS/Linux**: Uses curl to download and install from dbt Labs CDN
- **Windows**: Uses PowerShell to download and install from dbt Labs CDN

**Associate SQL Files**

The wizard will help you associate `*.sql` files with `jinja-sql` language mode for proper syntax highlighting and IntelliSense support.

**Validate Project**

The last step is clicking the "Validate Project" button. It will run a bunch of checks to make sure your dbt Fusion environment and project are set up correctly. If there are issues, it will tell you exactly what's wrong.

/// admonition | If you still can't get the extension setup correctly, please contact us via slack or chat through [support page](https://www.altimate.ai/support)
type: tip
///

## Manual method of configuration

/// admonition | Please follow the manual method only if you couldn't use the setup wizard above.
type: info
///

### Step 1: Install dbt Fusion

#### Automatic Installation via Extension

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type "dbt Power User: Install dbt"
3. Select the command and choose "dbt Fusion" when prompted
4. The extension will automatically download and install dbt Fusion for your platform

#### Manual Installation

**macOS and Linux:**

```bash
curl -fsSL https://public.cdn.getdbt.com/fs/install/install.sh | sh -s -- --update
```

**Windows (PowerShell):**

```powershell
irm https://public.cdn.getdbt.com/fs/install/install.ps1 | iex
```

#### Verify Installation

After installation, verify that dbt Fusion is properly installed by running:

```bash
dbt --version
```

You should see output that includes "dbt-fusion" in the version information.

### Step 2: Configure dbt Integration Type

Set the integration type to fusion in your VSCode settings:

#### Method 1: Via VSCode Settings UI

1. Open VSCode Settings (`Ctrl+,` / `Cmd+,`)
2. Search for "dbt integration"
3. Set "Dbt: Dbt Integration" to "fusion"

#### Method 2: Via settings.json

Add the following to your VSCode settings.json:

```json
{
  "dbt.dbtIntegration": "fusion"
}
```

### Step 3: Associate \*.sql files with jinja-sql

#### Method 1: Configure in Preferences > Settings

![File Associations](images/associations.png)

#### Method 2: Update settings.json directly

```json
{
  "files.associations": {
    "*.sql": "jinja-sql",
    "*.yml": "jinja-yaml"
  }
}
```

### Step 4: Verify Configuration

After configuration, check that:

1. The bottom status bar shows "dbt fusion" with a checkmark
2. You can execute dbt commands through the extension
3. IntelliSense and syntax highlighting work in your dbt files

## Enable SaaS features by adding API key

There are multiple features in the extension, including [generate dbt documentation](../document/generatedoc.md), [column lineage](../test/lineage.md), [query explanation](../develop/explanation.md), [generate dbt model from SQL](../develop/genmodelSQL.md) that require an API key.

/// details | You can get an API key for free by signing up at [www.altimate.ai](https://www.altimate.ai)

<interactive demo to get an API key>

<div style="position: relative; padding-bottom: calc(51.70312500000001% + 44px); height: 0;"><iframe src=https://app.supademo.com/embed/yanO4l-w5hH0xzXf93w-d frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

///

You need to add the API key from "Settings->API key" in your Altimate instance to the VSCode extension settings. You also need to add "Instance name" in the extension settings. Please get your instance name from your Altimate AI URL. If your URL for Altimate instance is - "companyx.app.myaltimate.com", then instance name is "companyx".

Go to VSCode extension settings, and add API key and instance name there.

/// details | Here's demo of how to add instance name and API Key to the extension settings

<Interactive demo to add API key in the extension>

<div style="position: relative; padding-bottom: calc(57.25% + 44px); height: 0;"><iframe src=https://app.supademo.com/embed/clnjpwl3u07x4pedv9ifjfuf9 frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
///

## Feature Support

dbt Fusion integration supports most extension features with some exceptions:

### ✅ Supported Features

- **Query Execution**: Execute models and preview results
- **SQL Compilation**: View compiled SQL code
- **Auto-completion**: IntelliSense for models, macros, and sources
- **Column Lineage**: Trace data lineage between models
- **SQL Validation**: Validate SQL without execution
- **Defer to Production**: Run models without rebuilding dependencies
- **Test Generation**: AI-powered test generation
- **Query Explanation**: AI-powered SQL explanation

### ❌ Limited Features

- **Documentation Generation**: Not supported in dbt Fusion CLI
- **Some Advanced Features**: May have limitations compared to dbt Core integration

## Questions and Answers

#### What is dbt Fusion and how is it different from dbt Core?

dbt Fusion is an enhanced command-line interface for dbt that provides improved performance and additional features. Unlike dbt Core, which requires a Python environment, dbt Fusion is a standalone executable that can be installed independently.

#### Is dbt Fusion integration free?

Yes, dbt Fusion integration is free and treated the same as integration with dbt Core. It will not count towards the usage quota for AI features.

#### Do I need Python installed to use dbt Fusion?

No, dbt Fusion is a standalone executable that doesn't require a Python environment. This makes it easier to install and manage compared to dbt Core.

#### Can I switch between dbt Core and dbt Fusion integrations?

Yes, you can switch between integration types by changing the `dbt.dbtIntegration` setting in VSCode. The extension will automatically detect and use the appropriate dbt executable.

#### What if dbt Fusion is not available for my platform?

dbt Fusion supports macOS, Linux, and Windows. If you encounter installation issues, you can fall back to using dbt Core or dbt Cloud integrations instead.

#### Why do I need to add the Altimate API key?

The API key is necessary for advanced AI-powered features like query explanation, test generation, and column lineage. Basic dbt operations (execution, compilation) work without an API key.
