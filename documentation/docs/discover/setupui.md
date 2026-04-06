This page covers the setup steps necessary to view your dbt documentation and lineage in the SaaS UI.
The steps below ship your manifest.json and catalog.json projects to SaaS UI in order to visualize information like dbt model/column descriptions and column lineage.

/// admonition | Please note that this lineage and documentation in UI functionality is not yet supported with dbt 1.8
    type: info
///

/// admonition | If you want to re-create any existing dbt core integration using Connections, kindly delete the existing integration first and then create a fresh connection.
    type: warning
///

## Step 1: Create a dbt Core Connection

1. Navigate to **Settings -> Connections** and click **Create new connection**

    ![DBT Core Connection](images/DBT_Cloud_Connection.png)

2. Select **dbt Core** as the connection type & provide the required connection name & description details

    ![Create DBT Core Connection](images/DBT_Core_Create_Connection.png)

3. Provide **Environment Name** & Click **Create Connection** to create the dbt Core connection

    ![Final Create DBT Core Connection](images/DBT_Core_Create_Final_Connection.png)

| Field                  | Description                                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connection name        | Unique connection name, this can be mapped to your dbt Project                                                                                                                                     |
| Connection description | A brief description of the connection (e.g., "Production dbt Core project for analytics")                                                                                                          |
| Environment name       | Environment name can be based on which environment that you are going to upload manifest.json and catalog.json files from. For now, just add the value as "prod" for your production environments.  |

## Step 2: Install the open-source DataPilot CLI

The next step is to install the latest version of DataPilot CLI. It will be used to upload manifest and catalog files to the SaaS instance. Please run the following command to install the latest version of the DataPilot CLI.

```
pip install altimate-datapilot-cli --upgrade
```

Here's the link to the repo: [https://github.com/AltimateAI/datapilot-cli](https://github.com/AltimateAI/datapilot-cli)

## Step 3: Execute the command for uploading the manifest and catalog files

Go to **Settings -> Connections** page and click on the dbt core connection name for the connection created. Copy the command for uploading files in the overlay screen on the side.

/// admonition | manifest and catalog files don't contain any information about your data. It's all metadata about your environment. Please feel free to check our [security page](https://docs.myaltimate.com/arch/faq/) for more info on how we protect your metadata.
    type: info
///

![DBT Core Connection Details](images/copyCommand.png)<br>

You need to update the following placeholders in the copied command -

| Placeholder                    | Description                                                                                                                        | Example                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Path/to/manifest/file          | This is path to your manifest file in the project directory. It's usually stored in the 'target' directory in your dbt project.    | ./target/manifest.json          |
| Path/to/catalog/file           | This is the path to your catalog file in the project directory. It's usually stored in the 'target' directory in your dbt project. | ./target/catalog.json           |
| Path/to/run-results/file       | Path to your run results file in the project directory                                                                              | ./target/run_results.json       |
| Path/to/semantic-manifest/file | Path to your semantic manifest file in the project directory                                                                        | ./target/semantic_manifest.json |
| Path/to/sources/file           | Path to your sources file in the project directory                                                                                  | ./target/sources.json           |

/// admonition | In addition to the required `manifest.json` and `catalog.json`, we now support uploading additional artifacts — `run_results.json`, `semantic_manifest.json`, and `sources.json` — for richer insights. These are optional but recommended for complete visibility into your dbt project.
    type: info
///

/// admonition | If you are missing manifest.json or catalog.json files in the target directory, please run the `dbt build` and `dbt docs generate` commands. Also, you can add steps to upload the manifest and catalog files command in your dbt pipelines. That way, you will always have up-to-date documentation and lineage in UI without any manual steps.
    type: tip
///

Here's the sample output after running the command and successfully uploading your files.

