import { describe, expect, it } from "@jest/globals";
import { isPackageInstall } from "../../dbt_client/packageInstallCommand";

describe("isPackageInstall", () => {
  it.each([
    "pip install dbt-core",
    "pip3 install --upgrade dbt-snowflake",
    "pip -q install dbt-core",
    "pip3.12 install dbt-duckdb==1.11.0",
    ".venv/bin/pip install -r requirements.txt",
    "C:\\proj\\.venv\\Scripts\\pip.exe install dbt-core",
    "python -m pip install dbt-core",
    "python3.12 -m pip uninstall dbt-postgres",
    "py -3 -m pip install dbt-core",
    "C:\\Python312\\python.exe -m pip install dbt-core",
    "uv pip install dbt-core",
    "uv pip sync requirements.txt",
    "uv add dbt-bigquery",
    "uv sync",
    "poetry add dbt-core",
    "poetry install",
    "pipenv install dbt-core",
    "pdm add dbt-core",
    "conda install -c conda-forge dbt-core",
    "mamba install dbt-core",
    "pipx install dbt-core",
    "sudo pip install dbt-core",
    "PIP_INDEX_URL=https://x pip install dbt-core",
    "cd ~/proj && pip install dbt-core",
    "source .venv/bin/activate; pip install dbt-core",
    'pip install "dbt-core>=1.8,<2"',
    "uv --quiet pip install dbt-core",
    "uv pip --quiet install dbt-core",
    "uv -q add dbt-duckdb",
    "pip install dbt-core 2>&1 | tee install.log",
  ])("takes %s for an install", (commandLine) => {
    expect(isPackageInstall(commandLine)).toBe(true);
  });

  it.each([
    "pip list",
    "pip show dbt-core",
    "pip freeze > requirements.txt",
    "uv run dbt debug",
    "uv venv",
    "poetry run dbt run",
    "conda activate dbt",
    "dbt deps",
    "dbt run --select orders",
    "echo pip install dbt-core",
    "git commit -m 'pip install'",
    "python -m dbt run",
    "printf '%s\\n' 'note; pip install dbt-core'",
    "echo 'a;pip' install dbt-core",
    'echo "run: pip install dbt-core && dbt debug"',
    "git commit -m 'docs: pip install dbt-core'",
    "",
  ])("doesn't take %s for an install", (commandLine) => {
    expect(isPackageInstall(commandLine)).toBe(false);
  });
});
