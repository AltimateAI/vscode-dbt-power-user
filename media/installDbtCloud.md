# About installing dbt Cloud

Before installing the dbt Cloud CLI, make sure you have Python installed and your virtual environment venv or pyenv . If you already have a Python environment configured, you can skip to the [pip installation step](#install-dbt-cloud-cli-in-pip).

## Install a virtual environment

We recommend using virtual environments (venv) to namespace `cloud-cli`.

1. Create a new virtual environment named "dbt-cloud" with this command:

   ```shell
   python3 -m venv dbt-cloud
   ```

2. Activate the virtual environment each time you create a shell window or session, depending on your operating system:

   - For Mac and Linux, use: `source dbt-cloud/bin/activate`<br/>
   - For Windows, use: `dbt-env\Scripts\activate`

3. (Mac and Linux only) Create an alias to activate your dbt environment with every new shell window or session. You can add the following to your shell's configuration file (for example, `$HOME/.bashrc, $HOME/.zshrc`) while replacing `<PATH_TO_VIRTUAL_ENV_CONFIG>` with the path to your virtual environment configuration:
   ```shell
   alias env_dbt='source <PATH_TO_VIRTUAL_ENV_CONFIG>/bin/activate'
   ```

## Install dbt Cloud CLI in pip

1. (Optional) If you already have dbt Core installed, this installation will override that package. Check your dbt Core version in case you need to reinstall it later by running the following command :

```bash
dbt --version
```

2. Make sure you're in your virtual environment and run the following command to install the dbt Cloud CLI:

```bash
pip install dbt --no-cache-dir
```

3. (Optional) To revert to dbt Core, first uninstall both the dbt Cloud CLI and dbt Core. Then reinstall dbt Core.

```bash
pip uninstall dbt-core dbt
pip install dbt-adapter_name --force-reinstall
```

4. Clone your repository to your local computer using `git clone`. For example, to clone a GitHub repo using HTTPS format, run `git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`.

5. After cloning your repo, [configure](/docs/cloud/configure-cloud-cli) the dbt Cloud CLI for your dbt Cloud project. This lets you run dbt commands like [`dbt environment show`](/reference/commands/dbt-environment) to view your dbt Cloud configuration or `dbt compile` to compile your project and validate models and tests. You can also add, edit, and synchronize files with your repo.