```
(.venv) pradnesh@pradneshs-MacBook-Air jaffle_shop % datapilot dbt onboard --backend-url https://api.tryaltimate.com --token 00x0x0x0x0x0x0 --instance-name freemegatenant --dbt_core_integration_id 1 --dbt_core_integration_environment prod --manifest-path ./target/manifest.json --catalog-path ./target/catalog.json
Manifest onboarded successfully!
Catalog onboarded successfully!
Manifest and catalog ingestion has started. You can check the status at https://freemegatenant.demo.tryaltimate.com/settings/integrations/1/prod

```

/// admonition | It takes a few minutes to upload the files and sync that info with the rest of the UI. You can check the status of the upload by going to the link provided in the command output.
    type: tip
///

## Automating with CI/CD Pipelines

To ensure your dbt documentation and lineage in the UI stays up-to-date automatically, we strongly recommend integrating the manifest and catalog upload process into your CI/CD pipeline. This eliminates manual steps and ensures that any changes to your dbt project are immediately reflected in the SaaS UI.

## Automatic Sync with dbt Cloud Connection

For dbt Cloud users, you can now set up automatic artifact syncing in the SaaS UI using the dbt Cloud API connection. This eliminates the need for manual file uploads or CLI commands.

### Prerequisites: Create a dbt Cloud Service Token

Before setting up the connection, create a service token in dbt Cloud with **Job Viewer** permission. This grants read-only access to the Jobs API for fetching artifacts (manifest.json, catalog.json) from your dbt Cloud runs.

1. Click your account name in the left menu and select **Account settings**
2. Select **Service Tokens** from the left sidebar
3. Click **+ New Token**
4. Enter a descriptive name (e.g., "Altimate Integration")
5. Assign the **Job Viewer** permission and select the projects you want to sync
6. Click **Save**
7. **Important**: Copy and save the token immediately — you won't be able to view it again

![DBT Cloud Connection](images/dbtCreateServiceToken.png)

![DBT Cloud Connection](images/dbtServiceTokenPermission.png)

> **Note**: Permission availability may vary by dbt Cloud plan. Refer to the [dbt Cloud Service Tokens documentation](https://docs.getdbt.com/docs/dbt-cloud-apis/service-tokens) for details.

![DBT Cloud Connection](images/DBT_Cloud_Connection.png)

### Setup Steps

1. Navigate to **Settings -> Connections** and click **Create new connection**
2. Select **dbt Cloud** as the connection type
3. Provide the required connection details:
4. **Service Account Token**: Generate a new Service Token from dbt Cloud Account Settings ([learn more](https://docs.getdbt.com/docs/dbt-cloud-apis/service-tokens))
5. **Account ID**: Available at `https://cloud.getdbt.com/next/settings/accounts/{{account_id}}`
6. **Custom URL** (optional): For custom dbt Cloud instances (defaults to `https://cloud.getdbt.com/api/v2/`)
7. Click **Test Connection** to verify your setup
8. Configure the sync schedule:
    - **Scheduled**: Sync artifacts on a regular schedule. Select from Daily, Weekly, or Monthly frequency options and choose the time (UTC) when sync should occur (e.g., Daily at 12:00 AM UTC)
    - **Real-time**: (Coming soon) Immediate sync when dbt Cloud runs complete
9. Click **Create Connection**

After creation, your dbt Cloud projects and environments will be automatically discovered.
<div style="position: relative; box-sizing: content-box; max-height: 80vh; max-height: 80svh; width: 100%; aspect-ratio: 1.73; padding: 40px 0 40px 0;">
  <iframe src="https://app.supademo.com/embed/cml93jv5t01in180iqac81nl2?embed_v=2&utm_source=embed" loading="lazy" title="dbt Cloud Integration" allow="clipboard-write" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

/// admonition | Automatic syncing keeps your documentation and lineage always up-to-date without manual intervention
    type: tip
///

/// admonition | The dbt cloud connection deletion has a processing delay of a few hours. If you need to recreate the same connection immediately, contact us.
    type: warning
///


