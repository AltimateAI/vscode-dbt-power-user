# Release instructions

1. Update dependencies in `pyproject.toml` as needed.
1. Run `uv lock` to update the lockfile:
   ```shell
   uv lock
   ```
1. Regenerate `requirements.txt` for pip users:
   ```shell
   uv pip compile pyproject.toml -o requirements.txt
   ```
1. Commit the result.
1. Open a PR.
