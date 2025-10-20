## Frequently Asked Questions

- **Why am I receiving a "Network Error" message when trying to log into my Altimate AI account on the Sign In page?**

When logging into your Altimate AI account on the Sign In page, if you encounter a "Network Error" message, it's likely due to the use of the general URL: https://app.myaltimate.com/login. At Altimate AI, we assign a unique URL to each tenant as part of our commitment to ensuring data isolation and providing a seamless user experience. Therefore, to access your account without any issues, it's crucial to use the specific URL that was uniquely created for you at the time of your account registration.

- **How to Customize the Target Profile for VS Code dbt Power User Extension Functions?**

To customize the target profile in VS Code for dbt Power User extension functions, follow these steps:

Open Your dbt Project: Ensure you have your dbt project open in VS Code where the dbt Power User extension is installed.

Locate the profiles.yml File: This file contains the configuration for your different dbt profiles. By default, the extension uses the 'dev' profile.

Edit the Profile: In the profiles.yml file, you can define multiple profiles. Each profile can have different settings for your database connection and other preferences.

Set Your Desired Profile:

To change the active profile, you can use the dbt CLI command `dbt --profile your_profile_name debug` in the integrated terminal of VS Code.
Alternatively, some extensions allow profile selection through the extension settings. Check if dbt Power User has such an option by going to the extension settings in VS Code.
Restart VS Code: After making changes, restart VS Code to ensure that the new profile settings are loaded.

Verify the Change: Run a command like "compiled dbt preview" or "query preview" to verify that the extension is now using your specified profile.
