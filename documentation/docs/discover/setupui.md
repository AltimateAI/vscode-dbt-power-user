This page covers the setup steps necessary to view your dbt documentation and lineage in the SaaS UI.
The steps below ship your manifest.json and catalog.json projects to SaaS UI in order to visualize information like dbt model/column descriptions and column lineage.

/// admonition | Please note that this lineage and documentation in UI functionality is not yet supported with dbt 1.8
type: info
///

## Step 1: Add new integration in the "Settings" area

From the navigation menu on the left-hand side, go to Settings -> Integrations area. Click on (Add Integration) button on the top right corner.
A new UI page will open as shown below - please add the following information.

![addIntegration](images/addIntegration.png)<br>

| Field            | Description                                                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Integration name | Unique integration name, this can be mapped to your dbt Project                                                                                                                                    |
| Integration type | "dbt-core" This is a fixed field for now, that cannot be changed by the user as the functionality is only available for the dbt-core users                                                         |
| Environment name | Environment name can be based on which environment that you are going to upload manifest.json and catalog.json files from. For now, just add the value as "prod" for your production environments. |

## Step 2: Install the open-source DataPilot CLI

The next step is to install the latest version of DataPilot CLI. It will be used to upload manifest and catalog files to the SaaS instance. Please run the following command to install the latest version of the DataPilot CLI.

```
pip install altimate-datapilot-cli --upgrade
```

Here's the link to the repo: [https://github.com/AltimateAI/datapilot-cli](https://github.com/AltimateAI/datapilot-cli)

## Step 3: Execute the command for uploading the manifest and catalog files

Go to Settings->Integrations page and click on the environment name for the integration you just created. Copy the command for uploading files in the overlay screen on the side.

/// admonition | manifest and catalog files don't contain any information about your data. It's all metadata about your environment. Please feel free to check our [security page](https://docs.myaltimate.com/arch/faq/) for more info on how we protect your metadata.
type: info
///

![copyCommand](images/copyCommand.png)<br>

You need to update the following placeholders in the copied command -

| Placeholder            | Description                                                                                                                       | Example                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Path/to/manifefst/file | This is path to your manifest file in the project directory. It's usually stored in the 'target' directory in your dbt project.   | ./target/manifest.json |
| Path/to/catalog/file   | This is the path to your catalog file in the project directory. It's usually stored in the 'target' directory in your dbt project | ./target/catalog.json  |

/// admonition | If you are missing manifest.json or catalog.json files in the target directory, please run the 'dbt build' and 'dbt docs' commands. Also, you can add steps to upload the manifest and catalog files command in your dbt pipelines. That way, you will always have up-to-date documentation and lineage in UI without any manual steps.  
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

## Recorded Demo

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/04c57021a56144358d78140eee45a989?sid=67a35e98-48cb-4800-a38b-9392133337cb" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
